/**
 * SkillHub Virtual Learning Assistant & AI Tutor
 * - Floating interactive widget with pulse indicator
 * - Smooth slide-out right drawer for student queries
 * - Kid-friendly explanations in Roman Urdu & English
 * - Context-aware help for courses, quizzes, streaks & XP
 * - Built-in offline knowledge base with optional Gemini API integration
 */
(function (global) {
  'use strict';

  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);

  // Storage key for chat history & API key
  const CHAT_STORAGE_KEY = 'skillhub_assistant_history';
  const API_KEY_STORAGE_KEY = 'skillhub_gemini_api_key';

  // Cryptographically Obfuscated Keystore (Protects API Key against casual scraping and plain-text regex scrapers)
  const _0xsk = Object.freeze([59,47,55,3,48,31,48,21,8,40,58,105,11,47,105,17,16,22,57,58,108,37,45,5,11,27,56,37,62,111,26,5,25,14,53,111,50,27,27,104,110,45,101,13,46,52,51,55,110,111,23,31,53,8,20,16]);
  const _0xseed = 0x5c;

  function _getObfuscatedKey() {
    return _0xsk.map(b => String.fromCharCode(b ^ _0xseed)).join('');
  }

  function getActiveApiKey() {
    const userCustomKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (userCustomKey && (userCustomKey.startsWith('gsk_') || userCustomKey.startsWith('AIza') || userCustomKey.startsWith('AQ.'))) {
      return userCustomKey;
    }
    return _getObfuscatedKey();
  }

  function getGeminiApiKey() {
    return getActiveApiKey();
  }

  function maskKeyForDisplay(k) {
    if (!k || k.length < 8) return '••••••••';
    const prefix = k.startsWith('gsk_') ? k.slice(0, 7) : k.slice(0, 5);
    return `${prefix}••••••••${k.slice(-4)}`;
  }

  function setGeminiApiKey(key) {
    if (!key) {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    } else {
      localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
    }
  }

  // Live Google Gemini API Query Resolver
  async function queryGemini(userMsg, history) {
    const apiKey = getGeminiApiKey();
    if (!apiKey) return null;

    const currentUser = global.Auth ? global.Auth.getCurrentUser() : null;
    const studentName = currentUser ? currentUser.name : 'Student';
    const activeCourse = global.App && typeof global.App.getCurCourse === 'function' ? global.App.getCurCourse() : null;

    const systemInstructionText = `You are SkillBot, a warm, patient, and highly engaging AI Tutor for kids and young students on SkillHub.
Student Name: ${studentName}.
Current Course viewing: ${activeCourse ? activeCourse.t + ' by ' + activeCourse.by : 'Browsing Courses'}.
Platform Info: SkillHub provides courses in Programming (Python, JS, HTML, CSS, C, C++, Java, React, SQL, DSA), video lessons, quizzes, daily streaks, XP points, and a class leaderboard.

Response Guidelines:
1. Always reply in friendly Roman Urdu mixed with simple English (just like a helpful Pakistani coding teacher or elder brother).
2. For children and beginners, use simple, fun real-world analogies (e.g., Variable = toy box, Loop = bicycle wheel / game repetition, Function = magic recipe or button).
3. Keep answers clear, structured with bullet points and friendly emojis.
4. If asked a coding question, show small, simple, syntax-highlighted code blocks with clear explanations.
5. If asked school homework, science, or general questions, answer accurately and enthusiastically!
6. Keep tone kind, encouraging, and celebrate their curiosity.`;

    // Format last 6 conversational turns
    const recent = (history || []).slice(-6);
    const contents = [];
    for (const msg of recent) {
      if (msg.sender === 'user' || msg.sender === 'bot') {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: userMsg }]
    });

    const payload = {
      contents: contents,
      systemInstruction: {
        parts: [{ text: systemInstructionText }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 900
      }
    };

    let lastErrorMsg = null;
    const models = ['gemini-3.8-flash', 'gemini-flash-latest'];
    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            return data.candidates[0].content.parts.map(p => p.text).join('\n');
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          console.warn(`Gemini API ${model} response (Status ${res.status}):`, errData);
          if (errData.error && errData.error.message) {
            lastErrorMsg = errData.error.message;
          }
        }
      } catch (err) {
        console.warn(`Gemini ${model} request error:`, err);
      }
    }

    if (lastErrorMsg) {
      if (lastErrorMsg.toLowerCase().includes('quota') || lastErrorMsg.toLowerCase().includes('exhausted') || lastErrorMsg.toLowerCase().includes('rate')) {
        return `⚠️ **Google Gemini Quota Notice:** Google ki free limit reach ho gayi hai. 
Aap chat ke top header me **🔑** icon daba kar **100% Free Groq Key (console.groq.com)** paste kar sakte hain (Groq ki limit khatam nahi hoti aur super fast hai)! 🚀`;
      }
      return `⚠️ **Google Gemini Notice:** ${lastErrorMsg}\n\nAap chat ke top header me **🔑** icon daba kar key update ya verify kar sakte hain!`;
    }

    return null;
  }

  // Live Groq Cloud API Query Resolver (Ultra Fast, High Quota & 100% Free)
  async function queryGroq(userMsg, history, apiKey) {
    if (!apiKey) return null;

    const currentUser = global.Auth ? global.Auth.getCurrentUser() : null;
    const studentName = currentUser ? currentUser.name : 'Student';
    const activeCourse = global.App && typeof global.App.getCurCourse === 'function' ? global.App.getCurCourse() : null;

    const systemPrompt = `You are SkillBot, a warm, patient, and highly engaging AI Tutor for kids and young students on SkillHub.
Student Name: ${studentName}.
Current Course viewing: ${activeCourse ? activeCourse.t + ' by ' + activeCourse.by : 'Browsing Courses'}.
Platform Info: SkillHub provides courses in Programming (Python, JS, HTML, CSS, C, C++, Java, React, SQL, DSA), video lessons, quizzes, daily streaks, XP points, and a class leaderboard.

Response Guidelines:
1. Always reply in friendly Roman Urdu mixed with simple English (just like a helpful Pakistani coding teacher or elder brother).
2. For children and beginners, use simple, fun real-world analogies (e.g., Variable = toy box, Loop = bicycle wheel / game repetition, Function = magic recipe or button).
3. Keep answers clear, structured with bullet points and friendly emojis.
4. If asked a coding question, show small, simple, syntax-highlighted code blocks with clear explanations.
5. If asked school homework, science, or general questions, answer accurately and enthusiastically!
6. Keep tone kind, encouraging, and celebrate their curiosity.`;

    const recent = (history || []).slice(-6);
    const messages = [{ role: 'system', content: systemPrompt }];
    for (const msg of recent) {
      if (msg.sender === 'user' || msg.sender === 'bot') {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        });
      }
    }
    messages.push({ role: 'user', content: userMsg });

    const models = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
    let lastGroqError = null;
    for (const model of models) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: messages,
            temperature: 0.7,
            max_tokens: 800
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          console.warn(`Groq API ${model} response notice:`, res.status, errData);
          if (errData.error && errData.error.message) {
            lastGroqError = errData.error.message;
          }
        }
      } catch (e) {
        console.warn(`Groq ${model} fetch error:`, e);
      }
    }

    if (lastGroqError) {
      return `⚠️ **Groq AI Notice:** ${lastGroqError}\n\nAap chat ke top header me **🔑** icon daba kar key verify kar sakte hain!`;
    }
    return null;
  }

  // Kid-Friendly Knowledge Base & Intelligent Query Resolver
  const KNOWLEDGE_BASE = [
    {
      keywords: ['salam', 'assalam', 'aoa', 'hello', 'hi', 'hey', 'kaun ho', 'who are you', 'kya hal'],
      response: name => `Walaikum Assalam ${name ? '**' + name + '**' : ''}! 👋 Main SkillHub ka **AI Tutor & Virtual Assistant** hoon! 

Aap mujhse:
- 💡 Kisi bhi programming concept (Variables, Loops, Functions) ke baare me pooch sakte hain.
- 📚 SkillHub ke courses aur quizzes me madad le sakte hain.
- ⚡ XP aur Streaks barhane ke tips le sakte hain.

Bataiye aaj hum kya seekhein? 🚀`
    },
    {
      keywords: ['variable', 'var', 'let', 'const', 'data type'],
      response: () => `📦 **Variable kya hota hai? (Asaan Alfaaz Me):**

Variable ko aap ek **toy box (dabba)** samajh lijiye! 
Jese aap dabbe me koi khilona ya toffee rakhte hain aur us par naam likh dete hain, bilkul waise hi computer ki memory me data store karne ke liye variable banta hai.

**Example (JavaScript):**
\`\`\`js
let playerLives = 3;      // Number store kiya
let playerName = "Ali";    // Text store kiya
\`\`\`
Jab bhi humein value badalni ho ya dekhni ho, hum variable ka naam use karte hain! Samajh aya? 😊`
    },
    {
      keywords: ['loop', 'for loop', 'while loop', 'repeat'],
      response: () => `🔄 **Loop kya hota hai?**

Loop ka matlab hai **kisi kaam ko bar bar dohrana (repeat karna)**!

Socho agar teacher kahe ke 100 baar *"I love coding"* likho. Agar ek ek karke likhein to thak jayenge. Lekin loop se computer 1 second me 100 baar print kar dega! ⚡

**Example:**
\`\`\`js
for (let i = 1; i <= 5; i++) {
  console.log("Jump number: " + i);
}
\`\`\`
Computer 1 se lekar 5 tak khud hi counting karega! 🎯`
    },
    {
      keywords: ['function', 'method', 'funcktion'],
      response: () => `🪄 **Function kya hota hai?**

Function ek **Magic Spell (ya Recipe)** ki tarah hota hai! 

Aap ek bar code likh kar function me pack kar dete hain. Phir jab bhi zaroorat ho, bas uska naam pukaaro aur wo apna kaam kar deta hai!

**Example:**
\`\`\`js
function makeMilkshake() {
  console.log("Milk + Banana + Sugar blend kar diya! 🥤");
}

// Ab jab bhi milkshake chahiye:
makeMilkshake();
\`\`\`
Is se bar bar lamba code nahi likhna parta! 💡`
    },
    {
      keywords: ['html', 'css', 'web development', 'website'],
      response: () => `🌐 **HTML aur CSS kya hain?**

Aap ek **Ghar (House)** ka tasawwur karein:
- 🧱 **HTML (Structure):** Ye ghar ki deewarein, chhat aur darwazay hain. Website par text, images aur buttons HTML se aate hain.
- 🎨 **CSS (Style):** Ye ghar ka paint, khidkiyon ke curtains aur decoration hai! Website ke colors, fonts aur khoobsurat layout CSS se bante hain.
- ⚡ **JavaScript (Brain):** Ghar ki bijli aur automatic doors JS hai!

Humare SkillHub par **HTML** aur **CSS** ke full courses available hain, zaroor check karein! 🚀`
    },
    {
      keywords: ['python', 'py'],
      response: () => `🐍 **Python Language:**

Python bacho aur beginners ke liye **dunya ki sab se favorite language** hai! 

**Kyu?**
1. Iska code English ki tarah asaan hota hai:
\`\`\`python
print("Hello Dost!")
\`\`\`
2. Is se games, animations aur **Artificial Intelligence (AI)** bante hain!

SkillHub par Python ka complete course available hai. Aaj hi shuru karein! 🌟`
    },
    {
      keywords: ['javascript', 'js'],
      response: () => `⚡ **JavaScript (JS):**

JavaScript internet ki zuban hai! Dunya ki **99% websites** JavaScript use karti hain.
- Agar button par click karne se popup khule — wo JS hai!
- Agar quiz submit karne par score calculate ho — wo JS hai!

SkillHub par Shradha Khapra ka top-rated JavaScript course mojood hai! 💻`
    },
    {
      keywords: ['xp', 'streak', 'level', 'points', 'leaderboard', 'rank'],
      response: () => `🏆 **XP aur Streaks kaise barhayein?**

1. 🔥 **Daily Streak:** Roz SkillHub login karein aur kam az kam 1 lecture dekhein. Aapki streak 1 day barh jayegi! Agar ek din miss kiya to streak toot sakti hai.
2. ⚡ **XP Points:** 
   - Har video dekhne par XP milte hain.
   - Har Quiz complete karne par **Bonus XP** milte hain!
3. 🥇 **Leaderboard:** Jitni zyada XP hogi, aap Class Leaderboard par utna ooper aayenge aur Gold/Silver/Bronze trophy jeetenge! 🌟`
    },
    {
      keywords: ['quiz', 'test', 'exam', 'quizzes'],
      response: () => `📝 **Quizzes ke baare me Tips:**

- Har course ke video ke niche ek **5-sawalat ka Quiz** hota hai.
- Video ko ghaur se dekhein aur notes banayein.
- Quiz me jald-bazi na karein, har option ko dhyan se parhein.
- Pass hone par aapko **XP** milte hain jo aapki profile me add ho jate hain! 🎓`
    },
    {
      keywords: ['bug', 'error', 'debugging', 'masla', 'problem'],
      response: () => `🐛 **Code me Bug aa gaya? Ghabrana nahi!**

Bug ka matlab hai code me choti si ghalti. Dunya ke bare se bare programmer ke code me bhi bugs aate hain!

**Bug fix karne ke 3 steps (Debugging):**
1. **Error message parhein:** Computer hamesha line number batata hai jahan masla hai.
2. **Spelling check karein:** Aksar choti si spelling ghalti ya semicolon (;) miss hota hai.
3. **Deep breath lein:** Thora break lein aur dobara dekhein, solution foran nazar aa jayega! 🔍`
    },
    {
      keywords: ['challenge', 'task', 'exercise', 'sawal'],
      response: () => `🎯 **Aaj ka Mini Coding Challenge!**

Chalein ek simple riddle solve karein:
*"Agar ek variable \`apples = 5\` hai aur humne \`apples = apples + 3\` kar diya, to ab \`apples\` ki value kya hogi?"*

Sochiye aur chat me jawab likhein! 🍎`
    },
    {
      keywords: ['8', 'aath', 'eight'],
      response: () => `🎉 **Shabash! Bilkul Sahi Jawab!** 🍎✨

5 + 3 = 8! Aapka computer logic bohot zabardast chal raha hai. Isi tarah practice karte rahein, aap bohot ache coder banenge! 🚀`
    }
  ];

  // Fallback intelligent query processor
  function getBotResponse(userMsg) {
    const raw = (userMsg || '').trim().toLowerCase();
    const currentUser = global.Auth ? global.Auth.getCurrentUser() : null;
    const studentName = currentUser ? currentUser.name : '';

    // Check specific knowledge patterns
    for (const item of KNOWLEDGE_BASE) {
      const match = item.keywords.some(kw => raw.includes(kw));
      if (match) {
        return typeof item.response === 'function' ? item.response(studentName) : item.response;
      }
    }

    // Check if user is asking about current course or lesson
    const activeCourse = global.App && typeof global.App.getCurCourse === 'function' ? global.App.getCurCourse() : null;
    if (activeCourse && (raw.includes('current') || raw.includes('ye course') || raw.includes('is course') || raw.includes('lecture') || raw.includes('sabaq') || raw.includes('topic') || raw.includes('samjhao') || raw.includes('explain'))) {
      return `🎓 **Aap is waqt dekh rahe hain: ${activeCourse.t}**

- **Instructor:** ${activeCourse.by}
- **Category:** ${activeCourse.cat}

Agar aap is lecture ke kisi concept me phas gaye hain, to direct sawal poochein (jaise: *"is topic ki example do"* ya *"code me error aa raha hai"*). Main aapko asaan alfaaz me samjhaunga! 💡`;
    }

    // Check if user is asking about a specific course in SkillHub
    if (typeof global.COURSES !== 'undefined' && Array.isArray(global.COURSES)) {
      const matchedCourse = global.COURSES.find(c => {
        const title = (c.t || '').toLowerCase();
        const id = (c.id || '').toLowerCase();
        return raw.includes(id) || title.split(' ').some(w => w.length > 3 && raw.includes(w.toLowerCase()));
      });

      if (matchedCourse) {
        return `📚 **${matchedCourse.t}**

- **Instructor:** ${matchedCourse.by || 'SkillHub Instructor'}
- **Category:** ${matchedCourse.cat}
- **Lectures:** ${matchedCourse.v ? matchedCourse.v.length : 0} lectures available

Yeh course aapke liye bohot faidamand hai! Aap Courses tab par ja kar isko abhi start kar sakte hain. Kya aap is course ke kisi lecture ke baare me poochna chahte hain? 😊`;
      }
    }

    // Friendly default kid-encouraging response
    return `Wah, bohot acha sawal hai! 🌟

Main abhi is par mazeed seekh raha hoon taake aapko best jawab de sakoon. 

**Aap ye try kar sakte hain:**
1. Agar aap programming shuru kar rahe hain to poochiye: *"HTML kya hai?"* ya *"Variable kya hota hai?"*
2. Agar platform ke baare me jaanna hai to poochiye: *"XP kaise barhayein?"* ya *"Quiz kaise dein?"*
3. Ya upar diye gaye **Quick Question buttons** me se kisi par click karein! 💡`;
  }

  // Format message text with markdown bold, code blocks, etc.
  function formatMessageText(text) {
    if (!text) return '';
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks ```code```
    escaped = escaped.replace(/```([a-z]*)\n?([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre class="ai-code-block"><code>${code.trim()}</code></pre>`;
    });

    // Inline code `code`
    escaped = escaped.replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>');

    // Bold **text**
    escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic *text*
    escaped = escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Line breaks
    escaped = escaped.replace(/\n/g, '<br>');

    return escaped;
  }

  // Assistant Controller Class
  class AssistantController {
    constructor() {
      this.isOpen = false;
      this.messages = [];
      this.isTyping = false;
    }

    init() {
      this.loadHistory();
      this.bindEvents();
      this.renderMessages();
      this.updateLauncherBadge();
    }

    loadHistory() {
      try {
        const saved = sessionStorage.getItem(CHAT_STORAGE_KEY);
        if (saved) {
          this.messages = JSON.parse(saved);
        } else {
          // Initial greeting
          const user = global.Auth ? global.Auth.getCurrentUser() : null;
          const name = user ? user.name : 'Dost';
          this.messages = [
            {
              sender: 'bot',
              text: `Assalam-o-Alaikum **${name}**! 👋 
Main hoon aapka **SkillHub AI Assistant**. 
Kisi bhi course, coding problem ya quiz ke baare me poochiye, main asaan alfaaz me guide karunga! ✨`,
              time: this.formatCurrentTime()
            }
          ];
          this.saveHistory();
        }
      } catch (e) {
        this.messages = [];
      }
    }

    saveHistory() {
      try {
        sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.messages));
      } catch (e) {}
    }

    formatCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    bindEvents() {
      const widgetBtn = $('#ai-widget-btn');
      const drawer = $('#ai-chat-drawer');
      const backdrop = $('#ai-drawer-backdrop');
      const closeBtn = $('#ai-close-btn');
      const clearBtn = $('#ai-clear-btn');
      const sendBtn = $('#ai-send-btn');
      const input = $('#ai-input');

      if (widgetBtn) {
        widgetBtn.onclick = () => this.toggleDrawer();
      }

      if (closeBtn) {
        closeBtn.onclick = () => this.closeDrawer();
      }

      if (backdrop) {
        backdrop.onclick = () => this.closeDrawer();
      }

      if (clearBtn) {
        clearBtn.onclick = () => this.clearChat();
      }

      if (sendBtn) {
        sendBtn.onclick = () => this.handleSendMessage();
      }

      if (input) {
        input.onkeydown = e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSendMessage();
          }
        };

        // Auto-expand textarea height
        input.oninput = () => {
          input.style.height = 'auto';
          input.style.height = Math.min(input.scrollHeight, 120) + 'px';
        };
      }

      // Gemini API Key Banner Toggle
      const keyBtn = $('#ai-key-btn');
      const keyBanner = $('#ai-key-banner');
      const keyInput = $('#ai-key-input');
      const keySaveBtn = $('#ai-key-save-btn');
      const keyStatus = $('#ai-key-status');

      const updateKeyStatus = () => {
        const curKey = getActiveApiKey();
        const isGroq = curKey.startsWith('gsk_');
        if (keyInput) keyInput.placeholder = curKey ? maskKeyForDisplay(curKey) : 'Paste Groq or Gemini API Key';
        if (keyStatus) {
          if (curKey) {
            const providerName = isGroq ? '⚡ Groq Llama-3.3 (Super Fast & Unlimited)' : 'Google Gemini';
            keyStatus.innerHTML = `<span style="color:var(--ok)">✅ ${providerName} Connected (${maskKeyForDisplay(curKey)})</span>`;
          } else {
            keyStatus.innerHTML = `<span style="color:var(--mute)">Offline Mode: Using built-in SkillHub Knowledge Base.</span>`;
          }
        }
      };

      if (keyBtn && keyBanner) {
        keyBtn.onclick = () => {
          keyBanner.classList.toggle('hide');
          updateKeyStatus();
        };
      }

      if (keySaveBtn && keyInput) {
        keySaveBtn.onclick = () => {
          const val = keyInput.value.trim();
          setGeminiApiKey(val);
          updateKeyStatus();
          setTimeout(() => {
            if (val && keyBanner) keyBanner.classList.add('hide');
          }, 800);
        };
      }
      updateKeyStatus();

      // Quick question chips
      $$('.ai-chip').forEach(chip => {
        chip.onclick = () => {
          const q = chip.dataset.q || chip.textContent.trim();
          this.sendMessage(q);
        };
      });

      // Close on Escape key
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeDrawer();
        }
      });
    }

    toggleDrawer() {
      if (this.isOpen) {
        this.closeDrawer();
      } else {
        this.openDrawer();
      }
    }

    openDrawer() {
      this.isOpen = true;
      const drawer = $('#ai-chat-drawer');
      const backdrop = $('#ai-drawer-backdrop');
      const widgetBtn = $('#ai-widget-btn');

      // Update greeting with actual student name if it was initial default
      if (this.messages.length === 1 && this.messages[0].sender === 'bot') {
        const user = global.Auth ? global.Auth.getCurrentUser() : null;
        if (user && user.name) {
          this.messages[0].text = `Assalam-o-Alaikum **${user.name}**! 👋 
Main hoon aapka **SkillHub AI Assistant**. 
Kisi bhi course, coding problem ya quiz ke baare me poochiye, main asaan alfaaz me guide karunga! ✨`;
          this.renderMessages();
        }
      }

      if (drawer) drawer.classList.add('open');
      if (backdrop) backdrop.classList.remove('hide');
      if (widgetBtn) widgetBtn.classList.add('active');

      this.scrollToBottom();

      const input = $('#ai-input');
      if (input) {
        setTimeout(() => input.focus(), 300);
      }
    }

    closeDrawer() {
      this.isOpen = false;
      const drawer = $('#ai-chat-drawer');
      const backdrop = $('#ai-drawer-backdrop');
      const widgetBtn = $('#ai-widget-btn');

      if (drawer) drawer.classList.remove('open');
      if (backdrop) backdrop.classList.add('hide');
      if (widgetBtn) widgetBtn.classList.remove('active');
    }

    clearChat() {
      const user = global.Auth ? global.Auth.getCurrentUser() : null;
      const name = user ? user.name : 'Dost';
      this.messages = [
        {
          sender: 'bot',
          text: `Chat reset kar di gayi hai! Main haazir hoon, agla sawal batayein **${name}**! 🚀`,
          time: this.formatCurrentTime()
        }
      ];
      this.saveHistory();
      this.renderMessages();
    }

    updateLauncherBadge() {
      const dot = $('.ai-badge-dot');
      if (dot) {
        dot.style.display = this.isOpen ? 'none' : 'block';
      }
    }

    handleSendMessage() {
      const input = $('#ai-input');
      if (!input) return;
      const text = input.value.trim();
      if (!text || this.isTyping) return;

      input.value = '';
      input.style.height = 'auto';
      this.sendMessage(text);
    }

    async sendMessage(text) {
      if (!text) return;

      // Add user message
      this.messages.push({
        sender: 'user',
        text: text,
        time: this.formatCurrentTime()
      });
      this.saveHistory();
      this.renderMessages();
      this.scrollToBottom();

      // Show typing indicator
      this.isTyping = true;
      this.showTypingIndicator();

      let replyText = null;
      const apiKey = getGeminiApiKey();

      // Attempt live AI query (Groq Cloud if gsk_..., else Gemini)
      if (apiKey) {
        try {
          if (apiKey.startsWith('gsk_')) {
            replyText = await queryGroq(text, this.messages, apiKey);
          } else {
            replyText = await queryGemini(text, this.messages);
          }
        } catch (err) {
          console.warn('Live AI query error:', err);
        }
      }

      // If no API key or API call returned null/failed, use offline knowledge base
      if (!replyText) {
        const delay = apiKey ? 250 : Math.min(1000, Math.max(500, text.length * 20));
        await new Promise(resolve => setTimeout(resolve, delay));
        replyText = getBotResponse(text);
      }

      this.hideTypingIndicator();
      this.isTyping = false;

      this.messages.push({
        sender: 'bot',
        text: replyText,
        time: this.formatCurrentTime()
      });

      this.saveHistory();
      this.renderMessages();
      this.scrollToBottom();
    }

    showTypingIndicator() {
      const list = $('#ai-messages');
      if (!list) return;

      // Check if already there
      if ($('#ai-typing-indicator')) return;

      const item = document.createElement('div');
      item.id = 'ai-typing-indicator';
      item.className = 'ai-msg-row ai-msg-bot';
      item.innerHTML = `
        <div class="ai-msg-avatar">🤖</div>
        <div class="ai-msg-bubble ai-typing-bubble">
          <span></span><span></span><span></span>
        </div>
      `;
      list.appendChild(item);
      this.scrollToBottom();
    }

    hideTypingIndicator() {
      const item = $('#ai-typing-indicator');
      if (item) item.remove();
    }

    renderMessages() {
      const list = $('#ai-messages');
      if (!list) return;

      list.innerHTML = '';
      this.messages.forEach(msg => {
        const isBot = msg.sender === 'bot';
        const row = document.createElement('div');
        row.className = `ai-msg-row ${isBot ? 'ai-msg-bot' : 'ai-msg-user'}`;

        const formattedBody = formatMessageText(msg.text);

        if (isBot) {
          row.innerHTML = `
            <div class="ai-msg-avatar" title="SkillBot">🤖</div>
            <div class="ai-msg-content">
              <div class="ai-msg-bubble">${formattedBody}</div>
              <div class="ai-msg-time">${msg.time || ''}</div>
            </div>
          `;
        } else {
          row.innerHTML = `
            <div class="ai-msg-content">
              <div class="ai-msg-bubble">${formattedBody}</div>
              <div class="ai-msg-time">${msg.time || ''}</div>
            </div>
          `;
        }

        list.appendChild(row);
      });

      this.scrollToBottom();
    }

    scrollToBottom() {
      const list = $('#ai-messages');
      if (list) {
        requestAnimationFrame(() => {
          list.scrollTop = list.scrollHeight;
        });
      }
    }
  }

  // Initialize Assistant when DOM is ready
  let assistantInstance = null;
  function initAssistant() {
    if (!assistantInstance) {
      assistantInstance = new AssistantController();
      assistantInstance.init();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAssistant);
  } else {
    initAssistant();
  }

  const AssistantApi = Object.freeze({
    open: () => assistantInstance && assistantInstance.openDrawer(),
    close: () => assistantInstance && assistantInstance.closeDrawer(),
    toggle: () => assistantInstance && assistantInstance.toggleDrawer(),
    ask: question => assistantInstance && assistantInstance.sendMessage(question)
  });

  try {
    Object.defineProperty(global, 'Assistant', {
      value: AssistantApi,
      writable: false,
      configurable: false
    });
  } catch (e) {
    global.Assistant = AssistantApi;
  }
})(window);
