/* Chapter 3 — Predicate Logic — Concept Bank */
(function buildCh3Bank() {
  if (!window.conceptBank) window.conceptBank = {};

  /* ===== §3.1 ===== */

  var existScenarios = [
    {who:'nurse',set:'Nurse',pred:'OnDuty',clue:'on duty'},
    {who:'sensor',set:'Sensor',pred:'Active',clue:'active'},
    {who:'student',set:'Student',pred:'Absent',clue:'absent'},
    {who:'employee',set:'Employee',pred:'OnLeave',clue:'on leave'},
    {who:'parcel',set:'Parcel',pred:'Damaged',clue:'damaged'},
    {who:'ticket',set:'Ticket',pred:'Unresolved',clue:'unresolved'}
  ];
  window.conceptBank['Existential Formalisation'] = function() {
    var s = existScenarios[Math.floor(Math.random()*existScenarios.length)];
    return {
      scenario:'A manager says: "<span class="key">some</span> '+s.who+' is <span class="key">'+s.clue+'</span>."',
      question:'Which formalisation is correct?',
      correct:'<code>&exist; '+s.who[0]+' : '+s.set+' &bull; '+s.pred+'('+s.who[0]+')</code>',
      distractors:[
        '<code>&forall; '+s.who[0]+' : '+s.set+' &bull; '+s.pred+'('+s.who[0]+')</code>',
        '<code>&not; &exist; '+s.who[0]+' : '+s.set+' &bull; '+s.pred+'('+s.who[0]+')</code>',
        '<code>'+s.pred+'('+s.who[0]+')</code>'
      ]
    };
  };

  var univScenarios = [
    {who:'driver',set:'Driver',pred:'HasLicence',clue:'licence'},
    {who:'patient',set:'Patient',pred:'Registered',clue:'registered'},
    {who:'guest',set:'Guest',pred:'CheckedIn',clue:'checked in'},
    {who:'pilot',set:'Pilot',pred:'Certified',clue:'certified'},
    {who:'member',set:'Member',pred:'HasCard',clue:'card'}
  ];
  window.conceptBank['Universal Formalisation'] = function() {
    var s = univScenarios[Math.floor(Math.random()*univScenarios.length)];
    return {
      scenario:'A policy states: "<span class="key">every</span> '+s.who+' must have a <span class="key">'+s.clue+'</span>."',
      question:'Which formalisation is correct?',
      correct:'<code>&forall; '+s.who[0]+' : '+s.set+' &bull; '+s.pred+'('+s.who[0]+')</code>',
      distractors:[
        '<code>&exist; '+s.who[0]+' : '+s.set+' &bull; '+s.pred+'('+s.who[0]+')</code>',
        '<code>'+s.pred+'('+s.who[0]+')</code>',
        '<code>&forall; '+s.who[0]+' : '+s.set+' &bull; &not;'+s.pred+'('+s.who[0]+')</code>'
      ]
    };
  };

  window.conceptBank['Predicate vs Proposition'] = function() {
    var preds = ['x &gt; 3','y &le; 10','n = 0','z &ge; 7'];
    var p = preds[Math.floor(Math.random()*preds.length)];
    return {
      scenario:'Consider <code>'+p+'</code> with the variable unquantified.',
      question:'Is this a proposition?',
      correct:'No &mdash; it is a predicate; truth depends on the variable&rsquo;s value.',
      distractors:['Yes &mdash; it is always true.','Yes &mdash; it is always false.','No &mdash; it contains a number.']
    };
  };

  window.conceptBank['Quantifier Recognition'] = function() {
    var r = Math.random();
    if (r < 0.5) {
      return {scenario:'',question:'Which symbol means "there exists"?',correct:'<code>&exist;</code>',distractors:['<code>&forall;</code>','<code>&not;</code>','<code>&rArr;</code>']};
    } else {
      return {scenario:'',question:'Which symbol means "for all"?',correct:'<code>&forall;</code>',distractors:['<code>&exist;</code>','<code>&and;</code>','<code>&or;</code>']};
    }
  };

  var disjDomains = [
    {set:'Server',pred:'Down',items:['s₁','s₂','s₃']},
    {set:'Exit',pred:'Blocked',items:['e₁','e₂']},
    {set:'Lamp',pred:'Broken',items:['l₁','l₂','l₃']}
  ];
  window.conceptBank['Generalised Disjunction'] = function() {
    var d = disjDomains[Math.floor(Math.random()*disjDomains.length)];
    var orList = d.items.map(function(i){return d.pred+'('+i+')';}).join(' &or; ');
    var andList = d.items.map(function(i){return d.pred+'('+i+')';}).join(' &and; ');
    return {
      scenario:'Domain {'+d.items.join(', ')+'}.',
      question:'Which expansion matches <code>&exist; x : '+d.set+' &bull; '+d.pred+'(x)</code>?',
      correct:'<code>'+orList+'</code>',
      distractors:['<code>'+andList+'</code>','<code>&not;'+d.pred+'('+d.items[0]+')</code>','<code>'+d.pred+'('+d.items[0]+') &rArr; '+d.pred+'('+d.items[1]+')</code>']
    };
  };

  var conjDomains = [
    {set:'Engine',pred:'Running',items:['e₁','e₂']},
    {set:'Sensor',pred:'Active',items:['n₁','n₂','n₃']},
    {set:'Guard',pred:'OnPost',items:['g₁','g₂']}
  ];
  window.conceptBank['Generalised Conjunction'] = function() {
    var d = conjDomains[Math.floor(Math.random()*conjDomains.length)];
    var andList = d.items.map(function(i){return d.pred+'('+i+')';}).join(' &and; ');
    var orList = d.items.map(function(i){return d.pred+'('+i+')';}).join(' &or; ');
    return {
      scenario:'Domain {'+d.items.join(', ')+'}.',
      question:'Which expansion matches <code>&forall; x : '+d.set+' &bull; '+d.pred+'(x)</code>?',
      correct:'<code>'+andList+'</code>',
      distractors:['<code>'+orList+'</code>','<code>&not;'+d.pred+'('+d.items[0]+')</code>','<code>'+d.pred+'('+d.items[0]+') &rArr; '+d.pred+'('+d.items[1]+')</code>']
    };
  };

  window.conceptBank['Universal with Negation'] = function() {
    var scenarios = [
      {thing:'student',set:'Student',pred:'Cheats',eng:'no student cheats'},
      {thing:'driver',set:'Driver',pred:'Speeding',eng:'no driver is speeding'},
      {thing:'guest',set:'Guest',pred:'Smoking',eng:'no guest smokes indoors'}
    ];
    var s = scenarios[Math.floor(Math.random()*scenarios.length)];
    return {
      scenario:'"<span class="key">'+s.eng.charAt(0).toUpperCase()+s.eng.slice(1)+'</span>."',
      question:'Which formalisation is correct?',
      correct:'<code>&forall; '+s.thing[0]+' : '+s.set+' &bull; &not;'+s.pred+'('+s.thing[0]+')</code>',
      distractors:[
        '<code>&exist; '+s.thing[0]+' : '+s.set+' &bull; '+s.pred+'('+s.thing[0]+')</code>',
        '<code>&forall; '+s.thing[0]+' : '+s.set+' &bull; '+s.pred+'('+s.thing[0]+')</code>',
        '<code>&not;'+s.pred+'('+s.thing[0]+')</code>'
      ]
    };
  };

  window.conceptBank['Universal with Implication'] = function() {
    return window.conceptBank['Universal Formalisation']();
  };
  window.conceptBank['Predicate Calculus Purpose'] = function() {
    return window.conceptBank['Predicate vs Proposition']();
  };
  window.conceptBank['Existential Truth'] = function() {
    var n = Math.floor(Math.random()*10)+1;
    return {
      scenario:'',question:'Is <code>&exist; x : &Nopf; &bull; x &gt; '+n+'</code> true?',
      correct:'Yes &mdash; e.g., '+(n+1)+' is a natural number greater than '+n+'.',
      distractors:['No &mdash; no natural number exceeds '+n+'.','Undetermined.','Only if x = '+n+'.']
    };
  };
  window.conceptBank['Universal Truth'] = function() {
    var n = Math.floor(Math.random()*8)+2;
    return {
      scenario:'',question:'Is <code>&forall; x : &Nopf; &bull; x &gt; '+n+'</code> true?',
      correct:'False &mdash; e.g., '+(n-1)+' is a natural number but '+(n-1)+' &gt; '+n+' is false.',
      distractors:['True &mdash; all naturals exceed '+n+'.','Undetermined.','True only when x = '+(n+1)+'.']
    };
  };
  window.conceptBank['Variable Name Independence'] = function() {
    var p = ['x','y','z','n','m'][Math.floor(Math.random()*5)];
    var q = p === 'x' ? 'y' : 'x';
    return {
      scenario:'Compare <code>&forall; '+p+' : &Nopf; &bull; '+p+' &ge; 0</code> and <code>&forall; '+q+' : &Nopf; &bull; '+q+' &ge; 0</code>.',
      question:'Do they mean the same thing?',
      correct:'Yes &mdash; bound variable names are interchangeable.',
      distractors:['No &mdash; different variables.','Only if the domain changes.','No &mdash; '+q+' is always larger.']
    };
  };

  /* ===== §3.2 ===== */

  window.conceptBank['Z Syntax Components'] = function() {
    var parts = [{ask:'p',ans:'The constraint',wrong:['The range','The quantifier','The bound variable']},{ask:'a',ans:'The range &mdash; the set x ranges over',wrong:['The constraint','The quantifier','The predicate body']},{ask:'q',ans:'The predicate body',wrong:['The range','The constraint','The quantifier']}];
    var c = parts[Math.floor(Math.random()*parts.length)];
    return {scenario:'',question:'In <code>&forall; x : a | p &bull; q</code>, what is <code>'+c.ask+'</code>?',correct:c.ans,distractors:c.wrong};
  };

  window.conceptBank['Constraint Equivalence'] = function() {
    if (Math.random()<0.5) {
      return {scenario:'',question:'Which is equivalent to <code>&forall; x : a | p &bull; q</code>?',correct:'<code>&forall; x : a &bull; p &rArr; q</code>',distractors:['<code>&forall; x : a &bull; p &and; q</code>','<code>&exist; x : a &bull; p &rArr; q</code>','<code>&forall; x : a &bull; &not;p &and; q</code>']};
    } else {
      return {scenario:'',question:'Which is equivalent to <code>&exist; x : a | p &bull; q</code>?',correct:'<code>&exist; x : a &bull; p &and; q</code>',distractors:['<code>&exist; x : a &bull; p &rArr; q</code>','<code>&forall; x : a &bull; p &and; q</code>','<code>&exist; x : a &bull; &not;p &or; q</code>']};
    }
  };

  window.conceptBank['Scope Identification'] = function() {
    return {scenario:'In <code>(&forall; x : a | p &bull; q &and; r) &or; s</code>',question:'What is the scope of x?',correct:'Only p, q, and r &mdash; up to the closing bracket.',distractors:['The entire expression including s.','Only q.','Only a.']};
  };

  window.conceptBank['Free vs Bound'] = function() {
    var exps = [{expr:'&forall; x : &Nopf; &bull; z &le; x',free:'z'},{expr:'&exist; b : Bed &bull; Free(b) &and; ward = ICU',free:'ward'},{expr:'&forall; y : a &bull; y + c',free:'c'}];
    var e = exps[Math.floor(Math.random()*exps.length)];
    return {scenario:'In <code>'+e.expr+'</code>',question:'Which variable is free?',correct:'<code>'+e.free+'</code>',distractors:['The quantified variable.','Both.','Neither.']};
  };

  window.conceptBank['Renaming Bound Variables'] = function() {
    return {scenario:'<code>&forall; num : &Nopf; &bull; num &ge; 0</code>',question:'Can we rename num to nat without changing meaning?',correct:'Yes &mdash; provided nat is fresh.',distractors:['No &mdash; variable names always matter.','Only if the range changes.','Only for existential.']};
  };

  window.conceptBank['Dangerous Renaming'] = function() {
    return {scenario:'<code>&exist; max : &Nopf; &bull; &forall; num : &Nopf; &bull; num &le; max</code>',question:'What happens if we rename num to max?',correct:'Meaning changes &mdash; max &le; max is always true.',distractors:['Nothing changes.','Syntax error.','Both quantifiers removed.']};
  };

  window.conceptBank['Semicolon Merge'] = function() {
    return {scenario:'',question:'<code>&exist; x : &Nopf; &bull; &exist; y : &Nopf; &bull; x + y = 10</code> can be written as:',correct:'<code>&exist; x : &Nopf;; y : &Nopf; &bull; x + y = 10</code>',distractors:['<code>&exist; x : &Nopf; &bull; x + x = 10</code>','<code>&forall; x; y &bull; x + y = 10</code>','<code>&exist; x : &Nopf; | y &bull; x + y = 10</code>']};
  };

  window.conceptBank['Cannot Merge'] = function() {
    return {scenario:'<code>&exist; a : Set &bull; &exist; c : a &bull; p</code>',question:'Can we merge with semicolon?',correct:'No &mdash; a appears in the range of c.',distractors:['Yes &mdash; always allowed.','Only if a is renamed.','Only for &forall;.']};
  };

  window.conceptBank['Binding Occurrence'] = function() {
    return {scenario:'<code>&forall; x : &Nopf; &bull; x &ge; 0</code>',question:'The x immediately after &forall; is:',correct:'A binding occurrence.',distractors:['A free occurrence.','A bound occurrence.','A constraint.']};
  };

  window.conceptBank['Free and Bound in Same Expression'] = function() {
    return {scenario:'<code>x = 3 &and; &forall; x : &Nopf; &bull; 0 &le; x</code>',question:'How many free occurrences of x?',correct:'1 &mdash; the x in x = 3.',distractors:['0','2','All of them.']};
  };

  window.conceptBank['Pronunciation'] = function() {
    if (Math.random()<0.5) {
      return {scenario:'',question:'How is <code>&exist; x : a | p &bull; q</code> read?',correct:'There exists an x in a satisfying p, such that q.',distractors:['For all x in a, p implies q.','x equals a or p and q.','q implies p.']};
    } else {
      return {scenario:'',question:'How is <code>&forall; x : a | p &bull; q</code> read?',correct:'For all x in a satisfying p, q holds.',distractors:['There exists x in a satisfying p, such that q.','x equals a and p.','q is always false.']};
    }
  };

  window.conceptBank['Overlapping Scopes'] = function() {
    return window.conceptBank['Scope Identification']();
  };
  window.conceptBank['Fresh Variable Requirement'] = function() {
    return {scenario:'',question:'What does "fresh" mean when renaming a bound variable?',correct:'The new name does not appear anywhere else in the expression.',distractors:['Must be a single letter.','Must be from a different alphabet.','Must start with a capital.']};
  };
  window.conceptBank['Declaration Identification'] = function() {
    return window.conceptBank['Z Syntax Components']();
  };
  window.conceptBank['Constraint Role'] = function() {
    return window.conceptBank['Constraint Equivalence']();
  };
  window.conceptBank['Scope Extends to Bracket'] = function() {
    return window.conceptBank['Scope Identification']();
  };
  window.conceptBank['Bound Occurrence vs Free Occurrence'] = function() {
    return window.conceptBank['Free vs Bound']();
  };

  /* ===== §3.3 ===== */

  window.conceptBank['Basic Substitution'] = function() {
    var subs = [
      {expr:'fee(m) &le; 50',v:'m',t:'Alice',res:'fee(Alice) &le; 50'},
      {expr:'dose(p) &le; max',v:'p',t:'Patient3',res:'dose(Patient3) &le; max'},
      {expr:'rate(r) &le; 200',v:'r',t:'Room7',res:'rate(Room7) &le; 200'},
      {expr:'score(s) &ge; 80',v:'s',t:'Bob',res:'score(Bob) &ge; 80'}
    ];
    var s = subs[Math.floor(Math.random()*subs.length)];
    return {
      scenario:'Substitute <code>'+s.v+'</code> with <code>'+s.t+'</code> in <code>'+s.expr+'</code>.',
      question:'Result?',
      correct:'<code>'+s.res+'</code>',
      distractors:['<code>'+s.expr+'</code> (unchanged)','<code>'+s.t+' &le; 50</code>','<code>'+s.expr.replace(s.v,s.t).replace(s.v,s.v)+'</code>']
    };
  };

  window.conceptBank['Bound Variables Untouched'] = function() {
    return {scenario:'<code>(&exist; x : &Nopf; &bull; x &le; y + 2)[0 / x]</code>',question:'Result?',correct:'Unchanged &mdash; x is bound.',distractors:['<code>&exist; 0 &bull; 0 &le; y + 2</code>','<code>&exist; x &bull; 0 &le; y + 2</code>','<code>0 &le; y + 2</code>']};
  };

  window.conceptBank['Substitution into Free Variable'] = function() {
    var n = Math.floor(Math.random()*9)+1;
    return {scenario:'<code>(&exist; x : &Nopf; &bull; x &le; y + 2)['+n+' / y]</code>',question:'Result?',correct:'<code>&exist; x : &Nopf; &bull; x &le; '+(n+2)+'</code>',distractors:['<code>&exist; '+n+' &bull; '+n+' &le; y + 2</code>','Unchanged.','<code>'+n+' &le; '+n+' + 2</code>']};
  };

  window.conceptBank['Variable Capture'] = function() {
    return {scenario:'<code>&exist; p : Person &bull; &not;(p LooksLike o)</code>, substitute o with p.',question:'What goes wrong?',correct:'Variable capture &mdash; the free p is captured by &exist; p.',distractors:['Nothing.','Syntax error.','The quantifier is removed.']};
  };

  window.conceptBank['Fixing Capture'] = function() {
    return {scenario:'To safely substitute o with p in <code>&exist; p &bull; &not;(p LooksLike o)</code>:',question:'What must you do first?',correct:'Rename the bound p to a fresh name like q.',distractors:['Remove the quantifier.','Substitute p with o instead.','Nothing &mdash; capture is harmless.']};
  };

  window.conceptBank['Simultaneous vs Sequential'] = function() {
    return {scenario:'<code>(x &le; y + 2)[y, 5 / x, y]</code>',question:'Result?',correct:'<code>y &le; 5 + 2</code>',distractors:['<code>5 &le; 5 + 2</code>','<code>y &le; y + 2</code>','<code>x &le; 5 + 2</code>']};
  };

  window.conceptBank['Sequential Substitution'] = function() {
    return {scenario:'<code>(x &le; y + 2)[y / x][5 / y]</code>',question:'Result?',correct:'<code>5 &le; 5 + 2</code>',distractors:['<code>y &le; 5 + 2</code>','<code>y &le; y + 2</code>','<code>x &le; 5 + 2</code>']};
  };

  window.conceptBank['Distributes Through Negation'] = function() {
    return {scenario:'',question:'<code>(&not;p)[t / x]</code> = ?',correct:'<code>&not;p[t / x]</code>',distractors:['<code>p[t / x]</code>','<code>&not;t</code>','<code>t[p / x]</code>']};
  };
  window.conceptBank['Distributes Through Conjunction'] = function() {
    return {scenario:'',question:'<code>(p &and; q)[t / x]</code> = ?',correct:'<code>p[t / x] &and; q[t / x]</code>',distractors:['<code>p[t / x] &or; q[t / x]</code>','<code>p &and; q</code>','<code>t &and; t</code>']};
  };
  window.conceptBank['Distributes Through Implication'] = function() {
    return {scenario:'',question:'<code>(p &rArr; q)[t / x]</code> = ?',correct:'<code>p[t / x] &rArr; q[t / x]</code>',distractors:['<code>p[t / x] &and; q[t / x]</code>','<code>p &rArr; q</code>','<code>t &rArr; t</code>']};
  };
  window.conceptBank['Distributes Through Disjunction'] = function() {
    return {scenario:'',question:'<code>(p &or; q)[t / x]</code> = ?',correct:'<code>p[t / x] &or; q[t / x]</code>',distractors:['<code>p[t / x] &and; q[t / x]</code>','<code>p &or; q</code>','<code>t &or; t</code>']};
  };
  window.conceptBank['Distributes Through Equivalence'] = function() {
    return {scenario:'',question:'<code>(p &hArr; q)[t / x]</code> = ?',correct:'<code>p[t / x] &hArr; q[t / x]</code>',distractors:['<code>p[t / x] &rArr; q[t / x]</code>','<code>p &hArr; q</code>','<code>t &hArr; t</code>']};
  };

  window.conceptBank['All Occurrences Replaced'] = function() {
    return window.conceptBank['Basic Substitution']();
  };
  window.conceptBank['Substitution into Quantified Expression'] = function() {
    return window.conceptBank['Bound Variables Untouched']();
  };
  window.conceptBank['Substitution into Different-Variable Quantifier'] = function() {
    return window.conceptBank['Substitution into Free Variable']();
  };
  window.conceptBank['When Capture Requires Renaming'] = function() {
    return window.conceptBank['Variable Capture']();
  };
  window.conceptBank['Identity Substitution'] = function() {
    return {scenario:'',question:'What is p[x / x]?',correct:'p (unchanged).',distractors:['x.','Error.','&not;p.']};
  };
  window.conceptBank['Term Substitution'] = function() {
    return window.conceptBank['Basic Substitution']();
  };
  window.conceptBank['Substitution Preserves Bound'] = function() {
    return window.conceptBank['Substitution into Free Variable']();
  };
  window.conceptBank['Multiple Free Occurrences'] = function() {
    var n = Math.floor(Math.random()*40)+10;
    return {scenario:'Substitute n with '+n+' in <code>Positive(n) &rArr; Positive(n + 1)</code>.',question:'Result?',correct:'<code>Positive('+n+') &rArr; Positive('+(n+1)+')</code>',distractors:['<code>Positive('+n+') &rArr; Positive(n + 1)</code>','<code>Positive(n) &rArr; Positive('+n+')</code>','<code>'+n+' &rArr; '+(n+1)+'</code>']};
  };
  window.conceptBank['Purpose of Substitution'] = function() {
    return {scenario:'',question:'Primary purpose of substitution?',correct:'To apply a general formula to a specific value or term.',distractors:['To remove quantifiers.','To change connectives.','To rename all variables.']};
  };
  window.conceptBank['Capture Scenario'] = function() {
    return window.conceptBank['Variable Capture']();
  };
  window.conceptBank['Simultaneous vs Sequential Difference'] = function() {
    return {scenario:'',question:'When do simultaneous and sequential substitution differ?',correct:'When one replaced variable appears in the term for the other.',distractors:['Never.','Only with constants.','Only for bound variables.']};
  };

  /* ===== §3.4 ===== */

  window.conceptBank['Rule Identification'] = function() {
    if (Math.random()<0.5) {
      return {scenario:'Given <code>&forall; x : a &bull; p</code>',question:'Which rule concludes p[t/x]?',correct:'&forall;-elimination',distractors:['&forall;-introduction','&exist;-introduction','&exist;-elimination']};
    } else {
      return {scenario:'To prove <code>&forall; x : a &bull; p</code>',question:'Which rule?',correct:'&forall;-introduction',distractors:['&forall;-elimination','&exist;-introduction','&exist;-elimination']};
    }
  };

  window.conceptBank['Instantiation'] = function() {
    var items = [
      {univ:'&forall; f : File &bull; HasPath(f)',t:'readme.txt',res:'HasPath(readme.txt)'},
      {univ:'&forall; p : Person &bull; HasHeart(p)',t:'Alice',res:'HasHeart(Alice)'},
      {univ:'&forall; e : Employee &bull; HasBadge(e)',t:'Employee42',res:'HasBadge(Employee42)'},
      {univ:'&forall; m : Member &bull; HasPlan(m)',t:'Bob',res:'HasPlan(Bob)'}
    ];
    var i = items[Math.floor(Math.random()*items.length)];
    return {scenario:'Given <code>'+i.univ+'</code>, conclude about '+i.t+'.',question:'Result?',correct:'<code>'+i.res+'</code>',distractors:['<code>&not;'+i.res+'</code>','Nothing.','<code>'+i.univ.replace('&forall;','&exist;')+'</code>']};
  };

  window.conceptBank['Arbitrary Requirement'] = function() {
    return {scenario:'',question:'For &forall;-intro, the variable must be:',correct:'Arbitrary &mdash; not free in any undischarged assumption.',distractors:['A specific named value.','A constant.','Already bound.']};
  };

  window.conceptBank['Generalisation'] = function() {
    var props = ['every real number squared is &ge; 0','every triangle has angle sum 180°','every positive integer has a successor'];
    var p = props[Math.floor(Math.random()*props.length)];
    return {scenario:'Prove: "'+p+'."',question:'Method?',correct:'Take arbitrary element; show property; &forall;-intro.',distractors:['Check one specific case.','Use &exist;-intro.','Disprove a case.']};
  };

  window.conceptBank['Cannot Generalise from Specific'] = function() {
    var n = Math.floor(Math.random()*20)+1;
    return {scenario:'',question:'Can you conclude &forall; x &bull; p(x) from p('+n+') alone?',correct:'No &mdash; '+n+' is not arbitrary.',distractors:['Yes.','Sometimes.','Only for &Nopf;.']};
  };

  window.conceptBank['Type Must Match'] = function() {
    return {scenario:'',question:'Can you instantiate <code>&forall; x : &Nopf; &bull; p(x)</code> at a negative integer?',correct:'No &mdash; negative integers are not in &Nopf;.',distractors:['Yes.','Only if positive.','Always.']};
  };

  window.conceptBank['Full Form with Constraint'] = function() {
    return window.conceptBank['Instantiation']();
  };
  window.conceptBank['Instantiation with Modus Ponens'] = function() {
    return {scenario:'Given <code>&forall; u : User &bull; LoggedIn(u) &rArr; Auth(u)</code> and <code>LoggedIn(Alice)</code>.',question:'Conclude?',correct:'<code>Auth(Alice)</code> (&forall;-elim then MP)',distractors:['<code>&not;Auth(Alice)</code>','Nothing.','<code>LoggedIn(u)</code>']};
  };
  window.conceptBank['&forall; Distributes Through &and;'] = function() {
    return {scenario:'',question:'From <code>&forall; x : a &bull; p &and; q</code> derive:',correct:'<code>(&forall; x : a &bull; p) &and; (&forall; x : a &bull; q)</code>',distractors:['<code>(&forall; x &bull; p) &or; (&forall; x &bull; q)</code>','<code>&exist; x &bull; p &and; q</code>','<code>p &and; q</code>']};
  };
  window.conceptBank['Moving &forall; Through &rArr;'] = function() {
    return {scenario:'x not free in p.',question:'<code>&forall; x : a &bull; p &rArr; q</code> is equivalent to:',correct:'<code>p &rArr; &forall; x : a &bull; q</code>',distractors:['<code>&forall; x &bull; p &and; q</code>','<code>&exist; x &bull; p &rArr; q</code>','<code>p &rArr; &exist; x &bull; q</code>']};
  };
  window.conceptBank['Proviso Violation'] = function() {
    return window.conceptBank['Cannot Generalise from Specific']();
  };
  window.conceptBank['&forall;-intro is Also Called'] = function() {
    return {scenario:'',question:'&forall;-introduction is also known as:',correct:'Generalisation.',distractors:['Instantiation.','Specialisation.','Unification.']};
  };
  window.conceptBank['&forall;-elim is Also Called'] = function() {
    return {scenario:'',question:'&forall;-elimination is also known as:',correct:'Instantiation.',distractors:['Generalisation.','Proof by cases.','Assumption discharge.']};
  };
  window.conceptBank['Why Truth Tables Fail'] = function() {
    return {scenario:'',question:'Why can\'t truth tables handle quantifiers?',correct:'The sets bound variables range over may be infinite.',distractors:['Quantifiers don\'t use T/F.','Truth tables are always sufficient.','Quantifiers are not part of logic.']};
  };
  window.conceptBank['Rule Application'] = function() {
    return window.conceptBank['Instantiation']();
  };
  window.conceptBank['&forall; Does Not Distribute Through &or;'] = function() {
    return {scenario:'',question:'Does &forall; x &bull; p &or; q imply (&forall; x &bull; p) &or; (&forall; x &bull; q)?',correct:'No &mdash; &forall; distributes through &and; but NOT &or;.',distractors:['Yes.','Only for finite domains.','Only if p = q.']};
  };
  window.conceptBank['Constraint as Implication'] = function() {
    return window.conceptBank['Constraint Equivalence']();
  };

  /* ===== §3.5 ===== */

  window.conceptBank['&exist;-intro'] = function() {
    var items = [
      {fact:'Defective(Treadmill3)',res:'&exist; e : Equipment &bull; Defective(e)'},
      {fact:'Overdue(ZPrimer)',res:'&exist; b : Book &bull; Overdue(b)'},
      {fact:'Expensive(Car1)',res:'&exist; c : Car &bull; Expensive(c)'},
      {fact:'Prime(7)',res:'&exist; n : &Nopf; &bull; Prime(n)'}
    ];
    var i = items[Math.floor(Math.random()*items.length)];
    return {scenario:'From <code>'+i.fact+'</code>.',question:'Conclude?',correct:'<code>'+i.res+'</code>',distractors:['<code>'+i.res.replace('&exist;','&forall;')+'</code>','<code>&not;'+i.res+'</code>','Nothing.']};
  };

  window.conceptBank['Fresh Witness Requirement'] = function() {
    return {scenario:'',question:'In &exist;-elim, the witness must be:',correct:'A fresh variable not used elsewhere.',distractors:['A specific number.','A quantifier.','A connective.']};
  };

  window.conceptBank['Witness Must Not Leak'] = function() {
    return {scenario:'',question:'After &exist;-elim, the conclusion must:',correct:'NOT mention the witness variable.',distractors:['Mention the witness.','Be a new quantifier.','Be a constant.']};
  };

  window.conceptBank['&exist;-intro from Conjunction'] = function() {
    return window.conceptBank['&exist;-intro']();
  };

  window.conceptBank['&exist;-elim Pattern'] = function() {
    var goals = ['FileReport','EmergencyProtocol','HaltCooking','SystemHasAdmin'];
    var g = goals[Math.floor(Math.random()*goals.length)];
    return {scenario:'Given &exist; s &bull; Problem(s), derive "'+g+'".',question:'Method?',correct:'Fresh s₀; assume Problem(s₀); derive '+g+'; discharge.',distractors:['Name the witness Alice.','Use &forall;-intro.','Use &and;-intro.']};
  };

  window.conceptBank['&exist; Distributes Through &or;'] = function() {
    return {scenario:'',question:'From <code>&exist; x : a &bull; p &or; q</code> derive:',correct:'<code>(&exist; x &bull; p) &or; (&exist; x &bull; q)</code>',distractors:['<code>(&exist; x &bull; p) &and; (&exist; x &bull; q)</code>','<code>&forall; x &bull; p &or; q</code>','<code>p &or; q</code>']};
  };

  window.conceptBank['One-Point Rule'] = function() {
    var items = [
      {c:'a = Acct7',body:'Balance(a) &gt; 0',res:'Balance(Acct7) &gt; 0'},
      {c:'p = P42',body:'Valid(p)',res:'Valid(P42)'},
      {c:'l = L99',body:'Assigned(l, Alice)',res:'Assigned(L99, Alice)'}
    ];
    var i = items[Math.floor(Math.random()*items.length)];
    return {scenario:'<code>&exist; x | '+i.c+' &bull; '+i.body+'</code>',question:'Simplifies to?',correct:'<code>'+i.res+'</code>',distractors:['<code>&forall; x &bull; '+i.body+'</code>','<code>&exist; x &bull; '+i.body+'</code>','<code>'+i.body+'</code> (unchanged)']};
  };

  window.conceptBank['Cannot Conclude Specific from &exist;'] = function() {
    var n = Math.floor(Math.random()*10)+1;
    return {scenario:'Given <code>&exist; x &bull; p(x)</code>.',question:'Can you conclude p('+n+')?',correct:'No &mdash; the witness could be any value.',distractors:['Yes.','Only if x : &Nopf;.','Sometimes.']};
  };
  window.conceptBank['Why Fresh?'] = function() {
    return window.conceptBank['Fresh Witness Requirement']();
  };
  window.conceptBank['&exist;-intro with Two Arguments'] = function() {
    return window.conceptBank['&exist;-intro']();
  };
  window.conceptBank['&exist;-elim Conclusion'] = function() {
    return window.conceptBank['&exist;-elim Pattern']();
  };
  window.conceptBank['One-Point Rule Application'] = function() {
    return window.conceptBank['One-Point Rule']();
  };
  window.conceptBank['&exist;-intro from Specific'] = function() {
    return window.conceptBank['&exist;-intro']();
  };
  window.conceptBank['Witness Can Be a Term'] = function() {
    return {scenario:'',question:'Can a witness be a compound term like n + 1?',correct:'Yes &mdash; any expression of the right type.',distractors:['No &mdash; must be a constant.','Only for &Nopf;.','Only a variable.']};
  };
  window.conceptBank['&exist; Does Not Distribute Through &and;'] = function() {
    return {scenario:'',question:'Does (&exist; x &bull; p) &and; (&exist; x &bull; q) imply &exist; x &bull; p &and; q?',correct:'No &mdash; the witnesses might be different elements.',distractors:['Yes.','Only for finite domains.','Only if p = q.']};
  };
  window.conceptBank['Correct &exist;-elim Pattern'] = function() {
    return window.conceptBank['&exist;-elim Pattern']();
  };
  window.conceptBank['&exist;-elim for General Conclusion'] = function() {
    return window.conceptBank['&exist;-elim Pattern']();
  };

})();

