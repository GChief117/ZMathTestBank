// Chapter 14 — Preconditions: Concept Bank Generators
(function buildCh14Bank() {
  if (!window.conceptBank) window.conceptBank = {};

  // ===== §14.1 The Initialisation Theorem =====

  window.conceptBank['Initialisation Theorem Definition'] = function() {
    var systems = [
      {name:'warehouse', state:'stock : SKU → ℕ', inv:'ran stock ⊆ ℕ'},
      {name:'airport gate', state:'flights : FlightID ↣ Gate', inv:'dom flights ⊆ scheduled'},
      {name:'school register', state:'pupils : ℙ Student', inv:'#pupils ≤ classSize'},
      {name:'clinic', state:'patients : BedID ↣ Patient', inv:'#patients ≤ beds'}
    ];
    var s = systems[Math.floor(Math.random()*systems.length)];
    return {
      scenario: 'A <span class="key">'+s.name+'</span> system has state <code>'+s.state+'</code> with invariant <code>'+s.inv+'</code>.',
      question: 'Which statement is the initialisation theorem?',
      correct: '<code>∃ State′ • StateInit</code> — at least one valid initial state exists.',
      distractors: [
        '<code>∀ State′ • StateInit</code> — every state is initial.',
        '<code>StateInit = ∅</code> — no initial state.',
        '<code>State′ = State</code> — state unchanged.'
      ]
    };
  };

  window.conceptBank['Consistency Purpose'] = function() {
    var pairs = [
      {inv:'x > 0 ∧ x < 0', verdict:'contradictory'},
      {inv:'n ≥ 0 ∧ n ≤ −1', verdict:'contradictory'},
      {inv:'a ≠ a', verdict:'contradictory'},
      {inv:'s ⊆ ∅ ∧ s ≠ ∅', verdict:'contradictory'}
    ];
    var p = pairs[Math.floor(Math.random()*pairs.length)];
    return {
      scenario: 'A spec has invariant <code>'+p.inv+'</code>.',
      question: 'Can the initialisation theorem be proved?',
      correct: 'No — the invariant is '+p.verdict+'; no state satisfies it.',
      distractors: [
        'Yes — set all variables to 0.',
        'Yes — any value works.',
        'Yes — use <code>∅</code>.'
      ]
    };
  };

  window.conceptBank['Proving Initialisation'] = function() {
    var proofs = [
      {sys:'library', state:'loans : Book ↣ Member', inv:'dom loans ⊆ catalogue', init:'loans′ = ∅', proof:'dom ∅ = ∅ ⊆ catalogue'},
      {sys:'hospital', state:'beds : BedID ↣ Patient', inv:'#beds ≤ capacity', init:'beds′ = ∅', proof:'#∅ = 0 ≤ capacity'},
      {sys:'gym', state:'members : ℙ Person', inv:'#members ≤ maxCap', init:'members′ = ∅', proof:'#∅ = 0 ≤ maxCap'},
      {sys:'car park', state:'parked : ℙ Space', inv:'#parked ≤ capacity', init:'parked′ = ∅', proof:'#∅ = 0 ≤ capacity'},
      {sys:'cinema', state:'sold : Seat ↣ Customer', inv:'dom sold ⊆ hall_seats', init:'sold′ = ∅', proof:'dom ∅ = ∅ ⊆ hall_seats'},
      {sys:'hotel', state:'bookings : Room ↣ Guest', inv:'injective', init:'bookings′ = ∅', proof:'∅ is trivially injective'},
      {sys:'thermostat', state:'target : ℕ', inv:'target ≥ 10 ∧ target ≤ 30', init:'target′ = 20', proof:'20 ≥ 10 ∧ 20 ≤ 30'},
      {sys:'playlist', state:'tracks : seq Track; pos : ℕ', inv:'pos ≤ #tracks', init:'tracks′ = ⟨⟩ ∧ pos′ = 0', proof:'0 ≤ #⟨⟩ = 0'}
    ];
    var p = proofs[Math.floor(Math.random()*proofs.length)];
    return {
      scenario: 'A <span class="key">'+p.sys+'</span> has <code>'+p.state+'</code> with invariant <code>'+p.inv+'</code>. Init: <code>'+p.init+'</code>.',
      question: 'Which proves the initialisation theorem?',
      correct: '<code>'+p.proof+'</code> ✓',
      distractors: [
        '<code>∃ State′ • false</code>.',
        'The invariant is contradictory.',
        'No valid initial state exists.'
      ]
    };
  };

  window.conceptBank['Vacuous Specification'] = function() {
    return window.conceptBank['Consistency Purpose']();
  };

  window.conceptBank['Two Proof Opportunities'] = function() {
    return {
      scenario: 'An abstract data type is constructed using schemas.',
      question: 'What are the two proof opportunities it presents?',
      correct: 'Consistency (invariant satisfiable) and domain-checking (ops not applied outside domain).',
      distractors: [
        'Termination and correctness.',
        'Type-checking and compilation.',
        'Performance and scalability.'
      ]
    };
  };

  window.conceptBank['Proof Strategy'] = function() {
    return {
      scenario: 'You need to prove <code>∃ State′ • StateInit</code>.',
      question: 'What is the standard proof strategy?',
      correct: 'Expand definitions → eliminate quantified variables via one-point rule → verify predicate.',
      distractors: [
        'Negate the invariant and derive contradiction.',
        'Universally quantify over all states.',
        'Run the system and observe.'
      ]
    };
  };

  window.conceptBank['Decorated Schema Role'] = function() {
    return window.conceptBank['Proof Strategy']();
  };

  window.conceptBank['Straightforward Proofs'] = function() {
    return window.conceptBank['Proof Strategy']();
  };

  // ===== §14.2 Precondition Investigation =====

  window.conceptBank['Precondition Definition'] = function() {
    return {
      scenario: 'An operation schema describes a state transition.',
      question: 'The precondition of an operation describes:',
      correct: 'The before-states and inputs for which the operation outcome is defined.',
      distractors: [
        'The after-state only.',
        'The outputs only.',
        'Nothing — operations are always defined.'
      ]
    };
  };

  window.conceptBank['Pre Formula'] = function() {
    return {
      scenario: 'You need to compute <code>pre Op</code>.',
      question: 'The formula is:',
      correct: '<code>pre Op = ∃ State′ • Op \\ outputs</code> — hide after-state and outputs.',
      distractors: [
        '<code>pre Op = ∀ State′ • Op</code>.',
        '<code>pre Op = Op</code>.',
        '<code>pre Op = ¬ Op</code>.'
      ]
    };
  };

  window.conceptBank['Computing Preconditions'] = function() {
    var ops = [
      {name:'Withdraw', pred:'balance′ = balance − amt? ∧ balance′ ≥ 0', pre:'amt? ≤ balance', wrong1:'true', wrong2:'amt? ≥ balance', wrong3:'balance = 0'},
      {name:'Cancel', pred:'m? ∈ members ∧ members′ = members \\ {m?}', pre:'m? ∈ members', wrong1:'m? ∉ members', wrong2:'true', wrong3:'members = ∅'},
      {name:'Delete', pred:'id? ∈ dom fs ∧ fs′ = {id?} ⩤ fs', pre:'id? ∈ dom fs', wrong1:'id? ∉ dom fs', wrong2:'true', wrong3:'fs = ∅'},
      {name:'Exit₀', pred:'count′ = count − 1, count : ℕ', pre:'count > 0', wrong1:'true', wrong2:'count = 0', wrong3:'count ≥ capacity'},
      {name:'Pop', pred:'stack ≠ ⟨⟩ ∧ stack′ = tail stack', pre:'stack ≠ ⟨⟩', wrong1:'stack = ⟨⟩', wrong2:'true', wrong3:'#stack = 0'},
      {name:'Deposit', pred:'balance′ = balance + amt?', pre:'true', wrong1:'amt? > 0', wrong2:'balance > 0', wrong3:'false'},
      {name:'Unlock₀', pred:'locked = true ∧ locked′ = false', pre:'locked = true', wrong1:'locked = false', wrong2:'true', wrong3:'false'},
      {name:'Enqueue', pred:'queue′ = queue ⁀ ⟨item?⟩ ∧ #queue < maxLen', pre:'#queue < maxLen', wrong1:'true', wrong2:'#queue = maxLen', wrong3:'queue = ⟨⟩'}
    ];
    var o = ops[Math.floor(Math.random()*ops.length)];
    return {
      scenario: 'Operation <span class="key">'+o.name+'</span> has predicate <code>'+o.pred+'</code>.',
      question: 'What is <code>pre '+o.name+'</code>?',
      correct: '<code>pre '+o.name+' ≡ '+o.pre+'</code>',
      distractors: [
        '<code>pre '+o.name+' ≡ '+o.wrong1+'</code>',
        '<code>pre '+o.name+' ≡ '+o.wrong2+'</code>',
        '<code>pre '+o.name+' ≡ '+o.wrong3+'</code>'
      ]
    };
  };

  window.conceptBank['Totalisation'] = function() {
    var ops = [
      {name:'Dispense', err:'InsufficientFunds', total:'Dispense₀ ∨ InsufficientFunds'},
      {name:'Login', err:'InvalidCreds', total:'Login₀ ∨ InvalidCreds'},
      {name:'Select', err:'OutOfStock ∨ LowCredit', total:'Select₀ ∨ OutOfStock ∨ LowCredit'},
      {name:'Unlock', err:'AlreadyOpen', total:'Unlock₀ ∨ AlreadyOpen'},
      {name:'OpenGate', err:'AccessDenied', total:'OpenGate₀ ∨ AccessDenied'},
      {name:'Pop', err:'EmptyStack', total:'Pop₀ ∨ EmptyStack'}
    ];
    var o = ops[Math.floor(Math.random()*ops.length)];
    return {
      scenario: 'Operation <span class="key">'+o.name+'</span> is partial. Error case: '+o.err+'.',
      question: 'How is it totalised?',
      correct: '<code>'+o.name+' ≅ '+o.total+'</code>',
      distractors: [
        '<code>'+o.name+' ≅ '+o.name+'₀ ∧ '+o.err+'</code>',
        '<code>'+o.name+' ≅ '+o.name+'₀</code> — unchanged.',
        '<code>'+o.name+' ≅ '+o.err+'</code> — error only.'
      ]
    };
  };

  window.conceptBank['Hidden Assumptions'] = function() {
    return {
      scenario: 'A specification defines an operation that decrements a counter.',
      question: 'Discovering its precondition is valuable because:',
      correct: 'It surfaces the hidden assumption that the counter must be positive.',
      distractors: [
        'It removes all state variables.',
        'It makes the operation slower.',
        'It has no practical value.'
      ]
    };
  };

  window.conceptBank['Error-Case Schema Structure'] = function() {
    return {
      scenario: 'An error-case schema handles a violated precondition.',
      question: 'It typically:',
      correct: 'Uses <code>Ξ</code> to preserve state and emits an error output via <code>!</code>.',
      distractors: [
        'Uses <code>Δ</code> to change state.',
        'Has no outputs.',
        'Removes the state entirely.'
      ]
    };
  };

  window.conceptBank['Partial vs Total'] = function() {
    return window.conceptBank['Hidden Assumptions']();
  };

  window.conceptBank['Totalisation Result'] = function() {
    return {
      scenario: 'An operation has been totalised with error-case schemas.',
      question: 'The combined operation\'s precondition is:',
      correct: '<code>true</code> — every input handled by some branch.',
      distractors: [
        '<code>false</code> — no input works.',
        'Unchanged from original.',
        'Undefined.'
      ]
    };
  };

  window.conceptBank['Hiding Operator'] = function() {
    return window.conceptBank['Pre Formula']();
  };

  // ===== §14.3 Calculation and Simplification =====

  window.conceptBank['Recipe Overview'] = function() {
    return {
      scenario: 'You are computing the precondition of an operation schema.',
      question: 'The first step of the recipe is:',
      correct: 'Divide the declaration into Before, After, and Mixed.',
      distractors: [
        'Apply the one-point rule immediately.',
        'Negate the predicate.',
        'Remove all variables.'
      ]
    };
  };

  window.conceptBank['One-Point Rule'] = function() {
    var examples = [
      {expr:'∃ x • x = 5 ∧ x > 3', result:'5 > 3 ≡ true'},
      {expr:'∃ y • y = n + 1 ∧ y ≤ max', result:'n + 1 ≤ max'},
      {expr:'∃ z • z = ∅ ∧ z ⊆ S', result:'∅ ⊆ S ≡ true'},
      {expr:'∃ w • w = a − b ∧ w ≥ 0', result:'a − b ≥ 0 ≡ b ≤ a'}
    ];
    var e = examples[Math.floor(Math.random()*examples.length)];
    return {
      scenario: 'Expression: <code>'+e.expr+'</code>.',
      question: 'After applying the one-point rule:',
      correct: '<code>'+e.result+'</code>',
      distractors: [
        '<code>false</code>',
        '<code>∀ x • true</code>',
        'Cannot simplify.'
      ]
    };
  };

  window.conceptBank['Applying the Recipe'] = function() {
    var ops = [
      {name:'Increment', schema:'ΔCounter; in? : ℕ | count′ = count + in?', pre:'true', reason:'addition always succeeds in ℕ'},
      {name:'Withdraw', schema:'ΔAccount; amt? | balance′ = balance − amt? ∧ balance′ ≥ 0', pre:'amt? ≤ balance', reason:'non-negative result required'},
      {name:'SetTemp', schema:'ΔThermo; t? | t? ≥ 10 ∧ t? ≤ 30 ∧ target′ = t?', pre:'t? ≥ 10 ∧ t? ≤ 30', reason:'range constraint on input'},
      {name:'Enroll', schema:'ΔClass; s? | s? ∉ enrolled ∧ #enrolled < cap ∧ enrolled′ = enrolled ∪ {s?}', pre:'s? ∉ enrolled ∧ #enrolled < cap', reason:'new student + capacity check'},
      {name:'Reset', schema:'ΔTimer | elapsed′ = 0', pre:'true', reason:'constant assignment always valid'},
      {name:'Flush', schema:'ΔBuffer | buf′ = ⟨⟩ ∧ out! = buf', pre:'true', reason:'both variables pinned by equations'},
      {name:'Confirm', schema:'ΔHotel; r? | r? ∈ pending ∧ rooms′ = rooms ⊕ {r? ↦ confirmed}', pre:'r? ∈ pending', reason:'booking must be pending'},
      {name:'SetVol', schema:'ΔAudio; v? | v? ≥ 0 ∧ v? ≤ 100 ∧ vol′ = v?', pre:'v? ≥ 0 ∧ v? ≤ 100', reason:'volume range constraint'}
    ];
    var o = ops[Math.floor(Math.random()*ops.length)];
    return {
      scenario: 'Operation <span class="key">'+o.name+'</span>: <code>'+o.schema+'</code>.',
      question: 'What is the precondition after applying the full recipe?',
      correct: '<code>pre '+o.name+' ≡ '+o.pre+'</code> — '+o.reason+'.',
      distractors: [
        '<code>pre '+o.name+' ≡ false</code>',
        '<code>pre '+o.name+' ≡ ∅</code>',
        'Cannot be computed.'
      ]
    };
  };

  window.conceptBank['Mixed Expansion'] = function() {
    return window.conceptBank['Recipe Overview']();
  };

  window.conceptBank['Redundant Conjuncts'] = function() {
    return {
      scenario: 'After one-point rule, the predicate includes <code>b ∈ ℕ</code> but b is declared as <code>b : ℕ</code>.',
      question: 'This conjunct can be removed because:',
      correct: 'It follows immediately from the declaration in the precondition schema.',
      distractors: [
        'It is always false.',
        'It contradicts the predicate.',
        'It is an output.'
      ]
    };
  };

  window.conceptBank['Recipe Step 3'] = function() {
    return {
      scenario: 'After dividing into Before/After/Mixed and expanding Mixed:',
      question: 'The precondition schema is formed as:',
      correct: '<code>[Before | ∃ After • Predicate]</code>',
      distractors: [
        '<code>[After | ∃ Before • Predicate]</code>',
        '<code>[Before ∧ After | Predicate]</code>',
        '<code>[Predicate]</code>'
      ]
    };
  };

  window.conceptBank['Tool Support'] = function() {
    return window.conceptBank['Recipe Overview']();
  };

  window.conceptBank['Goal of Simplification'] = function() {
    return {
      scenario: 'Steps 4–7 of the recipe simplify the precondition.',
      question: 'The goal is:',
      correct: 'Reduce to a clean, human-readable predicate on before-state + inputs.',
      distractors: [
        'Make the predicate more complex.',
        'Eliminate before-state variables.',
        'Add new after-state variables.'
      ]
    };
  };

  // ===== §14.4 Structure and Preconditions =====

  window.conceptBank['Distributivity over Disjunction'] = function() {
    return {
      scenario: '<code>Op ≅ Op₁ ∨ Op₂</code>.',
      question: '<code>pre Op</code> equals:',
      correct: '<code>pre Op₁ ∨ pre Op₂</code> — pre distributes over ∨.',
      distractors: [
        '<code>pre Op₁ ∧ pre Op₂</code>',
        '<code>pre Op₁</code> only.',
        '<code>true</code> always.'
      ]
    };
  };

  window.conceptBank['Non-Distributivity over Conjunction'] = function() {
    return {
      scenario: '<code>Op ≅ Op₁ ∧ Op₂</code>.',
      question: '<code>pre Op</code>:',
      correct: 'May NOT equal <code>pre Op₁ ∧ pre Op₂</code> — pre does not necessarily distribute over ∧.',
      distractors: [
        'Always equals <code>pre Op₁ ∧ pre Op₂</code>.',
        'Always equals <code>true</code>.',
        'Always equals <code>pre Op₁</code>.'
      ]
    };
  };

  window.conceptBank['Pre Distributes over Disjunction'] = function() {
    var ops = [
      {name:'Purchase', def:'(Purchase₀ ∧ Success) ∨ (NotAvailable ∧ Failure)', pre:'pre(Purchase₀ ∧ Success) ∨ pre(NotAvailable ∧ Failure)'},
      {name:'Book', def:'BookSeat ∨ FlightFull', pre:'pre BookSeat ∨ pre FlightFull'},
      {name:'Reservation', def:'Reserve ∨ NoRooms ∨ InvalidDate', pre:'pre Reserve ∨ pre NoRooms ∨ pre InvalidDate'},
      {name:'Checkout', def:'Pay ∨ PayFail ∨ StockOut', pre:'pre Pay ∨ pre PayFail ∨ pre StockOut'}
    ];
    var o = ops[Math.floor(Math.random()*ops.length)];
    return {
      scenario: '<span class="key">'+o.name+'</span> is defined as <code>'+o.def+'</code>.',
      question: 'What is <code>pre '+o.name+'</code>?',
      correct: '<code>'+o.pre+'</code>',
      distractors: [
        '<code>pre '+o.name+' = true</code>',
        '<code>pre '+o.name+' = false</code>',
        'Cannot be determined from structure.'
      ]
    };
  };

  window.conceptBank['No-Contribution Schema'] = function() {
    var pairs = [
      {op:'Transfer₀', nc:'AuditLog', ncDesc:'only writes log! = entry'},
      {op:'RecordGrade', nc:'Acknowledge', ncDesc:'only sets r! = okay'},
      {op:'CheckTicket', nc:'LogEntry', ncDesc:'only appends a log record'},
      {op:'Purchase₀', nc:'Success', ncDesc:'only sets r! = okay'}
    ];
    var p = pairs[Math.floor(Math.random()*pairs.length)];
    return {
      scenario: 'Operation is <code>'+p.op+' ∧ '+p.nc+'</code>. '+p.nc+' '+p.ncDesc+'.',
      question: 'What is the precondition?',
      correct: '<code>pre '+p.op+'</code> — '+p.nc+' contributes nothing.',
      distractors: [
        '<code>pre '+p.op+' ∧ pre '+p.nc+'</code>.',
        '<code>true</code>.',
        '<code>pre '+p.nc+'</code> only.'
      ]
    };
  };

  window.conceptBank['Free Promotion'] = function() {
    var ops = [
      {local:'Send_L', global:'GSend', localPre:'msg? ∈ outbox', delta:'ΔLocal'},
      {local:'Dispatch_L', global:'GDispatch', localPre:'pkg? ∈ warehouse', delta:'ΔPackage'},
      {local:'Process_L', global:'GProcess', localPre:'order? ∈ pending', delta:'ΔOrder'},
      {local:'Activate_L', global:'GActivate', localPre:'acct?.status = pending', delta:'ΔAcct'}
    ];
    var o = ops[Math.floor(Math.random()*ops.length)];
    return {
      scenario: '<span class="key">'+o.global+'</span> uses free promotion. <code>pre '+o.local+' ≡ '+o.localPre+'</code>.',
      question: 'What is <code>pre '+o.global+'</code>?',
      correct: '<code>∃ '+o.delta+' • '+o.localPre+'</code>',
      distractors: [
        '<code>'+o.localPre+'</code> directly.',
        '<code>true</code>.',
        '<code>false</code>.'
      ]
    };
  };

  window.conceptBank['Free vs Constrained Promotion'] = function() {
    return {
      scenario: 'A promotion schema relates local and global state.',
      question: 'The promotion is free when:',
      correct: '<code>∃ Local′ • ∃ Global′ • Promote ⇔ ∀ Local′ • ∃ Global′ • Promote</code>.',
      distractors: [
        'The promotion schema has no predicate.',
        'The local operation has precondition <code>true</code>.',
        'The global state is empty.'
      ]
    };
  };

  window.conceptBank['Combined Structure'] = function() {
    var ops = [
      {name:'ATM', def:'(Withdraw ∧ Audit) ∨ (InsufficientFunds ∧ Audit)', pre:'pre Withdraw ∨ pre InsufficientFunds', nc:'Audit'},
      {name:'POS', def:'(Charge ∧ Receipt) ∨ (CardDeclined ∧ Receipt)', pre:'pre Charge ∨ pre CardDeclined', nc:'Receipt'}
    ];
    var o = ops[Math.floor(Math.random()*ops.length)];
    return {
      scenario: '<span class="key">'+o.name+'</span> is <code>'+o.def+'</code>. '+o.nc+' is no-contribution.',
      question: 'What is <code>pre '+o.name+'</code>?',
      correct: '<code>'+o.pre+'</code>',
      distractors: [
        '<code>pre '+o.nc+'</code>.',
        '<code>true</code>.',
        'Cannot be simplified.'
      ]
    };
  };

  window.conceptBank['Constrained Promotion'] = function() {
    return {
      scenario: 'A promotion has a global constraint that restricts local after-states.',
      question: 'To calculate the precondition:',
      correct: 'Full direct calculation is required — the free promotion shortcut does not apply.',
      distractors: [
        '<code>pre GOp = ∃ ΔLocal • pre LOp</code>.',
        '<code>pre GOp = true</code>.',
        'No calculation needed.'
      ]
    };
  };

  window.conceptBank['Underlying Theorem'] = function() {
    return window.conceptBank['Distributivity over Disjunction']();
  };

  window.conceptBank['When Conjunction Works'] = function() {
    return window.conceptBank['No-Contribution Schema']();
  };

  window.conceptBank['Free Promotion Benefit'] = function() {
    return window.conceptBank['Free Promotion']();
  };

  window.conceptBank['Constrained Promotion Identification'] = function() {
    return window.conceptBank['Constrained Promotion']();
  };

  window.conceptBank['Disjunction Justification'] = function() {
    return window.conceptBank['Distributivity over Disjunction']();
  };

  window.conceptBank['Structural Simplification Purpose'] = function() {
    return {
      scenario: 'An operation is defined using disjunction, conjunction, and promotion.',
      question: 'The purpose of using structure for precondition calculation is:',
      correct: 'Save time and effort by factoring out parts of the calculation.',
      distractors: [
        'Eliminate all preconditions.',
        'Make operations total.',
        'Remove state variables.'
      ]
    };
  };

})();
