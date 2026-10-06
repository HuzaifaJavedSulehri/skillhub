/**
 * SkillHub Class Leaderboard Module
 * - Real-time cloud rankings sanitized against manipulation
 * - Privacy protection: masks student IDs for classmates
 * - Visual Podium & Standings Table
 */
(function (global) {
  'use strict';

  async function renderLeaderboard(container) {
    container.innerHTML = `
      <div style="text-align:center;padding:60px;color:var(--mute)">
        <div style="font-size:32px;margin-bottom:12px">🏆</div>
        <div style="font-weight:600">Verifying and loading cloud standings...</div>
      </div>
    `;

    // 1. Fetch & sanitize cloud scores
    await Store.loadAllScores();

    const currentUser = Auth.getCurrentUser();
    const currentUserId = currentUser ? currentUser.id : null;
    const allStudents = Auth.getAllStudents();

    // 2. Compute verified sanitized scores for every student
    const studentScores = allStudents.map(function (s) {
      const isMe = s.id === currentUserId;
      const score = Store.getUserScore(s.id);
      return {
        id: s.id,
        name: s.name,
        passed: score.passed,
        xp: score.xp,
        isMe: isMe
      };
    });

    // 3. Only show active learners (XP > 0)
    const activeStudents = studentScores.filter(function (s) {
      return s.xp > 0;
    });

    // 4. Strict ranking: highest XP first, then lessons passed
    activeStudents.sort(function (a, b) {
      return (b.xp - a.xp) || (b.passed - a.passed);
    });

    const me = studentScores.find(function (s) {
      return s.isMe;
    }) || { xp: 0, passed: 0 };

    const myRankIdx = activeStudents.findIndex(function (s) {
      return s.isMe;
    });
    const myRank = me.xp > 0 && myRankIdx !== -1 ? (myRankIdx + 1) : '-';

    const top1 = activeStudents[0];
    const top2 = activeStudents[1];
    const top3 = activeStudents[2];

    let podiumHtml = '';
    if (activeStudents.length > 0) {
      podiumHtml = `
        <div class="podium">
          <div class="podium-card second">
            <div class="podium-badge">🥈</div>
            <h3 style="margin:4px 0">${top2 ? Security.escapeHtml(top2.name) : "—"}</h3>
            <div class="mute">${top2 ? top2.passed + " lessons passed" : "No score yet"}</div>
            <div class="xp-badge" style="margin-top:8px">⚡ ${top2 ? top2.xp : 0} XP</div>
          </div>
          <div class="podium-card first">
            <div class="podium-badge">🥇</div>
            <h3 style="margin:4px 0">${top1 ? Security.escapeHtml(top1.name) : "—"}</h3>
            <div class="mute">${top1 ? top1.passed + " lessons passed" : "No score yet"}</div>
            <div class="xp-badge" style="margin-top:8px">⚡ ${top1 ? top1.xp : 0} XP</div>
          </div>
          <div class="podium-card third">
            <div class="podium-badge">🥉</div>
            <h3 style="margin:4px 0">${top3 ? Security.escapeHtml(top3.name) : "—"}</h3>
            <div class="mute">${top3 ? top3.passed + " lessons passed" : "No score yet"}</div>
            <div class="xp-badge" style="margin-top:8px">⚡ ${top3 ? top3.xp : 0} XP</div>
          </div>
        </div>
      `;
    }

    let tableHtml = '';
    if (activeStudents.length === 0) {
      tableHtml = `
        <div style="text-align:center;padding:48px 20px;background:var(--panel);border:1px dashed var(--line);border-radius:16px;margin:24px 0">
          <div style="font-size:40px;margin-bottom:10px">🏁</div>
          <h3 style="margin:0 0 6px">No one has earned XP yet!</h3>
          <p class="mute" style="margin:0">Watch a video, pass a quiz, and be the first to take the #1 spot on the leaderboard!</p>
        </div>
      `;
    } else {
      tableHtml = `
        <h2>Full Class Standings</h2>
        <table class="lb-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Student ID</th>
              <th>Videos Passed</th>
              <th>XP Points</th>
              <th>Badge</th>
            </tr>
          </thead>
          <tbody>
            ${activeStudents.map(function (s, idx) {
              const rank = idx + 1;
              const badge = rank <= 3 ? "Champion 👑" : rank <= 10 ? "Top 10 ⭐" : rank <= 25 ? "Rising Star 🚀" : "Learner 📚";
              // PRIVACY FIX: Mask student ID for classmates so other IDs cannot be scraped
              const displayId = Security.maskStudentId(s.id, s.isMe);

              return `
                <tr class="lb-row ${s.isMe ? "me" : ""}">
                  <td><b>#${rank}</b></td>
                  <td>
                    <b>${Security.escapeHtml(s.name)}</b>
                    ${s.isMe ? '<span style="color:var(--pri2);font-weight:700"> (You)</span>' : ''}
                  </td>
                  <td class="mute">${displayId}</td>
                  <td>${s.passed} lessons</td>
                  <td><span class="xp-badge">⚡ ${s.xp} XP</span></td>
                  <td><span class="mute">${badge}</span></td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      `;
    }

    container.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:14px">
        <div>
          <h1>Class Leaderboard 🏆</h1>
          <div class="mute">Live rankings — authenticated and verified from the cloud. ☁️</div>
          <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(47,209,139,0.12);color:var(--ok);padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;margin-top:6px;border:1px solid rgba(47,209,139,0.3)">
            🛡️ Cryptographic Anti-Cheat Active · Video Quizzes Required
          </div>
        </div>
        <div class="stat" style="padding:10px 18px">
          <span class="mute" style="font-size:12px">Your Ranking:</span>
          <b style="font-size:22px;color:var(--pri2)">${myRank !== '-' ? '#' + myRank : 'Unranked'}</b>
        </div>
      </div>

      <div class="stat" style="margin:18px 0">
        <span class="mute">Your verified progress</span>
        <b>⚡ ${me.xp} XP</b> <span class="mute">· ${me.passed} lesson(s) passed</span>
      </div>

      ${podiumHtml}
      ${tableHtml}
    `;
  }

  const Leaderboard = Object.freeze({
    render: renderLeaderboard
  });

  global.Leaderboard = Leaderboard;
})(window);
