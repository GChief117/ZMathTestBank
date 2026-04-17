// Chapter 9 — Sequences: Concept Bank Generators
(function buildCh9Bank() {

  // ===================== §9.1 Sequence notation =====================

  window.conceptBank = window.conceptBank || {};

  window.conceptBank['Sequence Definition'] = function() {
    var pool = [
      { s: 'A warehouse tracks <span class="key">shipments in order</span>.', q: 'What kind of Z structure models this?', c: 'A sequence: ordered collection with angle brackets', d: ['A set: unordered collection','A relation between two sets','A predicate on shipments'] },
      { s: 'A to-do app records <span class="key">tasks in priority order</span>.', q: 'Which Z structure preserves the ordering?', c: 'A sequence: <code>&lang; t1, t2, t3 &rang;</code>', d: ['A set: <code>{t1, t2, t3}</code>','A function: <code>t1 &rarr; t2</code>','A number: <code>#tasks</code>'] },
      { s: 'A recipe lists <span class="key">steps in execution order</span>.', q: 'Best Z model?', c: 'A sequence &mdash; order and repetition both matter', d: ['A set &mdash; unordered, no duplicates','A partial function','A relation'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    var opts = [p.c].concat(p.d);
    opts.sort(function(){return Math.random()-0.5;});
    return { scenario: p.s, question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Empty Sequence'] = function() {
    var pool = [
      { q: 'The notation for an empty sequence is:', c: '<code>&lang;&rang;</code>', d: ['<code>&empty;</code>','<code>{}</code>','<code>nil</code>'] },
      { q: 'Which is the empty sequence?', c: '<code>&lang;&rang;</code>', d: ['<code>0</code>','<code>&lang; 0 &rang;</code>','<code>{}</code>'] },
      { q: '<code>#&lang;&rang;</code> equals:', c: '<code>0</code>', d: ['<code>1</code>','Undefined','<code>&empty;</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Writing Sequence Notation'] = function() {
    var items = [
      ['books','chapters','slides','recipes','tracks','frames','steps','moves','pixels','words'],
      ['songs','tasks','events','grades','scores','prices','temps','levels','keys','cards']
    ];
    var list = items[Math.floor(Math.random()*items.length)];
    var a = list[Math.floor(Math.random()*list.length)];
    var b = list[Math.floor(Math.random()*list.length)];
    while(b===a) b = list[Math.floor(Math.random()*list.length)];
    var c = list[Math.floor(Math.random()*list.length)];
    while(c===a||c===b) c = list[Math.floor(Math.random()*list.length)];
    return {
      scenario: 'An app stores <span class="key">'+a+', '+b+', '+c+'</span> in a <span class="key">fixed order</span>.',
      question: 'Which notation captures this ordered collection?',
      correct: '<code>&lang; '+a+', '+b+', '+c+' &rang;</code>',
      distractors: ['<code>{ '+a+', '+b+', '+c+' }</code>','<code>'+a+' &#8614; '+b+' &#8614; '+c+'</code>','<code>('+a+', '+b+', '+c+')</code>']
    };
  };

  window.conceptBank['Concatenation'] = function() {
    var n1 = Math.floor(Math.random()*8)+2;
    var n2 = Math.floor(Math.random()*8)+2;
    var total = n1+n2;
    var scenarios = [
      'A log has <span class="key">'+n1+' morning entries</span> and <span class="key">'+n2+' afternoon entries</span>.',
      'A playlist has <span class="key">'+n1+' rock songs</span> followed by <span class="key">'+n2+' jazz songs</span>.',
      'A build has <span class="key">'+n1+' compile steps</span> then <span class="key">'+n2+' test steps</span>.'
    ];
    var s = scenarios[Math.floor(Math.random()*scenarios.length)];
    return {
      scenario: s,
      question: 'What is <code>#(part1 &#x2040; part2)</code>?',
      correct: '<code>'+total+'</code>',
      distractors: ['<code>'+n1+'</code>','<code>'+n2+'</code>','<code>'+(n1*n2)+'</code>']
    };
  };

  window.conceptBank['Sequence Filter'] = function() {
    var pool = [
      { s: 'A log <code>&lang; info, error, warn, error, info &rang;</code> filtered by <code>{error}</code>.', c: '<code>&lang; error, error &rang;</code>', d: ['<code>&lang; error &rang;</code>','<code>&lang; info, warn, info &rang;</code>','<code>{error}</code>'] },
      { s: 'A sequence <code>&lang; a, b, c, a &rang;</code> filtered by <code>{a, c}</code>.', c: '<code>&lang; a, c, a &rang;</code>', d: ['<code>&lang; a, c &rang;</code>','<code>{a, c}</code>','<code>&lang; b &rang;</code>'] },
      { s: 'A list <code>&lang; 1, 2, 3, 4, 5 &rang;</code> filtered by <code>{2, 4}</code>.', c: '<code>&lang; 2, 4 &rang;</code>', d: ['<code>&lang; 1, 3, 5 &rang;</code>','<code>{2, 4}</code>','<code>&lang; 4, 2 &rang;</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: p.s, question: 'What is the result?', correct: p.c, distractors: p.d };
  };

  window.conceptBank['Head and Tail'] = function() {
    var items = ['alpha','beta','gamma','delta','epsilon'];
    var n = Math.floor(Math.random()*3)+3;
    var seq = items.slice(0,n);
    var ops = [
      { q: 'What is <code>head &lang; '+seq.join(', ')+' &rang;</code>?', c: '<code>'+seq[0]+'</code>', d: ['<code>'+seq[n-1]+'</code>','<code>&lang; '+seq.slice(1).join(', ')+' &rang;</code>','<code>&lang; '+seq[0]+' &rang;</code>'] },
      { q: 'What is <code>tail &lang; '+seq.join(', ')+' &rang;</code>?', c: '<code>&lang; '+seq.slice(1).join(', ')+' &rang;</code>', d: ['<code>'+seq[0]+'</code>','<code>&lang; '+seq.slice(0,n-1).join(', ')+' &rang;</code>','<code>'+seq[n-1]+'</code>'] }
    ];
    var op = ops[Math.floor(Math.random()*ops.length)];
    return { scenario: '', question: op.q, correct: op.c, distractors: op.d };
  };

  window.conceptBank['Length'] = function() {
    var n = Math.floor(Math.random()*7)+2;
    var letters = 'abcdefghij'.split('').slice(0,n);
    return {
      scenario: '',
      question: 'What is <code>#&lang; '+letters.join(', ')+' &rang;</code>?',
      correct: '<code>'+n+'</code>',
      distractors: ['<code>'+(n-1)+'</code>','<code>'+(n+1)+'</code>','<code>0</code>']
    };
  };

  window.conceptBank['Distributed Concatenation'] = function() {
    var pool = [
      { q: '<code>&#x2040;/ &lang; &lang; a &rang;, &lang; b, c &rang;, &lang; d &rang; &rang;</code> =', c: '<code>&lang; a, b, c, d &rang;</code>', d: ['<code>&lang; &lang; a &rang;, &lang; b, c &rang;, &lang; d &rang; &rang;</code>','<code>{a, b, c, d}</code>','<code>&lang;&rang;</code>'] },
      { q: '<code>&#x2040;/ &lang; &lang; x, y &rang;, &lang;&rang;, &lang; z &rang; &rang;</code> =', c: '<code>&lang; x, y, z &rang;</code>', d: ['<code>&lang; x, y, &lang;&rang;, z &rang;</code>','<code>&lang;&rang;</code>','<code>{x, y, z}</code>'] },
      { q: '<code>&#x2040;/ &lang; &lang;&rang;, &lang;&rang; &rang;</code> =', c: '<code>&lang;&rang;</code>', d: ['<code>&lang; &lang;&rang; &rang;</code>','Undefined','<code>&empty;</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Sequence vs Set'] = function() {
    return {
      scenario: '',
      question: 'Key difference between <code>&lang; a, b &rang;</code> and <code>{a, b}</code>?',
      correct: 'Sequence preserves order and allows duplicates; set does neither.',
      distractors: ['They are identical.','Set preserves order.','Only sequences can be empty.']
    };
  };

  window.conceptBank['Filter Order Preservation'] = function() {
    var pool = [
      { q: '<code>&lang; a, b, c, d &rang; &#x21BE; {b, d}</code> =', c: '<code>&lang; b, d &rang;</code>', d: ['<code>&lang; d, b &rang;</code>','<code>{b, d}</code>','<code>&lang; a, c &rang;</code>'] },
      { q: '<code>&lang; 5, 3, 5, 1 &rang; &#x21BE; {5}</code> =', c: '<code>&lang; 5, 5 &rang;</code>', d: ['<code>&lang; 5 &rang;</code>','<code>{5}</code>','<code>&lang; 3, 1 &rang;</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Tail of Singleton'] = function() {
    return {
      scenario: '',
      question: '<code>tail &lang; x &rang;</code> equals:',
      correct: '<code>&lang;&rang;</code>',
      distractors: ['<code>x</code>','<code>&lang; x &rang;</code>','Undefined']
    };
  };

  window.conceptBank['Distributed Concatenation of Empty'] = function() {
    return {
      scenario: '',
      question: '<code>&#x2040;/ &lang;&rang;</code> equals:',
      correct: '<code>&lang;&rang;</code>',
      distractors: ['Undefined','<code>&empty;</code>','<code>0</code>']
    };
  };

  window.conceptBank['Reconstruction Identity'] = function() {
    return {
      scenario: '',
      question: 'For non-empty s, which identity holds?',
      correct: '<code>s = &lang; head s &rang; &#x2040; tail s</code>',
      distractors: ['<code>s = tail s &#x2040; &lang; head s &rang;</code>','<code>s = head s &#x2040; tail s</code>','<code>s = &lang;&rang;</code>']
    };
  };

  window.conceptBank['Concatenation Associativity'] = function() {
    return {
      scenario: '',
      question: 'Is <code>&#x2040;</code> associative?',
      correct: 'Yes: <code>(a &#x2040; b) &#x2040; c = a &#x2040; (b &#x2040; c)</code>.',
      distractors: ['No.','Only for non-empty sequences.','Only for &Nopf; sequences.']
    };
  };

  // ===================== §9.2 A model for sequences =====================

  window.conceptBank['Sequence as Function'] = function() {
    return {
      scenario: '',
      question: 'In the formal model, a sequence is:',
      correct: 'A finite partial function from &Nopf; to X with domain 1..n.',
      distractors: ['A total function from X to &Nopf;.','A relation between two sets.','A predicate on X.']
    };
  };

  window.conceptBank['Domain of Sequence'] = function() {
    var n = Math.floor(Math.random()*6)+2;
    return {
      scenario: '',
      question: 'The domain of a sequence of length '+n+' is:',
      correct: '<code>1..'+n+'</code>',
      distractors: ['<code>0..'+n+'</code>','Any subset of &Nopf;.','<code>X</code>']
    };
  };

  window.conceptBank['Functional Application'] = function() {
    var items = ['alice','bob','carol','dave','eve','frank','grace'];
    var n = Math.floor(Math.random()*3)+3;
    var seq = items.slice(0,n);
    var idx = Math.floor(Math.random()*n)+1;
    return {
      scenario: 'Given <code>s = &lang; '+seq.join(', ')+' &rang;</code>.',
      question: 'What is <code>s '+idx+'</code>?',
      correct: '<code>'+seq[idx-1]+'</code>',
      distractors: ['<code>'+seq[0]+'</code>','<code>'+seq[n-1]+'</code>','<code>&lang; '+seq[idx-1]+' &rang;</code>']
    };
  };

  window.conceptBank['Concatenation Index Shift'] = function() {
    var ns = Math.floor(Math.random()*5)+2;
    var j = Math.floor(Math.random()*3)+1;
    var idx = ns + j;
    return {
      scenario: 'If <code>#s = '+ns+'</code>, then <code>(s &#x2040; t) '+idx+'</code> equals:',
      question: '',
      correct: '<code>t '+j+'</code>',
      distractors: ['<code>s '+idx+'</code>','<code>t '+idx+'</code>','Undefined']
    };
  };

  window.conceptBank['Squash'] = function() {
    var pool = [
      { q: '<code>squash {1 &#8614; a, 4 &#8614; b, 7 &#8614; c}</code> =', c: '<code>&lang; a, b, c &rang;</code>', d: ['<code>&lang; c, b, a &rang;</code>','<code>{1 &#8614; a, 4 &#8614; b, 7 &#8614; c}</code>','<code>&lang;&rang;</code>'] },
      { q: '<code>squash {2 &#8614; x, 5 &#8614; y}</code> =', c: '<code>&lang; x, y &rang;</code>', d: ['<code>&lang; y, x &rang;</code>','<code>{2 &#8614; x, 5 &#8614; y}</code>','<code>&lang;&rang;</code>'] },
      { q: '<code>squash {3 &#8614; p}</code> =', c: '<code>&lang; p &rang;</code>', d: ['<code>p</code>','<code>{3 &#8614; p}</code>','<code>&lang;&rang;</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Restriction Formula'] = function() {
    return {
      scenario: '',
      question: 'The filter <code>s &#x21BE; A</code> is formally defined as:',
      correct: '<code>squash(s &#x25B7; A)</code>',
      distractors: ['<code>s &cap; A</code>','<code>s &cup; A</code>','<code>head(s &#x25B7; A)</code>']
    };
  };

  window.conceptBank['Head Schema'] = function() {
    return {
      scenario: '',
      question: 'In the formal model, <code>head s</code> is defined as:',
      correct: '<code>s 1</code>',
      distractors: ['<code>s 0</code>','<code>s(#s)</code>','<code>&lang; s 1 &rang;</code>']
    };
  };

  window.conceptBank['Tail Schema'] = function() {
    var n = Math.floor(Math.random()*6)+3;
    return {
      scenario: '',
      question: '<code>#(tail s)</code> for a non-empty s of length '+n+' equals:',
      correct: '<code>'+(n-1)+'</code>',
      distractors: ['<code>'+n+'</code>','<code>1</code>','<code>0</code>']
    };
  };

  window.conceptBank['seq\\u2081 Definition'] = function() {
    return {
      scenario: '',
      question: '<code>seq<sub>1</sub> X</code> is:',
      correct: '<code>{ s : seq X | s &ne; &lang;&rang; }</code>',
      distractors: ['<code>{ s : seq X | #s = 1 }</code>','<code>seq X</code>','<code>iseq X</code>']
    };
  };

  window.conceptBank['iseq Definition'] = function() {
    return {
      scenario: '',
      question: '<code>iseq X</code> means:',
      correct: 'Injective sequences &mdash; no duplicates.',
      distractors: ['Non-empty sequences.','Sorted sequences.','Infinite sequences.']
    };
  };

  window.conceptBank['Injective Sequence Check'] = function() {
    var pool = [
      { q: 'Which is NOT in <code>iseq &Nopf;</code>?', c: '<code>&lang; 1, 2, 1 &rang;</code>', d: ['<code>&lang; 1, 2, 3 &rang;</code>','<code>&lang;&rang;</code>','<code>&lang; 5 &rang;</code>'] },
      { q: 'Which is NOT injective?', c: '<code>&lang; a, b, a &rang;</code>', d: ['<code>&lang; a, b, c &rang;</code>','<code>&lang;&rang;</code>','<code>&lang; x &rang;</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Homogeneity'] = function() {
    return {
      scenario: '',
      question: 'Can <code>&lang; 1, (1,2) &rang;</code> be a valid Z sequence?',
      correct: 'No &mdash; elements must share the same type.',
      distractors: ['Yes.','Only if both are &Nopf;.','Only in iseq.']
    };
  };

  window.conceptBank['Finiteness'] = function() {
    return {
      scenario: '',
      question: 'Are Z sequences always finite?',
      correct: 'Yes &mdash; domain is 1..n for some natural n.',
      distractors: ['No &mdash; infinite sequences exist.','Only if X is finite.','Only in iseq.']
    };
  };

  window.conceptBank['Length and Cardinality'] = function() {
    return {
      scenario: '',
      question: 'Why does <code>#</code> work for both sets and sequences?',
      correct: 'A sequence is a function; its length equals maplet count.',
      distractors: ['They are unrelated.','Only works for &Nopf;.','Coincidence.']
    };
  };

  window.conceptBank['iseq vs seq'] = function() {
    var pool = [
      { s: 'A race with <span class="key">no ties</span>.', c: '<code>iseq Runner</code>', d: ['<code>seq Runner</code>','<code>&Popf; Runner</code>','<code>seq<sub>1</sub> Runner</code>'] },
      { s: 'A lottery draws <span class="key">distinct numbers</span>.', c: '<code>iseq &Nopf;</code>', d: ['<code>seq &Nopf;</code>','<code>&Popf; &Nopf;</code>','<code>seq<sub>1</sub> &Nopf;</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: p.s, question: 'Which type fits?', correct: p.c, distractors: p.d };
  };

  window.conceptBank['seq\\u2081 vs seq'] = function() {
    return {
      scenario: 'An inbox preview requires <span class="key">at least one email</span>.',
      question: 'Which type ensures head is always defined?',
      correct: '<code>seq<sub>1</sub> Email</code>',
      distractors: ['<code>seq Email</code>','<code>iseq Email</code>','<code>&Popf; Email</code>']
    };
  };

  window.conceptBank['Squash Idempotence'] = function() {
    return {
      scenario: '',
      question: 'Is squash idempotent on a proper sequence?',
      correct: 'Yes &mdash; already contiguous; squash is a no-op.',
      distractors: ['No.','Only for empty.','Only for singletons.']
    };
  };

  window.conceptBank['Range Restriction'] = function() {
    return {
      scenario: '',
      question: '<code>{1 &#8614; a, 2 &#8614; b, 3 &#8614; a} &#x25B7; {a}</code> =',
      correct: '<code>{1 &#8614; a, 3 &#8614; a}</code>',
      distractors: ['<code>&lang; a, a &rang;</code>','<code>{1 &#8614; a}</code>','<code>&lang;&rang;</code>']
    };
  };

  window.conceptBank['Tail Index Formula'] = function() {
    return {
      scenario: '',
      question: '<code>(tail s) i</code> equals:',
      correct: '<code>s(i + 1)</code>',
      distractors: ['<code>s(i &minus; 1)</code>','<code>s i</code>','<code>s 1</code>']
    };
  };

  window.conceptBank['Fairness'] = function() {
    return {
      scenario: '',
      question: 'Why can\'t fairness be described with finite sequences?',
      correct: 'Fairness requires infinite sequences to ensure every element is eventually served.',
      distractors: ['Fairness is not a sequence property.','Finite sequences are unordered.','Only iseq supports fairness.']
    };
  };

  window.conceptBank['iseq Subset'] = function() {
    return {
      scenario: '',
      question: '<code>iseq X &sube; seq X</code>?',
      correct: 'Yes &mdash; every injective sequence is a sequence.',
      distractors: ['No &mdash; disjoint.','Only if X finite.','Only for &Nopf;.']
    };
  };

  // ===================== §9.3 Functions on sequences =====================

  window.conceptBank['Recursion Principle'] = function() {
    return {
      scenario: '',
      question: 'The recursion principle specifies a function by:',
      correct: 'Its value on <code>&lang;&rang;</code> and on <code>&lang;x&rang; &#x2040; s</code>.',
      distractors: ['Its value on every input.','Only on <code>&lang;&rang;</code>.','A sorting order.']
    };
  };

  window.conceptBank['Base Case Pattern'] = function() {
    var fns = [
      { f: 'reverse', c: '<code>&lang;&rang;</code>' },
      { f: 'add_one', c: '<code>&lang;&rang;</code>' },
      { f: 'negate', c: '<code>&lang;&rang;</code>' }
    ];
    var fn = fns[Math.floor(Math.random()*fns.length)];
    return {
      scenario: '',
      question: '<code>'+fn.f+' &lang;&rang;</code> equals:',
      correct: fn.c,
      distractors: ['Undefined','<code>&empty;</code>','<code>0</code>']
    };
  };

  window.conceptBank['Reverse Function'] = function() {
    var seqs = [
      { s: '&lang; a, b, c &rang;', r: '&lang; c, b, a &rang;' },
      { s: '&lang; 1, 2, 3, 4 &rang;', r: '&lang; 4, 3, 2, 1 &rang;' },
      { s: '&lang; x, y &rang;', r: '&lang; y, x &rang;' }
    ];
    var seq = seqs[Math.floor(Math.random()*seqs.length)];
    return {
      scenario: '',
      question: '<code>reverse '+seq.s+'</code> =',
      correct: '<code>'+seq.r+'</code>',
      distractors: ['<code>'+seq.s+'</code>','<code>&lang;&rang;</code>','Undefined']
    };
  };

  window.conceptBank['Recursive Definition'] = function() {
    var pool = [
      { q: '<code>add_one &lang; 5, 10, 15 &rang;</code> =', c: '<code>&lang; 6, 11, 16 &rang;</code>', d: ['<code>&lang; 5, 10, 15 &rang;</code>','<code>31</code>','<code>&lang;&rang;</code>'] },
      { q: '<code>add_one &lang; 0 &rang;</code> =', c: '<code>&lang; 1 &rang;</code>', d: ['<code>1</code>','<code>&lang; 0 &rang;</code>','<code>&lang;&rang;</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Distributivity'] = function() {
    return {
      scenario: '',
      question: 'A function f is distributive over &#x2040; if:',
      correct: '<code>f(s &#x2040; t) = (f s) &#x2040; (f t)</code>',
      distractors: ['<code>f(s &#x2040; t) = f s</code>','<code>f(s &#x2040; t) = (f t) &#x2040; (f s)</code>','<code>f(s &#x2040; t) = s &#x2040; t</code>']
    };
  };

  window.conceptBank['Filter Law'] = function() {
    var pool = [
      { q: 'filter.1 states:', c: '<code>&lang;&rang; &#x21BE; A = &lang;&rang;</code>', d: ['<code>s &#x21BE; &empty; = s</code>','<code>s &#x21BE; A = reverse s</code>','<code>&lang;&rang; &#x21BE; A = A</code>'] },
      { q: 'filter.2 when x &isin; A:', c: '<code>(&lang;x&rang; &#x2040; s) &#x21BE; A = &lang;x&rang; &#x2040; (s &#x21BE; A)</code>', d: ['<code>s &#x21BE; A</code>','<code>&lang;x&rang;</code>','<code>&lang;&rang;</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Concatenation Law'] = function() {
    var pool = [
      { q: 'cat.1 states:', c: '<code>&lang;&rang; &#x2040; s = s</code>', d: ['<code>s &#x2040; t = t &#x2040; s</code>','<code>s &#x2040; &lang;&rang; = &lang;&rang;</code>','<code>s &#x2040; s = 2s</code>'] },
      { q: 'cat.2 states:', c: '<code>s &#x2040; (t &#x2040; u) = (s &#x2040; t) &#x2040; u</code>', d: ['<code>s &#x2040; t = t &#x2040; s</code>','<code>#(s &#x2040; t) = #s &middot; #t</code>','<code>s &#x2040; t = &lang;&rang;</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Reverse Recursive Step'] = function() {
    return {
      scenario: '',
      question: '<code>reverse(&lang;x&rang; &#x2040; s)</code> =',
      correct: '<code>(reverse s) &#x2040; &lang;x&rang;</code>',
      distractors: ['<code>&lang;x&rang; &#x2040; (reverse s)</code>','<code>reverse s</code>','<code>&lang;x&rang;</code>']
    };
  };

  window.conceptBank['Filter Distributivity'] = function() {
    return {
      scenario: '',
      question: 'Is &#x21BE; distributive over &#x2040;?',
      correct: 'Yes: <code>(s &#x2040; t) &#x21BE; A = (s &#x21BE; A) &#x2040; (t &#x21BE; A)</code>.',
      distractors: ['No.','Only for singleton A.','Only for empty s.']
    };
  };

  window.conceptBank['Reverse and Filter'] = function() {
    return {
      scenario: '',
      question: '<code>reverse(s &#x21BE; A)</code> = ?',
      correct: '<code>(reverse s) &#x21BE; A</code>',
      distractors: ['<code>reverse(s) &#x2040; A</code>','<code>s &#x21BE; (reverse A)</code>','<code>A &#x21BE; (reverse s)</code>']
    };
  };

  window.conceptBank['Sequence Laws'] = function() {
    return {
      scenario: '',
      question: 'Which is NOT a property of &#x2040;?',
      correct: 'Commutativity.',
      distractors: ['Associativity.','Has identity &lang;&rang;.','<code>#(s &#x2040; t) = #s + #t</code>.']
    };
  };

  window.conceptBank['Head of Reversed'] = function() {
    return {
      scenario: '',
      question: '<code>head(reverse s)</code> for non-empty s equals:',
      correct: 'The last element of s.',
      distractors: ['The first element of s.','<code>&lang;&rang;</code>','Undefined']
    };
  };

  window.conceptBank['Filter Law Application'] = function() {
    return {
      scenario: '<code>(&lang; info &rang; &#x2040; rest) &#x21BE; {error}</code> where info &notin; {error}.',
      question: 'Result by filter.2?',
      correct: '<code>rest &#x21BE; {error}</code>',
      distractors: ['<code>&lang; info &rang; &#x2040; (rest &#x21BE; {error})</code>','<code>&lang;&rang;</code>','<code>&lang; info &rang;</code>']
    };
  };

  window.conceptBank['Reverse of Singleton'] = function() {
    return {
      scenario: '',
      question: '<code>reverse &lang; x &rang;</code> =',
      correct: '<code>&lang; x &rang;</code>',
      distractors: ['<code>&lang;&rang;</code>','<code>x</code>','Undefined']
    };
  };

  window.conceptBank['Equational Law'] = function() {
    return {
      scenario: '',
      question: 'An equational law is:',
      correct: 'An equation expressing a property of an operator (e.g., cat.1).',
      distractors: ['A sorting algorithm.','A type declaration.','A schema definition.']
    };
  };

  window.conceptBank['Recursive Functions'] = function() {
    return {
      scenario: '',
      question: 'Why does the recursion principle yield a unique function?',
      correct: 'Every finite sequence is &lang;&rang; or &lang;x&rang; &#x2040; s &mdash; two cases cover all inputs.',
      distractors: ['It doesn\'t.','Only for sorted sequences.','Only for iseq.']
    };
  };

  window.conceptBank['Reverse vs Distributive'] = function() {
    return {
      scenario: '',
      question: 'Is reverse distributive?',
      correct: 'No &mdash; it is an anti-homomorphism: parts swap order.',
      distractors: ['Yes.','Only for equal-length sequences.','Only for &Nopf;.']
    };
  };

  // ===================== §9.4 Structural induction =====================

  window.conceptBank['Induction Principle'] = function() {
    return {
      scenario: '',
      question: '&Nopf; induction requires proving:',
      correct: 'P 0 (base) and P i &rArr; P(i+1) (step).',
      distractors: ['Only P 0.','P n for all n directly.','Only the step.']
    };
  };

  window.conceptBank['Base Case'] = function() {
    var pool = [
      { q: 'Structural induction base case proves:', c: '<code>P &lang;&rang;</code>', d: ['<code>P 0</code>','<code>P &lang; x &rang;</code>','<code>&forall; s &bull; P s</code>'] },
      { q: '&Nopf; induction base case proves:', c: '<code>P 0</code>', d: ['<code>P &lang;&rang;</code>','<code>P 1</code>','<code>&forall; n &bull; P n</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['\u2115 Induction'] = function() {
    return {
      scenario: 'Proving <code>sum{i : 0..n} = (n&sup2; + n) div 2</code>.',
      question: 'The base case checks:',
      correct: '<code>sum{i : 0..0} = 0 = (0+0) div 2</code>',
      distractors: ['<code>sum{i : 0..1} = 1</code>','<code>sum{i : 0..n} = n</code>','No base case needed']
    };
  };

  window.conceptBank['Structural Induction Rule'] = function() {
    return {
      scenario: '',
      question: 'Structural induction for seq X requires:',
      correct: '<code>P &lang;&rang;</code> and <code>P t &rArr; P(&lang;x&rang; &#x2040; t)</code> implies <code>&forall; s &bull; P s</code>.',
      distractors: ['Only <code>P &lang;&rang;</code>.','<code>P 0</code> and <code>P(n+1)</code>.','Only <code>P(&lang;x&rang; &#x2040; t)</code>.']
    };
  };

  window.conceptBank['Structural Induction'] = function() {
    return {
      scenario: 'Proving <code>#(reverse s) = #s</code>.',
      question: 'Base case:',
      correct: '<code>#(reverse &lang;&rang;) = #&lang;&rang; = 0</code>',
      distractors: ['<code>#(reverse &lang;x&rang;) = 1</code>','<code>reverse &lang;&rang; = &lang;&rang;</code>','No base case needed']
    };
  };

  window.conceptBank['Inductive Hypothesis'] = function() {
    return {
      scenario: '',
      question: 'The inductive hypothesis in structural induction assumes:',
      correct: '<code>P t</code> holds for the tail, to prove <code>P(&lang;x&rang; &#x2040; t)</code>.',
      distractors: ['The conclusion itself.','That A is empty.','That s is a singleton.']
    };
  };

  window.conceptBank['Equational Reasoning'] = function() {
    return {
      scenario: '',
      question: 'An equational reasoning proof is:',
      correct: 'A chain of equalities, each justified by a named law.',
      distractors: ['A truth table.','A counterexample.','An algorithm.']
    };
  };

  window.conceptBank['Inductive Step'] = function() {
    return {
      scenario: 'Filter distributivity inductive step.',
      question: 'It splits into two cases based on:',
      correct: 'Whether <code>x &isin; A</code> or <code>x &notin; A</code>.',
      distractors: ['Whether s is empty.','Whether t is empty.','The length of s.']
    };
  };

  window.conceptBank['Structural vs \u2115 Induction'] = function() {
    return {
      scenario: '',
      question: 'Structural induction is based on:',
      correct: 'Sequence structure: empty vs &lang;x&rang; &#x2040; t.',
      distractors: ['Natural number 0 and successor.','The type X.','Random sampling.']
    };
  };

  window.conceptBank['Proof Structure'] = function() {
    return {
      scenario: '',
      question: 'A structural induction proof has how many branches?',
      correct: 'Two: base case and inductive step.',
      distractors: ['One.','Three.','Unlimited.']
    };
  };

  window.conceptBank['Inductive Hypothesis Application'] = function() {
    return {
      scenario: 'Proving <code>reverse(reverse s) = s</code>; assuming <code>P t</code>.',
      question: 'We need to show:',
      correct: '<code>reverse(reverse(&lang;x&rang; &#x2040; t)) = &lang;x&rang; &#x2040; t</code>',
      distractors: ['<code>reverse t = t</code>','<code>P &lang;&rang;</code>','<code>reverse &lang;&rang; = &lang;&rang;</code>']
    };
  };

  window.conceptBank['Law Citation'] = function() {
    var pool = [
      { q: '<code>&lang;&rang; &#x2040; s = s</code> is justified by:', c: 'cat.1', d: ['filter.1','reverse.1','cat.2'] },
      { q: '<code>&lang;&rang; &#x21BE; A = &lang;&rang;</code> is justified by:', c: 'filter.1', d: ['cat.1','reverse.1','filter.2'] },
      { q: '<code>reverse &lang;&rang; = &lang;&rang;</code> is justified by:', c: 'reverse.1', d: ['cat.1','filter.1','reverse.2'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Proof by Induction vs Direct'] = function() {
    return {
      scenario: '',
      question: 'When is structural induction needed?',
      correct: 'When the property must hold for arbitrary-length sequences.',
      distractors: ['When the sequence is empty.','When the sequence is a singleton.','Never.']
    };
  };

  window.conceptBank['Inductive Step Mechanics'] = function() {
    return {
      scenario: '',
      question: 'The inductive hypothesis lets us rewrite:',
      correct: '<code>(r &#x2040; t) &#x21BE; A</code> as <code>(r &#x21BE; A) &#x2040; (t &#x21BE; A)</code>',
      distractors: ['<code>&lang;&rang; &#x21BE; A</code> as <code>&lang;&rang;</code>','<code>reverse r</code> as <code>r</code>','<code>s &#x2040; t</code> as <code>t &#x2040; s</code>']
    };
  };

  window.conceptBank['Number Induction vs Structural'] = function() {
    return {
      scenario: '',
      question: 'For <code>&forall; n : &Nopf; &bull; sum = (n&sup2;+n) div 2</code>, use:',
      correct: '&Nopf; induction (mathematical induction on natural numbers).',
      distractors: ['Structural induction on sequences.','Strong induction.','No induction needed.']
    };
  };

  window.conceptBank['Equational Chain Construction'] = function() {
    var pool = [
      { q: '<code>reverse &lang;&rang;</code> = ? [reverse.1]', c: '<code>&lang;&rang;</code>', d: ['<code>&empty;</code>','<code>0</code>','Undefined'] },
      { q: '<code>&lang;&rang; &#x2040; s</code> = ? [cat.1]', c: '<code>s</code>', d: ['<code>&lang;&rang;</code>','<code>&lang; s &rang;</code>','Undefined'] },
      { q: '<code>&lang;&rang; &#x21BE; A</code> = ? [filter.1]', c: '<code>&lang;&rang;</code>', d: ['<code>A</code>','<code>&empty;</code>','Undefined'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Complete Induction Proof'] = function() {
    return {
      scenario: '',
      question: 'After proving both branches, we conclude:',
      correct: '<code>&forall; s : seq X &bull; P s</code>',
      distractors: ['Only <code>P &lang;&rang;</code>.','P for singletons only.','P for non-empty only.']
    };
  };

  window.conceptBank['Filter Distributivity Proof'] = function() {
    return {
      scenario: '',
      question: 'Filter distributivity needs structural induction because:',
      correct: 'Direct reasoning cannot handle arbitrary-length s.',
      distractors: ['Filter is not distributive.','Can be proven by truth table.','Only &Nopf; induction works.']
    };
  };

  window.conceptBank['Law Application'] = function() {
    return {
      scenario: '',
      question: 'reverse.2 states:',
      correct: '<code>reverse(&lang;x&rang; &#x2040; s) = (reverse s) &#x2040; &lang;x&rang;</code>',
      distractors: ['<code>reverse &lang;&rang; = &lang;&rang;</code>','<code>reverse s = s</code>','<code>&lang;&rang; &#x2040; s = s</code>']
    };
  };

  window.conceptBank['Induction vs Direct Proof'] = function() {
    return {
      scenario: '',
      question: 'Which can be proven without induction?',
      correct: '<code>reverse(&lang;&rang; &#x21BE; A) = (reverse &lang;&rang;) &#x21BE; A</code> (specific case).',
      distractors: ['<code>&forall; s &bull; reverse(s &#x21BE; A) = (reverse s) &#x21BE; A</code>.','<code>&forall; s,t &bull; (s &#x2040; t) &#x21BE; A = (s &#x21BE; A) &#x2040; (t &#x21BE; A)</code>.','None.']
    };
  };

})();
