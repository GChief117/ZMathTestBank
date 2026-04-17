/* ============================================================
   Chapter 6 — Definitions — Concept Bank Generators
   One IIFE per section.  Each generator returns {scenario, question, correct, distractors}.
   ============================================================ */

// ——— 6.1 Declarations ———
(function buildCh6S1Bank() {

  var domains = [
    {name:'EMPLOYEE',var:'e',ctx:'HR system'},
    {name:'TICKET',var:'t',ctx:'support desk'},
    {name:'SENSOR',var:'s',ctx:'IoT platform'},
    {name:'ORDER',var:'o',ctx:'e-commerce app'},
    {name:'DEVICE',var:'d',ctx:'fleet tracker'},
    {name:'PATIENT',var:'p',ctx:'hospital'}
  ];
  var ints = [
    {name:'count',bound:'count &ge; 0',ctx:'inventory app'},
    {name:'score',bound:'0 &le; score &le; 100',ctx:'grading system'},
    {name:'temp',bound:'-40 &le; temp &le; 60',ctx:'weather station'},
    {name:'age',bound:'age &ge; 18',ctx:'registration form'},
    {name:'seats',bound:'seats &ge; 1',ctx:'classroom booking'},
    {name:'balance',bound:'balance &ge; 0',ctx:'banking app'}
  ];

  window.conceptBank = window.conceptBank || {};

  window.conceptBank['Declaration Symbol'] = function() {
    var d = domains[Math.floor(Math.random()*domains.length)];
    return {
      scenario:'A <span class="key">'+d.ctx+'</span> needs to declare <span class="key">'+d.name+'</span> as opaque identifiers.',
      question:'Which declaration introduces this basic type?',
      correct:'<code>['+d.name+']</code>',
      distractors:['<code>'+d.name+' == &Zopf;</code>','<code>'+d.name+' : &Zopf;</code>','<code>'+d.name+' ::= atom</code>']
    };
  };

  window.conceptBank['Signature Meaning'] = function() {
    var d = domains[Math.floor(Math.random()*domains.length)];
    return {
      scenario:'After <code>['+d.name+']</code>, we write <code>'+d.var+' : '+d.name+'</code>.',
      question:'This means:',
      correct:'<code>'+d.var+'</code> is drawn from type <code>'+d.name+'</code>.',
      distractors:['<code>'+d.var+'</code> equals <code>'+d.name+'</code>.','<code>'+d.var+'</code> is a subset of <code>'+d.name+'</code>.','<code>'+d.var+'</code> abbreviates <code>'+d.name+'</code>.']
    };
  };

  window.conceptBank['Declaring a Hotel System'] = function() {
    var a = domains[Math.floor(Math.random()*domains.length)];
    var b = domains[Math.floor(Math.random()*domains.length)];
    while(b.name===a.name) b = domains[Math.floor(Math.random()*domains.length)];
    return {
      scenario:'A <span class="key">'+a.ctx+'</span> needs opaque <span class="key">'+a.name+'</span> and <span class="key">'+b.name+'</span>.',
      question:'Which declaration is correct?',
      correct:'<code>['+a.name+', '+b.name+']</code>',
      distractors:['<code>'+a.name+' == '+b.name+'</code>','<code>'+a.name+' : '+b.name+'</code>','<code>'+a.name+' ::= '+b.name+'</code>']
    };
  };

  window.conceptBank['Variable Declaration'] = function() {
    var d = domains[Math.floor(Math.random()*domains.length)];
    return {
      scenario:'After <code>['+d.name+']</code>, introduce variable <span class="key">'+d.var+'</span>.',
      question:'Which declaration works?',
      correct:'<code>'+d.var+' : '+d.name+'</code>',
      distractors:['<code>'+d.var+' == '+d.name+'</code>','<code>'+d.var+' ::= '+d.name+'</code>','<code>['+d.var+'] : '+d.name+'</code>']
    };
  };

  window.conceptBank['Built-in Type'] = function() {
    var d = domains[Math.floor(Math.random()*domains.length)];
    return {
      scenario:'A spec uses both <code>&Zopf;</code> and <code>'+d.name+'</code>.',
      question:'Which does NOT need to be declared?',
      correct:'<code>&Zopf;</code> (integers)',
      distractors:['<code>'+d.name+'</code>','<code>ROOM</code>','<code>FILE</code>']
    };
  };

  window.conceptBank['Constraint Syntax'] = function() {
    var v = ints[Math.floor(Math.random()*ints.length)];
    return {
      scenario:'A <span class="key">'+v.ctx+'</span> needs <span class="key">'+v.name+'</span> with <span class="key">'+v.bound+'</span>.',
      question:'Which form adds the constraint?',
      correct:'<code>'+v.name+' : &Zopf; | '+v.bound+'</code>',
      distractors:['<code>'+v.name+' == &Zopf;</code>','<code>'+v.name+' ::= &Zopf;</code>','<code>['+v.name+'] : &Zopf;</code>']
    };
  };

  window.conceptBank['Opaque Elements'] = function() {
    var d = domains[Math.floor(Math.random()*domains.length)];
    return {
      scenario:'After <code>['+d.name+']</code>, what do we know about its structure?',
      question:'The internal structure is:',
      correct:'Nothing &mdash; elements are opaque atoms.',
      distractors:['It contains specific named elements.','It is a subset of &Zopf;.','It is empty.']
    };
  };

  // Secondary concept coverage V.21-V.25
  window.conceptBank['Signature Definition'] = function() {
    var d = domains[Math.floor(Math.random()*domains.length)];
    return {
      scenario:'We write <code>'+d.var+' : '+d.name+'</code> where <code>'+d.name+'</code> is a type.',
      question:'This declaration is called a:',
      correct:'Signature.',
      distractors:['Abbreviation.','Axiom.','Free type.']
    };
  };

  window.conceptBank['Given Set Convention'] = function() {
    return {
      scenario:'A spec names its basic types.',
      question:'By convention, basic type names are written in:',
      correct:'Capitalised identifiers (e.g. <code>Guest</code>, <code>PERSON</code>).',
      distractors:['All lowercase.','Greek letters.','Numbers.']
    };
  };

  window.conceptBank['Vertical Bar in Quantification'] = function() {
    var d = domains[Math.floor(Math.random()*domains.length)];
    return {
      scenario:'In <code>&forall; '+d.var+' : '+d.name+' | '+d.var+' &isin; active &bull; ready('+d.var+')</code>.',
      question:'The constraint <code>'+d.var+' &isin; active</code> restricts to:',
      correct:'Active members of '+d.name+'.',
      distractors:['All members of '+d.name+'.','No members.','Members with ready = false.']
    };
  };

  window.conceptBank['Spec Prose Role'] = function() {
    return {
      scenario:'A formal specification is being reviewed.',
      question:'Besides math, a spec should also contain:',
      correct:'Significant prose relating math objects to design features.',
      distractors:['Only symbols.','Only code.','Only diagrams.']
    };
  };

  window.conceptBank['Definition Methods Overview'] = function() {
    return {
      scenario:'The textbook surveys ways to define objects.',
      question:'The listed methods are:',
      correct:'Declare, abbreviate, or define by axiom (plus free types and schemas).',
      distractors:['Only declare.','Only abbreviate.','Only axiom.']
    };
  };
})();


