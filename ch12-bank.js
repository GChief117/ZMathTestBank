(function buildCh12Bank() {
  window.conceptBank = window.conceptBank || {};

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // ===================== 12.1 Conjunction =====================
  // Symbols: &and; == &sube; &rArr; &Popf; dom ran &theta; &Nopf;

  var conjScenarios = [
    {place:'gym', schA:'MemberRegistry', schB:'VIPPolicy', merged:'VIPGym', varA:'equipment : &Popf; Machine', varB:'vips : &Popf; Member', shared:'booked', sharedType:'Machine &#8614; Member', invA:'dom booked &sube; equipment', invB:'tier = premium &rArr; ran booked &sube; vips'},
    {place:'hospital', schA:'Ward', schB:'QuarantinePolicy', merged:'SafeWard', varA:'beds : &Popf; Bed', varB:'infectious : &Popf; Patient', shared:'assigned', sharedType:'Bed &#8614; Patient', invA:'dom assigned &sube; beds', invB:'isolation = active &rArr; ran assigned &sube; infectious'},
    {place:'airport', schA:'GateSchedule', schB:'SecurityPolicy', merged:'SecureGate', varA:'gates : &Popf; Gate', varB:'cleared : &Popf; Passenger', shared:'boarding', sharedType:'Gate &#8614; Flight', invA:'dom boarding &sube; gates', invB:'level = high &rArr; ran boarding &sube; cleared'},
    {place:'school', schA:'Classroom', schB:'SafetyPolicy', merged:'SafeRoom', varA:'desks : &Popf; Desk', varB:'certified : &Popf; Teacher', shared:'roster', sharedType:'Desk &#8614; Student', invA:'dom roster &sube; desks', invB:'drill = active &rArr; ran roster &sube; certified'},
    {place:'parking garage', schA:'ParkingLot', schB:'PermitPolicy', merged:'PermitParking', varA:'spaces : &Popf; Space', varB:'holders : &Popf; Driver', shared:'parked', sharedType:'Space &#8614; Vehicle', invA:'dom parked &sube; spaces', invB:'zone = reserved &rArr; ran parked &sube; holders'}
  ];

  window.conceptBank['Schema Conjunction Basics'] = function() {
    var parts = pick([
      {q:'Schema conjunction <code>S &and; T</code> produces:', c:'A schema that merges declarations and conjoins predicates.', d:['A schema that keeps only S\'s declarations.','A schema that disjoins predicates.','A schema with no predicate.']},
      {q:'In <code>S &and; T</code>, shared variables must:', c:'Have matching types in both schemas.', d:['Be renamed in T.','Be removed from the result.','Have different types.']},
      {q:'The predicate of <code>S &and; T</code> is:', c:'<code>pred(S) &and; pred(T)</code> &mdash; both constraints hold.', d:['<code>pred(S) &or; pred(T)</code> &mdash; either suffices.','<code>pred(S) &rArr; pred(T)</code> &mdash; implication.','Only <code>pred(S)</code>.']},
      {q:'Schema conjunction is used to:', c:'Combine independently-specified aspects into one schema.', d:['Replace one schema with another.','Delete shared variables.','Negate a schema\'s predicate.']},
      {q:'If S declares <code>x : &Nopf;</code> and T declares <code>x : &Popf; &Nopf;</code>, then <code>S &and; T</code> is:', c:'Undefined &mdash; types of shared variable x do not match.', d:['Valid &mdash; types are automatically widened.','Valid &mdash; only S\'s type is kept.','Valid &mdash; only T\'s type is kept.']}
    ]);
    return {scenario:'', question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['Schema Conjunction'] = function() {
    var s = pick(conjScenarios);
    var scenarios = [
      {scenario:'A <span class="key">' + s.place + '</span> combines a <span class="key">' + s.schA + '</span> with a <span class="key">' + s.schB + '</span>. Both schemas share variable <code>' + s.shared + '</code>.',
       question:'Which correctly defines the merged schema?',
       correct:'<code>' + s.merged + ' == ' + s.schA + ' &and; ' + s.schB + '</code>',
       distractors:['<code>' + s.merged + ' == ' + s.schA + ' &or; ' + s.schB + '</code>','<code>' + s.merged + ' == ' + s.schA + ' \\ ' + s.schB + '</code>','<code>' + s.merged + ' == &not;' + s.schA + ' &and; ' + s.schB + '</code>']},
      {scenario:'A <span class="key">' + s.place + '</span> needs both <span class="key">' + s.invA + '</span> and <span class="key">' + s.invB + '</span> to hold simultaneously.',
       question:'Which operator combines these constraints?',
       correct:'<code>&and;</code> &mdash; schema conjunction conjoins both predicates.',
       distractors:['<code>&or;</code> &mdash; schema disjunction.','<code>&not;</code> &mdash; schema negation.','<code>>></code> &mdash; schema piping.']},
      {scenario:'A <span class="key">' + s.place + '</span> has <code>' + s.schA + '</code> declaring <code>' + s.varA + '</code> and <code>' + s.schB + '</code> declaring <code>' + s.varB + '</code>. Both declare <code>' + s.shared + ' : ' + s.sharedType + '</code>.',
       question:'What does <code>' + s.schA + ' &and; ' + s.schB + '</code> produce?',
       correct:'A schema with all variables from both, and <code>' + s.invA + ' &and; ' + s.invB + '</code>.',
       distractors:['A schema with only ' + s.schA + '\'s variables.','A schema with two copies of <code>' + s.shared + '</code>.','An undefined result because variables overlap.']},
      {scenario:'A <span class="key">' + s.place + '</span> defines <code>' + s.merged + ' == ' + s.schA + ' &and; ' + s.schB + '</code>. A new requirement adds <code>cap : &Nopf;</code>.',
       question:'How do you add the new constraint?',
       correct:'Conjoin with a third schema: <code>' + s.merged + ' &and; CapacityLimit</code>.',
       distractors:['Replace the existing conjunction with the new schema.','Use <code>&or;</code> to combine alternatives.','Negate the existing conjunction first.']},
      {scenario:'A <span class="key">' + s.place + '</span> merges <code>' + s.schA + '</code> and <code>' + s.schB + '</code>. The resulting schema must satisfy both <code>' + s.invA + '</code> and <code>' + s.invB + '</code>.',
       question:'What happens if the shared variable <code>' + s.shared + '</code> has compatible types?',
       correct:'The conjunction is well-defined; <code>' + s.shared + '</code> appears once with both constraints.',
       distractors:['The conjunction duplicates <code>' + s.shared + '</code>.','The conjunction drops the shared variable.','The conjunction fails.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Separation of Concerns'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">hospital</span> specifies <span class="key">bed allocation</span> in one schema and <span class="key">infection control</span> in another, then combines them.',
       question:'Which principle does this illustrate?',
       correct:'Separation of concerns &mdash; specify aspects independently, combine via <code>&and;</code>.',
       distractors:['Type widening &mdash; broaden variable types.','Schema negation &mdash; negate one schema.','Schema piping &mdash; connect output to input.']},
      {scenario:'A <span class="key">kitchen</span> tracks <span class="key">ingredient stock</span> separately from <span class="key">allergen policies</span>. Both are combined into one specification.',
       question:'Why specify them separately first?',
       correct:'Each concern is simpler alone; conjunction merges them without entangling logic.',
       distractors:['Separate schemas cannot share variables.','Conjunction removes one of the predicates.','Only one schema can have a state invariant.']},
      {scenario:'A <span class="key">parking garage</span> has a <span class="key">capacity schema</span> and a <span class="key">permit schema</span>. Neither author needs to know the other\'s details.',
       question:'What enables this independent authoring?',
       correct:'Separation of concerns &mdash; each schema is self-contained; <code>&and;</code> merges them later.',
       distractors:['Schema negation &mdash; one negates the other.','Schema hiding &mdash; variables are hidden.','Schema piping &mdash; output feeds input.']},
      {scenario:'An <span class="key">elevator</span> system specifies <span class="key">weight limits</span> in one schema and <span class="key">floor access</span> in another.',
       question:'How does separation of concerns help maintainability?',
       correct:'Changing one aspect (e.g., weight limit) does not require editing the other schema.',
       distractors:['Both schemas must be edited together.','The conjunction automatically removes stale variables.','Only one schema survives conjunction.']},
      {scenario:'A <span class="key">school</span> specifies <span class="key">enrollment</span> and <span class="key">grading</span> in two schemas, then forms <code>FullRecord == Enrollment &and; Grading</code>.',
       question:'Which Z operator enables separation of concerns?',
       correct:'<code>&and;</code> &mdash; schema conjunction combines independently-specified schemas.',
       distractors:['<code>&or;</code> &mdash; schema disjunction offers alternatives.','<code>&not;</code> &mdash; schema negation inverts a predicate.','<code>&exist;</code> &mdash; existential quantification hides a variable.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Type Compatibility'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> schema declares <code>booked : Machine &#8614; Member</code>. A <span class="key">VIP policy</span> schema also declares <code>booked : Machine &#8614; Member</code>.',
       question:'Is the conjunction well-defined?',
       correct:'Yes &mdash; shared variable <code>booked</code> has matching types in both schemas.',
       distractors:['No &mdash; shared variables are never allowed.','No &mdash; one must rename <code>booked</code>.','Only if <code>booked</code> is removed from one schema.']},
      {scenario:'Schema <code>A</code> declares <code>count : &Nopf;</code>. Schema <code>B</code> declares <code>count : &Popf; &Nopf;</code>. You attempt <code>A &and; B</code>.',
       question:'What is the result?',
       correct:'Undefined &mdash; <code>count</code> has type <code>&Nopf;</code> in A but <code>&Popf; &Nopf;</code> in B.',
       distractors:['Valid &mdash; the wider type is chosen.','Valid &mdash; both types are kept separately.','Valid &mdash; the narrower type is chosen.']},
      {scenario:'An <span class="key">airport</span> schema declares <code>flights : &Popf; Flight</code>. A <span class="key">security</span> schema declares <code>flights : Flight &#8614; Gate</code>.',
       question:'Can these two schemas be conjoined?',
       correct:'No &mdash; <code>flights</code> has incompatible types (<code>&Popf; Flight</code> vs <code>Flight &#8614; Gate</code>).',
       distractors:['Yes &mdash; both mention Flight.','Yes &mdash; the relation type subsumes the set type.','Yes &mdash; types are ignored in conjunction.']},
      {scenario:'Schema <code>S</code> has <code>x : &Nopf;</code>, <code>y : &Nopf;</code>. Schema <code>T</code> has <code>y : &Nopf;</code>, <code>z : &Nopf;</code>.',
       question:'In <code>S &and; T</code>, which variables appear?',
       correct:'<code>x</code>, <code>y</code>, <code>z</code> &mdash; shared <code>y</code> appears once (types match).',
       distractors:['Only <code>y</code> (shared variables only).','<code>x</code>, <code>y</code>, <code>y</code>, <code>z</code> (duplicated).','<code>x</code> and <code>z</code> only (shared removed).']},
      {scenario:'A <span class="key">hotel</span> reservation schema declares <code>rooms : &Popf; Room</code>. A <span class="key">cleaning</span> schema also declares <code>rooms : &Popf; Room</code>.',
       question:'Why does type compatibility matter for conjunction?',
       correct:'Shared variables must denote the same thing &mdash; matching types ensure this.',
       distractors:['Type compatibility is optional for conjunction.','Mismatched types cause automatic renaming.','Only the first schema\'s type is used.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Schema Inclusion'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> defines <code>VIPGym</code> by <span class="key">including GymRegistry</span> in the declaration part, then adding <code>vips : &Popf; Member</code>.',
       question:'What is schema inclusion equivalent to?',
       correct:'Schema conjunction &mdash; including S in a declaration is the same as <code>&and; S</code>.',
       distractors:['Schema disjunction &mdash; offering alternatives.','Schema negation &mdash; inverting predicates.','Schema hiding &mdash; removing variables.']},
      {scenario:'A <span class="key">hospital</span> rewrites <code>SafeWard</code> by including <code>Ward</code> in the declaration rather than using explicit <code>&and;</code>.',
       question:'Does the resulting schema change?',
       correct:'No &mdash; inclusion unfolds Ward\'s components identically to conjunction.',
       distractors:['Yes &mdash; inclusion drops Ward\'s predicate.','Yes &mdash; inclusion renames shared variables.','Yes &mdash; inclusion adds an extra constraint.']},
      {scenario:'An <span class="key">ATM</span> schema includes <code>BankAccount</code> in its declaration, adding <code>pin : &Nopf;</code> and <code>pin = storedPin</code>.',
       question:'Which form is this equivalent to?',
       correct:'<code>ATMSession == BankAccount &and; PinCheck</code> where PinCheck has the pin-related parts.',
       distractors:['<code>ATMSession == BankAccount &or; PinCheck</code>.','<code>ATMSession == &not;BankAccount</code>.','<code>ATMSession == BankAccount \\ PinCheck</code>.']},
      {scenario:'A <span class="key">school</span> schema includes both <code>Enrollment</code> and <code>Grading</code> in its declaration part.',
       question:'What does including two schemas in the declaration achieve?',
       correct:'Conjunction of both &mdash; all declarations merged and predicates conjoined.',
       distractors:['Only the first included schema takes effect.','Disjunction of both &mdash; either may apply.','Variables from the second schema are hidden.']},
      {scenario:'A <span class="key">library</span> defines <code>LoanPolicy</code> by including <code>Catalog</code> in the declaration and adding <code>maxLoans : &Nopf;</code>.',
       question:'What advantage does inclusion offer over explicit <code>&and;</code>?',
       correct:'Hierarchical structure &mdash; shows the new schema extends an existing one.',
       distractors:['Inclusion removes shared variables automatically.','Inclusion changes variable types.','Inclusion prevents predicate conjunction.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Characteristic Binding'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">theatre</span> schema <code>BoxOffice</code> has components <code>seating</code> and <code>sold</code>. You write <code>&theta;BoxOffice</code>.',
       question:'What does <code>&theta;BoxOffice</code> denote?',
       correct:'A binding that maps each component of BoxOffice to its current value.',
       distractors:['The negation of BoxOffice.','The type of BoxOffice.','A new schema with primed variables.']},
      {scenario:'A <span class="key">gym</span> schema <code>GymRegistry</code> has <code>equipment</code> and <code>booked</code>. You need to refer to its state as a single value.',
       question:'Which expression gives the state as one value?',
       correct:'<code>&theta;GymRegistry</code> &mdash; the characteristic binding.',
       distractors:['<code>dom GymRegistry</code> &mdash; the domain.','<code>&not;GymRegistry</code> &mdash; the negation.','<code>ran GymRegistry</code> &mdash; the range.']},
      {scenario:'An <span class="key">elevator</span> schema <code>Lift</code> has components <code>floor : &Nopf;</code> and <code>doors : Status</code>. You write <code>&theta;Lift</code>.',
       question:'What does <code>&theta;Lift</code> produce?',
       correct:'A binding <code>&#10216; floor &#10509; n, doors &#10509; s &#10217;</code> for current values n, s.',
       distractors:['A set of all possible floors.','A predicate constraining the lift.','A new schema with extra variables.']},
      {scenario:'A <span class="key">kitchen</span> schema <code>Pantry</code> has <code>items : &Popf; Ingredient</code> and <code>stock : Ingredient &#8614; &Nopf;</code>. A function requires the state as an argument.',
       question:'How do you pass the current state?',
       correct:'Pass <code>&theta;Pantry</code> &mdash; the characteristic binding packages all components.',
       distractors:['Pass <code>dom Pantry</code>.','Pass <code>&not;Pantry</code>.','Pass <code>Pantry\'</code>.']},
      {scenario:'A <span class="key">parking garage</span> uses <code>&theta;ParkingLot</code> and <code>&theta;ParkingLot\'</code> in a before/after comparison.',
       question:'What does <code>&theta;ParkingLot\'</code> refer to?',
       correct:'The characteristic binding of the after-state (primed components).',
       distractors:['The negation of the parking lot state.','The domain of the after-state.','A hidden variable in the schema.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Schema Abbreviation'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> writes <code>VIPGym == GymRegistry &and; VIPPolicy</code> to name the combined schema.',
       question:'What does <code>==</code> mean here?',
       correct:'Schema abbreviation &mdash; VIPGym is defined as a shorthand for the right-hand side.',
       distractors:['Equality test &mdash; checks if both sides are equal.','Implication &mdash; VIPGym implies the conjunction.','Subset &mdash; VIPGym is a subset of the conjunction.']},
      {scenario:'A <span class="key">hospital</span> defines <code>SafeWard == Ward &and; QuarantinePolicy</code>.',
       question:'Can <code>SafeWard</code> be used anywhere the expanded form would appear?',
       correct:'Yes &mdash; <code>==</code> introduces a name for the schema expression; they are interchangeable.',
       distractors:['No &mdash; abbreviations lose predicate information.','No &mdash; only the expanded form is valid in proofs.','Only if the schemas have no shared variables.']},
      {scenario:'An <span class="key">airport</span> defines <code>SecureGate == GateSchedule &and; SecurityPolicy</code>.',
       question:'Which symbol introduces the abbreviation?',
       correct:'<code>==</code> &mdash; the schema abbreviation operator.',
       distractors:['<code>&sube;</code> &mdash; the subset operator.','<code>&rArr;</code> &mdash; the implication operator.','<code>&and;</code> &mdash; the conjunction operator.']},
      {scenario:'A <span class="key">school</span> wants to name a conjunction of three schemas: <code>Enrollment &and; Grading &and; Attendance</code>.',
       question:'How do you abbreviate this?',
       correct:'<code>FullRecord == Enrollment &and; Grading &and; Attendance</code>.',
       distractors:['<code>FullRecord &sube; Enrollment &and; Grading &and; Attendance</code>.','<code>FullRecord &rArr; Enrollment &and; Grading &and; Attendance</code>.','<code>FullRecord &or; Enrollment &and; Grading &and; Attendance</code>.']},
      {scenario:'A <span class="key">library</span> defines <code>LoanSystem == Catalog &and; MemberRecords</code>. Later it writes <code>LoanSystem &and; FinePolicy</code>.',
       question:'Is the second expression valid?',
       correct:'Yes &mdash; <code>LoanSystem</code> expands to its definition, then conjunction proceeds normally.',
       distractors:['No &mdash; abbreviated schemas cannot be conjoined again.','No &mdash; <code>==</code> prevents further operations.','Only if FinePolicy has no variables.']}
    ];
    return pick(scenarios);
  };

  // ===================== 12.2 Decoration =====================
  // Symbols: ' ? ! &Delta; &Xi; &theta; &isin; &cup; \ &#8614; &empty; &sube; ==

  window.conceptBank['Decoration Basics'] = function() {
    var parts = pick([
      {q:'Decorating a schema with <code>\'</code> (prime) does what?',
       c:'Primes every component name &mdash; <code>x</code> becomes <code>x\'</code> (after-state).',
       d:['Negates the predicate.','Removes all variables.','Adds input variables.']},
      {q:'The decoration <code>?</code> on a variable indicates:',
       c:'An input to the operation.',
       d:['An output from the operation.','The after-state.','A hidden variable.']},
      {q:'The decoration <code>!</code> on a variable indicates:',
       c:'An output from the operation.',
       d:['An input to the operation.','The before-state.','A negated variable.']},
      {q:'Why does Z use decorations on schema components?',
       c:'To distinguish before-state, after-state, inputs, and outputs by naming convention.',
       d:['To make schemas harder to read.','To replace type annotations.','To remove variables from the signature.']},
      {q:'Priming a schema <code>S\'</code> produces:',
       c:'A schema with every component of S renamed with a prime suffix.',
       d:['A schema with a negated predicate.','A schema with all variables hidden.','A schema with input decorations.']}
    ]);
    return {scenario:'', question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['State Decoration'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> schema <code>GymState</code> has <code>members : &Popf; Member</code>. The operation describes the <span class="key">after-state</span>.',
       question:'How is the after-state variable written?',
       correct:'<code>members\' : &Popf; Member</code> &mdash; primed to denote the after-state.',
       distractors:['<code>members? : &Popf; Member</code> &mdash; input decoration.','<code>members! : &Popf; Member</code> &mdash; output decoration.','<code>members : &Popf; Member</code> &mdash; unchanged.']},
      {scenario:'A <span class="key">hospital</span> operation changes the <span class="key">ward assignment</span>. Before-state is <code>assigned</code>, after-state is <code>assigned\'</code>.',
       question:'What does the prime decoration signify?',
       correct:'The value of the variable after the operation executes.',
       distractors:['The variable is an input parameter.','The variable is hidden from the signature.','The variable is negated.']},
      {scenario:'An <span class="key">ATM</span> operation withdraws cash. Before: <code>balance : &Nopf;</code>. After: <code>balance\' : &Nopf;</code>.',
       question:'Which relates before and after?',
       correct:'<code>balance\' = balance - amount?</code> &mdash; after-state computed from before-state and input.',
       distractors:['<code>balance = balance\' - amount?</code> &mdash; reversed direction.','<code>balance! = balance - amount?</code> &mdash; wrong decoration.','<code>balance\' = amount? - balance</code> &mdash; subtraction reversed.']},
      {scenario:'A <span class="key">parking garage</span> operation adds a car. Before: <code>parked : &Popf; Vehicle</code>. After: <code>parked\'</code>.',
       question:'Which expresses adding <code>car?</code> to the set?',
       correct:'<code>parked\' = parked &cup; {car?}</code>.',
       distractors:['<code>parked\' = parked \\ {car?}</code> &mdash; this removes.','<code>parked\' = parked &and; {car?}</code> &mdash; wrong operator.','<code>parked\' = &empty;</code> &mdash; empties the set.']},
      {scenario:'An <span class="key">elevator</span> operation moves to a new floor. Before: <code>floor : &Nopf;</code>. After: <code>floor\' : &Nopf;</code>.',
       question:'Which captures moving to <code>dest?</code>?',
       correct:'<code>floor\' = dest?</code> &mdash; after-state equals the input destination.',
       distractors:['<code>floor = dest?</code> &mdash; constrains before-state only.','<code>floor! = dest?</code> &mdash; wrong decoration for state.','<code>floor\' = floor</code> &mdash; this is no change.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Delta and Xi Conventions'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> operation may change the member list. The schema includes <code>&Delta;GymState</code>.',
       question:'What does <code>&Delta;GymState</code> introduce?',
       correct:'Both <code>GymState</code> (before) and <code>GymState\'</code> (after) &mdash; state may change.',
       distractors:['Only <code>GymState</code> &mdash; no after-state.','Only <code>GymState\'</code> &mdash; no before-state.','A negated version of GymState.']},
      {scenario:'A <span class="key">hospital</span> query reads ward data but changes nothing. It uses <code>&Xi;Ward</code>.',
       question:'What does <code>&Xi;Ward</code> guarantee?',
       correct:'<code>&theta;Ward\' = &theta;Ward</code> &mdash; the state is unchanged by the operation.',
       distractors:['The state may change arbitrarily.','Only the predicate is preserved.','The before-state is hidden.']},
      {scenario:'An <span class="key">ATM</span> displays the <span class="key">balance</span> without modifying it. Which convention applies?',
       question:'Which schema convention should the query use?',
       correct:'<code>&Xi;Account</code> &mdash; read-only, state unchanged.',
       distractors:['<code>&Delta;Account</code> &mdash; allows state change.','<code>&not;Account</code> &mdash; negates the state.','<code>Account\'</code> &mdash; only the after-state.']},
      {scenario:'A <span class="key">school</span> operation updates a student\'s grade. The state will change.',
       question:'Which convention captures a state-changing operation?',
       correct:'<code>&Delta;GradeBook</code> &mdash; includes before and after state; change permitted.',
       distractors:['<code>&Xi;GradeBook</code> &mdash; this prohibits change.','<code>&not;GradeBook</code> &mdash; this negates the schema.','<code>GradeBook</code> &mdash; this is only the before-state.']},
      {scenario:'A <span class="key">library</span> operation checks if a book is available but does not lend it out.',
       question:'Which convention ensures the catalog is unchanged?',
       correct:'<code>&Xi;Catalog</code> &mdash; <code>&theta;Catalog\' = &theta;Catalog</code>.',
       distractors:['<code>&Delta;Catalog</code> &mdash; permits changes.','<code>&exist; Catalog</code> &mdash; hides the catalog.','<code>&not;Catalog</code> &mdash; negates the catalog.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Input and Output Convention'] = function() {
    var parts = pick([
      {q:'In Z, the <code>?</code> suffix on a variable name means:',
       c:'The variable is an input to the operation.',
       d:['The variable is an output.','The variable is primed (after-state).','The variable is hidden.']},
      {q:'The <code>!</code> suffix on a variable name means:',
       c:'The variable is an output from the operation.',
       d:['The variable is an input.','The variable is unchanged.','The variable is negated.']},
      {q:'An operation schema that takes a name and produces a confirmation would declare:',
       c:'<code>name? : String</code> (input) and <code>confirm! : Response</code> (output).',
       d:['<code>name : String</code> and <code>confirm : Response</code> &mdash; no decorations.','<code>name\' : String</code> and <code>confirm\' : Response</code> &mdash; primed.','<code>name! : String</code> and <code>confirm? : Response</code> &mdash; reversed.']},
      {q:'Why does Z distinguish inputs (<code>?</code>) from outputs (<code>!</code>)?',
       c:'To clearly separate data flowing into vs. out of an operation.',
       d:['Decoration is purely cosmetic.','Only outputs affect the state.','Inputs must be natural numbers.']},
      {q:'In an ATM withdrawal, <code>amount?</code> and <code>receipt!</code> represent:',
       c:'<code>amount?</code> is the input (how much to withdraw); <code>receipt!</code> is the output.',
       d:['Both are inputs.','Both are outputs.','<code>amount?</code> is the after-state.']}
    ]);
    return {scenario:'', question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['Input Output Convention'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> operation registers a new member. The member\'s <span class="key">name</span> is provided and a <span class="key">card number</span> is returned.',
       question:'Which declarations capture the input and output?',
       correct:'<code>name? : String; cardNum! : &Nopf;</code>.',
       distractors:['<code>name! : String; cardNum? : &Nopf;</code> &mdash; reversed.','<code>name\' : String; cardNum\' : &Nopf;</code> &mdash; primed.','<code>name : String; cardNum : &Nopf;</code> &mdash; no decoration.']},
      {scenario:'A <span class="key">hospital</span> admits a <span class="key">patient</span> (input) and assigns a <span class="key">bed number</span> (output).',
       question:'Which uses the correct I/O convention?',
       correct:'<code>patient? : Person; bed! : &Nopf;</code>.',
       distractors:['<code>patient! : Person; bed? : &Nopf;</code> &mdash; swapped.','<code>patient\' : Person; bed\' : &Nopf;</code> &mdash; after-state.','<code>patient : Person; bed : &Nopf;</code> &mdash; undecorated.']},
      {scenario:'An <span class="key">airport</span> check-in takes a <span class="key">ticket</span> and returns a <span class="key">boarding pass</span>.',
       question:'Which correctly declares input and output?',
       correct:'<code>ticket? : Ticket; pass! : BoardingPass</code>.',
       distractors:['<code>ticket! : Ticket; pass? : BoardingPass</code>.','<code>ticket\' : Ticket; pass\' : BoardingPass</code>.','<code>ticket : Ticket; pass : BoardingPass</code>.']},
      {scenario:'A <span class="key">kitchen</span> order system takes a <span class="key">dish name</span> and outputs a <span class="key">wait time</span>.',
       question:'Which uses the correct decoration?',
       correct:'<code>dish? : DishName; waitTime! : &Nopf;</code>.',
       distractors:['<code>dish! : DishName; waitTime? : &Nopf;</code>.','<code>dish : DishName; waitTime : &Nopf;</code>.','<code>dish\' : DishName; waitTime\' : &Nopf;</code>.']},
      {scenario:'A <span class="key">library</span> search takes a <span class="key">keyword</span> and returns a <span class="key">list of titles</span>.',
       question:'Which correctly separates input from output?',
       correct:'<code>keyword? : String; titles! : &Popf; Title</code>.',
       distractors:['<code>keyword! : String; titles? : &Popf; Title</code>.','<code>keyword\' : String; titles\' : &Popf; Title</code>.','<code>keyword : String; titles : &Popf; Title</code>.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Operation Schema'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> operation <code>Register</code> adds a member. It includes <code>&Delta;GymState</code>, <code>name? : String</code>, and <code>card! : &Nopf;</code>.',
       question:'What does including <code>&Delta;GymState</code> provide?',
       correct:'Both before-state and after-state variables for GymState.',
       distractors:['Only the after-state.','Only the before-state.','A negated version of GymState.']},
      {scenario:'A <span class="key">hospital</span> operation <code>Admit</code> includes <code>&Delta;Ward</code>. It must change <code>assigned</code>.',
       question:'Why does <code>Admit</code> include <code>&Delta;Ward</code> rather than <code>&Xi;Ward</code>?',
       correct:'<code>&Delta;</code> allows the state to change; <code>&Xi;</code> would force it unchanged.',
       distractors:['<code>&Delta;</code> hides the before-state.','<code>&Xi;</code> also allows changes.','<code>&Delta;</code> removes the invariant.']},
      {scenario:'An <span class="key">ATM</span> operation <code>Withdraw</code> includes <code>&Delta;Account</code>, <code>amount? : &Nopf;</code>, <code>receipt! : Receipt</code>.',
       question:'What makes this an operation schema?',
       correct:'It combines state change (<code>&Delta;</code>) with inputs (<code>?</code>) and outputs (<code>!</code>).',
       distractors:['It only declares variables without constraints.','It uses <code>&Xi;</code> for read-only access.','It has no predicate.']},
      {scenario:'A <span class="key">school</span> operation <code>UpdateGrade</code> includes <code>&Delta;GradeBook</code> and <code>student? : Student</code>.',
       question:'What components does <code>&Delta;GradeBook</code> contribute?',
       correct:'All of <code>GradeBook</code> (unprimed) and <code>GradeBook\'</code> (primed).',
       distractors:['Only the primed components.','Only the predicate.','A hidden copy of GradeBook.']},
      {scenario:'A <span class="key">parking garage</span> operation <code>ParkCar</code> includes <code>&Delta;Lot</code> and <code>car? : Vehicle</code>.',
       question:'What constraint does the operation predicate typically express?',
       correct:'How the after-state relates to the before-state given the input (e.g., <code>parked\' = parked &cup; {car?}</code>).',
       distractors:['That the state is unchanged.','That the input is an output.','That the before-state is empty.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['State Invariant'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> state requires <code>dom booked &sube; equipment</code> &mdash; you can only book existing machines.',
       question:'What kind of constraint is this?',
       correct:'A state invariant &mdash; must hold in every valid state.',
       distractors:['An operation precondition &mdash; only checked before operations.','A decoration &mdash; marks the after-state.','An abbreviation &mdash; names the schema.']},
      {scenario:'A <span class="key">hospital</span> state requires <code>dom assigned &sube; beds</code>. After an operation, <code>dom assigned\' &sube; beds\'</code> must also hold.',
       question:'Why must the invariant hold after every operation?',
       correct:'The invariant constrains all valid states, including the after-state.',
       distractors:['The invariant only constrains the initial state.','The after-state has no constraints.','The invariant is optional for operations.']},
      {scenario:'An <span class="key">elevator</span> state requires <code>1 &sube; floor &and; floor &sube; maxFloor</code>.',
       question:'If an operation sets <code>floor\' = 0</code>, what happens?',
       correct:'The state is invalid &mdash; the invariant is violated.',
       distractors:['The state is valid &mdash; invariants are suggestions.','The invariant is automatically adjusted.','The operation succeeds but logs a warning.']},
      {scenario:'A <span class="key">kitchen</span> inventory requires <code>dom stock &sube; ingredients</code>.',
       question:'When is this constraint checked?',
       correct:'It must hold in every state &mdash; before and after every operation.',
       distractors:['Only at initialisation.','Only before operations.','Only when queried.']},
      {scenario:'A <span class="key">school</span> state has invariant <code>dom grades &sube; enrolled</code>. A student drops out.',
       question:'What must the drop operation ensure?',
       correct:'After removing the student from <code>enrolled\'</code>, <code>dom grades\' &sube; enrolled\'</code> still holds.',
       distractors:['Nothing &mdash; the invariant is only for new enrollments.','The invariant can be temporarily violated.','The student stays in <code>grades\'</code>.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Initialisation Schema'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> system starts with no members and no bookings. The initialisation schema only mentions <span class="key">after-state</span> variables.',
       question:'Why does the init schema have no before-state?',
       correct:'There is no prior state &mdash; initialisation defines the first valid state.',
       distractors:['The before-state is hidden.','The before-state is always empty.','The before-state is negated.']},
      {scenario:'A <span class="key">hospital</span> initialisation sets <code>assigned\' = &empty;</code> and <code>beds\' = allBeds</code>.',
       question:'Which convention indicates this is an initialisation?',
       correct:'Only primed (after-state) variables appear; no unprimed before-state.',
       distractors:['Both primed and unprimed appear.','Only unprimed variables appear.','The schema is named with <code>&Delta;</code>.']},
      {scenario:'An <span class="key">ATM</span> initialisation sets <code>balance\' = 0</code> and <code>transactions\' = &empty;</code>.',
       question:'Does the init schema include <code>&Delta;Account</code>?',
       correct:'No &mdash; it includes only <code>Account\'</code> (the after-state, no before).',
       distractors:['Yes &mdash; <code>&Delta;</code> is always required.','Yes &mdash; but with empty before-state.','No &mdash; it includes <code>&Xi;Account</code>.']},
      {scenario:'A <span class="key">parking garage</span> initialisation sets <code>parked\' = &empty;</code>.',
       question:'What must the initialisation schema satisfy?',
       correct:'The state invariant applied to the primed variables (e.g., <code>dom parked\' &sube; spaces\'</code>).',
       distractors:['No constraints &mdash; initialisation is unconstrained.','Only the before-state invariant.','The negation of the invariant.']},
      {scenario:'A <span class="key">library</span> initialisation sets <code>loans\' = &empty;</code> and <code>catalog\' = initialStock</code>.',
       question:'Which is the defining feature of an initialisation schema?',
       correct:'It specifies the starting state using only primed variables (State\' only).',
       distractors:['It uses <code>&Delta;</code> with an empty before-state.','It negates the state invariant.','It uses <code>&Xi;</code> to keep state unchanged.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Characteristic Binding in Operations'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> operation includes <code>&Delta;GymState</code>. You write <code>&theta;GymState</code> and <code>&theta;GymState\'</code>.',
       question:'What do these two bindings represent?',
       correct:'<code>&theta;GymState</code> is the before-state binding; <code>&theta;GymState\'</code> is the after-state binding.',
       distractors:['Both refer to the same state.','<code>&theta;GymState\'</code> is the negated state.','<code>&theta;GymState</code> is the input binding.']},
      {scenario:'A <span class="key">hospital</span> operation uses <code>&Xi;Ward</code>. The constraint <code>&theta;Ward\' = &theta;Ward</code> is implied.',
       question:'What does <code>&theta;Ward\' = &theta;Ward</code> mean?',
       correct:'Every component of Ward has the same value before and after &mdash; state unchanged.',
       distractors:['The state must change.','Only one component is preserved.','The bindings are hidden.']},
      {scenario:'An <span class="key">ATM</span> operation compares <code>&theta;Account</code> with <code>&theta;Account\'</code> to verify only <code>balance</code> changed.',
       question:'How would you express that all other components are unchanged?',
       correct:'Bind unchanged components individually or use <code>&Xi;</code> for the whole schema.',
       distractors:['Negate the schema.','Use <code>&or;</code> to allow change.','Hide the changed component.']},
      {scenario:'A <span class="key">school</span> operation uses <code>&theta;GradeBook</code> inside a predicate to pass the current state to a function.',
       question:'What does <code>&theta;GradeBook</code> package?',
       correct:'All component values of GradeBook into a single binding value.',
       distractors:['Only the predicate of GradeBook.','The type of GradeBook.','The negation of GradeBook.']},
      {scenario:'An <span class="key">elevator</span> operation includes <code>&Delta;Lift</code>. <code>&theta;Lift</code> has <code>floor</code> and <code>doors</code>.',
       question:'If <code>&theta;Lift\' &ne; &theta;Lift</code>, what do we know?',
       correct:'At least one component changed &mdash; the state is different after the operation.',
       distractors:['The state is unchanged.','The operation failed.','All components changed.']}
    ];
    return pick(scenarios);
  };

  // ===================== 12.3 Disjunction =====================
  // Symbols: &or; &and; == &notin; &isin; &Delta; &Xi; \ &#8614;

  window.conceptBank['Schema Disjunction'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> handles a booking request: either <span class="key">success</span> (machine booked) or <span class="key">failure</span> (machine unavailable).',
       question:'Which operator combines the two outcome schemas?',
       correct:'<code>&or;</code> &mdash; schema disjunction: one or the other applies.',
       distractors:['<code>&and;</code> &mdash; both must apply simultaneously.','<code>&not;</code> &mdash; negate one outcome.','<code>>></code> &mdash; pipe one into the other.']},
      {scenario:'A <span class="key">hospital</span> admission either succeeds (<code>AdmitOk</code>) or fails (<code>AdmitFail</code>). The total operation is <code>AdmitOk &or; AdmitFail</code>.',
       question:'What does <code>&or;</code> mean here?',
       correct:'The operation\'s behaviour is described by whichever disjunct\'s precondition is met.',
       distractors:['Both disjuncts execute simultaneously.','Neither disjunct applies.','The predicates are conjoined.']},
      {scenario:'An <span class="key">ATM</span> withdrawal has outcomes: <code>WithdrawOk</code> and <code>InsufficientFunds</code>.',
       question:'Which expresses the total operation?',
       correct:'<code>Withdraw == WithdrawOk &or; InsufficientFunds</code>.',
       distractors:['<code>Withdraw == WithdrawOk &and; InsufficientFunds</code>.','<code>Withdraw == &not;WithdrawOk</code>.','<code>Withdraw == WithdrawOk \\ InsufficientFunds</code>.']},
      {scenario:'A <span class="key">parking garage</span> entry: either <code>ParkOk</code> (space available) or <code>FullError</code> (no space).',
       question:'How does <code>ParkOk &or; FullError</code> work when the garage is full?',
       correct:'<code>FullError</code>\'s precondition is satisfied, so its predicate governs the outcome.',
       distractors:['Both schemas execute.','The conjunction of predicates applies.','The operation is undefined.']},
      {scenario:'A <span class="key">school</span> enrollment either succeeds or is <span class="key">rejected</span> (class full).',
       question:'Which operator models "one outcome or the other"?',
       correct:'<code>&or;</code> &mdash; schema disjunction selects the applicable case.',
       distractors:['<code>&and;</code> &mdash; schema conjunction requires both.','<code>==</code> &mdash; abbreviation defines a name.','<code>&Xi;</code> &mdash; state unchanged.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Total vs Partial Operation'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> booking operation only works when a machine is <span class="key">available</span>. If no machine is free, the operation is undefined.',
       question:'Is this a total or partial operation?',
       correct:'Partial &mdash; it does not specify behaviour for all possible inputs.',
       distractors:['Total &mdash; it handles every case.','Neither &mdash; Z operations are always total.','Total &mdash; undefined inputs are automatically rejected.']},
      {scenario:'A <span class="key">hospital</span> defines <code>Admit == AdmitOk &or; WardFull</code>, covering both the success and error cases.',
       question:'Is <code>Admit</code> a total operation?',
       correct:'Yes &mdash; it specifies behaviour for all inputs (bed available or not).',
       distractors:['No &mdash; it is partial because it uses disjunction.','No &mdash; only operations with <code>&Xi;</code> are total.','Yes &mdash; but only if both disjuncts are identical.']},
      {scenario:'An <span class="key">ATM</span> defines only <code>WithdrawOk</code>, which requires <code>amount? &isin; dom denominations</code>.',
       question:'Why is this partial?',
       correct:'It says nothing about what happens when <code>amount? &notin; dom denominations</code>.',
       distractors:['It is total because it has a precondition.','Partial means it has no after-state.','It is total because it uses <code>&Delta;</code>.']},
      {scenario:'A <span class="key">kitchen</span> order system handles valid and invalid dish names. <code>Order == OrderOk &or; DishNotFound</code>.',
       question:'What makes this total?',
       correct:'Every possible input (valid or invalid dish name) is covered by one of the disjuncts.',
       distractors:['Using <code>&or;</code> always makes operations partial.','Only <code>&and;</code> can create total operations.','Total operations never use error schemas.']},
      {scenario:'A <span class="key">library</span> loan operation only processes requests when the book is <span class="key">in stock</span>.',
       question:'How do you make the partial <code>LoanBook</code> total?',
       correct:'Add an error case: <code>TotalLoan == LoanBook &or; NotInStock</code>.',
       distractors:['Negate the operation.','Remove the precondition.','Use <code>&and;</code> with the error case.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Combining Outcomes'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> booking has <code>BookOk &and; Success</code> for the happy path and <code>MachineFull &and; Failure</code> for the error path.',
       question:'Which expresses the total operation?',
       correct:'<code>(BookOk &and; Success) &or; (MachineFull &and; Failure)</code>.',
       distractors:['<code>(BookOk &or; Success) &and; (MachineFull &or; Failure)</code>.','<code>BookOk &and; MachineFull</code>.','<code>&not;BookOk &or; &not;MachineFull</code>.']},
      {scenario:'A <span class="key">hospital</span> admission returns <code>response! = okay</code> on success and <code>response! = sorry</code> on failure.',
       question:'How are the response-annotated schemas combined?',
       correct:'<code>(AdmitOk &and; ResOkay) &or; (WardFull &and; ResSorry)</code>.',
       distractors:['<code>AdmitOk &or; WardFull</code> &mdash; no response annotation.','<code>(AdmitOk &or; ResOkay) &and; (WardFull &or; ResSorry)</code>.','<code>&not;(AdmitOk &and; ResOkay)</code>.']},
      {scenario:'An <span class="key">ATM</span> withdrawal pairs each outcome with a <span class="key">response message</span>: <code>WithdrawOk &and; DispenseCash</code> or <code>LowFunds &and; ShowError</code>.',
       question:'Which pattern is this?',
       correct:'Combining operation outcomes with response schemas using <code>&and;</code>, then <code>&or;</code> across cases.',
       distractors:['Schema negation applied to each outcome.','Schema piping from one outcome to the next.','Schema hiding of the response variable.']},
      {scenario:'A <span class="key">parking garage</span> entry: <code>(ParkOk &and; PrintTicket) &or; (GarageFull &and; ShowFull)</code>.',
       question:'Why conjoin each outcome with a response schema before disjoining?',
       correct:'The response schema adds output annotations (e.g., <code>response!</code>) to each case.',
       distractors:['To remove the response variable.','To negate the error case.','To hide the success case.']},
      {scenario:'A <span class="key">school</span> enrollment total operation is <code>(EnrollOk &and; Accepted) &or; (ClassFull &and; Rejected)</code>.',
       question:'What does the <code>&and;</code> within each disjunct achieve?',
       correct:'It merges the operation schema with its response schema, annotating the outcome.',
       distractors:['It creates an alternative between operation and response.','It negates the response.','It hides the operation variables.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Constraint Movement'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> schema declares <code>tier : {standard, premium}</code>. Before disjoining, this constraint must be moved.',
       question:'Where does the declaration constraint move?',
       correct:'Into the predicate: declare <code>tier : Tier</code> and add <code>tier &isin; {standard, premium}</code>.',
       distractors:['Into the after-state.','Into a separate schema.','It is deleted entirely.']},
      {scenario:'A <span class="key">hospital</span> schema declares <code>ward : {icu, general}</code>. To disjoin with another schema, this must be normalised.',
       question:'Why must declaration constraints be moved to the predicate?',
       correct:'Disjunction requires compatible declarations; constraints in the declaration part prevent this.',
       distractors:['Declaration constraints are always invalid.','Moving constraints changes the schema\'s meaning.','Predicates cannot contain membership tests.']},
      {scenario:'An <span class="key">ATM</span> schema declares <code>mode : {withdraw, deposit}</code>. Before combining with an error schema via <code>&or;</code>, you normalise.',
       question:'What does normalisation produce?',
       correct:'<code>mode : Mode</code> in declaration; <code>mode &isin; {withdraw, deposit}</code> in predicate.',
       distractors:['<code>mode</code> is removed entirely.','The predicate is moved to the declaration.','The schema is negated.']},
      {scenario:'A <span class="key">school</span> schema declares <code>grade : {A, B, C, D, F}</code>. To disjoin with a pass/fail schema, you must normalise.',
       question:'What happens to the constraint <code>grade &isin; {A, B, C, D, F}</code> after normalisation?',
       correct:'It appears explicitly in the predicate part.',
       distractors:['It disappears entirely.','It remains in the declaration.','It moves to the after-state.']},
      {scenario:'A <span class="key">library</span> schema restricts <code>status : {available, checked_out}</code> in its declaration.',
       question:'After moving the constraint to the predicate, what does the declaration become?',
       correct:'<code>status : Status</code> &mdash; the full base type, unconstrained in the declaration.',
       distractors:['<code>status : &Nopf;</code> &mdash; widened to natural numbers.','<code>status</code> is removed.','<code>status : {available}</code> &mdash; only one value.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Error Schema'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> booking fails when no machines are free. The error schema uses <code>&Xi;GymState</code> and outputs <code>response! = sorry</code>.',
       question:'Why does the error schema include <code>&Xi;GymState</code>?',
       correct:'The state does not change on error &mdash; <code>&Xi;</code> ensures before = after.',
       distractors:['<code>&Xi;</code> allows state changes on error.','<code>&Xi;</code> hides the state.','<code>&Xi;</code> negates the state.']},
      {scenario:'A <span class="key">hospital</span> error schema <code>WardFull</code> fires when <code>dom assigned = beds</code> (all beds taken).',
       question:'What does the error schema typically specify?',
       correct:'A precondition (error condition), unchanged state (<code>&Xi;</code>), and an error output.',
       distractors:['A state change and no output.','A negated state and an input.','Only a predicate with no variables.']},
      {scenario:'An <span class="key">ATM</span> error schema <code>InsufficientFunds</code> includes <code>&Xi;Account</code> and <code>response! = sorry</code>.',
       question:'What is the precondition for this error schema?',
       correct:'<code>amount? > balance</code> &mdash; the withdrawal exceeds available funds.',
       distractors:['<code>amount? = 0</code> &mdash; zero withdrawal.','<code>balance = 0</code> &mdash; empty account only.','No precondition is needed.']},
      {scenario:'A <span class="key">parking garage</span> error schema <code>GarageFull</code> outputs <code>response! = sorry</code> when the lot is at capacity.',
       question:'Which components does the error schema declare?',
       correct:'<code>&Xi;Lot</code> (state unchanged), <code>response! : Response</code> (error output).',
       distractors:['<code>&Delta;Lot</code> (state may change), no output.','Only a predicate, no variables.','<code>&not;Lot</code> (negated state).']},
      {scenario:'A <span class="key">school</span> error schema <code>ClassFull</code> fires when <code>#enrolled = maxSize</code>.',
       question:'How is the error schema used in the total operation?',
       correct:'Disjoined with the success case: <code>TotalEnroll == (EnrollOk &and; Ok) &or; (ClassFull &and; Sorry)</code>.',
       distractors:['Conjoined with the success case.','Negated and then conjoined.','Piped into the success case.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Success and Failure Patterns'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> defines <code>Response ::= okay | sorry</code>. The success schema sets <code>response! = okay</code>.',
       question:'What is this pattern called?',
       correct:'Success and failure response pattern &mdash; a free type tags each outcome.',
       distractors:['Schema negation &mdash; inverting the predicate.','Schema quantification &mdash; binding a variable.','Schema piping &mdash; connecting output to input.']},
      {scenario:'A <span class="key">hospital</span> uses <code>Report ::= admitted | rejected</code>. Each outcome schema sets <code>report!</code> accordingly.',
       question:'Why use a free type for responses?',
       correct:'It provides an enumerated set of outcomes that the operation can report.',
       distractors:['Free types are required by Z syntax.','It hides the state variables.','It negates the predicate.']},
      {scenario:'An <span class="key">ATM</span> defines <code>Result ::= dispensed | denied</code>. <code>WithdrawOk</code> sets <code>result! = dispensed</code>; <code>LowFunds</code> sets <code>result! = denied</code>.',
       question:'How are these combined into a total operation?',
       correct:'<code>(WithdrawOk &and; Dispensed) &or; (LowFunds &and; Denied)</code>.',
       distractors:['<code>WithdrawOk &and; LowFunds</code> &mdash; conjunction only.','<code>&not;WithdrawOk &or; &not;LowFunds</code> &mdash; negation.','<code>WithdrawOk >> LowFunds</code> &mdash; piping.']},
      {scenario:'A <span class="key">kitchen</span> defines <code>OrderResult ::= confirmed | unavailable</code>.',
       question:'In the success schema, what does <code>result! = confirmed</code> communicate?',
       correct:'The operation succeeded and the caller receives the <code>confirmed</code> tag.',
       distractors:['The state was negated.','The order was hidden.','The input was quantified over.']},
      {scenario:'A <span class="key">library</span> defines <code>LoanResult ::= granted | denied</code>. The total loan operation disjoins both outcomes.',
       question:'What advantage does the response type give the caller?',
       correct:'The caller can inspect <code>result!</code> to determine which case occurred.',
       distractors:['The caller cannot see the response.','The response is always <code>okay</code>.','The response is hidden by existential quantification.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Disjunction Commutativity'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> defines <code>Book == BookOk &or; MachineFull</code>. A colleague writes <code>Book == MachineFull &or; BookOk</code>.',
       question:'Are these equivalent?',
       correct:'Yes &mdash; schema disjunction is commutative: <code>S &or; T = T &or; S</code>.',
       distractors:['No &mdash; the first disjunct has priority.','No &mdash; order determines which case is tried first.','Only if both schemas are identical.']},
      {scenario:'A <span class="key">hospital</span> writes <code>Admit &or; WardFull</code>. Is this the same as <code>WardFull &or; Admit</code>?',
       question:'Does the order of disjuncts matter?',
       correct:'No &mdash; disjunction is commutative; both forms define the same schema.',
       distractors:['Yes &mdash; the first disjunct is the default case.','Yes &mdash; the second disjunct is only a fallback.','Only in operational (imperative) semantics.']},
      {scenario:'An <span class="key">ATM</span> total operation: <code>WithdrawOk &or; InsufficientFunds</code> vs <code>InsufficientFunds &or; WithdrawOk</code>.',
       question:'Which property of <code>&or;</code> makes these identical?',
       correct:'Commutativity &mdash; <code>S &or; T = T &or; S</code> for all schemas S, T.',
       distractors:['Associativity &mdash; grouping does not matter.','Idempotency &mdash; <code>S &or; S = S</code>.','Distributivity &mdash; <code>&or;</code> distributes over <code>&and;</code>.']},
      {scenario:'A <span class="key">school</span> writes <code>Enroll == Success &or; ClassFull</code>.',
       question:'If you swap the disjuncts, does the total operation change?',
       correct:'No &mdash; <code>ClassFull &or; Success</code> specifies the same behaviours.',
       distractors:['Yes &mdash; the success case should come first.','Yes &mdash; swapping changes the default path.','Only if the schemas share no variables.']},
      {scenario:'A <span class="key">parking garage</span> has <code>Enter == ParkOk &or; Full</code>.',
       question:'A reviewer swaps the order. Is a proof obligation generated?',
       correct:'No &mdash; commutativity means the specification is unchanged.',
       distractors:['Yes &mdash; order changes must be proved equivalent.','Yes &mdash; the first disjunct is always preferred.','Only if the garage has a capacity constraint.']}
    ];
    return pick(scenarios);
  };

  // ===================== 12.4 Negation =====================
  // Symbols: &not; &and; &or; &isin; &notin; &Nopf; &Zopf; &Popf; &empty; &ne; > ==

  window.conceptBank['Schema Negation'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> schema <code>Active</code> requires <code>members &ne; &empty;</code>. You form <code>&not;Active</code>.',
       question:'What does <code>&not;Active</code> produce?',
       correct:'Same declarations as Active, but predicate negated: <code>members = &empty;</code>.',
       distractors:['A schema with no declarations.','A schema with doubled declarations.','A schema with the same predicate.']},
      {scenario:'A <span class="key">hospital</span> schema <code>Occupied</code> requires <code>dom assigned &ne; &empty;</code>. You negate it.',
       question:'What is the predicate of <code>&not;Occupied</code>?',
       correct:'<code>dom assigned = &empty;</code> &mdash; the negation of the original predicate.',
       distractors:['<code>dom assigned &ne; &empty;</code> &mdash; unchanged.','No predicate &mdash; negation removes it.','<code>assigned = &empty;</code> &mdash; different variable.']},
      {scenario:'An <span class="key">ATM</span> schema <code>Positive</code> requires <code>balance > 0</code>. You form <code>&not;Positive</code>.',
       question:'Which values satisfy <code>&not;Positive</code>?',
       correct:'Values where <code>&not;(balance > 0)</code>, i.e., <code>balance &isin; &Zopf;</code> with <code>balance &le; 0</code>.',
       distractors:['Only <code>balance = 0</code>.','Only <code>balance > 0</code>.','All natural numbers.']},
      {scenario:'A <span class="key">school</span> schema <code>Enrolled</code> has <code>student &isin; roster</code>. You write <code>&not;Enrolled</code>.',
       question:'What does <code>&not;Enrolled</code> mean?',
       correct:'<code>student &notin; roster</code> &mdash; the student is not in the roster.',
       distractors:['<code>student &isin; roster</code> &mdash; unchanged.','The schema has no variables.','<code>roster = &empty;</code>.']},
      {scenario:'A <span class="key">parking garage</span> schema <code>Available</code> requires <code>#parked &ne; capacity</code>.',
       question:'What does <code>&not;Available</code> describe?',
       correct:'States where <code>#parked = capacity</code> &mdash; the garage is full.',
       distractors:['States where the garage is empty.','States where <code>#parked > capacity</code>.','The schema with no declarations.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Normalised Schema'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> schema declares <code>tier : {standard, premium}</code>. Before negating, you must <span class="key">normalise</span>.',
       question:'What does normalisation do?',
       correct:'Moves declaration constraints to the predicate: <code>tier : Tier; tier &isin; {standard, premium}</code>.',
       distractors:['Removes the variable entirely.','Changes the variable type to &Nopf;.','Negates the predicate before moving.']},
      {scenario:'A <span class="key">hospital</span> schema has <code>ward : {icu, general}</code> in its declaration. To negate correctly, normalise first.',
       question:'Why must you normalise before negating?',
       correct:'Negation only negates the predicate &mdash; declaration constraints would be missed otherwise.',
       distractors:['Normalisation is optional for negation.','Negation also negates the declaration.','Declaration constraints cannot be expressed as predicates.']},
      {scenario:'An <span class="key">ATM</span> schema declares <code>mode : {withdraw, deposit}</code>. After normalisation, the declaration says <code>mode : Mode</code>.',
       question:'Where is the constraint <code>mode &isin; {withdraw, deposit}</code> now?',
       correct:'In the predicate part, alongside any other constraints.',
       distractors:['Still in the declaration.','Removed entirely.','In a separate schema.']},
      {scenario:'A <span class="key">kitchen</span> schema declares <code>temp : 0..300</code>. You normalise it.',
       question:'What does the normalised declaration become?',
       correct:'<code>temp : &Nopf;</code> with <code>temp &isin; 0..300</code> added to the predicate.',
       distractors:['<code>temp : &Zopf;</code> with no predicate change.','<code>temp</code> is removed.','<code>temp : 0..300</code> unchanged.']},
      {scenario:'A <span class="key">library</span> schema uses <code>status : {in, out}</code>. Normalisation is required before schema negation.',
       question:'After normalisation and negation, what happens to the constraint?',
       correct:'The negated predicate becomes <code>&not;(status &isin; {in, out} &and; &hellip;)</code> &mdash; constraint included in negation.',
       distractors:['The constraint is preserved outside the negation.','The constraint disappears.','Only the original predicate is negated.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Declaration Constraints'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> schema declares <code>age : &Nopf;</code> with implicit constraint <code>age &isin; &Nopf;</code>. Negation does NOT negate this declaration constraint.',
       question:'Why is this important for schema negation?',
       correct:'Negation only negates the explicit predicate; the declaration type constraint is preserved.',
       distractors:['Negation negates both declaration and predicate.','Declaration constraints are always ignored.','The type is also negated.']},
      {scenario:'A <span class="key">hospital</span> schema declares <code>beds : &Popf; Bed</code>. After negation, <code>beds</code> is still of type <code>&Popf; Bed</code>.',
       question:'What does this demonstrate?',
       correct:'Schema negation preserves declarations; only the predicate is negated.',
       distractors:['Negation changes the type of beds.','Negation removes beds from the schema.','Negation adds new variables.']},
      {scenario:'An <span class="key">ATM</span> schema has <code>balance : &Nopf;</code> and predicate <code>balance > 100</code>. You negate.',
       question:'What is <code>&not;S</code>?',
       correct:'<code>balance : &Nopf;; &not;(balance > 100)</code> &mdash; declaration stays, predicate negated.',
       distractors:['<code>balance : &Zopf;; &not;(balance > 100)</code> &mdash; type widened.','<code>&not;(balance : &Nopf;) &and; &not;(balance > 100)</code>.','No variables, just <code>&not;(balance > 100)</code>.']},
      {scenario:'A <span class="key">school</span> schema declares <code>grade : Grade</code> with predicate <code>grade &isin; {A, B, C}</code>. You normalise, then negate.',
       question:'After negation, can <code>grade</code> take value <code>D</code>?',
       correct:'Yes &mdash; <code>&not;(grade &isin; {A, B, C})</code> includes all other Grade values.',
       distractors:['No &mdash; grade is still restricted to {A, B, C}.','No &mdash; negation removes grade.','Only if Grade = &Nopf;.']},
      {scenario:'A <span class="key">parking garage</span> schema has <code>spaces : &Popf; Space</code> and predicate <code>spaces &ne; &empty;</code>. You negate.',
       question:'After negation, what remains in the declaration?',
       correct:'<code>spaces : &Popf; Space</code> &mdash; unchanged. Only the predicate is negated.',
       distractors:['The declaration is also negated.','<code>spaces</code> is removed.','The type changes to <code>&Popf; &Nopf;</code>.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Type Widening'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> schema declares <code>count : &Nopf;</code> with predicate <code>count > 0</code>. Negation gives <code>&not;(count > 0)</code>.',
       question:'What values can <code>count</code> take in <code>&not;S</code>?',
       correct:'<code>count = 0</code> &mdash; still in &Nopf; but satisfying the negated predicate.',
       distractors:['<code>count &isin; &Zopf;</code> including negatives.','Only <code>count > 0</code>.','No values &mdash; the schema is empty.']},
      {scenario:'A <span class="key">hospital</span> schema has <code>beds : &Nopf;</code> and <code>beds > 10</code>. After negation, values &le; 10 are now valid.',
       question:'If the original declaration were <code>beds : 11..100</code> (in the declaration), would negation widen the type?',
       correct:'After normalisation, <code>beds : &Nopf;</code> with negated predicate <code>&not;(beds &isin; 11..100 &and; &hellip;)</code> &mdash; yes, effectively wider.',
       distractors:['No &mdash; the declaration type is always preserved.','Only if beds is of type &Zopf;.','Negation never affects types.']},
      {scenario:'An <span class="key">ATM</span> schema has <code>pin : &Nopf;</code> and predicate <code>pin &isin; 1000..9999</code>. After normalisation and negation:',
       question:'What happens to the range of <code>pin</code>?',
       correct:'<code>pin : &Nopf;</code> with <code>&not;(pin &isin; 1000..9999)</code> &mdash; pins outside 1000..9999 now satisfy it.',
       distractors:['<code>pin : &Zopf;</code> &mdash; type becomes integers.','<code>pin</code> is removed.','<code>pin &isin; 1000..9999</code> &mdash; unchanged.']},
      {scenario:'A <span class="key">school</span> schema has <code>score : &Nopf;</code> and <code>score &ge; 50</code> (passing). Negation: <code>&not;(score &ge; 50)</code>.',
       question:'What does type widening mean in this context?',
       correct:'The negated schema admits values the original excluded (e.g., scores 0&ndash;49), within the base type.',
       distractors:['The type changes from &Nopf; to &Zopf;.','No new values are admitted.','The schema becomes empty.']},
      {scenario:'A <span class="key">elevator</span> schema has <code>floor : &Nopf;</code> and <code>floor &isin; 1..20</code>. After normalisation and negation:',
       question:'Can <code>floor = 0</code> satisfy <code>&not;S</code>?',
       correct:'Yes &mdash; <code>0 &isin; &Nopf;</code> and <code>&not;(0 &isin; 1..20)</code> is true.',
       distractors:['No &mdash; 0 is not a natural number.','No &mdash; negation does not widen the range.','Only if the type is &Zopf;.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Negation of Initialisation'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> init schema sets <code>members\' = &empty;</code>. You form <code>State\' &and; &not;GymInit</code>.',
       question:'What does <code>State\' &and; &not;GymInit</code> describe?',
       correct:'After-states that satisfy the state invariant but NOT the initialisation condition.',
       distractors:['States that satisfy initialisation.','Before-states with no members.','The negation of the state invariant.']},
      {scenario:'A <span class="key">hospital</span> init sets <code>assigned\' = &empty;</code>. <code>&not;HospitalInit</code> means <code>assigned\' &ne; &empty;</code>.',
       question:'What does <code>Ward\' &and; &not;HospitalInit</code> find?',
       correct:'Valid ward states where some beds are already assigned (not initial).',
       distractors:['Invalid states.','The initial state only.','States with no beds.']},
      {scenario:'An <span class="key">ATM</span> init sets <code>balance\' = 0</code> and <code>transactions\' = &empty;</code>. <code>&not;ATMInit</code> negates this.',
       question:'What does <code>&not;ATMInit</code> admit?',
       correct:'States where <code>balance\' &ne; 0 &or; transactions\' &ne; &empty;</code>.',
       distractors:['Only <code>balance\' = 0</code>.','States with no variables.','The initial state.']},
      {scenario:'A <span class="key">parking garage</span> init sets <code>parked\' = &empty;</code>. You check <code>Lot\' &and; &not;LotInit</code>.',
       question:'Why form <code>State\' &and; &not;Init</code>?',
       correct:'To find all valid non-initial states &mdash; useful for checking reachability.',
       distractors:['To find the initial state.','To negate the state invariant.','To create a new initialisation.']},
      {scenario:'A <span class="key">library</span> init sets <code>loans\' = &empty;</code>. <code>Catalog\' &and; &not;LibInit</code> finds:',
       question:'What states does this describe?',
       correct:'Valid catalog states where at least one loan exists (not the initial empty state).',
       distractors:['The empty initial state.','Invalid states.','States with no catalog.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Invalid State Detection'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> state invariant says <code>dom booked &sube; equipment</code>. You form <code>&not;GymState</code>.',
       question:'What does <code>&not;GymState</code> describe?',
       correct:'Bindings where <code>&not;(dom booked &sube; equipment)</code> &mdash; invalid states.',
       distractors:['Valid states.','The initial state.','States with no equipment.']},
      {scenario:'A <span class="key">hospital</span> invariant: <code>dom assigned &sube; beds</code>. <code>&not;Ward</code> describes states violating this.',
       question:'Why is this useful?',
       correct:'It identifies states that should never be reached &mdash; useful for safety proofs.',
       distractors:['It finds the initial state.','It changes the invariant.','It removes variables from the schema.']},
      {scenario:'An <span class="key">ATM</span> invariant: <code>balance &isin; &Nopf;</code>. <code>&not;Account</code> describes states where <code>balance &notin; &Nopf;</code>.',
       question:'After normalisation, what does negating the account schema find?',
       correct:'States violating the account constraints &mdash; negative balances or broken invariants.',
       distractors:['The initial account state.','Accounts with high balances.','Valid account states.']},
      {scenario:'A <span class="key">school</span> invariant: <code>dom grades &sube; enrolled</code>. <code>&not;GradeBook</code> finds states where a non-enrolled student has a grade.',
       question:'What does this tell us?',
       correct:'An invalid state exists if a student not in <code>enrolled</code> appears in <code>dom grades</code>.',
       distractors:['All students have valid grades.','The grade book is empty.','Only enrolled students have grades.']},
      {scenario:'A <span class="key">elevator</span> invariant: <code>1 &le; floor &and; floor &le; 20</code>. <code>&not;Lift</code> finds <code>floor &lt; 1 &or; floor > 20</code>.',
       question:'When would you use schema negation for invalid state detection?',
       correct:'To prove no reachable state can satisfy <code>&not;S</code> &mdash; verifying the invariant always holds.',
       distractors:['To generate new valid states.','To remove the invariant.','To conjoin with the initial state.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Negation and Disjunction'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> operation <code>Book == BookOk &or; MachineFull</code>. You form <code>&not;Book</code>.',
       question:'What does <code>&not;(BookOk &or; MachineFull)</code> equal?',
       correct:'<code>&not;BookOk &and; &not;MachineFull</code> &mdash; De Morgan\'s law.',
       distractors:['<code>&not;BookOk &or; &not;MachineFull</code>.','<code>BookOk &and; MachineFull</code>.','<code>&not;BookOk</code> only.']},
      {scenario:'A <span class="key">hospital</span> defines <code>Treat == AdmitOk &or; WardFull</code>. <code>&not;Treat</code> is needed for a proof.',
       question:'How is <code>&not;(S &or; T)</code> expanded?',
       correct:'<code>&not;S &and; &not;T</code> &mdash; both negated predicates must hold.',
       distractors:['<code>&not;S &or; &not;T</code>.','<code>S &and; T</code>.','<code>&not;(S &and; T)</code>.']},
      {scenario:'An <span class="key">ATM</span> has <code>Op == WithdrawOk &or; LowFunds</code>. You negate: <code>&not;Op</code>.',
       question:'Which De Morgan equivalence applies?',
       correct:'<code>&not;(A &or; B) == &not;A &and; &not;B</code>.',
       distractors:['<code>&not;(A &or; B) == &not;A &or; &not;B</code>.','<code>&not;(A &and; B) == &not;A &and; &not;B</code>.','<code>&not;(A &or; B) == A &and; B</code>.']},
      {scenario:'A <span class="key">school</span> forms <code>&not;(Pass &or; Fail)</code>.',
       question:'What does this describe?',
       correct:'States satisfying neither <code>Pass</code> nor <code>Fail</code> &mdash; i.e., <code>&not;Pass &and; &not;Fail</code>.',
       distractors:['States satisfying both Pass and Fail.','States satisfying Pass only.','States satisfying Fail only.']},
      {scenario:'A <span class="key">parking garage</span> has <code>&not;(Enter &or; Full)</code>. This is a proof step.',
       question:'The negation distributes as:',
       correct:'<code>&not;Enter &and; &not;Full</code> &mdash; neither entering nor full.',
       distractors:['<code>&not;Enter &or; &not;Full</code>.','<code>Enter &and; Full</code>.','<code>Enter &or; &not;Full</code>.']}
    ];
    return pick(scenarios);
  };

  // ===================== 12.5 Quantification and Hiding =====================
  // Symbols: &forall; &exist; &bull; >> &sube; &rArr; &isin; &Popf; dom ran

  window.conceptBank['Schema Quantification'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> schema <code>BookForMember</code> has component <code>m : Member</code>. You form <code>&forall; m : Member &bull; BookForMember</code>.',
       question:'What does this produce?',
       correct:'A schema without <code>m</code> in its signature; the predicate is universally quantified over all members.',
       distractors:['A schema with <code>m</code> still in the signature.','A schema with <code>m</code> existentially quantified.','An unchanged schema.']},
      {scenario:'A <span class="key">hospital</span> operation <code>CheckBed</code> has <code>b : Bed</code>. You write <code>&exist; b : Bed &bull; CheckBed</code>.',
       question:'What happens to <code>b</code>?',
       correct:'<code>b</code> is removed from the signature; the predicate asserts some bed satisfies the constraint.',
       distractors:['<code>b</code> stays in the signature.','The predicate requires all beds.','<code>b</code> is negated.']},
      {scenario:'An <span class="key">ATM</span> schema <code>VerifyPin</code> has <code>attempt : &Nopf;</code>. <code>&forall; attempt : &Nopf; &bull; VerifyPin</code> is formed.',
       question:'What does universal quantification mean here?',
       correct:'For every natural number attempt, the VerifyPin predicate must hold.',
       distractors:['For some attempt, the predicate holds.','The attempt variable is hidden but existentially bound.','The predicate is negated.']},
      {scenario:'A <span class="key">school</span> schema <code>PassExam</code> has <code>student : Student</code>. <code>&exist; student : Student &bull; PassExam</code>.',
       question:'What does this assert?',
       correct:'There exists at least one student who satisfies the PassExam predicate.',
       distractors:['All students pass.','No student passes.','The student variable is universally bound.']},
      {scenario:'A <span class="key">parking garage</span> schema <code>FindSpace</code> has <code>s : Space</code>. <code>&exist; s : Space &bull; FindSpace</code>.',
       question:'Is <code>s</code> part of the resulting schema\'s signature?',
       correct:'No &mdash; quantified variables are removed from the schema\'s signature.',
       distractors:['Yes &mdash; quantified variables remain.','Only if the quantification is universal.','Only if the space is non-empty.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Schema Hiding'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> operation <code>Register</code> has an internal <code>cardNum : &Nopf;</code> that should not be visible externally.',
       question:'How do you hide <code>cardNum</code>?',
       correct:'Existential quantification: <code>&exist; cardNum : &Nopf; &bull; Register</code> removes it from the signature.',
       distractors:['Universal quantification: <code>&forall; cardNum</code>.','Schema negation: <code>&not;Register</code>.','Schema conjunction: <code>Register &and; Hide</code>.']},
      {scenario:'A <span class="key">hospital</span> operation <code>Assign</code> has an internal <code>bedChoice : Bed</code>. The caller should not see it.',
       question:'Which mechanism hides <code>bedChoice</code>?',
       correct:'<code>&exist; bedChoice : Bed &bull; Assign</code> &mdash; existential quantification hides the variable.',
       distractors:['<code>&forall; bedChoice : Bed &bull; Assign</code> &mdash; universal quantification.','<code>&not;Assign</code> &mdash; negation.','<code>Assign \\ bedChoice</code> &mdash; set difference.']},
      {scenario:'An <span class="key">ATM</span> operation generates a <code>token : &Nopf;</code> internally. The token must exist but is not output.',
       question:'How is the internal token handled?',
       correct:'Hide it via <code>&exist; token : &Nopf; &bull; ATMOp</code> &mdash; token is used internally but not exposed.',
       distractors:['Expose it as <code>token!</code>.','Negate it with <code>&not;</code>.','Remove it from the declaration entirely.']},
      {scenario:'A <span class="key">kitchen</span> operation uses an internal <code>tempId : &Nopf;</code> for order tracking. Callers should not see it.',
       question:'What does hiding via <code>&exist;</code> guarantee?',
       correct:'Some value of <code>tempId</code> exists satisfying the predicate, but it is not in the external signature.',
       distractors:['All values of <code>tempId</code> satisfy the predicate.','<code>tempId</code> is removed from the predicate too.','The operation becomes undefined.']},
      {scenario:'A <span class="key">library</span> operation internally computes <code>shelfLoc : Location</code>. The borrower does not need to know.',
       question:'After hiding <code>shelfLoc</code>, what happens to the schema?',
       correct:'<code>shelfLoc</code> is removed from the signature; the predicate still constrains it existentially.',
       distractors:['<code>shelfLoc</code> remains in the signature.','The predicate loses all references to <code>shelfLoc</code>.','The schema is negated.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Schema Piping'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> has <code>Register</code> outputting <code>id!</code> and <code>AssignLocker</code> taking <code>id?</code>. You pipe them: <code>Register >> AssignLocker</code>.',
       question:'What does <code>>></code> do?',
       correct:'Connects <code>id!</code> from Register to <code>id?</code> of AssignLocker, hiding both.',
       distractors:['Conjoins both schemas without connecting I/O.','Disjoins both schemas.','Negates Register before conjoining.']},
      {scenario:'A <span class="key">hospital</span> pipes <code>Triage >> Admit</code>. Triage outputs <code>priority!</code>; Admit takes <code>priority?</code>.',
       question:'After piping, are <code>priority!</code> and <code>priority?</code> visible?',
       correct:'No &mdash; piping hides the connected output and input variables.',
       distractors:['Yes &mdash; both remain in the signature.','Only <code>priority!</code> remains.','Only <code>priority?</code> remains.']},
      {scenario:'An <span class="key">ATM</span> pipes <code>Authenticate >> Withdraw</code>. Authenticate outputs <code>token!</code>; Withdraw takes <code>token?</code>.',
       question:'What is the semantic effect of piping?',
       correct:'<code>token! = token?</code> is added; both are existentially quantified away.',
       distractors:['<code>token!</code> is negated.','<code>token?</code> is universally quantified.','Both tokens are left in the signature.']},
      {scenario:'A <span class="key">school</span> pipes <code>GradeExam >> PostResult</code>. GradeExam outputs <code>score!</code>; PostResult takes <code>score?</code>.',
       question:'Which operator connects the output of one operation to the input of the next?',
       correct:'<code>>></code> &mdash; schema piping.',
       distractors:['<code>&and;</code> &mdash; schema conjunction.','<code>&or;</code> &mdash; schema disjunction.','<code>&not;</code> &mdash; schema negation.']},
      {scenario:'A <span class="key">kitchen</span> pipes <code>TakeOrder >> PrepareFood</code>. TakeOrder outputs <code>dish!</code>; PrepareFood takes <code>dish?</code>.',
       question:'What must be true for piping to work?',
       correct:'The output variable of the first (<code>dish!</code>) must match the input type of the second (<code>dish?</code>).',
       distractors:['Both schemas must have identical signatures.','The schemas must be negated first.','Piping works with any pair of schemas.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Universal Quantification'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> schema <code>MemberCheck</code> has <code>m : Member</code> and <code>m &isin; active</code>. You form <code>&forall; m : Member &bull; MemberCheck</code>.',
       question:'What does this express?',
       correct:'For every member m, the predicate <code>m &isin; active</code> holds &mdash; all members are active.',
       distractors:['Some member is active.','No member is active.','The member variable is hidden.']},
      {scenario:'A <span class="key">hospital</span> schema <code>BedClean</code> has <code>b : Bed</code> and <code>b &isin; sanitised</code>. <code>&forall; b : Bed &bull; BedClean</code>.',
       question:'What does universal quantification assert here?',
       correct:'Every bed is sanitised.',
       distractors:['Some bed is sanitised.','No bed is sanitised.','The bed variable remains in the signature.']},
      {scenario:'An <span class="key">ATM</span> schema <code>ValidPin</code> has <code>p : &Nopf;</code> and <code>p &isin; 1000..9999 &rArr; isValid(p)</code>. <code>&forall; p : &Nopf; &bull; ValidPin</code>.',
       question:'What is the result?',
       correct:'A schema with <code>p</code> removed from the signature; the predicate holds for all <code>p &isin; &Nopf;</code>.',
       distractors:['A schema where <code>p</code> is existentially bound.','An unchanged schema.','A schema with the predicate negated.']},
      {scenario:'A <span class="key">school</span> schema <code>Passing</code> has <code>s : Student</code> and <code>grade(s) &ge; 50</code>. <code>&forall; s : Student &bull; Passing</code>.',
       question:'What does the universally quantified schema say?',
       correct:'Every student has a grade of at least 50 &mdash; all students pass.',
       distractors:['At least one student passes.','No student passes.','The grade threshold is removed.']},
      {scenario:'A <span class="key">parking garage</span> schema <code>SpaceValid</code> has <code>s : Space</code> and <code>s &isin; dom layout</code>. <code>&forall; s : Space &bull; SpaceValid</code>.',
       question:'After quantification, is <code>s</code> in the result schema?',
       correct:'No &mdash; universally quantified variables are removed from the signature.',
       distractors:['Yes &mdash; they remain as inputs.','Yes &mdash; they become outputs.','Only if the type is finite.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Existential Quantification'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> schema <code>HasTrainer</code> has <code>t : Trainer</code> and <code>t &isin; available</code>. <code>&exist; t : Trainer &bull; HasTrainer</code>.',
       question:'What does this assert?',
       correct:'Some trainer is available &mdash; at least one t satisfies the predicate.',
       distractors:['All trainers are available.','No trainer is available.','The trainer variable is universally bound.']},
      {scenario:'A <span class="key">hospital</span> schema <code>FreeBed</code> has <code>b : Bed</code> and <code>b &notin; dom assigned</code>. <code>&exist; b : Bed &bull; FreeBed</code>.',
       question:'What does the existentially quantified schema express?',
       correct:'There exists at least one bed that is not assigned.',
       distractors:['All beds are unassigned.','No beds are available.','The bed variable stays in the signature.']},
      {scenario:'An <span class="key">ATM</span> schema <code>Reachable</code> has <code>s : State</code> and <code>s &isin; ran transitions</code>. <code>&exist; s : State &bull; Reachable</code>.',
       question:'What happens to <code>s</code>?',
       correct:'<code>s</code> is removed from the signature; the predicate asserts some state is reachable.',
       distractors:['<code>s</code> remains in the signature.','All states must be reachable.','The predicate is negated.']},
      {scenario:'A <span class="key">school</span> schema <code>TopStudent</code> has <code>s : Student</code> and <code>grade(s) = maxGrade</code>. <code>&exist; s : Student &bull; TopStudent</code>.',
       question:'What does this express?',
       correct:'At least one student achieved the maximum grade.',
       distractors:['All students achieved the maximum grade.','No student achieved the maximum grade.','The student variable is output.']},
      {scenario:'A <span class="key">kitchen</span> schema <code>HasIngredient</code> has <code>i : Ingredient</code> and <code>i &isin; stock</code>. <code>&exist; i : Ingredient &bull; HasIngredient</code>.',
       question:'After existential quantification, is <code>i</code> part of the resulting schema?',
       correct:'No &mdash; <code>i</code> is existentially bound and removed from the signature.',
       distractors:['Yes &mdash; existential quantification preserves the variable.','Only if the ingredient exists.','Only if stock is non-empty.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Component Removal'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> schema has <code>m : Member</code>, <code>t : Trainer</code>, <code>room : Room</code>. You existentially quantify <code>t</code>.',
       question:'What is the resulting signature?',
       correct:'<code>m : Member; room : Room</code> &mdash; <code>t</code> is removed.',
       distractors:['<code>m : Member; t : Trainer; room : Room</code> &mdash; unchanged.','<code>t : Trainer</code> only.','All variables removed.']},
      {scenario:'A <span class="key">hospital</span> schema has <code>b : Bed</code>, <code>p : Patient</code>, <code>w : Ward</code>. You universally quantify <code>w</code>.',
       question:'Which variables remain in the signature?',
       correct:'<code>b : Bed; p : Patient</code> &mdash; <code>w</code> is removed by quantification.',
       distractors:['All three remain.','Only <code>w</code> remains.','None remain.']},
      {scenario:'An <span class="key">ATM</span> schema has <code>balance : &Nopf;</code>, <code>pin : &Nopf;</code>, <code>token : &Nopf;</code>. You hide <code>token</code>.',
       question:'What does the resulting schema contain?',
       correct:'<code>balance : &Nopf;; pin : &Nopf;</code> &mdash; <code>token</code> is existentially quantified away.',
       distractors:['All three variables.','Only <code>token</code>.','No variables.']},
      {scenario:'A <span class="key">school</span> schema has <code>student : Student</code>, <code>course : Course</code>, <code>grade : Grade</code>. You quantify <code>student</code> and <code>course</code>.',
       question:'What remains?',
       correct:'<code>grade : Grade</code> &mdash; both quantified variables are removed.',
       distractors:['<code>student : Student; course : Course</code>.','All three variables.','No variables.']},
      {scenario:'A <span class="key">parking garage</span> schema has <code>s : Space</code>, <code>v : Vehicle</code>, <code>t : Ticket</code>. You hide <code>t</code>.',
       question:'After hiding, what is the signature?',
       correct:'<code>s : Space; v : Vehicle</code> &mdash; <code>t</code> has been removed.',
       distractors:['<code>t : Ticket</code> only.','All three remain.','<code>s : Space</code> only.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Output-Input Connection'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> pipes <code>Register >> AssignLocker</code>. <code>Register</code> has <code>memberId!</code>; <code>AssignLocker</code> has <code>memberId?</code>.',
       question:'How does piping connect these?',
       correct:'It equates <code>memberId! = memberId?</code> and hides both from the result.',
       distractors:['It keeps both <code>memberId!</code> and <code>memberId?</code> in the signature.','It renames <code>memberId?</code> to <code>memberId!</code>.','It negates the first schema.']},
      {scenario:'A <span class="key">hospital</span> pipes <code>Triage >> Admit</code>. Triage outputs <code>severity!</code>; Admit inputs <code>severity?</code>.',
       question:'After piping, what happens to severity?',
       correct:'<code>severity!</code> and <code>severity?</code> are equated and existentially hidden.',
       distractors:['Only <code>severity!</code> is removed.','Only <code>severity?</code> is removed.','Both remain visible.']},
      {scenario:'An <span class="key">ATM</span> pipes <code>Authenticate >> Transact</code>. Authenticate outputs <code>session!</code>; Transact inputs <code>session?</code>.',
       question:'What constraint does piping add?',
       correct:'<code>session! = session?</code> &mdash; the output feeds directly into the input.',
       distractors:['<code>session! &ne; session?</code>.','<code>session! &isin; dom session?</code>.','No constraint is added.']},
      {scenario:'A <span class="key">school</span> pipes <code>MarkExam >> PostResult</code>. MarkExam outputs <code>score!</code>; PostResult inputs <code>score?</code>.',
       question:'Which variables from MarkExam remain after piping?',
       correct:'All except <code>score!</code> &mdash; the connected output is hidden.',
       distractors:['All variables including <code>score!</code>.','No variables remain.','Only <code>score!</code> remains.']},
      {scenario:'A <span class="key">kitchen</span> pipes <code>TakeOrder >> Cook</code>. TakeOrder has <code>dish!</code>; Cook has <code>dish?</code>.',
       question:'What must be true about the types?',
       correct:'<code>dish!</code> and <code>dish?</code> must have the same type for piping to connect them.',
       distractors:['Types can differ; piping coerces automatically.','Only the output type matters.','Types are irrelevant in piping.']}
    ];
    return pick(scenarios);
  };

  window.conceptBank['Quantification vs Omission'] = function() {
    var scenarios = [
      {scenario:'A <span class="key">gym</span> schema <code>S</code> has <code>m : Member</code> and <code>m &isin; active</code>. You omit <code>m</code> from the declaration entirely.',
       question:'Is omitting the same as existentially quantifying?',
       correct:'No &mdash; omitting also removes the constraint on <code>m</code>; quantifying preserves it.',
       distractors:['Yes &mdash; both produce the same schema.','Omitting is stricter than quantifying.','Quantifying removes the constraint too.']},
      {scenario:'A <span class="key">hospital</span> schema has <code>b : Bed</code> and <code>b &notin; dom assigned</code>. You remove <code>b</code> by quantification vs. by deletion.',
       question:'What is the key difference?',
       correct:'Quantification: <code>&exist; b &bull; b &notin; dom assigned</code> &mdash; constraint preserved. Deletion: constraint lost.',
       distractors:['No difference &mdash; both remove the variable and constraint.','Deletion preserves the constraint; quantification does not.','Both methods keep the variable in the signature.']},
      {scenario:'An <span class="key">ATM</span> schema has <code>token : &Nopf;</code> and <code>token &isin; validTokens</code>. You want to remove <code>token</code> from the interface.',
       question:'Why use <code>&exist; token</code> instead of simply deleting it?',
       correct:'<code>&exist; token</code> asserts a valid token exists; deletion drops the validity requirement.',
       distractors:['Deletion also asserts existence.','<code>&exist; token</code> removes the constraint.','Both approaches are semantically identical.']},
      {scenario:'A <span class="key">school</span> schema has <code>advisor : Staff</code> and <code>advisor &isin; qualified</code>. You hide <code>advisor</code>.',
       question:'After hiding via <code>&exist;</code>, does the qualification constraint still apply?',
       correct:'Yes &mdash; <code>&exist; advisor : Staff &bull; advisor &isin; qualified &and; &hellip;</code> still requires a qualified advisor.',
       distractors:['No &mdash; hiding removes all constraints on the variable.','Only if the advisor is universally quantified.','The constraint is negated.']},
      {scenario:'A <span class="key">parking garage</span> schema has <code>ticket : &Nopf;</code> and <code>ticket &isin; issued</code>. Compare <code>&exist; ticket &bull; S</code> vs removing <code>ticket</code>.',
       question:'Which preserves the constraint that an issued ticket exists?',
       correct:'<code>&exist; ticket &bull; S</code> &mdash; the existential quantification keeps <code>ticket &isin; issued</code> in the predicate.',
       distractors:['Removing <code>ticket</code> &mdash; the constraint is implicit.','Both preserve it.','Neither preserves it.']}
    ];
    return pick(scenarios);
  };

})();
