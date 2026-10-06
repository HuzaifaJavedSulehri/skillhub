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
  
  // Private closure secret salts - NEVER exposed on window or public objects
  const SECRET_INTEGRITY_SALT = 'SkillHub_2026_Secure_Checksum_';
  const SECRET_CLOUD_SALT = 'SkillHub_Cryptographic_AntiCheat_Key_2026_9b83f47c01a';

  // Standard bit-exact SHA-256 cryptographic implementation
  function sha256(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    const maxWord = Math.pow(2, 32);
    const words = [];
    const asciiBitLength = ascii.length * 8;

    let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
    let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;

    const k = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    let s = ascii + '\x80';
    while ((s.length % 64) !== 56) s += '\x00';

    for (let i = 0; i < s.length; i++) {
      words[i >> 2] |= (s.charCodeAt(i) & 0xff) << ((3 - (i % 4)) * 8);
    }
    words.push((asciiBitLength / maxWord) | 0);
    words.push(asciiBitLength | 0);

    for (let j = 0; j < words.length; j += 16) {
      const w = new Array(64);
      for (let i = 0; i < 16; i++) w[i] = words[j + i] | 0;
      for (let i = 16; i < 64; i++) {
        const s0 = (rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3));
        const s1 = (rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10));
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
      }

      let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;

      for (let i = 0; i < 64; i++) {
        const S1 = (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25));
        const ch = ((e & f) ^ ((~e) & g));
        const temp1 = (h + S1 + ch + k[i] + w[i]) | 0;
        const S0 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22));
        const maj = ((a & b) ^ (a & c) ^ (b & c));
        const temp2 = (S0 + maj) | 0;

        h = g;
        g = f;
        f = e;
        e = (d + temp1) | 0;
        d = c;
        c = b;
        b = a;
        a = (temp1 + temp2) | 0;
      }

      h0 = (h0 + a) | 0;
      h1 = (h1 + b) | 0;
      h2 = (h2 + c) | 0;
      h3 = (h3 + d) | 0;
      h4 = (h4 + e) | 0;
      h5 = (h5 + f) | 0;
      h6 = (h6 + g) | 0;
      h7 = (h7 + h) | 0;
    }

    function toHex(val) {
      return (val >>> 0).toString(16).padStart(8, '0');
    }

    return toHex(h0) + toHex(h1) + toHex(h2) + toHex(h3) + toHex(h4) + toHex(h5) + toHex(h6) + toHex(h7);
  }

  // Canonicalize course progress to a deterministic query-like string
  function canonicalizeProgress(progressObj) {
    const clean = sanitizeProgress(progressObj);
    const sortedKeys = Object.keys(clean).sort();
    return sortedKeys.map(function (k) {
      return k + '=' + clean[k];
    }).join('&');
  }

  // Cryptographic signature for Firestore cloud documents
  function generateCloudSignature(studentId, progressObj) {
    if (!studentId || typeof studentId !== 'string') return '';
    const canon = canonicalizeProgress(progressObj);
    return sha256(studentId + '|' + canon + '|' + SECRET_CLOUD_SALT);
  }

  // Verifies Firestore document against cryptographic signature
  function verifyCloudSignature(studentId, rawDocData) {
    if (!studentId || !rawDocData || typeof rawDocData !== 'object') return false;
    const providedSig = rawDocData._sig;
    if (!providedSig || typeof providedSig !== 'string') return false;

    const expectedSig = generateCloudSignature(studentId, rawDocData);
    return providedSig === expectedSig;
  }

  // Checksum generator for localStorage tamper detection
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
    computeChecksum,
    generateCloudSignature,
    verifyCloudSignature
  });

  global.Security = Security;
})(window);
