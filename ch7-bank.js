/* ============================================================
   Chapter 7 — Relations: Concept Bank Generators
   One IIFE per section. Each generator returns {scenario, question, correct, distractors}.
   ============================================================ */

// ──── §7.1 Binary Relations ────
(function buildCh7S1Bank() {

  var scenarios = [
    {src:'Gym',     from:'Member',   to:'Class',    pair:'Alice &#8614; yoga'},
    {src:'Airport', from:'Airline',  to:'Gate',     pair:'UA &#8614; B12'},
    {src:'Farm',    from:'Farmer',   to:'Crop',     pair:'Jo &#8614; wheat'},
    {src:'Museum',  from:'Visitor',  to:'Exhibit',  pair:'Liam &#8614; dinos'},
    {src:'School',  from:'Teacher',  to:'Subject',  pair:'msA &#8614; math'},
    {src:'Bakery',  from:'Baker',    to:'Pastry',   pair:'Ren &#8614; croissant'},
    {src:'Band',    from:'Player',   to:'Song',     pair:'Kai &#8614; solo1'},
    {src:'Clinic',  from:'Doctor',   to:'Patient',  pair:'drB &#8614; pat3'}
  ];

  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  window.conceptBank = window.conceptBank || {};

  window.conceptBank['Binary Relation Definition'] = function() {
    var s = pick(scenarios);
    return {
      scenario: 'A <span class="key">' + s.src + '</span> tracks which ' + s.from + ' relates to which ' + s.to + '.',
      question: 'What is a binary relation from ' + s.from + ' to ' + s.to + '?',
      correct: 'A subset of <code>' + s.from + ' &times; ' + s.to + '</code>.',
      distractors: [
        'A function from <code>' + s.from + '</code> to <code>' + s.to + '</code>.',
        'The union <code>' + s.from + ' &cup; ' + s.to + '</code>.',
        'A single pair <code>' + s.pair + '</code>.'
      ]
    };
  };

  window.conceptBank['Maplet Symbol'] = function() {
    var s = pick(scenarios);
    return {
      scenario: 'In the relation <code>' + s.from + ' &harr; ' + s.to + '</code>, a typical element is <code>' + s.pair + '</code>.',
      question: 'The symbol <code>&#8614;</code> denotes:',
      correct: 'A maplet &mdash; an ordered pair <code>(x, y)</code>.',
      distractors: [
        'Implication.',
        'Equality.',
        'Subset.'
      ]
    };
  };

  window.conceptBank['Declaring a Relation Type'] = function() {
    var s = pick(scenarios);
    return {
      scenario: 'A <span class="key">' + s.src + '</span> needs a many-to-many link between <span class="key">' + s.from + '</span> and <span class="key">' + s.to + '</span>.',
      question: 'Which declaration fits?',
      correct: '<code>r : ' + s.from + ' &harr; ' + s.to + '</code>',
      distractors: [
        '<code>r : ' + s.from + ' &rarr; ' + s.to + '</code>',
        '<code>r == ' + s.to + '</code>',
        '<code>r : &Popf; ' + s.from + '</code>'
      ]
    };
  };

  window.conceptBank['Writing Maplet Sets'] = function() {
    var s = pick(scenarios);
    var pair2 = s.from.charAt(0).toLowerCase() + '2 &#8614; ' + s.to.charAt(0).toLowerCase() + '2';
    return {
      scenario: 'A <span class="key">' + s.src + '</span> records: <code>' + s.pair + '</code> and <code>' + pair2 + '</code>.',
      question: 'Which set correctly represents this relation?',
      correct: '<code>{ ' + s.pair + ', ' + pair2 + ' }</code>',
      distractors: [
        '<code>{ ' + s.from + ', ' + s.to + ' }</code>',
        '<code>' + s.pair + ' &rarr; ' + pair2 + '</code>',
        '<code>{ ' + s.pair + ' } == ' + s.to + '</code>'
      ]
    };
  };

  window.conceptBank['Cartesian Product'] = function() {
    var a = Math.floor(Math.random()*3)+2;
    var b = Math.floor(Math.random()*3)+2;
    var prod = a * b;
    var rels = Math.pow(2, prod);
    return {
      scenario: 'Given sets with ' + a + ' and ' + b + ' elements.',
      question: 'How many pairs in the Cartesian product?',
      correct: '' + prod,
      distractors: ['' + (prod+1), '' + (prod-1), '' + rels]
    };
  };

  window.conceptBank['Infix Relation'] = function() {
    var s = pick(scenarios);
    return {
      scenario: 'A system defines <code>_r_ : ' + s.from + ' &harr; ' + s.to + '</code>.',
      question: 'Which is valid infix usage?',
      correct: '<code>' + s.from.charAt(0).toLowerCase() + '1 r ' + s.to.charAt(0).toLowerCase() + '1</code>',
      distractors: [
        '<code>r(' + s.from.charAt(0).toLowerCase() + '1, ' + s.to.charAt(0).toLowerCase() + '1)</code>',
        '<code>' + s.from.charAt(0).toLowerCase() + '1 == r</code>',
        '<code>r &sube; ' + s.from.charAt(0).toLowerCase() + '1</code>'
      ]
    };
  };

  window.conceptBank['Power Set Definition'] = function() {
    var a = Math.floor(Math.random()*2)+2;
    var b = Math.floor(Math.random()*2)+2;
    var prod = a * b;
    var rels = Math.pow(2, prod);
    return {
      scenario: 'Given <code>|X| = ' + a + '</code> and <code>|Y| = ' + b + '</code>.',
      question: 'How many elements in <code>&Popf;(X &times; Y)</code>?',
      correct: '' + rels,
      distractors: ['' + prod, '' + (a+b), '' + (rels/2)]
    };
  };

  window.conceptBank['Graph Representation'] = function() {
    var n = Math.floor(Math.random()*4)+2;
    return {
      scenario: 'A relation R has ' + n + ' maplets.',
      question: 'How many arrows does its graph have?',
      correct: '' + n + ' &mdash; one per maplet.',
      distractors: ['' + (n-1), '' + (n*2), '1']
    };
  };

})();