// ——— 6.2 Abbreviations ———
(function buildCh6S2Bank() {

  var sets = [
    {name:'Primary',elems:'{red, blue, yellow}',type:'Colour',ctx:'art studio'},
    {name:'Weekday',elems:'{mon, tue, wed, thu, fri}',type:'Day',ctx:'calendar app'},
    {name:'Vowel',elems:'{a, e, i, o, u}',type:'Letter',ctx:'word game'},
    {name:'Cardinal',elems:'{north, south, east, west}',type:'Direction',ctx:'compass app'},
    {name:'Medal',elems:'{gold, silver, bronze}',type:'Award',ctx:'sports tracker'},
    {name:'Suit',elems:'{hearts, diamonds, clubs, spades}',type:'Card',ctx:'card game'}
  ];

  var filters = [
    {name:'Adult',var:'n',base:'&Nopf;',pred:'n &ge; 18',ctx:'registration app'},
    {name:'SmallPrime',var:'p',base:'&Nopf;',pred:'p &isin; {2,3,5,7}',ctx:'crypto library'},
    {name:'ShortWord',var:'w',base:'WORD',pred:'#w &le; 4',ctx:'puzzle game'},
    {name:'HotDay',var:'t',base:'&Nopf;',pred:'t &ge; 30',ctx:'weather app'},
    {name:'HighScore',var:'s',base:'&Nopf;',pred:'s &ge; 90',ctx:'grading system'},
    {name:'TinyFile',var:'f',base:'FILE',pred:'size(f) &lt; 1024',ctx:'storage manager'}
  ];

  window.conceptBank = window.conceptBank || {};

  window.conceptBank['Abbreviation Symbol'] = function() {
    var s = sets[Math.floor(Math.random()*sets.length)];
    return {
      scenario:'A <span class="key">'+s.ctx+'</span> wants to name <span class="key">'+s.elems+'</span>.',
      question:'Which symbol introduces an abbreviation?',
      correct:'<code>==</code>',
      distractors:['<code>:</code>','<code>::=</code>','<code>=</code>']
    };
  };

  window.conceptBank['Recursion Rule'] = function() {
    var names = ['gnu','LOOP','SELF','META','REC'];
    var n = names[Math.floor(Math.random()*names.length)];
    return {
      scenario:'Someone writes <code>'+n+' == '+n+' + 1</code>.',
      question:'Is this a valid abbreviation?',
      correct:'No &mdash; <code>'+n+'</code> appears on the RHS.',
      distractors:['Yes.','Only for integers.','Only for sets.']
    };
  };

  window.conceptBank['Naming a Colour Set'] = function() {
    var s = sets[Math.floor(Math.random()*sets.length)];
    return {
      scenario:'A <span class="key">'+s.ctx+'</span> wants a name for <span class="key">'+s.elems+'</span>.',
      question:'Which abbreviation is correct?',
      correct:'<code>'+s.name+' == '+s.elems+'</code>',
      distractors:['<code>'+s.name+' : '+s.elems+'</code>','<code>'+s.name+' ::= '+s.elems.replace(/[{} ]/g,'').split(',').join(' | ')+'</code>','<code>'+s.elems+' == '+s.name+'</code>']
    };
  };

  window.conceptBank['Invalid Recursive Definition'] = function() {
    var n = ['gnu','LOOP','SELF','META'][Math.floor(Math.random()*4)];
    return {
      scenario:'Is <code>'+n+' == f('+n+')</code> a valid abbreviation?',
      question:'Choose:',
      correct:'No &mdash; <code>'+n+'</code> appears on the RHS.',
      distractors:['Yes.','Only if '+n+' is a type.','Only for strings.']
    };
  };

  window.conceptBank['Abbreviation as Alias'] = function() {
    return {
      scenario:'An abbreviation definition has been written.',
      question:'It asserts:',
      correct:'Nothing new &mdash; it is a pure alias.',
      distractors:['A new axiom.','A constraint on the symbol.','A type restriction.']
    };
  };

  window.conceptBank['Set Comprehension Abbreviation'] = function() {
    var f = filters[Math.floor(Math.random()*filters.length)];
    return {
      scenario:'A <span class="key">'+f.ctx+'</span> wants to name elements of <span class="key">'+f.base+'</span> where <span class="key">'+f.pred+'</span>.',
      question:'Which abbreviation works?',
      correct:'<code>'+f.name+' == { '+f.var+' : '+f.base+' | '+f.pred+' }</code>',
      distractors:['<code>'+f.name+' : '+f.base+' | '+f.pred+'</code>','<code>'+f.name+' ::= '+f.base+'</code>','<code>'+f.base+' == '+f.name+'</code>']
    };
  };

  window.conceptBank['Eliminability'] = function() {
    var s = sets[Math.floor(Math.random()*sets.length)];
    return {
      scenario:'Given <code>'+s.name+' == '+s.elems+'</code>.',
      question:'To eliminate the abbreviation, you:',
      correct:'Replace every <code>'+s.name+'</code> with <code>'+s.elems+'</code>.',
      distractors:['Delete <code>'+s.name+'</code>.','Add a constraint.','Declare a new type.']
    };
  };

  window.conceptBank['Inference Rule'] = function() {
    var s = sets[Math.floor(Math.random()*sets.length)];
    return {
      scenario:'Given <code>'+s.name+' == '+s.elems+'</code>.',
      question:'The [abbrev] rule concludes:',
      correct:'<code>'+s.name+' = '+s.elems+'</code>',
      distractors:['<code>'+s.name+' &ne; '+s.elems+'</code>','<code>'+s.name+' : '+s.elems+'</code>','<code>'+s.name+' &isin; '+s.elems+'</code>']
    };
  };

  window.conceptBank['Type of an Abbreviation'] = function() {
    var s = sets[Math.floor(Math.random()*sets.length)];
    return {
      scenario:'<code>'+s.name+' == '+s.elems+'</code> where elements are of type <code>'+s.type+'</code>.',
      question:'The type of <code>'+s.name+'</code> is:',
      correct:'<code>&Popf; '+s.type+'</code>',
      distractors:['<code>'+s.type+'</code>','<code>&Zopf;</code>','<code>&Nopf;</code>']
    };
  };

  // Secondary concepts V.21-V.25
  window.conceptBank['Benign Nature'] = function() {
    return {
      scenario:'The textbook calls abbreviations "benign."',
      question:'This means:',
      correct:'The definition asserts nothing &mdash; it just provides a convenient name.',
      distractors:['It adds an axiom.','It creates a new type.','It constrains a variable.']
    };
  };

  window.conceptBank['Abbreviation Adds No Axiom'] = function() {
    return {
      scenario:'Comparing abbreviations to axiomatic definitions.',
      question:'Unlike axiomatic definitions, abbreviations:',
      correct:'Add no new axioms to the specification.',
      distractors:['Always add axioms.','Create new types.','Cannot name sets.']
    };
  };

  window.conceptBank['Self-Reference Check'] = function() {
    var n = ['A','B','K','M'][Math.floor(Math.random()*4)];
    var v = Math.floor(Math.random()*10)+1;
    return {
      scenario:'Is <code>'+n+' == '+n+' + '+v+'</code> valid?',
      question:'Choose:',
      correct:'No &mdash; <code>'+n+'</code> appears on the RHS.',
      distractors:['Yes.','Only for &Nopf;.','Only if '+n+' = 0.']
    };
  };

  window.conceptBank['Paraphrase of =='] = function() {
    var s = sets[Math.floor(Math.random()*sets.length)];
    return {
      scenario:'<code>'+s.name+' == '+s.elems+'</code>.',
      question:'The cleanest paraphrase is:',
      correct:'"'+s.name+' is shorthand for '+s.elems+'."',
      distractors:['"'+s.name+' satisfies '+s.elems+'."','"'+s.name+' is a type."','"'+s.name+' constrains '+s.elems+'."']
    };
  };
})();


