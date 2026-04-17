/* Ch2 Propositional Logic — Concept Bank Generators */
(function buildCh2Bank() {
  var B = window.conceptBank = window.conceptBank || {};
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { var b = a.slice(); for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = b[i]; b[i] = b[j]; b[j] = t; } return b; }

  /* ===== §2.1 ===== */
  var s1scenarios = [
    { sc:'A <span class="key">gym</span> admits members with a <span class="key">badge</span> and <span class="key">paid dues</span>.',
      q:'Which formula?', vars:'b = badge, d = dues, a = admitted',
      c:'<code>b &and; d &rArr; a</code>',
      d:['<code>b &or; d &rArr; a</code>','<code>&not;b &rArr; a</code>','<code>a &rArr; b</code>'] },
    { sc:'A <span class="key">school</span> closes if there is <span class="key">snow</span> or a <span class="key">power outage</span>.',
      q:'Which formula?', vars:'s = snow, p = outage, c = closes',
      c:'<code>s &or; p &rArr; c</code>',
      d:['<code>s &and; p &rArr; c</code>','<code>&not;s &rArr; c</code>','<code>c &rArr; s</code>'] },
    { sc:'A <span class="key">printer</span> works when it has <span class="key">paper</span> and <span class="key">ink</span> and is <span class="key">not jammed</span>.',
      q:'Which formula?', vars:'p = paper, i = ink, j = jammed, w = works',
      c:'<code>p &and; i &and; &not;j &rArr; w</code>',
      d:['<code>p &or; i &rArr; w</code>','<code>p &and; j &rArr; w</code>','<code>w &rArr; j</code>'] },
    { sc:'A <span class="key">cinema</span> admits someone with a <span class="key">ticket</span> or a <span class="key">season pass</span>.',
      q:'Which formula?', vars:'t = ticket, s = pass, a = admitted',
      c:'<code>t &or; s &rArr; a</code>',
      d:['<code>t &and; s &rArr; a</code>','<code>&not;t &rArr; a</code>','<code>a &rArr; t</code>'] },
    { sc:'A <span class="key">robot</span> moves if <span class="key">battery charged</span> and <span class="key">no obstacle</span> detected.',
      q:'Which formula?', vars:'b = battery, o = obstacle, m = moves',
      c:'<code>b &and; &not;o &rArr; m</code>',
      d:['<code>b &or; o &rArr; m</code>','<code>b &and; o &rArr; m</code>','<code>m &rArr; o</code>'] },
    { sc:'A <span class="key">vending machine</span> dispenses if <span class="key">coins inserted</span> or <span class="key">card tapped</span>.',
      q:'Which formula?', vars:'c = coins, d = card, v = dispenses',
      c:'<code>c &or; d &rArr; v</code>',
      d:['<code>c &and; d &rArr; v</code>','<code>&not;c &rArr; v</code>','<code>v &rArr; c</code>'] }
  ];
  B['Translating to Logic'] = function() {
    var s = pick(s1scenarios);
    return { scenario: s.sc, question: s.vars + '. ' + s.q, correct: s.c, distractors: s.d };
  };

  var precScenarios = [
    { expr:'<code>&not;p &and; q &or; r</code>', c:'<code>((&not;p) &and; q) &or; r</code>',
      d:['<code>&not;(p &and; (q &or; r))</code>','<code>&not;(p &and; q) &or; r</code>','<code>&not;p &and; (q &or; r)</code>'] },
    { expr:'<code>p &and; q &rArr; r &or; s</code>', c:'<code>(p &and; q) &rArr; (r &or; s)</code>',
      d:['<code>p &and; (q &rArr; r) &or; s</code>','<code>(p &and; (q &rArr; r)) &or; s</code>','<code>p &and; (q &rArr; (r &or; s))</code>'] },
    { expr:'<code>&not;p &or; q &and; r</code>', c:'<code>(&not;p) &or; (q &and; r)</code>',
      d:['<code>&not;(p &or; q) &and; r</code>','<code>(&not;p &or; q) &and; r</code>','<code>&not;(p &or; (q &and; r))</code>'] },
    { expr:'<code>p &rArr; q &hArr; r</code>', c:'<code>(p &rArr; q) &hArr; r</code>',
      d:['<code>p &rArr; (q &hArr; r)</code>','<code>(p &hArr; q) &rArr; r</code>','<code>p &hArr; (q &rArr; r)</code>'] }
  ];
  B['Applying Precedence'] = function() {
    var s = pick(precScenarios);
    return { scenario: 'Parenthesise by precedence.', question: 'Which fully parenthesised form equals ' + s.expr + '?', correct: s.c, distractors: s.d };
  };

  B['Compound Propositions'] = function() {
    var opts = [
      { c:'<code>p &and; q</code>', d:['<code>p</code>','The sky is blue.','<code>r</code>'] },
      { c:'<code>&not;p &or; q</code>', d:['<code>q</code>','42 is even.','<code>s</code>'] },
      { c:'<code>p &rArr; q</code>', d:['<code>p</code>','Hello!','<code>r</code>'] }
    ];
    var o = pick(opts);
    return { scenario:'Identify the compound proposition.', question:'Which is compound (contains a connective)?', correct:o.c, distractors:o.d };
  };

  B['Natural Deduction'] = function() {
    var opts = [
      { q:'Inference rules come in which two flavours?', c:'Introduction and elimination.', d:['Axiom and lemma.','Forward and backward.','Truth and falsehood.'] },
      { q:'What do introduction rules conclude?', c:'A formula with the connective.', d:['A formula without the connective.','A contradiction.','A truth table.'] }
    ];
    var o = pick(opts);
    return { scenario:'Natural deduction system.', question:o.q, correct:o.c, distractors:o.d };
  };

  B['Truth Values'] = function() {
    var opts = [
      { q:'How many truth values exist in classical propositional logic?', c:'Two: true and false.', d:['One: true.','Three: true, false, unknown.','Unlimited.'] },
      { q:'A proposition must be:', c:'Either true or false, never both.', d:['Always true.','Possibly both true and false.','Neither true nor false.'] }
    ];
    return pick(opts);
  };

  B['Propositional Calculus'] = function() {
    return { scenario:'Propositional calculus context.', question:'Propositional calculus is part of the logical language of which notation?',
      correct:'Z.', distractors:['UML.','SQL.','HTML.'] };
  };

  B['Operator Binding'] = function() {
    var exprs = [
      { expr:'<code>&not;p &and; q &rArr; r &hArr; s</code>', c:'<code>&hArr;</code>', d:['<code>&not;</code>','<code>&and;</code>','<code>&rArr;</code>'] },
      { expr:'<code>p &or; q &rArr; r</code>', c:'<code>&rArr;</code>', d:['<code>&or;</code>','<code>&and;</code>','<code>&not;</code>'] },
      { expr:'<code>p &and; q &or; r</code>', c:'<code>&or;</code>', d:['<code>&and;</code>','<code>&not;</code>','<code>&rArr;</code>'] }
    ];
    var e = pick(exprs);
    return { scenario:'Identify the major connective.', question:'In ' + e.expr + ', which connective binds last (is the major connective)?', correct:e.c, distractors:e.d };
  };

  /* ===== §2.2 ===== */
  var conjScenarios = [
    { sc:'A <span class="key">satellite</span> transmits when <span class="key">solar panels deployed</span> and <span class="key">antenna aligned</span>.',
      c:'<code>s &and; a &rArr; t</code>', d:['<code>s &or; a &rArr; t</code>','<code>&not;s &rArr; t</code>','<code>t &rArr; s</code>'] },
    { sc:'A <span class="key">train</span> departs when <span class="key">doors closed</span> and <span class="key">signal green</span>.',
      c:'<code>d &and; g &rArr; t</code>', d:['<code>d &or; g &rArr; t</code>','<code>&not;d &rArr; t</code>','<code>t &rArr; d</code>'] },
    { sc:'A <span class="key">lock</span> opens when <span class="key">combination correct</span> and <span class="key">handle turned</span>.',
      c:'<code>c &and; h &rArr; o</code>', d:['<code>c &or; h &rArr; o</code>','<code>&not;c &rArr; o</code>','<code>o &rArr; c</code>'] },
    { sc:'A <span class="key">rocket</span> launches when <span class="key">fuel loaded</span> and <span class="key">countdown complete</span>.',
      c:'<code>f &and; c &rArr; l</code>', d:['<code>f &or; c &rArr; l</code>','<code>f &rArr; l</code>','<code>l &rArr; f</code>'] }
  ];
  B['Modeling Conjunction'] = function() {
    var s = pick(conjScenarios);
    return { scenario:s.sc, question:'Which formula uses conjunction correctly?', correct:s.c, distractors:s.d };
  };

  B['Evaluating Conjunction'] = function() {
    var rows = [
      { p:'t', q:'t', r:'t' }, { p:'t', q:'f', r:'f' },
      { p:'f', q:'t', r:'f' }, { p:'f', q:'f', r:'f' }
    ];
    var row = pick(rows);
    return { scenario:'Truth table evaluation.', question:'Given <code>p = ' + row.p + '</code> and <code>q = ' + row.q + '</code>, what is <code>p &and; q</code>?',
      correct:'<code>' + row.r + '</code>', distractors:['<code>' + (row.r === 't' ? 'f' : 't') + '</code>','Undefined.','Depends on context.'] };
  };

  B['Conjunction Introduction'] = function() {
    return { scenario:'Conjunction introduction rule.', question:'<code>[&and;-intro]</code> has how many premisses?',
      correct:'Two: <code>p</code> and <code>q</code>.', distractors:['Zero.','One.','Three.'] };
  };

  B['Conjunction Elimination'] = function() {
    var opts = [
      { q:'Which rule extracts <code>p</code> from <code>p &and; q</code>?', c:'<code>[&and;-elim1]</code>', d:['<code>[&and;-intro]</code>','<code>[&and;-elim2]</code>','<code>[&or;-elim]</code>'] },
      { q:'Which rule extracts <code>q</code> from <code>p &and; q</code>?', c:'<code>[&and;-elim2]</code>', d:['<code>[&and;-intro]</code>','<code>[&and;-elim1]</code>','<code>[&rArr;-elim]</code>'] }
    ];
    return pick(opts);
  };

  B['Commutativity of Conjunction'] = function() {
    return { scenario:'Commutativity property.', question:'Conjunction is commutative means:',
      correct:'<code>p &and; q</code> and <code>q &and; p</code> always match.', distractors:['<code>p &and; q</code> is always true.','Order matters.','<code>p &and; q = p &or; q</code>.'] };
  };

  B['Proof Trees'] = function() {
    return { scenario:'Proof tree structure.', question:'In a proof tree, the root is the:',
      correct:'Conclusion.', distractors:['First assumption.','Hypothesis.','Side condition.'] };
  };

  B['Hypotheses and Theorems'] = function() {
    return { scenario:'Theorems and hypotheses.', question:'A proposition proved from no hypotheses is a:',
      correct:'Theorem.', distractors:['Lemma.','Axiom.','Assumption.'] };
  };

  /* ===== §2.3 ===== */
  var disjScenarios = [
    { sc:'A <span class="key">clinic</span> accepts <span class="key">insurance</span> or <span class="key">cash</span>.',
      c:'<code>i &or; c &rArr; a</code>', d:['<code>i &and; c &rArr; a</code>','<code>&not;i &rArr; a</code>','<code>a &rArr; i</code>'] },
    { sc:'A <span class="key">student</span> is excused for <span class="key">illness</span> or <span class="key">family emergency</span>.',
      c:'<code>i &or; f &rArr; e</code>', d:['<code>i &and; f &rArr; e</code>','<code>&not;i &rArr; e</code>','<code>e &rArr; i</code>'] },
    { sc:'A <span class="key">rescue</span> uses <span class="key">helicopter</span> or <span class="key">boat</span>.',
      c:'<code>h &or; b &rArr; r</code>', d:['<code>h &and; b &rArr; r</code>','<code>&not;h &rArr; r</code>','<code>r &rArr; h</code>'] },
    { sc:'A <span class="key">user</span> authenticates with <span class="key">password</span> or <span class="key">token</span>.',
      c:'<code>p &or; t &rArr; a</code>', d:['<code>p &and; t &rArr; a</code>','<code>&not;p &rArr; a</code>','<code>a &rArr; p</code>'] }
  ];
  B['Modeling Disjunction'] = function() {
    var s = pick(disjScenarios);
    return { scenario:s.sc, question:'Which formula uses disjunction correctly?', correct:s.c, distractors:s.d };
  };

  B['Evaluating Disjunction'] = function() {
    var rows = [
      { p:'t', q:'t', r:'t' }, { p:'t', q:'f', r:'t' },
      { p:'f', q:'t', r:'t' }, { p:'f', q:'f', r:'f' }
    ];
    var row = pick(rows);
    return { scenario:'Truth table evaluation.', question:'Given <code>p = ' + row.p + '</code> and <code>q = ' + row.q + '</code>, what is <code>p &or; q</code>?',
      correct:'<code>' + row.r + '</code>', distractors:['<code>' + (row.r === 't' ? 'f' : 't') + '</code>','Undefined.','Depends on context.'] };
  };

  B['Disjunction Introduction'] = function() {
    var opts = [
      { q:'You know <code>p</code>. Which rule gives <code>p &or; q</code>?', c:'<code>[&or;-intro1]</code>', d:['<code>[&or;-intro2]</code>','<code>[&or;-elim]</code>','<code>[&and;-intro]</code>'] },
      { q:'You know <code>q</code>. Which rule gives <code>p &or; q</code>?', c:'<code>[&or;-intro2]</code>', d:['<code>[&or;-intro1]</code>','<code>[&or;-elim]</code>','<code>[&and;-intro]</code>'] }
    ];
    return pick(opts);
  };

  B['Disjunction Elimination'] = function() {
    return { scenario:'Disjunction elimination.', question:'<code>[&or;-elim]</code> is also called:',
      correct:'Case analysis.', distractors:['Modus ponens.','Proof by contradiction.','Double negation.'] };
  };

  B['Case Analysis'] = function() {
    return { scenario:'Case analysis rule.', question:'In <code>[&or;-elim]</code>, how many sub-proofs?',
      correct:'Two: one per disjunct.', distractors:['One.','Three.','None.'] };
  };

  B['Assumptions and Discharge'] = function() {
    return { scenario:'Assumption notation.', question:'<code>[p]<sup>(i)</sup></code> means:',
      correct:'<code>p</code> is an assumption discharged at step <code>i</code>.', distractors:['<code>p</code> is a theorem.','<code>p</code> is false.','<code>p</code> has <code>i</code> parts.'] };
  };

  B['Commutativity of Disjunction'] = function() {
    return { scenario:'Commutativity.', question:'Disjunction is commutative means:',
      correct:'<code>p &or; q</code> and <code>q &or; p</code> always match.', distractors:['<code>p &or; q</code> is always true.','Order matters.','<code>p &or; q = p &and; q</code>.'] };
  };

  /* ===== §2.4 ===== */
  var implScenarios = [
    { sc:'<span class="key">If</span> a <span class="key">dog barks</span>, the <span class="key">cat hides</span>.',
      c:'<code>b &rArr; h</code>', d:['<code>h &rArr; b</code>','<code>b &and; h</code>','<code>b &hArr; h</code>'] },
    { sc:'<span class="key">If</span> <span class="key">pressure exceeds limit</span>, the <span class="key">valve opens</span>.',
      c:'<code>p &rArr; v</code>', d:['<code>v &rArr; p</code>','<code>p &and; v</code>','<code>&not;p &rArr; v</code>'] },
    { sc:'<span class="key">If</span> an <span class="key">invoice is overdue</span>, a <span class="key">late fee</span> applies.',
      c:'<code>o &rArr; f</code>', d:['<code>f &rArr; o</code>','<code>o &and; f</code>','<code>&not;o &rArr; f</code>'] },
    { sc:'<span class="key">If</span> a <span class="key">test fails</span>, the <span class="key">build is rejected</span>.',
      c:'<code>f &rArr; r</code>', d:['<code>r &rArr; f</code>','<code>f &and; r</code>','<code>f &hArr; r</code>'] }
  ];
  B['Modeling Implication'] = function() {
    var s = pick(implScenarios);
    return { scenario:s.sc, question:'Which formula?', correct:s.c, distractors:s.d };
  };

  B['Evaluating Implication'] = function() {
    var rows = [
      { p:'t', q:'t', r:'t' }, { p:'t', q:'f', r:'f' },
      { p:'f', q:'t', r:'t' }, { p:'f', q:'f', r:'t' }
    ];
    var row = pick(rows);
    return { scenario:'Truth table evaluation.', question:'Given <code>p = ' + row.p + '</code> and <code>q = ' + row.q + '</code>, what is <code>p &rArr; q</code>?',
      correct:'<code>' + row.r + '</code>', distractors:['<code>' + (row.r === 't' ? 'f' : 't') + '</code>','Undefined.','Depends on context.'] };
  };

  B['Implication Introduction'] = function() {
    return { scenario:'Implication introduction.', question:'To prove <code>p &rArr; q</code> via <code>[&rArr;-intro]</code>, you:',
      correct:'Assume <code>p</code>, prove <code>q</code>, discharge.', distractors:['Prove both independently.','Show <code>p</code> false.','Apply <code>[&and;-intro]</code>.'] };
  };

  B['Modus Ponens'] = function() {
    return { scenario:'Modus ponens.', question:'<code>[&rArr;-elim]</code> requires:',
      correct:'<code>p &rArr; q</code> and <code>p</code>.', distractors:['Only <code>p &rArr; q</code>.','<code>p</code> and <code>q</code>.','<code>q</code> and <code>&not;p</code>.'] };
  };

  B['Strength Ordering'] = function() {
    return { scenario:'Strength of truth values.', question:'Which is stronger?',
      correct:'<code>false</code> is stronger than <code>true</code>.', distractors:['<code>true</code> is stronger.','Equal strength.','Strength doesn&rsquo;t apply.'] };
  };

  B['Vacuous Truth'] = function() {
    return { scenario:'Vacuous truth.', question:'If the antecedent is false, the implication is:',
      correct:'Vacuously true.', distractors:['False.','Undefined.','Depends on consequent.'] };
  };

  B['Currying Antecedents'] = function() {
    return { scenario:'Currying.', question:'<code>(p &and; q &rArr; r) &rArr; (p &rArr; (q &rArr; r))</code> is:',
      correct:'A tautology.', distractors:['Sometimes false.','Always false.','Only true when <code>r</code> true.'] };
  };

  /* ===== §2.5 ===== */
  var equivScenarios = [
    { sc:'A <span class="key">lamp</span> is lit <span class="key">iff</span> the <span class="key">switch</span> is on.',
      c:'<code>s &hArr; l</code>', d:['<code>s &rArr; l</code>','<code>l &rArr; s</code>','<code>s &and; l</code>'] },
    { sc:'A <span class="key">safe</span> is locked <span class="key">iff</span> the <span class="key">code panel</span> is armed.',
      c:'<code>c &hArr; l</code>', d:['<code>c &rArr; l</code>','<code>l &rArr; c</code>','<code>c &or; l</code>'] },
    { sc:'An <span class="key">elevator</span> moves <span class="key">iff</span> the <span class="key">doors are closed</span>.',
      c:'<code>d &hArr; m</code>', d:['<code>d &rArr; m</code>','<code>m &rArr; d</code>','<code>d &and; m</code>'] },
    { sc:'A <span class="key">motor</span> spins <span class="key">iff</span> <span class="key">power is applied</span>.',
      c:'<code>p &hArr; s</code>', d:['<code>p &rArr; s</code>','<code>s &rArr; p</code>','<code>p &and; s</code>'] }
  ];
  B['Modeling Equivalence'] = function() {
    var s = pick(equivScenarios);
    return { scenario:s.sc, question:'Which formula?', correct:s.c, distractors:s.d };
  };

  B['Evaluating Equivalence'] = function() {
    var rows = [
      { p:'t', q:'t', r:'t' }, { p:'t', q:'f', r:'f' },
      { p:'f', q:'t', r:'f' }, { p:'f', q:'f', r:'t' }
    ];
    var row = pick(rows);
    return { scenario:'Truth table evaluation.', question:'Given <code>p = ' + row.p + '</code> and <code>q = ' + row.q + '</code>, what is <code>p &hArr; q</code>?',
      correct:'<code>' + row.r + '</code>', distractors:['<code>' + (row.r === 't' ? 'f' : 't') + '</code>','Undefined.','Depends on context.'] };
  };

  B['Equivalence Introduction'] = function() {
    return { scenario:'Equivalence introduction.', question:'<code>[&hArr;-intro]</code> requires:',
      correct:'<code>p &rArr; q</code> and <code>q &rArr; p</code>.', distractors:['Only <code>p &rArr; q</code>.','<code>p &and; q</code>.','Only <code>q &rArr; p</code>.'] };
  };

  B['Equivalence Elimination'] = function() {
    var opts = [
      { q:'From <code>p &hArr; q</code>, which rule gives <code>p &rArr; q</code>?', c:'<code>[&hArr;-elim1]</code>', d:['<code>[&hArr;-elim2]</code>','<code>[&hArr;-intro]</code>','<code>[&rArr;-intro]</code>'] },
      { q:'From <code>p &hArr; q</code>, which rule gives <code>q &rArr; p</code>?', c:'<code>[&hArr;-elim2]</code>', d:['<code>[&hArr;-elim1]</code>','<code>[&hArr;-intro]</code>','<code>[&and;-elim2]</code>'] }
    ];
    return pick(opts);
  };

  B['Subsume Rule'] = function() {
    return { scenario:'Subsume rule.', question:'If <code>p &rArr; q</code>, subsume gives:',
      correct:'<code>p &and; q &hArr; p</code>', distractors:['<code>p &or; q &hArr; p</code>','<code>p &hArr; q</code>','<code>q &rArr; p</code>'] };
  };

  B['Derived Rules'] = function() {
    return { scenario:'Derived rules.', question:'A derived rule is:',
      correct:'Proven from existing rules, reused like any inference rule.', distractors:['An axiom.','A rule that works once.','Only for negation.'] };
  };

  B['Equivalence vs Implication'] = function() {
    return { scenario:'Comparing connectives.', question:'What distinguishes <code>&hArr;</code> from <code>&rArr;</code>?',
      correct:'<code>&hArr;</code> requires both directions.', distractors:['They are the same.','<code>&hArr;</code> is always true.','<code>&rArr;</code> requires both directions.'] };
  };

  /* ===== §2.6 ===== */
  var negScenarios = [
    { sc:'A <span class="key">bridge</span> is safe when there is <span class="key">no ice</span>.',
      c:'<code>&not;i &rArr; s</code>', d:['<code>i &rArr; s</code>','<code>s &rArr; i</code>','<code>i &and; s</code>'] },
    { sc:'A <span class="key">park</span> opens when there is <span class="key">no storm</span>.',
      c:'<code>&not;s &rArr; o</code>', d:['<code>s &rArr; o</code>','<code>o &rArr; s</code>','<code>s &and; o</code>'] },
    { sc:'A <span class="key">road</span> is passable when there is <span class="key">no flood</span>.',
      c:'<code>&not;f &rArr; p</code>', d:['<code>f &rArr; p</code>','<code>p &rArr; f</code>','<code>f &and; p</code>'] },
    { sc:'A <span class="key">market</span> operates when there is <span class="key">no curfew</span>.',
      c:'<code>&not;c &rArr; o</code>', d:['<code>c &rArr; o</code>','<code>o &rArr; c</code>','<code>c &and; o</code>'] }
  ];
  B['Modeling Negation'] = function() {
    var s = pick(negScenarios);
    return { scenario:s.sc, question:'Which formula?', correct:s.c, distractors:s.d };
  };

  B['Applying Negation Rules'] = function() {
    var opts = [
      { q:'<code>[&not;-elim]</code> takes which premisses?', c:'<code>p</code> and <code>&not;p</code>.', d:['Only <code>p</code>.','Only <code>&not;p</code>.','<code>false</code>.'] },
      { q:'To prove <code>&not;p</code> via <code>[&not;-intro]</code>, you:', c:'Assume <code>p</code>, derive <code>false</code>, conclude <code>&not;p</code>.', d:['Show <code>p</code> true.','Apply <code>[&and;-intro]</code>.','Use <code>[false-elim]</code>.'] },
      { q:'From <code>false</code>, <code>[false-elim]</code> concludes:', c:'Any proposition <code>q</code>.', d:['Only <code>&not;p</code>.','Nothing.','Only <code>true</code>.'] }
    ];
    return pick(opts);
  };

  B['Negation Introduction'] = function() {
    return { scenario:'Negation introduction.', question:'<code>[&not;-intro]</code> is a type of:',
      correct:'Discharge rule.', distractors:['Elimination rule.','Axiom.','Truth table rule.'] };
  };

  B['Negation Elimination'] = function() {
    return { scenario:'Negation rules count.', question:'Negation requires how many rules?',
      correct:'Three: <code>[&not;-intro]</code>, <code>[&not;-elim]</code>, <code>[false-elim]</code>.', distractors:['Two.','One.','Four.'] };
  };

  B['False Elimination'] = function() {
    return { scenario:'False elimination.', question:'<code>[false-elim]</code> is also known as:',
      correct:'Ex falso quodlibet.', distractors:['Modus ponens.','Case analysis.','Proof by induction.'] };
  };

  B["De Morgan's Law"] = function() {
    var opts = [
      { q:'<code>&not;(p &or; q)</code> equals:', c:'<code>&not;p &and; &not;q</code>', d:['<code>&not;p &or; &not;q</code>','<code>p &and; q</code>','<code>p &or; q</code>'] },
      { q:'<code>&not;(p &and; q)</code> equals:', c:'<code>&not;p &or; &not;q</code>', d:['<code>&not;p &and; &not;q</code>','<code>p &or; q</code>','<code>p &and; q</code>'] }
    ];
    return pick(opts);
  };

  B['Proof by Contradiction'] = function() {
    return { scenario:'Proof by contradiction.', question:'Pattern: assume <code>p</code>, derive <code>false</code>, conclude:',
      correct:'<code>&not;p</code>.', distractors:['<code>p</code>.','<code>true</code>.','<code>p &or; &not;p</code>.'] };
  };

  /* ===== §2.7 Proof Trees ===== */
  B['Building Conjunction Trees'] = function() {
    var opts = [
      { q:'To prove \\(p \\wedge q \\vdash q \\wedge p\\), which rules?', c:'<code>[&and;-elim1]</code>, <code>[&and;-elim2]</code>, <code>[&and;-intro]</code>', d:['<code>[&or;-intro1]</code>, <code>[&or;-intro2]</code>','<code>[&rArr;-intro]</code>, <code>[&rArr;-elim]</code>','<code>[&not;-intro]</code>, <code>[&not;-elim]</code>'] },
      { q:'\\(\\dfrac{p \\wedge q}{q}\\) uses which rule?', c:'<code>[&and;-elim2]</code>', d:['<code>[&and;-elim1]</code>','<code>[&and;-intro]</code>','<code>[&or;-elim]</code>'] },
      { q:'\\(\\dfrac{q \\quad p}{q \\wedge p}\\) uses which rule?', c:'<code>[&and;-intro]</code>', d:['<code>[&and;-elim1]</code>','<code>[&or;-intro1]</code>','<code>[&rArr;-intro]</code>'] },
      { q:'How many leaves in the conjunction commutativity tree?', c:'Two (both \\(p \\wedge q\\)).', d:['One.','Three.','Zero.'] }
    ];
    return pick(opts);
  };

  B['Building Disjunction Trees'] = function() {
    var opts = [
      { q:'To prove \\(p \\vee q \\vdash q \\vee p\\), the main technique is:', c:'Case analysis (<code>[&or;-elim]</code>).', d:['Conjunction elimination.','Modus ponens.','Proof by contradiction.'] },
      { q:'Assuming \\([p]^{(1)}\\), which rule gives \\(q \\vee p\\)?', c:'<code>[&or;-intro2]</code> (p goes second).', d:['<code>[&or;-intro1]</code>','<code>[&or;-elim]</code>','<code>[&and;-intro]</code>'] },
      { q:'How many assumptions are discharged in \\(\\vee\\)-commutativity?', c:'Two: \\([p]^{(1)}\\) and \\([q]^{(1)}\\).', d:['None.','One.','Three.'] },
      { q:'\\(\\dfrac{p}{p \\vee q}\\) uses which rule?', c:'<code>[&or;-intro1]</code>', d:['<code>[&or;-intro2]</code>','<code>[&or;-elim]</code>','<code>[&and;-intro]</code>'] }
    ];
    return pick(opts);
  };

  B['Building Implication Trees'] = function() {
    var opts = [
      { q:'\\(\\dfrac{p \\Rightarrow q \\quad p}{q}\\) is which rule?', c:'<code>[&rArr;-elim]</code> (modus ponens).', d:['<code>[&rArr;-intro]</code>','<code>[&and;-intro]</code>','<code>[&or;-elim]</code>'] },
      { q:'The currying proof needs how many <code>[&rArr;-intro]</code> steps?', c:'Three.', d:['One.','Two.','Zero.'] },
      { q:'In currying, \\([p]^{(2)}\\) and \\([q]^{(3)}\\) combine via:', c:'<code>[&and;-intro]</code> to build \\(p \\wedge q\\).', d:['<code>[&or;-intro1]</code>','<code>[&rArr;-intro]</code>','<code>[&and;-elim1]</code>'] },
      { q:'A proof with no undischarged assumptions proves a:', c:'Theorem.', d:['Derived rule with hypotheses.','Contradiction.','Assumption.'] }
    ];
    return pick(opts);
  };

  B['Building Negation Trees'] = function() {
    var opts = [
      { q:'\\(\\dfrac{p \\quad \\neg p}{\\textit{false}}\\) is:', c:'<code>[&not;-elim]</code>', d:['<code>[&not;-intro]</code>','<code>[false-elim]</code>','<code>[&and;-elim1]</code>'] },
      { q:'\\(\\dfrac{\\textit{false}}{q}\\) is:', c:'<code>[false-elim]</code>', d:['<code>[&not;-intro]</code>','<code>[&not;-elim]</code>','<code>[&rArr;-elim]</code>'] },
      { q:'In de Morgan, \\(\\neg p\\) is proved by assuming \\(p\\) and deriving a contradiction. The rule is:', c:'<code>[&not;-intro]</code> &mdash; a discharge rule.', d:['<code>[&not;-elim]</code>','<code>[false-elim]</code>','<code>[&rArr;-intro]</code>'] },
      { q:'De Morgan combines \\(\\neg p\\) and \\(\\neg q\\) at the root using:', c:'<code>[&and;-intro]</code>', d:['<code>[&or;-intro1]</code>','<code>[&rArr;-intro]</code>','<code>[&hArr;-intro]</code>'] }
    ];
    return pick(opts);
  };

  B['Tree Leaves and Roots'] = function() {
    var opts = [
      { q:'Deduplicated leaves of a proof tree are the:', c:'Premisses of the derived rule.', d:['Conclusions.','Side conditions.','Rule names.'] },
      { q:'The root of a proof tree is the:', c:'Conclusion of the derived rule.', d:['First assumption.','A side condition.','A premiss.'] }
    ];
    return pick(opts);
  };

  B['Discharging Assumptions'] = function() {
    var opts = [
      { q:'Which rule is NOT a discharge rule?', c:'<code>[&and;-intro]</code>', d:['<code>[&rArr;-intro]</code>','<code>[&not;-intro]</code>','<code>[&or;-elim]</code>'] },
      { q:'The notation \\([p]^{(i)}\\) means:', c:'\\(p\\) is an assumption discharged at step \\(i\\).', d:['\\(p\\) is a theorem.','\\(p\\) is false.','\\(p\\) has \\(i\\) parts.'] }
    ];
    return pick(opts);
  };

  B['Reading Proof Trees'] = function() {
    var opts = [
      { q:'A tree with root \\(q \\wedge p\\) and leaves \\(p \\wedge q\\) represents:', c:'Conjunction commutativity.', d:['Disjunction commutativity.','Modus ponens.','De Morgan.'] },
      { q:'A tree with root \\(q \\vee p\\) and leaf \\(p \\vee q\\) represents:', c:'Disjunction commutativity.', d:['Conjunction commutativity.','Subsume.','Currying.'] }
    ];
    return pick(opts);
  };

  B['Derived Rules from Trees'] = function() {
    return { scenario:'Derived rules.', question:'Once proven, a derived rule can be:',
      correct:'Reused in any future proof like a basic rule.', distractors:['Used only once.','Used only in the same chapter.','Not used &mdash; only basic rules count.'] };
  };

  B['Truth Table vs Proof Tree'] = function() {
    return { scenario:'Comparing proof methods.', question:'Advantage of proof trees over truth tables:',
      correct:'They produce reusable derived rules.', distractors:['They are always shorter.','They don&rsquo;t require inference rules.','They only work for conjunction.'] };
  };

})();

