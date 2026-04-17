(function buildCh4Bank() {

  // === 4.1 Equality ===

  window.conceptBank = window.conceptBank || {};

  var eqEntities = [
    { name: 'Alice', pred: 'Promoted', role: 'TeamLead' },
    { name: 'Bob', pred: 'OnLeave', role: 'Manager' },
    { name: 'Carol', pred: 'HasBadge', role: 'Supervisor' },
    { name: 'Dave', pred: 'HasParking', role: 'Director' },
    { name: 'Eve', pred: 'Remote', role: 'VP' },
    { name: 'Frank', pred: 'FullTime', role: 'CTO' }
  ];

  window.conceptBank['Equality Properties'] = function() {
    var props = [
      { q: 'Equality is:', c: 'Reflexive, symmetric, and transitive.', d: ['Only reflexive.', 'Only symmetric.', 'None of these.'] },
      { q: 'An equivalence relation must be:', c: 'Reflexive, symmetric, and transitive.', d: ['Only reflexive.', 'Only transitive.', 'Commutative and associative.'] },
      { q: 'Which is NOT a property of equality?', c: 'Antisymmetric.', d: ['Reflexive.', 'Symmetric.', 'Transitive.'] }
    ];
    var p = props[Math.floor(Math.random() * props.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Substitution Law'] = function() {
    var laws = [
      { q: 'Which law allows substituting equals in predicates?', c: 'Leibniz\'s law [eq-sub].', d: ['De Morgan\'s law.', '<code>&not;</code>-elimination.', 'Excluded middle.'] },
      { q: 'If <code>s = t</code>, which rule lets you replace s with t in any predicate?', c: '[eq-sub] (Leibniz).', d: ['[eq-ref].', '[eq-symm].', 'Modus ponens.'] }
    ];
    var l = laws[Math.floor(Math.random() * laws.length)];
    return { scenario: '', question: l.q, correct: l.c, distractors: l.d };
  };

  window.conceptBank['Applying Leibniz'] = function() {
    var e = eqEntities[Math.floor(Math.random() * eqEntities.length)];
    return {
      scenario: 'Given <code>' + e.name + ' <span class="key">=</span> ' + e.role + '</code> and <code>' + e.pred + '(' + e.name + ')</code>.',
      question: 'What follows by Leibniz\'s law?',
      correct: '<code>' + e.pred + '(' + e.role + ')</code>',
      distractors: [
        '<code>&not;' + e.pred + '(' + e.role + ')</code>',
        '<code>' + e.name + ' &ne; ' + e.role + '</code>',
        'Nothing.'
      ]
    };
  };

  window.conceptBank['Applying Reflection'] = function() {
    var exprs = ['<code>42 = 42</code>', '<code>x = x</code>', '<code>f(a) = f(a)</code>', '<code>Alice = Alice</code>'];
    var ex = exprs[Math.floor(Math.random() * exprs.length)];
    return {
      scenario: 'Consider the statement ' + ex + '.',
      question: 'Which rule justifies it with no premises?',
      correct: '[eq-ref] (reflection).',
      distractors: ['[eq-sub] (Leibniz).', '[eq-symm] (symmetry).', 'Transitivity.']
    };
  };

  window.conceptBank['Applying Symmetry'] = function() {
    var e = eqEntities[Math.floor(Math.random() * eqEntities.length)];
    return {
      scenario: 'Given <code>' + e.name + ' <span class="key">=</span> ' + e.role + '</code>.',
      question: 'What follows by [eq-symm]?',
      correct: '<code>' + e.role + ' = ' + e.name + '</code>',
      distractors: [
        '<code>' + e.name + ' &ne; ' + e.role + '</code>',
        '<code>&forall; x &bull; x = ' + e.name + '</code>',
        'Nothing.'
      ]
    };
  };

  window.conceptBank['Applying Transitivity'] = function() {
    var chains = [
      { a: 'a', b: '5', c: '2+3' },
      { a: 'x', b: 'y', c: 'z' },
      { a: 'hash', b: 'H("pw")', c: 'abc' },
      { a: 'acc1', b: 'acc2', c: 'acc3' }
    ];
    var ch = chains[Math.floor(Math.random() * chains.length)];
    return {
      scenario: 'Given <code>' + ch.a + ' <span class="key">=</span> ' + ch.b + '</code> and <code>' + ch.b + ' <span class="key">=</span> ' + ch.c + '</code>.',
      question: 'What follows by transitivity?',
      correct: '<code>' + ch.a + ' = ' + ch.c + '</code>',
      distractors: [
        '<code>' + ch.a + ' &ne; ' + ch.c + '</code>',
        '<code>' + ch.b + ' &ne; ' + ch.b + '</code>',
        'Nothing.'
      ]
    };
  };

  window.conceptBank['Recognising Inequality'] = function() {
    var preds = ['Soluble', 'Active', 'Valid', 'Prime', 'Even'];
    var p = preds[Math.floor(Math.random() * preds.length)];
    return {
      scenario: 'Given <code>' + p + '(X)</code> and <code><span class="key">&not;</span>' + p + '(Y)</code>.',
      question: 'What follows?',
      correct: '<code>X &ne; Y</code>',
      distractors: ['<code>X = Y</code>', '<code>&forall; z &bull; z = X</code>', 'Nothing.']
    };
  };

  window.conceptBank['Reflection Axiom'] = function() {
    return {
      scenario: '',
      question: 'Which statement expresses the reflection axiom?',
      correct: '<code>&forall; x &bull; x = x</code>',
      distractors: ['<code>&exist; x &bull; x = x</code>', '<code>&forall; x, y &bull; x = y</code>', '<code>&not;&forall; x &bull; x = x</code>']
    };
  };

  window.conceptBank['Equality vs Equivalence'] = function() {
    return {
      scenario: '',
      question: 'Equality relates values; what relates predicates?',
      correct: '<code>&hArr;</code> (equivalence).',
      distractors: ['<code>=</code>', '<code>&ne;</code>', '<code>&rArr;</code>']
    };
  };

  window.conceptBank['Identity of Indiscernibles'] = function() {
    return {
      scenario: '',
      question: 'The Identity of Indiscernibles states:',
      correct: '<code>s = t</code> iff every property of s is a property of t.',
      distractors: ['<code>s = t</code> iff they have the same name.', '<code>s = t</code> iff they have the same type.', '<code>s &ne; t</code> always.']
    };
  };

  window.conceptBank['Atomic Propositions'] = function() {
    return {
      scenario: '',
      question: 'In Z, the atomic propositions are:',
      correct: 'Equalities and set-membership statements.',
      distractors: ['Only equalities.', 'Only implications.', 'Quantified statements.']
    };
  };

  window.conceptBank['Congruence'] = function() {
    var fns = ['f', 'g', 'h', 'Score', 'Hash'];
    var fn = fns[Math.floor(Math.random() * fns.length)];
    return {
      scenario: 'Given <code>x <span class="key">=</span> y</code>.',
      question: 'Does <code>' + fn + '(x) = ' + fn + '(y)</code> hold?',
      correct: 'Yes \u2014 congruence via [eq-sub].',
      distractors: ['No.', 'Only if ' + fn + ' is injective.', 'Only if x = 0.']
    };
  };

  // === 4.2 The One-Point Rule ===

  var opEntities = [
    { var: 'e', val: 'Alice', pred: 'Admin' },
    { var: 'p', val: 'root', pred: 'Active' },
    { var: 's', val: 'my_session', pred: 'Valid' },
    { var: 'f', val: 'homePage', pred: 'Loaded' },
    { var: 'c', val: 'Customer42', pred: 'HasOrder' },
    { var: 'k', val: 'master_key', pred: 'Authorized' }
  ];

  window.conceptBank['One-Point Basics'] = function() {
    var n = Math.floor(Math.random() * 20) + 1;
    var preds = ['P', 'Q', 'R', 'Even', 'Prime'];
    var pred = preds[Math.floor(Math.random() * preds.length)];
    return {
      scenario: '',
      question: 'Simplify <code>&exist; x &bull; x = ' + n + ' &and; ' + pred + '(x)</code>.',
      correct: '<code>' + pred + '(' + n + ')</code>',
      distractors: [
        '<code>&exist; x &bull; ' + pred + '(x)</code>',
        '<code>' + pred + '(x)</code>',
        '<code>x = ' + n + '</code>'
      ]
    };
  };

  window.conceptBank['Existential vs Universal Form'] = function() {
    var n = Math.floor(Math.random() * 10) + 1;
    var pred = ['Q', 'R', 'Safe', 'Ready'][Math.floor(Math.random() * 4)];
    var isUniv = Math.random() > 0.5;
    if (isUniv) {
      return {
        scenario: '',
        question: 'Simplify <code>&forall; x &bull; x = ' + n + ' &rArr; ' + pred + '(x)</code>.',
        correct: '<code>' + pred + '(' + n + ')</code>',
        distractors: ['<code>&forall; x &bull; ' + pred + '(x)</code>', '<code>' + pred + '(x)</code>', '<code>x = ' + n + '</code>']
      };
    }
    return {
      scenario: '',
      question: 'Simplify <code>&exist; x &bull; x = ' + n + ' &and; ' + pred + '(x)</code>.',
      correct: '<code>' + pred + '(' + n + ')</code>',
      distractors: ['<code>&exist; x &bull; ' + pred + '(x)</code>', '<code>' + pred + '(x)</code>', '<code>x = ' + n + '</code>']
    };
  };

  window.conceptBank['Applying One-Point'] = function() {
    var e = opEntities[Math.floor(Math.random() * opEntities.length)];
    var isUniv = Math.random() > 0.5;
    if (isUniv) {
      return {
        scenario: '',
        question: 'Simplify <code>&forall; ' + e.var + ' &bull; ' + e.var + ' = ' + e.val + ' &rArr; ' + e.pred + '(' + e.var + ')</code>.',
        correct: '<code>' + e.pred + '(' + e.val + ')</code>',
        distractors: [
          '<code>&forall; ' + e.var + ' &bull; ' + e.pred + '(' + e.var + ')</code>',
          '<code>' + e.var + ' = ' + e.val + '</code>',
          '<code>' + e.pred + '(' + e.var + ')</code>'
        ]
      };
    }
    return {
      scenario: '',
      question: 'Simplify <code>&exist; ' + e.var + ' &bull; ' + e.var + ' = ' + e.val + ' &and; ' + e.pred + '(' + e.var + ')</code>.',
      correct: '<code>' + e.pred + '(' + e.val + ')</code>',
      distractors: [
        '<code>&exist; ' + e.var + ' &bull; ' + e.pred + '(' + e.var + ')</code>',
        '<code>' + e.var + ' = ' + e.val + '</code>',
        '<code>' + e.pred + '(' + e.var + ')</code>'
      ]
    };
  };

  window.conceptBank['Free Variable Proviso'] = function() {
    return {
      scenario: '',
      question: 'Why must x not be free in t for the one-point rule?',
      correct: 'If x were free in t, the substitution would be circular.',
      distractors: ['It makes the formula shorter.', 't must be a constant.', 'x must be a number.']
    };
  };

  window.conceptBank['One-Point as Derived Rule'] = function() {
    return {
      scenario: '',
      question: 'The one-point rule is:',
      correct: 'A derived rule \u2014 proven from existing inference rules.',
      distractors: ['An axiom.', 'An abbreviation.', 'Unprovable.']
    };
  };

  window.conceptBank['One-Point Limitations'] = function() {
    var cases = [
      { q: 'Does one-point apply to <code>&exist; x &bull; P(x)</code> (no equality)?', c: 'No \u2014 no pinning equality.', d: ['Yes.', 'Only in \u2115.', 'Only for Bool.'] },
      { q: 'Does one-point apply to <code>&exist; n &bull; n = n + 1 &and; P(n)</code>?', c: 'No \u2014 n is free in n + 1.', d: ['Yes \u2014 pinned to n + 1.', 'Yes \u2014 simplifies to P(0).', 'Yes \u2014 simplifies to true.'] }
    ];
    var c = cases[Math.floor(Math.random() * cases.length)];
    return { scenario: '', question: c.q, correct: c.c, distractors: c.d };
  };

  window.conceptBank['One-Point with Membership'] = function() {
    var nums = [
      { n: -2, set: '\u2115', arith: '6 + (-2) = 4', member: false },
      { n: -3, set: '\u2115', arith: '7 + (-3) = 4', member: false },
      { n: 2, set: '\u2115', arith: '4 + 2 = 6', member: true }
    ];
    var item = nums[Math.floor(Math.random() * nums.length)];
    var result = item.member ? '<code>' + item.arith + '</code> (true).' : 'False \u2014 because <code>' + item.n + ' &notin; ' + item.set + '</code>.';
    return {
      scenario: '',
      question: 'After one-point on <code>&exist; n : ' + item.set + ' &bull; ' + item.arith.split('=')[0].trim().replace(item.n < 0 ? '(' + item.n + ')' : item.n, 'n') + '= ' + item.arith.split('=')[1].trim() + ' &and; n = ' + item.n + '</code>, the result is:',
      correct: result,
      distractors: [
        item.member ? 'False.' : '<code>' + item.arith + '</code> (true).',
        '<code>&exist; n &bull; n = ' + item.n + '</code>.',
        'Cannot simplify.'
      ]
    };
  };

  // === 4.3 Uniqueness and Quantity ===

  window.conceptBank['Unique Existence Meaning'] = function() {
    return {
      scenario: '',
      question: 'Unique existence <code>&exist;<sub>1</sub> x &bull; P(x)</code> means:',
      correct: 'Exactly one x satisfies P.',
      distractors: ['At least one x satisfies P.', 'At most one x satisfies P.', 'No x satisfies P.']
    };
  };

  window.conceptBank['At Most One Pattern'] = function() {
    return {
      scenario: '',
      question: 'Which pattern expresses "at most one"?',
      correct: '<code>&forall; x, y &bull; P(x) &and; P(y) &rArr; x = y</code>',
      distractors: ['<code>&exist; x &bull; P(x)</code>', '<code>&forall; x &bull; P(x)</code>', '<code>&not;&exist; x &bull; P(x)</code>']
    };
  };

  var uqEntities = [
    { thing: 'flight', unique: 'pilot', rel: 'Flies' },
    { thing: 'voter', unique: 'ballot', rel: 'Cast' },
    { thing: 'book', unique: 'ISBN', rel: 'HasISBN' },
    { thing: 'student', unique: 'ID', rel: 'HasID' },
    { thing: 'car', unique: 'plate', rel: 'HasPlate' }
  ];

  window.conceptBank['Formalising Uniqueness'] = function() {
    var e = uqEntities[Math.floor(Math.random() * uqEntities.length)];
    return {
      scenario: 'Express: "every <span class="key">' + e.thing + '</span> has <span class="key">exactly one ' + e.unique + '</span>."',
      question: 'Which formalisation is correct?',
      correct: '<code>&forall; ' + e.thing[0] + ' : ' + e.thing.charAt(0).toUpperCase() + e.thing.slice(1) + ' &bull; &exist;<sub>1</sub> ' + e.unique[0] + ' : ' + e.unique.charAt(0).toUpperCase() + e.unique.slice(1) + ' &bull; ' + e.rel + '(' + e.thing[0] + ', ' + e.unique[0] + ')</code>',
      distractors: [
        '<code>&exist; ' + e.unique[0] + ' &bull; &forall; ' + e.thing[0] + ' &bull; ' + e.rel + '(' + e.thing[0] + ', ' + e.unique[0] + ')</code>',
        '<code>&forall; ' + e.thing[0] + ', ' + e.unique[0] + ' &bull; ' + e.rel + '(' + e.thing[0] + ', ' + e.unique[0] + ')</code>',
        '<code>&not;&exist; ' + e.unique[0] + ' &bull; ' + e.rel + '(' + e.thing[0] + ', ' + e.unique[0] + ')</code>'
      ]
    };
  };

  window.conceptBank['Formalising Quantity'] = function() {
    var injEntities = [
      { thing: 'employee', attr: 'Email' },
      { thing: 'room', attr: 'Number' },
      { thing: 'account', attr: 'ID' },
      { thing: 'student', attr: 'SSN' }
    ];
    var e = injEntities[Math.floor(Math.random() * injEntities.length)];
    return {
      scenario: 'Express: "no two <span class="key">' + e.thing + 's</span> share an <span class="key">' + e.attr + '</span>."',
      question: 'Which formalisation is correct?',
      correct: '<code>&forall; ' + e.thing[0] + '<sub>1</sub>, ' + e.thing[0] + '<sub>2</sub> &bull; ' + e.attr + '(' + e.thing[0] + '<sub>1</sub>) = ' + e.attr + '(' + e.thing[0] + '<sub>2</sub>) &rArr; ' + e.thing[0] + '<sub>1</sub> = ' + e.thing[0] + '<sub>2</sub></code>',
      distractors: [
        '<code>&exist; ' + e.thing[0] + ' &bull; ' + e.attr + '(' + e.thing[0] + ')</code>',
        '<code>&forall; ' + e.thing[0] + ' &bull; &not;' + e.attr + '(' + e.thing[0] + ')</code>',
        '<code>&exist;<sub>1</sub> ' + e.thing[0] + ' &bull; ' + e.attr + '(' + e.thing[0] + ')</code>'
      ]
    };
  };

  window.conceptBank['Unique Quantifier Expansion'] = function() {
    return {
      scenario: '',
      question: 'Can <code>&exist;<sub>1</sub></code> have zero satisfiers?',
      correct: 'No \u2014 exactly one means at least one.',
      distractors: ['Yes.', 'Only in empty domains.', 'Only if P has no &forall;.']
    };
  };

  window.conceptBank['At Least Two Pattern'] = function() {
    var things = ['primes less than 10', 'even numbers below 20', 'vowels in English', 'continents with penguins'];
    var t = things[Math.floor(Math.random() * things.length)];
    return {
      scenario: 'Express: "there are <span class="key">at least two</span> ' + t + '."',
      question: 'Which pattern is correct?',
      correct: '<code>&exist; x, y &bull; x &ne; y &and; P(x) &and; P(y)</code>',
      distractors: ['<code>&exist; x &bull; P(x)</code>', '<code>&forall; x &bull; P(x)</code>', '<code>&exist;<sub>1</sub> x &bull; P(x)</code>']
    };
  };

  window.conceptBank['Only Pattern'] = function() {
    var pairs = [
      { who: 'Alice', does: 'has the master key' },
      { who: 'Bob', does: 'knows the password' },
      { who: 'root', does: 'can reboot the server' }
    ];
    var p = pairs[Math.floor(Math.random() * pairs.length)];
    return {
      scenario: 'Formalise: "only <span class="key">' + p.who + '</span> ' + p.does + '."',
      question: 'Which pattern is correct?',
      correct: p.who + ' ' + p.does + ' &and; &forall; x &bull; x ' + p.does + ' &rArr; x = ' + p.who,
      distractors: [
        '<code>&exist; x &bull; x ' + p.does + '</code>',
        '<code>&forall; x &bull; x ' + p.does + '</code>',
        '<code>' + p.who + ' = ' + p.does + '</code>'
      ]
    };
  };

  window.conceptBank['Exactly N Pattern'] = function() {
    return {
      scenario: '',
      question: 'To express "exactly one book on the desk," use:',
      correct: '<code>&exist; b : Book &bull; b &isin; Desk &and; (&forall; c : Book | c &isin; Desk &bull; c = b)</code>',
      distractors: ['<code>&exist; b &bull; b &isin; Desk</code>', '<code>&forall; b &bull; b &isin; Desk</code>', '<code>&not;&exist; b &bull; b &isin; Desk</code>']
    };
  };

  window.conceptBank['Unique Quantifier Strength'] = function() {
    return {
      scenario: '',
      question: 'Valid, satisfiable, and unsatisfiable predicates are analogues of:',
      correct: 'Tautologies, contingencies, and contradictions.',
      distractors: ['Conjunctions, disjunctions, and negations.', 'Axioms, theorems, and lemmas.', 'Types, sets, and functions.']
    };
  };

  // === 4.4 Definite Description ===

  window.conceptBank['Definite Description Meaning'] = function() {
    return {
      scenario: '',
      question: 'A definite description <code>&mu; x &bull; P(x)</code> denotes:',
      correct: 'The unique x satisfying P (if it exists).',
      distractors: ['Any x satisfying P.', 'No x.', 'Every x.']
    };
  };

  window.conceptBank['When \u03BC is Undefined'] = function() {
    var cases = [
      { desc: '"the king of the USA"', reason: 'no satisfier.' },
      { desc: '"the largest natural number"', reason: 'no satisfier.' },
      { desc: '<code>&mu; x &bull; True</code>', reason: 'many satisfiers.' },
      { desc: '<code>&mu; x : &Zopf; &bull; x&sup2; = 4</code>', reason: 'two satisfiers (2 and -2).' }
    ];
    var c = cases[Math.floor(Math.random() * cases.length)];
    return {
      scenario: 'Consider ' + c.desc + '.',
      question: 'Is this a valid definite description?',
      correct: 'No \u2014 ' + c.reason,
      distractors: ['Yes.', 'Only in \u2115.', 'Depends on the domain.']
    };
  };

  var ddEntities = [
    { desc: 'the CEO', type: 'Person', pred: 'IsCEO' },
    { desc: 'the principal', type: 'Staff', pred: 'IsPrincipal' },
    { desc: 'the head coach', type: 'Person', pred: 'HeadCoach' },
    { desc: 'the root user', type: 'User', pred: 'IsRoot' },
    { desc: 'the winner', type: 'Candidate', pred: 'Won' },
    { desc: 'the capital', type: 'City', pred: 'IsCapital' }
  ];

  window.conceptBank['Writing Definite Descriptions'] = function() {
    var e = ddEntities[Math.floor(Math.random() * ddEntities.length)];
    var v = e.type[0].toLowerCase();
    return {
      scenario: 'Define "' + e.desc + '" using &mu;-notation.',
      question: 'Which is correct?',
      correct: '<code>&mu; ' + v + ' : ' + e.type + ' &bull; ' + e.pred + '(' + v + ')</code>',
      distractors: [
        '<code>&exist; ' + v + ' &bull; ' + e.pred + '(' + v + ')</code>',
        '<code>&forall; ' + v + ' &bull; ' + e.pred + '(' + v + ')</code>',
        '<code>' + e.pred + '(' + v + ') = ' + e.desc.replace('the ', '') + '</code>'
      ]
    };
  };

  window.conceptBank['\u03BC-intro Rule'] = function() {
    return {
      scenario: '',
      question: 'The [&mu;-intro] axiom says: from <code>&exist;<sub>1</sub> x : a &bull; p</code>, conclude:',
      correct: '<code>(&mu; x : a &bull; p) &isin; a &and; p[(&mu; x : a &bull; p)/x]</code>',
      distractors: ['<code>&forall; x &bull; p</code>', '<code>&not;&exist; x &bull; p</code>', '<code>x = &mu;</code>']
    };
  };

  window.conceptBank['\u03BC vs \u2203\u2081'] = function() {
    return {
      scenario: '',
      question: 'How does &mu; differ from &exist;<sub>1</sub>?',
      correct: '&exist;<sub>1</sub> is a predicate (true/false); &mu; is a term (denotes an element).',
      distractors: ['They are the same.', '&mu; is stronger.', '&exist;<sub>1</sub> is a term.']
    };
  };

  window.conceptBank['Undefined Descriptions'] = function() {
    var items = [
      'the largest natural number',
      'the king of the USA',
      'the even prime greater than 3'
    ];
    var item = items[Math.floor(Math.random() * items.length)];
    return {
      scenario: 'Is "' + item + '" a valid definite description?',
      question: '',
      correct: 'No \u2014 zero satisfiers, so &mu; is undefined.',
      distractors: ['Yes.', 'Only in finite domains.', 'Only for \u2124.']
    };
  };

  window.conceptBank['\u03BC in Specifications'] = function() {
    return {
      scenario: '',
      question: 'Definite description is useful in specs because:',
      correct: 'It names a unique element by its properties, not by a given name.',
      distractors: ['It creates new types.', 'It removes quantifiers.', 'It introduces ambiguity.']
    };
  };

  window.conceptBank['\u03BC with Compound Predicates'] = function() {
    var items = [
      { desc: 'the head of the queue', form: '<code>&mu; e : Element &bull; Position(e) = 0 &and; InQueue(e)</code>' },
      { desc: 'the current logged-in user', form: '<code>&mu; u : User &bull; LoggedIn(u) &and; Current(u)</code>' },
      { desc: 'the active primary server', form: '<code>&mu; s : Server &bull; Primary(s) &and; Active(s)</code>' }
    ];
    var it = items[Math.floor(Math.random() * items.length)];
    return {
      scenario: 'Define "' + it.desc + '" using &mu;.',
      question: 'Which is correct?',
      correct: it.form,
      distractors: [
        '<code>&exist; x &bull; InQueue(x)</code>',
        '<code>&forall; x &bull; InQueue(x)</code>',
        '<code>head = x</code>'
      ]
    };
  };

})();
