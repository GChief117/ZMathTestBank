(function buildCh10Bank() {
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function shuffle(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  // ========== 10.1 generators ==========

  window.conceptBank['Free Type Motivation'] = function() {
    var items = [
      {thing:'binary tree', verbose:'sets + relations for nodes, edges, leaves', concise:'<code>Tree ::= leaf | branch &laquo;Tree &times; Tree&raquo;</code>'},
      {thing:'linked list', verbose:'sets + pairs for head, tail, nil', concise:'<code>List ::= nil | cons &laquo;X &times; List&raquo;</code>'},
      {thing:'natural numbers', verbose:'set &Nopf; with axioms for zero and successor', concise:'<code>nat ::= zero | succ &laquo;nat&raquo;</code>'}
    ];
    var it = pick(items);
    return {
      scenario: 'Modeling a <span class="key">' + it.thing + '</span> with sets and relations is verbose.',
      question: 'What does a free type offer instead?',
      correct: 'Concise, explicit structuring: ' + it.concise,
      distractors: [
        '<code>' + it.thing + ' : &Nopf;</code> (just a number, no structure)',
        '<code>' + it.thing + ' == &empty;</code> (empty set, no content)',
        it.verbose + ' (that is the verbose version, not the free type)'
      ]
    };
  };

  window.conceptBank['Natural Number Components'] = function() {
    var scenarios = [
      {sc:'A math library', base:'origin', succ:'increment'},
      {sc:'A version control system', base:'v0', succ:'next_version'},
      {sc:'A floor numbering system', base:'ground', succ:'up'}
    ];
    var s = pick(scenarios);
    return {
      scenario: '<span class="key">' + s.sc + '</span> needs a nat-like type.',
      question: 'Which two components define it?',
      correct: 'A base element (<code>' + s.base + '</code>) and a successor function (<code>' + s.succ + '</code>).',
      distractors: [
        'Two total functions only.',
        'A schema and a predicate.',
        'A set comprehension and a relation.'
      ]
    };
  };

  window.conceptBank['Successor Chain Properties'] = function() {
    var props = [
      {prop:'base not in range of succ', code:'{base} &cap; ran succ = &empty;', purpose:'prevents loops back to the start'},
      {prop:'succ is total', code:'succ : T &rarr; T', purpose:'eliminates dead-ends'},
      {prop:'succ is injective', code:'succ : T &#x21A3; T', purpose:'prevents two elements sharing a successor'},
      {prop:'T is the smallest set', code:'T = smallest set', purpose:'excludes phantom elements'}
    ];
    var p = pick(props);
    var things = ['floors','levels','stages','versions','tiers','stops'];
    var t = pick(things);
    return {
      scenario: 'A system defines <span class="key">' + t + '</span> with a successor chain.',
      question: 'Which property ' + p.purpose + '?',
      correct: '<code>' + p.code + '</code> &mdash; ' + p.prop + '.',
      distractors: shuffle([
        '<code>succ : T &#x21F8; T</code> (partial &mdash; allows gaps)',
        '<code>base &isin; ran succ</code> (allows loops)',
        '<code>T = &empty;</code> (empty set, no elements)'
      ]).slice(0, 3)
    };
  };

  window.conceptBank['Structural Flaw Detection'] = function() {
    var flaws = [
      {name:'loop', desc:'succ maps an element back to the base', missing:'{base} &cap; ran succ = &empty;'},
      {name:'dead-end', desc:'some elements have no successor (partial function)', missing:'succ : T &rarr; T (totality)'},
      {name:'collision', desc:'two distinct elements share the same successor', missing:'succ : T &#x21A3; T (injectivity)'},
      {name:'phantom elements', desc:'extra elements not reachable from the base', missing:'T = smallest set'}
    ];
    var f = pick(flaws);
    var things = ['ticket numbers','shelf positions','queue slots','gate numbers'];
    var t = pick(things);
    return {
      scenario: 'A definition of <span class="key">' + t + '</span> has a flaw: <span class="key">' + f.desc + '</span>.',
      question: 'Which constraint is missing?',
      correct: '<code>' + f.missing + '</code> &mdash; fixes the ' + f.name + ' flaw.',
      distractors: shuffle([
        '<code>succ = &empty;</code> (removes the function entirely)',
        '<code>T &sube; &Nopf;</code> (restricts to naturals, not a fix)',
        '<code>base = succ(base)</code> (introduces a loop, not a fix)'
      ]).slice(0, 3)
    };
  };

  window.conceptBank['Smallest Set Requirement'] = function() {
    var scenarios = [
      {thing:'bus stops', base:'stop_A', extra:'orphan stops not on the route'},
      {thing:'race bibs', base:'bib_1', extra:'phantom bibs not assigned to runners'},
      {thing:'parking levels', base:'ground', extra:'ghost levels not part of the garage'}
    ];
    var s = pick(scenarios);
    return {
      scenario: 'A type for <span class="key">' + s.thing + '</span> has <span class="key">' + s.extra + '</span>.',
      question: 'What eliminates the extra elements?',
      correct: 'The smallest-set requirement &mdash; T contains only elements reachable from <code>' + s.base + '</code>.',
      distractors: [
        '<code>succ : T &#x21F8; T</code> (partial &mdash; does not help)',
        'Making succ surjective (not required for nat)',
        '<code>T = &Nopf;</code> (replaces the type, does not fix it)'
      ]
    };
  };

  window.conceptBank['Partial vs Total Functions'] = function() {
    var pairs = [
      {partial:'&#x21F8;', total:'&rarr;', name:'succ'},
      {partial:'&#x21F8;', total:'&rarr;', name:'next'},
      {partial:'&#x21F8;', total:'&rarr;', name:'advance'}
    ];
    var p = pick(pairs);
    return {
      scenario: 'A definition uses <code>' + p.name + ' : T <span class="key">' + p.partial + '</span> T</code>.',
      question: 'What changes if we use <code>' + p.total + '</code> instead?',
      correct: '<code>' + p.total + '</code> makes <code>' + p.name + '</code> total &mdash; defined for every input (no dead-ends).',
      distractors: [
        'No difference &mdash; both are partial.',
        '<code>' + p.total + '</code> makes it injective only.',
        '<code>' + p.partial + '</code> is already total.'
      ]
    };
  };

  window.conceptBank['Injectivity Guarantee'] = function() {
    var vals = [
      {a:3, b:7, out:10},
      {a:2, b:5, out:8},
      {a:4, b:9, out:12}
    ];
    var v = pick(vals);
    return {
      scenario: 'A function <code>f</code> has <code>f(' + v.a + ') = ' + v.out + '</code> and <code>f(' + v.b + ') = <span class="key">' + v.out + '</span></code>.',
      question: 'Is <code>f</code> injective?',
      correct: 'No &mdash; <code>f(' + v.a + ') = f(' + v.b + ') = ' + v.out + '</code> but <code>' + v.a + ' &ne; ' + v.b + '</code>, violating <code>&#x21A3;</code>.',
      distractors: [
        'Yes &mdash; total implies injective.',
        'Only if the domain is finite.',
        'Cannot determine from two values.'
      ]
    };
  };

  window.conceptBank['Base Element Exclusion'] = function() {
    var bases = [{b:'zero', fn:'succ'}, {b:'ground', fn:'up'}, {b:'start', fn:'advance'}, {b:'origin', fn:'next'}];
    var p = pick(bases);
    return {
      scenario: 'A chain starts at <code><span class="key">' + p.b + '</span></code> with successor <code>' + p.fn + '</code>.',
      question: 'What does <code>{' + p.b + '} &cap; ran ' + p.fn + ' = &empty;</code> mean?',
      correct: '<code>' + p.b + '</code> is never the output of <code>' + p.fn + '</code> &mdash; nothing maps to the base.',
      distractors: [
        '<code>' + p.b + '</code> has no successor.',
        '<code>ran ' + p.fn + '</code> is empty (no outputs at all).',
        '<code>' + p.fn + '</code> is undefined at <code>' + p.b + '</code>.'
      ]
    };
  };

  window.conceptBank['Iterative Refinement'] = function() {
    return {
      scenario: 'Building <span class="key">nat</span> requires four successive fixes.',
      question: 'What is the correct order of fixes?',
      correct: 'Base excluded &rarr; total &rarr; injective &rarr; smallest set.',
      distractors: [
        'Smallest &rarr; injective &rarr; total &rarr; base excluded.',
        'Total &rarr; smallest &rarr; base excluded &rarr; injective.',
        'Injective &rarr; base excluded &rarr; smallest &rarr; total.'
      ]
    };
  };

  window.conceptBank['Free Type vs Set Model'] = function() {
    var structures = ['binary tree','linked list','natural numbers','expression AST'];
    var s = pick(structures);
    return {
      scenario: 'Modeling a <span class="key">' + s + '</span> using sets and relations requires multiple axioms.',
      question: 'What advantage does a free type offer?',
      correct: 'Concise, explicit structuring in a single <code>::=</code> definition.',
      distractors: [
        'Free types are always finite.',
        'Free types eliminate the need for functions.',
        'Free types cannot be recursive.'
      ]
    };
  };

  // ========== 10.2 generators ==========

  window.conceptBank['Free Type Syntax'] = function() {
    return {
      scenario: 'A specification introduces a new type with named alternatives.',
      question: 'Which symbol introduces a free type?',
      correct: '<code>::=</code> &mdash; freely generated by.',
      distractors: [
        '<code>==</code> (abbreviation, not free type).',
        '<code>:</code> (type declaration only).',
        '<code>&sube;</code> (subset, not a definition).'
      ]
    };
  };

  window.conceptBank['Enumeration vs Abbreviation'] = function() {
    var names = [
      {type:'Colour', vals:'red | green | blue'},
      {type:'Dir', vals:'north | south | east | west'},
      {type:'Suit', vals:'clubs | diamonds | hearts | spades'}
    ];
    var n = pick(names);
    return {
      scenario: 'A spec needs distinct named values for <span class="key">' + n.type + '</span>.',
      question: 'Why prefer <code>' + n.type + ' ::= ' + n.vals + '</code> over <code>' + n.type + ' == {&hellip;}</code>?',
      correct: '<code>::=</code> introduces names and guarantees distinctness; <code>==</code> does neither.',
      distractors: [
        'No difference &mdash; both create new types.',
        '<code>==</code> is more powerful than <code>::=</code>.',
        '<code>::=</code> requires numeric indices.'
      ]
    };
  };

  window.conceptBank['Enumerated Type Definition'] = function() {
    var types = [
      {domain:'hospital', type:'Ward', vals:'icu | emergency | maternity | general', count:4},
      {domain:'school', type:'Grade', vals:'freshman | sophomore | junior | senior', count:4},
      {domain:'restaurant', type:'Course', vals:'appetizer | main | dessert', count:3},
      {domain:'airport', type:'Terminal', vals:'A | B | C | D', count:4}
    ];
    var t = pick(types);
    return {
      scenario: 'A <span class="key">' + t.domain + '</span> needs exactly <span class="key">' + t.count + ' categories</span>.',
      question: 'Which is the correct free type definition?',
      correct: '<code>' + t.type + ' ::= ' + t.vals + '</code>',
      distractors: [
        '<code>' + t.type + ' == {' + t.vals.replace(/ \\| /g, ', ') + '}</code> (abbreviation, no distinctness)',
        '<code>' + t.type + ' : &Nopf;</code> (wrong type)',
        '<code>' + t.type + ' &sube; String</code> (no named constants)'
      ]
    };
  };

  window.conceptBank['Constructor Function Application'] = function() {
    var ctors = [
      {type:'Degree', ctor:'status', src:'0 .. 3', a:0, b:2},
      {type:'Badge', ctor:'level', src:'1 .. 5', a:1, b:3},
      {type:'Tier', ctor:'plan', src:'0 .. 2', a:0, b:1}
    ];
    var c = pick(ctors);
    return {
      scenario: '<code>' + c.type + ' ::= ' + c.ctor + ' &laquo;' + c.src + '&raquo;</code>. Is <code>' + c.ctor + ' ' + c.a + ' = ' + c.ctor + ' ' + c.b + '</code>?',
      question: 'What does injectivity tell us?',
      correct: 'No &mdash; <code>' + c.ctor + '</code> is injective (<code>&#x21A3;</code>): <code>' + c.a + ' &ne; ' + c.b + ' &rArr; ' + c.ctor + ' ' + c.a + ' &ne; ' + c.ctor + ' ' + c.b + '</code>.',
      distractors: [
        'Yes &mdash; both are ' + c.type + ' values.',
        'Only if the source set is finite.',
        'Cannot determine without more information.'
      ]
    };
  };

  window.conceptBank['Recursive Type Definition'] = function() {
    var types = [
      {type:'Thread', def:'original | reply &laquo;Thread&raquo;', base:'original', rec:'reply'},
      {type:'Commit', def:'initial | next &laquo;Commit&raquo;', base:'initial', rec:'next'},
      {type:'Level', def:'start | advance &laquo;Level&raquo;', base:'start', rec:'advance'}
    ];
    var t = pick(types);
    var n = Math.floor(Math.random() * 3) + 2;
    var expr = t.base;
    for (var i = 0; i < n; i++) expr = t.rec + '(' + expr + ')';
    return {
      scenario: '<code>' + t.type + ' ::= ' + t.def + '</code>. What is the ' + (n + 1) + 'th element?',
      question: 'Express it using constructors.',
      correct: '<code>' + expr + '</code>',
      distractors: [
        '<code>' + t.base + '(' + n + ')</code> (base takes no arguments)',
        '<code>' + t.rec + '(' + n + ')</code> (' + t.rec + ' takes a ' + t.type + ', not a number)',
        '<code>' + t.rec + ' | ' + t.base + '</code> (syntax error, not an element)'
      ]
    };
  };

  window.conceptBank['Disjointness Rule'] = function() {
    var types = [
      {type:'nat', c:'zero', d:'succ', rule:'disjoint({zero}, ran succ)'},
      {type:'Tree', c:'leaf', d:'branch', rule:'disjoint(ran leaf, ran branch)'},
      {type:'Entry', c:'file', d:'dir', rule:'disjoint(ran file, ran dir)'}
    ];
    var t = pick(types);
    return {
      scenario: 'For <span class="key">' + t.type + '</span>, the disjointness rule gives:',
      question: 'What does it say?',
      correct: '<code>' + t.rule + '</code> &mdash; constants/constructor ranges share no elements.',
      distractors: [
        '<code>' + t.c + ' = ' + t.d + '(&hellip;)</code> (violates disjointness).',
        '<code>ran ' + t.d + ' = &empty;</code> (range is not empty).',
        '<code>' + t.type + ' = &empty;</code> (type is not empty).'
      ]
    };
  };

  window.conceptBank['Closure Principle'] = function() {
    var types = [
      {type:'nat', c:'zero', d:'succ'},
      {type:'Tier', c:'basic', d:'upgrade'},
      {type:'Commit', c:'initial', d:'next'}
    ];
    var t = pick(types);
    return {
      scenario: 'For <code>' + t.type + ' ::= ' + t.c + ' | ' + t.d + ' &laquo;' + t.type + '&raquo;</code>:',
      question: 'What does the closure/induction rule state?',
      correct: '<code>&forall; S : &Popf; ' + t.type + ' &bull; ({' + t.c + '} &cup; ' + t.d + '(| S |) &sube; S) &rArr; S = ' + t.type + '</code>.',
      distractors: [
        '<code>' + t.type + '</code> is finite.',
        '<code>' + t.d + '</code> is surjective.',
        '<code>S = &empty;</code> always.'
      ]
    };
  };

  window.conceptBank['Constants vs Constructors'] = function() {
    var examples = [
      {def:'Tree ::= leaf &laquo;&Nopf;&raquo; | branch &laquo;Tree &times; Tree&raquo;', answer:'Both are constructor functions (both use &laquo;&raquo;).', wrong:'leaf is a constant; branch is a constructor.'},
      {def:'Signal ::= red | amber | green', answer:'All three are constants (no &laquo;&raquo; brackets).', wrong:'red is a constructor function.'},
      {def:'nat ::= zero | succ &laquo;nat&raquo;', answer:'zero is a constant; succ is a constructor function.', wrong:'Both are constants.'}
    ];
    var e = pick(examples);
    return {
      scenario: '<code>' + e.def + '</code>',
      question: 'Which are constants and which are constructor functions?',
      correct: e.answer,
      distractors: [e.wrong, 'All are predicates.', 'Cannot distinguish without running the definition.']
    };
  };

  window.conceptBank['Axiomatic Equivalent'] = function() {
    var types = [
      {def:'T ::= c | d &laquo;E&raquo;', ax:'<code>c : T</code>, <code>d : E &#x21A3; T</code>, <code>disjoint({c}, ran d)</code>, plus closure.'},
      {def:'nat ::= zero | succ &laquo;nat&raquo;', ax:'<code>zero : nat</code>, <code>succ : nat &#x21A3; nat</code>, <code>disjoint({zero}, ran succ)</code>, plus closure.'}
    ];
    var t = pick(types);
    return {
      scenario: '<code>' + t.def + '</code> can be written axiomatically.',
      question: 'What does the axiomatic version declare?',
      correct: t.ax,
      distractors: [
        '<code>c : T</code>, <code>d : T</code> only (missing injectivity and closure).',
        '<code>T == {c, d}</code> (abbreviation, not axiomatic).',
        '<code>c &isin; T</code> only (incomplete).'
      ]
    };
  };

  window.conceptBank['Order Independence'] = function() {
    var types = [
      {a:'red | green | blue', b:'blue | green | red', type:'Colour'},
      {a:'north | south | east | west', b:'west | east | south | north', type:'Dir'}
    ];
    var t = pick(types);
    return {
      scenario: '<code>' + t.type + ' ::= ' + t.a + '</code> vs <code>' + t.type + ' ::= ' + t.b + '</code>.',
      question: 'Are these the same type?',
      correct: 'Yes &mdash; the order of alternatives in a free type does not matter.',
      distractors: [
        'No &mdash; the first listed is the default value.',
        'No &mdash; order determines an ordering relation.',
        'Only for types with exactly three alternatives.'
      ]
    };
  };

  // ========== 10.3 generators ==========

  window.conceptBank['Induction Purpose'] = function() {
    return {
      scenario: 'A property <code>P</code> must be shown to hold for <span class="key">every element</span> of a free type.',
      question: 'The induction principle is derived from which rule?',
      correct: 'The closure/induction inference rule (second rule of free type definitions).',
      distractors: [
        'The disjointness rule.',
        'The axiom of choice.',
        'Set comprehension only.'
      ]
    };
  };

  window.conceptBank['Characteristic Set'] = function() {
    var predicates = [
      {P:'balance &ge; 0', type:'nat'},
      {P:'depth &ge; 1', type:'Tree'},
      {P:'valid credentials', type:'Cert'}
    ];
    var p = pick(predicates);
    return {
      scenario: 'P(t) = "' + p.P + '" on type <code>' + p.type + '</code>.',
      question: 'What is the characteristic set S?',
      correct: '<code>S == {t : ' + p.type + ' | P t}</code> &mdash; elements satisfying P.',
      distractors: [
        '<code>S = &empty;</code> always.',
        '<code>S = &Popf; ' + p.type + '</code> (power set, not characteristic set).',
        '<code>S = ' + p.type + '</code> always (that is the conclusion, not the definition).'
      ]
    };
  };

  window.conceptBank['Base Case Verification'] = function() {
    var types = [
      {type:'nat', base:'zero', ctor:'succ', prop:'non-negative'},
      {type:'Tier', base:'basic', ctor:'upgrade', prop:'meets quality standard'},
      {type:'Commit', base:'initial', ctor:'next', prop:'passes CI'},
      {type:'Level', base:'start', ctor:'advance', prop:'has difficulty &ge; 1'}
    ];
    var t = pick(types);
    return {
      scenario: 'Proving every <span class="key">' + t.type + '</span> element is <span class="key">' + t.prop + '</span>.',
      question: 'What is the base case?',
      correct: '<code>P(' + t.base + ')</code> &mdash; the constant ' + t.base + ' is ' + t.prop + '.',
      distractors: [
        '<code>P(' + t.ctor + '(' + t.base + '))</code> (that is the first inductive application, not the base).',
        '<code>&forall; t : ' + t.type + ' &bull; P t</code> (the conclusion, not a step).',
        'No base case needed.'
      ]
    };
  };

  window.conceptBank['Inductive Step'] = function() {
    var types = [
      {type:'nat', ctor:'succ', step:'&forall; m : nat &bull; P m &rArr; P(succ m)'},
      {type:'Tier', ctor:'upgrade', step:'&forall; t : Tier &bull; P t &rArr; P(upgrade t)'},
      {type:'Commit', ctor:'next', step:'&forall; c : Commit &bull; P c &rArr; P(next c)'}
    ];
    var t = pick(types);
    return {
      scenario: 'Proving property P for all elements of <span class="key">' + t.type + '</span>.',
      question: 'What is the inductive step?',
      correct: '<code>' + t.step + '</code> &mdash; P preserved by ' + t.ctor + '.',
      distractors: [
        '<code>P(' + t.ctor + '(base))</code> only (not universally quantified).',
        '<code>&forall; t : ' + t.type + ' &bull; P t</code> (that is the conclusion).',
        'No inductive step needed.'
      ]
    };
  };

  window.conceptBank['Complete Induction Proof'] = function() {
    var proofs = [
      {prop:'balance &ge; 0 after n deposits', base:'P(zero): balance = 0 &ge; 0', step:'deposit preserves non-negativity'},
      {prop:'depth = n after n pushes', base:'P(zero): depth = 0', step:'push increments depth by 1'},
      {prop:'all levels have difficulty &ge; 1', base:'P(start): difficulty = 1 &ge; 1', step:'advance preserves &ge; 1'}
    ];
    var p = pick(proofs);
    return {
      scenario: 'Proving <span class="key">' + p.prop + '</span>. Base: ' + p.base + '. Step: ' + p.step + '.',
      question: 'What is the conclusion?',
      correct: '<code>&forall; n : nat &bull; P n</code> &mdash; by induction, the property holds for all.',
      distractors: [
        '<code>P(zero)</code> only.',
        'Cannot conclude anything.',
        '<code>P(succ zero)</code> only.'
      ]
    };
  };

  window.conceptBank['Predicate Selection'] = function() {
    var preds = [
      {goal:'every account has non-negative balance', P:'P(n) = "balance after n transactions &ge; 0"'},
      {goal:'every file has a valid checksum', P:'P(e) = "entry e has a valid checksum"'},
      {goal:'every level is completable', P:'P(l) = "level l is completable"'}
    ];
    var p = pick(preds);
    return {
      scenario: 'Goal: prove <span class="key">' + p.goal + '</span>.',
      question: 'What is the first step?',
      correct: 'Choose predicate: ' + p.P + '.',
      distractors: [
        'List all elements of the type.',
        'Find a counterexample first.',
        'Define a new free type.'
      ]
    };
  };

  window.conceptBank['Closure Under Constructors'] = function() {
    var ctors = [{fn:'succ', type:'nat'}, {fn:'upgrade', type:'Tier'}, {fn:'next', type:'Commit'}];
    var c = pick(ctors);
    return {
      scenario: 'Set S &sube; ' + c.type + ' is <span class="key">closed under ' + c.fn + '</span>.',
      question: 'What does this mean?',
      correct: '<code>&forall; n &isin; S &bull; ' + c.fn + ' n &isin; S</code> &mdash; applying ' + c.fn + ' stays in S.',
      distractors: [
        '<code>' + c.fn + '</code> is undefined on S.',
        '<code>S = &empty;</code>.',
        '<code>S = ' + c.type + '</code> always (that is the conclusion, not closure).'
      ]
    };
  };

  window.conceptBank['General Induction Template'] = function() {
    var m = Math.floor(Math.random() * 3) + 1;
    var n = Math.floor(Math.random() * 2) + 1;
    return {
      scenario: 'A free type has <span class="key">' + m + ' constant(s)</span> and <span class="key">' + n + ' constructor(s)</span>.',
      question: 'How many base cases and inductive steps are needed?',
      correct: m + ' base case(s) and ' + n + ' inductive step(s).',
      distractors: [
        '1 base case and 1 step always.',
        (m + n) + ' base cases and 0 steps.',
        '0 base cases and ' + (m + n) + ' steps.'
      ]
    };
  };

  window.conceptBank['Nat Induction'] = function() {
    var props = [
      {P:'sum of first n numbers = n(n+1)/2', base:'sum of 0 = 0 = 0(1)/2'},
      {P:'n + 0 = n', base:'zero + 0 = zero'},
      {P:'depth after n pushes = n', base:'depth after 0 pushes = 0'}
    ];
    var p = pick(props);
    return {
      scenario: 'Prove <span class="key">' + p.P + '</span> for all <code>n : nat</code>.',
      question: 'What are the two parts of the nat induction proof?',
      correct: 'Base: <code>P(zero)</code> (' + p.base + '). Step: <code>&forall; m &bull; P m &rArr; P(succ m)</code>.',
      distractors: [
        '<code>P(succ zero)</code> only.',
        '<code>&forall; n &bull; P n &rArr; P(zero)</code> (backwards).',
        '<code>P(zero) &and; P(succ zero)</code> only (missing the universal step).'
      ]
    };
  };

  window.conceptBank['Tree Induction'] = function() {
    var props = [
      {P:'every tree has at least one leaf', leafCase:'a leaf trivially contains itself'},
      {P:'every tree has finite depth', leafCase:'a leaf has depth 1'},
      {P:'every tree can be serialized', leafCase:'a leaf serializes to its value'}
    ];
    var p = pick(props);
    return {
      scenario: 'Prove <span class="key">' + p.P + '</span> for <code>Tree ::= leaf &laquo;&Nopf;&raquo; | branch &laquo;Tree &times; Tree&raquo;</code>.',
      question: 'What does the induction require?',
      correct: 'Base: <code>&forall; n : &Nopf; &bull; P(leaf n)</code> (' + p.leafCase + '). Step: <code>P l &and; P r &rArr; P(branch(l,r))</code>.',
      distractors: [
        '<code>P(leaf 0)</code> only.',
        'Only the branch step, no base needed.',
        '<code>P(branch(leaf 0, leaf 0))</code> only.'
      ]
    };
  };

})();
