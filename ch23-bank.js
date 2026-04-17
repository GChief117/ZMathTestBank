// Chapter 23 — A Save Area: Concept Bank Generators
(function buildCh23Bank() {
  if (!window.conceptBank) window.conceptBank = {};

  // ===== §23.1 Specification =====

  var lifoSystems = [
    {name:'text editor', item:'document state'}, {name:'game engine', item:'checkpoint'},
    {name:'database', item:'transaction log'}, {name:'browser', item:'page URL'},
    {name:'photo editor', item:'layer snapshot'}, {name:'VM', item:'machine state'},
    {name:'git stash', item:'working-tree diff'}, {name:'clipboard', item:'copied content'}
  ];
  function pickSys() { return lifoSystems[Math.floor(Math.random()*lifoSystems.length)]; }

  window.conceptBank['Abstract State'] = function() {
    return {
      scenario: 'A save area module stores records.',
      question: 'The abstract state <code>SaveArea</code> holds:',
      correct: '<code>save_area : seq Record</code> — a sequence used as a stack.',
      distractors: ['A set of records (unordered).', 'A bag of records.', 'A single record.']
    };
  };

  window.conceptBank['Nondeterminism Reason'] = function() {
    var s = pickSys();
    return {
      scenario: 'A <span class="key">'+s.name+'</span> save operation may succeed or fail.',
      question: 'Why is Save nondeterministic?',
      correct: 'Either <code>Save₀</code> or <code>SaveFullErr</code> may fire — the spec does not determine which.',
      distractors: ['It uses random input.', 'It is untyped.', 'It always fails.']
    };
  };

  window.conceptBank['Save Success Schema'] = function() {
    var s = pickSys();
    return {
      scenario: 'A <span class="key">'+s.name+'</span> pushes a '+s.item+' onto its undo stack.',
      question: 'Which captures <code>Save₀</code>?',
      correct: '<code>save_area\' = save_area ⌢ ⟨record?⟩ ∧ status! = ok</code>',
      distractors: [
        '<code>save_area\' = ⟨record?⟩ ⌢ save_area</code> — wrong end.',
        '<code>save_area\' = save_area</code> — no change.',
        '<code>status! = full</code> — error branch.'
      ]
    };
  };

  window.conceptBank['Error Schema Structure'] = function() {
    return {
      scenario: 'An error schema handles a failed Save.',
      question: '<code>SaveFullErr</code> uses <code>ΞSaveArea</code> because:',
      correct: 'State is left unchanged on error — Ξ means no modification.',
      distractors: ['State is cleared.', 'Ξ means state is deleted.', 'Input is optional.']
    };
  };

  window.conceptBank['Restore Precondition'] = function() {
    var s = pickSys();
    return {
      scenario: 'A <span class="key">'+s.name+'</span> attempts to restore.',
      question: 'The precondition of <code>Restore₀</code> is:',
      correct: '<code>save_area ≠ ⟨⟩</code> — stack must be non-empty.',
      distractors: ['<code>save_area = ⟨⟩</code>.', '<code>true</code>.', '<code>false</code>.']
    };
  };

  window.conceptBank['Restore Schema'] = function() {
    return window.conceptBank['Restore Precondition']();
  };

  window.conceptBank['LIFO Ordering'] = function() {
    var items = ['A','B','C','D','E','F'];
    var n = 2 + Math.floor(Math.random()*3);
    var pushed = items.slice(0, n);
    return {
      scenario: 'Records '+pushed.join(', ')+' are pushed in order from empty.',
      question: 'The save_area is:',
      correct: '<code>⟨'+pushed.join(', ')+'⟩</code> — '+pushed[pushed.length-1]+' is on top.',
      distractors: [
        '<code>⟨'+pushed.slice().reverse().join(', ')+'⟩</code> — reversed.',
        '<code>⟨⟩</code> — empty.',
        '<code>⟨'+pushed[0]+'⟩</code> — only first.'
      ]
    };
  };

  window.conceptBank['Loose vs Nondeterministic'] = function() {
    return {
      scenario: 'A spec declares <code>n : ℕ</code> and <code>Save ≅ Save₀ ∨ SaveFullErr</code>.',
      question: 'Loose vs nondeterministic:',
      correct: 'Loose leaves a constant unfixed; nondeterministic has internal choice at use-time.',
      distractors: ['They are identical.', 'Loose means missing predicates.', 'Nondeterministic means untyped.']
    };
  };

  window.conceptBank['LIFO Pop Order'] = function() {
    return window.conceptBank['LIFO Ordering']();
  };

  window.conceptBank['Save Disjunction'] = function() {
    return window.conceptBank['Nondeterminism Reason']();
  };

  window.conceptBank['Status Type'] = function() {
    return {
      scenario: 'Operations report outcomes.',
      question: 'The status type is:',
      correct: '<code>Status ::= ok | full | empty</code>',
      distractors: ['<code>Status ::= ℤ</code>', '<code>Status ::= true | false</code>', '<code>Status ::= Record</code>']
    };
  };

  window.conceptBank['Save Full Error'] = function() { return window.conceptBank['Error Schema Structure'](); };
  window.conceptBank['Deterministic Restore'] = function() { return window.conceptBank['Restore Precondition'](); };
  window.conceptBank['Empty Restore Error'] = function() { return window.conceptBank['Restore Precondition'](); };
  window.conceptBank['Precondition Table'] = function() {
    return {
      scenario: 'Table 23.1 lists preconditions for Save and Restore.',
      question: 'The precondition of Save (full disjunction) is:',
      correct: '<code>true</code> — both branches always fireable.',
      distractors: ['<code>save_area ≠ ⟨⟩</code>.', '<code>false</code>.', '<code>save_area = ⟨⟩</code>.']
    };
  };
  window.conceptBank['Single-Element Restore'] = function() { return window.conceptBank['Restore Precondition'](); };
  window.conceptBank['Modularity Reason'] = function() { return window.conceptBank['Nondeterminism Reason'](); };
  window.conceptBank['Loose Constant'] = function() { return window.conceptBank['Loose vs Nondeterministic'](); };
  window.conceptBank['Tightening vs Refinement'] = function() { return window.conceptBank['Loose vs Nondeterministic'](); };
  window.conceptBank['Multi-Step LIFO'] = function() { return window.conceptBank['LIFO Ordering'](); };
  window.conceptBank['Restore Signature'] = function() { return window.conceptBank['Restore Precondition'](); };
  window.conceptBank['Input Convention'] = function() { return window.conceptBank['Save Success Schema'](); };
  window.conceptBank['Total Operations'] = function() { return window.conceptBank['Precondition Table'](); };
  window.conceptBank['Tail Pop'] = function() { return window.conceptBank['LIFO Ordering'](); };
  window.conceptBank['Abstraction Benefit'] = function() { return window.conceptBank['Nondeterminism Reason'](); };

  // ===== §23.2 Design =====

  window.conceptBank['Bounded Sequence Definition'] = function() {
    return {
      scenario: 'A bounded sequence limits length to n.',
      question: '<code>bseq[X]</code> is:',
      correct: '<code>{ s : seq X | #s ≤ n }</code>',
      distractors: ['<code>{ s : seq X | #s = n }</code>', '<code>{ s : seq X | #s > n }</code>', '<code>{ s : seq X | true }</code>']
    };
  };

  window.conceptBank['Full Sequence Definition'] = function() {
    return {
      scenario: 'A full sequence has exactly n elements.',
      question: '<code>fseq[X]</code> is:',
      correct: '<code>{ s : seq X | #s = n }</code>',
      distractors: ['<code>{ s : seq X | #s ≤ n }</code>', '<code>{ s : seq X | #s ≠ n }</code>', 'Empty sequence.']
    };
  };

  window.conceptBank['Retrieve Computation'] = function() {
    var items = ['a','b','c','d','e','f','g','h'];
    var n = 2 + Math.floor(Math.random()*2);
    var sec = items.slice(0, n);
    var mn = items.slice(n, n + 1 + Math.floor(Math.random()*2));
    var full = sec.concat(mn);
    return {
      scenario: '<code>n = '+n+'</code>, <code>secondary = ⟨⟨'+sec.join(',')+'⟩⟩</code>, <code>main = ⟨'+mn.join(',')+'⟩</code>.',
      question: 'What is <code>save_area</code>?',
      correct: '<code>⟨'+full.join(', ')+'⟩</code>',
      distractors: [
        '<code>⟨'+mn.concat(sec).join(', ')+'⟩</code> — wrong order.',
        '<code>⟨'+mn.join(', ')+'⟩</code> — main only.',
        '<code>⟨'+sec.join(', ')+'⟩</code> — secondary only.'
      ]
    };
  };

  window.conceptBank['Concrete State Schema'] = function() { return window.conceptBank['Bounded Sequence Definition'](); };
  window.conceptBank['Flush Trigger'] = function() {
    return {
      scenario: 'A checkpoint arrives.',
      question: 'Flushing to secondary fires when:',
      correct: '<code>#main = n</code> — main is full.',
      distractors: ['<code>#main < n</code> — room.', '<code>secondary = ⟨⟩</code>.', 'Always.']
    };
  };
  window.conceptBank['Retrieve Bijectivity'] = function() { return window.conceptBank['Retrieve Computation'](); };
  window.conceptBank['Append Case'] = function() { return window.conceptBank['Flush Trigger'](); };
  window.conceptBank['Flush Case'] = function() { return window.conceptBank['Flush Trigger'](); };
  window.conceptBank['Distributed Concatenation'] = function() { return window.conceptBank['Retrieve Computation'](); };
  window.conceptBank['Capacity Constraint'] = function() { return window.conceptBank['Bounded Sequence Definition'](); };
  window.conceptBank['Abstract Length'] = function() { return window.conceptBank['Retrieve Computation'](); };
  window.conceptBank['Secondary Elements'] = function() { return window.conceptBank['Full Sequence Definition'](); };
  window.conceptBank['Empty State'] = function() { return window.conceptBank['Retrieve Computation'](); };
  window.conceptBank['Invariant Preservation'] = function() { return window.conceptBank['Flush Trigger'](); };
  window.conceptBank['Flush-and-Seed Behaviour'] = function() { return window.conceptBank['Flush Trigger'](); };
  window.conceptBank['Error Schema Decoration'] = function() { return window.conceptBank['Error Schema Structure'](); };
  window.conceptBank['Multi-Save Trace'] = function() { return window.conceptBank['Retrieve Computation'](); };
  window.conceptBank['Distributed Concatenation of Empty'] = function() { return window.conceptBank['Retrieve Computation'](); };
  window.conceptBank['Total Record Count'] = function() { return window.conceptBank['Retrieve Computation'](); };
  window.conceptBank['Retrieve Schema'] = function() { return window.conceptBank['Retrieve Computation'](); };
  window.conceptBank['Valid Concrete State'] = function() { return window.conceptBank['Bounded Sequence Definition'](); };
  window.conceptBank['Disjunct Guards'] = function() { return window.conceptBank['Flush Trigger'](); };
  window.conceptBank['CSave Structure'] = function() { return window.conceptBank['Flush Trigger'](); };
  window.conceptBank['Distributed Concatenation of Singleton'] = function() { return window.conceptBank['Retrieve Computation'](); };
  window.conceptBank['Data Refinement'] = function() { return window.conceptBank['Retrieve Computation'](); };

  // ===== §23.3 Further Design =====

  window.conceptBank['Array Type Definition'] = function() {
    return {
      scenario: 'A fixed-length array models main memory.',
      question: '<code>Array[X]</code> is:',
      correct: '<code>(1..n) → X</code> — total function from indices to values.',
      distractors: ['<code>seq X</code> — unbounded.', '<code>ℙ X</code> — power set.', '<code>X → ℕ</code> — reversed.']
    };
  };

  window.conceptBank['Counter Purpose'] = function() {
    return {
      scenario: 'A counter variable is added to CSaveArea1.',
      question: '<code>count : 0..n</code> tracks:',
      correct: 'How many array cells currently hold valid data.',
      distractors: ['Total array capacity.', 'Number of secondary blocks.', 'Nothing.']
    };
  };

  window.conceptBank['Domain Restriction Retrieve'] = function() {
    var count = 1 + Math.floor(Math.random()*4);
    var n = count + 1 + Math.floor(Math.random()*3);
    return {
      scenario: '<code>n = '+n+'</code>, <code>count = '+count+'</code>.',
      question: '<code>main</code> equals:',
      correct: '<code>(1..'+count+') ◁ array</code> — first '+count+' cells.',
      distractors: ['<code>(1..'+n+') ◁ array</code> — all cells.', '<code>array</code> unrestricted.', '<code>⟨⟩</code>.']
    };
  };

  window.conceptBank['Function Override'] = function() {
    return {
      scenario: 'A record is stored at position <code>count + 1</code>.',
      question: 'The array update is:',
      correct: '<code>array\' = array ⊕ {count + 1 ↦ record?}</code>',
      distractors: ['<code>array\' = array \\ {count + 1}</code> — deletion.', '<code>array\' = ∅</code>.', '<code>array\' = array</code> — no change.']
    };
  };

  window.conceptBank['CCSave Append Case'] = function() { return window.conceptBank['Function Override'](); };
  window.conceptBank['CCSave Flush Case'] = function() {
    return {
      scenario: 'Array is full (<code>count = n</code>). Save fires.',
      question: 'What happens?',
      correct: '<code>count\' = 1</code>, <code>array\' 1 = record?</code>, <code>secondary\' = secondary ⌢ ⟨array⟩</code>.',
      distractors: ['<code>count\' = count + 1</code>.', '<code>secondary\' = ⟨⟩</code>.', '<code>status! = full</code>.']
    };
  };
  window.conceptBank['Count Simplification'] = function() { return window.conceptBank['Counter Purpose'](); };
  window.conceptBank['CSaveArea1 State'] = function() { return window.conceptBank['Array Type Definition'](); };
  window.conceptBank['Retrieve1'] = function() { return window.conceptBank['Domain Restriction Retrieve'](); };
  window.conceptBank['Append Case with Array'] = function() { return window.conceptBank['Function Override'](); };
  window.conceptBank['Flush Case with Array'] = function() { return window.conceptBank['CCSave Flush Case'](); };
  window.conceptBank['Stale Data'] = function() { return window.conceptBank['Counter Purpose'](); };
  window.conceptBank['CCSaveFullErr'] = function() { return window.conceptBank['Error Schema Structure'](); };
  window.conceptBank['Multi-Save with Array'] = function() { return window.conceptBank['CCSave Flush Case'](); };
  window.conceptBank['Surjectivity of Retrieve1'] = function() { return window.conceptBank['Domain Restriction Retrieve'](); };
  window.conceptBank['Two Refinement Levels'] = function() { return window.conceptBank['Array Type Definition'](); };
  window.conceptBank['Domain Restriction Effect'] = function() { return window.conceptBank['Domain Restriction Retrieve'](); };
  window.conceptBank['CCSave Disjunction'] = function() { return window.conceptBank['CCSave Flush Case'](); };
  window.conceptBank['Append vs Flush Guard'] = function() { return window.conceptBank['Flush Trigger'](); };
  window.conceptBank['Array vs Sequence Trade-off'] = function() { return window.conceptBank['Array Type Definition'](); };
  window.conceptBank['Secondary Unchanged'] = function() { return window.conceptBank['Array Type Definition'](); };
  window.conceptBank['Init at Array Level'] = function() { return window.conceptBank['Counter Purpose'](); };
  window.conceptBank['Total Function Property'] = function() { return window.conceptBank['Array Type Definition'](); };
  window.conceptBank['Maplet Notation'] = function() { return window.conceptBank['Function Override'](); };

  // ===== §23.4 Refinement to Code =====

  window.conceptBank['Decomposition Purpose'] = function() {
    return {
      scenario: 'CCSave₀ is decomposed into CCUpdateSM and CCUpdateMM.',
      question: 'The purpose is:',
      correct: 'Isolate the two disjuncts so each can be refined to code independently.',
      distractors: ['Merge them.', 'Remove the error branch.', 'Delete secondary memory.']
    };
  };

  window.conceptBank['Conditional Introduction Rule'] = function() {
    return {
      scenario: 'A specification has two complementary guards.',
      question: 'Conditional introduction produces:',
      correct: '<code>if guard → branch1 □ ¬guard → branch2 fi</code>.',
      distractors: ['A single assignment.', 'A loop.', 'Nothing.']
    };
  };

  window.conceptBank['Main-Memory Assignment'] = function() {
    return {
      scenario: 'The <code>count < n</code> branch is refined.',
      question: 'The resulting assignment is:',
      correct: '<code>count, array, status! := count + 1, array ⊕ {count + 1 ↦ record?}, ok</code>.',
      distractors: ['<code>count := 1; array 1 := record?</code> — flush.', '<code>status! := full</code>.', '<code>skip</code>.']
    };
  };

  window.conceptBank['Sequential Composition'] = function() {
    return {
      scenario: 'The <code>count = n</code> branch needs two phases.',
      question: 'Sequential composition is needed because:',
      correct: 'The secondary update must complete before we know whether to reset or skip.',
      distractors: ['Both can happen in parallel.', 'No reason.', 'Only one phase exists.']
    };
  };

  window.conceptBank['Nested Conditional'] = function() { return window.conceptBank['Conditional Introduction Rule'](); };
  window.conceptBank['CCUpdateSM Schema'] = function() { return window.conceptBank['CCSave Flush Case'](); };
  window.conceptBank['CCUpdateMM Schema'] = function() { return window.conceptBank['Main-Memory Assignment'](); };
  window.conceptBank['Assignment for count < n'] = function() { return window.conceptBank['Main-Memory Assignment'](); };
  window.conceptBank['Sequential Composition for count = n'] = function() { return window.conceptBank['Sequential Composition'](); };
  window.conceptBank['Recursive Observation'] = function() {
    return {
      scenario: 'After refining the save operation, a spec statement remains for secondary memory.',
      question: 'This is notable because:',
      correct: 'It has the same shape as the original save-area interface — the design is recursive.',
      distractors: ['It uses a loop.', 'It calls itself directly.', 'It has no structure.']
    };
  };
  window.conceptBank['Strengthen Postcondition'] = function() { return window.conceptBank['Main-Memory Assignment'](); };
  window.conceptBank['Error Branch at Code Level'] = function() {
    return {
      scenario: 'In the count = n branch, status! = full after secondary update.',
      question: 'The code for this case is:',
      correct: '<code>skip</code> — no further state change needed.',
      distractors: ['<code>count := 1</code>.', '<code>array := ∅</code>.', 'Abort.']
    };
  };
  window.conceptBank['Full Code Structure'] = function() { return window.conceptBank['Conditional Introduction Rule'](); };
  window.conceptBank['Refinement Relation'] = function() { return window.conceptBank['Decomposition Purpose'](); };
  window.conceptBank['Why Sequential Composition'] = function() { return window.conceptBank['Sequential Composition'](); };
  window.conceptBank['Assignment for Flush Reset'] = function() { return window.conceptBank['Main-Memory Assignment'](); };
  window.conceptBank['Guard Completeness'] = function() { return window.conceptBank['Conditional Introduction Rule'](); };
  window.conceptBank['Skip Introduction'] = function() { return window.conceptBank['Error Branch at Code Level'](); };
  window.conceptBank['Recursive Implication'] = function() { return window.conceptBank['Recursive Observation'](); };
  window.conceptBank['Full Refinement Chain'] = function() { return window.conceptBank['Decomposition Purpose'](); };
  window.conceptBank['Refinement Calculus Rules Used'] = function() { return window.conceptBank['Conditional Introduction Rule'](); };
  window.conceptBank['Strengthen Postcondition Application'] = function() { return window.conceptBank['Main-Memory Assignment'](); };
  window.conceptBank['Parallel Assignment'] = function() { return window.conceptBank['Main-Memory Assignment'](); };
  window.conceptBank['Secondary Memory Spec Statement'] = function() { return window.conceptBank['Recursive Observation'](); };
  window.conceptBank['Design Summary'] = function() { return window.conceptBank['Decomposition Purpose'](); };

})();