// ——— 6.3 Generic Abbreviations ———
(function buildCh6S3Bank() {

  var types = ['&Zopf;','PERSON','FILE','ITEM','MSG','USER','STUDENT','DOCTOR'];
  var pairs = [
    {s:'USER',t:'FILE',ctx:'file system'},
    {s:'STUDENT',t:'COURSE',ctx:'university'},
    {s:'DOCTOR',t:'PATIENT',ctx:'clinic'},
    {s:'DRIVER',t:'VEHICLE',ctx:'fleet app'},
    {s:'AUTHOR',t:'BOOK',ctx:'library'},
    {s:'EMPLOYEE',t:'PROJECT',ctx:'HR system'}
  ];

  window.conceptBank = window.conceptBank || {};

  window.conceptBank['Generic Purpose'] = function() {
    return {
      scenario:'A generic abbreviation is introduced.',
      question:'It defines:',
      correct:'A family of symbols, one per instantiation.',
      distractors:['A single fixed constant.','A free type.','An axiomatic definition.']
    };
  };

  window.conceptBank['Empty Set Definition'] = function() {
    var T = types[Math.floor(Math.random()*types.length)];
    return {
      scenario:'Define the empty set of type <span class="key">'+T+'</span>.',
      question:'<code>&empty;['+T+']</code> equals:',
      correct:'<code>{ x : '+T+' | false }</code>',
      distractors:['<code>{ x : '+T+' | true }</code>','<code>'+T+'</code>','<code>&Popf; '+T+'</code>']
    };
  };

  window.conceptBank['Instantiating Empty Set'] = function() {
    var T = types[Math.floor(Math.random()*types.length)];
    return {
      scenario:'A buffer of type <span class="key">'+T+'</span> starts empty.',
      question:'The initial value is:',
      correct:'<code>&empty;['+T+']</code>',
      distractors:['<code>&Popf; '+T+'</code>','<code>'+T+'</code>','<code>&Popf;<sub>1</sub> '+T+'</code>']
    };
  };

  window.conceptBank['&Popf;<sub>1</sub> Definition'] = function() {
    var T = types[Math.floor(Math.random()*types.length)];
    return {
      scenario:'Define the non-empty subsets of <span class="key">'+T+'</span>.',
      question:'<code>&Popf;<sub>1</sub> '+T+'</code> equals:',
      correct:'<code>{ a : &Popf; '+T+' | a &ne; &empty; }</code>',
      distractors:['<code>{ a : '+T+' | a &ne; &empty; }</code>','<code>&Popf; '+T+'</code>','<code>'+T+'</code>']
    };
  };

  window.conceptBank['Instantiating &Popf;<sub>1</sub>'] = function() {
    var n = Math.floor(Math.random()*4)+2;
    var elems = [];
    for(var i=0;i<n;i++) elems.push(i);
    var full = '{'+elems.join(', ')+'}';
    var nonEmpty = Math.pow(2,n)-1;
    return {
      scenario:'Compute <code>&Popf;<sub>1</sub> '+full+'</code>.',
      question:'How many elements does it have?',
      correct:''+nonEmpty+' (all subsets minus &empty;).',
      distractors:[''+(nonEmpty+1)+' (including &empty;).',''+n+'.','1.']
    };
  };

  window.conceptBank['Infix Relation Definition'] = function() {
    var p = pairs[Math.floor(Math.random()*pairs.length)];
    return {
      scenario:'A <span class="key">'+p.ctx+'</span> uses <code>'+p.s+' rel '+p.t+'</code>.',
      question:'This equals:',
      correct:'<code>&Popf;('+p.s+' &times; '+p.t+')</code>',
      distractors:['<code>'+p.s+' &times; '+p.t+'</code>','<code>&Popf; '+p.s+'</code>','<code>'+p.s+' &cup; '+p.t+'</code>']
    };
  };

  window.conceptBank['Relation Membership'] = function() {
    var p = pairs[Math.floor(Math.random()*pairs.length)];
    return {
      scenario:'Given <code>'+p.s+' rel '+p.t+' == &Popf;('+p.s+' &times; '+p.t+')</code>.',
      question:'Each element is:',
      correct:'A set of ('+p.s+', '+p.t+') pairs.',
      distractors:['A single pair.','A subset of '+p.s+'.','A subset of '+p.t+'.']
    };
  };

  window.conceptBank['Family of Rules'] = function() {
    return {
      scenario:'A generic abbreviation has been defined.',
      question:'How many inference rules does it add?',
      correct:'A family &mdash; one per instantiation.',
      distractors:['Exactly one.','Zero.','Exactly two.']
    };
  };

  window.conceptBank['Empty Set Proof'] = function() {
    var v = Math.floor(Math.random()*100);
    var T = types[Math.floor(Math.random()*types.length)];
    return {
      scenario:'Prove <code>'+v+' &notin; &empty;[&Nopf;]</code>.',
      question:'The proof relies on:',
      correct:'Membership requires <code>false</code> &mdash; contradiction.',
      distractors:['<code>'+v+' &gt; 0</code>.','<code>&Nopf;</code> is infinite.','<code>'+v+' &isin; &Nopf;</code>.']
    };
  };

  window.conceptBank['Parameter Omission'] = function() {
    return {
      scenario:'A spec writes <code>pool = &empty;</code> without type brackets.',
      question:'When can parameters be omitted?',
      correct:'When obvious from context.',
      distractors:['Never.','Always.','Only for &empty;.']
    };
  };

  // Secondary V.21-V.25
  window.conceptBank['Generic Parameter'] = function() {
    return {
      scenario:'In <code>&empty;[S] == { x : S | false }</code>, <code>S</code> is:',
      question:'What is S?',
      correct:'A generic parameter &mdash; any set (likely a type).',
      distractors:['A fixed constant.','An integer.','A predicate.']
    };
  };

  window.conceptBank['Infix Operator Use'] = function() {
    var p = pairs[Math.floor(Math.random()*pairs.length)];
    return {
      scenario:'A <span class="key">'+p.ctx+'</span> records assignments.',
      question:'Using <code>rel</code>, the type is:',
      correct:'<code>'+p.s+' rel '+p.t+'</code>',
      distractors:['<code>'+p.s+' &times; '+p.t+'</code>','<code>&Popf; '+p.s+'</code>','<code>'+p.s+' &cup; '+p.t+'</code>']
    };
  };

  window.conceptBank['Abbreviation Rule for Generics'] = function() {
    var T = types[Math.floor(Math.random()*types.length)];
    return {
      scenario:'Given <code>&empty;['+T+'] == { x : '+T+' | false }</code>.',
      question:'The [abbrev] rule yields:',
      correct:'<code>&empty;['+T+'] = { x : '+T+' | false }</code>',
      distractors:['<code>&empty;['+T+'] : '+T+'</code>','<code>&empty;['+T+'] &isin; '+T+'</code>','<code>&empty;['+T+'] &ne; '+T+'</code>']
    };
  };

  window.conceptBank['Bracket Notation'] = function() {
    return {
      scenario:'Generic parameter lists may be enclosed in:',
      question:'Choose:',
      correct:'Brackets, or omitted when obvious.',
      distractors:['Parentheses always.','Curly braces.','Angle brackets.']
    };
  };

  window.conceptBank['Second Generic Symbol in &empty;'] = function() {
    return {
      scenario:'The &empty; symbol in <code>&empty;[S] == { x : S | false }</code>.',
      question:'This is because:',
      correct:'&empty; is the symbol being defined, parameterised by S.',
      distractors:['It is an error.','S must equal &empty;.','false is a type.']
    };
  };
})();


