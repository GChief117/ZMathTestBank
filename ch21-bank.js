(function buildCh21Bank() {
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
  window.conceptBank = window.conceptBank || {};

  // ===================== 21.1 Processes =====================

  window.conceptBank['Process State Definitions'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">restaurant kitchen</span> has one stove shared among several chefs.', question: 'What are the three process states?', correct: '<code>current, ready, blocked</code>', distractors: ['<code>running, sleeping, terminated</code>','<code>active, inactive, deleted</code>','<code>new, running, exited</code>'] },
      { scenario: 'A <span class="key">hospital ER</span> shares one operating room among patients.', question: 'Which three states does the textbook define for processes?', correct: '<code>current, ready, blocked</code>', distractors: ['<code>waiting, active, done</code>','<code>queued, processing, finished</code>','<code>idle, busy, error</code>'] },
      { scenario: 'An <span class="key">airport</span> has one runway for all planes.', question: 'The three process states are:', correct: '<code>current, ready, blocked</code>', distractors: ['<code>taxiing, holding, grounded</code>','<code>airborne, landed, cancelled</code>','<code>active, standby, offline</code>'] },
      { scenario: 'A <span class="key">print queue</span> shares a single printer among many jobs.', question: 'Name the three process states from the scheduler model.', correct: '<code>current, ready, blocked</code>', distractors: ['<code>printing, spooled, error</code>','<code>active, paused, cancelled</code>','<code>running, waiting, stopped</code>'] },
      { scenario: 'A <span class="key">taxi dispatch</span> has one radio channel shared by all cabs.', question: 'The scheduler defines exactly three states:', correct: '<code>current, ready, blocked</code>', distractors: ['<code>dispatched, available, off-duty</code>','<code>moving, parked, broken</code>','<code>assigned, free, maintenance</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Scheduler Role'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> has one loading dock shared by forklifts.', question: 'What is the primary role of the scheduler?', correct: '<code>Decide which process uses the single processor and when</code>', distractors: ['<code>Allocate memory to processes</code>','<code>Compile programs into machine code</code>','<code>Handle file system requests</code>'] },
      { scenario: 'A <span class="key">hospital</span> has one MRI machine shared by patients.', question: 'The scheduler\'s job is to:', correct: '<code>Select which ready process becomes current</code>', distractors: ['<code>Create new processes from scratch</code>','<code>Repair blocked processes</code>','<code>Delete all idle processes</code>'] },
      { scenario: 'An <span class="key">airport gate</span> has one jet bridge shared by flights.', question: 'The scheduler is responsible for:', correct: '<code>Choosing the next ready process to run on the processor</code>', distractors: ['<code>Building new processors when load is high</code>','<code>Removing the processor from the system</code>','<code>Sending blocked processes to another machine</code>'] },
      { scenario: 'A <span class="key">restaurant</span> has one chef station shared by cooks.', question: 'What does the scheduler decide?', correct: '<code>Which process gets the processor next</code>', distractors: ['<code>How much memory each process gets</code>','<code>Which disk sector to read next</code>','<code>Which network packet to route</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Process States'] = function() {
    var domains = [
      { place: 'hospital ER', cur: 'in surgery', rdy: 'triaged and waiting', blk: 'awaiting lab results', curName: 'Patient A', rdyNames: 'Patients B and C', blkName: 'Patient D' },
      { place: 'print queue', cur: 'printing', rdy: 'queued', blk: 'waiting for file upload', curName: 'Job A', rdyNames: 'Jobs B and C', blkName: 'Job D' },
      { place: 'airport runway', cur: 'taking off', rdy: 'taxiing to runway', blk: 'waiting for de-icing', curName: 'Flight 101', rdyNames: 'Flights 202 and 303', blkName: 'Flight 404' },
      { place: 'taxi fleet', cur: 'carrying a passenger', rdy: 'queued at the stand', blk: 'at the mechanic', curName: 'Cab 7', rdyNames: 'Cabs 3 and 5', blkName: 'Cab 9' },
      { place: 'warehouse dock', cur: 'loading a truck', rdy: 'staged and waiting', blk: 'under repair', curName: 'Forklift 2', rdyNames: 'Forklifts 4 and 6', blkName: 'Forklift 8' }
    ];
    var d = pick(domains);
    return {
      scenario: 'In a <span class="key">' + d.place + '</span>, ' + d.curName + ' is <span class="key">' + d.cur + '</span>, ' + d.rdyNames + ' are <span class="key">' + d.rdy + '</span>, and ' + d.blkName + ' is <span class="key">' + d.blk + '</span>.',
      question: 'Which state assignment is correct?',
      correct: '<code>' + d.curName + ' = current, ' + d.rdyNames + ' = ready, ' + d.blkName + ' = blocked</code>',
      distractors: [
        '<code>' + d.curName + ' = ready, ' + d.blkName + ' = current</code>',
        '<code>' + d.curName + ' = blocked, ' + d.rdyNames + ' = current</code>',
        '<code>' + d.blkName + ' = ready, ' + d.rdyNames + ' = blocked</code>'
      ]
    };
  };

  window.conceptBank['Scheduler Dispatch'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">restaurant</span> has no chef at the station. Three cooks are <span class="key">ready</span>.', question: 'What does dispatch do?', correct: '<code>Pick one ready process and make it current</code>', distractors: ['<code>Create a new process</code>','<code>Block the first ready process</code>','<code>Destroy all ready processes</code>'] },
      { scenario: 'An <span class="key">airport</span> runway is <span class="key">free</span> and two flights are taxiing.', question: 'Dispatch means:', correct: '<code>Select a ready process to become current</code>', distractors: ['<code>Block the current process</code>','<code>Remove a process from the system</code>','<code>Move current to blocked</code>'] },
      { scenario: 'A <span class="key">hospital</span> MRI is <span class="key">idle</span> and patients are waiting.', question: 'What happens at dispatch?', correct: '<code>A ready process is chosen to run on the processor</code>', distractors: ['<code>The processor is shut down</code>','<code>All processes are blocked</code>','<code>A new process is created automatically</code>'] },
      { scenario: 'A <span class="key">print queue</span> printer just finished. Jobs are <span class="key">waiting</span>.', question: 'Dispatch will:', correct: '<code>Move one ready job to current</code>', distractors: ['<code>Delete all waiting jobs</code>','<code>Block the finished job</code>','<code>Keep the printer idle forever</code>'] },
      { scenario: 'A <span class="key">taxi stand</span> radio is free. Cabs are <span class="key">queued</span>.', question: 'Dispatch selects:', correct: '<code>One ready cab to become current</code>', distractors: ['<code>All cabs simultaneously</code>','<code>A blocked cab</code>','<code>No cab until reboot</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Kernel Handoff'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">print job</span> finishes and the printer <span class="key">signals the OS</span>.', question: 'How does control return to the kernel?', correct: '<code>Via a service call or an interrupt</code>', distractors: ['<code>The process restarts the kernel manually</code>','<code>Another process sends a message</code>','<code>The processor halts permanently</code>'] },
      { scenario: 'A <span class="key">taxi driver</span> presses the radio button to <span class="key">request a new fare</span>.', question: 'Control returns to the kernel by:', correct: '<code>Service call (voluntary) or interrupt (forced)</code>', distractors: ['<code>The driver turning off the engine</code>','<code>A passenger pressing a button</code>','<code>Automatic timeout only</code>'] },
      { scenario: 'A <span class="key">warehouse forklift</span> completes a load and <span class="key">reports to dispatch</span>.', question: 'The two mechanisms for returning control are:', correct: '<code>Service call and interrupt</code>', distractors: ['<code>Reboot and shutdown</code>','<code>Create and destroy</code>','<code>Block and unblock</code>'] },
      { scenario: 'A <span class="key">hospital patient</span> in the MRI <span class="key">scan completes</span>.', question: 'The kernel regains control through:', correct: '<code>A service call or a hardware interrupt</code>', distractors: ['<code>A new patient entering the room</code>','<code>The MRI powering itself off</code>','<code>A scheduler creating a new process</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Process Lifecycle'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> commissions a new forklift, uses it on shifts, then <span class="key">retires it</span>.', question: 'What is the process lifecycle?', correct: '<code>Create, schedule (current/ready/blocked), destroy</code>', distractors: ['<code>Destroy, schedule, create</code>','<code>Block, ready, create</code>','<code>Schedule, reboot, halt</code>'] },
      { scenario: 'An <span class="key">airport</span> registers a new flight, operates it, then <span class="key">removes it from the system</span>.', question: 'The lifecycle order is:', correct: '<code>Create before scheduling, destroy after use</code>', distractors: ['<code>Destroy before create</code>','<code>Schedule before create</code>','<code>Block, then create, then destroy</code>'] },
      { scenario: 'A <span class="key">hospital</span> admits a patient, treats them, then <span class="key">discharges</span> them.', question: 'The process lifecycle follows:', correct: '<code>Create, then cycle through current/ready/blocked, then destroy</code>', distractors: ['<code>Destroy immediately after create</code>','<code>Block permanently at creation</code>','<code>Ready only, no other states</code>'] },
      { scenario: 'A <span class="key">print queue</span> accepts a new job, processes it, then <span class="key">removes it</span>.', question: 'A process is:', correct: '<code>Created first, scheduled among states, then destroyed</code>', distractors: ['<code>Always current from creation to destruction</code>','<code>Created blocked and never dispatched</code>','<code>Destroyed before scheduling begins</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Single Processor Constraint'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">restaurant</span> has exactly <span class="key">one stove</span>.', question: 'What constraint does this impose?', correct: '<code>At most one process is current at any time</code>', distractors: ['<code>All processes are current simultaneously</code>','<code>No process can ever be current</code>','<code>Two processes share the processor</code>'] },
      { scenario: 'An <span class="key">airport</span> has <span class="key">one runway</span>.', question: 'The single-processor constraint means:', correct: '<code>At most one process can be current</code>', distractors: ['<code>Multiple processes run in parallel</code>','<code>The runway handles two planes at once</code>','<code>No constraint on concurrency</code>'] },
      { scenario: 'A <span class="key">hospital</span> has <span class="key">one MRI machine</span>.', question: 'How many processes can be current?', correct: '<code>At most one</code>', distractors: ['<code>Exactly two</code>','<code>As many as there are patients</code>','<code>Zero always</code>'] },
      { scenario: 'A <span class="key">warehouse</span> has <span class="key">one loading dock</span>.', question: 'The single-processor rule says:', correct: '<code>At most one forklift is current (using the dock)</code>', distractors: ['<code>All forklifts load simultaneously</code>','<code>No forklift can ever load</code>','<code>Two forklifts share the dock</code>'] },
      { scenario: 'A <span class="key">taxi dispatch</span> has <span class="key">one radio channel</span>.', question: 'The constraint is:', correct: '<code>At most one cab is current on the channel</code>', distractors: ['<code>All cabs transmit at once</code>','<code>The channel is always idle</code>','<code>Exactly three cabs share it</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Service Call vs Interrupt'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">print job</span> finishes and <span class="key">requests the OS</span> for a new task.', question: 'Is this a service call or an interrupt?', correct: '<code>Service call &mdash; the process voluntarily yields</code>', distractors: ['<code>Interrupt &mdash; hardware forced it</code>','<code>Neither &mdash; the process continues</code>','<code>Both simultaneously</code>'] },
      { scenario: 'A <span class="key">timer chip</span> fires because a quantum <span class="key">expired</span>.', question: 'Is this a service call or an interrupt?', correct: '<code>Interrupt &mdash; a hardware signal forces control back</code>', distractors: ['<code>Service call &mdash; the process asked for it</code>','<code>Neither &mdash; nothing happens</code>','<code>A destroy operation</code>'] },
      { scenario: 'A <span class="key">warehouse forklift</span> driver <span class="key">radios dispatch</span> to report task done.', question: 'This is a:', correct: '<code>Service call &mdash; voluntary request to the kernel</code>', distractors: ['<code>Interrupt &mdash; forced by hardware</code>','<code>Block operation</code>','<code>Destroy operation</code>'] },
      { scenario: 'A <span class="key">sensor alarm</span> triggers in a hospital <span class="key">without the patient requesting it</span>.', question: 'This is a:', correct: '<code>Interrupt &mdash; hardware signal, not voluntary</code>', distractors: ['<code>Service call &mdash; the patient asked</code>','<code>A create operation</code>','<code>A dispatch operation</code>'] },
      { scenario: 'A <span class="key">taxi driver</span> <span class="key">calls the dispatcher</span> to ask for a break.', question: 'This is a:', correct: '<code>Service call &mdash; the process voluntarily requests an OS service</code>', distractors: ['<code>Interrupt &mdash; forced by external event</code>','<code>A destroy &mdash; the cab is removed</code>','<code>A wake-up &mdash; the cab resumes</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['State Exclusivity'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">hospital</span> patient is listed as both <span class="key">in surgery</span> and <span class="key">waiting for triage</span>.', question: 'Is this valid under state exclusivity?', correct: '<code>No &mdash; a process is in exactly one state at any time</code>', distractors: ['<code>Yes &mdash; a process can be in two states</code>','<code>Yes &mdash; if the scheduler allows overlap</code>','<code>Only if the process is also blocked</code>'] },
      { scenario: 'A <span class="key">taxi</span> is recorded as both <span class="key">carrying a passenger</span> and <span class="key">at the mechanic</span>.', question: 'Does state exclusivity allow this?', correct: '<code>No &mdash; each process occupies exactly one state</code>', distractors: ['<code>Yes &mdash; dual states are permitted</code>','<code>Yes &mdash; if current and blocked overlap</code>','<code>Only during transitions</code>'] },
      { scenario: 'A <span class="key">print job</span> is shown as both <span class="key">printing</span> and <span class="key">queued</span>.', question: 'Is this consistent with the model?', correct: '<code>No &mdash; a process must be in exactly one of current, ready, or blocked</code>', distractors: ['<code>Yes &mdash; printing and queued can coexist</code>','<code>Yes &mdash; if the printer has two trays</code>','<code>Only for the first process</code>'] },
      { scenario: 'A <span class="key">warehouse forklift</span> appears in both <span class="key">ready</span> and <span class="key">blocked</span> sets.', question: 'Is this valid?', correct: '<code>No &mdash; sets are disjoint; each process in exactly one</code>', distractors: ['<code>Yes &mdash; sets may overlap</code>','<code>Yes &mdash; if the forklift is transitioning</code>','<code>Only if free is empty</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  // ===================== 21.2 Specification =====================

  var pids = [1,2,3,4,5,6,7,8,9,10];
  function rset(k) { var s = pids.slice(); var r = []; for (var i = 0; i < k; i++) { var j = Math.floor(Math.random() * s.length); r.push(s[j]); s.splice(j,1); } return r.sort(function(a,b){return a-b;}); }
  function fmtSet(arr) { return '{' + arr.join(', ') + '}'; }

  window.conceptBank['Type Definitions'] = function() {
    var n = randInt(5, 15);
    var scenarios = [
      { scenario: 'A system has <span class="key">n = ' + n + '</span> process slots.', question: 'What does <code>PId == 1..' + n + '</code> define?', correct: '<code>The set of valid process identifiers from 1 to ' + n + '</code>', distractors: ['<code>A function mapping processes to states</code>','<code>&Popf; PId &mdash; the power set of identifiers</code>','<code>A schema with four components</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> uses <span class="key">n = ' + n + '</span> cab numbers.', question: 'What is <code>OptPId</code>?', correct: '<code>PId &cup; {nullPId}</code> &mdash; identifiers plus the null marker', distractors: ['<code>PId \\ {nullPId}</code>','<code>&Popf; PId</code>','<code>&Nopf;</code>'] },
      { scenario: 'A <span class="key">warehouse</span> numbers its <span class="key">' + n + ' forklifts</span> starting at 1.', question: '<code>nullPId == 0</code> means:', correct: '<code>0 is outside 1..' + n + ', used as "no process" marker</code>', distractors: ['<code>0 is the first valid process</code>','<code>0 is the highest-priority process</code>','<code>0 means all processes</code>'] },
      { scenario: 'An <span class="key">airport</span> has <span class="key">' + n + ' gates</span>.', question: '<code>PId == 1..' + n + '</code> gives:', correct: '<code>Exactly ' + n + ' valid identifiers</code>', distractors: ['<code>' + (n+1) + ' identifiers (includes 0)</code>','<code>Infinite identifiers</code>','<code>No identifiers</code>'] },
      { scenario: 'A <span class="key">hospital</span> has <span class="key">' + n + ' beds</span>.', question: 'Why is nullPId defined as 0?', correct: '<code>0 &notin; 1..' + n + ' so it cannot conflict with any real PId</code>', distractors: ['<code>0 is the default process</code>','<code>0 is reserved for the kernel</code>','<code>0 means "all processes"</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Abstract Scheduler State'] = function() {
    var n = randInt(6, 10);
    var cur = randInt(1, n);
    var rest = []; for (var i = 1; i <= n; i++) { if (i !== cur) rest.push(i); }
    var rSize = randInt(1, Math.min(3, rest.length));
    var ready = rest.splice(0, rSize);
    var bSize = randInt(0, Math.min(2, rest.length));
    var blocked = rest.splice(0, bSize);
    var free = rest;
    var domains = ['warehouse with ' + n + ' forklifts', 'hospital with ' + n + ' beds', 'airport with ' + n + ' gates', 'taxi fleet of ' + n + ' cabs', 'restaurant with ' + n + ' tables'];
    var d = pick(domains);
    return {
      scenario: 'A <span class="key">' + d + '</span>. Unit ' + cur + ' is <span class="key">active</span>, units ' + fmtSet(ready) + ' are <span class="key">waiting</span>, units ' + fmtSet(blocked) + ' are <span class="key">on hold</span>, rest idle.',
      question: 'Which AScheduler state is correct?',
      correct: '<code>current = ' + cur + ', ready = ' + fmtSet(ready) + ', blocked = ' + fmtSet(blocked) + ', free = ' + fmtSet(free) + '</code>',
      distractors: [
        '<code>current = nullPId, ready = ' + fmtSet(ready) + ', blocked = ' + fmtSet(blocked) + ', free = ' + fmtSet(free) + '</code>',
        '<code>current = ' + cur + ', ready = ' + fmtSet(blocked) + ', blocked = ' + fmtSet(ready) + ', free = ' + fmtSet(free) + '</code>',
        '<code>current = ' + cur + ', ready = ' + fmtSet(ready) + ', blocked = ' + fmtSet(blocked) + ', free = ' + fmtSet(free.concat([cur])) + '</code>'
      ]
    };
  };

  window.conceptBank['Dispatch Operation'] = function() {
    var ready = rset(randInt(2,4));
    var picked = pick(ready);
    var scenarios = [
      { scenario: 'A <span class="key">taxi fleet</span>: current = nullPId, ready = <code>' + fmtSet(ready) + '</code>.', question: 'After ADispatch, what is current&prime;?', correct: '<code>current&prime; &isin; ' + fmtSet(ready) + '</code> (one of the ready cabs)', distractors: ['<code>current&prime; = nullPId</code>','<code>current&prime; &isin; blocked</code>','<code>current&prime; = 0</code>'] },
      { scenario: 'A <span class="key">print queue</span>: processor <span class="key">idle</span>, ready = <code>' + fmtSet(ready) + '</code>.', question: 'ADispatch requires:', correct: '<code>current = nullPId &and; ready &ne; &empty;</code>', distractors: ['<code>current &ne; nullPId</code>','<code>ready = &empty;</code>','<code>blocked &ne; &empty;</code>'] },
      { scenario: 'A <span class="key">warehouse</span>: dock <span class="key">empty</span>, forklifts ' + fmtSet(ready) + ' staged.', question: 'After ADispatch:', correct: '<code>ready&prime; = ready \\ {current&prime;}</code> &mdash; the picked process leaves ready', distractors: ['<code>ready&prime; = ready &cup; {current&prime;}</code>','<code>ready&prime; = &empty;</code>','<code>ready&prime; = ready</code> (unchanged)'] },
      { scenario: 'A <span class="key">hospital</span>: MRI <span class="key">free</span>, patients ' + fmtSet(ready) + ' waiting.', question: 'What does ADispatch NOT change?', correct: '<code>blocked and free are unchanged</code>', distractors: ['<code>ready is unchanged</code>','<code>current is unchanged</code>','<code>Everything changes</code>'] },
      { scenario: 'An <span class="key">airport</span>: runway <span class="key">clear</span>, flights ' + fmtSet(ready) + ' taxiing.', question: 'ADispatch moves one process from:', correct: '<code>ready to current</code>', distractors: ['<code>blocked to current</code>','<code>free to current</code>','<code>current to ready</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['TimeOut and Block'] = function() {
    var cur = randInt(1, 10);
    var scenarios = [
      { scenario: 'A <span class="key">taxi</span> driver ' + cur + ' gets a <span class="key">time slice expiry</span>.', question: 'ATimeOut moves the process to:', correct: '<code>ready &mdash; current&prime; = nullPId, ready&prime; = ready &cup; {' + cur + '}</code>', distractors: ['<code>blocked</code>','<code>free</code>','<code>destroyed</code>'] },
      { scenario: 'A <span class="key">warehouse forklift</span> ' + cur + ' <span class="key">needs a part from storage</span> (external resource).', question: 'ABlock moves it to:', correct: '<code>blocked &mdash; current&prime; = nullPId, blocked&prime; = blocked &cup; {' + cur + '}</code>', distractors: ['<code>ready</code>','<code>free</code>','<code>current remains ' + cur + '</code>'] },
      { scenario: 'A <span class="key">hospital</span> patient ' + cur + ' on the MRI has a <span class="key">timer interrupt</span>.', question: 'ATimeOut sets:', correct: '<code>current&prime; = nullPId</code> and adds ' + cur + ' to <code>ready</code>', distractors: ['<code>current&prime; = ' + cur + '</code> (no change)','Adds ' + cur + ' to <code>blocked</code>','Adds ' + cur + ' to <code>free</code>'] },
      { scenario: 'A <span class="key">print job</span> ' + cur + ' <span class="key">requests I/O</span> from disk.', question: 'ABlock sets:', correct: '<code>current&prime; = nullPId</code> and adds ' + cur + ' to <code>blocked</code>', distractors: ['Adds ' + cur + ' to <code>ready</code>','<code>current&prime; = ' + cur + '</code>','Adds ' + cur + ' to <code>free</code>'] },
      { scenario: 'An <span class="key">airport</span> plane ' + cur + ' gets a <span class="key">quantum expired</span> signal.', question: 'The difference between ATimeOut and ABlock is:', correct: '<code>ATimeOut moves current to ready; ABlock moves current to blocked</code>', distractors: ['<code>ATimeOut destroys; ABlock creates</code>','<code>No difference</code>','<code>ATimeOut blocks; ABlock readies</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['WakeUp and Create'] = function() {
    var blkPid = randInt(1, 10);
    var freePid = randInt(1, 10);
    var scenarios = [
      { scenario: 'A <span class="key">hospital</span> patient ' + blkPid + ' receives <span class="key">lab results</span> (resource available).', question: 'AWakeUp moves the process from:', correct: '<code>blocked to ready &mdash; blocked&prime; = blocked \\ {' + blkPid + '}, ready&prime; = ready &cup; {' + blkPid + '}</code>', distractors: ['<code>blocked to current</code>','<code>blocked to free</code>','<code>ready to blocked</code>'] },
      { scenario: 'A <span class="key">warehouse</span> hires a new operator from the <span class="key">free pool</span>.', question: 'ACreate takes a process from:', correct: '<code>free to ready &mdash; free&prime; = free \\ {pid?}, ready&prime; = ready &cup; {pid?}</code>', distractors: ['<code>free to current</code>','<code>blocked to ready</code>','<code>ready to free</code>'] },
      { scenario: 'A <span class="key">taxi</span> ' + blkPid + ' finishes its <span class="key">mechanical repair</span>.', question: 'AWakeUp:', correct: '<code>Moves ' + blkPid + ' from blocked to ready</code>', distractors: ['<code>Destroys ' + blkPid + '</code>','<code>Moves ' + blkPid + ' to current</code>','<code>Moves ' + blkPid + ' to free</code>'] },
      { scenario: 'An <span class="key">airport</span> registers a <span class="key">new flight</span> from the spare slot pool.', question: 'ACreate:', correct: '<code>Picks a pid from free and adds it to ready</code>', distractors: ['<code>Picks from blocked</code>','<code>Picks from ready</code>','<code>Makes it immediately current</code>'] },
      { scenario: 'A <span class="key">print queue</span> has job ' + blkPid + ' <span class="key">waiting for paper reload</span>. Paper arrives.', question: 'AWakeUp postcondition:', correct: '<code>blocked&prime; = blocked \\ {' + blkPid + '} &and; ready&prime; = ready &cup; {' + blkPid + '}</code>', distractors: ['<code>blocked unchanged</code>','<code>free&prime; = free &cup; {' + blkPid + '}</code>','<code>current&prime; = ' + blkPid + '</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Destroy Operation'] = function() {
    var pid = randInt(1, 10);
    var scenarios = [
      { scenario: 'A <span class="key">taxi</span> ' + pid + ' is <span class="key">decommissioned</span> while carrying a passenger (current).', question: 'ADestroyCurrent applies when:', correct: '<code>pid? = current &mdash; sets current&prime; = nullPId, free&prime; = free &cup; {' + pid + '}</code>', distractors: ['<code>pid? &isin; ready</code>','<code>pid? &isin; blocked</code>','<code>pid? &isin; free</code>'] },
      { scenario: 'A <span class="key">warehouse forklift</span> ' + pid + ' is <span class="key">retired</span> while <span class="key">staged and waiting</span>.', question: 'ADestroyReady applies when:', correct: '<code>pid? &isin; ready &mdash; ready&prime; = ready \\ {' + pid + '}, free&prime; = free &cup; {' + pid + '}</code>', distractors: ['<code>pid? = current</code>','<code>pid? &isin; blocked</code>','<code>pid? &isin; free</code>'] },
      { scenario: 'A <span class="key">hospital</span> bed ' + pid + ' is <span class="key">taken offline</span> while patient is <span class="key">awaiting test results</span>.', question: 'ADestroyBlocked:', correct: '<code>pid? &isin; blocked &mdash; blocked&prime; = blocked \\ {' + pid + '}, free&prime; = free &cup; {' + pid + '}</code>', distractors: ['<code>pid? = current</code>','<code>pid? &isin; ready</code>','<code>blocked unchanged</code>'] },
      { scenario: 'A <span class="key">print queue</span> job ' + pid + ' is <span class="key">cancelled</span>.', question: 'ADestroy is defined as:', correct: '<code>ADestroyCurrent &or; ADestroyReady &or; ADestroyBlocked</code>', distractors: ['<code>ADestroyCurrent only</code>','<code>ADestroyReady only</code>','<code>ADestroyBlocked only</code>'] },
      { scenario: 'An <span class="key">airport</span> flight ' + pid + ' is <span class="key">cancelled</span> from any state.', question: 'Regardless of state, ADestroy always:', correct: '<code>Moves the pid to free</code>', distractors: ['<code>Moves the pid to ready</code>','<code>Moves the pid to blocked</code>','<code>Removes the pid from the system entirely</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Partition Invariant'] = function() {
    var n = randInt(6, 10);
    var cur = randInt(1, n);
    var scenarios = [
      { scenario: 'A <span class="key">taxi fleet</span> of <span class="key">n = ' + n + '</span>.', question: 'The partition invariant states:', correct: '<code>({current} \\ {nullPId}, ready, blocked, free) partition PId</code>', distractors: ['<code>ready &cup; blocked = PId</code>','<code>current &isin; ready</code>','<code>free = &empty;</code>'] },
      { scenario: 'A <span class="key">warehouse</span> with <span class="key">' + n + ' forklifts</span>. Current = ' + cur + '.', question: 'The partition means:', correct: '<code>{' + cur + '} &cup; ready &cup; blocked &cup; free = 1..' + n + '</code> with all pairwise disjoint', distractors: ['<code>ready &sube; blocked</code>','<code>free &cap; ready &ne; &empty;</code>','<code>{' + cur + '} &cap; free &ne; &empty;</code>'] },
      { scenario: 'A <span class="key">hospital</span> with <span class="key">' + n + ' beds</span>, no current patient.', question: 'When current = nullPId, the partition becomes:', correct: '<code>(&empty;, ready, blocked, free) partition PId</code> &mdash; {nullPId} \\ {nullPId} = &empty;', distractors: ['<code>({nullPId}, ready, blocked, free) partition PId</code>','<code>Partition is violated</code>','<code>ready = PId</code>'] },
      { scenario: 'An <span class="key">airport</span> with <span class="key">' + n + ' gates</span>. Gate 3 is in both ready and blocked.', question: 'Does this satisfy the partition?', correct: '<code>No &mdash; the four sets must be pairwise disjoint</code>', distractors: ['<code>Yes &mdash; overlap is allowed</code>','<code>Yes &mdash; if free compensates</code>','<code>Partition does not require disjointness</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Initialisation'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> system <span class="key">boots up</span>.', question: 'ASchedulerInit sets:', correct: '<code>current&prime; = nullPId, ready&prime; = &empty;, blocked&prime; = &empty;, free&prime; = PId</code>', distractors: ['<code>current&prime; = 1</code>','<code>ready&prime; = PId</code>','<code>free&prime; = &empty;</code>'] },
      { scenario: 'A <span class="key">hospital</span> scheduling system <span class="key">starts fresh</span>.', question: 'After ASchedulerInit:', correct: '<code>All processes are in free; no process is current, ready, or blocked</code>', distractors: ['<code>All processes are ready</code>','<code>Process 1 is current</code>','<code>Half are ready, half blocked</code>'] },
      { scenario: 'An <span class="key">airport</span> gate system <span class="key">initialises</span>.', question: 'The initial state has:', correct: '<code>free&prime; = PId</code> &mdash; every identifier starts in the free pool', distractors: ['<code>ready&prime; = PId</code>','<code>blocked&prime; = PId</code>','<code>free&prime; = &empty;</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> system <span class="key">powers on</span>.', question: 'Partition after init:', correct: '<code>(&empty;, &empty;, &empty;, PId) partition PId</code> &mdash; everything free', distractors: ['<code>(1, PId\\{1}, &empty;, &empty;)</code>','<code>(&empty;, PId, &empty;, &empty;)</code>','<code>Undefined</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['NullPId Convention'] = function() {
    var n = randInt(5, 12);
    var scenarios = [
      { scenario: 'A scheduler defines <code>nullPId == 0</code> and <code>PId == 1..' + n + '</code>.', question: 'Why is 0 used as the null marker?', correct: '<code>0 &notin; 1..' + n + '</code> so it cannot conflict with any real identifier', distractors: ['<code>0 is the first valid process</code>','<code>0 means "all processes"</code>','<code>0 is the kernel process</code>'] },
      { scenario: 'A <span class="key">print queue</span> has <span class="key">n = ' + n + '</span> job slots.', question: 'When current = nullPId:', correct: '<code>No process is using the processor &mdash; it is idle</code>', distractors: ['<code>Process 0 is running</code>','<code>The processor is destroyed</code>','<code>All processes are blocked</code>'] },
      { scenario: 'A <span class="key">hospital</span> with <span class="key">' + n + ' beds</span>.', question: '<code>OptPId == PId &cup; {nullPId}</code> allows current to hold:', correct: '<code>Any valid pid or 0 (meaning no current process)</code>', distractors: ['<code>Only valid pids, never 0</code>','<code>Only 0, never a valid pid</code>','<code>Negative numbers</code>'] },
      { scenario: 'A <span class="key">warehouse</span> with <span class="key">' + n + ' forklifts</span>.', question: 'nullPId is excluded from PId because:', correct: '<code>It is a sentinel, not an actual process identifier</code>', distractors: ['<code>It is reserved for the operating system</code>','<code>It represents an error state</code>','<code>It was arbitrarily chosen</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['NullPId Purpose'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">taxi fleet</span> dispatcher sees <span class="key">current = 0</span>.', question: 'What does nullPId = 0 indicate?', correct: '<code>No taxi is currently dispatched &mdash; the processor is idle</code>', distractors: ['<code>Taxi 0 is dispatched</code>','<code>The system has crashed</code>','<code>All taxis are blocked</code>'] },
      { scenario: 'An <span class="key">airport</span> shows <span class="key">current = nullPId</span>.', question: 'This means:', correct: '<code>No flight is on the runway &mdash; it is available for dispatch</code>', distractors: ['<code>Flight 0 is on the runway</code>','<code>The runway is closed</code>','<code>All flights are cancelled</code>'] },
      { scenario: 'A <span class="key">warehouse</span> dock display shows <span class="key">current = 0</span>.', question: 'nullPId == 0 serves as:', correct: '<code>A placeholder meaning "no process currently using the resource"</code>', distractors: ['<code>The default process identifier</code>','<code>An error code</code>','<code>The kernel process</code>'] },
      { scenario: 'A <span class="key">hospital</span> MRI shows <span class="key">current = nullPId</span>.', question: 'Purpose of nullPId:', correct: '<code>Distinguishes "idle processor" from "process 1..n is running"</code>', distractors: ['<code>Indicates a system error</code>','<code>Means all processes are destroyed</code>','<code>Signals a reboot is needed</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Operation Preconditions'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">taxi fleet</span>: all cabs are <span class="key">blocked or free</span>, ready = <code>&empty;</code>, current = nullPId.', question: 'Can ADispatch fire?', correct: '<code>No &mdash; pre ADispatch requires ready &ne; &empty;</code>', distractors: ['<code>Yes &mdash; dispatch always works</code>','<code>Yes &mdash; it picks from blocked</code>','<code>Yes &mdash; it creates a process first</code>'] },
      { scenario: 'A <span class="key">warehouse</span>: forklift 3 is <span class="key">current</span>. Another dispatch is attempted.', question: 'Can ADispatch fire?', correct: '<code>No &mdash; pre ADispatch requires current = nullPId</code>', distractors: ['<code>Yes &mdash; two can be current</code>','<code>Yes &mdash; it preempts forklift 3</code>','<code>Yes &mdash; if ready is non-empty</code>'] },
      { scenario: 'A <span class="key">hospital</span>: no patients are <span class="key">blocked</span>.', question: 'Can AWakeUp fire?', correct: '<code>No &mdash; pre AWakeUp requires the target pid &isin; blocked</code>', distractors: ['<code>Yes &mdash; it wakes from ready</code>','<code>Yes &mdash; it wakes from free</code>','<code>Yes &mdash; no precondition needed</code>'] },
      { scenario: 'An <span class="key">airport</span>: free = <code>&empty;</code>. A new flight requests creation.', question: 'Can ACreate fire?', correct: '<code>No &mdash; pre ACreate requires free &ne; &empty;</code>', distractors: ['<code>Yes &mdash; it takes from ready</code>','<code>Yes &mdash; it takes from blocked</code>','<code>Yes &mdash; creation needs no free slot</code>'] },
      { scenario: 'A <span class="key">print queue</span>: current = nullPId, no process is current.', question: 'Can ATimeOut fire?', correct: '<code>No &mdash; pre ATimeOut requires current &ne; nullPId</code>', distractors: ['<code>Yes &mdash; it times out the ready queue</code>','<code>Yes &mdash; timeout always applies</code>','<code>Yes &mdash; it blocks a ready process</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  // ===================== 21.3 Chains =====================

  window.conceptBank['Chain Definition'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">baggage belt</span> uses a <span class="key">linked list</span> of bag IDs.', question: 'A chain\'s links field has type:', correct: '<code>PId &#x2914; PId</code> &mdash; a finite injection', distractors: ['<code>PId &rarr; PId</code> &mdash; a total function','<code>&Nopf; &rarr; &Nopf;</code>','<code>PId &rarr; OptPId</code>'] },
      { scenario: 'A <span class="key">restaurant</span> wait list is a <span class="key">linked sequence</span> of party IDs.', question: 'Why must links be injective?', correct: '<code>Each element has at most one predecessor &mdash; no fan-in</code>', distractors: ['<code>For faster lookup</code>','<code>To allow cycles</code>','<code>Injectivity is not required</code>'] },
      { scenario: 'A <span class="key">taxi queue</span> is a <span class="key">singly linked list</span>.', question: 'A chain has components:', correct: '<code>start, end : OptPId; links : PId &#x2914; PId; set : &Popf; PId</code>', distractors: ['<code>Only start and end</code>','<code>links : PId &rarr; PId only</code>','<code>set : &Nopf; only</code>'] },
      { scenario: 'A <span class="key">warehouse</span> pick list is <span class="key">linked</span>.', question: 'The set component of a chain contains:', correct: '<code>All PIDs reachable from start through links</code>', distractors: ['<code>Only start and end</code>','<code>All PIDs in the system</code>','<code>The empty set always</code>'] },
      { scenario: 'An <span class="key">airport</span> departure queue is a <span class="key">chain of flights</span>.', question: 'Finite injection means:', correct: '<code>Partial, injective, finite domain &mdash; no two elements share a successor</code>', distractors: ['<code>Total and surjective</code>','<code>Infinite domain allowed</code>','<code>Duplicates in range permitted</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Chain Structure'] = function() {
    var ids = [2,3,4,5,6,7,8];
    var a = pick(ids); var b = pick(ids.filter(function(x){return x!==a;})); var c = pick(ids.filter(function(x){return x!==a && x!==b;}));
    var scenarios = [
      { scenario: 'A <span class="key">baggage belt</span>: <code>links = {' + a + ' &#8614; ' + b + ', ' + b + ' &#8614; ' + c + '}</code>.', question: 'What are start and end?', correct: '<code>start = ' + a + ', end = ' + c + '</code>', distractors: ['<code>start = ' + c + ', end = ' + a + '</code>','<code>start = ' + b + ', end = ' + b + '</code>','<code>start = nullPId, end = nullPId</code>'] },
      { scenario: 'A <span class="key">restaurant</span> wait list: <code>links = {' + a + ' &#8614; ' + b + '}</code>.', question: 'Start is in <code>dom links</code> but not <code>ran links</code>:', correct: '<code>start = ' + a + '</code>', distractors: ['<code>start = ' + b + '</code>','<code>start = nullPId</code>','<code>start = ' + a + ' &and; start = ' + b + '</code>'] },
      { scenario: 'A <span class="key">hospital</span> treatment queue: <code>links = {' + a + ' &#8614; ' + b + ', ' + b + ' &#8614; ' + c + '}</code>.', question: '<code>dom links</code> =', correct: '<code>{' + a + ', ' + b + '}</code>', distractors: ['<code>{' + b + ', ' + c + '}</code>','<code>{' + a + ', ' + c + '}</code>','<code>{' + a + ', ' + b + ', ' + c + '}</code>'] },
      { scenario: 'A <span class="key">taxi queue</span>: <code>links = {' + a + ' &#8614; ' + b + ', ' + b + ' &#8614; ' + c + '}</code>.', question: '<code>ran links</code> =', correct: '<code>{' + b + ', ' + c + '}</code>', distractors: ['<code>{' + a + ', ' + b + '}</code>','<code>{' + a + '}</code>','<code>{' + c + '}</code>'] },
      { scenario: 'A <span class="key">warehouse</span> pick order: <code>links = {' + a + ' &#8614; ' + b + ', ' + b + ' &#8614; ' + c + '}</code>.', question: 'End is in <code>ran links</code> but not <code>dom links</code>:', correct: '<code>end = ' + c + '</code>', distractors: ['<code>end = ' + a + '</code>','<code>end = ' + b + '</code>','<code>end = nullPId</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Push Operation'] = function() {
    var newPid = randInt(1, 10);
    var oldStart = randInt(1, 10);
    while (oldStart === newPid) oldStart = randInt(1, 10);
    var scenarios = [
      { scenario: 'A <span class="key">restaurant</span> wait list has start = ' + oldStart + '. New party <span class="key">' + newPid + '</span> joins the front.', question: 'PushNonEmpty sets:', correct: '<code>start&prime; = ' + newPid + ', links&prime; = links &cup; {' + newPid + ' &#8614; ' + oldStart + '}</code>', distractors: ['<code>end&prime; = ' + newPid + '</code>','<code>links unchanged</code>','<code>start&prime; = ' + oldStart + '</code>'] },
      { scenario: 'An <span class="key">empty</span> taxi queue. Cab <span class="key">' + newPid + '</span> is pushed.', question: 'PushEmpty sets:', correct: '<code>start&prime; = ' + newPid + ', end&prime; = ' + newPid + ', links&prime; = &empty;, set&prime; = {' + newPid + '}</code>', distractors: ['<code>links&prime; = {' + newPid + ' &#8614; ' + newPid + '}</code>','<code>start&prime; = nullPId</code>','<code>end&prime; = nullPId</code>'] },
      { scenario: 'A <span class="key">hospital</span> queue (start = ' + oldStart + '). Patient <span class="key">' + newPid + '</span> pushed to front.', question: 'After PushNonEmpty, the new link is:', correct: '<code>{' + newPid + ' &#8614; ' + oldStart + '}</code> added to links', distractors: ['<code>{' + oldStart + ' &#8614; ' + newPid + '}</code>','<code>No link added</code>','<code>{' + newPid + ' &#8614; nullPId}</code>'] },
      { scenario: 'A <span class="key">warehouse</span> pick list (non-empty). Item <span class="key">' + newPid + '</span> pushed.', question: 'Push is defined as:', correct: '<code>PushEmpty &or; PushNonEmpty</code>', distractors: ['<code>PushEmpty only</code>','<code>PushNonEmpty only</code>','<code>Pop</code>'] },
      { scenario: 'An <span class="key">airport</span> queue. Flight <span class="key">' + newPid + '</span> pushed to an empty chain.', question: 'After PushEmpty:', correct: '<code>start&prime; = end&prime; = ' + newPid + ' and links&prime; = &empty;</code>', distractors: ['<code>start&prime; = nullPId</code>','<code>links&prime; = {' + newPid + ' &#8614; ' + newPid + '}</code>','<code>set&prime; = &empty;</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Pop Operation'] = function() {
    var s = randInt(1, 10); var s2 = randInt(1, 10);
    while (s2 === s) s2 = randInt(1, 10);
    var scenarios = [
      { scenario: 'A <span class="key">restaurant</span> wait list has only party <span class="key">' + s + '</span> (singleton chain).', question: 'PopSingleton sets:', correct: '<code>start&prime; = nullPId, end&prime; = nullPId, links&prime; = &empty;, set&prime; = &empty;</code>', distractors: ['<code>start&prime; = ' + s + '</code>','<code>links&prime; = {' + s + ' &#8614; nullPId}</code>','<code>set&prime; = {' + s + '}</code>'] },
      { scenario: 'A <span class="key">taxi queue</span>: start = ' + s + ', links(' + s + ') = ' + s2 + '.', question: 'PopMultiple removes start. New start:', correct: '<code>start&prime; = ' + s2 + ', links&prime; = {' + s + '} &#x2A64; links</code> (domain anti-restriction)', distractors: ['<code>start&prime; = ' + s + '</code>','<code>start&prime; = nullPId</code>','<code>links unchanged</code>'] },
      { scenario: 'A <span class="key">hospital</span> treatment queue: only patient <span class="key">' + s + '</span>.', question: 'Pop from a singleton chain produces:', correct: '<code>An empty chain &mdash; start&prime; = end&prime; = nullPId</code>', distractors: ['<code>A chain with one element still</code>','<code>An error</code>','<code>start&prime; = ' + s + '</code>'] },
      { scenario: 'A <span class="key">warehouse</span> pick list: multiple items, start = ' + s + '.', question: 'Pop is defined as:', correct: '<code>PopSingleton &or; PopMultiple</code>', distractors: ['<code>PopSingleton only</code>','<code>PopMultiple only</code>','<code>Push</code>'] },
      { scenario: 'An <span class="key">airport</span> queue: start = ' + s + ', links = {' + s + ' &#8614; ' + s2 + '}.', question: 'PopMultiple returns which pid and removes it?', correct: '<code>' + s + ' (the start) &mdash; pid! = start</code>', distractors: ['<code>' + s2 + ' (the end)</code>','<code>nullPId</code>','<code>A random element</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Delete Operation'] = function() {
    var a = randInt(1,10); var b = randInt(1,10); var c = randInt(1,10);
    while (b===a) b = randInt(1,10);
    while (c===a || c===b) c = randInt(1,10);
    var scenarios = [
      { scenario: 'Chain: <span class="key">start = ' + a + '</span>, links = {' + a + ' &#8614; ' + b + ', ' + b + ' &#8614; ' + c + '}. Delete <span class="key">' + a + '</span> (the start).', question: 'DeleteStart acts like:', correct: '<code>Pop &mdash; removes start, advances to ' + b + '</code>', distractors: ['<code>Push</code>','<code>Removes the end</code>','<code>No change</code>'] },
      { scenario: 'Chain: start = ' + a + ', links = {' + a + ' &#8614; ' + b + ', ' + b + ' &#8614; ' + c + '}. Delete <span class="key">' + c + '</span> (the end).', question: 'DeleteEnd sets:', correct: '<code>end&prime; = ' + b + ', links&prime; = links with {' + b + ' &#8614; ' + c + '} removed</code>', distractors: ['<code>end&prime; = ' + a + '</code>','<code>end&prime; = nullPId</code>','<code>links unchanged</code>'] },
      { scenario: 'Chain: start = ' + a + ', links = {' + a + ' &#8614; ' + b + ', ' + b + ' &#8614; ' + c + '}. Delete <span class="key">' + b + '</span> (middle).', question: 'DeleteMiddle patches links by:', correct: '<code>Removing ' + b + ' and adding {' + a + ' &#8614; ' + c + '}</code>', distractors: ['<code>Just removing ' + b + ', no re-link</code>','<code>Removing all links</code>','<code>No change</code>'] },
      { scenario: 'A <span class="key">taxi queue</span> must remove cab <span class="key">' + b + '</span> from a 3-element chain.', question: 'Delete is defined as:', correct: '<code>DeleteStart &or; DeleteMiddle &or; DeleteEnd</code>', distractors: ['<code>DeleteStart only</code>','<code>Pop</code>','<code>Push</code>'] },
      { scenario: 'A <span class="key">hospital</span> removes patient <span class="key">' + a + '</span> who is the start of a chain.', question: 'DeleteStart when the chain has one element is equivalent to:', correct: '<code>Pop from a singleton &mdash; chain becomes empty</code>', distractors: ['<code>DeleteMiddle</code>','<code>DeleteEnd</code>','<code>No change</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Chain Invariant'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> pick list chain.', question: 'The chain invariant requires:', correct: '<code>All elements reachable from start via links; start &notin; ran links; end &notin; dom links</code>', distractors: ['<code>Only that links is non-empty</code>','<code>start = end always</code>','<code>No constraints on reachability</code>'] },
      { scenario: 'A <span class="key">hospital</span> queue with links = {3 &#8614; 5, 5 &#8614; 3}.', question: 'Does this satisfy the chain invariant?', correct: '<code>No &mdash; it forms a cycle; start cannot be reached without a cycle</code>', distractors: ['<code>Yes &mdash; cycles are allowed</code>','<code>Yes &mdash; if start = 3</code>','<code>Yes &mdash; injectivity is satisfied</code>'] },
      { scenario: 'A <span class="key">restaurant</span> chain where <span class="key">two elements share the same successor</span>.', question: 'Does links remain a finite injection?', correct: '<code>No &mdash; injectivity means each element in ran links has exactly one pre-image</code>', distractors: ['<code>Yes &mdash; sharing successors is fine</code>','<code>Yes &mdash; injections allow fan-in</code>','<code>Only if the chain is short</code>'] },
      { scenario: 'A <span class="key">taxi queue</span> chain.', question: 'set must equal:', correct: '<code>dom links &cup; {end} when non-empty (all reachable from start)</code>', distractors: ['<code>dom links only</code>','<code>ran links only</code>','<code>&empty; always</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Empty Chain'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">print queue</span> has <span class="key">no pending jobs</span>.', question: 'An empty chain has:', correct: '<code>start = nullPId, end = nullPId, links = &empty;, set = &empty;</code>', distractors: ['<code>start = 1, end = 1</code>','<code>links = {1 &#8614; 1}</code>','<code>set = {nullPId}</code>'] },
      { scenario: 'A <span class="key">taxi stand</span> has <span class="key">no cabs waiting</span>.', question: 'For an empty chain:', correct: '<code>start = end = nullPId and links = set = &empty;</code>', distractors: ['<code>start &ne; nullPId</code>','<code>links has one element</code>','<code>set = {0}</code>'] },
      { scenario: 'A <span class="key">warehouse</span> has <span class="key">nothing in the pick queue</span>.', question: 'The invariant for an empty chain reduces to:', correct: '<code>Trivially satisfied &mdash; no links, no elements, both endpoints null</code>', distractors: ['<code>Violated &mdash; a chain must have at least one element</code>','<code>start = 1</code>','<code>set = PId</code>'] },
      { scenario: 'A <span class="key">hospital</span> waiting room is <span class="key">completely empty</span>.', question: 'An empty chain\'s set component:', correct: '<code>set = &empty;</code>', distractors: ['<code>set = {nullPId}</code>','<code>set = PId</code>','<code>set is undefined</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Singleton Chain'] = function() {
    var pid = randInt(1, 10);
    var scenarios = [
      { scenario: 'A <span class="key">restaurant</span> has exactly <span class="key">one party</span> (' + pid + ') waiting.', question: 'A singleton chain has:', correct: '<code>start = end = ' + pid + ', links = &empty;, set = {' + pid + '}</code>', distractors: ['<code>links = {' + pid + ' &#8614; ' + pid + '}</code>','<code>start = ' + pid + ', end = nullPId</code>','<code>set = &empty;</code>'] },
      { scenario: 'A <span class="key">taxi queue</span> with one cab <span class="key">' + pid + '</span>.', question: 'In a singleton chain:', correct: '<code>start = end &ne; nullPId and links = &empty;</code>', distractors: ['<code>start &ne; end</code>','<code>links has one entry</code>','<code>start = nullPId</code>'] },
      { scenario: 'A <span class="key">hospital</span> queue with patient <span class="key">' + pid + '</span> alone.', question: 'How does a singleton differ from empty?', correct: '<code>start = end = ' + pid + ' (a real pid) instead of nullPId</code>', distractors: ['<code>No difference</code>','<code>links is non-empty in singleton</code>','<code>set is empty in both</code>'] },
      { scenario: 'A <span class="key">warehouse</span> pick list with one item <span class="key">' + pid + '</span>.', question: 'Singleton chain set:', correct: '<code>set = {' + pid + '}</code>', distractors: ['<code>set = &empty;</code>','<code>set = PId</code>','<code>set = {nullPId}</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Domain Anti-Restriction'] = function() {
    var a = randInt(1,10); var b = randInt(1,10); var c = randInt(1,10);
    while (b===a) b = randInt(1,10);
    while (c===a || c===b) c = randInt(1,10);
    var scenarios = [
      { scenario: '<code>links = {' + a + ' &#8614; ' + b + ', ' + b + ' &#8614; ' + c + '}</code>. Apply <span class="key">{' + a + '} &#x2A64; links</span>.', question: 'Result:', correct: '<code>{' + b + ' &#8614; ' + c + '}</code> &mdash; ' + a + ' removed from domain', distractors: ['<code>{' + a + ' &#8614; ' + b + '}</code>','<code>&empty;</code>','<code>{' + a + ' &#8614; ' + b + ', ' + b + ' &#8614; ' + c + '}</code>'] },
      { scenario: '<code>links = {' + a + ' &#8614; ' + b + ', ' + b + ' &#8614; ' + c + '}</code>. Apply <span class="key">{' + b + '} &#x2A64; links</span>.', question: 'Result:', correct: '<code>{' + a + ' &#8614; ' + b + '}</code> &mdash; ' + b + ' removed from domain', distractors: ['<code>{' + b + ' &#8614; ' + c + '}</code>','<code>&empty;</code>','<code>links unchanged</code>'] },
      { scenario: 'A <span class="key">taxi queue</span> removes cab <span class="key">' + a + '</span> from domain of links.', question: 'Domain anti-restriction <code>{' + a + '} &#x2A64; links</code> means:', correct: '<code>Remove all pairs whose first element is ' + a + '</code>', distractors: ['<code>Remove all pairs whose second element is ' + a + '</code>','<code>Add ' + a + ' to the domain</code>','<code>No change</code>'] },
      { scenario: '<code>links = {' + a + ' &#8614; ' + b + '}</code>. Apply <span class="key">{' + a + '} &#x2A64; links</span>.', question: 'Result:', correct: '<code>&empty;</code> &mdash; only pair removed', distractors: ['<code>{' + a + ' &#8614; ' + b + '}</code>','<code>{' + b + ' &#8614; ' + a + '}</code>','<code>{nullPId &#8614; ' + b + '}</code>'] },
      { scenario: 'A <span class="key">hospital</span> chain removes patient <span class="key">' + b + '</span> via domain anti-restriction.', question: '<code>{' + b + '} &#x2A64; f</code> removes:', correct: '<code>Every pair (x, y) in f where x = ' + b + '</code>', distractors: ['<code>Every pair where y = ' + b + '</code>','<code>All pairs</code>','<code>Nothing</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Reachability'] = function() {
    var a = randInt(1,10); var b = randInt(1,10); var c = randInt(1,10);
    while (b===a) b = randInt(1,10);
    while (c===a || c===b) c = randInt(1,10);
    var scenarios = [
      { scenario: '<code>links = {' + a + ' &#8614; ' + b + ', ' + b + ' &#8614; ' + c + '}</code>, start = ' + a + '.', question: 'Is ' + c + ' reachable from start?', correct: '<code>Yes &mdash; ' + a + ' &rarr; ' + b + ' &rarr; ' + c + ' via links<sup>+</sup></code>', distractors: ['<code>No &mdash; ' + c + ' is not in dom links</code>','<code>Only if a direct link exists</code>','<code>Reachability is undefined</code>'] },
      { scenario: 'A <span class="key">warehouse</span> chain: start = ' + a + ', links = {' + a + ' &#8614; ' + b + '}.', question: '<code>links<sup>+</sup></code> is the:', correct: '<code>Transitive closure of links &mdash; all paths of one or more steps</code>', distractors: ['<code>Reflexive closure</code>','<code>Inverse of links</code>','<code>Domain of links</code>'] },
      { scenario: 'A <span class="key">hospital</span> queue: <code>links = {' + a + ' &#8614; ' + b + ', ' + b + ' &#8614; ' + c + '}</code>.', question: 'set should contain:', correct: '<code>{' + a + ', ' + b + ', ' + c + '}</code> &mdash; all elements reachable from start', distractors: ['<code>{' + a + '}</code> only','<code>{' + a + ', ' + b + '}</code> only','<code>&empty;</code>'] },
      { scenario: 'A <span class="key">taxi queue</span>: start = ' + a + ', links = <code>&empty;</code>.', question: 'set of a singleton chain:', correct: '<code>{' + a + '}</code> &mdash; start itself is the only element', distractors: ['<code>&empty;</code>','<code>PId</code>','<code>{nullPId}</code>'] },
      { scenario: 'A <span class="key">restaurant</span> chain: start = ' + a + '.', question: 'The transitive closure <code>links<sup>+</sup></code> ensures:', correct: '<code>Every element in the chain is reachable from start in finitely many steps</code>', distractors: ['<code>Only direct successors count</code>','<code>Cycles are required</code>','<code>Nothing &mdash; reachability is optional</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  // ===================== 21.4 Design =====================

  window.conceptBank['Concrete Scheduler State'] = function() {
    var scenarios = [
      { scenario: 'An <span class="key">airport</span> uses three vehicle pools and a <span class="key">shared next-pointer map</span>.', question: 'What is the type of chainstore?', correct: '<code>PId &rarr; OptPId</code> &mdash; total function from every PId to an optional next-pointer', distractors: ['<code>PId &#x2914; PId</code>','<code>OptPId &rarr; PId</code>','<code>&Nopf; &rarr; &Nopf;</code>'] },
      { scenario: 'A <span class="key">warehouse</span> CScheduler stores <span class="key">three chains plus a shared array</span>.', question: 'CScheduler includes:', correct: '<code>ReadyChain, BlockedChain, FreeChain, current : OptPId, chainstore : PId &rarr; OptPId</code>', distractors: ['<code>Only ready, blocked, free as sets</code>','<code>One chain only</code>','<code>No chainstore</code>'] },
      { scenario: 'A <span class="key">hospital</span> concrete scheduler uses <span class="key">linked lists</span> instead of sets.', question: 'The concrete state differs from abstract by:', correct: '<code>Replacing sets with chains and adding a shared chainstore</code>', distractors: ['<code>Using sets directly</code>','<code>Removing all invariants</code>','<code>No difference</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> CScheduler with chainstore.', question: 'Each PId entry in chainstore holds:', correct: '<code>The next PId in its chain, or nullPId if it is the end</code>', distractors: ['<code>The previous PId</code>','<code>The chain name</code>','<code>A boolean flag</code>'] },
      { scenario: 'A <span class="key">restaurant</span> concrete scheduler.', question: 'Why use a chainstore instead of separate link maps?', correct: '<code>A single array indexed by PId is more implementation-friendly</code>', distractors: ['<code>Separate maps are always better</code>','<code>Chainstore is less efficient</code>','<code>No reason &mdash; it is arbitrary</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Chain Renaming'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">hospital</span> needs three separate chain instances.', question: 'ReadyChain is created by:', correct: '<code>Chain[rstart/start, rend/end, rlinks/links, rset/set]</code>', distractors: ['<code>Chain with no changes</code>','<code>Deleting Chain and writing a new schema</code>','<code>Chain[start/rstart]</code> (reversed)'] },
      { scenario: 'A <span class="key">warehouse</span> has three pools, each needing its own chain.', question: 'Why rename chain components?', correct: '<code>To avoid name clashes when including multiple chains in one schema</code>', distractors: ['<code>For aesthetics only</code>','<code>Renaming changes the invariant</code>','<code>Only one chain is needed</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> uses BlockedChain.', question: 'BlockedChain renames:', correct: '<code>[bstart/start, bend/end, blinks/links, bset/set]</code>', distractors: ['<code>[rstart/start, ...]</code> (ready prefix)','<code>[fstart/start, ...]</code> (free prefix)','<code>No renaming needed</code>'] },
      { scenario: 'An <span class="key">airport</span> FreeChain uses prefix f.', question: 'FreeChain components:', correct: '<code>fstart, fend, flinks, fset</code>', distractors: ['<code>rstart, rend, rlinks, rset</code>','<code>bstart, bend, blinks, bset</code>','<code>start, end, links, set</code>'] },
      { scenario: 'A <span class="key">restaurant</span> includes all three renamed chains.', question: 'Schema renaming preserves:', correct: '<code>All invariants and structure under the new names</code>', distractors: ['<code>Nothing &mdash; invariants must be rewritten</code>','<code>Only the type, not the invariant</code>','<code>The name but not the structure</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Renaming Purpose'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> CScheduler includes ReadyChain, BlockedChain, and FreeChain.', question: 'Why is schema renaming needed?', correct: '<code>Three Chain instances would have name clashes on start, end, links, set</code>', distractors: ['<code>Renaming is optional and cosmetic</code>','<code>Only one chain is ever included</code>','<code>Z does not support multiple schema inclusions</code>'] },
      { scenario: 'A <span class="key">hospital</span> scheduler includes three chain schemas.', question: 'Renaming achieves:', correct: '<code>Distinct field names (rstart, bstart, fstart) so all three coexist</code>', distractors: ['<code>Different invariants for each chain</code>','<code>Faster execution</code>','<code>Nothing useful</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> needs separate ready, blocked, and free chains.', question: 'Without renaming:', correct: '<code>Including Chain three times would merge the fields, losing distinction</code>', distractors: ['<code>Everything works fine</code>','<code>Only two chains clash</code>','<code>Z automatically renames</code>'] },
      { scenario: 'An <span class="key">airport</span> design uses the Chain schema as a blueprint.', question: 'Renaming is analogous to:', correct: '<code>Instantiating a class template with different variable names</code>', distractors: ['<code>Deleting the original class</code>','<code>Copying code without changes</code>','<code>Inheriting without overriding</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Three Chains'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">hospital</span> concrete scheduler.', question: 'The three chains represent:', correct: '<code>ReadyChain (waiting patients), BlockedChain (held patients), FreeChain (empty beds)</code>', distractors: ['<code>Only one chain for all pools</code>','<code>Two chains plus a set</code>','<code>Four chains including current</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> CScheduler.', question: 'How many chain instances?', correct: '<code>Three: one for ready, one for blocked, one for free</code>', distractors: ['<code>One</code>','<code>Two</code>','<code>Four</code>'] },
      { scenario: 'A <span class="key">warehouse</span> uses chains for its process pools.', question: 'Current is stored as:', correct: '<code>A single OptPId, not as a chain</code>', distractors: ['<code>A fourth chain</code>','<code>Part of ReadyChain</code>','<code>Part of FreeChain</code>'] },
      { scenario: 'An <span class="key">airport</span> concrete scheduler design.', question: 'Each abstract set is replaced by:', correct: '<code>A chain (linked list) with start, end, links, and set components</code>', distractors: ['<code>An array of booleans</code>','<code>A single integer counter</code>','<code>Nothing &mdash; sets are kept as-is</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Concrete Operations'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">taxi fleet</span>: CDispatch pops from the ready chain.', question: 'CDispatch combines:', correct: '<code>Pop from ReadyChain + set current&prime; to the popped pid</code>', distractors: ['<code>Push to ReadyChain</code>','<code>Delete from FreeChain</code>','<code>Pop from BlockedChain</code>'] },
      { scenario: 'A <span class="key">warehouse</span>: CTimeOut pushes current to ready chain.', question: 'CTimeOut uses:', correct: '<code>Push current to ReadyChain + set current&prime; = nullPId</code>', distractors: ['<code>Pop from ReadyChain</code>','<code>Push to BlockedChain</code>','<code>Delete from FreeChain</code>'] },
      { scenario: 'A <span class="key">hospital</span>: CBlock pushes current to blocked chain.', question: 'CBlock uses:', correct: '<code>Push current to BlockedChain + set current&prime; = nullPId</code>', distractors: ['<code>Push to ReadyChain</code>','<code>Pop from BlockedChain</code>','<code>Push to FreeChain</code>'] },
      { scenario: 'An <span class="key">airport</span>: CWakeUp moves a flight from blocked to ready.', question: 'CWakeUp uses:', correct: '<code>Delete from BlockedChain + Push to ReadyChain</code>', distractors: ['<code>Pop from ReadyChain</code>','<code>Push to BlockedChain</code>','<code>Delete from FreeChain</code>'] },
      { scenario: 'A <span class="key">restaurant</span>: CCreate takes from free and adds to ready.', question: 'CCreate uses:', correct: '<code>Delete from FreeChain + Push to ReadyChain</code>', distractors: ['<code>Pop from ReadyChain</code>','<code>Push to FreeChain</code>','<code>Delete from BlockedChain</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Chainstore Invariant'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> CScheduler has a single <span class="key">chainstore array</span>.', question: 'The chainstore invariant requires:', correct: '<code>Each chain\'s links can be recovered from chainstore via domain restriction</code>', distractors: ['<code>Chainstore is independent of the chains</code>','<code>Chainstore equals links directly</code>','<code>Chainstore is always empty</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> with chainstore : PId &rarr; OptPId.', question: 'rlinks is recovered by:', correct: '<code>rset &#x25C1; chainstore &mdash; domain restriction to ready set</code>', distractors: ['<code>chainstore directly</code>','<code>ran chainstore</code>','<code>chainstore \\ rset</code>'] },
      { scenario: 'A <span class="key">hospital</span> chainstore maps every PId to a next-pointer.', question: 'If pid p is in the blocked chain, chainstore(p) gives:', correct: '<code>The next pid in the blocked chain (or nullPId if p is bend)</code>', distractors: ['<code>The next pid in the ready chain</code>','<code>The chain name</code>','<code>Undefined</code>'] },
      { scenario: 'An <span class="key">airport</span> chainstore.', question: 'The three separate link maps are combined into:', correct: '<code>One total function chainstore, partitioned by which chain each PId belongs to</code>', distractors: ['<code>Three separate arrays</code>','<code>A single boolean array</code>','<code>Nothing &mdash; they remain separate</code>'] },
      { scenario: 'A <span class="key">restaurant</span> chainstore with 10 PIDs.', question: 'Every PId has an entry because:', correct: '<code>chainstore is a total function from PId to OptPId</code>', distractors: ['<code>It is partial &mdash; some PIDs have no entry</code>','<code>Only chain members have entries</code>','<code>It is undefined for free PIDs</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['CSchedulerInit'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> concrete scheduler <span class="key">boots up</span>.', question: 'CSchedulerInit sets:', correct: '<code>current&prime; = nullPId, ready and blocked chains empty, free chain contains all PIDs</code>', distractors: ['<code>All chains empty</code>','<code>Ready chain contains all PIDs</code>','<code>current&prime; = 1</code>'] },
      { scenario: 'A <span class="key">hospital</span> CScheduler <span class="key">initialises</span>.', question: 'After CSchedulerInit:', correct: '<code>FreeChain holds all PIDs linked together; ReadyChain and BlockedChain are empty</code>', distractors: ['<code>ReadyChain holds all PIDs</code>','<code>All chains are empty</code>','<code>BlockedChain holds all PIDs</code>'] },
      { scenario: 'An <span class="key">airport</span> system <span class="key">starts</span>.', question: 'CSchedulerInit mirrors ASchedulerInit by:', correct: '<code>Placing all processes in the free chain (= free&prime; = PId abstractly)</code>', distractors: ['<code>Placing all in ready</code>','<code>Setting current to 1</code>','<code>Leaving all chains undefined</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> <span class="key">powers on</span>.', question: 'The chainstore after init:', correct: '<code>Encodes the free chain linking all PIDs; ready and blocked portions are empty</code>', distractors: ['<code>All entries are nullPId</code>','<code>Chainstore is undefined</code>','<code>All entries point to PId 1</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['CDispatch'] = function() {
    var pid = randInt(1, 10);
    var scenarios = [
      { scenario: 'A <span class="key">taxi fleet</span>: current = nullPId, ready chain has <span class="key">cab ' + pid + '</span> at the start.', question: 'CDispatch pops from ready chain. current&prime; =', correct: '<code>' + pid + '</code> &mdash; the popped pid becomes current', distractors: ['<code>nullPId</code>','<code>0</code>','<code>A random pid from blocked</code>'] },
      { scenario: 'A <span class="key">warehouse</span> dock is free. Ready chain front is <span class="key">forklift ' + pid + '</span>.', question: 'CDispatch is equivalent to:', correct: '<code>Pop(ReadyChain) &and; current&prime; = pid!</code>', distractors: ['<code>Push(ReadyChain)</code>','<code>Delete(BlockedChain)</code>','<code>Pop(FreeChain)</code>'] },
      { scenario: 'A <span class="key">hospital</span> MRI idle. Ready chain start = <span class="key">' + pid + '</span>.', question: 'After CDispatch, the ready chain:', correct: '<code>Has its start removed (popped); current&prime; = ' + pid + '</code>', distractors: ['<code>Is unchanged</code>','<code>Gains a new element</code>','<code>Becomes empty regardless of size</code>'] },
      { scenario: 'An <span class="key">airport</span> runway clear. CDispatch fires.', question: 'CDispatch requires:', correct: '<code>current = nullPId &and; rset &ne; &empty;</code> (ready chain non-empty)', distractors: ['<code>current &ne; nullPId</code>','<code>rset = &empty;</code>','<code>bset &ne; &empty;</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['CTimeOut and CBlock'] = function() {
    var cur = randInt(1, 10);
    var scenarios = [
      { scenario: 'A <span class="key">taxi</span> ' + cur + ' gets a <span class="key">time slice expiry</span>. CTimeOut fires.', question: 'CTimeOut pushes current to:', correct: '<code>ReadyChain &mdash; Push(' + cur + ', ReadyChain) &and; current&prime; = nullPId</code>', distractors: ['<code>BlockedChain</code>','<code>FreeChain</code>','<code>No chain &mdash; current stays</code>'] },
      { scenario: 'A <span class="key">warehouse</span> forklift ' + cur + ' <span class="key">requests I/O</span>. CBlock fires.', question: 'CBlock pushes current to:', correct: '<code>BlockedChain &mdash; Push(' + cur + ', BlockedChain) &and; current&prime; = nullPId</code>', distractors: ['<code>ReadyChain</code>','<code>FreeChain</code>','<code>No chain</code>'] },
      { scenario: 'A <span class="key">hospital</span> patient ' + cur + ' on the MRI. Timer <span class="key">interrupt</span> fires.', question: 'CTimeOut vs CBlock difference:', correct: '<code>CTimeOut pushes to ReadyChain; CBlock pushes to BlockedChain</code>', distractors: ['<code>No difference</code>','<code>CTimeOut destroys; CBlock blocks</code>','<code>CTimeOut pops; CBlock pushes</code>'] },
      { scenario: 'An <span class="key">airport</span> flight ' + cur + ' <span class="key">needs de-icing</span> (external resource).', question: 'CBlock sets:', correct: '<code>current&prime; = nullPId, ' + cur + ' pushed to front of BlockedChain</code>', distractors: ['<code>current&prime; = ' + cur + '</code>','<code>' + cur + ' pushed to ReadyChain</code>','<code>' + cur + ' pushed to FreeChain</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['CWakeUp and CCreate'] = function() {
    var blkPid = randInt(1, 10);
    var freePid = randInt(1, 10);
    var scenarios = [
      { scenario: 'A <span class="key">hospital</span> patient ' + blkPid + ' gets <span class="key">lab results back</span>.', question: 'CWakeUp:', correct: '<code>Delete ' + blkPid + ' from BlockedChain, Push ' + blkPid + ' to ReadyChain</code>', distractors: ['<code>Pop from ReadyChain</code>','<code>Push to BlockedChain</code>','<code>Delete from FreeChain</code>'] },
      { scenario: 'A <span class="key">warehouse</span> hires operator ' + freePid + ' from the <span class="key">free pool</span>.', question: 'CCreate:', correct: '<code>Delete ' + freePid + ' from FreeChain, Push ' + freePid + ' to ReadyChain</code>', distractors: ['<code>Pop from BlockedChain</code>','<code>Push to FreeChain</code>','<code>Delete from ReadyChain</code>'] },
      { scenario: 'A <span class="key">taxi</span> ' + blkPid + ' finishes <span class="key">repair</span>.', question: 'CWakeUp uses which chain operations?', correct: '<code>Delete(BlockedChain) + Push(ReadyChain)</code>', distractors: ['<code>Pop(ReadyChain) + Push(BlockedChain)</code>','<code>Pop(FreeChain)</code>','<code>Push(BlockedChain) only</code>'] },
      { scenario: 'An <span class="key">airport</span> registers a <span class="key">new flight</span> from the free pool.', question: 'CCreate uses:', correct: '<code>Delete from FreeChain + Push to ReadyChain</code>', distractors: ['<code>Pop from ReadyChain</code>','<code>Delete from BlockedChain</code>','<code>Push to FreeChain</code>'] },
      { scenario: 'A <span class="key">restaurant</span> wakes a <span class="key">held reservation</span> ' + blkPid + '.', question: 'After CWakeUp, ' + blkPid + ' is in:', correct: '<code>ReadyChain (moved from BlockedChain)</code>', distractors: ['<code>BlockedChain still</code>','<code>FreeChain</code>','<code>current</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['CDestroy'] = function() {
    var pid = randInt(1, 10);
    var scenarios = [
      { scenario: 'A <span class="key">taxi</span> ' + pid + ' is <span class="key">decommissioned</span> from the ready chain.', question: 'CDestroyReady:', correct: '<code>Delete ' + pid + ' from ReadyChain, Push ' + pid + ' to FreeChain</code>', distractors: ['<code>Delete from FreeChain</code>','<code>Push to ReadyChain</code>','<code>Pop from BlockedChain</code>'] },
      { scenario: 'A <span class="key">hospital</span> removes bed ' + pid + ' from the <span class="key">blocked chain</span>.', question: 'CDestroyBlocked:', correct: '<code>Delete ' + pid + ' from BlockedChain, Push ' + pid + ' to FreeChain</code>', distractors: ['<code>Delete from ReadyChain</code>','<code>Push to BlockedChain</code>','<code>Pop from FreeChain</code>'] },
      { scenario: 'A <span class="key">warehouse</span> forklift ' + pid + ' is current and gets <span class="key">retired</span>.', question: 'CDestroyCurrent:', correct: '<code>current&prime; = nullPId, Push ' + pid + ' to FreeChain</code>', distractors: ['<code>current&prime; = ' + pid + '</code>','<code>Push to ReadyChain</code>','<code>Delete from FreeChain</code>'] },
      { scenario: 'An <span class="key">airport</span> cancels flight ' + pid + ' from <span class="key">any state</span>.', question: 'CDestroy is:', correct: '<code>CDestroyCurrent &or; CDestroyReady &or; CDestroyBlocked</code>', distractors: ['<code>CDestroyCurrent only</code>','<code>CDestroyReady only</code>','<code>A single operation for all</code>'] },
      { scenario: 'A <span class="key">restaurant</span> cancels reservation ' + pid + '.', question: 'Regardless of which chain, CDestroy always ends with:', correct: '<code>Push to FreeChain &mdash; the pid returns to the free pool</code>', distractors: ['<code>Push to ReadyChain</code>','<code>Push to BlockedChain</code>','<code>The pid is removed from the system entirely</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  // ===================== 21.5 Correctness =====================

  window.conceptBank['Retrieve Relation'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> CScheduler with three chains maps to AScheduler with three sets.', question: 'RetrieveSched maps:', correct: '<code>ready = rset, blocked = bset, free = fset</code>', distractors: ['<code>ready = rlinks</code>','<code>blocked = fset</code>','<code>free = rset</code>'] },
      { scenario: 'A <span class="key">hospital</span> concrete scheduler uses chains; the abstract uses sets.', question: 'The retrieve relation extracts:', correct: '<code>The set component from each chain to match the abstract set</code>', distractors: ['<code>The links component</code>','<code>The start and end only</code>','<code>The chainstore directly</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> CScheduler.', question: 'RetrieveSched connects which components?', correct: '<code>rset &harr; ready, bset &harr; blocked, fset &harr; free (current is shared)</code>', distractors: ['<code>rlinks &harr; ready</code>','<code>rstart &harr; current</code>','<code>chainstore &harr; PId</code>'] },
      { scenario: 'An <span class="key">airport</span> refinement proof.', question: 'The retrieve relation is a function because:', correct: '<code>&forall; CScheduler &bull; &exist;<sub>1</sub> AScheduler &bull; RetrieveSched</code> &mdash; each concrete state maps to exactly one abstract state', distractors: ['<code>Multiple abstract states per concrete</code>','<code>It is a relation, not a function</code>','<code>No proof is needed</code>'] },
      { scenario: 'A <span class="key">restaurant</span> concrete design.', question: 'Without the retrieve relation:', correct: '<code>There is no formal bridge between concrete and abstract &mdash; correctness is unverifiable</code>', distractors: ['<code>Correctness is trivially true</code>','<code>The abstract spec is unnecessary</code>','<code>Operations still compose correctly</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Retrieve Relation Purpose'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> uses chains concretely and sets abstractly.', question: 'The primary purpose of the retrieve relation is:', correct: '<code>Map each concrete state to its corresponding abstract state</code>', distractors: ['<code>Optimise the concrete implementation</code>','<code>Replace the abstract specification</code>','<code>Generate test cases</code>'] },
      { scenario: 'A <span class="key">hospital</span> data refinement.', question: 'The retrieve relation serves as:', correct: '<code>The bridge between design and specification</code>', distractors: ['<code>A performance benchmark</code>','<code>A compilation step</code>','<code>A debugging tool</code>'] },
      { scenario: 'An <span class="key">airport</span> scheduler proof.', question: 'Every proof obligation references:', correct: '<code>The retrieve relation &mdash; it connects all concrete/abstract pairs</code>', distractors: ['<code>Only the initialisation</code>','<code>Only the operations</code>','<code>Nothing &mdash; proofs are independent</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> refinement.', question: 'The retrieve maps:', correct: '<code>Concrete chain components to abstract set components</code>', distractors: ['<code>Abstract to concrete only</code>','<code>Concrete to concrete</code>','<code>Abstract to abstract</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Initialisation Correctness'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> CSchedulerInit sets all PIDs in FreeChain.', question: 'Initialisation correctness requires:', correct: '<code>CSchedulerInit &and; Retrieve&prime; &rArr; ASchedulerInit</code>', distractors: ['<code>CSchedulerInit &rArr; ASchedulerInit</code> (no Retrieve)','<code>ASchedulerInit &rArr; CSchedulerInit</code>','<code>Retrieve &rArr; CSchedulerInit</code>'] },
      { scenario: 'A <span class="key">hospital</span> system boots. Concrete: all in free chain. Abstract: free&prime; = PId.', question: 'We must show:', correct: '<code>Applying Retrieve&prime; to the concrete init state yields the abstract init state</code>', distractors: ['<code>The abstract init implies the concrete init</code>','<code>No proof is needed for initialisation</code>','<code>Only operations need correctness proofs</code>'] },
      { scenario: 'An <span class="key">airport</span> CSchedulerInit: rset&prime; = &empty;, bset&prime; = &empty;, fset&prime; = PId.', question: 'Via Retrieve: ready&prime; = rset&prime; = &empty;, blocked&prime; = bset&prime; = &empty;, free&prime; = fset&prime; = PId.', correct: '<code>This matches ASchedulerInit exactly &mdash; initialisation correctness holds</code>', distractors: ['<code>It does not match</code>','<code>Only ready matches</code>','<code>The proof fails</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> init proof.', question: 'The pattern is:', correct: '<code>Show concrete init + after-Retrieve implies abstract init</code>', distractors: ['<code>Show abstract init implies concrete init</code>','<code>Skip &mdash; init needs no proof</code>','<code>Show operations correct first</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Operation Applicability'] = function() {
    var ops = pick(['Dispatch','TimeOut','Block','WakeUp','Create','Destroy']);
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> runs C' + ops + '.', question: 'Operation applicability requires:', correct: '<code>pre A' + ops + ' &and; Retrieve &rArr; pre C' + ops + '</code>', distractors: ['<code>pre C' + ops + ' &rArr; pre A' + ops + '</code>','<code>A' + ops + ' &rArr; C' + ops + '</code>','<code>No precondition check needed</code>'] },
      { scenario: 'A <span class="key">hospital</span> scheduler operation.', question: 'Applicability means:', correct: '<code>Whenever the abstract operation can fire and Retrieve holds, the concrete operation can also fire</code>', distractors: ['<code>Concrete can fire implies abstract can fire</code>','<code>Both always fire</code>','<code>Neither needs preconditions</code>'] },
      { scenario: 'An <span class="key">airport</span> C' + ops + ' proof.', question: 'If pre A' + ops + ' holds and Retrieve holds, then:', correct: '<code>pre C' + ops + ' must also hold</code>', distractors: ['<code>pre C' + ops + ' may fail</code>','<code>The proof is skipped</code>','<code>Only Retrieve needs to hold</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> scheduler.', question: 'Why is applicability needed?', correct: '<code>To ensure the concrete system never refuses an operation the abstract spec allows</code>', distractors: ['<code>To ensure concrete allows more operations</code>','<code>It is optional</code>','<code>To prove termination</code>'] },
      { scenario: 'A <span class="key">restaurant</span> scheduler proof.', question: 'Applicability is also called:', correct: '<code>Precondition preservation &mdash; abstract preconditions transfer to concrete</code>', distractors: ['<code>Postcondition preservation</code>','<code>Invariant preservation</code>','<code>Termination proof</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Operation Correctness'] = function() {
    var ops = pick(['Dispatch','TimeOut','Block','WakeUp','Create','Destroy']);
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> proves C' + ops + ' correct.', question: 'Operation correctness requires:', correct: '<code>pre A' + ops + ' &and; Retrieve &and; C' + ops + ' &and; Retrieve&prime; &rArr; A' + ops + '</code>', distractors: ['<code>C' + ops + ' &rArr; A' + ops + '</code>','<code>A' + ops + ' &rArr; C' + ops + '</code>','<code>Retrieve only</code>'] },
      { scenario: 'A <span class="key">hospital</span> operation proof.', question: 'Correctness means:', correct: '<code>If we start in a related pair, run the concrete op, and retrieve again, we get the abstract op result</code>', distractors: ['<code>Concrete and abstract produce identical states</code>','<code>Only the abstract op matters</code>','<code>No after-Retrieve is needed</code>'] },
      { scenario: 'An <span class="key">airport</span> C' + ops + ' proof.', question: 'The four conjuncts on the left are:', correct: '<code>pre A' + ops + ', Retrieve, C' + ops + ', Retrieve&prime;</code>', distractors: ['<code>pre C' + ops + ', C' + ops + '</code>','<code>A' + ops + ', C' + ops + '</code>','<code>Retrieve, Retrieve&prime;</code> only'] },
      { scenario: 'A <span class="key">taxi fleet</span> correctness proof.', question: 'Why is Retrieve&prime; (after-state) needed?', correct: '<code>To ensure the concrete after-state still maps to a valid abstract after-state</code>', distractors: ['<code>It is optional</code>','<code>Only the before-state matters</code>','<code>Retrieve&prime; is the same as Retrieve</code>'] },
      { scenario: 'A <span class="key">restaurant</span> operation.', question: 'If correctness fails, it means:', correct: '<code>The concrete operation does not faithfully implement the abstract operation</code>', distractors: ['<code>The abstract spec is wrong</code>','<code>The retrieve is correct but operations differ</code>','<code>Nothing &mdash; correctness is optional</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Total Function Proof'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> refinement.', question: 'The total function proof shows:', correct: '<code>&forall; CScheduler &bull; &exist;<sub>1</sub> AScheduler &bull; RetrieveSched</code> &mdash; exactly one abstract state per concrete', distractors: ['<code>&exist; CScheduler &bull; &forall; AScheduler</code>','<code>Multiple abstract states per concrete</code>','<code>No abstract state for some concrete states</code>'] },
      { scenario: 'A <span class="key">hospital</span> retrieve relation.', question: 'Total function means:', correct: '<code>Every concrete state maps to exactly one abstract state</code>', distractors: ['<code>Some concrete states have no abstract counterpart</code>','<code>Each abstract state maps to one concrete</code>','<code>The mapping is partial</code>'] },
      { scenario: 'An <span class="key">airport</span> scheduler proof.', question: 'Why must the retrieve be a total function?', correct: '<code>So every reachable concrete state has a well-defined abstract meaning</code>', distractors: ['<code>For performance reasons</code>','<code>It is optional</code>','<code>Partial relations suffice</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> proof.', question: '<code>&exist;<sub>1</sub></code> means:', correct: '<code>There exists exactly one &mdash; uniqueness of the abstract state</code>', distractors: ['<code>There exists at least one</code>','<code>There exists none</code>','<code>For all</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Concrete to Abstract Mapping'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span>: rset = {2,5,7}, bset = {3}, fset = {1,4,6,8,9,10}, current = 2.', question: 'Via RetrieveSched, the abstract state is:', correct: '<code>ready = {2,5,7}, blocked = {3}, free = {1,4,6,8,9,10}, current = 2</code>', distractors: ['<code>ready = {3}, blocked = {2,5,7}</code>','<code>free = {2,5,7}</code>','<code>Undefined</code>'] },
      { scenario: 'A <span class="key">hospital</span>: rset = &empty;, bset = {4,6}, fset = {1,2,3,5,7,8}, current = nullPId.', question: 'Abstract state:', correct: '<code>ready = &empty;, blocked = {4,6}, free = {1,2,3,5,7,8}, current = nullPId</code>', distractors: ['<code>ready = {4,6}</code>','<code>blocked = &empty;</code>','<code>free = PId</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> concrete state with known chain sets.', question: 'The mapping ignores:', correct: '<code>Chain structure (links, start, end) &mdash; only the set components matter abstractly</code>', distractors: ['<code>The set components</code>','<code>Current</code>','<code>Nothing &mdash; everything maps</code>'] },
      { scenario: 'An <span class="key">airport</span> concrete state.', question: 'Current maps to:', correct: '<code>current directly &mdash; it is the same variable in both concrete and abstract</code>', distractors: ['<code>rstart</code>','<code>A new variable</code>','<code>Undefined</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Precondition Preservation'] = function() {
    var ops = pick(['Dispatch','TimeOut','Block','WakeUp','Create']);
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> must verify A' + ops + ' precondition transfers.', question: 'Precondition preservation states:', correct: '<code>pre A' + ops + ' &and; Retrieve &rArr; pre C' + ops + '</code>', distractors: ['<code>pre C' + ops + ' &rArr; pre A' + ops + '</code>','<code>A' + ops + ' &rArr; C' + ops + '</code>','<code>No implication needed</code>'] },
      { scenario: 'A <span class="key">hospital</span> operation.', question: 'If the abstract precondition holds and the retrieve holds:', correct: '<code>The concrete precondition must also hold</code>', distractors: ['<code>The concrete precondition may fail</code>','<code>Only the abstract matters</code>','<code>The concrete is independent</code>'] },
      { scenario: 'An <span class="key">airport</span> scheduler.', question: 'Precondition preservation ensures:', correct: '<code>The concrete system never blocks when the abstract spec says "go"</code>', distractors: ['<code>The concrete allows strictly more operations</code>','<code>The abstract allows strictly more</code>','<code>Both have identical preconditions syntactically</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> A' + ops + ' has pre: current = nullPId.', question: 'Under Retrieve, this maps to:', correct: '<code>The same condition in the concrete state &mdash; current is shared</code>', distractors: ['<code>A different condition entirely</code>','<code>No concrete counterpart</code>','<code>rstart = nullPId</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Refinement Verification'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> scheduler refinement.', question: 'The overall pattern for proving refinement includes:', correct: '<code>Total function proof + initialisation correctness + operation correctness for each operation</code>', distractors: ['<code>Only operation correctness</code>','<code>Only initialisation</code>','<code>Only the retrieve relation</code>'] },
      { scenario: 'A <span class="key">hospital</span> scheduler.', question: 'How many proof obligations are there?', correct: '<code>1 (total function) + 1 (init) + 1 per operation pair</code>', distractors: ['<code>Just 1</code>','<code>Just 2</code>','<code>Only the retrieve</code>'] },
      { scenario: 'An <span class="key">airport</span> design verification.', question: 'If all obligations hold:', correct: '<code>The concrete scheduler faithfully implements the abstract specification</code>', distractors: ['<code>Only some operations are correct</code>','<code>The abstract spec is replaced</code>','<code>Further testing is always required</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> refinement proof.', question: 'The proof covers Dispatch, TimeOut, Block, WakeUp, Create, Destroy. That is:', correct: '<code>6 operation correctness proofs + 6 applicability proofs + init + total function</code>', distractors: ['<code>1 proof for all operations combined</code>','<code>Only Dispatch needs proof</code>','<code>No proofs needed</code>'] },
      { scenario: 'A <span class="key">restaurant</span> scheduler.', question: 'Refinement verification guarantees:', correct: '<code>Any observable behaviour of the concrete system is permitted by the abstract specification</code>', distractors: ['<code>The concrete is faster than the abstract</code>','<code>The abstract has no meaning after refinement</code>','<code>Only initialisation is verified</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Correctness Pattern'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> CDispatch proof.', question: 'The standard template is:', correct: '<code>pre AOp &and; Retrieve &and; COp &and; Retrieve&prime; &rArr; AOp</code>', distractors: ['<code>COp &rArr; AOp</code>','<code>AOp &rArr; COp</code>','<code>Retrieve &rArr; AOp</code>'] },
      { scenario: 'A <span class="key">hospital</span> CBlock proof.', question: 'The left side of the implication has:', correct: '<code>Four conjuncts: precondition, before-Retrieve, concrete operation, after-Retrieve</code>', distractors: ['<code>Two conjuncts</code>','<code>One conjunct</code>','<code>Five conjuncts</code>'] },
      { scenario: 'An <span class="key">airport</span> CTimeOut proof.', question: 'The right side of the implication is:', correct: '<code>The abstract operation AOp &mdash; its postcondition must follow</code>', distractors: ['<code>The concrete operation</code>','<code>The retrieve relation</code>','<code>The precondition</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> CWakeUp proof.', question: 'This pattern is called:', correct: '<code>Downward simulation (operation correctness)</code>', distractors: ['<code>Upward simulation</code>','<code>Functional refinement</code>','<code>Schema calculus</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  window.conceptBank['Correctness Proof Steps'] = function() {
    var scenarios = [
      { scenario: 'A <span class="key">warehouse</span> scheduler refinement.', question: 'The three main proof obligations are:', correct: '<code>Total function proof, initialisation correctness, operation correctness</code>', distractors: ['<code>Syntax, type, runtime</code>','<code>Compile, link, deploy</code>','<code>Unit, integration, acceptance</code>'] },
      { scenario: 'A <span class="key">hospital</span> data refinement.', question: 'Step 1 (total function) shows:', correct: '<code>Retrieve is a total function from concrete to abstract states</code>', distractors: ['<code>Retrieve is partial</code>','<code>Retrieve is a relation only</code>','<code>No retrieve is needed</code>'] },
      { scenario: 'An <span class="key">airport</span> scheduler proof.', question: 'Step 2 (init correctness) shows:', correct: '<code>CSchedulerInit &and; Retrieve&prime; &rArr; ASchedulerInit</code>', distractors: ['<code>ASchedulerInit &rArr; CSchedulerInit</code>','<code>No init proof needed</code>','<code>Init is always correct</code>'] },
      { scenario: 'A <span class="key">taxi fleet</span> refinement.', question: 'Step 3 (operation correctness) is done:', correct: '<code>Once per operation pair (ADispatch/CDispatch, ATimeOut/CTimeOut, etc.)</code>', distractors: ['<code>Once for all operations combined</code>','<code>Only for Dispatch</code>','<code>Never &mdash; operations are trivially correct</code>'] }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

})();
