(function buildCh17Bank() {

  window.conceptBank = window.conceptBank || {};

  // ===================== 17.1 Relations and schema operations =====================

  var schemaScenarios = [
    { sys: 'badge reader', state: 'Location', op: 'Scan', pre: 'badge &ne; &empty;', post: 'loc&prime; = lookup(badge)', partial: 'unregistered badges' },
    { sys: 'thermostat', state: 'Temp', op: 'SetTemp', pre: 'target &isin; 15..30', post: 'temp&prime; = target', partial: 'out-of-range inputs' },
    { sys: 'ATM', state: 'Balance', op: 'Withdraw', pre: 'amt &le; balance', post: 'balance&prime; = balance &minus; amt', partial: 'insufficient funds' },
    { sys: 'elevator', state: 'Floor', op: 'GoTo', pre: 'floor &isin; 1..20', post: 'current&prime; = floor', partial: 'invalid floor' },
    { sys: 'login gate', state: 'Session', op: 'Auth', pre: 'pwd = stored', post: 'logged_in&prime; = true', partial: 'wrong password' },
    { sys: 'printer', state: 'Queue', op: 'Print', pre: 'queue &ne; &empty;', post: 'queue&prime; = tail queue', partial: 'empty queue' }
  ];

  window.conceptBank['Schema-Relation Correspondence'] = function() {
    var s = schemaScenarios[Math.floor(Math.random() * schemaScenarios.length)];
    var qTypes = [
      {
        question: 'The operation <code>' + s.op + '</code> in a <span class="key">' + s.sys + '</span> has precondition <code>' + s.pre + '</code>. The corresponding relation is:',
        correct: 'Partial &mdash; undefined for states where <code>' + s.pre + '</code> is false (' + s.partial + ').',
        distractors: ['Total &mdash; defined everywhere.', 'Empty.', 'The identity relation.']
      },
      {
        question: 'A <span class="key">' + s.sys + '</span> has <code>' + s.op + ' &cong; [&Delta;' + s.state + ' | ' + s.pre + ' &and; ' + s.post + ']</code>. The relation is:',
        correct: '<code>{' + s.op + ' &bull; &theta;' + s.state + ' &mapsto; &theta;' + s.state + '&prime;}</code>.',
        distractors: ['<code>&theta;' + s.state + '</code> alone.', '<code>' + s.state + ' &rarr; ' + s.state + '</code>.', '<code>pre ' + s.op + '</code>.']
      }
    ];
    var q = qTypes[Math.floor(Math.random() * qTypes.length)];
    return { scenario: '', question: q.question, correct: q.correct, distractors: q.distractors };
  };

  window.conceptBank['Partial Operation'] = function() {
    var s = schemaScenarios[Math.floor(Math.random() * schemaScenarios.length)];
    return {
      scenario: 'A <span class="key">' + s.sys + '</span> operation fails when <span class="key">' + s.partial + '</span>.',
      question: 'This means the operation schema is:',
      correct: 'Partial &mdash; the precondition <code>' + s.pre + '</code> excludes some states from the domain.',
      distractors: ['Total &mdash; always defined.', 'Empty.', 'Bijective.']
    };
  };

  window.conceptBank['Split-Merge Translation'] = function() {
    var qs = [
      { q: 'The formula <code>&rho;<sub>s</sub> = split &#x2A1F; (&rho; &#x2225; id) &#x2A1F; merge</code> translates:', c: 'An operation with I/O into a relation on sequences of inputs and outputs.', d: ['A relation into a schema.', 'A type into a set.', 'Nothing.'] },
      { q: '<code>split</code> and <code>merge</code> act as:', c: 'Translators between the schema world and the relational world.', d: ['Schema operators.', 'Type constructors.', 'Proof rules.'] }
    ];
    var p = qs[Math.floor(Math.random() * qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Retrieve Schema'] = function() {
    var retrieves = [
      { abs: 'set of employees', conc: 'injective sequence', link: 's = ran l', name: 'ListRetrieveSet' },
      { abs: 'sequence of numbers', conc: 'sum + count', link: 'sum = &Sigma;(s i) &and; size = #s', name: 'SumSizeRetrieve' },
      { abs: 'map of files', conc: 'sorted array', link: 'files = toMap(arr)', name: 'ArrayRetrieve' }
    ];
    var r = retrieves[Math.floor(Math.random() * retrieves.length)];
    return {
      scenario: 'Abstract state is a <span class="key">' + r.abs + '</span>; concrete is a <span class="key">' + r.conc + '</span>.',
      question: 'The retrieve schema includes:',
      correct: 'Both abstract and concrete state, with linking predicate <code>' + r.link + '</code>.',
      distractors: ['Only the abstract state.', 'Only the concrete state.', 'No predicate &mdash; just types.']
    };
  };

  window.conceptBank['Linking Predicate'] = function() {
    return {
      scenario: '',
      question: 'A linking predicate in a retrieve schema expresses:',
      correct: 'How to compute the abstract state from the concrete state.',
      distractors: ['The precondition of an operation.', 'The type of the state.', 'The output of an operation.']
    };
  };

  window.conceptBank['Input-Output Relation'] = function() {
    return {
      scenario: '',
      question: 'For an operation with input <code>i?</code> and output <code>o!</code>, the corresponding relation has:',
      correct: 'Domain = <code>State &times; Input</code>, range = <code>State &times; Output</code>.',
      distractors: ['Domain = <code>State</code> only.', 'No domain.', 'Domain = <code>Input</code> only.']
    };
  };

  // aliases for warmup concept titles
  window.conceptBank['Schema Meaning'] = function() {
    return { scenario: '', question: 'An operation schema defines:', correct: 'A relation upon states (before-state to after-state).', distractors: ['A function on types.', 'A free type.', 'A constant.'] };
  };
  window.conceptBank['Totalisation Symbol'] = function() {
    return { scenario: '', question: 'When an operation is undefined, totalisation adds:', correct: '<code>&perp;</code> (bottom) &mdash; relating undefined states to all possible after-states.', distractors: ['<code>&empty;</code>.', '<code>true</code>.', 'Nothing.'] };
  };

  // ===================== 17.2 Forwards simulation =====================

  var fwdScenarios = [
    { abs: 'set of gym members', conc: 'member list', init_a: 's&prime; = &empty;', init_c: 'l&prime; = &lang;&rang;', link: 's = ran l', op_a: 'AJoin', op_c: 'CJoin', pre_a: '#s < max', pre_c: '#l < max' },
    { abs: 'account balance', conc: 'transaction log', init_a: 'bal&prime; = 0', init_c: 'log&prime; = &lang;&rang;', link: 'bal = fold(+, 0, log)', op_a: 'ADeposit', op_c: 'CDeposit', pre_a: 'amt &gt; 0', pre_c: 'amt &gt; 0' },
    { abs: 'patient set', conc: 'patient queue', init_a: 'ps&prime; = &empty;', init_c: 'q&prime; = &lang;&rang;', link: 'ps = ran q', op_a: 'AAdmit', op_c: 'CAdmit', pre_a: '#ps < beds', pre_c: '#q < beds' },
    { abs: 'file map', conc: 'directory array', init_a: 'files&prime; = &empty;', init_c: 'dir&prime; = &lang;&rang;', link: 'files = toMap(dir)', op_a: 'ASave', op_c: 'CSave', pre_a: 'name &notin; dom files', pre_c: 'name &notin; dom(toMap(dir))' }
  ];

  window.conceptBank['Forwards Simulation Rule'] = function() {
    var s = fwdScenarios[Math.floor(Math.random() * fwdScenarios.length)];
    var ruleTypes = [
      {
        question: 'For F-init of a <span class="key">' + s.conc + '</span> refining a <span class="key">' + s.abs + '</span>: if <code>' + s.init_c + '</code>, we must show:',
        correct: '<code>&exist; abstract state &bull; ' + s.init_a + ' &and; ' + s.link + '</code> (an abstract init exists).',
        distractors: ['<code>' + s.init_c + ' = ' + s.init_a + '</code>.', 'Nothing &mdash; init is automatic.', '<code>pre ' + s.op_c + '</code>.']
      },
      {
        question: 'For F-corr applicability of <code>' + s.op_c + '</code> refining <code>' + s.op_a + '</code>:',
        correct: '<code>&forall; A; C &bull; pre ' + s.op_a + ' &and; R &rArr; pre ' + s.op_c + '</code>.',
        distractors: ['<code>pre ' + s.op_c + ' &rArr; pre ' + s.op_a + '</code>.', '<code>' + s.op_a + ' = ' + s.op_c + '</code>.', '<code>true</code>.']
      }
    ];
    var q = ruleTypes[Math.floor(Math.random() * ruleTypes.length)];
    return { scenario: '', question: q.question, correct: q.correct, distractors: q.distractors };
  };

  window.conceptBank['Retrieve Direction'] = function() {
    return {
      scenario: '',
      question: 'A retrieve relation R links:',
      correct: 'Abstract state A to concrete state C, showing how to recover A from C.',
      distractors: ['Only types.', 'Only operations.', 'Outputs to inputs.']
    };
  };

  window.conceptBank['Applicability Meaning'] = function() {
    return {
      scenario: '',
      question: 'F-corr applicability <code>&forall; A; C &bull; pre AO &and; R &rArr; pre CO</code> means:',
      correct: 'The concrete operation must be defined wherever the abstract one is (no loss of service).',
      distractors: ['The concrete is always total.', 'The abstract matches the concrete exactly.', 'Nothing about definitions.']
    };
  };

  window.conceptBank['Correctness Meaning'] = function() {
    return {
      scenario: '',
      question: 'F-corr correctness <code>pre AO &and; R &and; CO &rArr; &exist; A&prime; &bull; AO &and; R&prime;</code> means:',
      correct: 'Every concrete result has a matching abstract result that preserves the retrieve.',
      distractors: ['The concrete equals the abstract.', 'The retrieve is the identity.', 'No abstract state exists.']
    };
  };

  window.conceptBank['Proof Obligation Structure'] = function() {
    return {
      scenario: '',
      question: 'A forwards simulation proof obligation has the shape:',
      correct: 'Universally quantified implication with <code>pre</code>, <code>R</code>, <code>CO</code> as antecedents and <code>&exist; A&prime; &bull; AO &and; R&prime;</code> as consequent.',
      distractors: ['A simple equation.', 'A free type definition.', 'An existential with no quantifiers.']
    };
  };

  window.conceptBank['Multiple Concrete Designs'] = function() {
    return {
      scenario: '',
      question: 'The dictionary example shows that one abstract spec (set of words) can be refined by:',
      correct: 'Multiple different concrete designs (sorted list, length partition, trie) &mdash; each a valid refinement.',
      distractors: ['Exactly one concrete design.', 'No concrete design.', 'Only a list.']
    };
  };

  // warmup aliases
  window.conceptBank['F-init Rule'] = function() {
    return { scenario: '', question: 'F-init requires:', correct: '<code>&forall; C&prime; &bull; CI &rArr; &exist; A&prime; &bull; AI &and; R&prime;</code> &mdash; every concrete init has an abstract match.', distractors: ['<code>CI = AI</code>.', '<code>CI &rArr; CI</code>.', 'Nothing about initialisation.'] };
  };
  window.conceptBank['F-corr Parts'] = function() {
    return { scenario: '', question: 'F-corr has two parts:', correct: 'Applicability (pre preserved) and correctness (results match via R&prime;).', distractors: ['Only applicability.', 'Only correctness.', 'Neither.'] };
  };

  // ===================== 17.3 Backwards simulation =====================

  var bwdScenarios = [
    { spec: 'theatre booking', abs: 'Phoenix (choose ticket at arrival)', conc: 'Apollo (choose ticket at booking)', why: 'nondeterministic ticket choice is made earlier in the concrete' },
    { spec: 'game secret', abs: 'Mastermind (code chosen at power-on)', conc: 'Implementation (code chosen at first guess)', why: 'nondeterministic code selection is postponed in the concrete' },
    { spec: 'vending machine', abs: 'VMSpec (3-digit code entered atomically)', conc: 'VMDesign (digits entered one by one)', why: 'nondeterministic success/failure is decided later in the concrete' },
    { spec: 'lottery draw', abs: 'Draw (winner chosen at ticket sale)', conc: 'Impl (winner revealed at ceremony)', why: 'the nondeterministic choice of winner is postponed' },
    { spec: 'card shuffle', abs: 'Deck (shuffled at game start)', conc: 'Impl (cards drawn on demand)', why: 'the nondeterministic shuffle order is resolved lazily' }
  ];

  window.conceptBank['Backwards Simulation Rule'] = function() {
    var s = bwdScenarios[Math.floor(Math.random() * bwdScenarios.length)];
    var qTypes = [
      {
        question: 'A <span class="key">' + s.spec + '</span> system: <span class="key">' + s.abs + '</span> is refined by <span class="key">' + s.conc + '</span>. Why might backwards simulation be needed?',
        correct: 'Because ' + s.why + ' &mdash; postponed nondeterminism.',
        distractors: ['Forwards always works.', 'The retrieve is empty.', 'The states are identical.']
      },
      {
        question: 'In a <span class="key">' + s.spec + '</span> refinement, the concrete system (' + s.conc + ') delays a nondeterministic choice. Which simulation applies?',
        correct: 'Backwards simulation &mdash; the abstract must anticipate the concrete\'s future.',
        distractors: ['Forwards simulation.', 'No simulation needed.', 'Identity refinement.']
      }
    ];
    var q = qTypes[Math.floor(Math.random() * qTypes.length)];
    return { scenario: '', question: q.question, correct: q.correct, distractors: q.distractors };
  };

  window.conceptBank['Postponed Nondeterminism'] = function() {
    return {
      scenario: '',
      question: 'Postponed nondeterminism means:',
      correct: 'The concrete system makes a nondeterministic choice later than the abstract system does.',
      distractors: ['Both systems are deterministic.', 'The abstract has no choices.', 'Nondeterminism is eliminated.']
    };
  };

  window.conceptBank['B-corr Applicability'] = function() {
    return {
      scenario: '',
      question: 'B-corr applicability is <code>&forall; C &bull; (&forall; A &bull; R &rArr; pre AO) &rArr; pre CO</code>. This means:',
      correct: 'If AO is guaranteed to work for ALL abstract equivalents of C, then CO must work.',
      distractors: ['If AO works for some A, CO works.', 'CO is always total.', 'pre AO = pre CO.']
    };
  };

  window.conceptBank['B-corr Correctness'] = function() {
    return {
      scenario: '',
      question: 'B-corr correctness requires: for any concrete after-state C&prime;, there exists:',
      correct: 'An abstract BEFORE-state A such that R holds and A is related to A&prime; by AO.',
      distractors: ['An abstract after-state only.', 'Nothing.', 'A concrete before-state.']
    };
  };

  window.conceptBank['Forwards-Only Failure'] = function() {
    return {
      scenario: '',
      question: 'Forwards simulation fails when:',
      correct: 'The concrete postpones a nondeterministic choice that the abstract makes early.',
      distractors: ['The retrieve is functional.', 'The states are finite.', 'The operations are total.']
    };
  };

  window.conceptBank['Atomicity Change'] = function() {
    return {
      scenario: '',
      question: 'Changing atomicity level (e.g., atomic file store &rarr; byte-by-byte transfer) typically requires:',
      correct: 'Both forwards and backwards simulation (for different operation correspondences).',
      distractors: ['Only forwards.', 'Only backwards.', 'No simulation.']
    };
  };

  // warmup aliases
  window.conceptBank['Backwards Simulation Need'] = function() {
    return { scenario: '', question: 'Backwards simulation is needed when:', correct: 'The resolution of nondeterminism is postponed in the concrete system.', distractors: ['The systems are deterministic.', 'Forwards always suffices.', 'The retrieve is empty.'] };
  };
  window.conceptBank['Backwards Simulation'] = window.conceptBank['Backwards Simulation Need'];

  window.conceptBank['B-init Rule'] = function() {
    return { scenario: '', question: 'B-init requires:', correct: '<code>&forall; A&prime;; C&prime; &bull; CI &and; R&prime; &rArr; AI</code> &mdash; any abstract equivalent of a concrete init must be a valid abstract init.', distractors: ['<code>CI = AI</code>.', '<code>&exist; A&prime; &bull; AI</code>.', 'Nothing.'] };
  };

})();