// ——— 6.4 Axiomatic Definitions ———
(function buildCh6S4Bank() {

  var constants = [
    {name:'maxConn',val:200,ctx:'database'},
    {name:'speedLimit',val:120,ctx:'highway system'},
    {name:'taxRate',val:15,ctx:'tax calculator'},
    {name:'maxPlayers',val:4,ctx:'game engine'},
    {name:'loanDays',val:14,ctx:'library'},
    {name:'maxVolume',val:100,ctx:'audio app'},
    {name:'timeout',val:30,ctx:'web server'},
    {name:'retries',val:3,ctx:'API client'}
  ];

  var ranges = [
    {name:'targetTemp',lo:60,hi:80,ctx:'thermostat'},
    {name:'bufSize',lo:64,hi:4096,ctx:'network buffer'},
    {name:'maxLen',lo:1,hi:2000,ctx:'chat app'},
    {name:'brightness',lo:0,hi:255,ctx:'display driver'},
    {name:'volume',lo:0,hi:100,ctx:'music player'},
    {name:'priority',lo:1,hi:10,ctx:'task scheduler'}
  ];

  window.conceptBank = window.conceptBank || {};

  window.conceptBank['Axiomatic Form'] = function() {
    return {
      scenario:'An axiomatic definition is needed.',
      question:'It consists of:',
      correct:'A declaration above a line and a predicate below.',
      distractors:['<code>symbol == term</code>.','<code>[Name]</code>.','<code>T ::= c1 | c2</code>.']
    };
  };

  window.conceptBank['Axiom Meaning'] = function() {
    return {
      scenario:'The predicate in an axiomatic definition is:',
      question:'Choose:',
      correct:'An axiom assumed true whenever the symbol is used.',
      distractors:['A suggestion.','An abbreviation.','A comment.']
    };
  };

  window.conceptBank['Defining &Nopf;'] = function() {
    return {
      scenario:'The natural numbers are defined axiomatically.',
      question:'Which definition is correct?',
      correct:'<code>&Nopf; : &Popf; &Zopf;</code> with <code>&forall; z : &Zopf; &bull; z &isin; &Nopf; &hArr; z &ge; 0</code>',
      distractors:['<code>&Nopf; == &Zopf;</code>','<code>&Nopf; ::= 0 | 1 | 2 | &hellip;</code>','<code>[&Nopf;]</code>']
    };
  };

  window.conceptBank['Fixed Constant'] = function() {
    var c = constants[Math.floor(Math.random()*constants.length)];
    return {
      scenario:'A <span class="key">'+c.ctx+'</span> defines <span class="key">'+c.name+' = '+c.val+'</span>.',
      question:'Which axiomatic definition captures this?',
      correct:'<code>'+c.name+' : &Nopf;</code> with <code>'+c.name+' = '+c.val+'</code>',
      distractors:['<code>'+c.name+' == '+c.val+'</code>','<code>'+c.name+' ::= '+c.val+'</code>','<code>['+c.name+']</code>']
    };
  };

  window.conceptBank['Consistency Check'] = function() {
    return {
      scenario:'A spec defines <code>k : &Nopf;</code> with <code>k &lt; 0</code>.',
      question:'This is:',
      correct:'Inconsistent &mdash; no natural is negative.',
      distractors:['Valid.','Under-determined.','A valid abbreviation.']
    };
  };

  window.conceptBank['Range Constraint'] = function() {
    var r = ranges[Math.floor(Math.random()*ranges.length)];
    return {
      scenario:'A <span class="key">'+r.ctx+'</span> bounds <span class="key">'+r.name+'</span> between '+r.lo+' and '+r.hi+'.',
      question:'Which axiomatic form captures this?',
      correct:'<code>'+r.name+' : &Nopf;</code> with <code>'+r.lo+' &le; '+r.name+' &le; '+r.hi+'</code>',
      distractors:['<code>'+r.name+' == '+r.lo+'..'+r.hi+'</code>','<code>'+r.name+' ::= '+r.lo+' | '+r.hi+'</code>','<code>['+r.name+']</code>']
    };
  };

  window.conceptBank['No Predicate'] = function() {
    return {
      scenario:'An axiomatic definition has no predicate.',
      question:'It introduces:',
      correct:'A typed constant with no restrictions &mdash; under-determined.',
      distractors:['An invalid definition.','An abbreviation.','A free type.']
    };
  };

  window.conceptBank['Axiomatic vs. Abbreviation'] = function() {
    return {
      scenario:'Comparing the two definition forms.',
      question:'The key difference is:',
      correct:'Axiomatic adds a constraint (axiom); abbreviation is a pure alias.',
      distractors:['They are the same.','Abbreviations use <code>:</code>.','Axiomatic uses <code>==</code>.']
    };
  };

  window.conceptBank['Global Visibility'] = function() {
    return {
      scenario:'A constant is introduced axiomatically.',
      question:'Its visibility is:',
      correct:'Global throughout the specification.',
      distractors:['Local to one section.','Only in schemas.','Temporary.']
    };
  };

  // Secondary V.21-V.25
  window.conceptBank['Axiom Strength'] = function() {
    return {
      scenario:'When to choose axiomatic over abbreviation?',
      question:'Axiomatic is preferred when:',
      correct:'You need to assert a constraint on the value.',
      distractors:['Always.','Never.','Only for &Zopf;.']
    };
  };

  window.conceptBank['Unique Name Rule'] = function() {
    return {
      scenario:'Two axiomatic definitions use the same name.',
      question:'Is this allowed?',
      correct:'No &mdash; names must be unique globally.',
      distractors:['Yes.','Only for different types.','Only in schemas.']
    };
  };

  window.conceptBank['RGB Channels'] = function() {
    var v = Math.floor(Math.random()*256);
    return {
      scenario:'A colour picker defines r, g, b each &le; 255. Is ('+v+', '+v+', '+v+') valid?',
      question:'Choose:',
      correct: v <= 255 ? 'Yes &mdash; all channels &le; 255.' : 'No &mdash; at least one channel exceeds 255.',
      distractors: v <= 255 ?
        ['No &mdash; channels must differ.','Only if sum &le; 255.','Only for greyscale.'] :
        ['Yes.','Only if sum &le; 255.','Only for greyscale.']
    };
  };

  window.conceptBank['Function Declaration'] = function() {
    return {
      scenario:'Can an axiomatic definition declare a function?',
      question:'Choose:',
      correct:'Yes &mdash; any type, including function types.',
      distractors:['No &mdash; only &Nopf;.','Only sets.','Only basic types.']
    };
  };

  window.conceptBank['Consistency Summary'] = function() {
    return {
      scenario:'The most critical requirement for an axiomatic definition is:',
      question:'Choose:',
      correct:'The predicate must be satisfiable (at least one witness exists).',
      distractors:['The name must be short.','The type must be &Nopf;.','The predicate must be trivial.']
    };
  };
})();
