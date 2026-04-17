(function buildCh5Bank() {
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }

  var items = ['Apple','Banana','Cherry','Date','Fig','Grape','Kiwi','Lemon','Mango','Orange'];
  var people = ['Alice','Bob','Carla','Dan','Eve','Frank','Grace','Hank','Iris','Jay'];
  var colors = ['Red','Green','Blue','Yellow','Purple','Orange','Pink','Cyan'];
  var animals = ['Cat','Dog','Fish','Bird','Frog','Bear','Wolf','Deer'];
  var cities = ['Paris','Rome','Tokyo','London','Berlin','Cairo','Lima','Oslo'];
  var roles = ['Admin','Editor','Viewer','Manager','Intern','Lead','Analyst','Clerk'];

  // ========== 5.1 Membership and Extension ==========

  window.conceptBank['Set Definition'] = function() {
    var s = pick(['library books','pantry items','gym machines','playlist songs']);
    return { scenario: 'A collection of <span class="key">' + s + '</span> is described.', question: 'A set is defined by:', correct: 'Its members &mdash; an unordered collection of distinct objects.', distractors: ['The order its elements were added.','How many duplicates each element has.','The function that generated it.'] };
  };

  window.conceptBank['Membership Symbol'] = function() {
    var el = pick(people); var S = pick(['Students','Staff','Members']);
    return { scenario: 'Is <span class="key">' + el + '</span> in <span class="key">' + S + '</span>?', question: 'Which symbol asserts membership?', correct: '<code>' + el + ' &isin; ' + S + '</code>', distractors: ['<code>' + el + ' &sube; ' + S + '</code>','<code>' + el + ' &notin; ' + S + '</code>','<code>' + el + ' = ' + S + '</code>'] };
  };

  window.conceptBank['Listing by Extension'] = function() {
    var a = shuffle(items.slice()).slice(0,3);
    return { scenario: 'A store sells <span class="key">' + a.join(', ') + '</span>.', question: 'Which defines the set by extension?', correct: '<code>Products == {' + a.join(', ') + '}</code>', distractors: ['<code>Products &isin; {' + a.join(', ') + '}</code>','<code>Products &sube; {' + a.join(', ') + '}</code>','<code>{' + a.join(', ') + '} &isin; Products</code>'] };
  };

  window.conceptBank['Membership Test'] = function() {
    var s = shuffle(colors.slice()).slice(0,3); var miss = pick(colors.filter(function(c){return s.indexOf(c)<0;}));
    return { scenario: 'Given <code>S == {' + s.join(', ') + '}</code>, is <span class="key">' + miss + '</span> a member?', question: 'Which is correct?', correct: '<code>' + miss + ' &notin; S</code>', distractors: ['<code>' + miss + ' &isin; S</code>','<code>' + miss + ' &sube; S</code>','<code>' + miss + ' = S</code>'] };
  };

  window.conceptBank['Extension Equality'] = function() {
    var n = randInt(2,8); var d = randInt(2,8); var base = [n, n, d, d, n+d];
    var uniq = []; base.forEach(function(x){if(uniq.indexOf(x)<0)uniq.push(x);}); uniq.sort(function(a,b){return a-b;});
    return { scenario: 'A list records <span class="key">{' + base.join(', ') + '}</span>.', question: 'What set does this denote?', correct: '<code>{' + uniq.join(', ') + '}</code>', distractors: ['<code>{' + base.join(', ') + '}</code> with duplicates','<code>{' + uniq[0] + ', ' + uniq[uniq.length-1] + '}</code>','<code>&empty;</code>'] };
  };

  window.conceptBank['Order Irrelevance'] = function() {
    var a = shuffle(items.slice()).slice(0,3); var b = shuffle(a.slice());
    return { scenario: 'Are <code>{' + a.join(', ') + '}</code> and <code>{' + b.join(', ') + '}</code> the same set?', question: 'Choose:', correct: 'Yes &mdash; same members, order irrelevant.', distractors: ['No &mdash; different order.','Only if sorted.','Only for numbers.'] };
  };

  window.conceptBank['Syntactic Abbreviation'] = function() {
    var nm = pick(['Oceans','Planets','Seasons']); var els = pick(['{Atlantic, Pacific, Indian, Arctic}','{Mercury, Venus, Earth, Mars}','{Spring, Summer, Autumn, Winter}']);
    return { scenario: 'We write <code>' + nm + ' == ' + els + '</code>.', question: 'What does <code>==</code> mean?', correct: nm + ' is a name (abbreviation) for the set.', distractors: [nm + ' is a member of the set.',nm + ' is a subset.',nm + ' is not equal.'] };
  };

  window.conceptBank['Empty Set Identification'] = function() {
    return { scenario: 'Identify the <span class="key">empty set</span>.', question: 'Which represents a set with no members?', correct: '<code>&empty;</code> or <code>{ }</code>', distractors: ['<code>{0}</code>','<code>{&empty;}</code>','<code>&Nopf;</code>'] };
  };

  window.conceptBank['Subset Meaning'] = function() {
    var sub = pick(roles); var sup = pick(['Staff','Employees','Members','Users']);
    return { scenario: 'Every <span class="key">' + sub + '</span> is a <span class="key">' + sup.toLowerCase() + '</span>.', question: 'Which formalizes this?', correct: '<code>' + sub + ' &sube; ' + sup + '</code>', distractors: ['<code>' + sub + ' &isin; ' + sup + '</code>','<code>' + sub + ' = ' + sup + '</code>','<code>' + sup + ' &sube; ' + sub + '</code>'] };
  };

  window.conceptBank['Subset Transitivity'] = function() {
    var p = pick(people); var sub = pick(['Interns','Juniors']); var sup = pick(['Staff','Employees']);
    return { scenario: '<code>' + sub + ' &sube; ' + sup + '</code> and <code>' + p + ' &isin; ' + sub + '</code>.', question: 'What follows?', correct: '<code>' + p + ' &isin; ' + sup + '</code>', distractors: ['<code>' + p + ' &notin; ' + sup + '</code>','<code>' + sub + ' = ' + sup + '</code>','Nothing.'] };
  };

  window.conceptBank['Empty Subset'] = function() {
    return { scenario: 'Consider <span class="key">&empty; &sube; S</span> for any set S.', question: 'Is this always true?', correct: 'Yes &mdash; vacuously true; no element fails.', distractors: ['Only if S = &empty;.','Only for finite S.','No.'] };
  };

  window.conceptBank['Membership Formalization'] = function() {
    var p = pick(people); var S = pick(['Students','Members','Players','Users']);
    return { scenario: 'Express &ldquo;<span class="key">' + p + '</span> is a <span class="key">' + S.toLowerCase().replace(/s$/,'') + '</span>.&rdquo;', question: 'Which is correct?', correct: '<code>' + p + ' &isin; ' + S + '</code>', distractors: ['<code>' + S + ' &isin; ' + p + '</code>','<code>' + p + ' &sube; ' + S + '</code>','<code>' + p + ' == ' + S + '</code>'] };
  };

  window.conceptBank['Non-Membership Definition'] = function() {
    return { scenario: 'Define <span class="key">x &notin; S</span> formally.', question: 'The definition is:', correct: '<code>&not;(x &isin; S)</code>', distractors: ['<code>x &sube; S</code>','<code>x = &empty;</code>','<code>S &sube; x</code>'] };
  };

  window.conceptBank['Extension Membership Rule'] = function() {
    var a = shuffle(items.slice()).slice(0,3);
    return { scenario: '<code>S == {' + a.join(', ') + '}</code>.', question: '<code>t &isin; S</code> iff:', correct: '<code>t = ' + a[0] + ' &or; t = ' + a[1] + ' &or; t = ' + a[2] + '</code>', distractors: ['<code>t = ' + a[0] + ' &and; t = ' + a[1] + ' &and; t = ' + a[2] + '</code>','<code>t &sube; {' + a.join(', ') + '}</code>','<code>t &ne; ' + a[0] + '</code>'] };
  };

  window.conceptBank['Extensionality Proof'] = function() {
    return { scenario: 'Prove <span class="key">s = t</span> by extension.', question: 'You must show:', correct: '<code>(&forall; x &bull; x &isin; s &rArr; x &isin; t) &and; (&forall; x &bull; x &isin; t &rArr; x &isin; s)</code>', distractors: ['<code>&exist; x &bull; x &isin; s &and; x &isin; t</code>','<code>s &sube; t</code> alone','<code>|s| = |t|</code>'] };
  };

  window.conceptBank['Subset Formalization'] = function() {
    var sub = pick(['Premium','Gold','VIP']); var sup = pick(['Registered','Users','Members']);
    return { scenario: 'Every <span class="key">' + sub + ' user</span> is a <span class="key">' + sup.toLowerCase() + ' user</span>.', question: 'Formalize:', correct: '<code>' + sub + ' &sube; ' + sup + '</code>', distractors: ['<code>' + sub + ' &isin; ' + sup + '</code>','<code>' + sub + ' = ' + sup + '</code>','<code>' + sup + ' &sube; ' + sub + '</code>'] };
  };

  window.conceptBank['Empty Set Property'] = function() {
    var p = pick(people);
    return { scenario: 'Is <code>' + p + ' &isin; &empty;</code> ever true?', question: 'Choose:', correct: 'No &mdash; the empty set has no members.', distractors: ['Yes, if ' + p + ' exists.','Only if ' + p + ' = &empty;.','Undefined.'] };
  };

  window.conceptBank['Natural Numbers Set'] = function() {
    return { scenario: 'Describe <span class="key">&Nopf;</span>.', question: 'Which is correct?', correct: '<code>{0, 1, 2, 3, &hellip;}</code> &mdash; non-negative integers.', distractors: ['<code>{1, 2, 3, &hellip;}</code> (missing 0).','<code>&Zopf;</code> (includes negatives).','<code>&empty;</code>.'] };
  };

  window.conceptBank['Set Equality Direction'] = function() {
    return { scenario: '<code>A &sube; B</code> and <code>B &sube; A</code>.', question: 'What follows?', correct: '<code>A = B</code>', distractors: ['<code>A &ne; B</code>','<code>A &isin; B</code>','Nothing.'] };
  };

  window.conceptBank['Reflexive Subset'] = function() {
    return { scenario: 'Is <code>S &sube; S</code> always true?', question: 'Choose:', correct: 'Yes &mdash; every element of S is in S.', distractors: ['Only if S &ne; &empty;.','Only for finite S.','No.'] };
  };

  window.conceptBank['Vacuous Truth over Empty Set'] = function() {
    var n = randInt(50,500);
    return { scenario: 'Is <code>&forall; x : &empty; &bull; x &gt; ' + n + '</code> true?', question: 'Choose:', correct: 'True &mdash; vacuously; no x exists to violate it.', distractors: ['False.','Undefined.','Depends on the type of x.'] };
  };

  window.conceptBank['Primes Membership'] = function() {
    var primes = [2,3,5,7,11,13]; var composites = [4,6,8,9,10,12]; var p1 = pick(primes); var p2 = pick(primes.filter(function(x){return x!==p1;})); var c = pick(composites);
    return { scenario: '<span class="key">Primes</span> = set of all prime numbers.', question: 'Which is true?', correct: '<code>' + p1 + ' &isin; Primes &and; ' + p2 + ' &isin; Primes &and; ' + c + ' &notin; Primes</code>', distractors: ['<code>' + c + ' &isin; Primes</code>','<code>' + p1 + ' &notin; Primes</code>','<code>Primes = &empty;</code>'] };
  };

  window.conceptBank['Rockallers Empty Set'] = function() {
    var place = pick(['Rockall (uninhabited island)','an abandoned station','a vacant lot']);
    return { scenario: '<span class="key">' + place + '</span> has no inhabitants.', question: 'The set of inhabitants is:', correct: '<code>&empty;</code>', distractors: ['<code>&Nopf;</code>','<code>|Inhabitants| = 1</code>','<code>Inhabitants &sube; &empty;</code> only'] };
  };

  window.conceptBank['Subset vs Membership'] = function() {
    return { scenario: 'Compare <code>&isin;</code> and <code>&sube;</code>.', question: 'The difference is:', correct: '<code>&isin;</code>: element in set. <code>&sube;</code>: set whose every element is in another set.', distractors: ['They mean the same.','<code>&isin;</code> is for sets; <code>&sube;</code> for elements.','<code>&sube;</code> implies <code>&isin;</code>.'] };
  };

  window.conceptBank['Extensionality Application'] = function() {
    var a = shuffle([randInt(1,9),randInt(1,9),randInt(1,9)]); var b = shuffle(a.slice());
    return { scenario: 'DB1 = <code>{' + a.join(', ') + '}</code>, DB2 = <code>{' + b.join(', ') + '}</code>.', question: 'Same set?', correct: 'Yes &mdash; same members; order irrelevant.', distractors: ['No &mdash; different order.','Only if sorted.','Only for &Nopf; elements.'] };
  };

  // ========== 5.2 Set Comprehension ==========

  window.conceptBank['Comprehension Notation'] = function() {
    return { scenario: 'Identify <span class="key">comprehension</span> notation.', question: 'Which defines a set by predicate?', correct: '<code>{ x : T | P(x) }</code>', distractors: ['<code>{1, 2, 3}</code>','<code>x &isin; S</code>','<code>S &sube; T</code>'] };
  };

  window.conceptBank['Filter vs Term'] = function() {
    return { scenario: 'In <code>{ x : S | p &bull; e }</code>:', question: 'Which part filters and which transforms?', correct: '<code>p</code> filters; <code>e</code> transforms.', distractors: ['<code>e</code> filters; <code>p</code> transforms.','Both filter.','Both transform.'] };
  };

  window.conceptBank['Simple Comprehension'] = function() {
    var cond = pick(['n mod 2 = 0','n &gt; 10','n &lt; 5','n mod 3 = 0']);
    return { scenario: 'Express &ldquo;<span class="key">naturals where ' + cond + '</span>&rdquo;.', question: 'Which is correct?', correct: '<code>{ n : &Nopf; | ' + cond + ' }</code>', distractors: ['<code>{ n : &Nopf; &bull; ' + cond + ' }</code>','<code>{ ' + cond + ' }</code>','<code>&Nopf; | ' + cond + '</code>'] };
  };

  window.conceptBank['Comprehension with Term'] = function() {
    var term = pick(['n&sup2;','2*n','n+1']); var desc = pick(['squares','doubles','successors']);
    return { scenario: 'Express &ldquo;<span class="key">' + desc + '</span> of naturals.&rdquo;', question: 'Which is correct?', correct: '<code>{ n : &Nopf; &bull; ' + term + ' }</code>', distractors: ['<code>{ n : &Nopf; | ' + term + ' }</code>','<code>{ ' + term + ' }</code>','<code>&Nopf; &bull; ' + term + '</code>'] };
  };

  window.conceptBank['Filter-Only Comprehension'] = function() {
    var S = pick(['User','Employee','Student']); var pred = pick(['Age(x) &ge; 18','Active(x)','Score(x) &gt; 50']);
    return { scenario: 'Express &ldquo;<span class="key">' + S + 's</span> where <span class="key">' + pred + '</span>.&rdquo;', question: 'Which is correct?', correct: '<code>{ x : ' + S + ' | ' + pred + ' }</code>', distractors: ['<code>{ x : ' + S + ' &bull; ' + pred + ' }</code>','<code>{ ' + pred + ' }</code>','<code>' + S + ' | ' + pred + '</code>'] };
  };

  window.conceptBank['Filter-and-Map Comprehension'] = function() {
    var S = pick(['Customer','Employee','Student']); var pred = pick(['Active(x)','Enrolled(x)','Paid(x)']); var term = pick(['Name(x)','Email(x)','ID(x)']);
    return { scenario: 'Express &ldquo;<span class="key">' + term.replace('(x)','s') + '</span> of <span class="key">' + pred.replace('(x)','') + ' ' + S + 's</span>.&rdquo;', question: 'Which is correct?', correct: '<code>{ x : ' + S + ' | ' + pred + ' &bull; ' + term + ' }</code>', distractors: ['<code>{ x : ' + S + ' &bull; ' + pred + ' }</code>','<code>{ ' + pred + ' &bull; ' + term + ' }</code>','<code>{ x | ' + term + ' }</code>'] };
  };

  window.conceptBank['No-Filter Comprehension'] = function() {
    var S = pick(['User','Person','Item']); var term = pick(['Age(x)','Name(x)','Price(x)']);
    return { scenario: 'Express &ldquo;all <span class="key">' + term.replace('(x)','s') + '</span>&rdquo; (no filter).', question: 'Which is correct?', correct: '<code>{ x : ' + S + ' &bull; ' + term + ' }</code>', distractors: ['<code>{ x : ' + S + ' | ' + term + ' }</code>','<code>{ ' + term + ' }</code>','<code>' + S + ' &bull; ' + term + '</code>'] };
  };

  window.conceptBank['Short Form Equivalence'] = function() {
    return { scenario: '<code>{ x : S | p }</code> is shorthand for:', question: 'Choose:', correct: '<code>{ x : S | p &bull; x }</code>', distractors: ['<code>{ x : S &bull; p }</code>','<code>{ x : S | true &bull; x }</code>','<code>{ S | p }</code>'] };
  };

  window.conceptBank['Multi-Variable Comprehension'] = function() {
    var A = pick(['Student','Employee']); var B = pick(['Course','Dept']); var pred = pick(['Enrolled','WorksIn']);
    return { scenario: 'Express &ldquo;<span class="key">' + A + '-' + B + ' pairs</span> where ' + pred + '.&rdquo;', question: 'Which is correct?', correct: '<code>{ a : ' + A + '; b : ' + B + ' | ' + pred + '(a, b) &bull; (a, b) }</code>', distractors: ['<code>{ a : ' + A + ' | ' + pred + '(a) }</code>','<code>{ ' + A + ' &times; ' + B + ' }</code>','<code>' + A + ' ; ' + B + '</code>'] };
  };

  window.conceptBank['Bound Variable Renaming'] = function() {
    var n = randInt(3,9);
    return { scenario: 'Is <code>{ x : &Nopf; | x &gt; ' + n + ' }</code> = <code>{ y : &Nopf; | y &gt; ' + n + ' }</code>?', question: 'Choose:', correct: 'Yes &mdash; bound variables can be renamed.', distractors: ['No &mdash; x and y differ.','Only if x = y.','Only for &Nopf;.'] };
  };

  window.conceptBank['Comprehension Evaluation'] = function() {
    var n = randInt(3,7); var res = []; for(var i=0;i<n;i++) res.push(i);
    return { scenario: 'Evaluate <code>{ n : &Nopf; | n &lt; ' + n + ' }</code>.', question: 'Result:', correct: '<code>{' + res.join(', ') + '}</code>', distractors: ['<code>{1, 2, ..., ' + n + '}</code>','<code>{' + n + ', ' + (n+1) + ', ...}</code>','<code>&empty;</code>'] };
  };

  window.conceptBank['Term Mapping'] = function() {
    var k = pick([2,3,5]); var desc = k===2?'doubles':k===3?'triples':'quintuples';
    return { scenario: 'Express &ldquo;<span class="key">' + desc + '</span> of naturals.&rdquo;', question: 'Which is correct?', correct: '<code>{ n : &Nopf; &bull; ' + k + ' * n }</code>', distractors: ['<code>{ n : &Nopf; | ' + k + ' * n }</code>','<code>{ ' + k + ' * n }</code>','<code>' + k + ' * &Nopf;</code>'] };
  };

  window.conceptBank['Combined Filter and Term'] = function() {
    var S = pick(['Book','Movie','Song']); var pred = pick(['Author','Director','Artist']); var val = pick(['Orwell','Nolan','Bach']); var term = pick(['Title','Name','Rating']);
    return { scenario: 'Express &ldquo;<span class="key">' + term + 's</span> of ' + S + 's by <span class="key">' + val + '</span>.&rdquo;', question: 'Which is correct?', correct: '<code>{ x : ' + S + ' | ' + pred + '(x) = "' + val + '" &bull; ' + term + '(x) }</code>', distractors: ['<code>{ x : ' + S + ' &bull; ' + term + '(x) }</code>','<code>{ ' + term + ' : ' + val + ' }</code>','<code>' + term + '(' + val + ')</code>'] };
  };

  window.conceptBank['Predicate Conjunction'] = function() {
    var lo = randInt(1,10); var hi = randInt(50,100); var d = pick([3,5,7]);
    return { scenario: 'Express naturals in <span class="key">[' + lo + ',' + hi + ']</span> divisible by <span class="key">' + d + '</span>.', question: 'Which is correct?', correct: '<code>{ n : &Nopf; | ' + lo + ' &le; n &and; n &le; ' + hi + ' &and; n mod ' + d + ' = 0 }</code>', distractors: ['<code>{ n : &Nopf; &bull; n mod ' + d + ' }</code>','<code>{ ' + d + ', ' + (2*d) + ', ... }</code> alone','<code>&Nopf; / ' + d + '</code>'] };
  };

  window.conceptBank['Declaration Part'] = function() {
    return { scenario: 'In <code>{ x : T | p }</code>:', question: 'The declaration part is:', correct: '<code>x : T</code> &mdash; it provides the range.', distractors: ['<code>p</code> &mdash; the condition.','<code>{ }</code> &mdash; the braces.','<code>|</code> &mdash; the bar.'] };
  };

  window.conceptBank['No-Predicate Short Form'] = function() {
    return { scenario: '<code>{ x : S &bull; e }</code> is equivalent to:', question: 'Choose:', correct: '<code>{ x : S | true &bull; e }</code>', distractors: ['<code>{ x : S | e &bull; x }</code>','<code>{ x : S | false &bull; e }</code>','<code>{ x : S }</code>'] };
  };

  window.conceptBank['Comprehension Membership Rule'] = function() {
    return { scenario: '[compre] rule: <code>f &isin; { x : s | p &bull; e }</code> iff:', question: 'Choose:', correct: '<code>&exist; x : s | p &bull; e = f</code>', distractors: ['<code>&forall; x : s &bull; e = f</code>','<code>f &isin; s</code>','<code>f = e</code>'] };
  };

  window.conceptBank['Weaker Predicate Subset'] = function() {
    return { scenario: 'If <code>&forall; x : a &bull; p &rArr; q</code>, then:', question: 'Which follows?', correct: '<code>{ x : a | p } &sube; { x : a | q }</code>', distractors: ['<code>{ x : a | q } &sube; { x : a | p }</code>','<code>{ x : a | p } = { x : a | q }</code>','<code>{ x : a | p } = &empty;</code>'] };
  };

  window.conceptBank['Comprehension Pair Output'] = function() {
    var lo = randInt(1,3); var hi = lo + 2;
    return { scenario: 'Express pairs <span class="key">(n, n&sup2;)</span> for n in ' + lo + '..' + hi + '.', question: 'Which is correct?', correct: '<code>{ n : &Nopf; | ' + lo + ' &le; n &and; n &le; ' + hi + ' &bull; (n, n&sup2;) }</code>', distractors: ['Extension only','<code>{ n, n&sup2; }</code>','<code>{ n : &Nopf; &bull; n }</code>'] };
  };

  window.conceptBank['Comprehension from Product'] = function() {
    var S = pick(['Product','Item','Book']); var pred = pick(['Stock','Qty','Copies']);
    return { scenario: 'Express &ldquo;<span class="key">' + S + 's in stock</span>.&rdquo;', question: 'Which is correct?', correct: '<code>{ p : ' + S + ' | ' + pred + '(p) &gt; 0 }</code>', distractors: ['<code>{ p : ' + S + ' &bull; ' + pred + '(p) }</code>','<code>{ ' + pred + ' &gt; 0 }</code>','<code>' + S + ' = InStock</code>'] };
  };

  window.conceptBank['Specification Axiom'] = function() {
    return { scenario: 'The <span class="key">axiom of specification</span> justifies:', question: 'Choose:', correct: 'The predicate part of a comprehension.', distractors: ['The term part.','The empty set.','Cartesian products.'] };
  };

  window.conceptBank['Replacement Axiom'] = function() {
    return { scenario: 'The <span class="key">axiom of replacement</span> justifies:', question: 'Choose:', correct: 'The term (expression) part of a comprehension.', distractors: ['The predicate part.','Set equality.','The empty set axiom.'] };
  };

  window.conceptBank['Members and Dates'] = function() {
    var S = pick(['Member','User','Employee']); var attr = pick(['JoinDate','StartDate','HireDate']);
    return { scenario: 'Express &ldquo;<span class="key">' + S + 's</span> paired with <span class="key">' + attr + 's</span>.&rdquo;', question: 'Which is correct?', correct: '<code>{ m : ' + S + ' &bull; (m, ' + attr + '(m)) }</code>', distractors: ['<code>{ m : ' + S + ' &bull; ' + attr + '(m) }</code>','<code>{ ' + S + ', ' + attr + ' }</code>','<code>(m, ' + attr + ')</code>'] };
  };

  window.conceptBank['Odd Numbers under 10'] = function() {
    var b = pick([8,10,12]);
    return { scenario: 'Express &ldquo;odd naturals &lt; ' + b + '.&rdquo;', question: 'Which is correct?', correct: '<code>{ n : &Nopf; | n &lt; ' + b + ' &and; n mod 2 = 1 }</code>', distractors: ['<code>{ n : &Nopf; | n mod 2 = 0 }</code>','<code>{ 1, 3, 5 }</code> (may be incomplete)','<code>{ n : &Nopf; &bull; n }</code>'] };
  };

  window.conceptBank['Comprehension with Price Filter'] = function() {
    var limit = pick([10,20,50]); var S = pick(['Product','Item','Widget']);
    return { scenario: 'Express &ldquo;<span class="key">names</span> of ' + S + 's <span class="key">under $' + limit + '</span>.&rdquo;', question: 'Which is correct?', correct: '<code>{ p : ' + S + ' | Price(p) &lt; ' + limit + ' &bull; Name(p) }</code>', distractors: ['<code>{ Name(p) &lt; ' + limit + ' }</code>','<code>{ p : ' + S + ' &bull; Name(p) }</code>','<code>' + S + ' &lt; ' + limit + '</code>'] };
  };

  // ========== 5.3 Power Sets ==========

  window.conceptBank['Power Set Size'] = function() {
    var n = randInt(2,6); var sz = Math.pow(2,n); var els = []; for(var i=0;i<n;i++) els.push(String.fromCharCode(97+i));
    return { scenario: 'How many elements in <code>&Pset;{' + els.join(', ') + '}</code>?', question: 'Choose:', correct: '' + sz, distractors: ['' + n, '' + (sz/2), '' + (sz*2)] };
  };

  window.conceptBank['Empty Set in Power Set'] = function() {
    return { scenario: 'Is <code>&empty; &isin; &Pset; S</code> for every S?', question: 'Choose:', correct: 'Yes &mdash; &empty; &sube; S always.', distractors: ['Only when S &ne; &empty;.','No.','Only for finite S.'] };
  };

  window.conceptBank['Self in Power Set'] = function() {
    return { scenario: 'Is <code>S &isin; &Pset; S</code> for every S?', question: 'Choose:', correct: 'Yes &mdash; S &sube; S always.', distractors: ['Only if S = &empty;.','No.','Only for finite S.'] };
  };

  window.conceptBank['Power of Empty Set'] = function() {
    return { scenario: 'Compute <code>&Pset; &empty;</code>.', question: 'Result:', correct: '<code>{&empty;}</code>', distractors: ['<code>&empty;</code>','<code>{0}</code>','<code>{ }</code>'] };
  };

  window.conceptBank['Power Set Typing'] = function() {
    var T = pick(['Tag','Item','Sensor','Flag']);
    return { scenario: 'Declare &ldquo;a <span class="key">set of ' + T + 's</span>.&rdquo;', question: 'Type:', correct: '<code>s : &Pset; ' + T + '</code>', distractors: ['<code>s : ' + T + '</code>','<code>s = ' + T + '</code>','<code>s &isin; ' + T + '</code>'] };
  };

  window.conceptBank['Power Set of Singleton'] = function() {
    var e = pick(items);
    return { scenario: '|&Pset;{' + e + '}| = ?', question: 'Choose:', correct: '2', distractors: ['1','3','0'] };
  };

  window.conceptBank['Power Set of Four'] = function() {
    return { scenario: '|&Pset;{a, b, c, d}| = ?', question: 'Choose:', correct: '16', distractors: ['8','12','24'] };
  };

  window.conceptBank['Membership in Power Set'] = function() {
    var a = shuffle(items.slice()).slice(0,3);
    return { scenario: 'Is <code>{' + a[0] + ', ' + a[1] + '} &isin; &Pset;{' + a.join(', ') + '}</code>?', question: 'Choose:', correct: 'Yes &mdash; it is a subset.', distractors: ['No.','Only if ' + a[0] + ' = ' + a[1] + '.','Undefined.'] };
  };

  window.conceptBank['Non-Subset in Power Set'] = function() {
    var a = shuffle(items.slice()).slice(0,3); var extra = pick(items.filter(function(x){return a.indexOf(x)<0;}));
    return { scenario: 'Is <code>{' + a[0] + ', ' + extra + '} &isin; &Pset;{' + a.join(', ') + '}</code>?', question: 'Choose:', correct: 'No &mdash; ' + extra + ' &notin; {' + a.join(', ') + '}.', distractors: ['Yes.','Only if ' + a[0] + ' = ' + extra + '.','Undefined.'] };
  };

  window.conceptBank['Finite Power Set'] = function() {
    return { scenario: '<code>&Fset; S</code> contains:', question: 'Choose:', correct: 'Only the finite subsets of S.', distractors: ['Only infinite subsets.','All subsets.','No subsets.'] };
  };

  window.conceptBank['Power Set Listing'] = function() {
    var a = randInt(1,5); var b = a+1;
    return { scenario: 'List &Pset;{' + a + ', ' + b + '}.', question: 'Result:', correct: '<code>&empty;, {' + a + '}, {' + b + '}, {' + a + ', ' + b + '}</code>', distractors: ['<code>{' + a + '}, {' + b + '}</code>','<code>{' + a + ', ' + b + '}</code>','<code>{&empty;, ' + a + ', ' + b + '}</code>'] };
  };

  window.conceptBank['Power Set of Zero Elements'] = function() {
    return { scenario: 'If |S| = 0, |&Pset; S| = ?', question: 'Choose:', correct: '1', distractors: ['0','2','Undefined'] };
  };

  window.conceptBank['Power Set Type Declaration'] = function() {
    var T = pick(['User','Student','Player']);
    return { scenario: 'Declare &ldquo;a <span class="key">set of ' + T + 's</span> who favorited a post.&rdquo;', question: 'Type:', correct: '<code>favorites : &Pset; ' + T + '</code>', distractors: ['<code>favorites : ' + T + '</code>','<code>favorites &isin; ' + T + '</code>','<code>favorites = ' + T + '</code>'] };
  };

  window.conceptBank['Power Set of Five'] = function() {
    return { scenario: '|&Pset;{a, b, c, d, e}| = ?', question: 'Choose:', correct: '32', distractors: ['16','25','64'] };
  };

  window.conceptBank['Power Rule Application'] = function() {
    return { scenario: '[power] rule: <code>s &isin; &Pset; a</code> iff:', question: 'Choose:', correct: '<code>s &sube; a</code>', distractors: ['<code>s &isin; a</code>','<code>s = a</code>','<code>a &sube; s</code>'] };
  };

  window.conceptBank['Incorrect Power Set'] = function() {
    var e = pick(['a','x','1']);
    return { scenario: 'Is <code>{{' + e + '}} = &Pset;{' + e + '}</code>?', question: 'Choose:', correct: 'No &mdash; &Pset;{' + e + '} = {&empty;, {' + e + '}}, missing &empty;.', distractors: ['Yes.','Only if ' + e + ' = &empty;.','Only in &Nopf;.'] };
  };

  window.conceptBank['Configuration Type'] = function() {
    var T = pick(['Flag','Feature','Option']);
    return { scenario: 'Declare &ldquo;a <span class="key">configuration</span> = set of enabled <span class="key">' + T + 's</span>.&rdquo;', question: 'Type:', correct: '<code>Config : &Pset; ' + T + '</code>', distractors: ['<code>Config : ' + T + '</code>','<code>Config = ' + T + '</code>','<code>' + T + ' &sube; Config</code>'] };
  };

  window.conceptBank['Element vs Set Type'] = function() {
    var T = pick(['Item','Song','File']);
    return { scenario: 'Difference between <code>' + T + '</code> and <code>&Pset; ' + T + '</code>?', question: 'Choose:', correct: '<code>' + T + '</code> = one; <code>&Pset; ' + T + '</code> = sets of.', distractors: ['Equal.','&Pset; ' + T + ' is always empty.','Reversed.'] };
  };

  window.conceptBank['Empty Subset of Power Set'] = function() {
    return { scenario: 'Is <code>&empty; &sube; &Pset; S</code>?', question: 'Choose:', correct: 'Yes &mdash; &empty; is a subset of every set.', distractors: ['Only if S = &empty;.','No.','Only for finite S.'] };
  };

  window.conceptBank['Schedule Type'] = function() {
    var T = pick(['Meeting','Appointment','Task']);
    return { scenario: 'Define &ldquo;a <span class="key">schedule</span>&rdquo; as a set of <span class="key">' + T + 's</span>.', question: 'Type:', correct: '<code>Schedule : &Pset; ' + T + '</code>', distractors: ['<code>Schedule : ' + T + '</code>','<code>' + T + ' &isin; Schedule</code>','<code>Schedule = &empty;</code>'] };
  };

  window.conceptBank['Power Set Axiom'] = function() {
    return { scenario: 'The <span class="key">power set axiom</span> guarantees:', question: 'Choose:', correct: 'For any set a, &Pset; a exists.', distractors: ['Only finite sets have power sets.','Power sets are empty.','Power sets equal base sets.'] };
  };

  window.conceptBank['Permissions per Role'] = function() {
    return { scenario: 'Model &ldquo;<span class="key">permission sets per role</span>.&rdquo;', question: 'Type:', correct: '<code>Perms : Role &rarr; &Pset; Permission</code>', distractors: ['<code>Perms : Role &rarr; Permission</code>','<code>Perms = Role</code>','<code>Role &isin; Perms</code>'] };
  };

  window.conceptBank['Boolean Algebra of Power Set'] = function() {
    return { scenario: '&Pset; S is closed under:', question: 'Choose:', correct: 'Union, intersection, and difference of subsets of S.', distractors: ['Cartesian product only.','Nothing.','Only union.'] };
  };

  window.conceptBank['Empty Set in Power of Empty'] = function() {
    return { scenario: 'Is <code>&empty; &isin; &Pset; &empty;</code>?', question: 'Choose:', correct: 'Yes &mdash; &Pset; &empty; = {&empty;}.', distractors: ['No.','Only for finite sets.','Undefined.'] };
  };

  window.conceptBank['Followers Function Type'] = function() {
    var T = pick(['User','Player','Member']);
    return { scenario: 'Model &ldquo;<span class="key">followers</span> of a <span class="key">' + T + '</span>.&rdquo;', question: 'Type:', correct: '<code>Followers : ' + T + ' &rarr; &Pset; ' + T + '</code>', distractors: ['<code>Followers : ' + T + ' &rarr; ' + T + '</code>','<code>Followers = ' + T + '</code>','<code>' + T + ' &isin; Followers</code>'] };
  };

  // ========== 5.4 Cartesian Products ==========

  window.conceptBank['Product Size'] = function() {
    var a = randInt(2,6); var b = randInt(2,6); var sz = a*b;
    return { scenario: '|A| = ' + a + ', |B| = ' + b + '.', question: '|A &times; B| = ?', correct: '' + sz, distractors: ['' + (a+b), '' + (sz+1), '' + (a*a)] };
  };

  window.conceptBank['Pair Ordering'] = function() {
    var a = randInt(1,9); var b = randInt(1,9);
    return { scenario: 'Is <code>(' + a + ', ' + b + ') = (' + b + ', ' + a + ')</code>?', question: 'Choose:', correct: a===b?'Yes &mdash; components are equal.':'No &mdash; order matters in tuples.', distractors: a===b?['No.','Only in sets.','Only in &Nopf;.']:['Yes.','Only in sets.','Only in &Nopf;.'] };
  };

  window.conceptBank['Coordinate Type'] = function() {
    return { scenario: 'Type &ldquo;an <span class="key">(x, y) coordinate</span> with integer components.&rdquo;', question: 'Choose:', correct: '<code>p : &Zopf; &times; &Zopf;</code>', distractors: ['<code>p : &Zopf; + &Zopf;</code>','<code>p : &Zopf;</code>','<code>p : Pair</code>'] };
  };

  window.conceptBank['Triple Product'] = function() {
    var A = pick(['Name','ID']); var B = '&Nopf;'; var C = pick(['Email','Phone']);
    return { scenario: 'Type &ldquo;a record of <span class="key">(' + A + ', age, ' + C + ')</span>.&rdquo;', question: 'Choose:', correct: '<code>Rec : ' + A + ' &times; ' + B + ' &times; ' + C + '</code>', distractors: ['<code>Rec : ' + A + '</code>','<code>Rec = ' + A + '</code>','<code>Rec &isin; ' + A + '</code>'] };
  };

  window.conceptBank['First Projection'] = function() {
    var a = pick(items); var b = pick(colors);
    return { scenario: '<code>p = (' + a + ', ' + b + ')</code>. What is <code>p.1</code>?', question: 'Choose:', correct: '<code>' + a + '</code>', distractors: ['<code>' + b + '</code>','<code>p</code>','<code>(' + a + ', ' + b + ')</code>'] };
  };

  window.conceptBank['Empty Factor'] = function() {
    return { scenario: 'Compute <code>|&empty; &times; A|</code>.', question: 'Choose:', correct: '0', distractors: ['|A|','1','Undefined'] };
  };

  window.conceptBank['Second Projection'] = function() {
    var a = pick(people); var b = pick(cities);
    return { scenario: '<code>t = (' + a + ', ' + b + ')</code>. What is <code>t.2</code>?', question: 'Choose:', correct: '<code>' + b + '</code>', distractors: ['<code>' + a + '</code>','<code>(' + a + ', ' + b + ')</code>','<code>2</code>'] };
  };

  window.conceptBank['Listing a Product'] = function() {
    var a = randInt(1,3); var x = pick(['a','b']); var y = pick(['c','d']);
    return { scenario: 'List <code>{' + a + '} &times; {' + x + ', ' + y + '}</code>.', question: 'Result:', correct: '<code>{(' + a + ', ' + x + '), (' + a + ', ' + y + ')}</code>', distractors: ['<code>{(' + x + ', ' + a + '), (' + y + ', ' + a + ')}</code>','<code>{' + a + ', ' + x + ', ' + y + '}</code>','<code>{(' + x + ', ' + y + ')}</code>'] };
  };

  window.conceptBank['Commutativity'] = function() {
    return { scenario: 'Is <code>A &times; B = B &times; A</code> in general?', question: 'Choose:', correct: 'No &mdash; tuple order flips.', distractors: ['Yes, always.','Only when A = B.','Only for finite sets.'] };
  };

  window.conceptBank['Triple Size'] = function() {
    var a = randInt(2,4); var b = randInt(2,4); var c = randInt(2,4); var sz = a*b*c;
    return { scenario: '|A|=' + a + ', |B|=' + b + ', |C|=' + c + '.', question: '|A &times; B &times; C| = ?', correct: '' + sz, distractors: ['' + (a+b+c), '' + (sz+1), '' + (a*b)] };
  };

  window.conceptBank['Seat Type'] = function() {
    return { scenario: 'Type &ldquo;a <span class="key">seat</span> (row, column).&rdquo;', question: 'Choose:', correct: '<code>Seat : &Nopf; &times; &Nopf;</code>', distractors: ['<code>Seat : &Nopf;</code>','<code>Seat = &Nopf;</code>','<code>Seat &isin; &Nopf;</code>'] };
  };

  window.conceptBank['Relations as Power of Product'] = function() {
    var A = pick(['User','Student']); var B = pick(['Role','Course']);
    return { scenario: '&Pset;(' + A + ' &times; ' + B + ') denotes:', question: 'Choose:', correct: 'All relations between ' + A + ' and ' + B + '.', distractors: ['A single pair.','&empty;.','Same as ' + A + ' &times; ' + B + '.'] };
  };

  window.conceptBank['User-Role Assignments'] = function() {
    return { scenario: 'Type &ldquo;<span class="key">user-role assignments</span>.&rdquo;', question: 'Choose:', correct: '<code>Assign : &Pset;(User &times; Role)</code>', distractors: ['<code>Assign : User &times; Role</code>','<code>Assign : User</code>','<code>Assign = Role</code>'] };
  };

  window.conceptBank['Cart-Eq Rule'] = function() {
    return { scenario: '[cart-eq]: tuples equal iff:', question: 'Choose:', correct: 'All corresponding components are equal.', distractors: ['At least one matches.','Same size.','Same elements as sets.'] };
  };

  window.conceptBank['Cluedo Projection'] = function() {
    var g = pick(['Mustard','Plum','Scarlett']); var r = pick(['Library','Kitchen','Study']); var w = pick(['Rope','Revolver','Dagger']); var i = pick([1,2,3]); var ans = [g,r,w][i-1];
    return { scenario: '<code>guess = (' + g + ', ' + r + ', ' + w + ')</code>. What is <code>guess.' + i + '</code>?', question: 'Choose:', correct: ans, distractors: shuffle([g,r,w].filter(function(x){return x!==ans;})).slice(0,2).concat(['(' + g + ', ' + r + ', ' + w + ')']) };
  };

  window.conceptBank['Weather Observation Type'] = function() {
    return { scenario: 'Type &ldquo;<span class="key">weather observation</span>: temp and humidity.&rdquo;', question: 'Choose:', correct: '<code>Obs : &Zopf; &times; &Nopf;</code>', distractors: ['<code>Obs : &Zopf; + &Nopf;</code>','<code>Obs : &Zopf;</code>','<code>Obs = &Zopf;</code>'] };
  };

  window.conceptBank['N-Tuple Definition'] = function() {
    var n = pick([3,4,5]);
    return { scenario: 'A ' + n + '-tuple is:', question: 'Choose:', correct: 'An ordered sequence of ' + n + ' items.', distractors: ['A set of ' + n + ' items.','Three sets.','A single value.'] };
  };

  window.conceptBank['Game Board Cell'] = function() {
    return { scenario: 'Model &ldquo;<span class="key">game cell</span> (row, col, piece).&rdquo;', question: 'Type:', correct: '<code>Cell : &Nopf; &times; &Nopf; &times; Piece</code>', distractors: ['<code>Cell : &Nopf;</code>','<code>Cell = Piece</code>','<code>Cell &isin; &Nopf;</code>'] };
  };

  window.conceptBank['Square of Cardinality'] = function() {
    var n = randInt(3,7); var sq = n*n;
    return { scenario: '|A| = ' + n + '. |A &times; A| = ?', question: 'Choose:', correct: '' + sq, distractors: ['' + n, '' + (2*n), '' + (sq+1)] };
  };

  window.conceptBank['Calendar Event Type'] = function() {
    return { scenario: 'Type &ldquo;a <span class="key">calendar event</span>: date and topic.&rdquo;', question: 'Choose:', correct: '<code>Event : Date &times; Topic</code>', distractors: ['<code>Event : Date</code>','<code>Event = Date</code>','<code>Topic &isin; Date</code>'] };
  };

  window.conceptBank['Cart-Mem Rule'] = function() {
    return { scenario: '[cart-mem]: <code>(x, y) &isin; a &times; b</code> iff:', question: 'Choose:', correct: '<code>x &isin; a &and; y &isin; b</code>', distractors: ['<code>x &isin; b &and; y &isin; a</code>','<code>x = y</code>','<code>x &isin; a &or; y &isin; b</code>'] };
  };

  window.conceptBank['IP Address Type'] = function() {
    return { scenario: 'Model &ldquo;<span class="key">IP address</span> as 4 octets.&rdquo;', question: 'Type:', correct: '<code>IP : &Nopf; &times; &Nopf; &times; &Nopf; &times; &Nopf;</code>', distractors: ['<code>IP : &Nopf;</code>','<code>IP : String</code>','<code>IP = &Nopf;</code>'] };
  };

  window.conceptBank['Associativity'] = function() {
    return { scenario: 'Is <code>A &times; (B &times; C) = (A &times; B) &times; C</code>?', question: 'Choose:', correct: 'No &mdash; (a,(b,c)) &ne; ((a,b),c).', distractors: ['Yes, identical.','Always.','Only in &Nopf;.'] };
  };

  window.conceptBank['Cluedo Size'] = function() {
    var g = pick([4,5,6]); var r = pick([7,8,9]); var w = pick([5,6,7]); var sz = g*r*w;
    return { scenario: g + ' guests, ' + r + ' rooms, ' + w + ' weapons.', question: 'Possible solutions:', correct: '' + sz, distractors: ['' + (g+r+w), '' + (sz+g), '' + (g*r)] };
  };

  window.conceptBank['Driver-Coordinate Function'] = function() {
    var T = pick(['Driver','Pilot','Rider']);
    return { scenario: 'Model &ldquo;each <span class="key">' + T + '</span>&rsquo;s <span class="key">start coords</span>.&rdquo;', question: 'Type:', correct: '<code>Start : ' + T + ' &rarr; &Zopf; &times; &Zopf;</code>', distractors: ['<code>Start : ' + T + ' &rarr; &Zopf;</code>','<code>Start = &Zopf;</code>','<code>' + T + ' = Start</code>'] };
  };

  // ========== 5.5 Union, Intersection, Difference ==========

  window.conceptBank['Union Computation'] = function() {
    var a = randInt(1,5); var b = a+1; var c = b+1;
    return { scenario: '<code>{' + a + ', ' + b + '} &cup; {' + b + ', ' + c + '}</code> =', question: 'Choose:', correct: '<code>{' + a + ', ' + b + ', ' + c + '}</code>', distractors: ['<code>{' + b + '}</code>','<code>{' + a + ', ' + c + '}</code>','<code>&empty;</code>'] };
  };

  window.conceptBank['Intersection Computation'] = function() {
    var a = randInt(1,5); var b = a+1; var c = b+1;
    return { scenario: '<code>{' + a + ', ' + b + '} &cap; {' + b + ', ' + c + '}</code> =', question: 'Choose:', correct: '<code>{' + b + '}</code>', distractors: ['<code>{' + a + ', ' + b + ', ' + c + '}</code>','<code>{' + a + ', ' + c + '}</code>','<code>&empty;</code>'] };
  };

  window.conceptBank['Difference Computation'] = function() {
    var a = randInt(1,4); var b = a+1; var c = b+1; var d = c+1;
    return { scenario: '<code>{' + a + ', ' + b + ', ' + c + '} \\ {' + b + ', ' + c + ', ' + d + '}</code> =', question: 'Choose:', correct: '<code>{' + a + '}</code>', distractors: ['<code>{' + d + '}</code>','<code>{' + a + ', ' + d + '}</code>','<code>&empty;</code>'] };
  };

  window.conceptBank['Disjoint Sets'] = function() {
    return { scenario: 'If A and B are <span class="key">disjoint</span>, A &cap; B = ?', question: 'Choose:', correct: '<code>&empty;</code>', distractors: ['<code>A</code>','<code>B</code>','<code>A &cup; B</code>'] };
  };

  window.conceptBank['Intersection Application'] = function() {
    var A = pick(['Premium','Gold','VIP']); var B = pick(['Active','Online','Verified']);
    return { scenario: 'Express &ldquo;users who are both <span class="key">' + A + '</span> and <span class="key">' + B + '</span>.&rdquo;', question: 'Choose:', correct: '<code>' + A + ' &cap; ' + B + '</code>', distractors: ['<code>' + A + ' &cup; ' + B + '</code>','<code>' + A + ' \\ ' + B + '</code>','<code>' + B + ' \\ ' + A + '</code>'] };
  };

  window.conceptBank['Union Application'] = function() {
    var A = pick(['Invited','Registered']); var B = pick(['RSVP','Confirmed']);
    return { scenario: 'Express &ldquo;<span class="key">' + A + '</span> OR <span class="key">' + B + '</span>.&rdquo;', question: 'Choose:', correct: '<code>' + A + ' &cup; ' + B + '</code>', distractors: ['<code>' + A + ' &cap; ' + B + '</code>','<code>' + A + ' \\ ' + B + '</code>','<code>' + B + ' \\ ' + A + '</code>'] };
  };

  window.conceptBank['Difference Application'] = function() {
    var A = pick(['Employees','Users','Members']); var B = pick(['Managers','Admins','Banned']);
    return { scenario: 'Express &ldquo;<span class="key">' + A + '</span> not in <span class="key">' + B + '</span>.&rdquo;', question: 'Choose:', correct: '<code>' + A + ' \\ ' + B + '</code>', distractors: ['<code>' + A + ' &cap; ' + B + '</code>','<code>' + A + ' &cup; ' + B + '</code>','<code>' + B + ' \\ ' + A + '</code>'] };
  };

  window.conceptBank['Union Commutativity'] = function() {
    return { scenario: 'Is <code>A &cup; B = B &cup; A</code>?', question: 'Choose:', correct: 'Yes &mdash; commutative.', distractors: ['No.','Only when A = B.','Only in &Nopf;.'] };
  };

  window.conceptBank['Difference Commutativity'] = function() {
    return { scenario: 'Is <code>A \\ B = B \\ A</code>?', question: 'Choose:', correct: 'Usually no &mdash; not commutative.', distractors: ['Always.','Only when A &cap; B = &empty;.','Only when A &sube; B.'] };
  };

  window.conceptBank['Union with Empty'] = function() {
    return { scenario: 'Simplify <code>A &cup; &empty;</code>.', question: 'Choose:', correct: '<code>A</code>', distractors: ['<code>&empty;</code>','<code>&Pset; A</code>','<code>A &cap; &empty;</code>'] };
  };

  window.conceptBank['Intersection with Empty'] = function() {
    return { scenario: 'Simplify <code>A &cap; &empty;</code>.', question: 'Choose:', correct: '<code>&empty;</code>', distractors: ['<code>A</code>','<code>&Pset; A</code>','<code>A &cup; &empty;</code>'] };
  };

  window.conceptBank['Idempotent Union'] = function() {
    return { scenario: 'Simplify <code>A &cup; A</code>.', question: 'Choose:', correct: '<code>A</code>', distractors: ['<code>&empty;</code>','<code>2A</code>','<code>&Pset; A</code>'] };
  };

  window.conceptBank['Generalized Union'] = function() {
    var a=[1,2,4]; var b=[1,2,3,4,7]; var c=[2,4,6]; var u=[1,2,3,4,6,7];
    return { scenario: 'E={1,2,4}, F={1,2,3,4,7}, G={2,4,6}. &bigcup;{E,F,G}=', question: 'Choose:', correct: '<code>{' + u.join(', ') + '}</code>', distractors: ['<code>{2, 4}</code>','<code>{1, 7}</code>','<code>&empty;</code>'] };
  };

  window.conceptBank['Generalized Intersection'] = function() {
    return { scenario: 'Same E,F,G. &bigcap;{E,F,G}=', question: 'Choose:', correct: '<code>{2, 4}</code>', distractors: ['<code>{1,2,3,4,6,7}</code>','<code>{1}</code>','<code>&empty;</code>'] };
  };

  window.conceptBank['Combined Operations'] = function() {
    return { scenario: '<code>(E &cap; F) \\ G</code> with E={1,2,4}, F={1,2,3,4,7}, G={2,4,6}.', question: 'Result:', correct: '<code>{1}</code>', distractors: ['<code>{2, 4}</code>','<code>{3, 7}</code>','<code>&empty;</code>'] };
  };

  window.conceptBank['Fleur-Only Questions'] = function() {
    return { scenario: '<code>F \\ (E &cup; G)</code> with same sets.', question: 'Result:', correct: '<code>{3, 7}</code>', distractors: ['<code>{1}</code>','<code>{6}</code>','<code>&empty;</code>'] };
  };

  window.conceptBank['Subset of Union'] = function() {
    return { scenario: 'Is <code>A &sube; A &cup; B</code> always?', question: 'Choose:', correct: 'Yes.', distractors: ['No.','Only if B = A.','Only if B = &empty;.'] };
  };

  window.conceptBank['Intersection Subset'] = function() {
    return { scenario: 'Is <code>A &cap; B &sube; A</code>?', question: 'Choose:', correct: 'Yes.', distractors: ['No.','Only when B = A.','Only when A = &empty;.'] };
  };

  window.conceptBank['Buyers Exclusive'] = function() {
    var A = pick(['ProductA','PlanA','TierA']); var B = pick(['ProductB','PlanB','TierB']);
    return { scenario: 'Express &ldquo;buyers of <span class="key">' + A + '</span> but not <span class="key">' + B + '</span>.&rdquo;', question: 'Choose:', correct: '<code>Buyers' + A.replace(/\s/g,'') + ' \\ Buyers' + B.replace(/\s/g,'') + '</code>', distractors: ['<code>Buyers' + A.replace(/\s/g,'') + ' &cap; Buyers' + B.replace(/\s/g,'') + '</code>','<code>Buyers' + A.replace(/\s/g,'') + ' &cup; Buyers' + B.replace(/\s/g,'') + '</code>','<code>Buyers' + B.replace(/\s/g,'') + ' \\ Buyers' + A.replace(/\s/g,'') + '</code>'] };
  };

  window.conceptBank['Union Rule'] = function() {
    return { scenario: '[union]: <code>x &isin; a &cup; b</code> iff:', question: 'Choose:', correct: '<code>x &isin; a &or; x &isin; b</code>', distractors: ['<code>x &isin; a &and; x &isin; b</code>','<code>x &notin; a &and; x &notin; b</code>','<code>x = a &or; x = b</code>'] };
  };

  window.conceptBank['Intersection Rule'] = function() {
    return { scenario: '[inter]: <code>x &isin; a &cap; b</code> iff:', question: 'Choose:', correct: '<code>x &isin; a &and; x &isin; b</code>', distractors: ['<code>x &isin; a &or; x &isin; b</code>','<code>x &notin; a</code>','<code>x = a</code>'] };
  };

  window.conceptBank['Difference Rule'] = function() {
    return { scenario: '[diff]: <code>x &isin; a \\ b</code> iff:', question: 'Choose:', correct: '<code>x &isin; a &and; x &notin; b</code>', distractors: ['<code>x &isin; a &or; x &notin; b</code>','<code>x &isin; b &and; x &notin; a</code>','<code>x &notin; a &and; x &notin; b</code>'] };
  };

  window.conceptBank['Paid Minus Banned'] = function() {
    var A = pick(['Paid','Active','Verified']); var B = pick(['Banned','Suspended','Blocked']);
    return { scenario: 'Express &ldquo;<span class="key">' + A + '</span> minus <span class="key">' + B + '</span>.&rdquo;', question: 'Choose:', correct: '<code>' + A + ' \\ ' + B + '</code>', distractors: ['<code>' + A + ' &cap; ' + B + '</code>','<code>' + A + ' &cup; ' + B + '</code>','<code>' + B + ' \\ ' + A + '</code>'] };
  };

  window.conceptBank['Difference Computation 2'] = function() {
    var a = randInt(1,3); var b=a+1; var c=b+1; var d=c+1; var x=b; var y=d; var z=d+1;
    return { scenario: '<code>{' + a+','+b+','+c+','+d + '} \\ {' + x+','+d+','+z + '}</code> =', question: 'Choose:', correct: '<code>{' + a + ', ' + c + '}</code>', distractors: ['<code>{' + x + ', ' + d + '}</code>','<code>{' + z + '}</code>','<code>{' + a+','+b+','+c+','+d+','+z + '}</code>'] };
  };

  window.conceptBank['Mutual Friends'] = function() {
    var A = pick(people); var B = pick(people.filter(function(p){return p!==A;}));
    return { scenario: 'Express &ldquo;friends of <span class="key">' + A + '</span> AND <span class="key">' + B + '</span>.&rdquo;', question: 'Choose:', correct: '<code>Friends(' + A + ') &cap; Friends(' + B + ')</code>', distractors: ['<code>Friends(' + A + ') &cup; Friends(' + B + ')</code>','<code>Friends(' + A + ') \\ Friends(' + B + ')</code>','<code>Friends = ' + A + ' &cap; ' + B + '</code>'] };
  };

  // ========== 5.6 Types ==========

  window.conceptBank['Unique Type'] = function() {
    return { scenario: 'In Z, every expression has:', question: 'Choose:', correct: 'Exactly one type.', distractors: ['At most one.','Many types.','No type.'] };
  };

  window.conceptBank['Built-In Type'] = function() {
    return { scenario: 'Which is built-in in Z?', question: 'Choose:', correct: '<code>&Zopf;</code> (integers)', distractors: ['<code>&Pset; &Zopf;</code>','<code>&Zopf; &times; &Zopf;</code>','<code>&Pset;(&Zopf; &times; &Zopf;)</code>'] };
  };

  window.conceptBank['Basic Type Declaration'] = function() {
    var T = pick(['Color','Shape','Currency','Language']);
    return { scenario: 'Declare a basic type for &ldquo;<span class="key">' + T + '</span>.&rdquo;', question: 'Choose:', correct: '<code>[' + T + ']</code>', distractors: ['<code>' + T + ' : &Pset; ' + T + '</code>','<code>' + T + ' = &Zopf;</code>','<code>' + T + ' &isin; Type</code>'] };
  };

  window.conceptBank['Set Type'] = function() {
    var T = pick(['Student','Player','Item']);
    return { scenario: 'A set of ' + T + 's has type:', question: 'Choose:', correct: '<code>&Pset; ' + T + '</code>', distractors: ['<code>' + T + '</code>','<code>' + T + ' &times; ' + T + '</code>','<code>&Zopf;</code>'] };
  };

  window.conceptBank['Pair Type'] = function() {
    var A = pick(['Name','ID']); var B = '&Nopf;';
    return { scenario: 'A pair (' + A + ', age) has type:', question: 'Choose:', correct: '<code>' + A + ' &times; ' + B + '</code>', distractors: ['<code>' + A + ' + ' + B + '</code>','<code>&Pset; ' + A + '</code>','<code>&Zopf;</code>'] };
  };

  window.conceptBank['Type Mismatch'] = function() {
    var A = '&Zopf;'; var B = pick(['Person','Color','Item']);
    return { scenario: '<code>x : ' + A + '</code> and <code>y : ' + B + '</code>. Is <code>x = y</code> type-correct?', question: 'Choose:', correct: 'No &mdash; types mismatch.', distractors: ['Yes.','Only if x = 0.','Only in &Zopf;.'] };
  };

  window.conceptBank['Derived Relation Type'] = function() {
    return { scenario: 'Type of a set of pairs (&Nopf; &times; &Nopf;):', question: 'Choose:', correct: '<code>&Pset;(&Nopf; &times; &Nopf;)</code>', distractors: ['<code>&Nopf; &times; &Nopf;</code>','<code>&Pset; &Nopf;</code>','<code>&Zopf;</code>'] };
  };

  window.conceptBank['Type of Extension'] = function() {
    var vals = [randInt(1,9),randInt(1,9),randInt(1,9)];
    return { scenario: 'Type of <code>{' + vals.join(', ') + '}</code>:', question: 'Choose:', correct: '<code>&Pset; &Zopf;</code>', distractors: ['<code>&Zopf;</code>','<code>&Zopf; &times; &Zopf;</code>','<code>{' + vals.join(', ') + '}</code>'] };
  };

  window.conceptBank['Type Checking Purpose'] = function() {
    return { scenario: 'The Z type system catches:', question: 'Choose:', correct: 'Type mismatches before semantic errors.', distractors: ['Logical contradictions only.','Runtime bugs only.','Nothing.'] };
  };

  window.conceptBank['Enrollment Relation Type'] = function() {
    var A = pick(['Student','Employee']); var B = pick(['Course','Project']);
    return { scenario: 'Type &ldquo;a relation between <span class="key">' + A + 's</span> and <span class="key">' + B + 's</span>.&rdquo;', question: 'Choose:', correct: '<code>R : &Pset;(' + A + ' &times; ' + B + ')</code>', distractors: ['<code>R : ' + A + ' &times; ' + B + '</code>','<code>R : ' + A + '</code>','<code>R &isin; ' + B + '</code>'] };
  };

  window.conceptBank['Membership Typing Constraint'] = function() {
    return { scenario: '<code>x &isin; s</code> is valid only if:', question: 'Choose:', correct: 'Type of s = &Pset;(type of x).', distractors: ['x and s same type.','s is always &Zopf;.','No restriction.'] };
  };

  window.conceptBank['Russell Prevention'] = function() {
    return { scenario: 'Why can&rsquo;t Z define R = {s : T | &not; s &isin; s}?', question: 'Choose:', correct: '<code>s &isin; s</code> is ill-typed &mdash; no T = &Pset; T.', distractors: ['R would be empty.','Negation banned.','Comprehension banned.'] };
  };

  window.conceptBank['Temperature Declaration'] = function() {
    return { scenario: 'Declare &ldquo;<span class="key">Temperature</span>&rdquo; as a basic type.', question: 'Choose:', correct: '<code>[Temperature]</code>', distractors: ['<code>Temperature : &Zopf;</code>','<code>Temperature = &Nopf;</code>','<code>Temperature &isin; Type</code>'] };
  };

  window.conceptBank['Coordinate Set Type'] = function() {
    return { scenario: 'Type &ldquo;a set of <span class="key">integer pairs</span>.&rdquo;', question: 'Choose:', correct: '<code>Coords : &Pset;(&Zopf; &times; &Zopf;)</code>', distractors: ['<code>Coords : &Zopf;</code>','<code>Coords : &Pset; &Zopf;</code>','<code>Coords &isin; &Zopf;</code>'] };
  };

  window.conceptBank['Types Documentation'] = function() {
    return { scenario: 'Types help by:', question: 'Choose:', correct: 'Catching mismatches and documenting intent.', distractors: ['Running code faster.','Eliminating tests.','Adding quantifiers.'] };
  };

  window.conceptBank['Natural Subset of Integer'] = function() {
    return { scenario: 'Is <code>&Nopf; &sube; &Zopf;</code>?', question: 'Choose:', correct: 'Yes &mdash; every natural is an integer.', distractors: ['No.','Only finite subsets.','Only if &Nopf; = {0,1,2}.'] };
  };

  window.conceptBank['Multi-Variable Declaration'] = function() {
    return { scenario: '<code>x, y : &Zopf;</code> types:', question: 'Choose:', correct: 'Both x and y as integers.', distractors: ['Only x.','A pair.','Undefined.'] };
  };

  window.conceptBank['Credential Function Type'] = function() {
    var A = pick(['Username','Email']); var B = pick(['Hash','Token']);
    return { scenario: 'Type &ldquo;mapping from <span class="key">' + A + '</span> to <span class="key">' + B + '</span>.&rdquo;', question: 'Choose:', correct: '<code>Cred : ' + A + ' &rarr; ' + B + '</code>', distractors: ['<code>Cred : ' + A + '</code>','<code>Cred = ' + B + '</code>','<code>' + A + ' &isin; ' + B + '</code>'] };
  };

  window.conceptBank['Static Checking'] = function() {
    return { scenario: 'Types in Z are checked:', question: 'Choose:', correct: 'Statically, by algorithm.', distractors: ['Dynamically at runtime.','Never.','Only for numbers.'] };
  };

  window.conceptBank['Shared Document Type'] = function() {
    return { scenario: 'Type &ldquo;<span class="key">shared doc</span> (owner, readers).&rdquo;', question: 'Choose:', correct: '<code>Doc : User &times; &Pset; User</code>', distractors: ['<code>Doc : User</code>','<code>Doc = User</code>','<code>Doc : &Pset; User</code>'] };
  };

  window.conceptBank['Basic Type Choice'] = function() {
    return { scenario: 'When choosing a basic type:', question: 'Choose:', correct: 'Choose large enough to be a superset of all relevant values.', distractors: ['Use smallest possible.','Always use &Zopf;.','Avoid basic types.'] };
  };

  window.conceptBank['Empty Set Type'] = function() {
    return { scenario: 'Type of &empty;:', question: 'Choose:', correct: 'Context-dependent &mdash; must be typed.', distractors: ['&Zopf;.','&Nopf;.','No type.'] };
  };

  window.conceptBank['Grade Function Type'] = function() {
    var A = pick(['Student','Employee']); var B = pick(['Course','Project']);
    return { scenario: 'Type &ldquo;each <span class="key">' + A + '</span> has one grade per <span class="key">' + B + '</span>.&rdquo;', question: 'Choose:', correct: '<code>Grade : ' + A + ' &times; ' + B + ' &rarr; &Nopf;</code>', distractors: ['<code>Grade : ' + A + '</code>','<code>Grade = ' + B + '</code>','<code>' + A + ' &isin; Grade</code>'] };
  };

  window.conceptBank['Pair Set Type'] = function() {
    var a = randInt(1,5); var b = pick(['a','b','c']);
    return { scenario: 'Type of <code>{(' + a + ', ' + b + ')}</code>:', question: 'Choose:', correct: '<code>&Pset;(&Nopf; &times; Letter)</code>', distractors: ['<code>&Nopf; &times; Letter</code>','<code>&Pset; &Nopf;</code>','<code>&Zopf;</code>'] };
  };

  window.conceptBank['Multiset Type'] = function() {
    var T = pick(['Tag','Word','Item']);
    return { scenario: 'Type &ldquo;a <span class="key">multiset</span> of <span class="key">' + T + 's</span>&rdquo; (with counts).', question: 'Choose:', correct: '<code>' + T + 's : ' + T + ' &rarr; &Nopf;</code>', distractors: ['<code>' + T + 's : &Pset; ' + T + '</code>','<code>' + T + 's = ' + T + '</code>','<code>' + T + ' &isin; ' + T + 's</code>'] };
  };

})();
