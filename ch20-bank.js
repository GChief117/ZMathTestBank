(function buildCh20Bank() {
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
  window.conceptBank = window.conceptBank || {};

  // ===================== 20.1 External View =====================

  var msgs = ['IAM','ACM','ANM','REL','RLC','SETUP','ALERT','CONNECT','BYE','SYNC','PING','DATA','ACK','FIN','RST'];
  function rseq(n) { var s=[]; for(var i=0;i<n;i++) s.push(pick(msgs)); return s; }
  function fmt(arr) { return '&langle;' + arr.join(', ') + '&rangle;'; }

  window.conceptBank['External State'] = function() {
    var parts = pick([
      {q:'The Ext schema holds:', c:'<code>in, out : seq M</code> with <code>&exist; s : seq M &bull; in = s &#x2040; out</code>.', d:['Only <code>in</code>.','Only <code>out</code>.','A single message.']},
      {q:'The suffix invariant guarantees:', c:'No re-ordering and no corruption of messages.', d:['Random ordering.','Exactly one message at a time.','Nothing.']}
    ]);
    return {scenario:'', question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['Suffix Invariant'] = function() {
    var n = randInt(3,6); var s = rseq(n); var k = randInt(1,n-1);
    var out = s.slice(k); var valid = true;
    return {
      scenario:'A channel has <code>in = ' + fmt(s) + '</code>, <code>out = ' + fmt(out) + '</code>.',
      question:'Does the suffix invariant hold?',
      correct:'Yes &mdash; <code>' + fmt(out) + '</code> is the last ' + out.length + ' elements of <code>in</code>.',
      distractors:['No &mdash; suffix fails.','Only if #in = #out.','Undefined.']
    };
  };

  window.conceptBank['External Specification'] = function() {
    var n = randInt(3,5); var s = rseq(n); var k = randInt(1,n-1);
    var inflight = n - (n-k);
    var parts = pick([
      {q:'How many messages are in-flight?', c:'' + k + ' &mdash; <code>#in &minus; #out = ' + n + ' &minus; ' + (n-k) + '</code>.', d:['' + n + '.','0.','1.']},
      {q:'Is the invariant satisfied?', c:'Yes &mdash; out is the last ' + (n-k) + ' elements of in.', d:['No.','Only sometimes.','Undefined.']}
    ]);
    return {
      scenario:'A link has <code>in = ' + fmt(s) + '</code>, <code>out = ' + fmt(s.slice(k)) + '</code>.',
      question:parts.q, correct:parts.c, distractors:parts.d
    };
  };

  window.conceptBank['Protocol Operations'] = function() {
    var m = pick(msgs);
    var parts = pick([
      {s:'Empty channel. Transmit <span class="key">' + m + '</span>.', q:'New state?',
       c:'<code>in = &langle;' + m + '&rangle;, out = &langle;&rangle;</code>',
       d:['<code>in = out = &langle;' + m + '&rangle;</code>','<code>in = &langle;&rangle;, out = &langle;' + m + '&rangle;</code>','No change.']},
      {s:'Transmit changes only:', q:'Which sequence?',
       c:'<code>in</code> &mdash; out unchanged.',
       d:['<code>out</code> only.','Both.','Neither.']},
      {s:'Receive changes only:', q:'Which sequence?',
       c:'<code>out</code> &mdash; in unchanged.',
       d:['<code>in</code> only.','Both.','Neither.']}
    ]);
    return {scenario:parts.s, question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['In-Flight Messages'] = function() {
    var n = randInt(3,6); var s = rseq(n); var k = randInt(1,n-1);
    return {
      scenario:'<code>in = ' + fmt(s) + '</code>, <code>out = ' + fmt(s.slice(k)) + '</code>.',
      question:'How many in-flight?',
      correct:'' + k + ' &mdash; <code>#in &minus; #out</code>.',
      distractors:['' + n + '.','0.','' + (n-k) + '.']
    };
  };

  window.conceptBank['Initialisation'] = function() {
    return {
      scenario:'', question:'ExtInit sets:',
      correct:'<code>in&prime; = &langle;&rangle;</code> (forcing <code>out&prime; = &langle;&rangle;</code> by the invariant).',
      distractors:['<code>in&prime; = out&prime; = &langle;SYNC&rangle;</code>','Only <code>out</code> to empty.','Nothing.']
    };
  };

  window.conceptBank['Invariant Preservation'] = function() {
    return {
      scenario:'', question:'After Transmit, does the suffix invariant still hold?',
      correct:'Yes &mdash; prepending to in keeps out as a suffix.',
      distractors:['No &mdash; Transmit breaks it.','Only sometimes.','Undefined.']
    };
  };

  window.conceptBank['FIFO Ordering'] = function() {
    return {
      scenario:'', question:'FIFO delivery means:',
      correct:'First submitted, first delivered &mdash; order preserved.',
      distractors:['Last submitted, first delivered.','Random order.','No ordering guarantee.']
    };
  };

  window.conceptBank['Nondeterministic Delivery'] = function() {
    return {
      scenario:'', question:'The <code>&or; out&prime; = out</code> branch in Receive models:',
      correct:'Nondeterministic delay &mdash; messages may not arrive on every step.',
      distractors:['Message loss.','Corruption.','Nothing.']
    };
  };

  window.conceptBank['Abstraction Purpose'] = function() {
    return {
      scenario:'', question:'The external view serves as:',
      correct:'The specification all design decisions must preserve.',
      distractors:['The implementation.','A performance benchmark.','Nothing.']
    };
  };

  // ===================== 20.2 Sectional View =====================

  window.conceptBank['Sectional State'] = function() {
    return {
      scenario:'', question:'The Section schema tracks:',
      correct:'<code>route : iseq SPC; rec, ins, sent : seq(seq M)</code> with matching lengths.',
      distractors:['Only a route.','Only messages.','A single buffer.']
    };
  };

  window.conceptBank['Route Basics'] = function() {
    return {
      scenario:'', question:'A route is:',
      correct:'An injective sequence of SPCs &mdash; no duplicates, non-empty.',
      distractors:['A set of SPCs.','A single SPC.','Any sequence (duplicates OK).']
    };
  };

  window.conceptBank['Section Structure'] = function() {
    var n = randInt(3,8);
    var parts = pick([
      {q:'A ' + n + '-hop route has how many daemon boundaries?', c:'' + (n-1) + ' (one per adjacent pair).', d:['' + n + '.','1.','0.']},
      {q:'<code>iseq SPC</code> means:', c:'Injective sequence &mdash; all elements distinct.', d:['Duplicates allowed.','Empty sequence.','A set.']},
      {q:'Pairwise concatenation <code>rec = ins &#x2248; sent</code> means:', c:'For each section i: <code>rec i = (ins i) &#x2040; (sent i)</code>.', d:['<code>rec = ins &#x2040; sent</code> (flat).','<code>rec = ins</code>.','Nothing.']}
    ]);
    return {scenario:'', question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['Sectional Operations'] = function() {
    var parts = pick([
      {q:'STransmit fires at:', c:'The head (first) section of the route.', d:['The last section.','Any section.','No section.']},
      {q:'SReceive fires at:', c:'The last section of the route.', d:['The first section.','Any section.','No section.']},
      {q:'The daemon is invisible because:', c:'It doesn&rsquo;t change head rec (= in) or last sent (= out).', d:['It changes in.','It changes out.','It changes both.']}
    ]);
    return {scenario:'', question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['Daemon Operation'] = function() {
    var n = randInt(3,5); var i = randInt(1,n-1);
    return {
      scenario:'A ' + n + '-hop route; daemon fires at i = ' + i + '.',
      question:'Which ins entries change?',
      correct:'<code>ins ' + i + '</code> shrinks and <code>ins ' + (i+1) + '</code> grows.',
      distractors:['All ins entries.','Only ins 1.','None.']
    };
  };

  window.conceptBank['Pairwise Concatenation'] = function() {
    return {
      scenario:'', question:'Pairwise concatenation <code>s &#x2248; t</code> requires:',
      correct:'<code>#s = #t</code> &mdash; equal-length sequences of sequences.',
      distractors:['Any lengths.','<code>#s &gt; #t</code>.','Nothing.']
    };
  };

  window.conceptBank['Route Properties'] = function() {
    return {
      scenario:'', question:'Why must route be injective (no duplicates)?',
      correct:'No routing loops &mdash; each SPC appears at most once.',
      distractors:['Performance.','Aesthetic choice.','Nothing.']
    };
  };

  window.conceptBank['Boundary Constraints'] = function() {
    return {
      scenario:'', question:'<code>front sent = tail rec</code> means:',
      correct:'Section i&rsquo;s sent buffer feeds into section (i+1)&rsquo;s received buffer.',
      distractors:['Nothing.','Only last matters.','Only first matters.']
    };
  };

  window.conceptBank['Variant Discussion'] = function() {
    return {
      scenario:'', question:'A variant could guarantee delivery by:',
      correct:'Adding an integer that decreases with each daemon step, forcing eventual progress.',
      distractors:['Removing nondeterminism.','Nothing.','Adding a free type.']
    };
  };

  window.conceptBank['Refinement Obligation'] = function() {
    return {
      scenario:'', question:'The sectional view must:',
      correct:'Refine the external view &mdash; preserve its contract via data refinement.',
      distractors:['Replace the external view.','Ignore the external view.','Nothing.']
    };
  };

  // ===================== 20.3 Relationship =====================

  window.conceptBank['Retrieve Relation'] = function() {
    return {
      scenario:'', question:'The retrieve maps:',
      correct:'<code>head rec &rarr; in</code> and <code>last sent &rarr; out</code>.',
      distractors:['<code>last rec &rarr; in</code>.','<code>head sent &rarr; out</code>.','Nothing.']
    };
  };

  window.conceptBank['Refinement Basics'] = function() {
    return {
      scenario:'', question:'STransmit refines:',
      correct:'Transmit &mdash; both prepend to their respective in sequence.',
      distractors:['Receive.','Daemon.','Nothing.']
    };
  };

  window.conceptBank['Retrieve Application'] = function() {
    var n = randInt(2,4); var s = rseq(n); var k = randInt(1,n-1);
    var headrec = s; var lastsent = s.slice(k);
    return {
      scenario:'<code>head rec = ' + fmt(headrec) + '</code>, <code>last sent = ' + fmt(lastsent) + '</code>.',
      question:'External state?',
      correct:'<code>in = ' + fmt(headrec) + ', out = ' + fmt(lastsent) + '</code>',
      distractors:['<code>in = ' + fmt(lastsent) + '</code>','<code>out = ' + fmt(headrec) + '</code>','Undefined.']
    };
  };

  window.conceptBank['Operation Refinement'] = function() {
    var parts = pick([
      {q:'Daemon fires at a middle section. External state:', c:'Unchanged &mdash; daemon doesn&rsquo;t touch head rec or last sent.', d:['in changes.','out changes.','Both change.']},
      {q:'SReceive delivers frame m. External Receive yields:', c:'Same frame m &mdash; observable consistency.', d:['A different frame.','Nothing.','Free type.']},
      {q:'SectionInit refines ExtInit because:', c:'All-empty sections produce head rec = &langle;&rangle; = in and last sent = &langle;&rangle; = out.', d:['They are unrelated.','Only for 1-hop routes.','Nothing.']}
    ]);
    return {scenario:'', question:parts.q, correct:parts.c, distractors:parts.d};
  };

  window.conceptBank['Composed Traces'] = function() {
    var nT = randInt(1,4); var nD = randInt(1,3); var nR = randInt(0,Math.min(nT,2));
    return {
      scenario:nT + ' STransmit(s), ' + nD + ' Daemon(s), ' + nR + ' SReceive(s).',
      question:'Net external effect?',
      correct:'in grows by ' + nT + '; out grows by ' + nR + ' (Daemons are skip).',
      distractors:['in grows by ' + (nT+nD) + '.','No change.','out grows by ' + nT + '.']
    };
  };

  window.conceptBank['Daemon Refines Skip'] = function() {
    return {
      scenario:'', question:'The daemon&rsquo;s invisibility means externally it is:',
      correct:'&Xi;Ext &mdash; no change to in or out.',
      distractors:['A Transmit.','A Receive.','Nothing.']
    };
  };

  window.conceptBank['Inductive Proof'] = function() {
    return {
      scenario:'', question:'Inductive proof on route length uses:',
      correct:'Base case (1-hop trivial) + step (n &rarr; n+1 via front/last decomposition).',
      distractors:['Only the base case.','No induction needed.','Nothing.']
    };
  };

  window.conceptBank['Sequence Lemmas'] = function() {
    return {
      scenario:'', question:'Sequence lemmas like head(s &#x2040; t) = head(s) are used in:',
      correct:'Discharging refinement obligations in the inductive step.',
      distractors:['Only notation.','Nothing.','Free type.']
    };
  };

  window.conceptBank['Init Consistency'] = function() {
    return {
      scenario:'', question:'A proven refinement lets the implementer:',
      correct:'Use sectional ops freely &mdash; external behaviour is guaranteed correct.',
      distractors:['Ignore external.','Nothing.','Free type.']
    };
  };

  window.conceptBank['Data Refinement'] = function() {
    return {
      scenario:'', question:'The External &harr; Sectional relationship is a case of:',
      correct:'Data refinement &mdash; proving a concrete design implements an abstract spec.',
      distractors:['Functional refinement.','Free type.','Nothing.']
    };
  };

})();
