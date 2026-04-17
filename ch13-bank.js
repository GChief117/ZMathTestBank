(function buildCh13Bank() {
  if (!window.conceptBank) window.conceptBank = {};

  /* ====== helpers ====== */
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ====== pools ====== */
  var locals = [
    {name:'Account',global:'Bank',id:'AccountID',map:'accounts',op:'Deposit',field:'balance'},
    {name:'Book',global:'Library',id:'BookID',map:'catalogue',op:'RenewBook',field:'dueDate'},
    {name:'Player',global:'Game',id:'PlayerID',map:'players',op:'MovePlayer',field:'position'},
    {name:'Sensor',global:'Grid',id:'SensorID',map:'sensors',op:'Recalibrate',field:'threshold'},
    {name:'Product',global:'Inventory',id:'ProductID',map:'stock',op:'UpdatePrice',field:'price'},
    {name:'Room',global:'Hotel',id:'RoomID',map:'rooms',op:'CleanRoom',field:'status'},
    {name:'File',global:'FileSystem',id:'FileID',map:'files',op:'EditFile',field:'content'},
    {name:'Patient',global:'Hospital',id:'PatientID',map:'records',op:'UpdateChart',field:'notes'},
    {name:'Car',global:'Garage',id:'BayID',map:'bays',op:'WashCar',field:'clean'},
    {name:'Ticket',global:'TicketSystem',id:'TicketID',map:'tickets',op:'CloseTicket',field:'status'}
  ];

  var errScenarios = [
    {desc:'performance not yet booking',err:'NotYetBooking',resp:'not_yet_booking',pre:'p? &isin; announced \\ dom booking'},
    {desc:'seat already sold',err:'SeatTaken',resp:'seat_taken',pre:'s? &isin; dom booking p?.sold'},
    {desc:'flight cancelled',err:'FlightCancelled',resp:'cancelled',pre:'f? &notin; dom manifest'},
    {desc:'room not ready',err:'RoomNotReady',resp:'not_ready',pre:'id? &isin; dom rooms &and; (rooms id?).ready = false'},
    {desc:'item out of stock',err:'OutOfStock',resp:'out_of_stock',pre:'id? &isin; dom stock &and; (stock id?).qty = 0'},
    {desc:'user not found',err:'NoSuchUser',resp:'no_such_user',pre:'id? &notin; dom users'},
    {desc:'book unavailable',err:'BookUnavailable',resp:'unavailable',pre:'id? &isin; dom catalogue &and; (catalogue id?).checkedOut = true'}
  ];

  var freeScenarios = [
    {name:'parking garage',map:'bays : BayID &#x21F8; Car',reason:'no cross-bay invariant'},
    {name:'data array',map:'array : seq Data',reason:'no ordering constraint on elements'},
    {name:'inventory',map:'stock : ProductID &#x21F8; Product',reason:'no cross-product constraint'},
    {name:'sensor grid',map:'sensors : seq Sensor',reason:'sensors are independent'},
    {name:'mailbox system',map:'mailbox : Address &#x21FB; MailBox',reason:'no cross-mailbox constraint'},
    {name:'vending network',map:'machines : MachineID &#x21F8; Stock',reason:'machines are independent'}
  ];

  var constrainedScenarios = [
    {name:'priority stack',map:'stack : seq PriData',inv:'priority ordering: head &ge; rest',reason:'changing priority can break order'},
    {name:'sorted list',map:'items : seq Record',inv:'keys in ascending order',reason:'changing a key can break sorting'},
    {name:'capacity queue',map:'queue : seq Job',inv:'#queue &le; maxSize',reason:'job size change could exceed capacity'},
    {name:'ranked leaderboard',map:'board : seq Entry',inv:'scores in descending order',reason:'changing a score can break ranking'},
    {name:'load-balanced cluster',map:'nodes : seq Node',inv:'load difference &le; threshold',reason:'local load change could unbalance'}
  ];

  /* ====== 13.1 Factoring Operations ====== */

  window.conceptBank['Factoring Recall'] = function() {
    var L = pick(locals);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> system factors its <span class="key">' + L.op + '</span> operation.',
      question: 'Factoring means splitting a global op into:',
      correct: '<code>A local operation on &Delta;' + L.name + ' + a promotion schema linking &Delta;' + L.global + ' to &Delta;' + L.name + '</code>',
      distractors: [
        '<code>Two global operations on &Delta;' + L.global + '</code>',
        '<code>A free type + a sequence</code>',
        '<code>Only a local operation (no frame needed)</code>'
      ]
    };
  };

  window.conceptBank['Frame Purpose'] = function() {
    var L = pick(locals);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> has <code>' + L.map + ' : ' + L.id + ' &#x21F8; ' + L.name + '</code>.',
      question: 'The promotion schema\'s main job is:',
      correct: '<code>Link &Delta;' + L.global + ' to &Delta;' + L.name + ' via id? and frame non-target entries</code>',
      distractors: [
        '<code>Define a new type ' + L.name + '</code>',
        '<code>Hide all variables of ' + L.global + '</code>',
        '<code>Rename ' + L.name + ' components</code>'
      ]
    };
  };

  window.conceptBank['Game Score Factoring'] = function() {
    var L = pick(locals);
    var field = L.field;
    var newVal = pick(['new?','val?','x?']);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> factors <code>' + L.op + '</code>. The local op sets <span class="key">' + field + '&prime; = ' + newVal + '</span>.',
      question: 'Which is the correct local op?',
      correct: '<code>&Delta;' + L.name + '; ' + newVal + '; ' + field + '&prime; = ' + newVal + '</code>',
      distractors: [
        '<code>&Delta;' + L.global + '; ' + L.map + '&prime; = ' + L.map + ' &oplus; {id? &#8614; ' + newVal + '}</code>',
        '<code>&Xi;' + L.name + '; ' + field + '&prime; = ' + field + '</code>',
        '<code>&Delta;' + L.name + '; ' + field + '&prime; = &empty;</code>'
      ]
    };
  };

  window.conceptBank['Mail System Factoring'] = function() {
    var items = [{op:'append message',code:'mail&prime; = mail &#x2040; &langle;m?&rangle;',wrong1:'mail&prime; = &langle;m?&rangle; &#x2040; mail',wrong2:'mail&prime; = mail',wrong3:'mail&prime; = {m?}'},
      {op:'add note',code:'notes&prime; = notes &#x2040; &langle;e?&rangle;',wrong1:'notes&prime; = &langle;e?&rangle; &#x2040; notes',wrong2:'notes&prime; = notes',wrong3:'notes&prime; = {e?}'},
      {op:'upload file',code:'files&prime; = files &#x2040; &langle;f?&rangle;',wrong1:'files&prime; = &langle;f?&rangle; &#x2040; files',wrong2:'files&prime; = files',wrong3:'files&prime; = {f?}'}];
    var it = pick(items);
    return {
      scenario: 'A system needs to <span class="key">' + it.op + '</span> to a sequence.',
      question: 'Which line correctly updates the sequence?',
      correct: '<code>' + it.code + '</code>',
      distractors: [
        '<code>' + it.wrong1 + '</code> (wrong order)',
        '<code>' + it.wrong2 + '</code> (no change)',
        '<code>' + it.wrong3 + '</code> (replaces all)'
      ]
    };
  };

  window.conceptBank['Array Factoring'] = function() {
    var L = pick(locals);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> sequences <code>' + L.name + '</code> elements. The promotion for index? must assert:',
      question: 'Which predicate set is correct?',
      correct: '<code>index? &isin; dom ' + L.map + ' &and; ' + L.map + ' index? = &theta;' + L.name + ' &and; ' + L.map + '&prime; index? = &theta;' + L.name + '&prime;</code>',
      distractors: [
        '<code>index? &notin; dom ' + L.map + '</code>',
        '<code>' + L.map + '&prime; = ' + L.map + '</code> (no change)',
        '<code>' + L.map + '&prime; = &langle;&rangle;</code>'
      ]
    };
  };

  window.conceptBank['Reconstitution Formula'] = function() {
    var L = pick(locals);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> factors <code>' + L.op + '</code>. Which formula reconstitutes the global op?',
      question: 'Select the promotion formula:',
      correct: '<code>&exist; &Delta;' + L.name + ' &bull; ' + L.op + 'Local &and; Promote</code>',
      distractors: [
        '<code>' + L.op + 'Local &or; Promote</code> (disjunction, not conjunction)',
        '<code>' + L.op + 'Local</code> alone (missing frame)',
        '<code>Promote</code> alone (missing effect)'
      ]
    };
  };

  window.conceptBank['Separation of Concerns'] = function() {
    var L = pick(locals);
    var newOp = pick(['Delete','Archive','Reset','Validate','Export']);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> already has a Promote schema. The team adds "' + newOp + '" on <code>' + L.name + '</code>.',
      question: 'What must be written?',
      correct: 'Only a new local operation <code>' + newOp + 'Local</code> on <code>&Delta;' + L.name + '</code>.',
      distractors: [
        'A new Promote schema from scratch.',
        'A complete new global operation with all frame conditions.',
        'Nothing &mdash; it works automatically.'
      ]
    };
  };

  window.conceptBank['Promotion Schema Override'] = function() {
    var L = pick(locals);
    return {
      scenario: 'The <span class="key">' + L.global + '</span> Promote schema updates the global map for <code>' + L.name + '</code> at index <code>id?</code>.',
      question: 'Which expression writes the new local state back?',
      correct: '<code>' + L.map + '&prime; = ' + L.map + ' &oplus; {id? &#8614; &theta;' + L.name + '&prime;}</code>',
      distractors: [
        '<code>' + L.map + '&prime; = ' + L.map + '</code> (no update)',
        '<code>' + L.map + '&prime; = {id? &#8614; &theta;' + L.name + '&prime;}</code> (loses all other entries)',
        '<code>' + L.map + '&prime; = ' + L.map + ' \\ {id?}</code> (removes entry)'
      ]
    };
  };

  window.conceptBank['Relational Index'] = function() {
    var rels = [
      {sys:'mail system',map:'address : User &harr; Address',what:'users to addresses'},
      {sys:'hospital',map:'patient : PatientID &harr; BedID',what:'patients to beds'},
      {sys:'university',map:'advises : StudentID &harr; AdvisorID',what:'students to advisors'}
    ];
    var r = pick(rels);
    return {
      scenario: 'The <span class="key">' + r.sys + '</span> maps <span class="key">' + r.what + '</span> via a relation.',
      question: 'A relational (not functional) index means:',
      correct: 'A user may have multiple associated entries, and an entry may belong to multiple users.',
      distractors: [
        'Each user has exactly one entry.',
        'Entries cannot be shared.',
        'The mapping is total.'
      ]
    };
  };

  window.conceptBank['Sequence Index'] = function() {
    var L = pick(locals);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> uses <code>' + L.map + ' : seq ' + L.name + '</code>.',
      question: 'The frame condition for non-target entries uses:',
      correct: '<code>{index?} &#x25C1; ' + L.map + ' = {index?} &#x25C1; ' + L.map + '&prime;</code>',
      distractors: [
        '<code>' + L.map + ' = ' + L.map + '&prime;</code> (no change at all)',
        '<code>dom ' + L.map + '&prime; = &empty;</code>',
        '<code>' + L.map + '&prime; = &langle;&rangle;</code>'
      ]
    };
  };

  window.conceptBank['Functional vs Relational Factoring'] = function() {
    var L = pick(locals);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> uses <code>' + L.map + ' : ' + L.id + ' &#x21F8; ' + L.name + '</code> (functional).',
      question: 'Compared to a relational index, the promotion schema is:',
      correct: 'Simpler &mdash; each ' + L.id + ' uniquely identifies one ' + L.name + '.',
      distractors: [
        'Identical to the relational case.',
        'More complex because functions are harder.',
        'Impossible &mdash; functions can\'t be used.'
      ]
    };
  };

  window.conceptBank['Theta Notation'] = function() {
    var L = pick(locals);
    return {
      scenario: 'In the <span class="key">' + L.global + '</span> Promote schema, <code>&theta;' + L.name + ' = ' + L.map + '(id?)</code>.',
      question: 'This means:',
      correct: 'The binding of <code>' + L.name + '</code>\'s components equals the value at index <code>id?</code> in the global map.',
      distractors: [
        'The global state is reset.',
        'A new schema is declared.',
        'The local state is deleted.'
      ]
    };
  };

  window.conceptBank['Multiple Local Ops'] = function() {
    var L = pick(locals);
    var ops = ['Renew','Reserve','Archive','Export'];
    var n = pick([2,3,4]);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> already has a Promote schema. The team adds ' + n + ' new operations on <code>' + L.name + '</code>.',
      question: 'How many new Promote schemas are needed?',
      correct: '<code>0</code> &mdash; reuse the existing Promote with each new local op.',
      distractors: [
        '<code>' + n + '</code> &mdash; one per new operation.',
        '<code>1</code> &mdash; a new combined schema.',
        '<code>' + (n+1) + '</code> &mdash; one per existing + new.'
      ]
    };
  };

  window.conceptBank['Existential Hiding'] = function() {
    var L = pick(locals);
    return {
      scenario: 'After conjoining <code>' + L.op + 'Local &and; Promote</code>, local state variables are hidden by:',
      question: 'Which quantification?',
      correct: '<code>&exist; &Delta;' + L.name + ' &bull; ...</code> &mdash; existential quantification.',
      distractors: [
        '<code>&forall; &Delta;' + L.name + ' &bull; ...</code> (universal; wrong quantifier).',
        'Schema negation.',
        'Schema composition.'
      ]
    };
  };

  window.conceptBank['Equivalent Global Op'] = function() {
    var L = pick(locals);
    return {
      scenario: 'The factored <span class="key">' + L.global + '</span> op <code>&exist; &Delta;' + L.name + ' &bull; ' + L.op + 'Local &and; Promote</code> equals the direct global op.',
      question: 'This demonstrates:',
      correct: 'Factored and direct specs are logically equivalent &mdash; factoring adds structure, not meaning.',
      distractors: [
        'Factoring changes the semantics.',
        'The direct version is always better.',
        'The factored version cannot be expanded.'
      ]
    };
  };

  window.conceptBank['MailBox Components'] = function() {
    var comps = [
      {name:'MailBox',unchanged:'last_read',changed1:'mail',changed2:'new_mail',reason:'receiving doesn\'t change when mail was last read'},
      {name:'Chart',unchanged:'patient_id',changed1:'notes',changed2:'last_update',reason:'updating notes doesn\'t change which patient'},
      {name:'Folder',unchanged:'owner',changed1:'files',changed2:'modified',reason:'uploading doesn\'t change folder ownership'}
    ];
    var c = pick(comps);
    return {
      scenario: 'The <span class="key">' + c.name + '</span> has components including <code>' + c.changed1 + '</code>, <code>' + c.changed2 + '</code>, and <code>' + c.unchanged + '</code>.',
      question: 'In the local receive/update op, which component is unchanged?',
      correct: '<code>' + c.unchanged + '&prime; = ' + c.unchanged + '</code> &mdash; ' + c.reason + '.',
      distractors: [
        '<code>' + c.changed1 + '</code> (it is updated).',
        '<code>' + c.changed2 + '</code> (it is updated).',
        'All three change.'
      ]
    };
  };

  window.conceptBank['Domain Membership'] = function() {
    var L = pick(locals);
    return {
      scenario: 'In the <span class="key">' + L.global + '</span> Promote schema, <code>id? &isin; dom ' + L.map + '</code> asserts:',
      question: 'What does this precondition mean?',
      correct: 'The target <code>id?</code> exists in the collection (has an entry in the map).',
      distractors: [
        'The target is not in the collection.',
        'The collection is empty.',
        'All elements are in the collection.'
      ]
    };
  };

  window.conceptBank['Address Output'] = function() {
    return {
      scenario: 'In <span class="key">ReceiveSystem</span>, the address <code>a!</code> is an output.',
      question: 'Why is the address an output?',
      correct: 'The system chooses which of the user\'s addresses receives the message and reports it.',
      distractors: [
        'The user provides the address as input.',
        'The address is always fixed.',
        'Outputs are not used in promotion.'
      ]
    };
  };

  window.conceptBank['Data Array Local Op'] = function() {
    var L = pick(locals);
    return {
      scenario: 'The local op <code>Assign' + L.name + '</code> has <code>&Delta;' + L.name + '; new? : Value</code>.',
      question: 'Its predicate is:',
      correct: '<code>' + L.field + '&prime; = new?</code>',
      distractors: [
        '<code>' + L.field + '&prime; = ' + L.field + '</code> (no change)',
        '<code>' + L.field + '&prime; &isin; dom ' + L.map + '</code> (type error)',
        '<code>' + L.map + '&prime; = ' + L.map + ' &oplus; {index? &#8614; new?}</code> (global, not local)'
      ]
    };
  };

  window.conceptBank['Why Factoring Helps'] = function() {
    var n = pick([8,10,12,15]);
    var L = pick(locals);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> has ' + n + ' different <code>' + L.name + '</code> operations.',
      question: 'With factoring:',
      correct: 'One Promote schema is shared; only ' + n + ' local ops are written.',
      distractors: [
        n + ' Promote schemas are still needed.',
        'Factoring doesn\'t help with multiple operations.',
        'The global state must be rewritten for each op.'
      ]
    };
  };

  window.conceptBank['Indexed Component Concept'] = function() {
    var L = pick(locals);
    return {
      scenario: 'In a <span class="key">' + L.global + '</span>, each <code>' + L.name + '</code> is an indexed component.',
      question: 'An indexed component is:',
      correct: 'A local state instance identified by a key within a global collection.',
      distractors: [
        'A global state without indices.',
        'A free type constructor.',
        'A schema operator.'
      ]
    };
  };

  window.conceptBank['Mail Promotion Address Unchanged'] = function() {
    var L = pick(locals);
    var frameField = pick(['announced','scheduled','offered','address']);
    return {
      scenario: 'A Promote schema includes <code>' + frameField + '&prime; = ' + frameField + '</code>.',
      question: 'This means:',
      correct: 'The reference set/relation <code>' + frameField + '</code> is part of the frame &mdash; unchanged by local ops.',
      distractors: [
        'The field is deleted.',
        'A new entry is created.',
        'The mapping becomes total.'
      ]
    };
  };

  window.conceptBank['Override Symbol'] = function() {
    var L = pick(locals);
    return {
      scenario: 'In the <span class="key">' + L.global + '</span> Promote, <code>' + L.map + '&prime; = ' + L.map + ' &oplus; {id? &#8614; &theta;' + L.name + '&prime;}</code>.',
      question: 'The symbol <code>&oplus;</code> means:',
      correct: 'Function override &mdash; replace the entry at <code>id?</code> while keeping all others.',
      distractors: [
        'Set union (adds without replacing).',
        'Domain restriction.',
        'Schema conjunction.'
      ]
    };
  };

  window.conceptBank['Local Op Isolation'] = function() {
    var L = pick(locals);
    return {
      scenario: 'The local op <code>' + L.op + '</code> on <code>&Delta;' + L.name + '</code>:',
      question: 'What does it know about?',
      correct: 'Nothing about the ' + L.global + ' &mdash; it only sees <code>&Delta;' + L.name + '</code>.',
      distractors: [
        'References the global map and index.',
        'Updates all ' + L.name + 's at once.',
        'Requires knowing the collection size.'
      ]
    };
  };

  window.conceptBank['Promotion Concept'] = function() {
    return {
      scenario: 'The term "promotion" in Z refers to:',
      question: 'What is promotion?',
      correct: 'Structuring a global op as a local op lifted through a promotion schema linking local and global state.',
      distractors: [
        'Renaming schema components.',
        'Hiding variables from a schema.',
        'Composing two independent schemas.'
      ]
    };
  };

  /* ====== 13.2 Promotion ====== */

  window.conceptBank['Promotion Formula'] = function() {
    var L = pick(locals);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> promotes <code>' + L.op + '</code>.',
      question: 'The standard promotion formula is:',
      correct: '<code>&exist; &Delta;' + L.name + ' &bull; Promote &and; ' + L.op + '</code>',
      distractors: [
        '<code>&forall; &Delta;' + L.name + ' &bull; Promote &or; ' + L.op + '</code>',
        '<code>Promote &or; ' + L.op + '</code>',
        '<code>' + L.op + '</code> alone'
      ]
    };
  };

  window.conceptBank['Promote Schema Components'] = function() {
    var L = pick(locals);
    return {
      scenario: 'Building a Promote schema for <span class="key">' + L.global + '</span>/<span class="key">' + L.name + '</span>.',
      question: 'A Promote schema must include:',
      correct: '<code>&Delta;' + L.global + '</code>, <code>&Delta;' + L.name + '</code>, and an index input <code>id? : ' + L.id + '</code>.',
      distractors: [
        'Only <code>&Delta;' + L.global + '</code>.',
        'Only <code>&Delta;' + L.name + '</code>.',
        'No declarations.'
      ]
    };
  };

  window.conceptBank['Box Office Promote'] = function() {
    var frameFields = [
      {field:'announced',sys:'box office',meaning:'announced performances'},
      {field:'scheduled',sys:'airline',meaning:'scheduled flights'},
      {field:'listed',sys:'venue',meaning:'listed events'}
    ];
    var f = pick(frameFields);
    return {
      scenario: 'The <span class="key">' + f.sys + '</span> Promote includes <code>' + f.field + '&prime; = ' + f.field + '</code>.',
      question: 'This means:',
      correct: 'Local ops on individual entries do not affect the set of ' + f.meaning + '.',
      distractors: [
        'Entries are automatically added to ' + f.field + '.',
        'The booking/manifest function is unchanged.',
        'All entries are removed.'
      ]
    };
  };

  window.conceptBank['NotYetBooking'] = function() {
    var e = pick(errScenarios);
    return {
      scenario: 'A system encounters: <span class="key">' + e.desc + '</span>.',
      question: 'Which schema handles this?',
      correct: '<code>' + e.err + '</code> using <code>&Xi;Global</code> and output <code>r! = ' + e.resp + '</code>.',
      distractors: [
        'The promoted success operation.',
        '<code>Promote</code> alone.',
        '<code>StartBooking</code>.'
      ]
    };
  };

  window.conceptBank['StartBooking Non-Promotable'] = function() {
    var ops = [
      {op:'StartBooking',reason:'adds a new entry to the booking map'},
      {op:'OpenRegistration',reason:'adds a new course to the roster map'},
      {op:'LaunchSales',reason:'adds a new flight to the manifest map'},
      {op:'CreateAccount',reason:'adds a new account to the accounts map'}
    ];
    var o = pick(ops);
    return {
      scenario: '<code>' + o.op + '</code> ' + o.reason + '.',
      question: 'Why can\'t this be promoted?',
      correct: 'It changes the domain of the global map &mdash; no existing local state to operate on.',
      distractors: [
        'It uses &Xi;.',
        'It doesn\'t have inputs.',
        'All operations can be promoted.'
      ]
    };
  };

  window.conceptBank['Totalisation'] = function() {
    var L = pick(locals);
    var errs = pick(errScenarios);
    return {
      scenario: 'A promoted <span class="key">' + L.op + '</span> is partial. An error schema <code>' + errs.err + '</code> handles failures.',
      question: 'The total operation is:',
      correct: '<code>Total' + L.op + ' = ' + L.op + '<sub>0</sub> &or; ' + errs.err + '</code>',
      distractors: [
        '<code>Total' + L.op + ' = ' + L.op + '<sub>0</sub> &and; ' + errs.err + '</code>',
        '<code>Total' + L.op + ' = ' + errs.err + '</code> alone',
        '<code>Total' + L.op + ' = ' + L.op + '<sub>0</sub></code> alone'
      ]
    };
  };

  window.conceptBank['One-Point Rule'] = function() {
    var L = pick(locals);
    return {
      scenario: 'The <span class="key">' + L.global + '</span> index is functional (<code>' + L.map + ' : ' + L.id + ' &#x21F8; ' + L.name + '</code>).',
      question: 'The existential quantifier can be eliminated via:',
      correct: 'The one-point rule &mdash; <code>&theta;' + L.name + ' = ' + L.map + '(id?)</code> uniquely determines the local state.',
      distractors: [
        'Schema negation.',
        'Free type elimination.',
        'Universal introduction.'
      ]
    };
  };

  window.conceptBank['Promote Invariant'] = function() {
    var invs = [
      {sys:'box office',inv:'dom booking &sube; announced',meaning:'every booking performance was announced'},
      {sys:'airline',inv:'dom manifest &sube; scheduled',meaning:'every bookable flight was scheduled'},
      {sys:'gym',inv:'dom classes &sube; offered',meaning:'every active class was offered'}
    ];
    var v = pick(invs);
    return {
      scenario: 'The <span class="key">' + v.sys + '</span> has invariant <code>' + v.inv + '</code>.',
      question: 'This means:',
      correct: v.meaning + '.',
      distractors: [
        'The sets are always equal.',
        'The mapping is total.',
        'The domain is empty.'
      ]
    };
  };

  window.conceptBank['Xi in Error Schemas'] = function() {
    var L = pick(locals);
    return {
      scenario: 'An error schema uses <code>&Xi;' + L.global + '</code>.',
      question: 'This means:',
      correct: 'The global state is completely unchanged &mdash; no side effects.',
      distractors: [
        'The global state is deleted.',
        'Only ' + L.map + ' changes.',
        'A new entry is added.'
      ]
    };
  };

  window.conceptBank['Expanded GlobalPurchase'] = function() {
    var L = pick(locals);
    return {
      scenario: 'When the promoted op on <span class="key">' + L.global + '</span> is expanded (eliminating &exist;), the result checks:',
      question: 'What does the expanded predicate verify?',
      correct: '<code>id? &isin; dom ' + L.map + '</code> and the local operation\'s conditions on <code>' + L.map + '(id?)</code>.',
      distractors: [
        '<code>id? &notin; dom ' + L.map + '</code>.',
        '<code>' + L.map + ' = &empty;</code>.',
        'Nothing &mdash; the expansion removes all predicates.'
      ]
    };
  };

  window.conceptBank['Promote Reuse'] = function() {
    var L = pick(locals);
    var newOp = pick(['Return','Refund','Cancel','Transfer','Upgrade']);
    return {
      scenario: 'The <span class="key">' + L.global + '</span> adds <code>' + newOp + '</code> using the same Promote schema.',
      question: 'The promoted version is:',
      correct: '<code>&exist; &Delta;' + L.name + ' &bull; ' + newOp + ' &and; Promote</code>',
      distractors: [
        'A new Promote schema is required.',
        '<code>' + newOp + '</code> alone.',
        '<code>Promote</code> alone.'
      ]
    };
  };

  window.conceptBank['Disjunction for Errors'] = function() {
    var L = pick(locals);
    var err1 = pick(['NotFound','NotReady','Unavailable']);
    var err2 = pick(['InvalidInput','AlreadyDone','Expired']);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> has promoted <code>' + L.op + '</code> and errors <code>' + err1 + '</code>, <code>' + err2 + '</code>.',
      question: 'The total operation is:',
      correct: '<code>Total' + L.op + ' = ' + L.op + '<sub>0</sub> &or; ' + err1 + ' &or; ' + err2 + '</code>',
      distractors: [
        '<code>Total' + L.op + ' = ' + L.op + '<sub>0</sub> &and; ' + err1 + ' &and; ' + err2 + '</code>',
        '<code>Total' + L.op + ' = ' + L.op + '<sub>0</sub></code>',
        '<code>Total' + L.op + ' = ' + err1 + ' &or; ' + err2 + '</code>'
      ]
    };
  };

  window.conceptBank['Index Input'] = function() {
    var L = pick(locals);
    return {
      scenario: 'In the <span class="key">' + L.global + '</span> Promote, <code>id? : ' + L.id + '</code> is the index input.',
      question: 'It selects:',
      correct: 'Which <code>' + L.name + '</code> in the collection to operate on.',
      distractors: [
        'Which field to update.',
        'Which user is requesting.',
        'The response code.'
      ]
    };
  };

  window.conceptBank['Promotion Scope'] = function() {
    return {
      scenario: 'Promotion is used only for operations that:',
      question: 'Which operations can be promoted?',
      correct: 'Those described in terms of their effect within an indexed frame &mdash; modifying one existing element.',
      distractors: [
        'Any global operation.',
        'Creating new elements.',
        'Deleting elements from the collection.'
      ]
    };
  };

  window.conceptBank['Functional Index Advantage'] = function() {
    var L = pick(locals);
    return {
      scenario: 'The <span class="key">' + L.global + '</span> uses <code>' + L.map + ' : ' + L.id + ' &#x21F8; ' + L.name + '</code> (functional).',
      question: 'The advantage is:',
      correct: 'The existential quantification can be eliminated via the one-point rule.',
      distractors: [
        'The operation becomes total automatically.',
        'No Promote schema is needed.',
        'Error schemas are unnecessary.'
      ]
    };
  };

  window.conceptBank['Booking Invariant Subset'] = function() {
    var L = pick(locals);
    var refSet = pick(['offered','announced','scheduled','approved']);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> has <code>dom ' + L.map + ' &sube; ' + refSet + '</code>. A promoted op:',
      question: 'What does it require?',
      correct: '<code>id? &isin; dom ' + L.map + '</code> and keeps <code>' + refSet + '&prime; = ' + refSet + '</code>.',
      distractors: [
        'Can create a new entry.',
        'Changes <code>' + refSet + '</code>.',
        'Deletes the entry.'
      ]
    };
  };

  window.conceptBank['Error Schema Pattern'] = function() {
    var L = pick(locals);
    return {
      scenario: 'An error schema for the <span class="key">' + L.global + '</span> system.',
      question: 'It typically has:',
      correct: '<code>&Xi;' + L.global + '</code> (unchanged), an input, and an error output <code>r!</code>.',
      distractors: [
        '<code>&Delta;' + L.global + '</code> (state changes).',
        'No declarations.',
        'A Promote inclusion.'
      ]
    };
  };

  window.conceptBank['Concert Promote'] = function() {
    var L = pick(locals);
    return {
      scenario: 'The <span class="key">' + L.global + '</span> promotes <code>' + L.op + '</code>. If <code>id? &notin; dom ' + L.map + '</code>:',
      question: 'What happens?',
      correct: 'The promoted op is undefined &mdash; an error schema is needed for totalisation.',
      distractors: [
        'The op succeeds with no effect.',
        'A new entry is created.',
        'The Promote handles it internally.'
      ]
    };
  };

  window.conceptBank['Domain Change Test'] = function() {
    var L = pick(locals);
    var createOp = pick(['Create','Acquire','Register','Add']);
    var deleteOp = pick(['Discard','Remove','Deregister','Delete']);
    var updateOp = pick(['Renew','Update','Edit','Modify']);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> has operations: <code>' + updateOp + L.name + '</code>, <code>' + createOp + L.name + '</code>, <code>' + deleteOp + L.name + '</code>.',
      question: 'Which can be promoted?',
      correct: '<code>' + updateOp + L.name + '</code> &mdash; modifies an existing entry.',
      distractors: [
        '<code>' + createOp + L.name + '</code> (adds to domain).',
        '<code>' + deleteOp + L.name + '</code> (removes from domain).',
        'All of the above.'
      ]
    };
  };

  window.conceptBank['Box Office Override'] = function() {
    var L = pick(locals);
    return {
      scenario: 'In the <span class="key">' + L.global + '</span> Promote, <code>{id?} &#x25C1; ' + L.map + '&prime; = {id?} &#x25C1; ' + L.map + '</code> ensures:',
      question: 'What does this frame condition mean?',
      correct: 'All entries other than <code>id?</code> are unaffected.',
      distractors: [
        'Entry <code>id?</code> is unaffected.',
        'All entries are changed.',
        'The map is emptied.'
      ]
    };
  };

  window.conceptBank['Promote and Global Invariant'] = function() {
    var L = pick(locals);
    return {
      scenario: 'Promotion preserves a reference set and uses &oplus; to update one entry in <span class="key">' + L.global + '</span>.',
      question: 'The invariant <code>dom ' + L.map + ' &sube; refSet</code> is maintained because:',
      correct: '<code>&oplus;</code> replaces a value, not a key &mdash; <code>dom ' + L.map + '</code> is unchanged.',
      distractors: [
        'The invariant is checked at runtime.',
        'The invariant is removed during promotion.',
        'The reference set grows automatically.'
      ]
    };
  };

  window.conceptBank['Multiple Error Schemas'] = function() {
    var n = pick([2,3,4]);
    var L = pick(locals);
    return {
      scenario: 'A <span class="key">' + L.global + '</span> needs ' + n + ' error schemas, each with a different precondition.',
      question: 'Each error schema uses:',
      correct: '<code>&Xi;' + L.global + '</code> and a distinct <code>r!</code> value.',
      distractors: [
        '<code>&Delta;' + L.global + '</code> for each error.',
        'A single shared error schema.',
        'No error schemas needed.'
      ]
    };
  };

  window.conceptBank['Promote Four Predicates'] = function() {
    return {
      scenario: 'A well-formed Promote schema has four predicate roles.',
      question: 'Which is NOT one of them?',
      correct: 'Defining a new type (this is a type definition, not a predicate).',
      distractors: [
        'Index &isin; domain (precondition).',
        'Extract local pre-state from global.',
        'Write local post-state back to global.'
      ]
    };
  };

  window.conceptBank['Airline Promote'] = function() {
    var L = pick(locals);
    var frameField = pick(['scheduled','announced','offered','approved']);
    return {
      scenario: 'The <span class="key">' + L.global + '</span> Promote has <code>' + frameField + '&prime; = ' + frameField + '</code>.',
      question: 'This means:',
      correct: 'The reference set is unchanged by a local operation on one entry.',
      distractors: [
        'New entries are added.',
        'Entries are deleted.',
        'The map is unchanged.'
      ]
    };
  };

  window.conceptBank['Promoted vs Direct'] = function() {
    var L = pick(locals);
    return {
      scenario: 'A promoted op on <span class="key">' + L.global + '</span> and its direct global equivalent are:',
      question: 'How do they compare?',
      correct: 'Logically equivalent &mdash; promotion is structuring, not semantic change.',
      distractors: [
        'Different in meaning.',
        'Only equivalent for functions.',
        'Never equivalent.'
      ]
    };
  };

  /* ====== 13.3 Free and Constrained Promotion ====== */

  window.conceptBank['Free vs Constrained Recall'] = function() {
    return {
      scenario: 'A promotion is <em>free</em> if and only if:',
      question: 'What defines freeness?',
      correct: 'The Promote places no additional constraint on the local after-state beyond the local state invariant.',
      distractors: [
        'The promotion uses &forall;.',
        'The local state has no invariant.',
        'The global state is empty.'
      ]
    };
  };

  window.conceptBank['Constrained Meaning'] = function() {
    return {
      scenario: 'A <em>constrained</em> promotion means:',
      question: 'What does constrained mean?',
      correct: 'The global invariant restricts which local after-states are valid &mdash; quantifier exchange fails.',
      distractors: [
        'No promotion exists.',
        'The local state has no variables.',
        'The promotion is incorrect.'
      ]
    };
  };

  window.conceptBank['Data Array Freeness'] = function() {
    var f = pick(freeScenarios);
    return {
      scenario: 'A <span class="key">' + f.name + '</span> has <code>' + f.map + '</code>.',
      question: 'Why is the promotion free?',
      correct: f.reason + ' &mdash; &theta;Local&prime; is unconstrained beyond its type.',
      distractors: [
        'The collection is always empty.',
        'The collection has a size limit that constrains elements.',
        'Elements must be sorted.'
      ]
    };
  };

  window.conceptBank['Priority Stack Constrainedness'] = function() {
    var c = pick(constrainedScenarios);
    return {
      scenario: 'A <span class="key">' + c.name + '</span> has <code>' + c.map + '</code> with invariant: <span class="key">' + c.inv + '</span>.',
      question: 'Why is the promotion constrained?',
      correct: c.reason + ' &mdash; some local after-states violate the global invariant.',
      distractors: [
        'The collection is always empty.',
        'The promotion schema is missing.',
        'The local state has no components.'
      ]
    };
  };

  window.conceptBank['Freeness Test Formula'] = function() {
    return {
      scenario: 'The formal test for free promotion is:',
      question: 'Which formula?',
      correct: '<code>(&exist; Local&prime; &bull; &exist; Global&prime; &bull; Promote) &rArr; (&forall; Local&prime; &bull; &exist; Global&prime; &bull; Promote)</code>',
      distractors: [
        '<code>(&forall; Local&prime; &bull; Promote) &rArr; (&exist; Local&prime; &bull; Promote)</code>',
        '<code>Promote &rArr; LocalOp</code>',
        '<code>&exist; Global &bull; Promote</code>'
      ]
    };
  };

  window.conceptBank['Counterexample'] = function() {
    var c = pick(constrainedScenarios);
    return {
      scenario: 'A <span class="key">' + c.name + '</span> has invariant: <span class="key">' + c.inv + '</span>.',
      question: 'Which after-state is disallowed?',
      correct: 'One that violates the invariant &mdash; ' + c.reason + '.',
      distractors: [
        'One that maintains the invariant.',
        'One with higher priority/value than neighbours.',
        'One identical to the pre-state.'
      ]
    };
  };

  window.conceptBank['Modularity Benefit'] = function() {
    return {
      scenario: 'Free promotions are more modular because:',
      question: 'Why are free promotions better for modularity?',
      correct: 'Local ops can be developed and tested independently of the global invariant.',
      distractors: [
        'Constrained promotions are always wrong.',
        'Free promotions don\'t need a Promote schema.',
        'Free promotions are faster.'
      ]
    };
  };

  window.conceptBank['Sorted List Constrained'] = function() {
    var c = pick(constrainedScenarios);
    return {
      scenario: 'A <span class="key">' + c.name + '</span> has invariant: <span class="key">' + c.inv + '</span>. Updating one element\'s key:',
      question: 'What kind of promotion is this?',
      correct: 'Constrained &mdash; ' + c.reason + '.',
      distractors: [
        'Free &mdash; any value works.',
        'Impossible &mdash; can\'t use promotion.',
        'Neither free nor constrained.'
      ]
    };
  };

  window.conceptBank['Proof Rule — Existential Elimination'] = function() {
    return {
      scenario: 'The existential elimination rule:',
      question: 'What does it state?',
      correct: 'From <code>&exist; S &bull; B</code> and a derivation of <code>C</code> from <code>[s &isin; S; B]</code>, conclude <code>C</code> (s not free in C).',
      distractors: [
        'From <code>&forall; S &bull; B</code>, conclude <code>B[t/&theta;S]</code>.',
        'From <code>B</code>, conclude <code>&exist; S &bull; B</code>.',
        'From <code>C</code>, conclude <code>&forall; S &bull; C</code>.'
      ]
    };
  };

  window.conceptBank['Proof Rule — Universal Introduction'] = function() {
    return {
      scenario: 'The universal introduction rule:',
      question: 'What does it state?',
      correct: 'From <code>[s &isin; S]</code> derive <code>B[s/&theta;S]</code>; conclude <code>&forall; S &bull; B</code> (s not free elsewhere).',
      distractors: [
        'From <code>&exist; S &bull; B</code>, conclude <code>&forall; S &bull; B</code> directly.',
        'From <code>B</code>, conclude <code>&forall; S &bull; B</code> without assumptions.',
        'From <code>&forall; S &bull; B</code>, conclude <code>B[t/&theta;S]</code>.'
      ]
    };
  };

  window.conceptBank['Free Promotion Identification'] = function() {
    var f = pick(freeScenarios);
    return {
      scenario: 'A <span class="key">' + f.name + '</span> has <code>' + f.map + '</code>. Is the promotion free?',
      question: 'Classify the promotion:',
      correct: 'Free &mdash; ' + f.reason + '.',
      distractors: [
        'Constrained &mdash; elements must be ordered.',
        'Neither.',
        'Cannot be determined.'
      ]
    };
  };

  window.conceptBank['Constrained Design Choice'] = function() {
    return {
      scenario: 'When a promotion is constrained, the designer can:',
      question: 'What are the options?',
      correct: 'Accept the constraint, strengthen the Promote predicate, or redesign the local state.',
      distractors: [
        'Only abandon promotion entirely.',
        'Only weaken the global invariant.',
        'Do nothing &mdash; constrained promotions are invalid.'
      ]
    };
  };

  window.conceptBank['Head-of-Stack Promotion'] = function() {
    return {
      scenario: 'The priority stack Promote operates on <code>head stack</code>.',
      question: 'This means:',
      correct: 'Only the highest-priority element (top of stack) can be operated upon.',
      distractors: [
        'Any element can be targeted.',
        'The last element is targeted.',
        'All elements are modified simultaneously.'
      ]
    };
  };

  window.conceptBank['Free = Unconstrained After-State'] = function() {
    var L = pick(locals);
    return {
      scenario: 'In a free promotion on <span class="key">' + L.global + '</span>, after expanding <code>&exist; ' + L.global + '&prime; &bull; Promote</code>:',
      question: 'How does <code>&theta;' + L.name + '&prime;</code> appear?',
      correct: 'Unconstrained &mdash; only bound by the local state schema\'s own predicate.',
      distractors: [
        'Fully constrained by the global invariant.',
        'Absent from the expansion.',
        'Equal to the pre-state.'
      ]
    };
  };

  window.conceptBank['Game Score Freeness'] = function() {
    var f = pick(freeScenarios);
    return {
      scenario: 'A <span class="key">' + f.name + '</span> has <code>' + f.map + '</code> with no cross-element invariant.',
      question: 'Is the promotion free?',
      correct: 'Yes &mdash; ' + f.reason + '.',
      distractors: [
        'No &mdash; elements compete so they are constrained.',
        'Only if there is one element.',
        'Cannot be determined.'
      ]
    };
  };

  window.conceptBank['Quantifier Exchange Meaning'] = function() {
    return {
      scenario: 'The quantifier exchange <code>(&exist; L&prime; &bull; ...) &rArr; (&forall; L&prime; &bull; ...)</code> means:',
      question: 'What does it express?',
      correct: 'If any local after-state works, then all work &mdash; the promotion doesn\'t restrict them.',
      distractors: [
        'All local after-states must be identical.',
        'No local after-state works.',
        'The quantifiers are always exchangeable.'
      ]
    };
  };

  window.conceptBank['Non-Empty Stack Precondition'] = function() {
    return {
      scenario: 'The priority stack Promote includes <code>stack &ne; &langle;&rangle;</code>.',
      question: 'This ensures:',
      correct: 'The stack is non-empty &mdash; <code>head</code> is undefined on an empty sequence.',
      distractors: [
        'The stack is always empty.',
        'The stack has exactly one element.',
        'The stack is infinite.'
      ]
    };
  };

  window.conceptBank['Decoration Mechanism'] = function() {
    return {
      scenario: 'The decoration mechanism (primed/unprimed copies):',
      question: 'What does it allow?',
      correct: 'Distinguishing before-state and after-state components (e.g., S vs S&prime;).',
      distractors: [
        'Creating free types.',
        'Defining axioms.',
        'Removing variables.'
      ]
    };
  };

  window.conceptBank['PriData Components'] = function() {
    return {
      scenario: 'The priority stack\'s local state <code>PriData</code> has:',
      question: 'What components?',
      correct: '<code>priority : &Nopf;</code> and <code>data : Data</code>.',
      distractors: [
        'Only <code>data : Data</code>.',
        'Only <code>priority : &Nopf;</code>.',
        '<code>stack : seq PriData</code>.'
      ]
    };
  };

  window.conceptBank['Deciding Freeness Method'] = function() {
    return {
      scenario: 'To decide whether a promotion is free:',
      question: 'What is the method?',
      correct: 'Expand <code>&exist; Global&prime; &bull; Promote</code>, simplify, check if &theta;Local&prime; is unconstrained beyond local invariant.',
      distractors: [
        'Check if the local state has components.',
        'Check if the index is a natural number.',
        'Run the system and observe.'
      ]
    };
  };

  window.conceptBank['Local State Invariant'] = function() {
    return {
      scenario: 'In the freeness test, "local state invariant" refers to:',
      question: 'What is the local state invariant?',
      correct: 'Constraints from the local state schema\'s own predicate &mdash; not from Promote or Global.',
      distractors: [
        'The global invariant.',
        'The Promote predicate.',
        'There is no local invariant.'
      ]
    };
  };

  window.conceptBank['Mail System Freeness'] = function() {
    var f = pick(freeScenarios);
    return {
      scenario: 'A <span class="key">' + f.name + '</span> has <code>' + f.map + '</code> with no cross-element ordering.',
      question: 'Is the promotion free?',
      correct: 'Yes &mdash; ' + f.reason + '.',
      distractors: [
        'No &mdash; elements must be sorted.',
        'Only if there is one element.',
        'Cannot be determined.'
      ]
    };
  };

  window.conceptBank['Constrained Elegance Trade-off'] = function() {
    return {
      scenario: 'Constrained promotions are "not as elegant" because:',
      question: 'Why?',
      correct: 'They lack modularity &mdash; local ops can\'t be tested in complete isolation from global context.',
      distractors: [
        'They are always incorrect.',
        'They can\'t be written in Z.',
        'They require more memory.'
      ]
    };
  };

  window.conceptBank['One-Point in Freeness Proof'] = function() {
    var L = pick(locals);
    return {
      scenario: 'In the <span class="key">' + L.global + '</span> freeness proof, the one-point rule eliminates:',
      question: 'What is eliminated?',
      correct: '<code>&exist; ' + L.map + '&prime;</code> &mdash; because the override uniquely determines the after-state.',
      distractors: [
        '<code>&exist; index?</code>.',
        '<code>&exist; ' + L.name + '</code>.',
        '<code>&forall; ' + L.map + '</code>.'
      ]
    };
  };

  window.conceptBank['Summary — Free vs Constrained'] = function() {
    return {
      scenario: 'Summarise free vs constrained promotion:',
      question: 'Which best describes the difference?',
      correct: 'Free: global context doesn\'t restrict local after-states. Constrained: it does.',
      distractors: [
        'Free: no Promote schema. Constrained: has one.',
        'Free: uses &forall;. Constrained: uses &exist;.',
        'Free: one element. Constrained: all elements.'
      ]
    };
  };

})();