// ──── §7.2 Domain and Range ────
(function buildCh7S2Bank() {

  var rels = [
    {name:'enrolled', src:['s1','s2','s3'], tgt:['CS','Math','Phys'], pairs:'s1 &#8614; CS, s1 &#8614; Math, s2 &#8614; CS, s3 &#8614; Phys'},
    {name:'borrowed', src:['Alice','Bob'],  tgt:['b1','b2','b3'],    pairs:'Alice &#8614; b1, Alice &#8614; b2, Bob &#8614; b3'},
    {name:'rated',    src:['u1','u2'],      tgt:['p1','p2','p3'],    pairs:'u1 &#8614; p1, u1 &#8614; p2, u2 &#8614; p3'}
  ];

  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  window.conceptBank = window.conceptBank || {};

  window.conceptBank['Computing Domain'] = function() {
    var r = pick(rels);
    return {
      scenario: '<code>' + r.name + ' = { ' + r.pairs + ' }</code>.',
      question: 'What is <code>dom ' + r.name + '</code>?',
      correct: '<code>{' + r.src.join(', ') + '}</code>',
      distractors: [
        '<code>{' + r.tgt.join(', ') + '}</code>',
        '<code>&empty;</code>',
        '<code>{' + r.src.concat(r.tgt).join(', ') + '}</code>'
      ]
    };
  };

  window.conceptBank['Computing Range'] = function() {
    var r = pick(rels);
    return {
      scenario: '<code>' + r.name + ' = { ' + r.pairs + ' }</code>.',
      question: 'What is <code>ran ' + r.name + '</code>?',
      correct: '<code>{' + r.tgt.join(', ') + '}</code>',
      distractors: [
        '<code>{' + r.src.join(', ') + '}</code>',
        '<code>&empty;</code>',
        '<code>{' + r.src.concat(r.tgt).join(', ') + '}</code>'
      ]
    };
  };

  window.conceptBank['Domain Restriction'] = function() {
    var items = [{ctx:'gym',src:'Member',set:'active',op:'&#9665;'},{ctx:'library',src:'Patron',set:'current',op:'&#9665;'},{ctx:'app',src:'User',set:'premium',op:'&#9665;'}];
    var i = pick(items);
    return {
      scenario: 'A <span class="key">' + i.ctx + '</span> filters records to <span class="key">' + i.set + '</span> ' + i.src + 's.',
      question: 'Which operator restricts by source?',
      correct: '<code>' + i.set + ' &#9665; R</code>',
      distractors: ['<code>R &#9655; ' + i.set + '</code>', '<code>' + i.set + ' &#10852; R</code>', '<code>R &#10853; ' + i.set + '</code>']
    };
  };

  window.conceptBank['Range Restriction'] = function() {
    var items = [{ctx:'hospital',tgt:'Patient',set:'adults'},{ctx:'store',tgt:'Product',set:'inStock'},{ctx:'airline',tgt:'Flight',set:'domestic'}];
    var i = pick(items);
    return {
      scenario: 'A <span class="key">' + i.ctx + '</span> filters to <span class="key">' + i.set + '</span> ' + i.tgt + 's.',
      question: 'Which operator restricts by target?',
      correct: '<code>R &#9655; ' + i.set + '</code>',
      distractors: ['<code>' + i.set + ' &#9665; R</code>', '<code>R &#10853; ' + i.set + '</code>', '<code>' + i.set + ' &#10852; R</code>']
    };
  };

  window.conceptBank['Domain Subtraction'] = function() {
    var items = [{ctx:'chat',src:'User',set:'banned'},{ctx:'forum',src:'Account',set:'suspended'},{ctx:'app',src:'Player',set:'cheaters'}];
    var i = pick(items);
    return {
      scenario: 'A <span class="key">' + i.ctx + '</span> removes records from <span class="key">' + i.set + '</span> ' + i.src + 's.',
      question: 'Which operator drops by source?',
      correct: '<code>' + i.set + ' &#10852; R</code>',
      distractors: ['<code>R &#10853; ' + i.set + '</code>', '<code>' + i.set + ' &#9665; R</code>', '<code>R &#9655; ' + i.set + '</code>']
    };
  };

  window.conceptBank['Range Subtraction'] = function() {
    var items = [{ctx:'store',tgt:'Product',set:'discontinued'},{ctx:'school',tgt:'Course',set:'cancelled'},{ctx:'airline',tgt:'Flight',set:'grounded'}];
    var i = pick(items);
    return {
      scenario: 'A <span class="key">' + i.ctx + '</span> removes records for <span class="key">' + i.set + '</span> ' + i.tgt + 's.',
      question: 'Which operator drops by target?',
      correct: '<code>R &#10853; ' + i.set + '</code>',
      distractors: ['<code>' + i.set + ' &#10852; R</code>', '<code>R &#9655; ' + i.set + '</code>', '<code>' + i.set + ' &#9665; R</code>']
    };
  };

  window.conceptBank['Relational Image'] = function() {
    var items = [{ctx:'library',rel:'borrowed',src:'Alice',result:'b1, b2'},{ctx:'school',rel:'enrolled',src:'s1',result:'CS, Math'},{ctx:'app',rel:'follows',src:'Alice',result:'Bob, Carol'}];
    var i = pick(items);
    return {
      scenario: 'Given relation <code>' + i.rel + '</code>, find targets reachable from <span class="key">' + i.src + '</span>.',
      question: 'Which expression gives the image?',
      correct: '<code>' + i.rel + '(| {' + i.src + '} |)</code>',
      distractors: [
        '<code>' + i.rel + '<sup>&sim;</sup>(| {' + i.src + '} |)</code>',
        '<code>dom ' + i.rel + '</code>',
        '<code>ran ' + i.rel + '</code>'
      ]
    };
  };

})();


