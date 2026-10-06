/**
 * SkillHub Interactive Quiz Engine
 * - Dynamic question & answer randomization
 * - Rigorous evaluation against 60% passing threshold
 * - Sequential lesson unlock validation
 * - Pure JS Canvas Confetti celebration
 */
(function (global) {
  'use strict';

  const PASS_THRESHOLD = 0.6; // 60%

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function launchConfetti() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "99999";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#7c5cff", "#2fd18b", "#ffb800", "#ff5d73", "#38bdf8", "#ec4899", "#a855f7"];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 260,
        y: canvas.height * 0.45 + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 1.2) * 16 - 4,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 14,
        alpha: 1,
        decay: Math.random() * 0.012 + 0.012
      });
    }

    let anim;
    function step() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = 0;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.rotation += p.rSpeed;
        p.alpha -= p.decay;
        if (p.alpha > 0) {
          active++;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
          ctx.restore();
        }
      }
      if (active > 0) {
        anim = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(anim);
        canvas.remove();
      }
    }
    anim = requestAnimationFrame(step);
  }

  /**
   * Starts a quiz for the current course and lesson.
   */
  function startQuiz(options) {
    const { course, lessonIndex, container, onNext, onRewatch, onComplete, onUpdateXP } = options;
    const lesson = course.v[lessonIndex];
    const rawQuestions = lesson[2] || [];
    const isLastLesson = lessonIndex === course.v.length - 1;
    const progress = Store.getProgress();
    const currentDone = progress[course.id] || 0;

    // Handle lessons without questions
    if (!rawQuestions.length) {
      if (currentDone === lessonIndex) {
        progress[course.id] = lessonIndex + 1;
        Store.saveProgress(progress);
        if (onUpdateXP) onUpdateXP();
      }
      container.innerHTML = `
        <div class="quiz">
          <h2 style="margin-top:0">${Security.escapeHtml(lesson[0])}</h2>
          <div class="mute">No quiz for this video. Lesson completed!</div>
          <p><button id="quiz-auto-nx">${isLastLesson ? "Back to Dashboard" : "Next Video"}</button></p>
        </div>
      `;
      document.getElementById("quiz-auto-nx").onclick = () => {
        if (isLastLesson) {
          if (onComplete) onComplete();
        } else {
          if (onNext) onNext();
        }
      };
      return;
    }

    // Dynamic question & answer option shuffling
    const questions = shuffle(rawQuestions).map(q => {
      const originalOptions = q[1];
      const correctIdx = q[2];
      const indexMap = shuffle(originalOptions.map((_, i) => i));
      const shuffledOptions = indexMap.map(i => originalOptions[i]);
      const newCorrectIdx = indexMap.indexOf(correctIdx);

      return {
        prompt: q[0],
        options: shuffledOptions,
        answer: newCorrectIdx
      };
    });

    container.innerHTML = `
      <div class="quiz">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <h2 style="margin:0">Quiz: ${Security.escapeHtml(lesson[0])}</h2>
          <span class="xp-badge">Reward: +50 XP</span>
        </div>
        <div class="mute" style="margin-top:4px">Score ${Math.round(PASS_THRESHOLD * 100)}% or higher to unlock the next lecture.</div>
        ${questions.map((q, i) => `
          <div class="q">
            <b>${i + 1}. ${Security.escapeHtml(q.prompt)}</b>
            ${q.options.map((opt, j) => `
              <label class="opt">
                <input type="radio" name="quiz_q_${i}" value="${j}">
                ${Security.escapeHtml(opt)}
              </label>
            `).join("")}
          </div>
        `).join("")}
        <div id="quiz-err-msg"></div>
        <button id="quiz-submit-btn">Submit Quiz Answers</button>
      </div>
    `;

    document.getElementById("quiz-submit-btn").onclick = () => {
      const answeredCount = questions.filter((_, i) => {
        return Boolean(document.querySelector(`input[name="quiz_q_${i}"]:checked`));
      }).length;

      const errMsg = document.getElementById("quiz-err-msg");
      if (answeredCount < questions.length) {
        if (errMsg) {
          errMsg.innerHTML = `<div class="res no">⚠️ Please answer all questions first (${answeredCount}/${questions.length} answered).</div>`;
        }
        return;
      }

      let correctCount = 0;
      questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="quiz_q_${i}"]:checked`);
        const userChoice = selected ? Number(selected.value) : -1;
        if (userChoice === q.answer) {
          correctCount++;
        }

        document.querySelectorAll(`input[name="quiz_q_${i}"]`).forEach(optInput => {
          const lbl = optInput.closest(".opt");
          const val = Number(optInput.value);
          optInput.disabled = true;
          if (lbl) {
            if (val === q.answer) {
              lbl.style.borderColor = "var(--ok)";
              lbl.style.background = "rgba(47, 209, 139, 0.2)";
            } else if (val === userChoice) {
              lbl.style.borderColor = "var(--bad)";
              lbl.style.background = "rgba(255, 93, 115, 0.2)";
            }
          }
        });
      });

      const percentage = Math.round((correctCount / questions.length) * 100);
      const passed = (correctCount / questions.length) >= PASS_THRESHOLD;

      if (passed) {
        launchConfetti();

        // Strictly sequential lesson unlock
        const curProgress = Store.getProgress();
        const curDone = curProgress[course.id] || 0;
        if (curDone === lessonIndex) {
          curProgress[course.id] = lessonIndex + 1;
          Store.saveProgress(curProgress);
          if (onUpdateXP) onUpdateXP();
        }

        const currentUser = Auth.getCurrentUser();
        const score = Store.getUserScore(currentUser ? currentUser.id : null);

        container.innerHTML = `
          <div class="result-screen">
            <div class="result-icon">🎉</div>
            <h2 style="margin:0 0 4px;color:var(--ok)">Quiz Passed!</h2>
            <div class="mute" style="margin-bottom:18px">${isLastLesson ? "You completed this course!" : "Next lecture is now unlocked!"}</div>
            <div class="result-score-ring">${percentage}%</div>
            <div class="result-stats-row">
              <div class="result-stat">
                <b style="color:var(--ok)">${correctCount}/${questions.length}</b>
                <span>Correct answers</span>
              </div>
              <div class="result-stat">
                <b style="color:var(--gold)">+50</b>
                <span>XP Earned</span>
              </div>
              <div class="result-stat">
                <b style="color:var(--pri2)">${score.xp}</b>
                <span>Total XP</span>
              </div>
            </div>
            ${isLastLesson ? `<div style="padding:14px;background:rgba(47,209,139,0.1);border:1px solid rgba(47,209,139,0.3);border-radius:12px;color:var(--ok);font-weight:700;margin-bottom:16px">🏆 Course 100% Completed! You're amazing!</div>` : ""}
            <div class="result-btns">
              ${isLastLesson
                ? `<button id="quiz-next-btn">🏠 Back to Dashboard</button><button class="ghost" id="quiz-view-lb">View Leaderboard 🏆</button>`
                : `<button id="quiz-next-btn">Next Video →</button><button class="ghost" id="quiz-rewatch-btn">Rewatch Video</button>`
              }
            </div>
          </div>
        `;

        document.getElementById("quiz-next-btn").onclick = () => {
          if (isLastLesson) {
            if (onComplete) onComplete();
          } else {
            if (onNext) onNext();
          }
        };

        if (isLastLesson && document.getElementById("quiz-view-lb")) {
          document.getElementById("quiz-view-lb").onclick = () => {
            if (global.App && global.App.navigate) {
              global.App.navigate("leaderboard");
            }
          };
        }

        if (!isLastLesson && document.getElementById("quiz-rewatch-btn")) {
          document.getElementById("quiz-rewatch-btn").onclick = () => {
            if (onRewatch) onRewatch();
          };
        }
      } else {
        const needed = Math.ceil(PASS_THRESHOLD * questions.length) - correctCount;
        const currentUser = Auth.getCurrentUser();
        const score = Store.getUserScore(currentUser ? currentUser.id : null);

        container.innerHTML = `
          <div class="result-screen">
            <div class="result-icon">😔</div>
            <h2 style="margin:0 0 4px;color:var(--bad)">Quiz Failed</h2>
            <div class="mute" style="margin-bottom:18px">You need ${Math.round(PASS_THRESHOLD * 100)}% to pass. Keep trying!</div>
            <div class="result-score-ring fail">${percentage}%</div>
            <div class="result-stats-row">
              <div class="result-stat">
                <b style="color:var(--bad)">${correctCount}/${questions.length}</b>
                <span>Correct answers</span>
              </div>
              <div class="result-stat">
                <b style="color:var(--mute)">${needed}</b>
                <span>More needed</span>
              </div>
              <div class="result-stat">
                <b style="color:var(--pri2)">${score.xp}</b>
                <span>Total XP</span>
              </div>
            </div>
            <div class="result-btns">
              <button id="quiz-retry-btn">🔄 Retry Quiz</button>
              <button class="ghost" id="quiz-rewatch-btn">📺 Rewatch Video</button>
            </div>
          </div>
        `;

        document.getElementById("quiz-retry-btn").onclick = () => {
          startQuiz(options);
        };
        document.getElementById("quiz-rewatch-btn").onclick = () => {
          if (onRewatch) onRewatch();
        };
      }
    };
  }

  const Quiz = Object.freeze({
    start: startQuiz,
    launchConfetti: launchConfetti
  });

  global.Quiz = Quiz;
})(window);
