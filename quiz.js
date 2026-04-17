function selectAnswer(btn, isCorrect, feedbackId) {
  const list = btn.closest('.choices');
  const buttons = list.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);

  if (isCorrect) {
    btn.classList.add('correct');
  } else {
    btn.classList.add('incorrect');
    buttons.forEach(b => {
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
  }

  const fb = document.getElementById(feedbackId);
  if (fb) {
    fb.classList.add('show');
    fb.classList.add(isCorrect ? 'correct' : 'incorrect');
  }
  const practice = btn.closest('.practice');
  if (!practice) return;
  if (!isCorrect) {
    practice.dataset.retryPath = 'wrong';
    setTimeout(() => startRetryMode(practice), 1500);
  } else {
    practice.dataset.retryPath = 'confirm';
    setTimeout(() => startConfirmMode(practice), 1200);
  }
}

let currentPage = 0;

function showPage(idx, scrollTop = true) {
  const pages = document.querySelectorAll('.page');
  if (pages.length === 0) return;
  idx = Math.max(0, Math.min(idx, pages.length - 1));
  pages.forEach((p, i) => p.classList.toggle('active', i === idx));
  document.querySelectorAll('.section-nav > button').forEach((b, i) => {
    b.classList.toggle('active', i === idx);
  });
  const indicator = document.getElementById('page-indicator');
  if (indicator) indicator.textContent = `${idx + 1} / ${pages.length}`;
  const prev = document.getElementById('prev-btn');
  const next = document.getElementById('next-btn');
  if (prev) prev.disabled = idx === 0;
  if (next) next.disabled = idx === pages.length - 1;
  currentPage = idx;
  resetSubPage(pages[idx]);
  if (scrollTop) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function jumpTo(id) {
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  const page = el.closest('.page');
  if (page) {
    const pages = [...document.querySelectorAll('.page')];
    const idx = pages.indexOf(page);
    if (idx !== currentPage) {
      showPage(idx, true);
      return;
    }
  }
  requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function closeDropdowns() {
  document.querySelectorAll('.nav-item').forEach(i => {
    i.classList.remove('open');
    const ul = i.querySelector('.nav-dropdown');
    if (ul) ul.style.display = 'none';
  });
}

function handleSectionClick(idx, event) {
  event.stopPropagation();
  const button = event.currentTarget || event.target;
  const item = button.closest('.nav-item');

  if (currentPage !== idx) {
    closeDropdowns();
    goToPage(idx);
    return;
  }

  const wasOpen = item.classList.contains('open');
  closeDropdowns();
  if (!wasOpen) {
    item.classList.add('open');
    const ul = item.querySelector('.nav-dropdown');
    if (ul) ul.style.display = 'block';
  }
}

function resetSubPage(page) {
  const subs = page.querySelectorAll('.sub-page');
  subs.forEach((s, i) => s.classList.toggle('active', i === 0));
  page.querySelectorAll('.subsection-nav button').forEach((b, i) => {
    b.classList.toggle('active', i === 0);
  });
}

function goToPage(idx) { showPage(idx); }
function prevPage() { showPage(currentPage - 1); }
function nextPage() { showPage(currentPage + 1); }

function goToSub(pageIdx, subIdx) {
  showPage(pageIdx);
  const page = document.querySelectorAll('.page')[pageIdx];
  const subs = page.querySelectorAll('.sub-page');
  subs.forEach((s, i) => s.classList.toggle('active', i === subIdx));
  page.querySelectorAll('.subsection-nav button').forEach((b, i) => {
    b.classList.toggle('active', i === subIdx);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-dropdown').forEach(ul => { ul.style.display = 'none'; });
  document.querySelectorAll('.example .key').forEach(el => {
    el.addEventListener('mouseenter', () => el.classList.add('revealed'));
  });
  document.querySelectorAll('.practice').forEach(practice => {
    if (!practice.id) return;
    if (practice.querySelector('.redo-btn')) return;
    const redo = document.createElement('button');
    redo.className = 'redo-btn';
    redo.type = 'button';
    redo.innerHTML = '&#8635; Redo';
    redo.addEventListener('click', () => resetQuestion(practice.id));
    practice.appendChild(redo);
  });
  document.querySelectorAll('.page').forEach((page, pageIdx) => {
    page.querySelectorAll('.jump-target').forEach(h3 => {
      h3.id = `s${pageIdx}-${h3.dataset.part}`;
    });
    let sawD = false, sawE = false;
    page.querySelectorAll('h3').forEach(h3 => {
      const t = h3.textContent.trim();
      if (t.startsWith('IV.') && !sawD) { h3.id = `s${pageIdx}-D`; sawD = true; }
      if (t.startsWith('V.') && !sawE) { h3.id = `s${pageIdx}-E`; sawE = true; }
    });
  });
  if (document.querySelector('.page')) showPage(0);
  loadFromStorage();
});

document.addEventListener('click', (e) => {
  const clickedVocab = e.target.closest('.vocab');
  const clickedSym = e.target.closest('.sym-def');
  document.querySelectorAll('.vocab.active').forEach(v => {
    if (v !== clickedVocab) v.classList.remove('active');
  });
  document.querySelectorAll('.sym-def.active').forEach(v => {
    if (v !== clickedSym) v.classList.remove('active');
  });
  if (clickedVocab) {
    clickedVocab.classList.toggle('active');
    e.stopPropagation();
    return;
  }
  if (clickedSym) {
    clickedSym.classList.toggle('active');
    e.stopPropagation();
    return;
  }
  if (!e.target.closest('.nav-item')) closeDropdowns();
});

function resetQuestion(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const retryPanel = container.querySelector('.retry-panel');
  if (retryPanel) retryPanel.remove();
  const confirmPanel = container.querySelector('.confirm-panel');
  if (confirmPanel) confirmPanel.remove();
  if (container.dataset.scored) {
    const pageIdx = getPageIdx(container);
    const s = initScore(pageIdx);
    s.answered = Math.max(0, s.answered - 1);
    const prevPts = parseFloat(container.dataset.scoredPts || '0');
    s.earned = Math.max(0, s.earned - prevPts);
    delete container.dataset.scored;
    delete container.dataset.scoredPts;
    delete container.dataset.retryPath;
    updateScoreDisplay(pageIdx);
    saveToStorage();
  }
  container.querySelectorAll('.choices button').forEach(b => {
    b.disabled = false;
    b.classList.remove('correct', 'incorrect');
  });
  container.querySelectorAll('.feedback').forEach(fb => {
    fb.classList.remove('show', 'correct', 'incorrect');
  });
}

const RETRY_REQUIRED = 5;
const CONFIRM_REQUIRED = 3;

const sectionScores = {};

function getPageIdx(el) {
  const page = el.closest('.page');
  if (!page) return 0;
  return [...document.querySelectorAll('.page')].indexOf(page);
}

function initScore(pageIdx) {
  if (!sectionScores[pageIdx]) {
    const page = document.querySelectorAll('.page')[pageIdx];
    const total = page ? page.querySelectorAll('.practice').length : 25;
    sectionScores[pageIdx] = { earned: 0, answered: 0, total: total };
  }
  return sectionScores[pageIdx];
}

function getChapterNum() {
  const m = document.title.match(/Chapter\s+(\d+)/);
  return m ? m[1] : '0';
}

function saveToStorage() {
  const ch = getChapterNum();
  const data = {};
  for (const [idx, s] of Object.entries(sectionScores)) {
    data[idx] = { earned: s.earned, answered: s.answered, total: s.total };
  }
  try { localStorage.setItem('zmath-ch' + ch, JSON.stringify(data)); } catch(e) {}
}

function loadFromStorage() {
  const ch = getChapterNum();
  try {
    const raw = localStorage.getItem('zmath-ch' + ch);
    if (!raw) return;
    const data = JSON.parse(raw);
    for (const [idx, s] of Object.entries(data)) {
      sectionScores[idx] = s;
      updateScoreDisplay(parseInt(idx));
    }
  } catch(e) {}
}

function addScore(practiceEl, points) {
  const pageIdx = getPageIdx(practiceEl);
  const s = initScore(pageIdx);
  if (practiceEl.dataset.scored) return;
  practiceEl.dataset.scored = '1';
  practiceEl.dataset.scoredPts = String(points);
  s.earned += points;
  s.answered += 1;
  updateScoreDisplay(pageIdx);
  saveToStorage();
}

function updateScoreDisplay(pageIdx) {
  const s = sectionScores[pageIdx];
  if (!s) return;
  const page = document.querySelectorAll('.page')[pageIdx];
  if (!page) return;
  let bar = page.querySelector('.score-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'score-bar';
    const firstPractice = page.querySelector('.practice');
    if (firstPractice) {
      let h3 = firstPractice.previousElementSibling;
      while (h3 && h3.tagName !== 'H3') h3 = h3.previousElementSibling;
      if (h3) h3.parentNode.insertBefore(bar, h3);
    } else {
      page.appendChild(bar);
    }
  }
  const pct = s.total > 0 ? Math.round((s.earned / s.total) * 100) : 0;
  const answered = s.answered;
  bar.innerHTML = `<strong>Score:</strong> ${s.earned.toFixed(1)} / ${s.total} (${pct}%) &mdash; ${answered} of ${s.total} answered`;
  bar.className = 'score-bar' + (answered >= s.total && pct < 90 ? ' score-low' : '') + (pct >= 90 ? ' score-high' : '');
  if (answered >= s.total && pct < 90) {
    let warn = page.querySelector('.score-warning');
    if (!warn) {
      warn = document.createElement('div');
      warn.className = 'score-warning';
      warn.innerHTML = '<strong>&#9888; Score below 90%.</strong> Re-read the Concept, Vocab, Symbol, and Example sections above before retrying the practice problems.';
      bar.after(warn);
    }
  }
}

function startConfirmMode(practiceEl) {
  const concept = getConceptFromPractice(practiceEl);
  if (!concept || !window.conceptBank || !window.conceptBank[concept]) return;
  let existing = practiceEl.querySelector('.confirm-panel');
  if (existing) existing.remove();
  const panel = document.createElement('div');
  panel.className = 'confirm-panel';
  panel.dataset.streak = '0';
  panel.dataset.concept = concept;
  practiceEl.appendChild(panel);
  showConfirmQuestion(panel);
}

function showConfirmQuestion(panel) {
  const concept = panel.dataset.concept;
  const streak = parseInt(panel.dataset.streak);
  if (streak >= CONFIRM_REQUIRED) {
    panel.innerHTML = `<p class="confirm-complete"><strong>&#10003; Confirmed!</strong> ${CONFIRM_REQUIRED}/${CONFIRM_REQUIRED} correct for &ldquo;${concept}&rdquo;. <em>(+1.0 pt)</em></p>`;
    const practice = panel.closest('.practice');
    if (practice) addScore(practice, 1.0);
    return;
  }
  const gen = window.conceptBank[concept];
  if (!gen) return;
  const q = gen();
  const choices = shuffle([
    { text: q.correct, isCorrect: true },
    ...q.distractors.map(d => ({ text: d, isCorrect: false }))
  ]);
  panel.innerHTML = `
    <div class="confirm-header"><strong>Confirm ${streak + 1}/${CONFIRM_REQUIRED}:</strong> ${concept}</div>
    ${q.scenario ? `<p class="scenario">${q.scenario}</p>` : ''}
    <p>${q.question}</p>
    <ul class="choices confirm-choices">
      ${choices.map((c, i) => `<li><button onclick="confirmAnswer(this, ${c.isCorrect})">${c.text}</button></li>`).join('')}
    </ul>
  `;
}

function confirmAnswer(btn, isCorrect) {
  const panel = btn.closest('.confirm-panel');
  panel.querySelectorAll('.confirm-choices button').forEach(b => b.disabled = true);
  if (isCorrect) {
    btn.classList.add('correct');
    panel.dataset.streak = parseInt(panel.dataset.streak) + 1;
    setTimeout(() => showConfirmQuestion(panel), 600);
  } else {
    btn.classList.add('incorrect');
    panel.querySelectorAll('.confirm-choices button').forEach(b => {
      if (b !== btn) { try { const onclick = b.getAttribute('onclick'); if (onclick && onclick.includes('true')) b.classList.add('correct'); } catch(e){} }
    });
    const practice = panel.closest('.practice');
    practice.dataset.retryPath = 'confirm-fail';
    panel.remove();
    setTimeout(() => startRetryMode(practice), 1200);
  }
}

function getConceptFromPractice(practiceEl) {
  let h3 = practiceEl.previousElementSibling;
  while (h3 && h3.tagName !== 'H3') h3 = h3.previousElementSibling;
  if (!h3) return null;
  const m = h3.textContent.match(/Practice:\s*(.+)/);
  return m ? m[1].trim() : null;
}

function startRetryMode(practiceEl) {
  const concept = getConceptFromPractice(practiceEl);
  if (!concept || !window.conceptBank || !window.conceptBank[concept]) return;
  let existing = practiceEl.querySelector('.retry-panel');
  if (existing) existing.remove();
  const panel = document.createElement('div');
  panel.className = 'retry-panel';
  panel.dataset.streak = '0';
  panel.dataset.concept = concept;
  practiceEl.appendChild(panel);
  showRetryQuestion(panel);
}

function showRetryQuestion(panel) {
  const concept = panel.dataset.concept;
  const streak = parseInt(panel.dataset.streak);
  if (streak >= RETRY_REQUIRED) {
    const practice = panel.closest('.practice');
    const path = practice ? practice.dataset.retryPath : 'wrong';
    const pts = path === 'confirm-fail' ? 0.5 : 0.25;
    panel.innerHTML = `<p class="retry-complete"><strong>&#10003; Mastered!</strong> You got ${RETRY_REQUIRED} in a row for &ldquo;${concept}&rdquo;. <em>(+${pts} pt)</em></p>`;
    if (practice) addScore(practice, pts);
    return;
  }
  const gen = window.conceptBank[concept];
  if (!gen) return;
  const q = gen();
  const choices = shuffle([
    { text: q.correct, isCorrect: true },
    ...q.distractors.map(d => ({ text: d, isCorrect: false }))
  ]);
  panel.innerHTML = `
    <div class="retry-header"><strong>Retry ${streak + 1}/${RETRY_REQUIRED}:</strong> ${concept}</div>
    ${q.scenario ? `<p class="scenario">${q.scenario}</p>` : ''}
    <p>${q.question}</p>
    <ul class="choices retry-choices">
      ${choices.map((c, i) => `<li><button onclick="retryAnswer(this, ${c.isCorrect})">${c.text}</button></li>`).join('')}
    </ul>
  `;
}

function retryAnswer(btn, isCorrect) {
  const panel = btn.closest('.retry-panel');
  panel.querySelectorAll('.retry-choices button').forEach(b => b.disabled = true);
  if (isCorrect) {
    btn.classList.add('correct');
    panel.dataset.streak = parseInt(panel.dataset.streak) + 1;
    setTimeout(() => showRetryQuestion(panel), 600);
  } else {
    btn.classList.add('incorrect');
    panel.querySelectorAll('.retry-choices button').forEach(b => {
      if (b !== btn) { try { const onclick = b.getAttribute('onclick'); if (onclick && onclick.includes('true')) b.classList.add('correct'); } catch(e){} }
    });
    panel.dataset.streak = '0';
    setTimeout(() => showRetryQuestion(panel), 1200);
  }
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

window.conceptBank = {};

(function buildCh1Bank() {
  const vague = [
    { v: 'deliver food quickly to nearby homes', f: 'delivery_time &le; 30 min &and; distance &le; 5 km', bad1: 'delivery_time &gt; 30 min &and; distance &gt; 5 km', bad2: 'delivery_time = fast &and; distance = near' },
    { v: 'handle many concurrent users smoothly', f: '|users| &le; 50,000 &and; latency &le; 200 ms', bad1: '|users| &ge; 0', bad2: 'latency &ne; 0 &and; users = many' },
    { v: 'keep the app responsive during peak hours', f: 'response_time &le; 1 s &and; peak = 18..22', bad1: 'response_time &ge; 0', bad2: 'peak = true &and; response_time &ne; 0' },
    { v: 'charge devices quickly and safely', f: 'charge_time &le; 60 min &and; temp &le; 45 &deg;C', bad1: 'temp &ge; 0', bad2: 'charge_time = quick' },
    { v: 'process returns efficiently', f: 'return_time &le; 5 min &and; refund_delay &le; 24 h', bad1: 'return_time &ge; 0', bad2: 'refund_delay = efficient' },
    { v: 'keep wait times short at the register', f: 'wait_time &le; 3 min &and; lanes_open &ge; 2', bad1: 'wait_time &ge; 0', bad2: 'lanes_open = short' },
    { v: 'maintain high video quality', f: 'resolution &ge; 1080p &and; frame_drops &le; 1/hr', bad1: '|pixels| &gt; 0', bad2: 'quality = high' },
    { v: 'respond to tickets promptly', f: 'first_reply &le; 4 h &and; resolution &le; 48 h', bad1: '|tickets| &ge; 0', bad2: 'reply = promptly' },
    { v: 'ensure reliable database backups', f: 'backup_interval &le; 6 h &and; recovery_time &le; 30 min', bad1: '|backups| &ge; 0', bad2: 'reliable = true' },
    { v: 'keep the warehouse well-stocked', f: 'stock &ge; reorder_point &and; restock_time &le; 48 h', bad1: 'stock &ge; 0', bad2: 'stock = stocked' },
    { v: 'provide fast search results', f: 'search_time &le; 500 ms &and; relevance &ge; 0.9', bad1: 'search_time &ne; 0', bad2: 'fast = true' },
    { v: 'make sign-up easy and quick', f: '|steps| &le; 3 &and; time &le; 60 s', bad1: '|steps| &ge; 0', bad2: 'easy = true &and; quick = true' },
  ];

  function vagueGen() {
    const s = pick(vague);
    return {
      scenario: `A team promises: &ldquo;<span class="key">${s.v}</span>.&rdquo;`,
      question: 'Which <em>specification</em> removes <em>ambiguity</em> using <code>&le;</code>, <code>&ge;</code>, and <code>&and;</code>?',
      correct: `<code>${s.f}</code>`,
      distractors: [
        `<code>${s.bad1}</code>`,
        `<code>${s.bad2}</code>`,
        `<code>system_active = true</code>`
      ]
    };
  }
  window.conceptBank['Removing Ambiguity'] = vagueGen;
  window.conceptBank['Measurable Requirements'] = vagueGen;

  const systems = [
    { name: 'pacemaker firmware', stakes: 'fatal', level: 'Fully formal proof.' },
    { name: 'weather widget', stakes: 'trivial', level: 'Informal / semi-formal.' },
    { name: 'aircraft autopilot', stakes: 'fatal', level: 'Fully formal proof.' },
    { name: 'recipe-rating app', stakes: 'trivial', level: 'Informal / semi-formal.' },
    { name: 'nuclear reactor controller', stakes: 'fatal', level: 'Fully formal proof.' },
    { name: 'birthday reminder app', stakes: 'trivial', level: 'Informal / semi-formal.' },
    { name: 'surgical robot arm', stakes: 'fatal', level: 'Fully formal proof.' },
    { name: 'podcast playlist organiser', stakes: 'trivial', level: 'Informal / semi-formal.' },
    { name: 'insulin dosing firmware', stakes: 'fatal', level: 'Fully formal proof.' },
    { name: 'photo-filter app', stakes: 'trivial', level: 'Informal / semi-formal.' },
  ];

  window.conceptBank['Matching Formality to Stakes'] = function() {
    const s = pick(systems);
    const correct = s.level;
    const wrong = s.stakes === 'fatal'
      ? ['Informal / semi-formal &mdash; <em>rigorous argument</em> only.', 'No <em>specification</em> needed.', '<em>Semi-formal</em> at most.']
      : ['<em>Fully formal</em> proof with <code>&sdash;</code> derivations.', 'Same as life-critical &mdash; prove <code>&forall;</code> paths.', 'Maximum rigour: mechanical <em>consistency proof</em>.'];
    return { scenario: `System: ${s.name}.`, question: 'What formality level on the <em>rigorous &rarr; semi-formal &rarr; fully formal</em> spectrum fits the <em>stakes</em>?', correct, distractors: wrong };
  };

  const props = ['Abstract', 'Concise', 'Complete', 'Unambiguous', 'Maintainable', 'Comprehensible'];
  const propDescs = {
    Abstract: 'records logical layout, not physical detail',
    Concise: 'fits on a single sheet',
    Complete: 'every component is represented',
    Unambiguous: 'one reading only',
    Maintainable: 'successfully updated over decades',
    Comprehensible: 'readily understood by anyone'
  };

  function accumcGen() {
    const target = pick(props);
    const others = props.filter(p => p !== target);
    const wrong3 = shuffle(others).slice(0, 3);
    return {
      question: `Which ACCUMC property means: &ldquo;${propDescs[target]}&rdquo;?`,
      correct: target,
      distractors: wrong3
    };
  }
  window.conceptBank['ACCUMC Properties'] = accumcGen;
  window.conceptBank['ACCUMC &mdash; Maintainability'] = accumcGen;
  window.conceptBank['ACCUMC &mdash; Completeness'] = accumcGen;
  window.conceptBank['ACCUMC &mdash; Comprehensibility'] = accumcGen;

  const abstractions = [
    { sys: 'traffic light', user: 'stop or go', irrel: 'bulb voltage, wiring', abs: '3-colour signal' },
    { sys: 'elevator panel', user: 'pick a floor', irrel: 'cable tension, motor RPM', abs: 'button per floor + indicator' },
    { sys: 'thermostat', user: 'set room temperature', irrel: 'BTU flow, duct layout', abs: 'current temp + target' },
    { sys: 'fuel pump display', user: 'watch spending', irrel: 'pump motor, crude source', abs: 'volume + price + total' },
    { sys: 'speedometer', user: 'stay within limit', irrel: 'engine pistons, gearing', abs: 'single speed number' },
    { sys: 'smoke alarm', user: 'evacuate on fire', irrel: 'particle density graph', abs: 'loud tone above threshold' },
    { sys: 'transit card app', user: 'check balance', irrel: 'crypto key, ledger', abs: 'balance in currency' },
    { sys: 'library due-date reminder', user: 'return on time', irrel: 'ISBN, author bio', abs: 'title + due date + days left' },
  ];

  window.conceptBank['Identifying Irrelevant Detail'] = function() {
    const a = pick(abstractions);
    return {
      scenario: `A ${a.sys} helps the user ${a.user}.`,
      question: 'Which abstraction fits?',
      correct: a.abs,
      distractors: [a.irrel, 'A complete technical manual', 'Raw sensor data stream']
    };
  };
  window.conceptBank['What to Abstract Away'] = window.conceptBank['Identifying Irrelevant Detail'];

  window.conceptBank['Formal vs Informal'] = function() {
    return {
      question: 'Primary advantage of formal methods over informal specs?',
      correct: 'Every term has a precise mathematical meaning.',
      distractors: ['Faster to write.', 'Eliminate testing.', 'Only experts can read them.']
    };
  };

  window.conceptBank['Lifecycle Stages'] = function() {
    return {
      question: 'Formal methods apply at which stages?',
      correct: 'Design, development, and post-release.',
      distractors: ['Design only.', 'Implementation only.', 'Only after bugs are reported.']
    };
  };

  window.conceptBank['Civil-Engineering Analogy'] = function() {
    const pairs = [
      { eng: 'bridge', soft: 'database schema' },
      { eng: 'skyscraper', soft: 'payment processor' },
      { eng: 'dam', soft: 'network protocol' },
    ];
    const p = pick(pairs);
    return {
      scenario: `A civil engineer uses math to verify a ${p.eng} design before building.`,
      question: `How is this analogous to formal methods for a ${p.soft}?`,
      correct: 'Both use math to find flaws before building, when fixes are cheap.',
      distractors: ['Only physical structures need math.', 'Software can always be patched cheaply.', 'There is no analogy.']
    };
  };

  window.conceptBank['Prior Applications'] = function() {
    const wrong = pick(['Neural networks for NLP', 'Blockchain for banking', 'Quantum computing for search']);
    return {
      question: 'Which is NOT a prior application of math in computing cited by the textbook?',
      correct: wrong,
      distractors: ['Probability theory for performance models.', 'Context-free grammars for compilers.', 'Relational calculus for databases.']
    };
  };

  window.conceptBank['Cost Reduction'] = function() {
    const weeks = pick([2,3,4,5]);
    const months = pick([4,6,8,12]);
    return {
      scenario: `A team spends <span class="key">${weeks} weeks</span> on a <span class="key">formal spec</span> and catches a <span class="key">design flaw</span> that would cost <span class="key">${months} months</span> to fix <span class="key">post-release</span>.`,
      question: 'Which concept does this illustrate?',
      correct: 'Formal specs can reduce total cost by catching flaws early.',
      distractors: ['Formal specs always cost more.', 'The team wasted time.', 'Late-stage fixes are always cheap.']
    };
  };

  window.conceptBank['Refinement'] = function() {
    const pairs = pick([
      { abs: 'contacts : &Popf; Name', conc: 'sortedList : seq Name' },
      { abs: 'items : &Popf; Item', conc: 'arr : seq Item' },
      { abs: 'accounts : ID &#x21F8; &Nopf;', conc: 'ledger : seq (ID &times; &Zopf;)' },
    ]);
    return {
      question: `<em>Refinement</em> transforms <code>${pairs.abs}</code> (abstract) toward <code>${pairs.conc}</code> (concrete). This means:`,
      correct: `Stepwise, provable transformation &mdash; each step preserves correctness via <code>&sube;</code>.`,
      distractors: ['Rewriting English into shorter English.', 'Removing the <em>schema</em> constraints.', 'Testing the deployed code.']
    };
  };

  window.conceptBank['Why Docs Matter'] = function() {
    const pages = pick([30, 47, 62, 85]);
    return {
      scenario: `A <span class="key">constraint</span> is <span class="key">buried</span> in paragraph ${pages} of a <span class="key">prose document</span>. A developer <span class="key">misses it</span>.`,
      question: 'Which principle does this illustrate?',
      correct: 'Bad prose buries key facts; design flaws surface too late.',
      distractors: ['Formal specs are too hard to read.', 'The developer should read more carefully.', 'English specs are always sufficient.']
    };
  };

  window.conceptBank['Why IBM Adopted Z'] = function() {
    return {
      question: 'Main reason IBM applied Z to CICS?',
      correct: 'Complexity made safe extension difficult.',
      distractors: ['To replace programmers.', 'To win the Queen\'s Award.', 'To speed up CICS.']
    };
  };

  window.conceptBank['Industrial-Scale Evidence'] = function() {
    return {
      question: 'Best evidence formal methods scale to industry?',
      correct: 'CICS/ESA v3 shipped with Z + Queen\'s Award.',
      distractors: ['Z was invented at Oxford.', 'IBM is a large company.', 'CICS has many licences.']
    };
  };

  window.conceptBank['Safe Legacy Extension'] = function() {
    const features = [
      { name: 'loyalty tiers', var: 'tier : &Nopf;', inv: 'tier &le; 5' },
      { name: 'gift-card checkout', var: 'giftBal : &Nopf;', inv: 'giftBal &ge; 0' },
      { name: 'solar-credit billing', var: 'credit : &Zopf;', inv: 'credit &ge; &minus;cap' },
      { name: 'scheduled rides', var: 'pickupTime : &Nopf;', inv: 'pickupTime &gt; now' },
      { name: 'encrypted DMs', var: 'msg : seq Char', inv: '#msg &le; 4096' },
    ];
    const f = pick(features);
    return {
      scenario: `A system adds <em>${f.name}</em> (<code>${f.var}</code>, invariant <code>${f.inv}</code>) without breaking existing features.`,
      question: 'Which approach uses <em>Z notation</em> to verify <em>safe extension</em>?',
      correct: `Write a <em>schema</em> for <code>${f.var}</code>; verify <code>${f.inv}</code> is consistent with existing spec; implement via <em>refinement</em>.`,
      distractors: ['Ship it and patch bugs later.', 'Replace the existing system entirely.', `Just add <code>${f.var}</code> with no invariant check.`]
    };
  };

  window.conceptBank['Overcoming Math Fear'] = window.conceptBank['Why IBM Adopted Z'];

  window.conceptBank['ATM Debit Mechanics'] = function() {
    const amt = pick(['w', 'x', 'amt', 'n']);
    return {
      scenario: `A traveller withdraws <code>${amt}</code> from an ATM.`,
      question: 'Which spec captures the debit?',
      correct: `<code>bal &ge; ${amt} &and; bal' = bal &minus; ${amt} &and; cash' = cash + ${amt}</code>`,
      distractors: [`<code>bal' = bal + ${amt}</code>`, `<code>cash' = cash &minus; ${amt}</code>`, `<code>bal' = 0</code>`]
    };
  };

  window.conceptBank['Tony Kenny &amp; Tony Hoare'] = function() {
    return {
      question: 'The CICS/Z partnership started because:',
      correct: 'Tony Kenny met Tony Hoare at a conference.',
      distractors: ['IBM mandated Z.', 'The Queen\'s Award required it.', 'Hursley programmers already knew Z.']
    };
  };

  window.conceptBank['Atomic Transactions'] = function() {
    const amts = pick(['w', 'x', 'n', 'amt']);
    return {
      scenario: `A bank transfer: <code>bal_A' = bal_A &minus; ${amts}</code> and <code>bal_B' = bal_B + ${amts}</code>.`,
      question: 'Which <em>transaction</em> property does <em>CICS</em> guarantee?',
      correct: `<code>bal_A' = bal_A &minus; ${amts} &and; bal_B' = bal_B + ${amts}</code> &mdash; both or neither (<em>atomic</em>).`,
      distractors: [
        `<code>bal_A' = bal_A &minus; ${amts}</code> alone may complete.`,
        `<code>bal_B' = bal_B + ${amts}</code> only is guaranteed.`,
        `<code>bal_A' = bal_A &or; bal_B' = bal_B</code> &mdash; either side optional.`
      ]
    };
  };

  window.conceptBank['CICS Scale &amp; Licensing'] = function() {
    return {
      question: 'CICS scale is evidenced by:',
      correct: 'Over 30,000 licences and releases since the mid-1970s.',
      distractors: ['A single paper.', 'Fewer than 100 users.', 'It was retired in 1990.']
    };
  };

  window.conceptBank['Two Foundations of Z'] = function() {
    return {
      question: 'Z is built on which two mathematical foundations?',
      correct: 'Set theory + first-order predicate logic.',
      distractors: ['Graph theory + calculus.', 'Number theory + geometry.', 'Category theory + topology.']
    };
  };

  window.conceptBank['What Z Cannot Specify'] = function() {
    const nf = pick(['response time', 'memory usage', 'concurrent throughput', 'animation frame rate']);
    return {
      question: `Can Z specify "${nf}"?`,
      correct: `No &mdash; ${nf} is a non-functional / timing property outside Z.`,
      distractors: ['Yes, with schemas.', 'Yes, with set theory.', 'Yes, with refinement.']
    };
  };

  window.conceptBank['Non-functional Limits'] = window.conceptBank['What Z Cannot Specify'];

  const logicQs = [
    { q: 'In <code>&forall; m &bull; checked_in(m)</code>, what does <code>&forall;</code> mean?', c: 'For all &mdash; every member satisfies the predicate.', d: ['There exists &mdash; <code>&exist;</code>.', 'Implies &mdash; <code>&rArr;</code>.', 'Not &mdash; <code>&not;</code>.'] },
    { q: 'In <code>&exist; m &bull; has_trainer(m)</code>, what does <code>&exist;</code> mean?', c: 'There exists &mdash; at least one member has a trainer.', d: ['For all &mdash; <code>&forall;</code>.', 'Implies &mdash; <code>&rArr;</code>.', 'Or &mdash; <code>&or;</code>.'] },
    { q: 'In <code>paid(m) &and; active(m)</code>, <code>&and;</code> means:', c: 'Logical AND &mdash; both must be true.', d: ['Logical OR (<code>&or;</code>) &mdash; either suffices.', 'Implies (<code>&rArr;</code>).', 'Not (<code>&not;</code>).'] },
    { q: 'In <code>action = deposit &or; action = withdraw</code>, <code>&or;</code> means:', c: 'Logical OR &mdash; one or the other (or both).', d: ['Logical AND (<code>&and;</code>).', 'Implies (<code>&rArr;</code>).', 'Not (<code>&not;</code>).'] },
    { q: 'In <code>pin_ok &rArr; access_granted</code>, <code>&rArr;</code> means:', c: 'Implies &mdash; if left is true, right must be true.', d: ['AND (<code>&and;</code>).', 'OR (<code>&or;</code>).', 'Equals (<code>=</code>).'] },
    { q: 'In <code>balance : &Zopf;</code>, what is <code>&Zopf;</code>?', c: 'The integers (&hellip; &minus;2, &minus;1, 0, 1, 2 &hellip;).', d: ['The naturals <code>&Nopf;</code> (0, 1, 2 &hellip;).', 'The reals.', 'The rationals.'] },
    { q: 'In <code>items : &Nopf;</code>, what is <code>&Nopf;</code>?', c: 'The natural numbers (0, 1, 2, &hellip;) &mdash; no negatives.', d: ['The integers <code>&Zopf;</code>.', 'The reals.', 'The power set <code>&Popf;</code>.'] },
    { q: 'In <code>x : &Zopf;</code>, what does <code>:</code> mean?', c: '&ldquo;Is of type&rdquo; &mdash; <code>x</code> belongs to <code>&Zopf;</code>.', d: ['Equals (<code>=</code>).', 'Implies (<code>&rArr;</code>).', 'Element of (<code>&isin;</code>).'] },
    { q: 'In <code>(12, C) &isin; Seat</code>, what does <code>&isin;</code> mean?', c: 'Element of &mdash; the pair belongs to the set.', d: ['Is of type (<code>:</code>).', 'Subset (<code>&sube;</code>).', 'Implies (<code>&rArr;</code>).'] },
    { q: 'In <code>#Board &ge; 3</code>, what does <code>#</code> mean?', c: 'Size (cardinality) of the set.', d: ['Power set (<code>&Popf;</code>).', 'Type marker (<code>:</code>).', 'Comment symbol.'] },
    { q: 'In <code>&forall; m &bull; P(m)</code>, what does <code>&bull;</code> mean?', c: '&ldquo;Such that&rdquo; &mdash; separates the bound variable from the predicate body.', d: ['Logical AND (<code>&and;</code>).', 'Multiplication.', 'Element of (<code>&isin;</code>).'] },
  ];
  function logicGen() { const q = pick(logicQs); return { question: q.q, correct: q.c, distractors: q.d }; }
  ['Quantifiers &amp; AND','OR &amp; Implication','Implication &amp; AND','Type Declaration',
   'Quantifiers','OR &amp; Enumeration','Bounds &amp; Inequality','Implication',
   'AND &amp; Bounds','Ordering &amp; Inequality','Naturals &amp; Counting','Enumerated Types',
   'Cardinality'].forEach(k => { window.conceptBank[k] = logicGen; });

  window.conceptBank['Set Comprehension'] = function() {
    const sets = [
      { desc: 'employees earning over $80k', expr: '{ e : Employee | salary(e) &gt; 80000 }' },
      { desc: 'students with GPA above 3.5', expr: '{ s : Student | gpa(s) &gt; 3.5 }' },
      { desc: 'products priced under $10', expr: '{ p : Product | price(p) &lt; 10 }' },
    ];
    const s = pick(sets);
    return {
      scenario: `Build the set of ${s.desc}.`,
      question: 'Which set comprehension?',
      correct: `<code>${s.expr}</code>`,
      distractors: ['<code>{ }</code>', '<code>&Popf; Employee</code>', '<code>Employee &times; Salary</code>']
    };
  };

  window.conceptBank['Cartesian Product'] = function() {
    const pairs = [
      { a: 'Row = 1..30', b: 'Letter = {A..F}', prod: 'Seat = Row &times; Letter' },
      { a: 'Day = 1..31', b: 'Month = 1..12', prod: 'Date = Day &times; Month' },
    ];
    const p = pick(pairs);
    return {
      question: `Given ${p.a} and ${p.b}, the Cartesian product is:`,
      correct: `<code>${p.prod}</code>`,
      distractors: ['<code>&Popf; Row</code>', '<code>Row &cup; Letter</code>', '<code>Row &cap; Letter</code>']
    };
  };

  window.conceptBank['Power Set'] = function() {
    return {
      question: '&Popf; S represents:',
      correct: 'The set of all subsets of S.',
      distractors: ['The size of S.', 'The product S &times; S.', 'The complement of S.']
    };
  };
  window.conceptBank['Power Set &amp; Enumeration'] = window.conceptBank['Power Set'];

  window.conceptBank['Refinement to Code'] = window.conceptBank['Refinement'];
  window.conceptBank['Schema Constraints'] = function() {
    return {
      question: 'A Z schema groups:',
      correct: 'Declarations + constraints.',
      distractors: ['Only declarations.', 'Only constraints.', 'Code + tests.']
    };
  };
  window.conceptBank['Variable Naming'] = function() {
    return {
      question: 'Z emphasises judicious variable naming because:',
      correct: 'Good names make the spec obvious; commentary fills gaps.',
      distractors: ['Compilers require it.', 'Names are irrelevant.', 'Only single-letter names allowed.']
    };
  };

  window.conceptBank['Proof at Design Stage'] = function() {
    return {
      question: 'Main benefit of proof at the design stage?',
      correct: 'Shows WHY the design works; helps when requirements change.',
      distractors: ['Replaces the spec.', 'Auto-generates code.', 'Eliminates testing.']
    };
  };

  window.conceptBank['Consistency Proofs'] = function() {
    const vars = pick([
      { v: 'temp', t: '&Zopf;', pred: '18 &le; temp &le; 22', wit: 'temp = 20' },
      { v: 'bal', t: '&Nopf;', pred: 'bal &ge; 0 &and; bal &le; 10000', wit: 'bal = 500' },
      { v: 'speed', t: '&Nopf;', pred: 'speed &le; 120', wit: 'speed = 60' },
    ]);
    return {
      question: `Given <code>${vars.v} : ${vars.t}</code> with <code>${vars.pred}</code>, which proves <em>consistency</em>?`,
      correct: `<code>&exist; ${vars.v} &bull; ${vars.pred}</code> &mdash; witness: <code>${vars.wit}</code>.`,
      distractors: [
        `<code>&forall; ${vars.v} &bull; ${vars.pred}</code> &mdash; universal, not existential.`,
        `<code>${vars.v} &rArr; ${vars.t}</code> &mdash; wrong connective.`,
        `No witness needed &mdash; just assume it.`
      ]
    };
  };

  window.conceptBank['Refinement Proofs'] = function() {
    const pairs = pick([
      { abs: 'contacts : &Popf; Name', conc: 'sortedList : seq Name', ret: 'contacts = ran sortedList' },
      { abs: 'items : &Popf; Item', conc: 'arr : seq Item', ret: 'items = ran arr' },
      { abs: 'balance : &Nopf;', conc: 'cents : &Nopf;', ret: 'balance = cents / 100' },
    ]);
    return {
      question: `Abstract: <code>${pairs.abs}</code>. Concrete: <code>${pairs.conc}</code>. A <em>refinement proof</em> must show:`,
      correct: `<code>Concrete &sube; Abstract</code> via retrieve <code>${pairs.ret}</code> &mdash; every op preserves the relation.`,
      distractors: [
        `<code>Abstract &sube; Concrete</code> &mdash; reversed direction.`,
        `<code>${pairs.ret}</code> alone, no per-op check needed.`,
        `Delete the abstract spec after coding.`
      ]
    };
  };

  window.conceptBank['Early Detection'] = function() {
    const bugs = pick([
      { sys: 'ATM', bug: 'missing overflow guard on <code>bal &minus; w</code>', cost: '6 months' },
      { sys: 'elevator', bug: 'missing <code>floor &le; max</code> bound', cost: '4 months' },
      { sys: 'thermostat', bug: 'contradictory <code>temp &ge; 25 &and; temp &le; 20</code>', cost: '3 months' },
    ]);
    return {
      scenario: `A ${bugs.sys} spec-stage proof catches: ${bugs.bug}. Post-release fix would cost ${bugs.cost}.`,
      question: 'This illustrates:',
      correct: '<em>Early detection</em> &mdash; proof catches bugs before code, when fixes are cheap.',
      distractors: ['Proof was unnecessary &mdash; testing would catch it.', 'Only coding produces bugs.', 'The <em>specification</em> was wrong, so proofs are useless.']
    };
  };

  window.conceptBank['Two-Fold Intention'] = function() {
    return {
      question: 'The textbook\'s two-fold intention for proof:',
      correct: '(1) Proof adds quality; (2) proof is industrially feasible.',
      distractors: ['Proof is only theoretical.', 'Proof replaces all testing.', 'Proof is only for academics.']
    };
  };

  window.conceptBank['Hidden Assumptions'] = function() {
    return {
      scenario: 'During proof, the team discovers an unstated constraint.',
      question: 'This illustrates:',
      correct: 'Proof surfaces hidden assumptions.',
      distractors: ['The spec is fine.', 'Proofs only check math.', 'Testers will catch it.']
    };
  };

  window.conceptBank['Beck Diagram &amp; Connectivity'] = function() {
    return {
      question: 'Beck\'s Diagram kept what and dropped what?',
      correct: 'Kept connectivity; dropped geography.',
      distractors: ['Kept geography; dropped stations.', 'Kept distances; dropped colours.', 'Dropped everything.']
    };
  };

  window.conceptBank['Theorem of the Spec'] = function() {
    return {
      question: 'A route planned using the Beck Diagram is a:',
      correct: 'Theorem &mdash; provable from the spec.',
      distractors: ['Concrete detail.', 'Ambiguity.', 'Non-functional property.']
    };
  };
})();