// ──── §7.3 Relational Inverse ────
(function buildCh7S3Bank() {

  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  window.conceptBank = window.conceptBank || {};

  window.conceptBank['Computing Inverse'] = function() {
    var pairs = [
      {fwd:'A &#8614; 1, B &#8614; 2', rev:'1 &#8614; A, 2 &#8614; B'},
      {fwd:'x &#8614; p, y &#8614; q', rev:'p &#8614; x, q &#8614; y'},
      {fwd:'cat &#8614; fur, dog &#8614; fur', rev:'fur &#8614; cat, fur &#8614; dog'}
    ];
    var p = pick(pairs);
    return {
      scenario: '<code>R = { ' + p.fwd + ' }</code>.',
      question: 'What is <code>R<sup>&sim;</sup></code>?',
      correct: '<code>{ ' + p.rev + ' }</code>',
      distractors: ['<code>{ ' + p.fwd + ' }</code>', '<code>&empty;</code>', '<code>id X</code>']
    };
  };

  window.conceptBank['Homogeneous vs Heterogeneous'] = function() {
    var items = [
      {rel:'friend : Person &harr; Person', ans:'Homogeneous', wrong:'Heterogeneous'},
      {rel:'drives : Driver &harr; Car', ans:'Heterogeneous', wrong:'Homogeneous'},
      {rel:'&lt; : &Nopf; &harr; &Nopf;', ans:'Homogeneous', wrong:'Heterogeneous'},
      {rel:'teaches : Staff &harr; Class', ans:'Heterogeneous', wrong:'Homogeneous'}
    ];
    var i = pick(items);
    return {
      scenario: '<code>' + i.rel + '</code>.',
      question: 'Is this relation homogeneous or heterogeneous?',
      correct: i.ans + '.',
      distractors: [i.wrong + '.', 'Neither.', 'Both.']
    };
  };

  window.conceptBank['Identity Relation'] = function() {
    var sets = [{name:'{a, b, c}', id:'a &#8614; a, b &#8614; b, c &#8614; c', n:3},{name:'{1, 2}', id:'1 &#8614; 1, 2 &#8614; 2', n:2},{name:'{x, y, z, w}', id:'x &#8614; x, y &#8614; y, z &#8614; z, w &#8614; w', n:4}];
    var s = pick(sets);
    return {
      scenario: '<code>X = ' + s.name + '</code>.',
      question: 'What is <code>id X</code>?',
      correct: '<code>{ ' + s.id + ' }</code>',
      distractors: ['<code>X &times; X</code>', '<code>&empty;</code>', '<code>X</code>']
    };
  };

  window.conceptBank['Reflexive Test'] = function() {
    var items = [
      {rel:'&le; on &Nopf;', ans:true, reason:'n &le; n for all n'},
      {rel:'&lt; on &Nopf;', ans:false, reason:'n &lt; n is false'},
      {rel:'= on &Nopf;', ans:true, reason:'n = n for all n'},
      {rel:'&ne; on &Nopf;', ans:false, reason:'n &ne; n is false'}
    ];
    var i = pick(items);
    return {
      scenario: 'The relation <code>' + i.rel + '</code>.',
      question: 'Is it reflexive?',
      correct: (i.ans ? 'Yes' : 'No') + ' &mdash; ' + i.reason + '.',
      distractors: [
        (i.ans ? 'No' : 'Yes') + '.',
        'Only for n = 0.',
        'Only for finite sets.'
      ]
    };
  };

  window.conceptBank['Symmetric Test'] = function() {
    var items = [
      {rel:'handshake', ans:true, reason:'mutual action'},
      {rel:'&le; on &Nopf;', ans:false, reason:'1 &le; 2 but 2 &nleq; 1'},
      {rel:'= on &Nopf;', ans:true, reason:'a = b implies b = a'},
      {rel:'parent', ans:false, reason:'Alice parent of Bob but not vice versa'}
    ];
    var i = pick(items);
    return {
      scenario: 'The relation <code>' + i.rel + '</code>.',
      question: 'Is it symmetric?',
      correct: (i.ans ? 'Yes' : 'No') + ' &mdash; ' + i.reason + '.',
      distractors: [
        (i.ans ? 'No' : 'Yes') + '.',
        'Only for self-pairs.',
        'Cannot determine.'
      ]
    };
  };

  window.conceptBank['Antisymmetric Test'] = function() {
    var items = [
      {rel:'&sube; on sets', ans:true, reason:'s &sube; t and t &sube; s implies s = t'},
      {rel:'&le; on &Nopf;', ans:true, reason:'a &le; b and b &le; a implies a = b'},
      {rel:'friend', ans:false, reason:'alice and bob can be mutual friends but alice &ne; bob'}
    ];
    var i = pick(items);
    return {
      scenario: 'The relation <code>' + i.rel + '</code>.',
      question: 'Is it antisymmetric?',
      correct: (i.ans ? 'Yes' : 'No') + ' &mdash; ' + i.reason + '.',
      distractors: [
        (i.ans ? 'No' : 'Yes') + '.',
        'Only for singletons.',
        'Cannot determine.'
      ]
    };
  };

  window.conceptBank['Asymmetric Test'] = function() {
    var items = [
      {rel:'&lt; on &Nopf;', ans:true, reason:'a &lt; b implies b &nless; a'},
      {rel:'&sub; on sets', ans:true, reason:'s &sub; t implies t &nsub; s'},
      {rel:'&le; on &Nopf;', ans:false, reason:'&le; is reflexive so n &le; n and n &le; n both hold'}
    ];
    var i = pick(items);
    return {
      scenario: 'The relation <code>' + i.rel + '</code>.',
      question: 'Is it asymmetric?',
      correct: (i.ans ? 'Yes' : 'No') + ' &mdash; ' + i.reason + '.',
      distractors: [
        (i.ans ? 'No' : 'Yes') + '.',
        'Only for empty relations.',
        'Cannot determine.'
      ]
    };
  };

  window.conceptBank['Classifying a Relation'] = function() {
    var items = [
      {rel:'likes (Louise/Martin/Natalie)', props:'reflexive', notProps:'not symmetric, not antisymmetric, not asymmetric'},
      {rel:'roommate', props:'reflexive, symmetric', notProps:'not antisymmetric, not asymmetric'},
      {rel:'sibling', props:'symmetric', notProps:'not reflexive, not antisymmetric'}
    ];
    var i = pick(items);
    return {
      scenario: 'The relation <code>' + i.rel + '</code>.',
      question: 'Which properties does it have?',
      correct: i.props + '.',
      distractors: [
        'Asymmetric.',
        'All four properties.',
        'None of the four properties.'
      ]
    };
  };

})();


