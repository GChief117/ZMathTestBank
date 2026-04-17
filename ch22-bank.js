(function buildCh22Bank() {
  if (!window.conceptBank) window.conceptBank = {};

  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }

  /* pools */
  var queues = [
    {name:'print spool',type:'Job',cap:100},
    {name:'call-centre queue',type:'Call',cap:20},
    {name:'airport boarding lane',type:'Passenger',cap:50},
    {name:'bakery order tracker',type:'Order',cap:15},
    {name:'deli counter',type:'Ticket',cap:30},
    {name:'parking garage',type:'Car',cap:120},
    {name:'shipping conveyor',type:'Package',cap:50},
    {name:'help-desk intake',type:'Ticket',cap:25},
    {name:'coffee-shop pager',type:'Order',cap:10},
    {name:'theme-park ride queue',type:'Rider',cap:30}
  ];

  var rings = [
    {name:'baggage carousel',slots:8},
    {name:'sushi belt',slots:10},
    {name:'parking deck log',slots:120},
    {name:'conveyor ring',slots:6},
    {name:'jukebox ring',slots:20},
    {name:'tram ring',slots:8},
    {name:'printer ring',slots:5},
    {name:'taxi stand ring',slots:7},
    {name:'bus bay ring',slots:5},
    {name:'dispatch ring',slots:4}
  ];

  /* ====== 22.1 Specification ====== */

  window.conceptBank['Buffer Behaviour'] = function() {
    var q = pick(queues);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> (capacity ' + q.cap + ') stores <code>' + q.type + '</code> values.',
      question: 'A bounded buffer behaves as:',
      correct: 'A first-in first-out queue with fixed capacity ' + q.cap + '.',
      distractors: ['A last-in first-out stack.','A hash set with no ordering.','A random-access array.']
    };
  };

  window.conceptBank['Report Free Type'] = function() {
    return {
      scenario: 'The <code>Report</code> free type is declared via <code>::=</code>.',
      question: 'Its elements are:',
      correct: '<code>ok | full | empty</code>',
      distractors: ['<code>true | false</code>','<code>yes | no</code>','<code>0 | 1 | 2</code>']
    };
  };

  window.conceptBank['Full Insert Refused'] = function() {
    var q = pick(queues);
    var n = q.cap;
    return {
      scenario: 'A <span class="key">' + q.name + '</span> (capacity ' + n + ') has <span class="key">' + n + ' items</span>. Another arrives.',
      question: 'Which schema applies?',
      correct: '<code>BufferInError: &Xi;Buffer &and; size = max_size &and; report! = full</code>',
      distractors: [
        '<code>BufferIn&#8320;: buffer&prime; = buffer &frown; &langle;x?&rangle;</code>',
        '<code>BufferInit: buffer&prime; = &langle;&rangle;</code>',
        '<code>BufferOutError: report! = empty</code>'
      ]
    };
  };

  window.conceptBank['Empty Extract Refused'] = function() {
    var q = pick(queues);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> holds <span class="key">0 items</span>. Extract attempted.',
      question: 'Which schema?',
      correct: '<code>BufferOutError: &Xi;Buffer &and; buffer = &langle;&rangle; &and; report! = empty</code>',
      distractors: [
        '<code>BufferOut&#8320;: x! = head buffer</code>',
        '<code>BufferInError: report! = full</code>',
        '<code>BufferInit: buffer&prime; = &langle;&rangle;</code>'
      ]
    };
  };

  window.conceptBank['Successful Extract'] = function() {
    var q = pick(queues);
    var n = randInt(1, q.cap);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> has <span class="key">' + n + ' items</span>. Next served.',
      question: 'Which schema captures a successful extract?',
      correct: '<code>BufferOut&#8320;: buffer &ne; &langle;&rangle; &and; x! = head buffer &and; buffer&prime; = tail buffer</code>',
      distractors: [
        '<code>BufferIn&#8320;: buffer&prime; = buffer &frown; &langle;x?&rangle;</code>',
        '<code>BufferOutError: report! = empty</code>',
        '<code>&Xi;Buffer</code>'
      ]
    };
  };

  window.conceptBank['Buffer Invariant'] = function() {
    return {
      scenario: 'The invariant of <code>Buffer[X]</code>.',
      question: 'Which is correct?',
      correct: '<code>size = #buffer &and; size &le; max_size</code>',
      distractors: ['<code>size &gt; max_size</code>','<code>buffer = &langle;&rangle;</code> always','<code>size = 0</code> always']
    };
  };

  window.conceptBank['BufferInit Schema'] = function() {
    var q = pick(queues);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> boots.',
      question: 'Which schema initialises state?',
      correct: '<code>BufferInit: Buffer&prime;[X] &and; buffer&prime; = &langle;&rangle;</code>',
      distractors: ['<code>BufferIn&#8320;</code>','<code>BufferOut&#8320;</code>','<code>&Xi;Buffer</code>']
    };
  };

  window.conceptBank['Total Precondition'] = function() {
    return {
      scenario: 'The precondition of <code>BufferIn</code> (total version).',
      question: 'What is it?',
      correct: '<code>true</code> &mdash; always defined.',
      distractors: ['<code>size &lt; max_size</code>','<code>size = max_size</code>','<code>false</code>']
    };
  };

  window.conceptBank['Partial Insert Precondition'] = function() {
    return {
      scenario: 'The precondition of the partial <code>BufferIn&#8320;</code>.',
      question: 'What is it?',
      correct: '<code>size &lt; max_size</code>',
      distractors: ['<code>true</code>','<code>buffer = &langle;&rangle;</code>','<code>false</code>']
    };
  };

  window.conceptBank['Partial Extract Precondition'] = function() {
    return {
      scenario: 'The precondition of <code>BufferOut&#8320;</code>.',
      question: 'What is it?',
      correct: '<code>buffer &ne; &langle;&rangle;</code>',
      distractors: ['<code>buffer = &langle;&rangle;</code>','<code>size = max_size</code>','<code>false</code>']
    };
  };

  window.conceptBank['Totalisation Pattern'] = function() {
    var op = pick(['BufferIn','BufferOut']);
    var partial = op + '&#8320;';
    var err = op === 'BufferIn' ? 'BufferInError' : 'BufferOutError';
    return {
      scenario: 'Totalising <code>' + partial + '</code>.',
      question: 'Which construction?',
      correct: '<code>' + op + ' &cong; (' + partial + ' &and; Success) &or; ' + err + '</code>',
      distractors: [
        '<code>' + op + ' &cong; ' + partial + '</code>',
        '<code>' + op + ' &cong; &Xi;Buffer</code>',
        '<code>' + op + ' &cong; ' + err + '</code>'
      ]
    };
  };

  window.conceptBank['Success Schema'] = function() {
    return {
      scenario: 'The <code>Success</code> schema.',
      question: 'What does it emit?',
      correct: '<code>report! = ok</code> with no constraint on state.',
      distractors: ['<code>report! = full</code>','<code>report! = empty</code>','No output.']
    };
  };

  window.conceptBank['Successful Insert'] = function() {
    var q = pick(queues);
    var n = randInt(0, q.cap - 1);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> (capacity ' + q.cap + ') has <span class="key">' + n + ' items</span>. One more arrives.',
      question: 'Which schema fires?',
      correct: '<code>BufferIn&#8320; &and; Success: buffer&prime; = buffer &frown; &langle;x?&rangle;, report! = ok</code>',
      distractors: ['<code>BufferInError: report! = full</code>','<code>BufferOut&#8320;</code>','<code>BufferInit</code>']
    };
  };

  window.conceptBank['Xi in Errors'] = function() {
    return {
      scenario: 'Error schemas include <code>&Xi;Buffer</code>.',
      question: 'Why?',
      correct: 'State must be unchanged when an operation is refused.',
      distractors: ['State is reset to empty.','Buffer grows by one.','No internal effect.']
    };
  };

  window.conceptBank['First Insert into Empty'] = function() {
    var q = pick(queues);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> (capacity ' + q.cap + ') is <span class="key">empty</span>. First item arrives.',
      question: 'Which schema activates?',
      correct: '<code>BufferIn&#8320; &and; Success</code> with <code>buffer&prime; = &langle;x?&rangle;</code>, <code>report! = ok</code>',
      distractors: ['<code>BufferInError: report! = full</code>','<code>BufferOut&#8320;</code>','<code>BufferOutError</code>']
    };
  };

  window.conceptBank['UpdateBuffer Capacity'] = function() {
    return {
      scenario: '<code>UpdateBuffer</code> enforces:',
      question: 'What constraint?',
      correct: '<code>max_size&prime; = max_size</code> &mdash; capacity cannot change.',
      distractors: ['<code>buffer&prime; = buffer</code>','<code>size&prime; = 0</code>','<code>max_size&prime; = 0</code>']
    };
  };

  window.conceptBank['Full Refuse Post'] = function() {
    var q = pick(queues);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> is full. Insert attempted.',
      question: 'Postcondition?',
      correct: '<code>size = max_size &and; report! = full &and; state unchanged</code>',
      distractors: [
        '<code>buffer&prime; = buffer &frown; &langle;x?&rangle;</code>',
        '<code>buffer&prime; = &langle;&rangle;</code>',
        '<code>report! = ok</code>'
      ]
    };
  };

  window.conceptBank['Output Convention'] = function() {
    return {
      scenario: 'Z output variable convention.',
      question: 'Which decoration?',
      correct: '<code>x!</code> &mdash; trailing exclamation mark.',
      distractors: ['<code>x?</code> (input)','<code>x&prime;</code> (after-state)','<code>x</code> (before-state)']
    };
  };

  window.conceptBank['Extract Postcondition'] = function() {
    var q = pick(queues);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> is non-empty. Successful extract.',
      question: 'Postcondition?',
      correct: '<code>x! = head buffer &and; buffer&prime; = tail buffer &and; report! = ok</code>',
      distractors: [
        '<code>buffer&prime; = buffer &frown; &langle;x?&rangle;</code>',
        '<code>report! = empty</code>',
        '<code>buffer&prime; = &langle;&rangle;</code>'
      ]
    };
  };

  window.conceptBank['Max Size at Init'] = function() {
    return {
      scenario: '<code>BufferInit</code> leaves <code>max_size</code>:',
      question: 'What value?',
      correct: 'Unconstrained &mdash; chosen per instance at instantiation.',
      distractors: ['Always 0.','Always infinite.','Always 1.']
    };
  };

  window.conceptBank['Scenario — Call Centre Insert'] = function() {
    var q = pick(queues);
    var n = randInt(1, q.cap - 1);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> (capacity ' + q.cap + ') has <span class="key">' + n + ' items</span>. One more arrives.',
      question: 'Which schema?',
      correct: '<code>BufferIn&#8320; &and; Success</code> &mdash; <code>' + n + ' &lt; ' + q.cap + '</code>.',
      distractors: ['<code>BufferInError</code>','<code>BufferOut&#8320;</code>','<code>BufferInit</code>']
    };
  };

  window.conceptBank['Generic Parameter'] = function() {
    return {
      scenario: 'The generic parameter <code>X</code> in <code>Buffer[X]</code>.',
      question: 'What does it represent?',
      correct: 'The type of values stored &mdash; unconstrained, making the buffer reusable.',
      distractors: ['A natural number.','A report label.','An operation name.']
    };
  };

  window.conceptBank['Scenario — Empty Extract'] = function() {
    var q = pick(queues);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> is <span class="key">empty</span>. Extract attempted.',
      question: 'Result?',
      correct: '<code>BufferOutError</code> &mdash; state unchanged, <code>report! = empty</code>.',
      distractors: ['<code>BufferOut&#8320; &and; Success</code>','<code>BufferInError</code>','<code>BufferInit</code>']
    };
  };

  window.conceptBank['Totalisation Formula'] = function() {
    return {
      scenario: 'The general totalisation pattern.',
      question: 'Which formula?',
      correct: '<code>(Partial &and; Success) &or; Error</code>',
      distractors: ['<code>Partial &and; Error</code>','<code>Success &or; Partial</code>','<code>Partial</code> alone']
    };
  };

  window.conceptBank['Scenario — Diner Wait-List'] = function() {
    var q = pick(queues);
    var n = randInt(1, q.cap);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> holds <span class="key">' + n + ' items</span>. Front item served.',
      question: 'Which schema?',
      correct: '<code>BufferOut&#8320; &and; Success</code> &mdash; <code>buffer &ne; &langle;&rangle;</code>, <code>report! = ok</code>.',
      distractors: ['<code>BufferOutError</code>','<code>BufferIn&#8320;</code>','<code>BufferInit</code>']
    };
  };

  /* ====== 22.2 Design ====== */

  window.conceptBank['Circular Array Definition'] = function() {
    return {
      scenario: 'A circular array\'s two ends are:',
      question: 'What property?',
      correct: 'Considered joined &mdash; indices wrap from <code>max_size</code> back to 1.',
      distractors: ['Disjoint and unbounded.','Infinite in one direction.','Duplicated.']
    };
  };

  window.conceptBank['Array Components'] = function() {
    return {
      scenario: '<code>Array[X]</code> components.',
      question: 'Which five?',
      correct: '<code>array, max_size, bot, top, size</code>',
      distractors: ['<code>buffer, size, max_size</code>','<code>x?, x!, report!</code>','<code>head, tail, init</code>']
    };
  };

  window.conceptBank['Design Invariant'] = function() {
    var r = pick(rings);
    return {
      scenario: 'A <span class="key">' + r.name + '</span> has ' + r.slots + ' slots.',
      question: 'Which invariant is correct?',
      correct: '<code>#array = max_size &and; size mod max_size = (top &minus; bot + 1) mod max_size</code>',
      distractors: ['<code>size &gt; max_size</code>','<code>array = &langle;&rangle;</code>','<code>bot &gt; max_size</code>']
    };
  };

  window.conceptBank['Full Buffer Indices'] = function() {
    var r = pick(rings);
    var bot = randInt(1, r.slots);
    var top = ((bot - 2 + r.slots) % r.slots) + 1;
    return {
      scenario: 'A <span class="key">' + r.slots + '-slot ' + r.name + '</span> has <code>bot = ' + bot + ', top = ' + top + ', size = ' + r.slots + '</code>.',
      question: 'This represents:',
      correct: 'A full buffer &mdash; live region wraps.',
      distractors: ['An empty buffer.','An invalid state.','A size-2 buffer.']
    };
  };

  window.conceptBank['Why Size Needed'] = function() {
    return {
      scenario: 'Why is explicit <code>size</code> needed?',
      question: 'Reason:',
      correct: 'Empty and full both satisfy <code>top + 1 mod max_size = bot</code> &mdash; ambiguous without <code>size</code>.',
      distractors: ['For execution speed.','For aesthetics.','Legacy compatibility.']
    };
  };

  window.conceptBank['Empty Collision'] = function() {
    var r = pick(rings);
    return {
      scenario: 'A <span class="key">' + r.name + '</span> of ' + r.slots + ' stops has <code>size = 0</code>.',
      question: 'What must hold?',
      correct: '<code>top + 1 mod max_size = bot</code> (empty collision).',
      distractors: ['<code>bot &gt; top</code> always.','<code>array = &langle;&rangle;</code>','<code>max_size = 0</code>']
    };
  };

  window.conceptBank['Capacity Fixed'] = function() {
    return {
      scenario: 'Capacity <code>max_size</code> in the design:',
      question: 'What property?',
      correct: 'Cannot change after installation &mdash; <code>max_size&prime; = max_size</code>.',
      distractors: ['Changes every op.','Is always zero.','Is infinite.']
    };
  };

  window.conceptBank['Valid State Check'] = function() {
    var r = pick(rings);
    var sz = randInt(1, r.slots - 1);
    var bot = randInt(1, r.slots);
    var top = ((bot + sz - 2) % r.slots) + 1;
    return {
      scenario: 'A <span class="key">' + r.slots + '-slot ring</span> has <code>bot = ' + bot + ', top = ' + top + ', size = ' + sz + '</code>.',
      question: 'Valid?',
      correct: 'Valid &mdash; <code>' + sz + ' mod ' + r.slots + ' = (' + top + ' &minus; ' + bot + ' + 1) mod ' + r.slots + '</code>.',
      distractors: ['Invalid.','Full.','Empty.']
    };
  };

  window.conceptBank['Array Length'] = function() {
    return {
      scenario: '<code>#array</code> in the design state.',
      question: 'Equals:',
      correct: '<code>max_size</code> &mdash; pre-sized to capacity.',
      distractors: ['<code>size</code>','0','1']
    };
  };

  window.conceptBank['Full Jukebox'] = function() {
    var r = pick(rings);
    return {
      scenario: 'A <span class="key">' + r.name + '</span> of ' + r.slots + ' has <code>size = ' + r.slots + '</code>.',
      question: 'What is implied?',
      correct: 'Buffer is full; <code>top + 1 mod ' + r.slots + ' = bot</code>.',
      distractors: ['Buffer is empty.','Invalid.','Half full.']
    };
  };

  window.conceptBank['Array Type'] = function() {
    return {
      scenario: 'In the design, <code>array</code> has type:',
      question: 'Which?',
      correct: '<code>seq X</code> used as a fixed-length array.',
      distractors: ['<code>&Popf; X</code>','<code>X &rarr; &Nopf;</code>','No type.']
    };
  };

  window.conceptBank['Full Refuse at Design'] = function() {
    var r = pick(rings);
    return {
      scenario: 'A <span class="key">' + r.slots + '-slot ring</span> is full. Next insert:',
      question: 'What happens?',
      correct: 'Refused &mdash; <code>size = max_size</code>.',
      distractors: ['Appended at index ' + (r.slots+1) + '.','Stored at bot.','Overwrites index 1.']
    };
  };

  window.conceptBank['Modular Invariant Scope'] = function() {
    return {
      scenario: 'The modular invariant holds:',
      question: 'When?',
      correct: 'Always &mdash; in every valid state.',
      distractors: ['Only when empty.','Only when full.','Never.']
    };
  };

  window.conceptBank['Wrapped Region Validation'] = function() {
    var r = pick(rings);
    var sz = randInt(2, r.slots - 1);
    var bot = randInt(r.slots - sz + 2, r.slots);
    var top = ((bot + sz - 2) % r.slots) + 1;
    return {
      scenario: 'A <span class="key">' + r.slots + '-slot ring</span> has <code>bot = ' + bot + ', top = ' + top + ', size = ' + sz + '</code>.',
      question: 'Valid?',
      correct: 'Valid &mdash; wrapped region of ' + sz + '.',
      distractors: ['Invalid.','Full.','Empty.']
    };
  };

  window.conceptBank['1-Based Indices'] = function() {
    return {
      scenario: '<code>bot &isin; 1..max_size</code> requires:',
      question: 'What?',
      correct: '1-based and bounded by capacity.',
      distractors: ['0-based.','Unbounded.','Negative.']
    };
  };

  window.conceptBank['Extract Advances Bot'] = function() {
    var r = pick(rings);
    var bot = randInt(1, r.slots);
    var top = ((bot + randInt(1, r.slots - 1) - 1) % r.slots) + 1;
    var sz = ((top - bot + r.slots) % r.slots) + (top >= bot ? 0 : r.slots);
    var newBot = (bot % r.slots) + 1;
    return {
      scenario: 'A <span class="key">' + r.slots + '-slot ring</span> has <code>bot = ' + bot + '</code>. After extract:',
      question: '<code>bot&prime;</code> = ?',
      correct: '<code>bot&prime; = ' + newBot + '</code> (advance by mod).',
      distractors: ['<code>bot&prime; = ' + bot + '</code> (no change).','<code>bot&prime; = 0</code>.','<code>bot&prime; = ' + r.slots + '</code>.']
    };
  };

  window.conceptBank['UpdateArray Schema'] = function() {
    return {
      scenario: '<code>UpdateArray</code> includes:',
      question: 'What?',
      correct: '<code>Array[X]</code> and <code>Array&prime;[X]</code>, plus <code>max_size&prime; = max_size</code>.',
      distractors: ['Only <code>Array&prime;</code>.','Neither.','<code>&Xi;Array</code>.']
    };
  };

  window.conceptBank['Single Element State'] = function() {
    var r = pick(rings);
    var idx = randInt(1, r.slots);
    return {
      scenario: 'A <span class="key">' + r.slots + '-slot ring</span> has <code>bot = ' + idx + ', top = ' + idx + ', size = 1</code>.',
      question: 'Meaning?',
      correct: 'Exactly one item at index ' + idx + '.',
      distractors: ['Empty.','Full.','Invalid.']
    };
  };

  window.conceptBank['O(1) Benefit'] = function() {
    return {
      scenario: 'Why circular array instead of shifting?',
      question: 'Benefit:',
      correct: 'Both ops become O(1) &mdash; only pointer and count updates.',
      distractors: ['Uses less memory.','Simpler to prove.','Historical convention.']
    };
  };

  window.conceptBank['Insert Advances Top'] = function() {
    var r = pick(rings);
    var top = randInt(1, r.slots);
    var newTop = (top % r.slots) + 1;
    return {
      scenario: 'A <span class="key">' + r.slots + '-slot ring</span> has <code>top = ' + top + '</code>. After insert:',
      question: '<code>top&prime;</code> = ?',
      correct: '<code>top&prime; = (' + top + ' mod ' + r.slots + ') + 1 = ' + newTop + '</code>.',
      distractors: ['<code>top&prime; = 0</code>.','<code>top&prime; = ' + (r.slots+1) + '</code>.','<code>bot&prime; = ' + (top-1) + '</code>.']
    };
  };

  window.conceptBank['Shared Collision'] = function() {
    return {
      scenario: 'States with <code>size = 0</code> and <code>size = max_size</code> share:',
      question: 'What?',
      correct: '<code>top + 1 mod max_size = bot</code>.',
      distractors: ['<code>bot = 0</code>.','<code>top = 0</code>.','<code>array = &langle;&rangle;</code>.']
    };
  };

  window.conceptBank['Top Holds Last Value'] = function() {
    var r = pick(rings);
    var bot = randInt(1, r.slots);
    var sz = randInt(2, r.slots);
    var top = ((bot + sz - 2) % r.slots) + 1;
    return {
      scenario: 'A ring has <code>bot = ' + bot + ', top = ' + top + '</code>.',
      question: 'Which index holds the last live value?',
      correct: 'Index <code>top = ' + top + '</code>.',
      distractors: ['Index <code>bot = ' + bot + '</code>.','Index 1.','Index ' + Math.ceil(r.slots/2) + '.']
    };
  };

  window.conceptBank['Size Bound'] = function() {
    return {
      scenario: '<code>size &isin; 0..max_size</code> prevents:',
      question: 'What?',
      correct: 'Overflow or negative counts.',
      distractors: ['Indices from wrapping.','Operations from being invoked.','Generic parameters.']
    };
  };

  window.conceptBank['Wrapped Bus Bay'] = function() {
    var r = pick(rings);
    var sz = randInt(2, r.slots - 1);
    var bot = randInt(r.slots - sz + 2, r.slots);
    var top = ((bot + sz - 2) % r.slots) + 1;
    return {
      scenario: 'A <span class="key">' + r.slots + '-slot ring</span> has <code>bot = ' + bot + ', top = ' + top + ', size = ' + sz + '</code>. Wrap-around?',
      question: 'Is it active?',
      correct: 'Yes &mdash; live region crosses the boundary.',
      distractors: ['No, contiguous.','Invalid state.','Full.']
    };
  };

  window.conceptBank['Design Role'] = function() {
    return {
      scenario: 'The role of the design schema is:',
      question: 'What?',
      correct: 'A concrete state closer to implementation that the abstract spec refines to.',
      distractors: ['Replacing the spec entirely.','Removing invariants.','Decoration only.']
    };
  };

  /* ====== 22.3 Retrieve Relation ====== */

  window.conceptBank['Retrieve Direction'] = function() {
    return {
      scenario: 'The retrieve relation maps:',
      question: 'Which direction?',
      correct: 'Concrete state to abstract state.',
      distractors: ['Abstract to concrete only.','Input to output.','Nothing.']
    };
  };

  window.conceptBank['Zero Shift'] = function() {
    return {
      scenario: '<code>0 &laquo; s</code> equals:',
      question: 'What?',
      correct: '<code>s</code> (unchanged).',
      distractors: ['<code>&langle;&rangle;</code>','<code>tail s</code>','<code>head s</code>']
    };
  };

  window.conceptBank['Shift by 1'] = function() {
    var vals = ['a','b','c','d','e','f'];
    var n = randInt(4, 6);
    var s = vals.slice(0, n);
    var shifted = s.slice(1).concat([s[0]]);
    return {
      scenario: 'A ring <code>&langle;' + s.join(',') + '&rangle;</code> is shifted by 1.',
      question: 'Result?',
      correct: '<code>&langle;' + shifted.join(',') + '&rangle;</code>',
      distractors: [
        '<code>&langle;' + [s[n-1]].concat(s.slice(0,n-1)).join(',') + '&rangle;</code> (right shift)',
        '<code>&langle;' + s.slice(0,n-1).join(',') + '&rangle;</code> (truncated)',
        '<code>&langle;&rangle;</code>'
      ]
    };
  };

  window.conceptBank['Retrieve Calculation'] = function() {
    var n = pick([4,5,6,8]);
    var bot = randInt(2, n);
    var sz = randInt(1, n);
    var arr = [];
    for (var i = 1; i <= n; i++) arr.push(i * 10);
    var shifted = arr.slice(bot - 1).concat(arr.slice(0, bot - 1));
    var result = shifted.slice(0, sz);
    return {
      scenario: 'A ' + n + '-slot ring: <code>array = &langle;' + arr.join(',') + '&rangle;</code>, <code>bot = ' + bot + '</code>, <code>size = ' + sz + '</code>.',
      question: 'Abstract buffer?',
      correct: '<code>&langle;' + result.join(',') + '&rangle;</code>',
      distractors: [
        '<code>&langle;' + arr.slice(0, sz).join(',') + '&rangle;</code>',
        '<code>&langle;' + arr.slice(1, sz + 1).join(',') + '&rangle;</code>',
        '<code>&langle;&rangle;</code>'
      ]
    };
  };

  window.conceptBank['Retrieve Formula'] = function() {
    return {
      scenario: 'The retrieve formula.',
      question: 'Which?',
      correct: '<code>buffer = (1..size) &#9665; ((bot &minus; 1) &laquo; array)</code>',
      distractors: ['<code>buffer = array</code>','<code>buffer = &langle;&rangle;</code>','<code>buffer = array &frown; &langle;bot&rangle;</code>']
    };
  };

  window.conceptBank['Retrieve Type'] = function() {
    return {
      scenario: 'The retrieve relation is:',
      question: 'What kind?',
      correct: 'A total surjective function from concrete to abstract.',
      distractors: ['A partial injection.','A bijection.','An arbitrary relation.']
    };
  };

  window.conceptBank['Identity Case'] = function() {
    var n = pick([4,5,6,8]);
    return {
      scenario: 'A ' + n + '-slot ring has <code>bot = 1, size = ' + n + '</code>.',
      question: 'Retrieve simplifies to:',
      correct: '<code>buffer = array</code> (shift 0, take all).',
      distractors: ['<code>buffer = &langle;&rangle;</code>','<code>buffer = tail array</code>','<code>buffer = head array</code>']
    };
  };

  window.conceptBank['Domain Restriction'] = function() {
    return {
      scenario: '<code>(1..n) &#9665; s</code> keeps:',
      question: 'Which entries?',
      correct: 'Entries with index in <code>1..n</code> (the first <code>n</code>).',
      distractors: ['Entries with value in <code>1..n</code>.','All entries.','No entries.']
    };
  };

  window.conceptBank['Empty Retrieve'] = function() {
    var n = pick([5,6,7,8]);
    var bot = randInt(1, n);
    return {
      scenario: 'A ' + n + '-slot ring has <code>bot = ' + bot + ', size = 0</code>.',
      question: 'Retrieve?',
      correct: '<code>&langle;&rangle;</code> &mdash; empty buffer.',
      distractors: ['<code>&langle;p' + bot + '&rangle;</code>','<code>array</code>','<code>&langle;p' + bot + ',...&rangle;</code>']
    };
  };

  window.conceptBank['Length Identity'] = function() {
    return {
      scenario: 'The key identity in the derivation.',
      question: 'Which?',
      correct: '<code>#((1..size) &#9665; ((bot &minus; 1) &laquo; array)) = size</code>',
      distractors: ['<code>#array = 0</code>','<code>#buffer = max_size</code>','<code>size = 0</code>']
    };
  };

  window.conceptBank['ArrayIn\u2080 Effect'] = function() {
    return {
      scenario: 'Concrete insert <code>ArrayIn&#8320;</code> effect.',
      question: 'What changes?',
      correct: '<code>size&prime; = size+1, bot&prime; = bot, top&prime; = (top mod max_size)+1, array&prime; = array &oplus; {top&prime; &#8614; x?}</code>',
      distractors: ['<code>bot&prime; = bot+1</code>','All reset.','<code>size&prime; = 0</code>']
    };
  };

  window.conceptBank['Override Semantics'] = function() {
    return {
      scenario: '<code>&oplus;</code> (override) semantics.',
      question: 'Which wins?',
      correct: 'Later mappings win at the same key.',
      distractors: ['Earlier wins.','Both kept.','Both deleted.']
    };
  };

  window.conceptBank['ArrayOut\u2080 Effect'] = function() {
    return {
      scenario: 'Concrete extract <code>ArrayOut&#8320;</code> effect.',
      question: 'What changes?',
      correct: '<code>size&prime; = size &minus; 1, bot&prime; = (bot mod max_size)+1, array&prime; = array, x! = array bot</code>',
      distractors: ['<code>top&prime; = top+1</code>','<code>array&prime; = &langle;&rangle;</code>','<code>size&prime; = size+1</code>']
    };
  };

  window.conceptBank['Concrete Error Schemas'] = function() {
    return {
      scenario: 'Concrete error schemas simplify to:',
      question: 'Which?',
      correct: '<code>ArrayInError: size = max_size</code>; <code>ArrayOutError: size = 0</code>.',
      distractors: ['Both use <code>bot = 0</code>.','Neither exists.','They use <code>array = &langle;&rangle;</code>.']
    };
  };

  window.conceptBank['Wrapped Retrieve'] = function() {
    var n = pick([3,4,5,6]);
    var letters = ['x','y','z','a','b','c'];
    var arr = letters.slice(0, n);
    var bot = randInt(2, n);
    var sz = randInt(1, n);
    var shifted = arr.slice(bot - 1).concat(arr.slice(0, bot - 1));
    var result = shifted.slice(0, sz);
    return {
      scenario: 'A ' + n + '-slot ring <code>&langle;' + arr.join(',') + '&rangle;</code>, <code>bot = ' + bot + ', size = ' + sz + '</code>.',
      question: 'Retrieve?',
      correct: '<code>&langle;' + result.join(',') + '&rangle;</code>',
      distractors: [
        '<code>&langle;' + arr.slice(0, sz).join(',') + '&rangle;</code>',
        '<code>&langle;' + arr.reverse().slice(0, sz).join(',') + '&rangle;</code>',
        '<code>&langle;&rangle;</code>'
      ]
    };
  };

  window.conceptBank['Restriction Size Property'] = function() {
    return {
      scenario: 'The property used in the derivation.',
      question: 'Which?',
      correct: '<code>#(A &#9665; R) = #(A &cap; dom R)</code>',
      distractors: ['<code>#(A &#9665; R) = #A + #R</code>','<code>#(A &#9665; R) = 0</code>','<code>#(A &#9665; R) = max_size</code>']
    };
  };

  window.conceptBank['Full Ring Retrieve'] = function() {
    var n = pick([3,4,5]);
    var letters = ['a','b','c','d','e'];
    var arr = letters.slice(0, n);
    var bot = randInt(2, n);
    var shifted = arr.slice(bot - 1).concat(arr.slice(0, bot - 1));
    return {
      scenario: 'A ' + n + '-slot ring <code>&langle;' + arr.join(',') + '&rangle;</code>, <code>bot = ' + bot + ', size = ' + n + '</code>.',
      question: 'Retrieve?',
      correct: '<code>&langle;' + shifted.join(',') + '&rangle;</code>',
      distractors: [
        '<code>&langle;' + arr.join(',') + '&rangle;</code>',
        '<code>&langle;' + arr.slice(1).concat([arr[0]]).join(',') + '&rangle;</code>',
        '<code>&langle;' + arr.reverse().join(',') + '&rangle;</code>'
      ]
    };
  };

  window.conceptBank['Calculation Advantage'] = function() {
    return {
      scenario: 'Why calculation instead of guessing concrete ops?',
      question: 'Why?',
      correct: 'Derives correct concrete ops from abstract + retrieve &mdash; guaranteed correct.',
      distractors: ['Faster to write.','Gives arbitrary results.','Historical tradition.']
    };
  };

  window.conceptBank['Wrapped Retrieve 2'] = function() {
    return window.conceptBank['Wrapped Retrieve']();
  };

  window.conceptBank['Maplet Insert'] = function() {
    return {
      scenario: 'The maplet <code>{top&prime; &#8614; x?}</code> inserts:',
      question: 'What?',
      correct: 'Value <code>x?</code> at index <code>top&prime;</code>.',
      distractors: ['Value at index 1.','Nothing.','<code>max_size</code> values.']
    };
  };

  window.conceptBank['Shift Axiom 1'] = function() {
    return {
      scenario: '<code>1 &laquo; (&langle;x&rangle; &frown; s)</code> equals:',
      question: 'What?',
      correct: '<code>s &frown; &langle;x&rangle;</code> &mdash; head wraps to tail.',
      distractors: ['<code>&langle;x&rangle;</code>','<code>&langle;&rangle;</code>','<code>s</code>']
    };
  };

  window.conceptBank['ArrayInError Simplified'] = function() {
    return {
      scenario: '<code>ArrayInError</code> simplifies to:',
      question: 'What?',
      correct: '<code>size = max_size &and; &Xi;Array &and; report! = full</code>',
      distractors: ['<code>size = 0</code>','<code>report! = ok</code>','<code>bot&prime; = bot+1</code>']
    };
  };

  window.conceptBank['Output on Extract'] = function() {
    var r = pick(rings);
    return {
      scenario: 'A ' + r.slots + '-slot ring. On extract, <code>array(bot)</code> is:',
      question: 'What?',
      correct: 'The output <code>x!</code> &mdash; the first live value.',
      distractors: ['The last live value.','Nothing.','The capacity.']
    };
  };

  window.conceptBank['ArrayOutError Simplified'] = function() {
    return {
      scenario: '<code>ArrayOutError</code> simplifies to:',
      question: 'What?',
      correct: '<code>size = 0 &and; &Xi;Array &and; report! = empty</code>',
      distractors: ['<code>size = max_size</code>','<code>report! = ok</code>','<code>bot&prime; = 0</code>']
    };
  };

  window.conceptBank['Wrapped Extract'] = function() {
    var n = pick([5,6,7,8]);
    var bot = n;
    var letters = 'ABCDEFGH'.split('');
    var val = letters[bot - 1];
    var newBot = 1;
    return {
      scenario: 'A ' + n + '-slot ring, <code>bot = ' + bot + ', size = 2</code>. After extract:',
      question: 'What happens?',
      correct: '<code>x! = ' + val + ', bot&prime; = ' + newBot + ', size&prime; = 1</code>.',
      distractors: [
        '<code>x! = A, bot&prime; = ' + (n+1) + '</code>',
        '<code>x! = ' + val + ', bot&prime; = ' + bot + '</code> (no change)',
        '<code>x! = B</code>'
      ]
    };
  };

  /* ====== 22.4 Implementation ====== */

  window.conceptBank['Refinement Calculus Purpose'] = function() {
    return {
      scenario: 'Refinement calculus transforms:',
      question: 'What?',
      correct: 'Specification statements into executable code via monotone laws.',
      distractors: ['Sets into relations.','Types into values.','Nothing.']
    };
  };

  window.conceptBank['Global Declaration'] = function() {
    return {
      scenario: 'The global declaration of <code>ibuffer</code>.',
      question: 'Which?',
      correct: '<code>ibuffer : array [1..max_size] of X</code>',
      distractors: ['<code>ibuffer : seq X</code>','<code>ibuffer : &Popf; X</code>','<code>ibuffer : X</code>']
    };
  };

  window.conceptBank['Conditional Introduction'] = function() {
    var q = pick(queues);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> spec must split on <code>size</code>.',
      question: 'Which refinement step?',
      correct: 'Conditional introduction into <code>if ... &#9633; ... fi</code>.',
      distractors: ['Assignment introduction.','Skip.','Sequential composition.']
    };
  };

  window.conceptBank['Assignment Introduction'] = function() {
    return {
      scenario: 'Success branch has a fully determined postcondition.',
      question: 'Which law converts to code?',
      correct: 'Assignment introduction &mdash; postcondition is fully determined.',
      distractors: ['Conditional introduction.','Weaken precondition.','Skip.']
    };
  };

  window.conceptBank['Insert Success Body'] = function() {
    return {
      scenario: 'The insert success branch assigns:',
      question: 'Which lines?',
      correct: '<code>size := size+1; top := (top mod max_size)+1; ibuffer[top] := x; report! := ok</code>',
      distractors: ['<code>size := 0; report! := full</code>','<code>bot := bot+1; report! := empty</code>','<code>ibuffer := &langle;&rangle;</code>']
    };
  };

  window.conceptBank['Extract Success Body'] = function() {
    return {
      scenario: 'The extract success branch assigns:',
      question: 'Which lines?',
      correct: '<code>size := size &minus; 1; bot := (bot mod max_size)+1; report! := ok</code>',
      distractors: ['<code>size := size+1</code>','<code>top := 0</code>','<code>report! := full</code>']
    };
  };

  window.conceptBank['Procedure Header'] = function() {
    return {
      scenario: 'A procedure with val and res parameters.',
      question: 'Which header?',
      correct: '<code>procedure BufferIn(val x : X; res report! : Report)</code>',
      distractors: ['<code>procedure BufferIn()</code>','<code>function Buffer(x)</code>','<code>BufferIn : X</code>']
    };
  };

  window.conceptBank['Error Branch Assignment'] = function() {
    var which = pick(['full','empty']);
    return {
      scenario: 'Error branch when buffer is ' + which + '.',
      question: 'Which assignment?',
      correct: '<code>report! := ' + which + '</code> &mdash; single line, no state change.',
      distractors: ['<code>size := size + 1</code>','<code>ibuffer := &langle;&rangle;</code>','<code>bot := top</code>']
    };
  };

  window.conceptBank['Strengthen Postcondition'] = function() {
    return {
      scenario: '"Strengthen postcondition" means:',
      question: 'What?',
      correct: 'Replace post with a stronger predicate the spec still satisfies.',
      distractors: ['Weaken it.','Delete it.','Negate it.']
    };
  };

  window.conceptBank['Refinement Order'] = function() {
    return {
      scenario: 'Refinement steps follow:',
      question: 'Which order?',
      correct: 'Spec &rarr; Conditional &rarr; Assignment &rarr; Code.',
      distractors: ['Code &rarr; Spec.','Random.','Assignment only.']
    };
  };

  window.conceptBank['ResetBuffer'] = function() {
    return {
      scenario: '<code>ResetBuffer</code> uses:',
      question: 'What construct?',
      correct: 'A single multi-variable assignment &mdash; no conditional.',
      distractors: ['A loop.','Recursion.','Nothing.']
    };
  };

  window.conceptBank['Direct Assignment'] = function() {
    return {
      scenario: 'A fully determined, total operation.',
      question: 'Which law applies?',
      correct: 'Assignment introduction directly &mdash; no guard needed.',
      distractors: ['Conditional introduction.','Weaken precondition.','Skip.']
    };
  };

  window.conceptBank['Initialisation'] = function() {
    return {
      scenario: '<code>initially bot, top, size := 1, max_size, 0</code>.',
      question: 'Meaning?',
      correct: 'Start empty: bot=1, top wraps, size=0.',
      distractors: ['Start full.','Arbitrary.','Invalid.']
    };
  };

  window.conceptBank['Val and Res Parameters'] = function() {
    return {
      scenario: 'Procedures name both val and res.',
      question: 'Why?',
      correct: 'Inputs passed by value; reports passed out by result.',
      distractors: ['Only inputs matter.','Only outputs matter.','Neither needed.']
    };
  };

  window.conceptBank['Guard Protection'] = function() {
    return {
      scenario: 'Guard <code>size &ne; 0</code> in BufferOut protects:',
      question: 'What?',
      correct: 'The read of <code>ibuffer[bot]</code> from an empty state.',
      distractors: ['Type safety only.','Compilation.','Nothing.']
    };
  };

  window.conceptBank['ibuffer[top] Assignment'] = function() {
    return {
      scenario: '<code>ibuffer[top] := x</code> is introduced by:',
      question: 'Which law?',
      correct: 'Assignment introduction (fully determined component).',
      distractors: ['Sequential composition.','Iteration.','Recursion.']
    };
  };

  window.conceptBank['Procedural Encapsulation'] = function() {
    return {
      scenario: 'Encapsulation as a procedure:',
      question: 'What does it do?',
      correct: 'Names the block with parameters for reuse.',
      distractors: ['Inlines everything.','Removes the code.','Nothing.']
    };
  };

  window.conceptBank['Success Report Line'] = function() {
    return {
      scenario: 'Code ends with <code>report! := ok</code>.',
      question: 'This arises from:',
      correct: 'The <code>Success</code> schema\'s constraint <code>report! = ok</code>.',
      distractors: ['The invariant.','Conditional introduction.','Nothing.']
    };
  };

  window.conceptBank['Refinement Symbol'] = function() {
    return {
      scenario: 'The refinement symbol <code>&sqsube;</code> reads:',
      question: 'How?',
      correct: '"is refined by" &mdash; RHS is an acceptable implementation.',
      distractors: ['"is a subset of".', '"implies".', '"equals".']
    };
  };

  window.conceptBank['Full Refusal Code'] = function() {
    return {
      scenario: 'Full refusal is a single assignment.',
      question: 'Which?',
      correct: '<code>report! := full</code>',
      distractors: ['<code>size := 0</code>','<code>ibuffer := &langle;&rangle;</code>','<code>top := bot</code>']
    };
  };

  window.conceptBank['Top Advance Formula'] = function() {
    return {
      scenario: '<code>top := (top mod max_size) + 1</code> implements:',
      question: 'What?',
      correct: 'Cyclic advance of the top pointer.',
      distractors: ['Reset to 0.','Capacity query.','Error handling.']
    };
  };

  window.conceptBank['Module as Collection'] = function() {
    return {
      scenario: 'The bounded buffer module is:',
      question: 'What?',
      correct: 'A collection of procedures sharing globals (<code>ibuffer, bot, top, size</code>).',
      distractors: ['A single function.','A tree.','Nothing.']
    };
  };

  window.conceptBank['BufferOut Guard'] = function() {
    return {
      scenario: 'BufferOut procedure body begins with:',
      question: 'What?',
      correct: '<code>if size &ne; 0 &rarr; ... &#9633; size = 0 &rarr; report! := empty fi</code>',
      distractors: ['<code>skip</code>','<code>size := 0</code>','<code>loop</code>']
    };
  };

  window.conceptBank['Procedural Abstraction'] = function() {
    return {
      scenario: 'Enclosing calculation in a procedure.',
      question: 'Which law?',
      correct: 'Procedural abstraction / encapsulation.',
      distractors: ['Sequential composition only.','Skip.','None.']
    };
  };

  window.conceptBank['Correctness Foundation'] = function() {
    return {
      scenario: 'Code correctness rests on:',
      question: 'What?',
      correct: 'Monotonicity of the refinement laws composed.',
      distractors: ['Testing only.','Luck.','The compiler.']
    };
  };

  /* ====== 22.5 Executable Code ====== */

  window.conceptBank['Target Language'] = function() {
    return {
      scenario: 'Chapter 22 target language.',
      question: 'Which?',
      correct: 'Modula-2.',
      distractors: ['Python.','Haskell.','C++.']
    };
  };

  window.conceptBank['EXPORT List'] = function() {
    return {
      scenario: 'MODULE Buffer EXPORT list.',
      question: 'Includes:',
      correct: '<code>max_size, ReportType, ResetBuffer, BufferIn, BufferOut</code>',
      distractors: ['Only BufferIn.','None.','The global variables.']
    };
  };

  window.conceptBank['Init Block'] = function() {
    var n = pick([32,50,100,256]);
    return {
      scenario: 'A ' + n + '-slot module is loaded.',
      question: 'Which init block leaves the buffer empty?',
      correct: '<code>BEGIN bot := 1; top := max_size; size := 0 END Buffer.</code>',
      distractors: ['<code>BEGIN size := max_size END</code>','<code>BEGIN top := 0 END</code>','<code>BEGIN bot := max_size END</code>']
    };
  };

  window.conceptBank['BufferIn Guard'] = function() {
    return {
      scenario: 'BufferIn body uses which guard?',
      question: 'Which?',
      correct: '<code>IF size &lt; max_size THEN ... ELSE report := Full END</code>',
      distractors: ['<code>IF size = 0 THEN ...</code>','<code>WHILE TRUE DO ...</code>','<code>REPEAT ... UNTIL FALSE</code>']
    };
  };

  window.conceptBank['ibuffer Type'] = function() {
    return {
      scenario: 'Type of <code>ibuffer</code> in code.',
      question: 'Which?',
      correct: '<code>ARRAY [1..max_size] OF X</code>',
      distractors: ['<code>SET OF X</code>','<code>POINTER TO X</code>','<code>RECORD ... END</code>']
    };
  };

  window.conceptBank['VAR Parameter'] = function() {
    return {
      scenario: '<code>report</code> parameter mode.',
      question: 'Which?',
      correct: '<code>VAR</code> &mdash; pass-by-reference to return status.',
      distractors: ['Pass-by-value.','Constant.','No mode.']
    };
  };

  window.conceptBank['ReportType'] = function() {
    return {
      scenario: '<code>ReportType = (OK, Full, Empty)</code> is:',
      question: 'What kind?',
      correct: 'An enumeration type mapping to Z\'s <code>Report ::= ok | full | empty</code>.',
      distractors: ['A record type.','An array type.','A pointer type.']
    };
  };

  window.conceptBank['Init Block Role'] = function() {
    return {
      scenario: 'The "init block" role.',
      question: 'Played by:',
      correct: 'The module body that runs on first import.',
      distractors: ['Each call of BufferIn.','A main program only.','Nothing.']
    };
  };

  window.conceptBank['Client Access'] = function() {
    return {
      scenario: 'A client importing the module can use:',
      question: 'What?',
      correct: 'Only exported names (ops + types + constants).',
      distractors: ['All globals directly.','Private internals.','Nothing.']
    };
  };

  window.conceptBank['Empty Dispatch'] = function() {
    var q = pick(queues);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> is empty. BufferOut called.',
      question: 'Which branch?',
      correct: 'ELSE branch &mdash; <code>report := Empty</code>.',
      distractors: ['BufferIn ELSE &mdash; Full.','ResetBuffer.','None.']
    };
  };

  window.conceptBank['MOD Expression'] = function() {
    return {
      scenario: '<code>(top MOD max_size) + 1</code> computes:',
      question: 'What?',
      correct: 'The next 1-based index, wrapping at max_size.',
      distractors: ['The previous index.','Always 0.','Always max_size.']
    };
  };

  window.conceptBank['Insert Success'] = function() {
    var q = pick(queues);
    return {
      scenario: 'A <span class="key">' + q.name + '</span> inserts an item. On success:',
      question: 'What changes?',
      correct: '<code>size</code> increments, <code>top</code> advances, <code>ibuffer[top] := x</code>, <code>report := OK</code>.',
      distractors: ['Only report := OK.','Nothing changes.','size := 0.']
    };
  };

  window.conceptBank['Subrange Safety'] = function() {
    return {
      scenario: 'Why declare <code>bot, top : 1..max_size</code>?',
      question: 'Why?',
      correct: 'Compile-time bounds checking mirrors the Z invariant.',
      distractors: ['For speed only.','Historical.','No reason.']
    };
  };

  window.conceptBank['ResetBuffer State'] = function() {
    var val = pick(['"unlock"','"start"','"reset"','"init"']);
    return {
      scenario: '<code>ResetBuffer(' + val + ')</code> leaves:',
      question: 'What state?',
      correct: '<code>bot = top = size = 1, ibuffer[1] = ' + val + '</code>.',
      distractors: ['<code>size = 0</code>.','<code>size = max_size</code>.','Invalid.']
    };
  };

  window.conceptBank['Module Separation'] = function() {
    return {
      scenario: 'Modula-2 modules separate:',
      question: 'What?',
      correct: 'Interface (DEFINITION) from body (IMPLEMENTATION).',
      distractors: ['Classes from traits.','Types from terms.','Nothing.']
    };
  };

  window.conceptBank['Empty BufferOut'] = function() {
    return {
      scenario: 'BufferOut called on empty buffer. <code>report</code> becomes:',
      question: 'What?',
      correct: '<code>Empty</code> &mdash; ELSE branch.',
      distractors: ['<code>OK</code>.','<code>Full</code>.','Uninitialised.']
    };
  };

  window.conceptBank['END Buffer'] = function() {
    return {
      scenario: '<code>END Buffer.</code> marks:',
      question: 'What?',
      correct: 'The close of the module, matching its name.',
      distractors: ['A comment.','A return statement.','Nothing.']
    };
  };

  window.conceptBank['Init Corresponds To'] = function() {
    return {
      scenario: 'Module body <code>bot := 1; top := max_size; size := 0</code> corresponds to:',
      question: 'Which abstract op?',
      correct: 'The abstract <code>BufferInit</code> operation.',
      distractors: ['A successful insert.','An error.','A loop.']
    };
  };

  window.conceptBank['CONST'] = function() {
    var n = pick([32,50,100,256,1000]);
    return {
      scenario: '<code>CONST max_size = ' + n + ';</code> says:',
      question: 'What?',
      correct: 'Capacity is a compile-time constant (' + n + ') for this instance.',
      distractors: ['Capacity is 0.','Unbounded.','Changes at runtime.']
    };
  };

  window.conceptBank['Typed Report'] = function() {
    return {
      scenario: '<code>VAR report : ReportType</code> declares:',
      question: 'What?',
      correct: 'An output variable of enumeration type.',
      distractors: ['An integer.','A pointer.','Nothing.']
    };
  };

  window.conceptBank['BufferIn ELSE'] = function() {
    return {
      scenario: 'BufferIn ELSE branch runs when:',
      question: 'When?',
      correct: '<code>size = max_size</code> &mdash; buffer full.',
      distractors: ['<code>size = 0</code>.','Always.','Never.']
    };
  };

  window.conceptBank['Information Hiding'] = function() {
    return {
      scenario: 'A module exposing only the API.',
      question: 'Which principle?',
      correct: 'Information hiding via the EXPORT list.',
      distractors: ['Early binding.','Late binding.','None.']
    };
  };

  window.conceptBank['Code Correctness'] = function() {
    return {
      scenario: 'Refined Modula-2 code is correct because:',
      question: 'Why?',
      correct: 'Each refinement step is monotonic and the retrieve is functional.',
      distractors: ['Tested on one case.','It compiles.','By luck.']
    };
  };

  window.conceptBank['Instance Sizing'] = function() {
    var n = pick([32,64,128,256,512]);
    return {
      scenario: 'A device needs capacity ' + n + '. <code>N</code> becomes:',
      question: 'What?',
      correct: '<code>CONST max_size = ' + n + ';</code>',
      distractors: ['<code>max_size := ' + n + '</code> at runtime.','<code>N</code> is free.','Undefined.']
    };
  };

  window.conceptBank['End-to-End Pipeline'] = function() {
    return {
      scenario: 'The bounded-buffer module demonstrates:',
      question: 'What pipeline?',
      correct: 'Z specification &rarr; design &rarr; calculation &rarr; refinement &rarr; executable code.',
      distractors: ['Pure testing.','Ad-hoc coding.','Reverse engineering.']
    };
  };

})();
