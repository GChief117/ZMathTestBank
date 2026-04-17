// Chapter 18 — Functional Refinement: Concept Bank Generators
(function buildCh18Bank() {

  window.conceptBank = window.conceptBank || {};

  // ===================== §18.1 Retrieve functions =====================

  window.conceptBank['Retrieve Function Definition'] = function() {
    var pool = [
      { q: 'A retrieve function maps:', c: 'Each concrete state to exactly one abstract state.', d: ['Each abstract state to many concrete states.','Concrete to concrete.','Abstract to abstract.'] },
      { q: 'A retrieve function is:', c: 'A total function f : Conc &rarr; Abs.', d: ['A relation that is not a function.','A partial function always.','An operation on abstract state.'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Cancellation Law'] = function() {
    return {
      scenario: '',
      question: 'The cancellation law states:',
      correct: '<code>R &sube; S &#x2A1E; f<sup>~</sup> &hArr; R &#x2A1E; f &sube; S</code> when f is total.',
      distractors: ['<code>R = S</code>.','<code>f = f<sup>~</sup></code>.','<code>R &sube; &empty;</code>.']
    };
  };

  window.conceptBank['Identifying Retrieve Functions'] = function() {
    var pool = [
      { s: 'A sorted list refines a set.', c: '<code>f(l) = ran l</code>', d: ['<code>f(l) = #l</code>','<code>f(l) = head l</code>','<code>f(l) = dom l</code>'] },
      { s: 'An array+top refines a sequence.', c: '<code>f(arr, top) = arr &#x25C1; 1..top</code>', d: ['<code>f(arr, top) = arr</code>','<code>f(arr, top) = top</code>','<code>f(arr, top) = ran arr</code>'] },
      { s: 'A list with counts refines a bag.', c: '<code>f(l) = items(l)</code>', d: ['<code>f(l) = ran l</code>','<code>f(l) = head l</code>','<code>f(l) = &empty;</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: p.s, question: 'Which retrieve function is correct?', correct: p.c, distractors: p.d };
  };

  window.conceptBank['Total vs Partial Retrieve'] = function() {
    var pool = [
      { q: 'A circular buffer retrieve defined only when count &le; size is:', c: 'Partial &mdash; defined only on valid concrete states.', d: ['Total.','Not a function.','Multi-valued.'] },
      { q: 'A retrieve via <code>ran</code> on any list is:', c: 'Total &mdash; defined on every sequence.', d: ['Partial.','Multi-valued.','Undefined.'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Cancellation Law Application'] = function() {
    return {
      scenario: '',
      question: 'The cancellation law replaces reasoning about f~ with:',
      correct: 'Post-composing with f on the concrete side.',
      distractors: ['Removing f entirely.','Pre-composing with f~ twice.','Replacing f with identity.']
    };
  };

  window.conceptBank['F-init-func-rel'] = function() {
    return {
      scenario: '',
      question: 'F-init-func-rel is:',
      correct: '<code>ci &#x2A1E; f &sube; ai</code>',
      distractors: ['<code>ai &#x2A1E; f &sube; ci</code>','<code>ci = ai</code>','<code>f &sube; ci</code>']
    };
  };

  window.conceptBank['F-corr-func-rel'] = function() {
    return {
      scenario: '',
      question: 'F-corr-func-rel is:',
      correct: '<code>dom ao &#x25C1; f<sup>~</sup> &#x2A1E; co &#x2A1E; f &sube; ao</code>',
      distractors: ['<code>co = ao</code>','<code>f &#x2A1E; co = ao &#x2A1E; f</code>','<code>co &sube; ao</code>']
    };
  };

  window.conceptBank['Init Proof'] = function() {
    var pool = [
      { s: 'Contact book: <code>l\' = &lang;&rang;</code>, abstract <code>contacts\' = &empty;</code>, <code>f = ran</code>.', c: '<code>ran &lang;&rang; = &empty; &isin; ai</code>', d: ['<code>ran &lang;&rang; = {0}</code>','<code>ran &lang;&rang;</code> undefined','<code>&lang;&rang; &isin; &Popf;</code>'] },
      { s: 'Stack: <code>top\' = 0</code>, abstract <code>stack\' = &lang;&rang;</code>, <code>f(arr,top) = arr &#x25C1; 1..top</code>.', c: '<code>f(arr, 0) = &lang;&rang; &isin; ai</code>', d: ['<code>f(arr, 0) = arr</code>','<code>f(arr, 0)</code> undefined','<code>top = arr</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: p.s, question: 'F-init-func-rel holds because:', correct: p.c, distractors: p.d };
  };

  window.conceptBank['Composition of Retrieves'] = function() {
    return {
      scenario: '',
      question: 'Two retrieve functions compose as:',
      correct: '<code>g &#x2218; f : C &rarr; A</code> &mdash; ordinary function composition.',
      distractors: ['<code>f + g</code>','<code>f &cap; g</code>','They cannot compose.']
    };
  };

  window.conceptBank['Why Functional'] = function() {
    return {
      scenario: '',
      question: 'Retrieve functions simplify proofs because:',
      correct: 'Existentials over abstract states become function applications.',
      distractors: ['They add more quantifiers.','They require backward simulation.','They eliminate the concrete state.']
    };
  };

  window.conceptBank['Correctness Proof'] = function() {
    return {
      scenario: 'Sorted-list insert: <code>f(sortedInsert(l, n?)) = ran l &cup; {n?}</code>.',
      question: 'This proves:',
      correct: 'F-corr-func-rel: concrete insert commutes with retrieve.',
      distractors: ['F-init-func-rel.','Surjectivity of retrieve.','The cancellation law itself.']
    };
  };

  window.conceptBank['Weaker Condition'] = function() {
    return {
      scenario: '',
      question: 'The weaker condition that suffices instead of f total is:',
      correct: '<code>ran R &sube; dom f</code>',
      distractors: ['<code>dom f = &empty;</code>','<code>f = f<sup>~</sup></code>','<code>R = S</code>']
    };
  };

  window.conceptBank['Non-functional Retrieve'] = function() {
    return {
      scenario: '',
      question: 'A retrieve relation that is NOT a function means:',
      correct: 'One concrete state may correspond to multiple abstract states.',
      distractors: ['The retrieve is undefined.','The refinement is impossible.','Abstract and concrete are identical.']
    };
  };

  window.conceptBank['Retrieve Direction'] = function() {
    return {
      scenario: '',
      question: 'A retrieve function goes from:',
      correct: 'Concrete to abstract.',
      distractors: ['Abstract to concrete.','Concrete to concrete.','Abstract to abstract.']
    };
  };

  window.conceptBank['Applicability'] = function() {
    return {
      scenario: '',
      question: 'Applicability in F-corr-func-rel ensures:',
      correct: '<code>ran((dom ao) &#x25C1; f<sup>~</sup>) &sube; dom co</code> &mdash; concrete op defined where abstract applies.',
      distractors: ['<code>dom co = &empty;</code>','<code>ao &sube; co</code>','<code>f = co</code>']
    };
  };

  window.conceptBank['Practical Prevalence'] = function() {
    return {
      scenario: '',
      question: 'Most practical Z refinements use retrieve functions because:',
      correct: 'Implementations typically determine a unique abstract view.',
      distractors: ['Relations are impossible.','Functions are always total.','Abstract specs are always functions.']
    };
  };

  window.conceptBank['Mechanised Proofs'] = function() {
    return {
      scenario: '',
      question: 'Functional retrieves benefit provers because:',
      correct: 'The retrieve computes the abstract view &mdash; no existential witness search.',
      distractors: ['Provers cannot handle relations.','Functions are always bijective.','No proof obligations remain.']
    };
  };

  window.conceptBank['Surjectivity'] = function() {
    return {
      scenario: '',
      question: 'A surjective retrieve function means:',
      correct: 'Every abstract state has at least one concrete representation.',
      distractors: ['The function is injective.','The function is partial.','No concrete states exist.']
    };
  };

  window.conceptBank['Canonical View'] = function() {
    return {
      scenario: '',
      question: 'A retrieve function ensures:',
      correct: 'One canonical abstract view per concrete state.',
      distractors: ['Multiple abstract views per concrete state.','No abstract view exists.','Abstract and concrete are identical.']
    };
  };

  // ===================== §18.2 Functional refinement =====================

  window.conceptBank['F-func Obligation'] = function() {
    return {
      scenario: '',
      question: 'F-func requires proving:',
      correct: '<code>&forall; C &bull; &exist;<sub>1</sub> A &bull; R</code> &mdash; retrieve is a total function.',
      distractors: ['<code>&forall; A &bull; &exist;<sub>1</sub> C &bull; R</code>','<code>R = &empty;</code>','<code>&forall; C &bull; R</code>']
    };
  };

  window.conceptBank['Correctness Rule'] = function() {
    return {
      scenario: '',
      question: 'F-corr-func correctness states:',
      correct: '<code>&forall; A; A\'; C; C\' &bull; pre AO &and; R &and; CO &and; R\' &rArr; AO</code>',
      distractors: ['<code>CO = AO</code>','<code>R &rArr; AO</code>','<code>&forall; C &bull; CO</code>']
    };
  };

  window.conceptBank['Commuting Diagram'] = function() {
    var pool = [
      { s: 'Banking: <code>ADeposit(b,x) = b+x</code>, <code>CDeposit(c,x) = c+x&times;100</code>, <code>r(c) = c/100</code>.', c: '<code>r(CDeposit(c,x)) = c/100 + x = ADeposit(r(c),x)</code>', d: ['<code>r = ADeposit</code>','<code>CDeposit = ADeposit</code>','<code>r(c) = c</code>'] },
      { s: 'To-do: <code>AAdd(S,t) = S &cup; {t}</code>, <code>CAdd(l,t) = l &#x2040; &lang;t&rang;</code>, <code>r = ran</code>.', c: '<code>r(CAdd(l,t)) = ran l &cup; {t} = AAdd(r(l),t)</code>', d: ['<code>r = t</code>','<code>CAdd = AAdd</code>','<code>ran l = l</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: p.s, question: 'Which proves commutation?', correct: p.c, distractors: p.d };
  };

  window.conceptBank['Applicability Rule'] = function() {
    return {
      scenario: '',
      question: 'F-corr-func applicability states:',
      correct: '<code>&forall; A; C &bull; pre AO &and; R &rArr; pre CO</code>',
      distractors: ['<code>pre CO &rArr; pre AO</code>','<code>pre AO = true</code>','<code>pre CO = &empty;</code>']
    };
  };

  window.conceptBank['Equational vs Existential'] = function() {
    return {
      scenario: '',
      question: 'Functional refinement proofs avoid existentials because:',
      correct: 'The retrieve function directly computes abstract from concrete.',
      distractors: ['Existentials are invalid in Z.','The concrete state is always empty.','Only forward simulation uses existentials.']
    };
  };

  window.conceptBank['Non-deterministic Case'] = function() {
    return {
      scenario: '',
      question: 'When operations are non-deterministic, correctness uses:',
      correct: 'Inclusion (&sube;) instead of equality.',
      distractors: ['Equality always.','No proof obligation.','Backward simulation only.']
    };
  };

  window.conceptBank['Equation-based Retrieve'] = function() {
    return {
      scenario: '',
      question: 'If the retrieve is defined by an equation (e.g., s = ran l), F-func:',
      correct: 'Holds automatically &mdash; the equation defines A uniquely from C.',
      distractors: ['Must still be proven separately.','Fails.','Requires backward simulation.']
    };
  };

  window.conceptBank['Proof Burden'] = function() {
    return {
      scenario: '',
      question: 'Functional refinement\'s proof burden is:',
      correct: 'Smaller than general data refinement &mdash; fewer quantifiers.',
      distractors: ['Larger.','Identical.','No obligations at all.']
    };
  };

  window.conceptBank['Commuting Diagram Meaning'] = function() {
    return {
      scenario: '',
      question: 'A commuting diagram proves:',
      correct: 'Two paths (concrete-then-retrieve vs retrieve-then-abstract) give equal results.',
      distractors: ['The concrete op is faster.','The abstract op is undefined.','Only one path exists.']
    };
  };

  window.conceptBank['Proof Style'] = function() {
    return {
      scenario: '',
      question: 'Functional refinement proofs typically follow:',
      correct: 'A chain of equalities &mdash; calculational style.',
      distractors: ['A truth table.','A counterexample argument.','An induction proof.']
    };
  };

  window.conceptBank['Existential Elimination'] = function() {
    return {
      scenario: '',
      question: '<code>&exist; a &bull; R(c,a) &and; P(a)</code> simplifies to:',
      correct: '<code>P(f(c))</code> &mdash; substitute the retrieve function.',
      distractors: ['<code>&forall; a &bull; P(a)</code>','<code>P(&empty;)</code>','No simplification possible.']
    };
  };

  window.conceptBank['Surjective Retrieve'] = function() {
    return {
      scenario: '',
      question: 'A surjective retrieve means:',
      correct: 'Every abstract state is representable by some concrete state.',
      distractors: ['The retrieve is injective.','The retrieve is partial.','No concrete states exist.']
    };
  };

  window.conceptBank['SumSizeRetrieve Counterexample'] = function() {
    return {
      scenario: 'SumSizeRetrieve goes abstract &rarr; concrete.',
      question: 'Can it simplify proof obligations?',
      correct: 'No &mdash; the function goes the wrong direction (needs Conc &rarr; Abs).',
      distractors: ['Yes &mdash; any surjection works.','Yes &mdash; direction doesn\'t matter.','No retrieve exists.']
    };
  };

  window.conceptBank['Common Pattern'] = function() {
    return {
      scenario: '',
      question: 'Functional refinement is preferred because:',
      correct: 'Proofs reduce to algebra &mdash; easy to follow and verify.',
      distractors: ['It is the only valid method.','General data refinement is impossible.','No obligations required.']
    };
  };

  window.conceptBank['Unified Equation'] = function() {
    return {
      scenario: '',
      question: 'Functional refinement unifies abstract and concrete via:',
      correct: 'A commuting equation: <code>f &#x2218; co = ao &#x2218; f</code>.',
      distractors: ['An arbitrary relation.','A free type declaration.','No connection between levels.']
    };
  };

  // ===================== §18.3 Calculating data refinements =====================

  window.conceptBank['Weakest Refinement Definition'] = function() {
    return {
      scenario: '',
      question: 'The weakest refinement W satisfies:',
      correct: '<code>A &#x2291; W</code> and for every C refining A, <code>W &#x2291; C</code>.',
      distractors: ['<code>W = A</code>','<code>W = &empty;</code>','<code>A &#x2291; C</code> only']
    };
  };

  window.conceptBank['Correct by Construction'] = function() {
    return {
      scenario: '',
      question: 'Correct by construction means:',
      correct: 'If each derivation step is sound, the whole result is sound.',
      distractors: ['A separate proof is always needed.','The result may contain errors.','Only applies to free types.']
    };
  };

  window.conceptBank['Calculating Operations'] = function() {
    return {
      scenario: '',
      question: 'The weakest concrete operation formula is:',
      correct: '<code>wo == f &#x2A1E; ao &#x2A1E; f<sup>~</sup></code>',
      distractors: ['<code>wo == ao</code>','<code>wo == f<sup>~</sup> &#x2A1E; ao</code>','<code>wo == f &#x2A1E; f<sup>~</sup></code>']
    };
  };

  window.conceptBank['Weakest Init'] = function() {
    return {
      scenario: '',
      question: 'The weakest concrete initialisation is:',
      correct: '<code>wi == ai &#x2A1E; f<sup>~</sup></code>',
      distractors: ['<code>wi == ai</code>','<code>wi == f &#x2A1E; ai</code>','<code>wi == f<sup>~</sup></code>']
    };
  };

  window.conceptBank['Weakest vs Actual'] = function() {
    return {
      scenario: 'Building Enter: weakest = <code>ran l\' = ran l &cup; {p?}</code>. Actual = <code>l\' = l &#x2040; &lang; p? &rang;</code>.',
      question: 'The actual is:',
      correct: 'Stronger &mdash; it prescribes where p? goes (the end).',
      distractors: ['Weaker.','Equal.','Unrelated.']
    };
  };

  window.conceptBank['Temperature Init Calculation'] = function() {
    return {
      scenario: 'Abstract <code>f\' = 65</code>, retrieve <code>f = (9/5)c + 32</code>.',
      question: 'Calculated concrete init:',
      correct: '<code>c\' = (5/9) &times; (65 &minus; 32)</code>',
      distractors: ['<code>c\' = 65</code>','<code>c\' = 32</code>','<code>c\' = 0</code>']
    };
  };

  window.conceptBank['Temperature Inc Calculation'] = function() {
    return {
      scenario: 'Abstract <code>f\' = f + 1</code>, retrieve <code>f = (9/5)c + 32</code>.',
      question: 'Calculated concrete increment:',
      correct: '<code>c\' = c + (5/9)</code>',
      distractors: ['<code>c\' = c + 1</code>','<code>c\' = c + (9/5)</code>','<code>c\' = c &minus; 1</code>']
    };
  };

  window.conceptBank['SumSizeRetrieve Direction'] = function() {
    return {
      scenario: 'SumSizeRetrieve goes abstract &rarr; concrete.',
      question: 'Can it calculate the weakest refinement?',
      correct: 'No &mdash; formula requires f : Conc &rarr; Abs.',
      distractors: ['Yes &mdash; any function works.','Yes &mdash; direction irrelevant.','No retrieve exists.']
    };
  };

  window.conceptBank['Schema Calculation'] = function() {
    return {
      scenario: '',
      question: 'Calculating a concrete operation with schemas uses:',
      correct: '<code>CO &cong; F &#x2A1E; AO &#x2A1E; F\'</code>',
      distractors: ['<code>CO = AO</code>','<code>CO &cong; F\'</code>','<code>CO &cong; AO</code>']
    };
  };

  window.conceptBank['Surjectivity Requirement'] = function() {
    return {
      scenario: '',
      question: 'Calculating weakest refinement requires:',
      correct: 'Total and surjective retrieve (or weaker: dom ao &sube; ran f).',
      distractors: ['Injective.','Partial only.','Undefined.']
    };
  };

  window.conceptBank['Design is Proof'] = function() {
    return {
      scenario: '',
      question: 'Calculating a refinement produces:',
      correct: 'Both the implementation and its refinement proof.',
      distractors: ['Only the implementation.','Only the proof.','Neither.']
    };
  };

  window.conceptBank['Leave Weakest'] = function() {
    return {
      scenario: 'Building Leave: weakest = <code>ran l\' = ran l \\ {p?}</code>.',
      question: 'Calculating weakest reveals:',
      correct: 'The exact design step &mdash; ordering is extra beyond the minimum.',
      distractors: ['No design decision was made.','Weakest and actual are identical.','Order is required.']
    };
  };

  window.conceptBank['Calculation vs Guess'] = function() {
    return {
      scenario: '',
      question: 'Calculation differs from guess-and-verify because:',
      correct: 'It derives the concrete form systematically &mdash; no guessing.',
      distractors: ['They are identical.','Guess-and-verify is always better.','Calculation never produces a result.']
    };
  };

  window.conceptBank['Temperature Dec'] = function() {
    return {
      scenario: 'Abstract <code>f\' = f &minus; 1</code>, retrieve <code>f = (9/5)c + 32</code>.',
      question: 'Calculated concrete decrement:',
      correct: '<code>c\' = c &minus; (5/9)</code>',
      distractors: ['<code>c\' = c &minus; 1</code>','<code>c\' = c + (5/9)</code>','<code>c\' = c &minus; (9/5)</code>']
    };
  };

  window.conceptBank['Retrieve Bijection'] = function() {
    return {
      scenario: '',
      question: 'When the retrieve is a bijection, calculation is clean because:',
      correct: 'The inverse f~ is also a total function &mdash; no ambiguity.',
      distractors: ['Bijections are always the identity.','No retrieve is needed.','Only works for &Nopf;.']
    };
  };

  window.conceptBank['Analogy'] = function() {
    return {
      scenario: '',
      question: 'Refinement calculation is analogous to:',
      correct: 'Program derivation via algebraic transformation (Dijkstra, Bird&ndash;Meertens).',
      distractors: ['Random code generation.','Brute-force testing.','No known analogy.']
    };
  };

  window.conceptBank['Simplification Needed'] = function() {
    return {
      scenario: '',
      question: 'Calculated refinements may need:',
      correct: 'Algebraic simplification before they are usable as concrete specs.',
      distractors: ['No further work.','A complete rewrite.','Removal of the retrieve.']
    };
  };

  window.conceptBank['Calculation Value'] = function() {
    return {
      scenario: '',
      question: 'The value of calculating the weakest refinement is:',
      correct: 'It reveals exactly which design decisions go beyond the minimum.',
      distractors: ['It produces the fastest implementation.','It eliminates the retrieve.','It always produces a unique implementation.']
    };
  };

  window.conceptBank['Relational Calculus'] = function() {
    return {
      scenario: '',
      question: 'The proof that f~ &#x2A1E; wo = ao &#x2A1E; f~ uses:',
      correct: 'Relational calculus and surjectivity of f.',
      distractors: ['Set union only.','Structural induction.','Free type rules.']
    };
  };

  window.conceptBank['Calculation Output'] = function() {
    return {
      scenario: '',
      question: 'The output of a refinement calculation is:',
      correct: 'A verified concrete implementation ready for coding.',
      distractors: ['Unverified pseudocode.','An abstract spec.','A test suite.']
    };
  };

  window.conceptBank['Bijection Advantage'] = function() {
    return {
      scenario: '',
      question: 'When retrieve is a bijection:',
      correct: 'The inverse f~ is also total &mdash; no ambiguity in either direction.',
      distractors: ['Bijections are always identity.','No retrieve needed.','Only works for &Nopf;.']
    };
  };

  window.conceptBank['Design as Proof'] = function() {
    return {
      scenario: '',
      question: 'Calculating data refinements teaches:',
      correct: 'Design and proof are two views of the same activity.',
      distractors: ['Design and proof are unrelated.','Proofs are unnecessary.','Design always fails.']
    };
  };

  // ===================== §18.4 Refining promotion =====================

  window.conceptBank['Promotion Definition'] = function() {
    return {
      scenario: '',
      question: 'Promotion lifts:',
      correct: 'A local op on one instance to a global op on a collection via framing.',
      distractors: ['A global op to a local op.','An abstract op to a concrete op.','A schema to a predicate.']
    };
  };

  window.conceptBank['Monotonicity'] = function() {
    return {
      scenario: '',
      question: 'Promotion is monotonic wrt refinement. This means:',
      correct: 'If the local data type refines, the promoted global op also refines.',
      distractors: ['Global refinement requires a separate proof.','Promotion reverses refinement.','Only local refinement matters.']
    };
  };

  window.conceptBank['Pointwise Retrieve'] = function() {
    var pool = [
      { s: 'Bank: local <code>r : AccountImpl &rarr; Account</code>.', c: '<code>g = bankImpl &#x2A1E; r</code> &mdash; apply r to each instance.', d: ['<code>g = r</code>','<code>g = bankImpl</code>','<code>g = &empty;</code>'] },
      { s: 'Chat: local <code>r : ThreadImpl &rarr; Thread</code>.', c: '<code>g = serverImpl &#x2A1E; r</code>', d: ['<code>g = r</code>','<code>g = serverImpl</code>','<code>g = &empty;</code>'] }
    ];
    var p = pool[Math.floor(Math.random()*pool.length)];
    return { scenario: p.s, question: 'Global retrieve:', correct: p.c, distractors: p.d };
  };

  window.conceptBank['Framing Preservation'] = function() {
    return {
      scenario: '',
      question: 'When refining a promoted spec, the framing schema is:',
      correct: 'Preserved verbatim &mdash; only the inner data type changes.',
      distractors: ['Completely rewritten.','Removed.','Doubled.']
    };
  };

  window.conceptBank['Key Result'] = function() {
    return {
      scenario: '',
      question: 'The key result of &sect;18.4 is:',
      correct: 'The refinement of a promotion is the promotion of the refinement.',
      distractors: ['Promotion and refinement are unrelated.','Promotion prevents refinement.','Refinement always fails.']
    };
  };

  window.conceptBank['Global State Shape'] = function() {
    return {
      scenario: '',
      question: 'The simplest promoted state is:',
      correct: '<code>P &cong; [ f : I &#x21F8; S ]</code> &mdash; partial function from index to local state.',
      distractors: ['<code>P &cong; [ s : S ]</code>','<code>P &cong; [ i : I ]</code>','<code>P &cong; &empty;</code>']
    };
  };

  window.conceptBank['Local Refinement Lifts'] = function() {
    return {
      scenario: 'Library refines Shelf to ShelfImpl.',
      question: 'Every promoted shelf operation:',
      correct: 'Inherits refinement from local shelf refinement + framing.',
      distractors: ['Must each be proved separately.','Cannot be refined.','Requires backward simulation.']
    };
  };

  window.conceptBank['Non-interference'] = function() {
    return {
      scenario: '',
      question: 'Framing ensures non-interference because:',
      correct: 'It says other instances in the collection are unchanged.',
      distractors: ['It modifies all instances.','It removes instances.','It duplicates instances.']
    };
  };

  window.conceptBank['Promoted Op Structure'] = function() {
    return {
      scenario: '',
      question: 'A promoted operation has the form:',
      correct: '<code>&exist; &Delta;S &bull; Frame &and; LocalOp</code>',
      distractors: ['<code>LocalOp</code>','<code>Frame</code>','<code>&Delta;P</code>']
    };
  };

  window.conceptBank['Scalability Pattern'] = function() {
    return {
      scenario: '',
      question: 'Promotion + refinement scales because:',
      correct: 'Prove refinement once for one instance; the collection inherits.',
      distractors: ['Every instance must be proved separately.','Only one instance can exist.','Collection cannot be refined.']
    };
  };

  window.conceptBank['Compositional'] = function() {
    return {
      scenario: '',
      question: 'Promotion refinement is compositional because:',
      correct: 'Instance refinement composes with framing to yield global refinement.',
      distractors: ['All proofs must be monolithic.','Composition is impossible.','Only one level can be refined.']
    };
  };

  window.conceptBank['Override Semantics'] = function() {
    return {
      scenario: '',
      question: '<code>f\' = f &oplus; {i? &#8614; s\'}</code> means:',
      correct: 'Instance at i? is updated to s\'; all others unchanged.',
      distractors: ['All instances updated.','Instance at i? deleted.','New instance at random index.']
    };
  };

  window.conceptBank['Functional Promotion'] = function() {
    return {
      scenario: '',
      question: 'The simplest promotion uses:',
      correct: '<code>P &cong; [ f : I &#x21F8; S ]</code> &mdash; a functional promotion.',
      distractors: ['<code>P &cong; [ s : S ]</code>','<code>P &cong; &Popf; S</code>','<code>P &cong; seq S</code>']
    };
  };

  window.conceptBank['Big Payoff'] = function() {
    return {
      scenario: '',
      question: 'The big payoff of refining promotion is:',
      correct: 'Refine one instance, get the collection\'s refinement for free.',
      distractors: ['More work at global level.','No refinement possible.','Only one instance can exist.']
    };
  };

  window.conceptBank['Framing Verbatim'] = function() {
    return {
      scenario: '',
      question: 'During refinement, framing schemas are:',
      correct: 'Preserved verbatim; only the inner op/type refines.',
      distractors: ['Completely redesigned.','Deleted.','Duplicated for each instance.']
    };
  };

  window.conceptBank['Capstone'] = function() {
    return {
      scenario: '',
      question: 'Refining promotion is the capstone because it:',
      correct: 'Combines data refinement with modular lifting across collections.',
      distractors: ['Is unrelated to the rest of Ch 18.','Only applies to singletons.','Replaces all other methods.']
    };
  };

  window.conceptBank['Global Refinement'] = function() {
    return {
      scenario: '',
      question: 'Global refinement of a promoted op follows from:',
      correct: 'Local instance refinement + preserved framing.',
      distractors: ['A fresh global proof.','Backward simulation.','Free type induction.']
    };
  };

})();
