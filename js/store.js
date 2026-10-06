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

  /**
   * Saves updated course progress with validation and cloud sync.
   */
  function saveProgress(progressObj, userId) {
    const user = userId || (Auth.getCurrentUser() ? Auth.getCurrentUser().id : null);
    if (!user) return;

    // 1. Sanitize to guarantee bounds
    const clean = Security.sanitizeProgress(progressObj);

    // 2. Persist locally with tamper-evident checksum
    setLocalProgress(user, clean);

    // 3. Sync sanitized clean progress to Firestore
    if (db) {
      db.collection('progress').doc(user).set(clean).catch(function (e) {
        console.warn('Cloud progress sync notice:', e);
      });
    }
  }

  /**
   * Loads current user's progress from cloud upon login.
   */
  async function syncFromFirestore(userId) {
    const user = userId || (Auth.getCurrentUser() ? Auth.getCurrentUser().id : null);
    if (!user || !db) return getLocalProgress(user);

    try {
      const snap = await db.collection('progress').doc(user).get();
      if (snap.exists) {
        const cloudData = Security.sanitizeProgress(snap.data());
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
   * Loads and SANITIZES all student scores from Firestore.
   * Any corrupted, hacked, or over-the-limit score stored in Firestore
   * is automatically clamped to legitimate course bounds!
   */
  async function loadAllScores() {
    if (!db) {
      allScoresCache = {};
      return allScoresCache;
    }

    try {
      const snap = await db.collection('progress').get();
      allScoresCache = {};
      snap.forEach(function (doc) {
        const raw = doc.data();
        // ANTI-CHEAT: strictly sanitize every document
        const clean = Security.sanitizeProgress(raw);
        const score = Security.calculateScore(clean);
        allScoresCache[doc.id] = score.passed;
      });
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
      db.collection('progress').doc(user).set({}).catch(function (e) {
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
    saveProgress: saveProgress,
    syncFromFirestore: syncFromFirestore,
    loadAllScores: loadAllScores,
    getUserScore: getUserScore,
    resetProgress: resetProgress,
    resetAllLeaderboardData: resetAllLeaderboardData
  });

  global.Store = Store;
})(window);
