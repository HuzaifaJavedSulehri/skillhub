/**
 * SkillHub Data Persistence & Cloud Sync Module
 * - Firebase Firestore synchronization
 * - Strict progress validation & anti-tampering enforcement
 * - Clamps and sanitizes all cloud scores to prevent leaderboard spoofing
 */
(function (global) {
  'use strict';

  // Firebase Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA_YewrY00DGHu-biED3r1QK72Ez2KRn5Q",
    authDomain: "skillhub-ec2ce.firebaseapp.com",
    projectId: "skillhub-ec2ce",
    storageBucket: "skillhub-ec2ce.firebasestorage.app",
    messagingSenderId: "967612318769",
    appId: "1:967612318769:web:a9ba65865bdf26a2d28110"
  };

  let db = null;
  try {
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      db = firebase.firestore();
    }
  } catch (err) {
    console.warn('Firebase initialization notice:', err);
  }

  // Cache for cloud scores of all students (sanitized)
  let allScoresCache = null;

  function getLocalProgress(userId) {
    if (!userId) return {};
    try {
      const raw = localStorage.getItem('sh_p_' + userId);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      // Strictly sanitize whenever reading from local storage
      return Security.sanitizeProgress(parsed);
    } catch (e) {
      return {};
    }
  }

  function setLocalProgress(userId, cleanProgress) {
    if (!userId) return;
    try {
      localStorage.setItem('sh_p_' + userId, JSON.stringify(cleanProgress));
      const sig = Security.computeChecksum(userId, cleanProgress);
      localStorage.setItem('sh_sig_' + userId, sig);
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  // Active quiz ticket held in private module closure
  let activeQuizTicket = null;

  /**
   * Issues a secure single-use ticket for a legitimate quiz attempt.
   */
  function issueQuizTicket(courseId, lessonIndex) {
    const user = Auth.getCurrentUser();
    if (!user) return null;
    activeQuizTicket = {
      uid: user.id,
      cid: courseId,
      idx: lessonIndex,
      issuedAt: Date.now()
    };
    return activeQuizTicket;
  }

  /**
   * ANTI-CHEAT: Strictly records a lesson pass ONLY after quiz verification.
   * - Enforces sequential lesson unlocks (+1 only)
   * - Requires valid single-use quiz ticket
   * - Signs cloud payload with cryptographic hash
   */
  function recordLessonPassed(courseId, lessonIndex, ticket) {
    const user = Auth.getCurrentUser();
    if (!user) {
      console.warn('[ANTI-CHEAT] Progress rejected: User not logged in.');
      return false;
    }

    // 1. Verify single-use quiz ticket
    if (!ticket || !activeQuizTicket ||
        activeQuizTicket.uid !== user.id ||
        activeQuizTicket.cid !== courseId ||
        activeQuizTicket.idx !== lessonIndex) {
      console.warn('[ANTI-CHEAT] Progress rejected: Invalid or forged quiz ticket.');
      return false;
    }
    activeQuizTicket = null; // Invalidate ticket after single use

    // 2. Validate course limits
    const maxLessons = Security.COURSE_LIMITS[courseId];
    if (!maxLessons || lessonIndex < 0 || lessonIndex >= maxLessons) {
      console.warn('[ANTI-CHEAT] Progress rejected: Lesson index out of bounds.');
      return false;
    }

    // 3. Strict sequential progression (+1 only)
    const local = getLocalProgress(user.id);
    const curDone = local[courseId] || 0;
    if (lessonIndex !== curDone) {
      console.warn('[ANTI-CHEAT] Progress rejected: Non-sequential lesson jump detected.');
      return false;
    }

    // 4. Increment by exactly 1
    local[courseId] = lessonIndex + 1;
    const clean = Security.sanitizeProgress(local);

    // 5. Persist locally with checksum
    setLocalProgress(user.id, clean);

    // 6. Sign and sync to Firestore
    if (db) {
      const sig = Security.generateCloudSignature(user.id, clean);
      const payload = Object.assign({}, clean, {
        _sig: sig,
        _updated: Date.now()
      });
      db.collection('progress').doc(user.id).set(payload).catch(function (e) {
        console.warn('Cloud sync error:', e);
      });
    }

    return true;
  }

  /**
   * Loads current user's progress from cloud upon login.
   * Strictly validates cryptographic cloud signature before accepting.
   */
  async function syncFromFirestore(userId) {
    const user = userId || (Auth.getCurrentUser() ? Auth.getCurrentUser().id : null);
    if (!user || !db) return getLocalProgress(user);

    try {
      const snap = await db.collection('progress').doc(user).get();
      if (snap.exists) {
        const raw = snap.data();
        // ANTI-CHEAT: reject any unsigned or tampered cloud progress
        if (!Security.verifyCloudSignature(user, raw)) {
          console.warn('[ANTI-CHEAT] Cloud data failed signature check. Relying on local verified data.');
          return getLocalProgress(user);
        }

        const cloudData = Security.sanitizeProgress(raw);
        const localData = getLocalProgress(user);

        // Merge: take maximum valid progress for each course
        const merged = {};
        for (const [courseId, maxL] of Object.entries(Security.COURSE_LIMITS)) {
          const lVal = localData[courseId] || 0;
          const cVal = cloudData[courseId] || 0;
          const best = Math.min(Math.max(lVal, cVal), maxL);
          if (best > 0) merged[courseId] = best;
        }

        setLocalProgress(user, merged);
        return merged;
      }
    } catch (e) {
      console.warn('Could not load cloud progress, relying on local verified data.');
    }
    return getLocalProgress(user);
  }

  /**
   * Loads, VERIFIES, and SANITIZES all student scores from Firestore.
   * Any unsigned, forged, or console-injected document is:
   * 1. Rejected from the leaderboard (0 XP)
   * 2. Automatically purged from Firestore
   */
  async function loadAllScores() {
    if (!db) {
      allScoresCache = {};
      return allScoresCache;
    }

    try {
      const snap = await db.collection('progress').get();
      allScoresCache = {};
      const taintedRefs = [];

      snap.forEach(function (doc) {
        const raw = doc.data() || {};
        const studentId = doc.id;

        // ANTI-CHEAT ENFORCEMENT:
        // Must possess a valid cryptographic signature
        const isValid = Security.verifyCloudSignature(studentId, raw);
        if (!isValid) {
          console.warn('[ANTI-CHEAT] Disqualified student ' + studentId + ': Unsigned or tampered cloud data.');
          taintedRefs.push(doc.ref);
          return; // Score stays 0
        }

        const clean = Security.sanitizeProgress(raw);
        const score = Security.calculateScore(clean);
        allScoresCache[studentId] = score.passed;
      });

      // Auto-purge forged documents from Firestore in real-time
      if (taintedRefs.length > 0) {
        const batch = db.batch();
        taintedRefs.forEach(function (ref) {
          batch.delete(ref);
        });
        batch.commit().catch(function (e) {
          console.warn('Auto-purge commit notice:', e);
        });
      }
    } catch (e) {
      console.warn('Error loading cloud scores:', e);
      allScoresCache = null;
    }
    return allScoresCache;
  }

  /**
   * Retrieves verified score for any student.
   */
  function getUserScore(userId) {
    const currentUser = Auth.getCurrentUser();
    const currentId = currentUser ? currentUser.id : null;

    if (userId === currentId) {
      const p = getLocalProgress(userId);
      return Security.calculateScore(p);
    } else {
      if (allScoresCache && allScoresCache[userId] !== undefined) {
        const passed = Math.min(allScoresCache[userId], Security.TOTAL_LESSONS);
        return {
          passed: passed,
          xp: Math.min(passed * Security.XP_PER_LESSON, Security.MAX_POSSIBLE_XP)
        };
      }
      return { passed: 0, xp: 0 };
    }
  }

  function resetProgress(userId) {
    const user = userId || (Auth.getCurrentUser() ? Auth.getCurrentUser().id : null);
    if (!user) return;
    try {
      localStorage.removeItem('sh_p_' + user);
      localStorage.removeItem('sh_sig_' + user);
    } catch (e) {}

    if (db) {
      db.collection('progress').doc(user).delete().catch(function (e) {
        console.warn('Cloud reset failed:', e);
      });
    }
  }

  async function resetAllLeaderboardData() {
    if (!db) return false;
    try {
      const snap = await db.collection('progress').get();
      const batch = db.batch();
      snap.forEach(function (doc) {
        batch.delete(doc.ref);
      });
      await batch.commit();
      allScoresCache = {};
      return true;
    } catch (e) {
      console.warn('Leaderboard reset error:', e);
      return false;
    }
  }

  const Store = Object.freeze({
    getProgress: getLocalProgress,
    issueQuizTicket: issueQuizTicket,
    recordLessonPassed: recordLessonPassed,
    syncFromFirestore: syncFromFirestore,
    loadAllScores: loadAllScores,
    getUserScore: getUserScore,
    resetProgress: resetProgress,
    resetAllLeaderboardData: resetAllLeaderboardData
  });

  global.Store = Store;
})(window);