// ──── §7.4 Relational Composition ────
(function buildCh7S4Bank() {

  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  window.conceptBank = window.conceptBank || {};

  window.conceptBank['Computing Composition'] = function() {
    var items = [
      {r1:'wrote : Author &harr; Book', r2:'publishedBy : Book &harr; Publisher', result:'Author &harr; Publisher', bridge:'Book'},
      {r1:'enrolled : Student &harr; Course', r2:'offeredBy : Course &harr; Dept', result:'Student &harr; Dept', bridge:'Course'},
      {r1:'ships : Warehouse &harr; City', r2:'delivers : City &harr; Customer', result:'Warehouse &harr; Customer', bridge:'City'}
    ];
    var i = pick(items);
    return {
      scenario: '<code>' + i.r1 + '</code> and <code>' + i.r2 + '</code>.',
      question: 'What is the type of the composition?',
      correct: '<code>' + i.result + '</code> (bridge through ' + i.bridge + ').',
      distractors: [
        '<code>' + i.bridge + ' &harr; ' + i.bridge + '</code>',
        '<code>&empty;</code>',
        '<code>id ' + i.bridge + '</code>'
      ]
    };
  };

  window.conceptBank['Transitive Test'] = function() {
    var items = [
      {rel:'&gt; on &Nopf;', ans:true, reason:'a &gt; b and b &gt; c implies a &gt; c'},
      {rel:'parent', ans:false, reason:'parent of parent is grandparent, not parent'},
      {rel:'&sube; on sets', ans:true, reason:'s &sube; t and t &sube; u implies s &sube; u'},
      {rel:'neighbour', ans:false, reason:'1 next to 2 and 2 next to 3 but 1 not next to 3'}
    ];
    var i = pick(items);
    return {
      scenario: 'The relation <code>' + i.rel + '</code>.',
      question: 'Is it transitive?',
      correct: (i.ans ? 'Yes' : 'No') + ' &mdash; ' + i.reason + '.',
      distractors: [
        (i.ans ? 'No' : 'Yes') + '.',
        'Only for finite sets.',
        'Cannot determine.'
      ]
    };
  };

  window.conceptBank['Equivalence Relation Test'] = function() {
    var items = [
      {rel:'same_sign', ans:true},
      {rel:'same colour', ans:true},
      {rel:'same floor', ans:true},
      {rel:'likes', ans:false},
      {rel:'parent', ans:false}
    ];
    var i = pick(items);
    return {
      scenario: 'The relation <code>' + i.rel + '</code>.',
      question: 'Is it an equivalence relation?',
      correct: (i.ans ? 'Yes &mdash; reflexive, symmetric, transitive.' : 'No &mdash; fails at least one of the three conditions.'),
      distractors: [
        (i.ans ? 'No &mdash; not symmetric.' : 'Yes &mdash; all three hold.'),
        'Only if the set is finite.',
        'Cannot determine.'
      ]
    };
  };

  window.conceptBank['Equivalence Class Computation'] = function() {
    var items = [
      {rel:'same_sign', elem:'Marina (Jan 28)', cls:'All Aquarians (Jan 20 &ndash; Feb 18)', wrong1:'Only Marina', wrong2:'Everyone born in January'},
      {rel:'same colour', elem:'red widget', cls:'All red products', wrong1:'Only that widget', wrong2:'All products'},
      {rel:'same floor', elem:'floor-3 resident', cls:'All floor-3 residents', wrong1:'Only that resident', wrong2:'All residents'}
    ];
    var i = pick(items);
    return {
      scenario: 'Under <code>' + i.rel + '</code>, consider ' + i.elem + '.',
      question: 'What is their equivalence class?',
      correct: i.cls + '.',
      distractors: [i.wrong1 + '.', i.wrong2 + '.', 'The empty set.']
    };
  };

})();