/* Ch2 — Auto-annotate symbols with hover definitions across all sections */
(function annotateChapter2Symbols() {
  var sections = {
    'page-0': { /* §2.1 Propositional Logic */
      '\u00AC':     'Negation \u2014 logical NOT.',
      '\u2227':     'Conjunction \u2014 logical AND.',
      '\u2228':     'Disjunction \u2014 logical OR.',
      '\u21D2':     'Implication \u2014 if\u2026then.',
      '\u21D4':     'Equivalence \u2014 if and only if.'
    },
    'page-1': { /* §2.2 Conjunction */
      '\u2227':           'Conjunction \u2014 logical AND.',
      '[\u2227-intro]':   'From p and q, conclude p \u2227 q.',
      '[\u2227-elim1]':   'From p \u2227 q, conclude p.',
      '[\u2227-elim2]':   'From p \u2227 q, conclude q.',
      't':                'Truth value: true.',
      'f':                'Truth value: false.'
    },
    'page-2': { /* §2.3 Disjunction */
      '\u2228':           'Disjunction \u2014 logical OR.',
      '[\u2228-intro1]':  'From p, conclude p \u2228 q.',
      '[\u2228-intro2]':  'From q, conclude p \u2228 q.',
      '[\u2228-elim]':    'Case analysis on p \u2228 q.',
      '[p](i)':           'Assumption p, discharged at step i.'
    },
    'page-3': { /* §2.4 Implication */
      '\u21D2':           'Implication \u2014 if\u2026then.',
      '[\u21D2-intro]':   'Assume p, prove q, conclude p \u21D2 q.',
      '[\u21D2-elim]':    'From p \u21D2 q and p, conclude q (modus ponens).'
    },
    'page-4': { /* §2.5 Equivalence */
      '\u21D4':           'Equivalence \u2014 if and only if.',
      '[\u21D4-intro]':   'From p \u21D2 q and q \u21D2 p, conclude p \u21D4 q.',
      '[\u21D4-elim1]':   'From p \u21D4 q, conclude p \u21D2 q.',
      '[\u21D4-elim2]':   'From p \u21D4 q, conclude q \u21D2 p.',
      '[subsume]':        'From p \u21D2 q, conclude p \u2227 q \u21D4 p.'
    },
    'page-5': { /* §2.6 Negation */
      '\u00AC':           'Negation \u2014 logical NOT.',
      'false':            'Contradiction \u2014 always false.',
      '[\u00AC-intro]':   'Assume p, derive false, conclude \u00ACp.',
      '[\u00AC-elim]':    'From p and \u00ACp, conclude false.',
      '[false-elim]':     'From false, conclude any p.'
    },
    'page-6': { /* §2.7 Proof Trees */
      '[\u2227-intro]':   'From p and q, conclude p \u2227 q.',
      '[\u2227-elim1]':   'From p \u2227 q, conclude p.',
      '[\u2227-elim2]':   'From p \u2227 q, conclude q.',
      '[\u2228-intro1]':  'From p, conclude p \u2228 q.',
      '[\u2228-intro2]':  'From q, conclude p \u2228 q.',
      '[\u2228-elim]':    'Case analysis on p \u2228 q.',
      '[\u21D2-intro]':   'Assume p, prove q, conclude p \u21D2 q.',
      '[\u21D2-elim]':    'From p \u21D2 q and p, conclude q (modus ponens).',
      '[\u21D4-intro]':   'From p \u21D2 q and q \u21D2 p, conclude p \u21D4 q.',
      '[\u00AC-intro]':   'Assume p, derive false, conclude \u00ACp.',
      '[\u00AC-elim]':    'From p and \u00ACp, conclude false.',
      '[false-elim]':     'From false, conclude any p.',
      '[p](i)':           'Assumption p, discharged at step i.'
    }
  };
  document.addEventListener('DOMContentLoaded', function() {
    Object.keys(sections).forEach(function(sectionId) {
      var section = document.getElementById(sectionId);
      if (!section) return;
      var defs = sections[sectionId];
      var codes = section.querySelectorAll('.concept li code, .example li code');
      codes.forEach(function(el) {
        var text = el.textContent.trim();
        if (defs[text]) {
          el.classList.add('sym-def');
          el.setAttribute('data-def', defs[text]);
        }
      });
    });
  });
})();
