/**
 * SkillHub Main Application Controller & View Router
 * - Dark / Light Theme management
 * - Course Catalog, Filtering & Search
 * - Interactive Video Player & Syllabus
 * - Auto-saving Study Notes
 * - Student Profile & Progress Analytics
 */
(function (global) {
  'use strict';

  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);

  const COL = ["#f7df1e", "#3776ab", "#e44d26", "#1572b6", "#a8b9cc", "#f89820", "#659ad2", "#00b4d8", "#f05032", "#61dafb", "#68a063", "#ff7bac"];
  const LV = {
    js: "Beginner", py: "Beginner", html: "Beginner", css: "Beginner",
    c: "Beginner", java: "Intermediate", cpp: "Intermediate", sql: "Intermediate",
    git: "Beginner", react: "Intermediate", node: "Intermediate", dsa: "Advanced",
    linux: "Beginner", ts: "Intermediate", django: "Intermediate", flutter: "Intermediate"
  };

  let curCourse = null;
  let curVideoIdx = 0;
  let ytPlayer = null;
  let activeCategory = "All";
  let activeLevel = "All";
  let activeSort = "Default";

  // Helper utilities
  const lvl = c => LV[c.id] || "Beginner";
  const ini = name => (name || "").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const yid = u => {
    const m = String(u).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : u;
  };

  // Theme Controller
  function initTheme() {
    const saved = localStorage.getItem("sh_theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    const icon = saved === "light" ? "🌙" : "☀️";
    if ($("#login-theme")) $("#login-theme").textContent = icon;
    if ($("#app-theme")) $("#app-theme").textContent = icon;
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const target = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", target);
    localStorage.setItem("sh_theme", target);
    initTheme();
  }

  // Professional Tech Stack Visual Configurations & Vector Logos
  const TECH_CONFIG = {
    js: {
      color: "#f7df1e",
      bg: "linear-gradient(135deg, rgba(247,223,30,0.22), rgba(247,223,30,0.04))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><rect width="32" height="32" rx="7" fill="#f7df1e"/><path d="M19.5 24.5c1.4 0 2.2-.8 2.2-2.1v-7.8h-2.1v7.6c0 .6-.3.9-.9.9-.5 0-.8-.3-1.1-.7l-1.3 1.2c.8 1 1.9 1.5 3.2 1.5zm-8.8-.2c1.7 0 2.8-.9 2.8-2.5 0-1.5-.9-2.2-2.3-2.8l-.7-.3c-.8-.3-1.2-.6-1.2-1.1 0-.5.4-.9 1.1-.9.7 0 1.2.3 1.6.8l1.3-1.2c-.8-.9-1.7-1.3-2.9-1.3-1.6 0-2.6.9-2.6 2.3 0 1.4.8 2.1 2.2 2.7l.7.3c.9.4 1.3.7 1.3 1.2 0 .6-.5 1-1.3 1-.9 0-1.5-.5-1.9-1.1l-1.4 1.2c.8 1.1 1.8 1.8 3.2 1.8z" fill="#000"/></svg>`
    },
    py: {
      color: "#3776ab",
      bg: "linear-gradient(135deg, rgba(55,118,171,0.25), rgba(255,212,59,0.1))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><path d="M15.9 4c-5.8 0-5.5 2.5-5.5 2.5l.01 2.6h5.6v.8H8.2S4 9.4 4 15.3c0 5.8 3.6 5.6 3.6 5.6h2.2v-3.1s-.1-3.6 3.6-3.6h5.6s3.4.1 3.4-3.4V7.4S22.9 4 15.9 4zm-3.1 1.7c.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1z" fill="#3776ab"/><path d="M16.1 28c5.8 0 5.5-2.5 5.5-2.5l-.01-2.6h-5.6v-.8h7.8s4.2.5 4.2-5.4c0-5.8-3.6-5.6-3.6-5.6h-2.2v3.1s.1 3.6-3.6 3.6h-5.6s-3.4-.1-3.4 3.4v3.4s-.5 3.4 6.5 3.4zm3.1-1.7c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1z" fill="#ffd43b"/></svg>`
    },
    html: {
      color: "#e44d26",
      bg: "linear-gradient(135deg, rgba(228,77,38,0.25), rgba(241,101,41,0.1))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><path d="M6 5l2 22 8 2.2 8-2.2 2-22H6zm16.5 4.5l-.3 3.5h-9l.2 2.5h8.6l-.6 6.8-5.4 1.5-5.4-1.5-.4-4.3h2.8l.2 2.2 2.8.8 2.8-.8.3-3.2H10.6l-.7-7.5h12.6z" fill="#e44d26"/></svg>`
    },
    css: {
      color: "#1572b6",
      bg: "linear-gradient(135deg, rgba(21,114,182,0.25), rgba(51,169,220,0.1))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><path d="M6 5l2 22 8 2.2 8-2.2 2-22H6zm16.5 4.5l-.7 7.5-5.8 1.6-5.8-1.6-.4-4.3h2.8l.2 2.2 3.2.9 3.2-.9.4-4.2H9.8l-.3-3.2h13z" fill="#1572b6"/></svg>`
    },
    c: {
      color: "#659ad2",
      bg: "linear-gradient(135deg, rgba(168,185,204,0.25), rgba(101,154,210,0.1))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><circle cx="16" cy="16" r="14" fill="#659ad2"/><path d="M22 11.5c-1.5-1.5-3.6-2.5-6-2.5-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5c2.4 0 4.5-1 6-2.5l-2.2-2.2c-.9.9-2.2 1.5-3.8 1.5-3 0-5.5-2.5-5.5-5.3s2.5-5.3 5.5-5.3c1.6 0 2.9.6 3.8 1.5l2.2-2.2z" fill="#fff"/></svg>`
    },
    java: {
      color: "#f89820",
      bg: "linear-gradient(135deg, rgba(248,152,32,0.25), rgba(83,130,161,0.1))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><path d="M12 24c4 .3 7.8-.5 10-1.8.8-.5 1.5-1.2 1.3-1.8-.3-.8-1.5-.7-2.3-.5-3.5.7-7.2.5-10.7-.7-1-.3-2 .5-1.4 1.4 1 1.4 2.5 2.8 3.1 3.4zM22.3 18.2c-.3-.8-1.2-.5-1.9-.3-3 .8-6.2.7-9.3-.4-1.2-.4-2.2.4-1.6 1.5 1.2 1.9 3.3 3.6 4.2 4.1 3.5.4 6.8-.4 8.7-1.6 1-.7 1.8-1.5 1.5-2.3-.5-.5-1.1-.8-1.6-1zM16 4C13 8 18 10 16 14c-1-3-3-4-2-7 1-1.5 1.5-2.5 2-3z" fill="#f89820"/></svg>`
    },
    cpp: {
      color: "#00599c",
      bg: "linear-gradient(135deg, rgba(101,154,210,0.25), rgba(0,89,156,0.12))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><circle cx="16" cy="16" r="14" fill="#00599c"/><text x="16" y="21" font-size="13" font-weight="900" fill="#fff" text-anchor="middle" font-family="system-ui">C++</text></svg>`
    },
    sql: {
      color: "#00b4d8",
      bg: "linear-gradient(135deg, rgba(0,180,216,0.25), rgba(7,59,76,0.1))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><ellipse cx="16" cy="8" rx="10" ry="4" fill="#00b4d8"/><path d="M6 8v6c0 2.2 4.5 4 10 4s10-1.8 10-4V8M6 14v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6M6 20v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6" fill="none" stroke="#00b4d8" stroke-width="2.5"/></svg>`
    },
    git: {
      color: "#f05032",
      bg: "linear-gradient(135deg, rgba(240,80,50,0.25), rgba(240,80,50,0.05))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><rect x="3" y="3" width="26" height="26" rx="5" transform="rotate(45 16 16)" fill="#f05032"/><circle cx="12" cy="12" r="2.5" fill="#fff"/><circle cx="20" cy="12" r="2.5" fill="#fff"/><circle cx="12" cy="20" r="2.5" fill="#fff"/><path d="M12 14.5v3M12 12l8 8" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>`
    },
    react: {
      color: "#61dafb",
      bg: "linear-gradient(135deg, rgba(97,218,251,0.25), rgba(32,35,42,0.1))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#61dafb" stroke-width="1.8"/><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" fill="none" stroke="#61dafb" stroke-width="1.8"/><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" fill="none" stroke="#61dafb" stroke-width="1.8"/><circle cx="16" cy="16" r="2.8" fill="#61dafb"/></svg>`
    },
    node: {
      color: "#68a063",
      bg: "linear-gradient(135deg, rgba(104,160,99,0.25), rgba(48,48,48,0.1))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><path d="M16 4l11 6.5v13L16 30 5 23.5v-13L16 4z" fill="#68a063"/><text x="16" y="20" font-size="11" font-weight="900" fill="#fff" text-anchor="middle" font-family="system-ui">JS</text></svg>`
    },
    dsa: {
      color: "#a855f7",
      bg: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(124,92,255,0.1))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><circle cx="16" cy="8" r="3.5" fill="#a855f7"/><circle cx="8" cy="22" r="3.5" fill="#38bdf8"/><circle cx="24" cy="22" r="3.5" fill="#2fd18b"/><path d="M14 11l-4 8M18 11l4 8" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>`
    },
    linux: {
      color: "#2fd18b",
      bg: "linear-gradient(135deg, rgba(47,209,139,0.25), rgba(0,0,0,0.12))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><rect width="32" height="32" rx="7" fill="#1e1e2e"/><path d="M8 12l6 4-6 4M15 20h8" stroke="#2fd18b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    ts: {
      color: "#3178c6",
      bg: "linear-gradient(135deg, rgba(49,120,198,0.25), rgba(35,90,150,0.1))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><rect width="32" height="32" rx="6" fill="#3178c6"/><text x="16" y="22" font-size="15" font-weight="900" fill="#fff" text-anchor="middle" font-family="system-ui">TS</text></svg>`
    },
    django: {
      color: "#0c4b33",
      bg: "linear-gradient(135deg, rgba(12,75,51,0.3), rgba(47,209,139,0.1))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><rect width="32" height="32" rx="7" fill="#0c4b33"/><text x="16" y="21" font-size="12" font-weight="900" fill="#fff" text-anchor="middle" font-family="system-ui">dj</text></svg>`
    },
    flutter: {
      color: "#02569b",
      bg: "linear-gradient(135deg, rgba(2,86,155,0.25), rgba(1,117,194,0.1))",
      svg: `<svg viewBox="0 0 32 32" width="38" height="38"><path d="M19.5 4L8 15.5l3.5 3.5L26.5 4h-7zM19.5 17.5L13 24l3.5 3.5 6.5-6.5h-3.5zm-5 5L18 26l8.5-8.5h-7l-5 5z" fill="#02569b"/></svg>`
    }
  };

  // Daily Streak Calculator & Persistence
  function updateStreak() {
    const user = Auth.getCurrentUser();
    if (!user) return 1;

    const streakKey = `sh_streak_${user.id}`;
    const today = new Date().toISOString().slice(0, 10);
    let record;
    try {
      record = JSON.parse(localStorage.getItem(streakKey)) || {};
    } catch (e) {
      record = {};
    }

    let count = record.count || 1;
    if (record.lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (record.lastDate === yesterday) {
        count += 1;
      } else if (!record.lastDate) {
        count = 1;
      }
      try {
        localStorage.setItem(streakKey, JSON.stringify({ lastDate: today, count: count }));
      } catch (e) {}
    }

    if ($("#streak-num")) $("#streak-num").textContent = count;
    if ($("#m-streak-num")) $("#m-streak-num").textContent = count;
    return count;
  }

  // Update XP & Streak Header Display
  function updateXPHeader() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    const score = Store.getUserScore(user.id);
    const text = `⚡ ${score.xp} XP`;
    if ($("#user-xp")) $("#user-xp").textContent = text;
    if ($("#m-user-xp")) $("#m-user-xp").textContent = text;
    updateStreak();
  }

  // XP Level Classification
  function getLevelInfo(xp) {
    if (xp >= 3000) return { label: "Master 🔥", cls: "master" };
    if (xp >= 1500) return { label: "Advanced ⚡", cls: "advanced" };
    if (xp >= 500) return { label: "Intermediate 🚀", cls: "intermediate" };
    return { label: "Beginner 📚", cls: "beginner" };
  }

  // Get most recently watched course
  function getLastWatched() {
    const p = Store.getProgress();
    let best = null, bestDone = 0;
    if (typeof COURSES === 'undefined') return null;

    COURSES.forEach(c => {
      const d = p[c.id] || 0;
      if (d > 0 && d < c.v.length && d > bestDone) {
        bestDone = d;
        best = c;
      }
    });
    return best;
  }

  // Navigation Router
  function navigate(view, section) {
    $$("#nav a").forEach(a => a.classList.toggle("on", a.dataset.v === view));
    curCourse = null;
    ytPlayer = null;
    window.scrollTo(0, 0);
    updateXPHeader();

    if (view === "home") renderHome();
    else if (view === "courses") renderCatalog();
    else if (view === "leaderboard") Leaderboard.render($("#main"));
    else if (view === "profile") renderProfile();
    else renderMyLearning(section);
  }

  // Course Card Component with Professional Tech Badges
  function renderCourseCard(c) {
    const p = Store.getProgress();
    const d = p[c.id] || 0;
    const pct = Math.round((d / c.v.length) * 100);
    const isComplete = d >= c.v.length;
    const conf = TECH_CONFIG[c.id] || {
      color: COL[c.c % COL.length],
      bg: `${COL[c.c % COL.length]}22`,
      svg: `<span style="font-size:24px;font-weight:800">${c.ic}</span>`
    };

    return `
      <div class="card" tabindex="0" data-id="${c.id}">
        <div class="thumb" style="background:${conf.bg};position:relative">
          <div class="tech-icon-wrap" style="filter: drop-shadow(0 6px 14px ${conf.color}44)">
            ${conf.svg}
          </div>
          ${isComplete ? '<span class="done-badge">✓ DONE</span>' : ''}
        </div>
        <div class="b">
          <h3>${Security.escapeHtml(c.t)}</h3>
          <div class="mute">${Security.escapeHtml(c.by)} · ${lvl(c)}</div>
          <div class="bar"><div style="width:${pct}%"></div></div>
          <div class="mute" style="font-size:12px;margin-top:6px">
            ${isComplete ? '✅ Completed!' : pct + '% complete · ' + (c.v.length - d) + ' lessons left'}
          </div>
        </div>
      </div>
    `;
  }

  function bindCourseCards() {
    $$(".card").forEach(card => {
      card.onclick = () => renderDetail(card.dataset.id);
      card.onkeydown = e => { if (e.key === "Enter") renderDetail(card.dataset.id); };
    });
  }

  // VIEW: HOME
  function renderHome() {
    if (typeof COURSES === 'undefined') return;
    const cats = [...new Set(COURSES.map(c => c.cat))];
    const baseName = n => n.replace(/\s*\(.*?\)/g, "").trim();
    const creators = [...new Set(COURSES.map(c => baseName(c.by)))]
      .map(n => ({ n, list: COURSES.filter(c => baseName(c.by) === n) }))
      .sort((a, b) => b.list.length - a.list.length);
    const totalLessons = COURSES.reduce((a, c) => a + c.v.length, 0);
    const lastCourse = getLastWatched();
    const currentUser = Auth.getCurrentUser();
    const enrolledCount = Auth.getAllStudentIds().length;
    const p = Store.getProgress();

    $("#main").innerHTML = `
      <section class="hero">
        <div>
          <div class="hero-tag">🚀 ${enrolledCount} Enrolled Students • ${COURSES.length} Real-World Courses</div>
          <h1 class="big">Learn skills.<br>Build your future.</h1>
          <p class="mute" style="max-width:480px;font-size:16px">Free interactive video courses with live quizzes. Pass quizzes to earn XP, unlock subsequent lectures, and climb the class leaderboard.</p>
          <div class="chips" style="margin-top:20px;max-width:480px">
            <input id="hq" placeholder="What do you want to learn today?" style="flex:1;min-width:200px">
            <button id="hb">Search</button>
          </div>
        </div>
        <div class="hero-card">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div style="font-weight:700;font-size:16px">⚡ Live Learning Portal</div>
            <span class="xp-badge">Class Active</span>
          </div>
          <pre style="background:var(--input-bg);padding:14px;border-radius:10px;font-size:13px;overflow-x:auto;margin:14px 0;color:var(--pri2)"><code>const student = "${Security.escapeHtml(currentUser?.name || 'Student')}";
await student.watchLesson();
if (await student.passQuiz()) {
  unlockNextLesson(); // +50 XP
}</code></pre>
          <div class="hero-stats">
            <div class="hero-stat"><b>${enrolledCount}</b><span>Classmates</span></div>
            <div class="hero-stat"><b>${COURSES.length}</b><span>Courses</span></div>
            <div class="hero-stat"><b>60%</b><span>Pass Mark</span></div>
          </div>
        </div>
      </section>

      ${lastCourse ? `
      <div id="continue-btn" class="continue-banner" style="cursor:pointer">
        <div class="continue-thumb" style="background:${(TECH_CONFIG[lastCourse.id] || {}).bg || COL[lastCourse.c % COL.length] + '22'}">
          ${(TECH_CONFIG[lastCourse.id] || {}).svg || lastCourse.ic}
        </div>
        <div class="continue-info">
          <div class="mute" style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px">▶ Continue where you left off</div>
          <b>${Security.escapeHtml(lastCourse.t)}</b>
          <div class="mute">Lesson ${(p[lastCourse.id] || 0) + 1} of ${lastCourse.v.length} · ${Math.round(((p[lastCourse.id] || 0) / lastCourse.v.length) * 100)}% complete</div>
          <div class="continue-bar"><div class="bar"><div style="width:${Math.round(((p[lastCourse.id] || 0) / lastCourse.v.length) * 100)}%"></div></div></div>
        </div>
        <button style="white-space:nowrap">Continue →</button>
      </div>` : ""}

      <div class="sec-head"><div><h2>Popular categories</h2><div class="mute">Pick a topic and start learning</div></div></div>
      <div class="cats">${cats.map(k => `<button class="cat" data-c="${k}"><b>${k}</b><span class="mute">${COURSES.filter(c => c.cat === k).length} courses</span></button>`).join("")}</div>

      <div class="sec-head">
        <div><h2>Featured courses</h2><div class="mute">${COURSES.length} courses · ${totalLessons} lessons · quizzes after every lesson</div></div>
        <button class="ghost" id="all-c">View all courses →</button>
      </div>
      <div class="grid">${COURSES.slice(0, 8).map(renderCourseCard).join("")}</div>

      <div class="sec-head">
        <div><h2>Meet our creators</h2><div class="mute">Learn from ${creators.length} creators whose videos power SkillHub</div></div>
      </div>
      <div class="creator-grid">${creators.map((x, i) => `
        <div class="creator-card">
          <div class="cc-top">
            <span class="cc-av" style="background:linear-gradient(135deg,${COL[i % COL.length]},var(--pri))">${Security.escapeHtml(ini(x.n))}</span>
            <div><b>${Security.escapeHtml(x.n)}</b><div class="mute">${x.list.length} course${x.list.length > 1 ? "s" : ""} on SkillHub</div></div>
          </div>
          <div class="cc-chips">
            ${x.list.slice(0, 3).map(c => `<button class="cchip" data-id="${c.id}">${Security.escapeHtml(c.t)}</button>`).join("")}
            ${x.list.length > 3 ? `<span class="mute" style="font-size:12px">+${x.list.length - 3} more</span>` : ""}
          </div>
        </div>`).join("")}
      </div>

      <div class="cta">
        <div>
          <h2 style="margin:0 0 6px;color:#fff">Climb the Class Leaderboard!</h2>
          <div style="color:rgba(255,255,255,0.85)">Watch lessons, submit quizzes, and compete with ${enrolledCount - 1} fellow classmates.</div>
        </div>
        <button id="lb-btn" style="background:#fff;color:#37288f">View Leaderboard 🏆</button>
      </div>
      <footer class="foot">© 2026 SkillHub LMS. Designed for interactive learning.</footer>
    `;

    bindCourseCards();

    if (lastCourse && $("#continue-btn")) {
      $("#continue-btn").onclick = () => openCourse(lastCourse.id);
    }
    $$(".cat").forEach(b => b.onclick = () => {
      activeCategory = b.dataset.c;
      navigate("courses");
    });
    const doSearch = () => {
      if ($("#search")) $("#search").value = $("#hq").value;
      activeCategory = "All";
      navigate("courses");
    };
    if ($("#hb")) $("#hb").onclick = doSearch;
    if ($("#hq")) $("#hq").onkeydown = e => { if (e.key === "Enter") doSearch(); };
    if ($("#lb-btn")) $("#lb-btn").onclick = () => navigate("leaderboard");
    $$(".cchip").forEach(b => b.onclick = () => renderDetail(b.dataset.id));
    if ($("#all-c")) $("#all-c").onclick = () => {
      activeCategory = "All";
      if ($("#search")) $("#search").value = "";
      navigate("courses");
    };
  }

  // VIEW: COURSES CATALOG
  function renderCatalog(cat) {
    if (typeof COURSES === 'undefined') return;
    activeCategory = cat || activeCategory || "All";
    const q = ($("#search") ? $("#search").value : "").toLowerCase();
    const cats = ["All", ...new Set(COURSES.map(c => c.cat))];
    const p = Store.getProgress();

    const lo = ["All", "Beginner", "Intermediate", "Advanced"]
      .map(x => `<option value="${x}" ${x === activeLevel ? "selected" : ""}>${x === "All" ? "All levels" : x}</option>`).join("");
    const so = ["Default", "A-Z", "Progress"]
      .map(x => `<option value="${x}" ${x === activeSort ? "selected" : ""}>Sort: ${x}</option>`).join("");

    let list = COURSES.filter(c => {
      return (activeCategory === "All" || c.cat === activeCategory) &&
        (activeLevel === "All" || lvl(c) === activeLevel) &&
        c.t.toLowerCase().includes(q);
    });

    if (activeSort === "A-Z") list.sort((a, b) => a.t.localeCompare(b.t));
    if (activeSort === "Progress") {
      list.sort((a, b) => ((p[b.id] || 0) / b.v.length) - ((p[a.id] || 0) / a.v.length));
    }

    $("#main").innerHTML = `
      <h1>All courses</h1>
      <div class="mute">Explore all ${COURSES.length} courses. Pass each quiz to unlock the next video and earn XP.</div>
      <div class="chips" style="margin-top:14px">
        <select id="lv" style="width:auto">${lo}</select>
        <select id="so" style="width:auto">${so}</select>
        ${cats.map(c => `<button class="chip ${c === activeCategory ? "on" : ""}" data-c="${c}">${c}</button>`).join("")}
      </div>
      <div class="grid">${list.map(renderCourseCard).join("") || '<p class="mute">No course matches your search.</p>'}</div>
    `;

    $("#lv").onchange = e => { activeLevel = e.target.value; renderCatalog(); };
    $("#so").onchange = e => { activeSort = e.target.value; renderCatalog(); };
    $$(".chip").forEach(b => b.onclick = () => renderCatalog(b.dataset.c));
    bindCourseCards();
  }

  // Open Course Player
  function openCourse(id) {
    if (typeof COURSES === 'undefined') return;
    curCourse = COURSES.find(c => c.id === id);
    if (!curCourse) return;

    const p = Store.getProgress();
    const d = p[id] || 0;
    curVideoIdx = Math.min(d, curCourse.v.length - 1);
    if (d >= curCourse.v.length) curVideoIdx = 0;
    renderCoursePlayer();
  }

  // VIEW: COURSE PLAYER & STUDY NOTES
  function renderCoursePlayer() {
    if (!curCourse) return;
    const currentUser = Auth.getCurrentUser();
    const p = Store.getProgress();
    const d = p[curCourse.id] || 0;
    const v = curCourse.v[curVideoIdx];
    const noteKey = `sh_note_${currentUser ? currentUser.id : 'anon'}_${curCourse.id}_${curVideoIdx}`;
    const existingNote = localStorage.getItem(noteKey) || "";

    $("#main").innerHTML = `
      <button class="ghost" id="back-to-detail">← Back to course details</button>
      <h1 style="margin-top:14px">${Security.escapeHtml(curCourse.t)}</h1>
      <div class="mute" style="margin-bottom:16px">${d}/${curCourse.v.length} videos completed · Lesson ${curVideoIdx + 1} of ${curCourse.v.length}</div>
      <div class="course">
        <div>
          <div id="stage"></div>
          <h2 style="margin-top:16px">${curVideoIdx + 1}. ${Security.escapeHtml(v[0])}</h2>
          
          <div class="notes-box">
            <div class="notes-header">
              <b>📝 My Study Notes (Lesson ${curVideoIdx + 1})</b>
              <span id="note-saved" class="mute" style="font-size:12px">Auto-saved</span>
            </div>
            <textarea id="my-notes" placeholder="Type key takeaways, formulas, or code snippets for this lecture...">${Security.escapeHtml(existingNote)}</textarea>
          </div>
        </div>
        <div class="list">
          <div style="padding:10px 12px;font-weight:700;border-bottom:1px solid var(--line);margin-bottom:8px">Course Syllabus</div>
          ${curCourse.v.map((x, i) => `
            <div class="v ${i < d ? "done" : ""} ${i === curVideoIdx ? "cur" : ""} ${i > d ? "lock" : ""}" data-i="${i}">
              <span class="dot">${i < d ? "✓" : i > d ? "🔒" : ""}</span>
              <span style="flex:1">${i + 1}. ${Security.escapeHtml(x[0])}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    $("#back-to-detail").onclick = () => {
      ytPlayer = null;
      renderDetail(curCourse.id);
    };

    $$(".v").forEach(e => e.onclick = () => {
      const i = +e.dataset.i;
      const curDone = (Store.getProgress())[curCourse.id] || 0;
      if (i <= curDone) {
        curVideoIdx = i;
        renderCoursePlayer();
      }
    });

    const nArea = $("#my-notes");
    if (nArea) {
      nArea.oninput = () => {
        localStorage.setItem(noteKey, nArea.value);
        $("#note-saved").textContent = "Saving...";
        setTimeout(() => { if ($("#note-saved")) $("#note-saved").textContent = "✓ Saved"; }, 350);
      };
    }

    renderVideoStage();
  }

  // Video Stage Renderer
  function renderVideoStage() {
    const v = curCourse.v[curVideoIdx];
    const isList = /^PL[\w-]{10,}$/.test(v[1]);
    const embedUrl = host => isList
      ? `https://${host}/embed/videoseries?list=${v[1]}`
      : `https://${host}/embed/${yid(v[1])}`;

    $("#stage").innerHTML = `
      <div class="player"><div id="yt"></div></div>
      <div style="margin-top:12px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
        <button id="tq">Finished Video: Take Quiz (+50 XP)</button>
        <span class="mute" style="font-size:13px">${isList ? "Watch the videos in the playlist, then take the quiz." : "Quiz also opens automatically when the video finishes."}</span>
      </div>
    `;

    $("#tq").onclick = () => {
      try { if (ytPlayer && ytPlayer.destroy) ytPlayer.destroy(); } catch (e) {}
      ytPlayer = null;
      Quiz.start({
        course: curCourse,
        lessonIndex: curVideoIdx,
        container: $("#stage"),
        onNext: () => { curVideoIdx++; renderCoursePlayer(); },
        onRewatch: () => renderVideoStage(),
        onComplete: () => renderCatalog(),
        onUpdateXP: () => updateXPHeader()
      });
    };

    if (location.protocol === "file:") {
      const videoId = isList ? v[1] : yid(v[1]);
      const ytUrl = isList
        ? "https://www.youtube.com/playlist?list=" + videoId
        : "https://www.youtube.com/watch?v=" + videoId;
      const thumbUrl = isList ? "" : "https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg";
      let popWin = null;

      $("#yt").outerHTML = `
        <div id="yt-thumb-wrap" style="
          position:absolute; inset:0; display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          background:#000; border-radius:14px; overflow:hidden; cursor:pointer;
        ">
          ${thumbUrl ? '<img src="' + thumbUrl + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.55;" onerror="this.style.display=\'none\'">' : ""}
          <div style="position:relative;text-align:center;padding:20px">
            <div style="width:68px;height:48px;background:#ff0000;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;box-shadow:0 4px 20px rgba(255,0,0,0.5);">
              <span style="color:#fff;font-size:28px;margin-left:4px">&#9654;</span>
            </div>
            <div style="color:#fff;font-weight:700;font-size:15px;margin-bottom:6px">Click to Watch Video</div>
            <div style="color:#aaa;font-size:12px">Video opens in a small window — this page stays open</div>
          </div>
        </div>
      `;
      document.getElementById("yt-thumb-wrap").onclick = function () {
        const w = 860, h = 520;
        const left = Math.round(screen.width / 2 - w / 2);
        const top = Math.round(screen.height / 2 - h / 2);
        if (popWin && !popWin.closed) { popWin.focus(); return; }
        popWin = window.open(ytUrl, "skillhub_video",
          "width=" + w + ",height=" + h + ",left=" + left + ",top=" + top + ",resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no"
        );
      };
      return;
    }

    const makePlayer = () => {
      ytPlayer = new YT.Player("yt", isList ? {
        host: "https://www.youtube-nocookie.com",
        playerVars: { listType: "playlist", list: v[1], rel: 0, modestbranding: 1, playsinline: 1 }
      } : {
        videoId: yid(v[1]),
        host: "https://www.youtube-nocookie.com",
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onStateChange: e => {
            if (e.data === 0) {
              if ($("#tq")) $("#tq").click();
            }
          }
        }
      });
    };

    if (window.YT && YT.Player) {
      makePlayer();
    } else {
      window.onYouTubeIframeAPIReady = makePlayer;
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.onerror = () => {
        $("#yt").outerHTML = `<iframe src="${embedUrl("www.youtube.com")}" allowfullscreen></iframe>`;
      };
      document.head.appendChild(s);
    }
  }

  // VIEW: COURSE DETAIL
  function renderDetail(id, tab) {
    if (typeof COURSES === 'undefined') return;
    const c = COURSES.find(x => x.id === id);
    if (!c) return;

    const p = Store.getProgress();
    const d = p[id] || 0;
    const n = c.v.length;
    tab = tab || "Overview";

    const bodyMap = {
      Overview: `<p>Learn ${Security.escapeHtml(c.t)} step by step. Watch each video, then pass an interactive quiz (60% to pass) to unlock the next lesson and earn +50 XP.</p><ul><li>${n} video lessons and ${n} quizzes</li><li>Level: ${lvl(c)}</li><li>Category: ${c.cat}</li></ul>`,
      "Course content": `<div class="list" style="max-width:640px">${c.v.map((x, i) => `<div class="v ${i < d ? "done" : ""} ${i > d ? "lock" : ""}"><span class="dot">${i < d ? "✓" : i > d ? "🔒" : ""}</span><span>${i + 1}. ${Security.escapeHtml(x[0])}</span><span class="mute" style="margin-left:auto">${x[2].length ? x[2].length + " questions" : "No quiz"}</span></div>`).join("")}</div>`,
      Instructor: `<div class="cr" style="align-items:flex-start"><span class="av">${ini(c.by)}</span><b>${Security.escapeHtml(c.by)}</b><span class="mute">${COURSES.filter(k => k.by === c.by).length} course(s) on SkillHub</span></div>`
    };

    $("#main").innerHTML = `
      <button class="ghost" id="bk">← Back to courses</button>
      <div class="dh" style="margin-top:18px">
        <div class="thumb" style="background:${(TECH_CONFIG[c.id] || {}).bg || COL[c.c % COL.length] + '22'};border-radius:18px;display:grid;place-items:center">
          ${(TECH_CONFIG[c.id] || {}).svg || c.ic}
        </div>
        <div>
          <h1>${Security.escapeHtml(c.t)}</h1>
          <div class="mute">${Security.escapeHtml(c.by)} · ${lvl(c)} · ${n} lessons</div>
          <div class="bar" style="width:260px"><div style="width:${Math.round((d / n) * 100)}%"></div></div>
          <div class="mute" style="font-size:12px;margin:6px 0 12px">${d}/${n} completed</div>
          <button id="st">${d === 0 ? "Start learning" : d >= n ? "Review course" : "Continue learning"}</button>
        </div>
      </div>
      <div class="tabs">${["Overview", "Course content", "Instructor"].map(k => `<button class="${k === tab ? "on" : ""}" data-t="${k}">${k}</button>`).join("")}</div>
      ${bodyMap[tab]}
    `;

    $("#bk").onclick = () => renderCatalog();
    $("#st").onclick = () => openCourse(id);
    $$(".tabs button").forEach(b => b.onclick = () => renderDetail(id, b.dataset.t));
  }

  // VIEW: MY LEARNING
  function renderMyLearning(sec) {
    if (typeof COURSES === 'undefined') return;
    sec = sec || "Overview";
    const user = Auth.getCurrentUser();
    const p = Store.getProgress();
    const inp = COURSES.filter(c => (p[c.id] || 0) > 0 && (p[c.id] || 0) < c.v.length);
    const fin = COURSES.filter(c => (p[c.id] || 0) >= c.v.length);
    const tot = COURSES.reduce((a, c) => a + (p[c.id] || 0), 0);
    const xp = tot * 50;

    const row = c => `
      <div class="rowc">
        <b>${Security.escapeHtml(c.t)}</b>
        <span class="mute">${p[c.id] || 0}/${c.v.length} videos</span>
        <button data-o="${c.id}">${(p[c.id] || 0) >= c.v.length ? "Review" : "Continue"}</button>
      </div>
    `;
    const none = m => `<p class="mute">${m}</p>`;

    const sections = {
      Overview: `
        <h1>Welcome back, ${Security.escapeHtml(user ? user.name : 'Student')}</h1>
        <div class="mute">Keep up the momentum. Every quiz passed earns you XP!</div>
        <div class="stats">
          <div class="stat"><span class="mute">XP Earned</span><b>⚡ ${xp} XP</b></div>
          <div class="stat"><span class="mute">In progress</span><b>${inp.length}</b></div>
          <div class="stat"><span class="mute">Videos passed</span><b>${tot}</b></div>
        </div>
        <h2 style="margin-top:0">Continue learning</h2>
        ${inp.map(row).join("") || none("Nothing in progress yet. Open Courses and start one.")}
      `,
      "In progress": `<h1>In progress</h1>${inp.map(row).join("") || none("No courses in progress.")}`,
      Completed: `<h1>Completed</h1>${fin.map(row).join("") || none("No completed courses yet.")}`,
      Profile: `
        <h1>Profile</h1>
        <div class="stat" style="max-width:380px">
          <b>${Security.escapeHtml(user ? user.name : 'Student')}</b>
          <div class="mute" style="margin-top:6px">Student ID: ${user ? user.id : 'N/A'}</div>
          <div class="mute">Total XP: ⚡ ${xp} XP</div>
          <div class="mute">Videos passed: ${tot}</div>
        </div>
        <p style="margin-top:20px"><button id="btn-full-prof">View Full Profile →</button></p>
      `
    };

    $("#main").innerHTML = `
      <div class="side">
        <aside class="list">${Object.keys(sections).map(k => `<div class="v ${k === sec ? "cur" : ""}" data-s="${k}">${k}</div>`).join("")}</aside>
        <div>${sections[sec]}</div>
      </div>
    `;

    $$("[data-s]").forEach(e => e.onclick = () => renderMyLearning(e.dataset.s));
    $$("[data-o]").forEach(e => e.onclick = () => openCourse(e.dataset.o));
    if ($("#btn-full-prof")) $("#btn-full-prof").onclick = () => renderProfile();
  }

  // VIEW: STUDENT PROFILE
  function renderProfile() {
    if (typeof COURSES === 'undefined') return;
    const user = Auth.getCurrentUser();
    if (!user) return;

    const p = Store.getProgress();
    const score = Store.getUserScore(user.id);
    const xp = score.xp;
    const tot = score.passed;
    const level = getLevelInfo(xp);
    const completedCourses = COURSES.filter(c => (p[c.id] || 0) >= c.v.length);
    const inProgressCourses = COURSES.filter(c => (p[c.id] || 0) > 0 && (p[c.id] || 0) < c.v.length);
    const totalLessons = COURSES.reduce((a, c) => a + c.v.length, 0);

    const levels = [0, 500, 1500, 3000];
    const levelNames = ["Beginner", "Intermediate", "Advanced", "Master"];
    let curLvlIdx = 0;
    for (let i = levels.length - 1; i >= 0; i--) {
      if (xp >= levels[i]) { curLvlIdx = i; break; }
    }
    const nextXP = levels[curLvlIdx + 1] || levels[levels.length - 1];
    const prevXP = levels[curLvlIdx];
    const xpPct = curLvlIdx >= levels.length - 1 ? 100 : Math.round(((xp - prevXP) / (nextXP - prevXP)) * 100);

    $("#main").innerHTML = `
      <div class="profile-header">
        <div class="profile-avatar">${ini(user.name)}</div>
        <div class="profile-info">
          <h2>${Security.escapeHtml(user.name)}</h2>
          <div class="mute">Student ID: ${user.id}</div>
          <span class="level-badge ${level.cls}">${level.label}</span>
        </div>
      </div>

      <div class="profile-stats-grid">
        <div class="pstat">
          <div class="pstat-icon">⚡</div>
          <b style="color:var(--gold)">${xp}</b>
          <span>XP Earned</span>
        </div>
        <div class="pstat">
          <div class="pstat-icon">🏆</div>
          <b style="color:var(--pri2)">Active</b>
          <span>Class Status</span>
        </div>
        <div class="pstat">
          <div class="pstat-icon">✅</div>
          <b style="color:var(--ok)">${tot}</b>
          <span>Lessons Passed</span>
        </div>
        <div class="pstat">
          <div class="pstat-icon">🎓</div>
          <b>${completedCourses.length}</b>
          <span>Courses Done</span>
        </div>
        <div class="pstat">
          <div class="pstat-icon">📚</div>
          <b style="color:var(--pri)">${inProgressCourses.length}</b>
          <span>In Progress</span>
        </div>
        <div class="pstat">
          <div class="pstat-icon">📊</div>
          <b>${totalLessons > 0 ? Math.round((tot / totalLessons) * 100) : 0}%</b>
          <span>Overall Progress</span>
        </div>
      </div>

      <div class="xp-progress-wrap">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <b>XP Progress — ${levelNames[curLvlIdx]}</b>
          <span class="mute">${curLvlIdx < levels.length - 1 ? xp + ' / ' + nextXP + ' XP to ' + levelNames[curLvlIdx + 1] : '🔥 Max Level Reached!'}</span>
        </div>
        <div class="xp-bar-track">
          <div class="xp-bar-fill" style="width:${xpPct}%"></div>
        </div>
        <div class="mute" style="font-size:12px">${xpPct}% to next level ${curLvlIdx < levels.length - 1 ? '· ' + (nextXP - xp) + ' XP remaining' : ''}</div>
      </div>

      <h2 style="margin-bottom:14px">📈 Course Progress</h2>
      <div class="course-progress-list">
        ${COURSES.map(c => {
          const d = p[c.id] || 0;
          const pc = Math.round((d / c.v.length) * 100);
          const isComplete = d >= c.v.length;
          return `
            <div class="cp-row" style="cursor:pointer" data-cpid="${c.id}">
              <div class="cp-icon" style="background:${COL[c.c % COL.length]}22;color:${COL[c.c % COL.length]}">${c.ic}</div>
              <div class="cp-info">
                <b>${Security.escapeHtml(c.t)}</b>
                <div class="mute">${d}/${c.v.length} lessons · ${isComplete ? '✅ Complete' : pc + '% done'}</div>
                <div class="cp-bar"><div style="width:${pc}%;background:${isComplete ? 'var(--ok)' : 'linear-gradient(90deg,var(--pri),var(--pri2))'}"></div></div>
              </div>
              <div style="font-size:14px;font-weight:700;color:${isComplete ? 'var(--ok)' : pc > 0 ? 'var(--pri2)' : 'var(--mute)'}">${isComplete ? '✓' : pc > 0 ? pc + '%' : '—'}</div>
            </div>
          `;
        }).join("")}
      </div>

      <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
        <button id="browse-courses-btn">Browse Courses 📚</button>
        <button class="ghost" id="rst-btn">Reset my progress</button>
      </div>
    `;

    $$("[data-cpid]").forEach(e => e.onclick = () => renderDetail(e.dataset.cpid));
    if ($("#browse-courses-btn")) $("#browse-courses-btn").onclick = () => navigate("courses");

    const r = $("#rst-btn");
    if (r) {
      r.onclick = () => {
        if (r.dataset.sure) {
          Store.resetProgress();
          updateXPHeader();
          renderProfile();
        } else {
          r.dataset.sure = "1";
          r.textContent = "Click again to confirm reset";
          r.style.background = "var(--bad)";
        }
      };
    }
  }

  // Application Bootstrapper
  async function boot() {
    initTheme();
    const user = Auth.getCurrentUser();

    if (user) {
      if ($("#login")) $("#login").classList.add("hide");
      if ($("#app")) $("#app").classList.remove("hide");
      if ($("#who")) $("#who").textContent = user.name;

      if ($("#main")) {
        $("#main").innerHTML = `
          <div style="text-align:center;padding:60px;color:var(--mute)">
            <div style="font-size:32px;margin-bottom:12px">☁️</div>
            <div style="font-weight:600">Verifying security & syncing with cloud...</div>
          </div>
        `;
      }

      await Promise.all([
        Store.syncFromFirestore(),
        Store.loadAllScores()
      ]);

      updateXPHeader();
      navigate("home");
    } else {
      if ($("#login")) $("#login").classList.remove("hide");
      if ($("#app")) $("#app").classList.add("hide");
    }
  }

  // Token of Love Popup Animation (5 seconds auto-dismiss or manual cross)
  let tokenPopupTimer = null;

  function showLoveTokenPopup() {
    const oldModal = $("#token-love-modal");
    if (oldModal) oldModal.remove();
    if (tokenPopupTimer) clearTimeout(tokenPopupTimer);

    const overlay = document.createElement("div");
    overlay.id = "token-love-modal";
    overlay.className = "token-modal-overlay";
    overlay.innerHTML = `
      <div class="token-modal-card" role="dialog" aria-modal="true">
        <button type="button" class="token-modal-close" id="token-close-btn" title="Close" aria-label="Close">✕</button>
        <div class="token-heart-icon">💖</div>
        <div class="token-subtitle">Welcome to SkillHub</div>
        <div class="token-main-text">
          A Token of love from
          <span class="token-highlight">HUZAIFA JAVED SULEHRI BSSE</span>
        </div>
        <div class="token-timer-bar">
          <div class="token-timer-fill"></div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add("show");
    });

    const closeModal = () => {
      if (tokenPopupTimer) {
        clearTimeout(tokenPopupTimer);
        tokenPopupTimer = null;
      }
      overlay.classList.remove("show");
      setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 350);
    };

    const closeBtn = overlay.querySelector("#token-close-btn");
    if (closeBtn) closeBtn.onclick = closeModal;

    overlay.onclick = e => {
      if (e.target === overlay) closeModal();
    };

    tokenPopupTimer = setTimeout(closeModal, 5000);
  }

  // Event Listeners & Bindings
  function setupEvents() {
    if ($("#login-theme")) $("#login-theme").onclick = toggleTheme;
    if ($("#app-theme")) $("#app-theme").onclick = toggleTheme;

    // Show/Hide Password
    const pwt = $("#pw-toggle");
    if (pwt) {
      pwt.onclick = () => {
        const inp = $("#pw");
        if (inp.type === "password") {
          inp.type = "text";
          pwt.textContent = "🙈";
        } else {
          inp.type = "password";
          pwt.textContent = "👁️";
        }
      };
    }

    // Login action
    const goBtn = $("#go");
    if (goBtn) {
      goBtn.onclick = () => {
        const uid = $("#uid").value.trim().toUpperCase();
        const pw = $("#pw").value.trim();
        const res = Auth.login(uid, pw);

        if (res.success) {
          if ($("#err")) $("#err").textContent = "";
          boot();
          showLoveTokenPopup();
        } else {
          if ($("#err")) $("#err").textContent = res.message;
        }
      };
    }

    if ($("#pw")) {
      $("#pw").onkeydown = e => {
        if (e.key === "Enter" && $("#go")) $("#go").click();
      };
    }

    // Logout
    const logoutAction = () => {
      Auth.logout();
      boot();
    };
    if ($("#out")) $("#out").onclick = logoutAction;
    if ($("#m-out")) $("#m-out").onclick = logoutAction;

    // Logo & Header search
    if ($("#home")) $("#home").onclick = () => {
      if ($("#search")) $("#search").value = "";
      navigate("home");
    };
    if ($("#search")) $("#search").oninput = () => navigate("courses");

    // Nav links
    $$("#nav a").forEach(a => a.onclick = () => navigate(a.dataset.v));

    // Hamburger Mobile Menu
    const mToggle = $("#menu-toggle");
    const mMenu = $("#mobile-menu");
    if (mToggle && mMenu) {
      mToggle.onclick = () => {
        const isOpen = mMenu.classList.toggle("open");
        mToggle.textContent = isOpen ? "✕" : "☰";
      };
      $$("#mobile-menu a").forEach(a => {
        a.onclick = () => {
          mMenu.classList.remove("open");
          mToggle.textContent = "☰";
          navigate(a.dataset.v);
        };
      });
    }
  }

  // Initialize on DOM load
  document.addEventListener("DOMContentLoaded", () => {
    setupEvents();
    boot();
  });

  const App = Object.freeze({
    boot: boot,
    navigate: navigate,
    showLoveToken: showLoveTokenPopup
  });

  global.App = App;
})(window);
