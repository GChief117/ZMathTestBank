(function buildCh8Bank() {

  window.conceptBank = window.conceptBank || {};

  // ===================== 8.1 Partial functions =====================

  var funcScenarios = [
    { thing: 'password manager', src: 'User', tgt: 'Hash', gap: 'some users have no password set', full: false },
    { thing: 'cache', src: 'Key', tgt: 'Value', gap: 'some keys are not cached', full: false },
    { thing: 'flight gate display', src: 'Flight', tgt: 'Gate', gap: 'every flight is assigned a gate', full: true },
    { thing: 'payroll system', src: 'Employee', tgt: '&Nopf;', gap: 'every employee has a salary', full: true },
    { thing: 'GPS tracker', src: 'Vehicle', tgt: 'Coordinate', gap: 'offline vehicles have no position', full: false },
    { thing: 'hotel check-in', src: 'Guest', tgt: 'Room', gap: 'every guest gets a room', full: true },
    { thing: 'medical record', src: 'Patient', tgt: 'Record', gap: 'new patients lack records', full: false },
    { thing: 'tax system', src: 'Bracket', tgt: 'Percent', gap: 'every bracket has a rate', full: true },
    { thing: 'music app', src: 'Session', tgt: 'Track', gap: 'idle sessions have no track playing', full: false },
    { thing: 'thermostat', src: 'Room', tgt: '&Zopf;', gap: 'every room has a temperature', full: true },
    { thing: 'badge system', src: 'Person', tgt: 'Location', gap: 'off-site employees have no position', full: false },
    { thing: 'seat-belt sensor', src: 'Seat', tgt: 'Status', gap: 'every seat has a sensor', full: true }
  ];

  window.conceptBank['Partial vs Total Classification'] = function() {
    var s = funcScenarios[Math.floor(Math.random() * funcScenarios.length)];
    var arrow = s.full ? '&rarr;' : '&#x21F8;';
    var wrongArrow = s.full ? '&#x21F8;' : '&rarr;';
    return {
      scenario: 'A <span class="key">' + s.thing + '</span> maps each ' + s.src + ' to a ' + s.tgt + '; <span class="key">' + s.gap + '</span>.',
      question: 'Which type fits?',
      correct: '<code>' + s.src + ' ' + arrow + ' ' + s.tgt + '</code>',
      distractors: [
        '<code>' + s.src + ' ' + wrongArrow + ' ' + s.tgt + '</code>',
        '<code>' + s.src + ' &harr; ' + s.tgt + '</code>',
        '<code>' + s.src + ' == ' + s.tgt + '</code>'
      ]
    };
  };

  window.conceptBank['Subset Hierarchy'] = function() {
    var qs = [
      { q: 'The hierarchy from broadest to narrowest is:', c: 'Relation &sup; Partial function &sup; Total function.', d: ['Total &sup; Partial &sup; Relation.', 'Partial &sup; Relation &sup; Total.', 'They are independent.'] },
      { q: 'Every total function is also a:', c: 'Partial function.', d: ['Bijection.', 'Surjection.', 'Relation only.'] },
      { q: 'Every partial function is also a:', c: 'Relation.', d: ['Total function.', 'Injection.', 'Schema.'] }
    ];
    var p = qs[Math.floor(Math.random() * qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Single-Valued Property'] = function() {
    var qs = [
      { q: 'A function differs from a general relation by:', c: 'Being single-valued — each source maps to at most one target.', d: ['Being total.', 'Having a finite domain.', 'Being reflexive.'] },
      { q: 'Which violates the function property?', c: '<code>x &mapsto; y<sub>1</sub></code> and <code>x &mapsto; y<sub>2</sub></code> with <code>y<sub>1</sub> &ne; y<sub>2</sub></code>.', d: ['<code>x<sub>1</sub> &mapsto; y</code> and <code>x<sub>2</sub> &mapsto; y</code>.', 'An empty mapping.', 'A partial domain.'] }
    ];
    var p = qs[Math.floor(Math.random() * qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Function Application'] = function() {
    var items = [
      { fn: 'where_is', arg: 'rachel', val: 'meeting' },
      { fn: 'grade', arg: 'alice', val: 'B' },
      { fn: 'stock', arg: 'widget', val: '42' },
      { fn: 'salary', arg: 'bob', val: '55000' }
    ];
    var it = items[Math.floor(Math.random() * items.length)];
    return {
      scenario: 'Given <code><span class="key">' + it.arg + '</span> &isin; dom ' + it.fn + '</code>.',
      question: 'What does <code>' + it.fn + '(' + it.arg + ')</code> yield?',
      correct: 'The unique <code>' + it.val + '</code> such that <code>' + it.arg + ' &mapsto; ' + it.val + ' &isin; ' + it.fn + '</code>.',
      distractors: [
        'Any element of ran ' + it.fn + '.',
        'The domain of ' + it.fn + '.',
        'Undefined.'
      ]
    };
  };

  window.conceptBank['App-Intro Rule'] = function() {
    var qs = [
      { q: 'The app-intro rule concludes:', c: '<code>b = f(a)</code> from a unique pair with first element <code>a</code> and <code>a &mapsto; b &isin; f</code>.', d: ['<code>a &isin; dom f</code> only.', '<code>f = {a &mapsto; b}</code>.', 'Nothing about <code>f(a)</code>.'] },
      { q: 'App-intro requires that <code>b</code>:', c: 'Does not appear free in <code>a</code>.', d: ['Equals zero.', 'Is in dom f.', 'Is unique globally.'] }
    ];
    var p = qs[Math.floor(Math.random() * qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['App-Elim Rule'] = function() {
    var qs = [
      { q: 'The app-elim rule concludes:', c: '<code>a &mapsto; b &isin; f</code> from <code>b = f(a)</code> and a unique pair.', d: ['<code>f(a)</code> is undefined.', '<code>a = b</code>.', '<code>dom f = &empty;</code>.'] },
      { q: 'App-elim is the converse of:', c: 'App-intro.', d: ['Modus ponens.', 'Leibniz.', 'Transitivity.'] }
    ];
    var p = qs[Math.floor(Math.random() * qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  // ===================== 8.2 Lambda notation =====================

  var lambdaOps = [
    { name: 'double', body: 'm + m', arg: 5, result: 10 },
    { name: 'triple', body: 'n + n + n', arg: 4, result: 12 },
    { name: 'square', body: 'k &times; k', arg: 3, result: 9 },
    { name: 'inc', body: 'x + 1', arg: 7, result: 8 },
    { name: 'halve', body: 'n div 2', arg: 10, result: 5 },
    { name: 'negate', body: '0 &minus; x', arg: 3, result: -3 }
  ];

  window.conceptBank['Lambda Expression'] = function() {
    var op = lambdaOps[Math.floor(Math.random() * lambdaOps.length)];
    var binder = op.body.charAt(0);
    return {
      scenario: 'A system defines <code><span class="key">' + op.name + '</span> = (&#x3BB; ' + binder + ' : &Nopf; &bull; ' + op.body + ')</code>.',
      question: 'What is <code>' + op.name + '(' + op.arg + ')</code>?',
      correct: '<code>' + op.result + '</code>',
      distractors: [
        '<code>' + (op.result + 1) + '</code>',
        '<code>' + (op.result - 1) + '</code>',
        'Undefined.'
      ]
    };
  };

  window.conceptBank['Definite Description'] = function() {
    var qs = [
      { q: 'The &mu; operator yields:', c: 'The unique element satisfying a predicate.', d: ['Any element satisfying it.', 'The set of all such elements.', 'A Boolean.'] },
      { q: '<code>min</code> uses &mu; because:', c: 'There is exactly one least element (if set non-empty).', d: ['There are many minima.', 'It returns a set.', '&mu; means &ldquo;many.&rdquo;'] }
    ];
    var p = qs[Math.floor(Math.random() * qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Characteristic Tuple'] = function() {
    var qs = [
      { q: 'A lambda with two binders <code>(&#x3BB; a : A; b : B &bull; &hellip;)</code> takes input from:', c: '<code>A &times; B</code>.', d: ['<code>A &cup; B</code>.', '<code>A &rarr; B</code>.', '<code>A</code> only.'] },
      { q: 'The characteristic tuple of <code>(&#x3BB; x : X; y : Y; z : Z &bull; &hellip;)</code> is:', c: '<code>(x, y, z) &isin; X &times; Y &times; Z</code>.', d: ['<code>x &isin; X</code> only.', '<code>X &cup; Y &cup; Z</code>.', '<code>{x, y, z}</code>.'] }
    ];
    var p = qs[Math.floor(Math.random() * qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Left Associativity'] = function() {
    return {
      scenario: '',
      question: 'Function application <code>f g a</code> is parsed as:',
      correct: '<code>(f g) a</code> — left-associative.',
      distractors: ['<code>f (g a)</code> — right-associative.', '<code>f (g(a))</code>.', 'Ambiguous.']
    };
  };

  window.conceptBank['Right Associativity'] = function() {
    return {
      scenario: '',
      question: 'The function arrow <code>A &rarr; B &rarr; C</code> means:',
      correct: '<code>A &rarr; (B &rarr; C)</code> — right-associative.',
      distractors: ['<code>(A &rarr; B) &rarr; C</code>.', '<code>A &times; B &rarr; C</code>.', 'Ambiguous.']
    };
  };

  window.conceptBank['Set Comprehension Form'] = function() {
    return {
      scenario: '',
      question: 'The set comprehension equivalent of <code>(&#x3BB; x : X | p &bull; e)</code> is:',
      correct: '<code>{x : X | p &bull; x &mapsto; e}</code>.',
      distractors: ['<code>{x : X &bull; e}</code>.', '<code>{e | x : X}</code>.', '<code>X &rarr; e</code>.']
    };
  };

  // ===================== 8.3 Functions on relations =====================

  window.conceptBank['Relational Operator as Function'] = function() {
    var ops = [
      { q: 'To get the set of employees currently tracked, apply:', c: '<code>dom(where_is)</code>', d: ['<code>ran(where_is)</code>', '<code>where_is &#x25C1; Employee</code>', '<code>where_is<sup>&sim;</sup></code>'] },
      { q: 'To find all locations that are occupied, apply:', c: '<code>ran(where_is)</code>', d: ['<code>dom(where_is)</code>', '<code>where_is<sup>&sim;</sup></code>', '<code>where_is &#x25B7; Location</code>'] },
      { q: 'To keep only VIP guests from a reservation list, apply:', c: '<code>VIPs &#x25C1; reservations</code>', d: ['<code>reservations &#x25B7; VIPs</code>', '<code>dom(reservations)</code>', '<code>reservations<sup>&sim;</sup></code>'] },
      { q: 'To find two-hop flight connections, apply:', c: '<code>direct &#x2A1F; direct</code>', d: ['<code>direct<sup>&sim;</sup></code>', '<code>dom(direct)</code>', '<code>direct &#x25C1; direct</code>'] },
      { q: 'To reverse a phone directory (numbers &rarr; names), apply:', c: '<code>phonebook<sup>&sim;</sup></code>', d: ['<code>dom(phonebook)</code>', '<code>ran(phonebook)</code>', '<code>phonebook &#x25B7; Name</code>'] },
      { q: 'To find all people reachable through chains of friendship, apply:', c: '<code>friends<sup>+</sup></code>', d: ['<code>friends<sup>&sim;</sup></code>', '<code>dom(friends)</code>', '<code>friends &#x25C1; friends</code>'] },
      { q: 'To keep only flights landing in Europe, apply:', c: '<code>flights &#x25B7; Europe</code>', d: ['<code>Europe &#x25C1; flights</code>', '<code>ran(flights)</code>', '<code>flights<sup>&sim;</sup></code>'] }
    ];
    var p = ops[Math.floor(Math.random() * ops.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Infix Symbol Convention'] = function() {
    return {
      scenario: '',
      question: 'In Z, underscores in a function name indicate:',
      correct: 'The intended positions of arguments (infix notation).',
      distractors: ['Private scope.', 'Type parameters.', 'Unused variables.']
    };
  };

  window.conceptBank['Suffix Symbol Convention'] = function() {
    return {
      scenario: '',
      question: 'A single trailing underscore <code>_<sup>&sim;</sup></code> indicates:',
      correct: 'A suffix (postfix) operator.',
      distractors: ['A prefix operator.', 'An infix operator.', 'A type annotation.']
    };
  };

  window.conceptBank['Composition Definition'] = function() {
    return {
      scenario: '',
      question: '<code>x &mapsto; z &isin; R &#x2A1F; S</code> iff:',
      correct: '<code>&exist; y &bull; x &mapsto; y &isin; R &and; y &mapsto; z &isin; S</code>.',
      distractors: ['<code>x &mapsto; z &isin; R &and; x &mapsto; z &isin; S</code>.', '<code>x &isin; dom R &and; z &isin; ran S</code>.', '<code>R = S</code>.']
    };
  };

  window.conceptBank['Transitive Closure'] = function() {
    return {
      scenario: '',
      question: '<code>R<sup>+</sup></code> is the:',
      correct: 'Smallest transitive relation containing R.',
      distractors: ['Largest relation in R.', 'Inverse of R.', 'Domain of R.']
    };
  };

  window.conceptBank['Reflexive Transitive Closure'] = function() {
    return {
      scenario: '',
      question: '<code>R<sup>*</sup> = R<sup>+</sup> &cup; id X</code> adds:',
      correct: 'Reflexivity — every element relates to itself.',
      distractors: ['Symmetry.', 'Antisymmetry.', 'Totality.']
    };
  };

  // ===================== 8.4 Overriding =====================

  var overrideScenarios = [
    { ctx: 'staff location', f: 'where_is', g: 'update', src: 'Person', tgt: 'Location',
      fPairs: '{otto &mapsto; lobby, peter &mapsto; meeting, rachel &mapsto; meeting}',
      gPairs: '{rachel &mapsto; lobby, tim &mapsto; office}',
      overlapKey: 'rachel', overlapOld: 'meeting', overlapNew: 'lobby',
      keptKey: 'peter', keptVal: 'meeting' },
    { ctx: 'config file', f: 'defaults', g: 'user_prefs', src: 'Key', tgt: 'Value',
      fPairs: '{theme &mapsto; light, font &mapsto; 12, lang &mapsto; en}',
      gPairs: '{theme &mapsto; dark, font &mapsto; 14}',
      overlapKey: 'theme', overlapOld: 'light', overlapNew: 'dark',
      keptKey: 'lang', keptVal: 'en' },
    { ctx: 'inventory', f: 'stock', g: 'delivery', src: 'Item', tgt: '&Nopf;',
      fPairs: '{bolt &mapsto; 50, nut &mapsto; 30, washer &mapsto; 100}',
      gPairs: '{bolt &mapsto; 200, screw &mapsto; 75}',
      overlapKey: 'bolt', overlapOld: '50', overlapNew: '200',
      keptKey: 'nut', keptVal: '30' }
  ];

  window.conceptBank['Function Override'] = function() {
    var s = overrideScenarios[Math.floor(Math.random() * overrideScenarios.length)];
    return {
      scenario: 'A <span class="key">' + s.ctx + '</span> system has <code>' + s.f + ' = ' + s.fPairs + '</code> and <code>' + s.g + ' = ' + s.gPairs + '</code>.',
      question: 'In <code>' + s.f + ' &oplus; ' + s.g + '</code>, what is the value for <code>' + s.overlapKey + '</code>?',
      correct: '<code>' + s.overlapNew + '</code> — the update wins.',
      distractors: [
        '<code>' + s.overlapOld + '</code> — the original.',
        'Undefined — conflict.',
        '<code>' + s.keptVal + '</code>.'
      ]
    };
  };

  window.conceptBank['Disjoint Commutativity'] = function() {
    return {
      scenario: '',
      question: 'If <code>dom f &cap; dom g = &empty;</code>, then:',
      correct: '<code>f &oplus; g = g &oplus; f = f &cup; g</code>.',
      distractors: ['<code>f &oplus; g &ne; g &oplus; f</code>.', '<code>f &oplus; g = &empty;</code>.', '<code>f &oplus; g = f</code>.']
    };
  };

  window.conceptBank['Domain Formula'] = function() {
    return {
      scenario: '',
      question: '<code>dom(f &oplus; g)</code> equals:',
      correct: '<code>dom f &cup; dom g</code>.',
      distractors: ['<code>dom f &cap; dom g</code>.', '<code>dom g</code> only.', '<code>dom f</code> only.']
    };
  };

  window.conceptBank['Single Entry Update'] = function() {
    var items = [
      { fn: 'passwords', key: 'alice', val: 'newHash' },
      { fn: 'prices', key: 'widget', val: '599' },
      { fn: 'grades', key: 'bob', val: 'A' }
    ];
    var it = items[Math.floor(Math.random() * items.length)];
    return {
      scenario: 'You need to change <span class="key">' + it.key + '</span>&rsquo;s entry in <code>' + it.fn + '</code> to <code>' + it.val + '</code>.',
      question: 'Which expression does this?',
      correct: '<code>' + it.fn + ' &oplus; {' + it.key + ' &mapsto; ' + it.val + '}</code>.',
      distractors: [
        '<code>' + it.fn + ' &cup; {' + it.key + ' &mapsto; ' + it.val + '}</code>.',
        '<code>' + it.fn + ' &#x25C1; {' + it.key + '}</code>.',
        '<code>{' + it.key + ' &mapsto; ' + it.val + '} &oplus; ' + it.fn + '</code>.'
      ]
    };
  };

  window.conceptBank['Non-Commutativity'] = function() {
    return {
      scenario: '',
      question: 'In general, <code>f &oplus; g</code> vs <code>g &oplus; f</code>:',
      correct: 'They differ — the second operand wins on overlapping keys.',
      distractors: ['They are always equal.', 'Both are undefined.', 'Only one is a function.']
    };
  };

  window.conceptBank['Union Equivalence'] = function() {
    return {
      scenario: '',
      question: '<code>f &oplus; g = f &cup; g</code> holds when:',
      correct: '<code>dom f &cap; dom g = &empty;</code> (disjoint domains).',
      distractors: ['Always.', 'When <code>f = g</code>.', 'When both are total.']
    };
  };

  // ===================== 8.5 Properties of functions =====================

  var propScenarios = [
    { thing: 'email system', src: 'User', tgt: 'Address', desc: 'every user gets a unique address', arrow: '&#x21A3;', label: 'total injection' },
    { thing: 'hash function', src: 'String', tgt: '0..255', desc: 'every string hashes and every bucket is reachable', arrow: '&#x21A0;', label: 'total surjection' },
    { thing: 'encryption scheme', src: 'Plain', tgt: 'Cipher', desc: 'unique ciphertext per plaintext, every ciphertext has a source', arrow: '&#x2916;', label: 'total bijection' },
    { thing: 'parking lot', src: 'Car', tgt: 'Spot', desc: 'some cars get unique spots, not all cars parked', arrow: '&#x2914;', label: 'partial injection' },
    { thing: 'license plate system', src: 'Vehicle', tgt: 'Plate', desc: 'every vehicle gets a unique plate', arrow: '&#x21A3;', label: 'total injection' },
    { thing: 'dance pairing', src: 'Leader', tgt: 'Follower', desc: 'each leader paired with unique follower, all followers used', arrow: '&#x2916;', label: 'total bijection' },
    { thing: 'grade distribution', src: 'Student', tgt: 'Grade', desc: 'every student graded, every grade A-F appears', arrow: '&#x21A0;', label: 'total surjection' },
    { thing: 'seat reservation', src: 'Guest', tgt: 'Seat', desc: 'some guests get unique seats', arrow: '&#x2914;', label: 'partial injection' },
    { thing: 'roll-call numbering', src: 'Student', tgt: '1..N', desc: 'each student gets a unique number, all numbers used', arrow: '&#x2916;', label: 'total bijection' }
  ];

  var allArrows = ['&#x2914;', '&#x21A3;', '&#x2900;', '&#x21A0;', '&#x2916;'];

  window.conceptBank['Function Property Classification'] = function() {
    var s = propScenarios[Math.floor(Math.random() * propScenarios.length)];
    var wrongs = allArrows.filter(function(a) { return a !== s.arrow; });
    wrongs = wrongs.sort(function() { return Math.random() - 0.5; }).slice(0, 3);
    return {
      scenario: 'A <span class="key">' + s.thing + '</span> maps ' + s.src + ' to ' + s.tgt + ': <span class="key">' + s.desc + '</span>.',
      question: 'Which arrow type fits?',
      correct: '<code>' + s.src + ' ' + s.arrow + ' ' + s.tgt + '</code> (' + s.label + ').',
      distractors: wrongs.map(function(a) { return '<code>' + s.src + ' ' + a + ' ' + s.tgt + '</code>'; })
    };
  };

  window.conceptBank['Diverging Arrows'] = function() {
    return {
      scenario: '',
      question: 'A lack of diverging arrows in a graph means:',
      correct: 'The relation is functional — each source maps to at most one target.',
      distractors: ['The relation is injective.', 'The relation is surjective.', 'The relation is empty.']
    };
  };

  window.conceptBank['Converging Arrows'] = function() {
    return {
      scenario: '',
      question: 'Converging arrows (two sources mapping to the same target) mean:',
      correct: 'The function is NOT injective.',
      distractors: ['The function is not surjective.', 'The function is not a function.', 'The function is bijective.']
    };
  };

  window.conceptBank['Injection Formal Test'] = function() {
    return {
      scenario: '',
      question: 'A function f is injective iff:',
      correct: '<code>&forall; x<sub>1</sub>, x<sub>2</sub> : dom f &bull; f(x<sub>1</sub>) = f(x<sub>2</sub>) &rArr; x<sub>1</sub> = x<sub>2</sub></code>.',
      distractors: [
        '<code>ran f = Y</code>.',
        '<code>dom f = X</code>.',
        '<code>&forall; y : Y &bull; &exist; x &bull; f(x) = y</code>.'
      ]
    };
  };

  window.conceptBank['Surjection Formal Test'] = function() {
    return {
      scenario: '',
      question: 'A function f is surjective iff:',
      correct: '<code>ran f = Y</code> — every target element is hit.',
      distractors: [
        '<code>dom f = X</code>.',
        '<code>f(x<sub>1</sub>) = f(x<sub>2</sub>) &rArr; x<sub>1</sub> = x<sub>2</sub></code>.',
        '<code>#dom f = #ran f</code>.'
      ]
    };
  };

  window.conceptBank['Bijection Equivalence'] = function() {
    return {
      scenario: '',
      question: 'A bijection is equivalent to:',
      correct: 'An injection that is also a surjection.',
      distractors: ['A total function.', 'A partial injection.', 'A relation with finite domain.']
    };
  };

  // ===================== 8.6 Finite sets =====================

  var finiteSets = [
    { set: '{red, green, blue}', n: 3, bij: '{1 &mapsto; red, 2 &mapsto; green, 3 &mapsto; blue}' },
    { set: '{Mon, Tue, Wed, Thu, Fri}', n: 5, bij: '{1 &mapsto; Mon, 2 &mapsto; Tue, &hellip;, 5 &mapsto; Fri}' },
    { set: '{north, south, east, west}', n: 4, bij: '{1 &mapsto; north, 2 &mapsto; south, 3 &mapsto; east, 4 &mapsto; west}' },
    { set: '{a, b, c, d}', n: 4, bij: '{1 &mapsto; a, 2 &mapsto; b, 3 &mapsto; c, 4 &mapsto; d}' },
    { set: '{spring, summer, autumn, winter}', n: 4, bij: '{1 &mapsto; spring, &hellip;, 4 &mapsto; winter}' }
  ];

  window.conceptBank['Finite Set Identification'] = function() {
    var s = finiteSets[Math.floor(Math.random() * finiteSets.length)];
    return {
      scenario: 'Consider the set <code><span class="key">' + s.set + '</span></code>.',
      question: 'Is it finite, and what is <code>#</code>?',
      correct: 'Yes — <code>#' + s.set + ' = ' + s.n + '</code>, via bijection from <code>1..' + s.n + '</code>.',
      distractors: [
        'No — it is infinite.',
        '<code>#' + s.set + ' = ' + (s.n + 2) + '</code>.',
        'Only if elements are numbers.'
      ]
    };
  };

  window.conceptBank['Number Range'] = function() {
    var ranges = [
      { m: 1, n: 10, size: 10 },
      { m: 0, n: 5, size: 6 },
      { m: 3, n: 7, size: 5 },
      { m: 1, n: 100, size: 100 }
    ];
    var r = ranges[Math.floor(Math.random() * ranges.length)];
    return {
      scenario: '',
      question: 'How many elements in <code>' + r.m + '..' + r.n + '</code>?',
      correct: '<code>' + r.size + '</code>.',
      distractors: [
        '<code>' + (r.size - 1) + '</code>.',
        '<code>' + (r.size + 1) + '</code>.',
        'Infinite.'
      ]
    };
  };

  window.conceptBank['Cardinality'] = function() {
    return {
      scenario: '',
      question: '<code>#S</code> for a finite set S gives:',
      correct: 'The number of elements in S.',
      distractors: ['The maximum element.', 'The power set.', 'The type of S.']
    };
  };

  window.conceptBank['Cardinality Operator'] = window.conceptBank['Cardinality'];

  window.conceptBank['Finite vs Infinite'] = function() {
    var qs = [
      { q: 'Is &Nopf; finite?', c: 'No — no natural number n bounds all elements.', d: ['Yes — it starts at 0.', 'Yes — it is countable.', 'Only &Nopf;<sub>1</sub>.'] },
      { q: 'Is <code>{n : &Nopf; | n &le; 50}</code> finite?', c: 'Yes — it has 51 elements (0 through 50).', d: ['No — &Nopf; is infinite.', 'Only if we remove 0.', 'Undecidable.'] }
    ];
    var p = qs[Math.floor(Math.random() * qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Bijection to 1..n'] = function() {
    return {
      scenario: '',
      question: 'A set S is finite iff:',
      correct: 'There exists a total bijection from <code>1..n</code> to S for some <code>n : &Nopf;</code>.',
      distractors: ['S has at most 100 elements.', 'S &sube; &Nopf;.', 'S is non-empty.']
    };
  };

  window.conceptBank['Finite Function'] = function() {
    return {
      scenario: '',
      question: 'A finite function is:',
      correct: 'A function whose domain is a finite set.',
      distractors: ['A function with numeric range.', 'A function that is injective.', 'A function defined on &Nopf;.']
    };
  };

})();
