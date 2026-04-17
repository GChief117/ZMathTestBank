(function buildCh15Bank() {

  window.conceptBank = window.conceptBank || {};

  // === 15.1 A Programming Interface ===

  var ops = [
    { task: 'look up a patient record', op: 'read', cat: 'file-level', why: 'pure lookup, no modification' },
    { task: 'correct a student grade', op: 'write', cat: 'file-level', why: 'key exists, value overwritten' },
    { task: 'enrol a brand-new student', op: 'add', cat: 'file-level', why: 'fresh key, file extended' },
    { task: 'remove a cancelled order', op: 'delete', cat: 'file-level', why: 'entry removed from within file' },
    { task: 'set up a new project folder', op: 'create', cat: 'system-level (management)', why: 'new file in the system' },
    { task: 'permanently erase an old archive', op: 'destroy', cat: 'system-level (management)', why: 'file itself removed' },
    { task: 'unlock a document for editing', op: 'open', cat: 'system-level (access)', why: 'file made available' },
    { task: 'lock a database after maintenance', op: 'close', cat: 'system-level (access)', why: 'file made unavailable' }
  ];
  var allOps = ['read','write','add','delete','create','destroy','open','close'];

  window.conceptBank['Interface Purpose'] = function() {
    var qs = [
      { q: 'A programming interface for a file system is:', c: 'A list of operations with descriptions of their intended effects.', d: ['A hardware specification.','A user manual.','A programming language.'] },
      { q: 'The purpose of listing operations in a programming interface is:', c: 'To describe every action and its effect on the file system.', d: ['To compile code.','To design hardware.','To write unit tests.'] }
    ];
    var p = qs[Math.floor(Math.random()*qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Operation Classification'] = function() {
    var qs = [
      { q: 'File-level operations are:', c: 'read, write, add, delete.', d: ['create, destroy, open, close.','create, read, delete, close.','open, write, destroy, add.'] },
      { q: 'System-level operations are:', c: 'create, destroy, open, close.', d: ['read, write, add, delete.','read, create, open, add.','write, destroy, close, delete.'] }
    ];
    var p = qs[Math.floor(Math.random()*qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Identifying Operations'] = function() {
    var o = ops[Math.floor(Math.random()*ops.length)];
    var wrongs = allOps.filter(function(x){return x!==o.op;});
    wrongs.sort(function(){return Math.random()-0.5;});
    return {
      scenario: 'A user needs to <span class="key">' + o.task + '</span>.',
      question: 'Which operation is this?',
      correct: o.op + ' \u2014 ' + o.why + '.',
      distractors: [wrongs[0]+'.', wrongs[1]+'.', wrongs[2]+'.']
    };
  };

  window.conceptBank['File-Level vs System-Level'] = function() {
    var qs = [
      { q: 'File-level and system-level differ because:', c: 'File-level affects data within one file; system-level affects the file system as a whole.', d: ['They are identical.','File-level is faster.','System-level only reads data.'] },
      { q: 'delete (file-level) vs destroy (system-level):', c: 'delete removes data within a file; destroy removes the file itself.', d: ['They are the same.','delete removes the file.','destroy removes data within.'] }
    ];
    var p = qs[Math.floor(Math.random()*qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Add vs Write'] = function() {
    var qs = [
      { q: 'add vs write:', c: 'add requires a fresh key (extends); write requires an existing key (overwrites).', d: ['They are identical.','add overwrites; write extends.','Both create new files.'] },
      { q: 'add fails when:', c: 'The key already exists in the file.', d: ['The key does not exist.','The file is empty.','The system is closed.'] }
    ];
    var p = qs[Math.floor(Math.random()*qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['File Management vs File Access'] = function() {
    var qs = [
      { q: 'File management (create/destroy) differs from file access (open/close) because:', c: 'Management changes which files exist; access changes their availability.', d: ['They are the same.','Management is file-level.','Access removes files.'] }
    ];
    var p = qs[Math.floor(Math.random()*qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Open vs Close'] = function() {
    var qs = [
      { q: 'After closing a file:', c: 'The file still exists but is unavailable for reading and writing.', d: ['The file is destroyed.','The file\'s data is deleted.','The file becomes new.'] }
    ];
    var p = qs[Math.floor(Math.random()*qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  window.conceptBank['Interface Completeness'] = function() {
    var qs = [
      { q: 'Why does a file system need all eight operations?', c: 'Each covers a distinct user action; fewer would leave actions unspecified.', d: ['Only four are needed.','Eight is arbitrary.','Some are redundant.'] }
    ];
    var p = qs[Math.floor(Math.random()*qs.length)];
    return { scenario: '', question: p.q, correct: p.c, distractors: p.d };
  };

  // === 15.2 Operations upon Files ===

  var scenarios2 = [
    { ctx: 'address book', key: 'ContactName', data: 'PhoneNumber' },
    { ctx: 'playlist', key: 'TrackID', data: 'Song' },
    { ctx: 'recipe book', key: 'RecipeName', data: 'Instructions' },
    { ctx: 'inventory', key: 'SKU', data: 'StockCount' },
    { ctx: 'gradebook', key: 'StudentID', data: 'Grade' }
  ];

  window.conceptBank['File Schema'] = function() {
    var s = scenarios2[Math.floor(Math.random()*scenarios2.length)];
    return {
      scenario: 'A <span class="key">' + s.ctx + '</span> maps ' + s.key + ' to ' + s.data + '.',
      question: 'Which models the File schema?',
      correct: '<code>contents : ' + s.key + ' &#x21FB; ' + s.data + '</code>',
      distractors: ['<code>contents : ' + s.key + ' &rarr; ' + s.data + '</code> (total function).','<code>contents ::= ' + s.key + ' | ' + s.data + '</code> (free type).','<code>contents : &#x2119; ' + s.key + '</code> (power set).']
    };
  };

  window.conceptBank['FileInit Purpose'] = function() {
    var s = scenarios2[Math.floor(Math.random()*scenarios2.length)];
    return {
      scenario: 'A new <span class="key">' + s.ctx + '</span> starts empty.',
      question: 'FileInit sets contents\u2032 to:',
      correct: '<code>&empty;</code> \u2014 the empty set.',
      distractors: ['<code>' + s.key + ' &#x21FB; ' + s.data + '</code>.','<code>dom contents</code>.','<code>contents</code> (unchanged).']
    };
  };

  window.conceptBank['File Operation Schemas'] = function() {
    var opTypes = [
      { name:'Read',pre:'k? &isin; dom contents',post:'d! = contents k?',op:'&#926;File',desc:'query',sym:'no state change' },
      { name:'Write',pre:'k? &isin; dom contents',post:'contents\u2032 = contents &oplus; {k? &#x21A6; d?}',op:'&Delta;File',desc:'overwrite',sym:'relational override' },
      { name:'Add',pre:'k? &notin; dom contents',post:'contents\u2032 = contents &cup; {k? &#x21A6; d?}',op:'&Delta;File',desc:'extend',sym:'set union' },
      { name:'Delete',pre:'k? &isin; dom contents',post:'contents\u2032 = {k?} &#x2A64; contents',op:'&Delta;File',desc:'remove',sym:'domain co-restriction' }
    ];
    var o = opTypes[Math.floor(Math.random()*opTypes.length)];
    var s = scenarios2[Math.floor(Math.random()*scenarios2.length)];
    return {
      scenario: 'A <span class="key">' + s.ctx + '</span> needs to <span class="key">' + o.desc + '</span> an entry.',
      question: 'Which schema and precondition?',
      correct: '<code>' + o.name + '&#8320;: ' + o.op + ' | ' + o.pre + '</code>',
      distractors: [
        '<code>FileInit | contents\u2032 = &empty;</code>',
        '<code>' + (o.name==='Read'?'Write':'Read') + '&#8320;</code> (wrong operation).',
        '<code>' + o.name + '&#8320; | contents = &empty;</code> (wrong precondition).'
      ]
    };
  };

  window.conceptBank['Basic Types'] = function() {
    return {
      scenario: '',
      question: 'Declaring <code>[Key, Data]</code> means:',
      correct: 'Key and Data are abstract, unstructured basic types.',
      distractors: ['Key and Data are integers.','Key and Data are free types.','Key and Data are schemas.']
    };
  };

  window.conceptBank['Delta vs Xi'] = function() {
    return {
      scenario: '',
      question: '<code>&Delta;File</code> vs <code>&Xi;File</code>:',
      correct: '<code>&Delta;File</code> allows state change; <code>&Xi;File</code> requires <code>&theta;File = &theta;File\u2032</code>.',
      distractors: ['They are identical.','<code>&Xi;File</code> allows change.','Neither includes an after-state.']
    };
  };

  window.conceptBank['Partial Function Choice'] = function() {
    return {
      scenario: '',
      question: 'Why is contents a partial (not total) function?',
      correct: 'Not every possible key maps to data \u2014 only stored keys do.',
      distractors: ['Every key always has a value.','Total functions are unavailable.','Partial functions cannot be initialised.']
    };
  };

  window.conceptBank['Domain Co-restriction'] = function() {
    return {
      scenario: '',
      question: '<code>{k?} &#x2A64; contents</code> produces:',
      correct: 'All maplets of contents except those starting with k?.',
      distractors: ['Only the maplet at k?.','The empty set.','A new maplet k? &#x21A6; d?.']
    };
  };

  window.conceptBank['Relational Override'] = function() {
    return {
      scenario: '',
      question: '<code>contents &oplus; {k? &#x21A6; d?}</code> when k? &isin; dom contents:',
      correct: 'Contents with the maplet at k? replaced by the new one.',
      distractors: ['Contents with k? removed.','The empty set.','An error.']
    };
  };

  // === 15.3 A More Complete Description ===

  var totalOps = [
    { name:'Read', error:'KeyNotInUse', errCond:'k? &notin; dom contents', errReport:'key_not_in_use' },
    { name:'Write', error:'KeyNotInUse', errCond:'k? &notin; dom contents', errReport:'key_not_in_use' },
    { name:'Add', error:'KeyInUse', errCond:'k? &isin; dom contents', errReport:'key_in_use' },
    { name:'Delete', error:'KeyNotInUse', errCond:'k? &notin; dom contents', errReport:'key_not_in_use' }
  ];

  window.conceptBank['Report Type'] = function() {
    return {
      scenario: '',
      question: 'The Report free type is:',
      correct: '<code>Report ::= key_in_use | key_not_in_use | okay</code>',
      distractors: ['<code>Report ::= true | false</code>','<code>Report : &#x2115;</code>','<code>Report &#x2259; Key &#x21FB; Data</code>']
    };
  };

  window.conceptBank['Error Schema Purpose'] = function() {
    return {
      scenario: '',
      question: 'KeyError includes &Xi;File because:',
      correct: 'An error must leave the file state unchanged.',
      distractors: ['Errors modify the file.','KeyError has no state.','Errors delete the file.']
    };
  };

  window.conceptBank['Total Operation Composition'] = function() {
    var o = totalOps[Math.floor(Math.random()*totalOps.length)];
    var s = scenarios2[Math.floor(Math.random()*scenarios2.length)];
    return {
      scenario: 'A <span class="key">' + s.ctx + '</span> total ' + o.name + ' operation.',
      question: 'Which defines total ' + o.name + '?',
      correct: '<code>' + o.name + ' &#x2259; (' + o.name + '&#8320; &and; Success) &or; ' + o.error + '</code>',
      distractors: [
        '<code>' + o.name + ' &#x2259; ' + o.name + '&#8320;</code> (still partial).',
        '<code>' + o.name + ' &#x2259; ' + o.error + '</code> (error only).',
        '<code>' + o.name + ' &#x2259; (' + o.name + '&#8320; &and; Success) &or; ' + (o.error==='KeyInUse'?'KeyNotInUse':'KeyInUse') + '</code> (wrong error).'
      ]
    };
  };

  window.conceptBank['KeyError Schema'] = function() {
    return {
      scenario: '',
      question: 'KeyError includes:',
      correct: '<code>&Xi;File</code>, <code>k? : Key</code>, <code>r! : Report</code>.',
      distractors: ['<code>&Delta;File</code>, <code>k? : Key</code>.','<code>FileInit</code>, <code>r! : Report</code>.','No components.']
    };
  };

  window.conceptBank['Success Schema'] = function() {
    return {
      scenario: '',
      question: 'The Success schema contains:',
      correct: '<code>r! : Report</code> with <code>r! = okay</code>.',
      distractors: ['<code>&Delta;File</code> with state change.','<code>&Xi;File</code> with no change.','Nothing.']
    };
  };

  window.conceptBank['Structured Specification'] = function() {
    return {
      scenario: '',
      question: 'The structured approach avoids:',
      correct: 'Duplication \u2014 common schemas (KeyError, Success) are reused.',
      distractors: ['Using schemas.','Having error cases.','Formal notation.']
    };
  };

  window.conceptBank['Expanded Schema'] = function() {
    return {
      scenario: '',
      question: 'An expanded total schema shows:',
      correct: 'Both success and error predicates in one schema with <code>&or;</code>.',
      distractors: ['Only the success path.','Only the error path.','No predicates.']
    };
  };

  window.conceptBank['Disjunction in Totality'] = function() {
    return {
      scenario: '',
      question: 'Disjunction (&or;) in total operations ensures:',
      correct: 'Every valid input is handled by exactly one disjunct.',
      distractors: ['Both disjuncts always fire.','The operation is still partial.','Errors are ignored.']
    };
  };

  // === 15.4 A File System ===

  var sysScenarios = [
    { ctx:'hotel', thing:'rooms', item:'guests' },
    { ctx:'hospital', thing:'wards', item:'patients' },
    { ctx:'university', thing:'courses', item:'students' },
    { ctx:'library', thing:'branches', item:'books' },
    { ctx:'office', thing:'rooms', item:'furniture' }
  ];

  window.conceptBank['System Schema'] = function() {
    var s = sysScenarios[Math.floor(Math.random()*sysScenarios.length)];
    return {
      scenario: 'A <span class="key">' + s.ctx + '</span> manages named ' + s.thing + '.',
      question: 'The System schema contains:',
      correct: '<code>file : Name &#x21FB; File</code>, <code>open : &#x2119; Name</code>, <code>open &sube; dom file</code>.',
      distractors: ['<code>contents : Key &#x21FB; Data</code> only.','<code>file : Name &rarr; File</code> (total).','<code>open : Name</code> (single name).']
    };
  };

  window.conceptBank['Promotion Purpose'] = function() {
    return {
      scenario: '',
      question: 'The Promote schema links:',
      correct: 'Local File state to global System state via the indexing function file.',
      distractors: ['Two different systems.','Errors to reports.','Initialisation to operations.']
    };
  };

  window.conceptBank['File System Operations'] = function() {
    var sysOps = [
      { name:'Open&#8320;', pre:'n? &isin; dom file &and; n? &notin; open', post:'open\u2032 = open &cup; {n?}' },
      { name:'Close&#8320;', pre:'n? &isin; open', post:'open\u2032 = open \\ {n?}' },
      { name:'Create&#8320;', pre:'n? &notin; dom file', post:'file\u2032 = file &cup; {n? &#x21A6; &theta;File\u2032}' },
      { name:'Destroy&#8320;', pre:'n? &isin; dom file', post:'file\u2032 = {n?} &#x2A64; file' }
    ];
    var o = sysOps[Math.floor(Math.random()*sysOps.length)];
    var s = sysScenarios[Math.floor(Math.random()*sysScenarios.length)];
    return {
      scenario: 'A <span class="key">' + s.ctx + '</span> performs <span class="key">' + o.name + '</span>.',
      question: 'The precondition is:',
      correct: '<code>' + o.pre + '</code>',
      distractors: ['<code>true</code>','<code>file = &empty;</code>','<code>n? &isin; open &and; n? &notin; dom file</code>']
    };
  };

  window.conceptBank['State Invariant'] = function() {
    return {
      scenario: '',
      question: '<code>open &sube; dom file</code> means:',
      correct: 'Every open file must exist in the system.',
      distractors: ['Every file must be open.','No file can be open.','open and dom file are disjoint.']
    };
  };

  window.conceptBank['FileAccess Schema'] = function() {
    return {
      scenario: '',
      question: 'FileAccess includes <code>file\u2032 = file</code> because:',
      correct: 'Open/close change availability, not file contents.',
      distractors: ['Open/close modify contents.','FileAccess deletes files.','FileAccess creates files.']
    };
  };

  window.conceptBank['FileManage Schema'] = function() {
    return {
      scenario: '',
      question: 'FileManage includes <code>open\u2032 = open</code> because:',
      correct: 'Create/destroy change which files exist, not which are open.',
      distractors: ['Create/destroy open files.','FileManage closes files.','open must be empty.']
    };
  };

  window.conceptBank['Extended Report Type'] = function() {
    return {
      scenario: '',
      question: 'The extended Report adds:',
      correct: '<code>file_exists | file_does_not_exist | file_is_open | file_is_not_open</code>',
      distractors: ['No new alternatives.','<code>system_error</code> only.','<code>true | false</code>.']
    };
  };

  window.conceptBank['Destroying Open Files'] = function() {
    return {
      scenario: '',
      question: 'Can we destroy a file that is currently open?',
      correct: 'No \u2014 FileManage preserves open, and the invariant would be violated.',
      distractors: ['Yes \u2014 destroy works on any file.','Yes \u2014 destroy also closes the file.','It depends on the key.']
    };
  };

  // === 15.5 Formal Analysis ===

  var preOps = [
    { name:'KeyRead&#8320;', pre:'n? &isin; open &and; k? &isin; dom(file n?)' },
    { name:'KeyWrite&#8320;', pre:'n? &isin; open &and; k? &isin; dom(file n?)' },
    { name:'KeyAdd&#8320;', pre:'n? &isin; open &and; k? &notin; dom(file n?)' },
    { name:'KeyDelete&#8320;', pre:'n? &isin; open &and; k? &isin; dom(file n?)' },
    { name:'Open&#8320;', pre:'n? &isin; dom file &and; n? &notin; open' },
    { name:'Close&#8320;', pre:'n? &isin; open' },
    { name:'Create&#8320;', pre:'n? &notin; dom file' },
    { name:'Destroy&#8320;', pre:'n? &isin; dom file &and; n? &notin; open' }
  ];

  window.conceptBank['Formal Analysis Purpose'] = function() {
    return {
      scenario: '',
      question: 'Formal analysis checks for:',
      correct: 'Contradictions, hidden assumptions, and preconditions.',
      distractors: ['Syntax errors only.','Performance benchmarks.','UI design.']
    };
  };

  window.conceptBank['Initialisation Theorem'] = function() {
    return {
      scenario: '',
      question: '<code>&exist; SystemInit &bull; true</code> proves:',
      correct: 'The state invariant is satisfiable \u2014 a valid initial state exists.',
      distractors: ['All operations are total.','The system has no errors.','The system is infinite.']
    };
  };

  window.conceptBank['Precondition Calculation'] = function() {
    var o = preOps[Math.floor(Math.random()*preOps.length)];
    var s = sysScenarios[Math.floor(Math.random()*sysScenarios.length)];
    return {
      scenario: 'A <span class="key">' + s.ctx + '</span> system.',
      question: '<code>pre ' + o.name + '</code> is:',
      correct: '<code>' + o.pre + '</code>',
      distractors: ['<code>true</code>','<code>file = &empty;</code>','<code>n? &notin; dom file &and; n? &isin; open</code>']
    };
  };

  window.conceptBank['Invariant Check'] = function() {
    return {
      scenario: '',
      question: 'Checking the state invariant ensures:',
      correct: 'The spec has no internal contradiction \u2014 a valid state exists.',
      distractors: ['All operations are fast.','The system has infinite states.','No operations exist.']
    };
  };

  window.conceptBank['Hidden Assumptions'] = function() {
    return {
      scenario: '',
      question: 'A hidden assumption in the file system spec:',
      correct: 'Destroy requires n? &notin; open, forced by the invariant.',
      distractors: ['All files are always open.','Create has no precondition.','Read modifies the state.']
    };
  };

  window.conceptBank['Contradictions'] = function() {
    return {
      scenario: '',
      question: 'If the invariant were open = dom file:',
      correct: 'Create would be impossible \u2014 new files can\'t be simultaneously open under FileManage.',
      distractors: ['Everything works normally.','Destroy becomes easier.','Close is trivial.']
    };
  };

  window.conceptBank['Precondition Table'] = function() {
    return {
      scenario: '',
      question: 'A precondition table is useful because:',
      correct: 'It collects all operation preconditions for review and comparison.',
      distractors: ['It replaces the Z spec.','It is required by Z syntax.','It eliminates all errors.']
    };
  };

  window.conceptBank['Design Validation'] = function() {
    return {
      scenario: '',
      question: 'Formal analysis of the file system confirms:',
      correct: 'The invariant is consistent, all total ops are defined, and preconditions are well-defined.',
      distractors: ['The spec has contradictions.','Some operations are undefined.','The init theorem fails.']
    };
  };

})();
