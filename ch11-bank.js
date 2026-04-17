(function buildCh11Bank() {
  // Helper: pick random element from array
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }

  // ===================== 11.1 The Schema =====================

  var s1scenarios = [
    {resource:'desks', container:'Classroom', entity:'Student', label:'classroom'},
    {resource:'beds', container:'Ward', entity:'Patient', label:'hospital ward'},
    {resource:'slots', container:'Schedule', entity:'Meeting', label:'calendar'},
    {resource:'berths', container:'Marina', entity:'Yacht', label:'marina'},
    {resource:'cages', container:'Shelter', entity:'Animal', label:'shelter'},
    {resource:'tables', container:'Restaurant', entity:'Party', label:'restaurant'},
    {resource:'pads', container:'Launchpad', entity:'Rocket', label:'launchpad'},
    {resource:'rooms', container:'Hotel', entity:'Guest', label:'hotel'}
  ];

  window.conceptBank = window.conceptBank || {};

  window.conceptBank['Schema Basics'] = function() {
    var parts = pick([
      {q:'A schema consists of:', c:'A declaration part and a predicate part.', d:['Only declarations.','Only a predicate.','A constructor list.']},
      {q:'The two parts of a schema are:', c:'Declarations (variables + types) and a predicate (constraint).', d:['Name and body.','Type and value.','Constructor and base case.']},
      {q:'A schema packages:', c:'Variable declarations and a constraining predicate.', d:['Only types.','Only values.','Free type branches.']}
    ]);
    return {scenario:'', question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['Schema Forms'] = function() {
    var parts = pick([
      {q:'The horizontal form uses:', c:'<code>[ declaration | predicate ]</code> with brackets and a vertical bar.', d:['<code>Name ::= decl | pred</code>','<code>{ decl &bull; pred }</code>','<code>decl &rArr; pred</code>']},
      {q:'The vertical (box) form has:', c:'Name on top, declarations above a horizontal bar, predicate below.', d:['Predicate above, declarations below.','Everything on one line.','Name at the bottom.']},
      {q:'Horizontal and vertical forms are:', c:'Syntactically different but semantically equivalent.', d:['Always different schemas.','Only equivalent for &Nopf;.','Never interchangeable.']}
    ]);
    return {scenario:'', question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['Writing Schemas'] = function() {
    var s = pick(s1scenarios);
    return {
      scenario:'A <span class="key">' + s.label + '</span> tracks <span class="key">' + s.resource + '</span> and assigns entities, ensuring only available ' + s.resource + ' are used.',
      question:'Which schema captures this?',
      correct:'<code>' + s.container + ' &#x2259; [ ' + s.resource + ' : &Popf; ' + s.container.charAt(0) + '; assigned : ' + s.container.charAt(0) + ' &#x21A3; ' + s.entity + ' | dom assigned &sube; ' + s.resource + ' ]</code>',
      distractors:[
        '<code>' + s.container + ' == ' + s.resource + ' &and; assigned</code>',
        '<code>' + s.container + ' ::= ' + s.resource + ' | assigned</code>',
        '<code>' + s.container + ' : ' + s.container.charAt(0) + ' &harr; ' + s.entity + '</code>'
      ]
    };
  };

  window.conceptBank['Schema Structure'] = function() {
    var parts = pick([
      {q:'In horizontal form, <code>|</code> separates:', c:'Declarations (left) from the predicate (right).', d:['Types from values.','Schema name from body.','Free type alternatives.']},
      {q:'The <code>;</code> in a schema separates:', c:'Declaration groups of different types.', d:['Predicates.','Alternatives.','Constructors.']},
      {q:'The <code>,</code> in <code>x, y : &Nopf;</code> separates:', c:'Same-type variable names sharing one type annotation.', d:['Different types.','Predicates.','Schema names.']},
      {q:'Multiple predicate lines with no connective are:', c:'Implicitly conjoined (&and;) &mdash; all must hold.', d:['Disjoined (&or;).','Independent.','Only the last applies.']}
    ]);
    return {scenario:'', question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['Schema Equivalence'] = function() {
    return {
      scenario:'Schema A uses <span class="key">&#x21A3;</span> in its declaration. Schema B uses <span class="key">&rarr;</span> with an explicit injection predicate.',
      question:'Are they equivalent?',
      correct:'Yes &mdash; same variables and total constraints (hidden constraint made explicit).',
      distractors:['No &mdash; different declaration syntax.','Only if both are named the same.','Only for finite types.']
    };
  };

  window.conceptBank['Schema Naming'] = function() {
    return {
      scenario:'',
      question:'The operator <code>&#x2259;</code> in <code>Name &#x2259; [ &hellip; | &hellip; ]</code> means:',
      correct:'Define a syntactic abbreviation &mdash; Name stands for the schema text.',
      distractors:['Assert Name is a free type.','Check Name is consistent.','Declare Name as a variable.']
    };
  };

  window.conceptBank['Multi-line Readability'] = function() {
    return {
      scenario:'',
      question:'In box form, separate predicate lines with no connective are combined by:',
      correct:'Implicit conjunction (&and;).',
      distractors:['Disjunction (&or;).','Implication (&rArr;).','They are unrelated.']
    };
  };

  window.conceptBank['Omitted Predicate'] = function() {
    var s = pick(['Shelf','Playlist','Album','Drawer','Folder']);
    return {
      scenario:'<code>' + s + ' &#x2259; [ items : &Popf; Item ]</code> has <span class="key">no predicate</span>.',
      question:'What does the omitted predicate mean?',
      correct:'The predicate is <code>true</code> &mdash; all subsets of Item are valid.',
      distractors:['The schema is invalid.','Only the empty set is valid.','The schema has no inhabitants.']
    };
  };

  window.conceptBank['Re-usability'] = function() {
    return {
      scenario:'',
      question:'Schemas promote re-usability because they:',
      correct:'Encapsulate state + constraints into named units shared across specifications.',
      distractors:['Replace all types.','Eliminate proofs.','Automatically generate code.']
    };
  };

  // ===================== 11.2 Schemas as Types =====================

  var s2fields = [
    {schema:'Employee', f1:'name', f2:'salary', t1:'String', t2:'&Nopf;'},
    {schema:'Student', f1:'id', f2:'gpa', t1:'&Nopf;', t2:'&Nopf;'},
    {schema:'Product', f1:'sku', f2:'price', t1:'&Nopf;', t2:'&Nopf;'},
    {schema:'Vehicle', f1:'plate', f2:'mileage', t1:'String', t2:'&Nopf;'},
    {schema:'Patient', f1:'ward', f2:'age', t1:'&Nopf;', t2:'&Nopf;'}
  ];

  window.conceptBank['Schema Types'] = function() {
    return {
      scenario:'', question:'A schema type consists of:',
      correct:'All bindings satisfying its predicate.',
      distractors:['A single fixed binding.','Only the declaration part.','A free type constructor list.']
    };
  };

  window.conceptBank['Binding Basics'] = function() {
    return {
      scenario:'', question:'A binding is:',
      correct:'A mapping from each declared variable name to a value of its type.',
      distractors:['A single integer.','A predicate.','A free type branch.']
    };
  };

  window.conceptBank['Schema as Type'] = function() {
    var s = pick(s2fields);
    var kind = pick(['single','set']);
    if (kind === 'single') {
      return {
        scenario:'A system declares <code>current : ' + s.schema + '</code> where <span class="key">' + s.schema + '</span> is a schema.',
        question:'What is <code>current</code>?',
        correct:'A valid binding of the ' + s.schema + ' schema.',
        distractors:['The schema definition itself.','A free type constructor.','An integer.']
      };
    } else {
      return {
        scenario:'A system declares <code>items : &Popf; ' + s.schema + '</code>.',
        question:'Each element of <code>items</code> is:',
        correct:'A valid ' + s.schema + ' binding.',
        distractors:['A schema definition.','A free type.','An integer set.']
      };
    }
  };

  window.conceptBank['Declaring Schema Variables'] = function() {
    var s = pick(s2fields);
    var q = pick([
      {question:'Which accesses the ' + s.f1 + ' component?', correct:'<code>obj.' + s.f1 + '</code>', d:['<code>obj[' + s.f1 + ']</code>','<code>' + s.f1 + '(obj)</code>','<code>obj &isin; ' + s.f1 + '</code>']},
      {question:'Two bindings of ' + s.schema + ' are equal iff:', correct:'All their component values match.', d:['They share the same name.','They are the same reference.','Never.']}
    ]);
    return {
      scenario:'A system has <code>obj : ' + s.schema + '</code>.',
      question:q.question, correct:q.correct, distractors:q.d
    };
  };

  window.conceptBank['Selection Operator'] = function() {
    return {
      scenario:'', question:'The Z selection operator <code>_._</code> is used to:',
      correct:'Access a named component of a binding.',
      distractors:['Define a new schema.','Combine two schemas.','Introduce a free type.']
    };
  };

  window.conceptBank['Composite vs Cartesian'] = function() {
    return {
      scenario:'', question:'A schema type differs from a Cartesian product because components are accessed:',
      correct:'By name (e.g., <code>s.x</code>) rather than by position.',
      distractors:['By index number.','Only through quantifiers.','They are the same thing.']
    };
  };

  window.conceptBank['Binding Notation'] = function() {
    var a = randInt(1,10); var c = '{' + randInt(1,5) + ',' + randInt(6,10) + '}';
    return {
      scenario:'', question:'<code>&langle; a &#x21DD; ' + a + ', c &#x21DD; ' + c + ' &rangle;</code> represents:',
      correct:'A binding where a is bound to ' + a + ' and c is bound to ' + c + '.',
      distractors:['A schema definition.','A free type.','A set comprehension.']
    };
  };

  window.conceptBank['Schema Type Set'] = function() {
    var s = pick(s2fields);
    return {
      scenario:'A system maintains <code>all : &Popf; ' + s.schema + '</code> and wants to assert all ' + s.f2 + ' values are positive.',
      question:'Which expression works?',
      correct:'<code>&forall; x : all &bull; x.' + s.f2 + ' &gt; 0</code>',
      distractors:['<code>all.' + s.f2 + ' &gt; 0</code>','<code>' + s.f2 + '(all) &gt; 0</code>','<code>all &isin; ' + s.f2 + '</code>']
    };
  };

  window.conceptBank['Type Introduction'] = function() {
    return {
      scenario:'', question:'Schemas add which type-introduction mechanism beyond given sets, free types, power sets, and Cartesian products?',
      correct:'A composite type with named components and a constraining predicate.',
      distractors:['A recursive type.','An enumeration.','A generic type.']
    };
  };

  // ===================== 11.3 Schemas as Declarations =====================

  window.conceptBank['Schema as Declaration'] = function() {
    return {
      scenario:'', question:'A schema can be used as a declaration in:',
      correct:'Set comprehensions, lambda expressions, and quantifiers.',
      distractors:['Only set comprehensions.','Only quantifiers.','Nowhere.']
    };
  };

  window.conceptBank['Characteristic Binding'] = function() {
    return {
      scenario:'', question:'The characteristic binding &theta;S of a schema S is:',
      correct:'A binding where each component maps to the variable of the same name.',
      distractors:['A binding with all components set to zero.','The schema&rsquo;s predicate.','A free type constructor.']
    };
  };

  window.conceptBank['Schema in Set Comprehension'] = function() {
    var parts = pick([
      {s:'{ Date | day = 31 &bull; month }', c:'{jan, mar, may, jul, aug, oct, dec}', d:['{feb, apr, jun, sep, nov}','{jan, feb, mar}','&empty;']},
      {s:'{ Date | day = 1 &bull; month }', c:'All 12 months (every month has day 1).', d:['Only January.','&empty;','Only months with 31 days.']},
      {s:'{ Date | month = feb &bull; day }', c:'Valid February days (1..29).', d:['All months.','&empty;','Only 28.']}
    ]);
    return {
      scenario:'Consider the expression <code>' + parts.s + '</code>.',
      question:'What is the result?',
      correct:parts.c, distractors:parts.d
    };
  };

  window.conceptBank['Schema in Lambda'] = function() {
    var a = randInt(2,8);
    return {
      scenario:'<code>FunctionOne == (&lambda; SchemaOne &bull; a&sup2;)</code>.',
      question:'<code>FunctionOne &langle; a &#x21DD; ' + a + ', c &#x21DD; {1} &rangle;</code> = ?',
      correct:'<code>' + (a*a) + '</code>',
      distractors:['<code>' + a + '</code>','<code>{1}</code>','<code>' + (a+1) + '</code>']
    };
  };

  window.conceptBank['Schema in Quantifier'] = function() {
    var parts = pick([
      {s:'&exist; Date &bull; month = feb &and; day = 29', c:'<code>true</code> &mdash; Feb 29 is a valid Date.', d:['<code>false</code>','Undefined.','Only in leap years.']},
      {s:'&forall; Date &bull; day &le; 30', c:'<code>false</code> &mdash; March has 31 days.', d:['<code>true</code>','Undefined.','Only for some months.']},
      {s:'&forall; SchemaTwo &bull; a &isin; c', c:'<code>true</code> &mdash; SchemaTwo requires a &isin; c.', d:['<code>false</code>','Undefined.','Only for &Nopf;.']},
      {s:'&forall; SchemaOne &bull; a &isin; c', c:'<code>false</code> &mdash; SchemaOne has no predicate; counterexample exists.', d:['<code>true</code>','Undefined.','Only for &Nopf;.']}
    ]);
    return {
      scenario:'', question:'<code>' + parts.s + '</code> evaluates to:',
      correct:parts.c, distractors:parts.d
    };
  };

  window.conceptBank['Theta Notation'] = function() {
    var parts = pick([
      {s:'Date', vars:'month, day', bind:'&langle; month &#x21DD; month, day &#x21DD; day &rangle;'},
      {s:'SchemaTwo', vars:'a, c', bind:'&langle; a &#x21DD; a, c &#x21DD; c &rangle;'},
      {s:'SchemaOne', vars:'a, c', bind:'&langle; a &#x21DD; a, c &#x21DD; c &rangle;'}
    ]);
    return {
      scenario:'Variables ' + parts.vars + ' are in scope.',
      question:'&theta;' + parts.s + ' equals:',
      correct:'<code>' + parts.bind + '</code>',
      distractors:['<code>&langle; &rangle;</code> (empty binding).','Undefined.','<code>' + parts.s + '</code> itself.']
    };
  };

  window.conceptBank['Schema Abbreviation'] = function() {
    return {
      scenario:'', question:'The declaration <code>a : S</code> abbreviates:',
      correct:'<code>a : { S &bull; &theta;S }</code> &mdash; bindings satisfying S.',
      distractors:['<code>a == S</code>','<code>a ::= S</code>','<code>a &isin; S</code>']
    };
  };

  window.conceptBank['Characteristic Tuple'] = function() {
    return {
      scenario:'', question:'When a set comprehension has no term part, the type depends on:',
      correct:'The characteristic tuple of the declaration.',
      distractors:['The predicate only.','The schema name.','Nothing &mdash; always &Nopf;.']
    };
  };

  window.conceptBank['Subrange Type'] = function() {
    return {
      scenario:'', question:'A schema used as a subrange type means:',
      correct:'Only bindings satisfying the predicate belong to the type.',
      distractors:['All bindings belong.','No bindings belong.','Only the first binding.']
    };
  };

  window.conceptBank['Quantifier Equivalence'] = function() {
    return {
      scenario:'', question:'<code>&forall; SchemaTwo &bull; a &isin; c</code> is equivalent to:',
      correct:'<code>&forall; s : SchemaTwo &bull; s.a &isin; s.c</code>',
      distractors:['<code>&exist; SchemaTwo &bull; a &isin; c</code>','<code>SchemaTwo &rArr; a &isin; c</code>','<code>a &isin; c</code>']
    };
  };

  // ===================== 11.4 Schemas as Predicates =====================

  window.conceptBank['Schema as Predicate'] = function() {
    return {
      scenario:'', question:'When a schema is used as a predicate:',
      correct:'Its declaration part is discarded and only its constraints remain.',
      distractors:['Its declarations introduce new variables.','It defines a new schema.','It creates a free type.']
    };
  };

  window.conceptBank['Normalisation Basics'] = function() {
    return {
      scenario:'', question:'Normalisation means:',
      correct:'Rewriting a schema so all constraints appear in the predicate, with declarations in widest (canonical) form.',
      distractors:['Removing the predicate.','Renaming all variables.','Converting to a free type.']
    };
  };

  window.conceptBank['Predicate Application'] = function() {
    var parts = pick([
      {ctx:'source, destination : Address; data : Data', schema:'FromA', c:'<code>source = A</code>', d:['<code>source : Address</code> (re-declaration).','<code>destination = A</code>','Nothing.']},
      {ctx:'a : &Zopf;; c : &Popf; &Zopf;', schema:'SchemaTwo', c:'<code>a &isin; c &and; c &ne; &empty;</code>', d:['<code>a : &Zopf;</code> (re-declaration).','<code>a = c</code>','No constraint.']},
      {ctx:'a : &Zopf;; c : &Popf; &Zopf;', schema:'SchemaOne (no predicate)', c:'<code>true</code> &mdash; no additional constraint.', d:['<code>a &isin; c</code>','<code>c &ne; &empty;</code>','A type error.']}
    ]);
    return {
      scenario:'Variables <code>' + parts.ctx + '</code> are in scope.',
      question:'Using <span class="key">' + parts.schema + '</span> as predicate imposes:',
      correct:parts.c, distractors:parts.d
    };
  };

  window.conceptBank['Hidden Constraints'] = function() {
    var parts = pick([
      {q:'SchemaFour declares <code>a : &Nopf;; c : &Popf; &Nopf;</code>. Hidden constraints are:', c:'<code>a &isin; &Nopf; &and; c &isin; &Popf; &Nopf;</code>.', d:['No hidden constraints.','<code>a = 0</code>','<code>c = &empty;</code>']},
      {q:'Are SchemaFour and SchemaTwo equivalent?', c:'No &mdash; SchemaFour has additional type constraints.', d:['Yes &mdash; same predicate.','Only if normalised.','Depends on values.']},
      {q:'A declaration <code>x : &Nopf;</code> hides:', c:'<code>x &isin; &Nopf;</code> (x is a natural number).', d:['<code>x = 0</code>','<code>x &gt; 0</code>','No hidden constraint.']}
    ]);
    return {scenario:'', question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['Normalising Schemas'] = function() {
    var parts = pick([
      {q:'Normalising SchemaFour produces predicate:', c:'<code>a &isin; &Nopf; &and; c &isin; &Popf; &Nopf; &and; a &isin; c &and; c &ne; &empty;</code>', d:['<code>a &isin; c &and; c &ne; &empty;</code> only.','<code>a = 0</code>','<code>true</code>']},
      {q:'After normalisation, declarations use:', c:'Widest possible types (canonical form).', d:['Narrowest types.','No types.','Free types only.']},
      {q:'Purpose of normalisation:', c:'Avoid confusion when comparing schemas with different declaration types.', d:['Remove the predicate.','Convert to free type.','Rename variables.']}
    ]);
    return {scenario:'', question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['Declaration Types'] = function() {
    return {
      scenario:'', question:'A declaration <code>x : &Nopf;</code> hides the constraint:',
      correct:'<code>x &isin; &Nopf;</code> (x is a natural number).',
      distractors:['<code>x = 0</code>','<code>x &gt; 0</code>','No hidden constraint.']
    };
  };

  window.conceptBank['Canonical Form'] = function() {
    return {
      scenario:'', question:'In canonical (normalised) form, all declarations use:',
      correct:'The widest applicable types (e.g., &Zopf; instead of &Nopf;).',
      distractors:['The narrowest types.','Free types only.','No types at all.']
    };
  };

  window.conceptBank['Constraint Extraction'] = function() {
    return {
      scenario:'SchemaFour normalised has 4 conjuncts. Two from the original predicate; two from:',
      question:'Where do the extra constraints come from?',
      correct:'The declaration types (<code>a &isin; &Nopf;</code> and <code>c &isin; &Popf; &Nopf;</code>).',
      distractors:['The schema name.','A free type definition.','Nowhere &mdash; invented.']
    };
  };

  window.conceptBank['Predicate Equivalence'] = function() {
    return {
      scenario:'', question:'Using SchemaTwo vs SchemaFour as predicate (same variables in scope):',
      correct:'SchemaFour imposes stricter constraints (type membership added).',
      distractors:['They impose the same constraints.','SchemaTwo is stricter.','Neither imposes any constraint.']
    };
  };

  window.conceptBank['Type Widening'] = function() {
    return {
      scenario:'', question:'Why widen &Nopf; to &Zopf; during normalisation?',
      correct:'So all constraint info lives in the predicate, giving a unique canonical form.',
      distractors:['To allow negative numbers.','To remove the predicate.','To convert to a free type.']
    };
  };

})();