/* Ch3 — Auto-annotate symbols with hover definitions across all sections */
(function annotateChapter3Symbols() {
  var sections = {
    'page-0': { /* \u00A73.1 Predicate Calculus */
      '\u2203':     'Existential quantifier \u2014 there exists.',
      '\u2200':     'Universal quantifier \u2014 for all.',
      ':':          'Type/set membership in a declaration.',
      '\u2022':     'Separator between declaration and body.',
      '\u2115':     'The set of natural numbers.',
      '>':          'Strictly greater than.',
      '\u00AC':     'Negation.',
      '\u21D2':     'Implication.',
      '\u2227':     'Conjunction (AND).',
      '\u2228':     'Disjunction (OR).'
    },
    'page-1': { /* \u00A73.2 Quantifiers and Declarations */
      '\u2200':     'Universal quantifier.',
      '\u2203':     'Existential quantifier.',
      ':':          'Type/set membership in a declaration.',
      '|':          'Constraint separator (between range and constraint).',
      '\u2022':     'Body separator (between declaration and predicate).',
      ';':          'Merges two same-quantifier declarations.',
      '\u2208':     'Set membership.',
      '\u2227':     'Conjunction.',
      '\u21D2':     'Implication.',
      '\u00AC':     'Negation.',
      '\u2265':     'Greater than or equal to.',
      '\u2264':     'Less than or equal to.'
    },
    'page-2': { /* \u00A73.3 Substitution */
      '[y / x]':       'Substitute y for every free x.',
      '[t, u / x, y]': 'Simultaneous substitution of t for x and u for y.',
      '\u21D4':         'Logical equivalence.',
      '\u2200':         'Universal quantifier.',
      '\u2203':         'Existential quantifier.',
      '\u2227':         'Conjunction.',
      '\u2228':         'Disjunction.',
      '\u21D2':         'Implication.',
      '\u00AC':         'Negation.',
      '\u2264':         'Less-or-equal.'
    },
    'page-3': { /* \u00A73.4 Universal Introduction and Elimination */
      '\u2200':     'Universal quantifier.',
      '\u2208':     'Set membership.',
      '[t / x]':    'Substitution.',
      '\u21D2':     'Implication.',
      '\u2227':     'Conjunction.',
      '\u21D4':     'Equivalence.'
    },
    'page-4': { /* \u00A73.5 Existential Introduction and Elimination */
      '\u2203':     'Existential quantifier.',
      '\u2208':     'Set membership.',
      '[t / x]':    'Substitution.',
      '\u2227':     'Conjunction.',
      '\u2228':     'Disjunction.',
      '\u21D4':     'Equivalence.'
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
