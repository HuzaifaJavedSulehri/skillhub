/**
 * SkillHub Security & Integrity Module
 * - Course boundary limits & maximum XP validation
 * - Anti-cheat score sanitization & clamping
 * - Student ID masking for privacy
 * - LocalStorage tamper-detection checksums
 */
(function (global) {
  'use strict';

  // Strict maximum lesson limits per course (derived from authentic course data)
  const COURSE_LIMITS = Object.freeze({
    js: 13,
    py: 9,
    html: 5,
    css: 9,
    c: 12,
    java: 9,
    cpp: 9,
    sql: 9,
    git: 1,
    react: 6,
    node: 7,
    dsa: 9,
    linux: 7,
    ts: 6,
    django: 6,
    flutter: 6
  });

  const TOTAL_LESSONS = 123;
  const XP_PER_LESSON = 50;
  const MAX_POSSIBLE_XP = TOTAL_LESSONS * XP_PER_LESSON; // 6,150 XP
  const SECRET_INTEGRITY_SALT = 'SkillHub_2026_Secure_Checksum_';

  // Simple, deterministic checksum generator for localStorage tamper detection
  function computeChecksum(userId, progressObj) {
    const raw = userId + ':' + JSON.stringify(progressObj) + ':' + SECRET_INTEGRITY_SALT;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      const char = raw.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return 'sig_' + Math.abs(hash).toString(36);
  }

  // HTML entity sanitizer to prevent XSS
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>"']/g, function (c) {
      switch (c) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return c;
      }
    });
  }

  /**
   * Sanitizes any progress payload (whether from localStorage, Firestore, or user input).
   * Prevents over-inflated scores (e.g. someone sending 99999).
   */
  function sanitizeProgress(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return {};
    }

    const clean = {};
    for (const [courseId, maxLessons] of Object.entries(COURSE_LIMITS)) {
      if (courseId in raw) {
        const val = Number(raw[courseId]);
        if (Number.isFinite(val) && val > 0) {
          // Strictly clamp between 0 and max lessons for this course
          const clamped = Math.min(Math.floor(val), maxLessons);
          if (clamped > 0) {
            clean[courseId] = clamped;
          }
        }
      }
    }
    return clean;
  }

  /**
   * Calculates verified total lessons passed and XP points.
   */
  function calculateScore(sanitizedProgress) {
    const clean = sanitizeProgress(sanitizedProgress);
    let totalPassed = 0;
    for (const count of Object.values(clean)) {
      totalPassed += count;
    }

    // Mathematical cap enforcement
    totalPassed = Math.min(totalPassed, TOTAL_LESSONS);
    const xp = Math.min(totalPassed * XP_PER_LESSON, MAX_POSSIBLE_XP);

    return {
      passed: totalPassed,
      xp: xp
    };
  }

  /**
   * Masks a Student ID to protect privacy from inspect element and scraping.
   * Only the logged-in student sees their full ID; other IDs are masked.
   */
  function maskStudentId(id, isCurrentUser) {
    if (!id || typeof id !== 'string') return 'SH-••••';
    if (isCurrentUser) return id;

    // Mask format: "SH-1024" -> "SH-••24"
    if (id.length > 5) {
      const prefix = id.slice(0, 3);
      const suffix = id.slice(-2);
      return `${prefix}••${suffix}`;
    }
    return 'SH-••••';
  }

  // Freeze public API to prevent runtime tampering via console
  const Security = Object.freeze({
    COURSE_LIMITS,
    TOTAL_LESSONS,
    XP_PER_LESSON,
    MAX_POSSIBLE_XP,
    escapeHtml,
    sanitizeProgress,
    calculateScore,
    maskStudentId,
    computeChecksum
  });

  global.Security = Security;
})(window);
