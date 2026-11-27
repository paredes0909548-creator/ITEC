export default class kernelModeCore {
  static #storeClock = Number(localStorage.getItem('clockTime')) || 0;
  static #clockInterval = null;
  static #quantumTime=0
  static nextPid = Number(localStorage.getItem('nextPid')) || 1;
  static nextTid = Number(localStorage.getItem('nextTid')) || 100;

  #item = JSON.parse(localStorage.getItem('KernelInventory')) || [
    { productId: 1, name: "Chill Fit", stocks: 20, price: 10 },
    { productId: 2, name: "On the Go Fit", stocks: 35, price: 20 },
    { productId: 3, name: "Date Night Fit", stocks: 10, price: 30 }
  ];

  #saveInventory() {
    localStorage.setItem('KernelInventory', JSON.stringify(this.#item));
  }

  productInfo() {
    return this.#item;
  }

  // KERNEL LOG: Records every syscall, mode switch, and state transition
  static logKernel(eventType, message, whyReason = "") {
    const logs = JSON.parse(localStorage.getItem('KernelLog')) || [];
    logs.push({
      tick: this.getClock(),
      mode: "KERNEL_MODE (Ring 0)",
      eventType,
      message,
      whyReason // Powers your "Why?" Explainer feature!
    });
    localStorage.setItem('KernelLog', JSON.stringify(logs));
  }

  // TIME MACHINE: Saves a state snapshot at the current tick for Rewind/Replay
  static saveSnapshot(actionLabel) {
    const history = JSON.parse(localStorage.getItem('TimeMachineHistory')) || [];
    history.push({
      tick: this.getClock(),
      label: actionLabel,
      processQueue: JSON.parse(localStorage.getItem('ProcessQueue'))    || [],
      inventory:    JSON.parse(localStorage.getItem('KernelInventory')) || [],
      kernelLog:    JSON.parse(localStorage.getItem('KernelLog'))       || []
    });
    localStorage.setItem('TimeMachineHistory', JSON.stringify(history));
  }

  // PCB + TCB FACTORY: Creates a Parent Order Process with Child Item Threads
  static createOrderProcess(CID, cartItemsArray, priority = 2) {
    const PID = this.nextPid++;
    localStorage.setItem('nextPid', PID + 1);
    const arrival = this.getClock();

    // Create TCBs (Threads) for each item + 1 Payment I/O thread
    const threads = cartItemsArray.map((item, idx) => {
      const TID = this.nextTid++;
      const itemBurst = Number(item.quantity); // 1 CPU burst per item quantity
      return {
        tid: TID,
        parentPid: PID,
        taskName: `Pack Item #${item.productId} (x${item.quantity})`,
        state: "READY",
        burst: itemBurst,
        remaining: itemBurst,
        // Private Thread Resources:
        privateResources: {
          registers: { PC: 0, AX: item.productId, CX: item.quantity },
          stackPointer: `0x7FFF00${idx}`
        }
      };
    });

    // Add a Payment Verification I/O Thread (demonstrates CPU + I/O bursts)
    const ioTid = this.nextTid++;
    threads.push({
      tid: ioTid,
      parentPid: PID,
      taskName: "Payment Gateway Verification (I/O)",
      state: "READY",
      burst: 2,
      remaining: 2,
      isIoTask: true,
      ioBurst: 2,
      privateResources: {
        registers: { PC: 0, DX: "AUTH_TOKEN" },
        stackPointer: `0x7FFF00${threads.length}`
      }
    });

    localStorage.setItem('nextTid', this.nextTid);

    const totalBurst = threads.reduce((sum, t) => sum + t.burst, 0);

    // PCB (Process Control Block) - 5-State Lifecycle: NEW -> READY
    const pcb = {
      pid: PID,
      parentPid: null, // Root checkout order process
      cid: CID,
      storyTitle: `Order #${PID} by Customer ${CID}`,
      state: "NEW", // Transitions immediately to READY upon admission
      priority: priority,
      arrival: arrival,
      burst: totalBurst,
      remaining: totalBurst,
      waitingTime: 0, 
      turnaroundTime: 0,
      responseTime: null,
      // Shared Process Resources (accessible by all threads in this PCB):
      sharedResources: {
        cartItems: cartItemsArray,
        shippingFee: 70,
        memoryAddressSpace: `0x0040${PID}00`
      },
      threads: threads, // TCB list
      registers: { PC: 0, SP: `0x0040${PID}FF`, ACC: 0 }
    };

    // Transition NEW -> READY
    pcb.state = "READY";

    const queue = JSON.parse(localStorage.getItem('ProcessQueue')) || [];
    queue.push(pcb);
    localStorage.setItem('ProcessQueue', JSON.stringify(queue));

    this.logKernel(
      "SYS_CREATE_PROCESS",
      `Created PCB PID ${PID} with ${threads.length} threads (Total Burst: ${totalBurst}). State: NEW -> READY.`,
      `Customer ${CID} submitted a checkout request, spawning a parent order process and worker threads for each item.`
    );

    this.saveSnapshot(`Process PID ${PID} Created`);
    this.ganchartSimulator();
    return pcb;
  }

  static startClock() {
    const savedTime = localStorage.getItem('clockTime');
    this.#storeClock = savedTime ? Number(savedTime) : 0;
    if (this.#clockInterval) return;

    this.#clockInterval = setInterval(() => {
      this.#storeClock++;
      localStorage.setItem('clockTime', this.#storeClock);
    }, 2000);
  }

  static getClock() {
    return Number(localStorage.getItem('clockTime')) || this.#storeClock;
  }

  static stopClock() {
    clearInterval(this.#clockInterval);
    this.#clockInterval = null;
  }
  static quantumTimeSwitch(){

    this.#quantumTime = setInterval(() => {
      this.#quantumTime;
      localStorage.setItem('quantumTime', this.#quantumTime);

      if(localStorage.getItem('quantumtime' == 2)){
        this.#quantumTime = 0;
      }
    }, 2000);
  }
  

  deductStock(productId, qty) {
    const target = this.#item.find(item => item.productId === Number(productId));
    if (target && target.stocks >= Number(qty)) {
      target.stocks -= Number(qty);
      this.#saveInventory();
      return true;
    }
    return false;
  }


  
static roundRobin(){
  
const quantum = Number(localStorage.getItem('quantumTime')) || 2;
const rrQueue = [...processQueue]
  .sort((a, b) => a.arrival - b.arrival)
  .map((p) => ({ ...p, remainingBurst: p.burst })); // Track remaining burst

const readyQueue = [];
const ganttSlices = []; // Stores every Gantt block
const completedRR = []; // Stores final metrics per PID

let rrTime = 0;
let index = 0;

// Load initial processes arriving at time 0
while (index < rrQueue.length && rrQueue[index].arrival <= rrTime) {
  readyQueue.push(rrQueue[index++]);
}

while (readyQueue.length > 0 || index < rrQueue.length) {
  if (readyQueue.length === 0) {
    rrTime = rrQueue[index].arrival;
    while (index < rrQueue.length && rrQueue[index].arrival <= rrTime) {
      readyQueue.push(rrQueue[index++]);
    }
  }

  const current = readyQueue.shift();
  const execTime = Math.min(current.remainingBurst, quantum);
  const startTime = rrTime;

  rrTime += execTime;
  current.remainingBurst -= execTime;

  // Record this slice for the Gantt Chart UI
  ganttSlices.push({
    pid: current.pid,
    startTime,
    endTime: rrTime
  });

  // Check if new processes arrived while this slice was running
  while (index < rrQueue.length && rrQueue[index].arrival <= rrTime) {
    readyQueue.push(rrQueue[index++]);
  }

  // If not finished, put back at the end of the queue
  if (current.remainingBurst > 0) {
    readyQueue.push(current);
  } else {
    const CT = rrTime;
    const TAT = CT - current.arrival;
    const WT = TAT - current.burst;

    completedRR.push({
      pid: current.pid,
      CT,
      burst: current.burst,
      TAT,
      WT
    });
  }
}

localStorage.setItem('RoundRobinGantt', JSON.stringify(ganttSlices));
localStorage.setItem('RoundRobinMetrics', JSON.stringify(completedRR));

}

static highestPriority(){
  
let remainingPriority = [...processQueue];
const PriorityOrderExecution = [];
let prioTime = 0;
let prioTotalWT = 0;

while (remainingPriority.length > 0) {
  const available = remainingPriority.filter((p) => p.arrival <= prioTime);

  if (available.length === 0) {
    prioTime = Math.min(...remainingPriority.map((p) => p.arrival));
    continue;
  }

  // Sort by highest priority (lowest number first), then arrival time
  available.sort((a, b) => a.priority - b.priority || a.arrival - b.arrival);
  const p = available[0];

  const startTime = prioTime;
  const CT = startTime + p.burst;
  const TAT = CT - p.arrival;
  const WT = TAT - p.burst;

  prioTime = CT;
  prioTotalWT += WT;

  PriorityOrderExecution.push({
    pid: p.pid,
    priority: p.priority,
    startTime,
    CT,
    burst: p.burst,
    TAT,
    WT
  });

  remainingPriority = remainingPriority.filter((item) => item.pid !== p.pid);
}

localStorage.setItem('Priority', JSON.stringify(PriorityOrderExecution));

}

static SJF(){



  let remainingSJF = [...processQueue];
  const SJFOrderExecution = [];
  let sjfTime = 0;
  let sjfTotalWT = 0;

    while (remainingSJF.length > 0) {
      // 1. Find all processes that have arrived by sjfTime
      const available = remainingSJF.filter((p) => p.arrival <= sjfTime);

    if (available.length === 0) {
      // CPU is idle; jump clock to the next arriving process
      sjfTime = Math.min(...remainingSJF.map((p) => p.arrival));
        continue;
  }

  // 2. Pick the available process with the shortest burst time
  available.sort((a, b) => a.burst - b.burst || a.arrival - b.arrival);
  const p = available[0];

  const startTime = sjfTime;
  const CT = startTime + p.burst;
  const TAT = CT - p.arrival;
  const WT = TAT - p.burst;

  sjfTime = CT;
  sjfTotalWT += WT;

  SJFOrderExecution.push({
    pid: p.pid,
    startTime,
    CT,
    burst: p.burst,
    TAT,
    WT
  });

  // 3. Remove completed process from remaining list
  remainingSJF = remainingSJF.filter((item) => item.pid !== p.pid);
}

localStorage.setItem('SJF', JSON.stringify(SJFOrderExecution));

}

static FCFS(){
    const  processQueue = JSON.parse(localStorage.getItem('ProcessQueue')) || [];
    const  FCFS         = JSON.parse(localStorage.getItem('FCFS'))         || [];

    const lastCompletionTime =0;
    const totalWtBase = 0;
    
    const FCFSOrderExecution = FCFS.map((p)=>{
      const startTime = lastCompletionTime+p.arrival;
      const updatedCompletionTime =startTime + p.burst
      const tat =updatedCompletionTime-p.arrival;

      const totalWT = totalWtBase+ tat;
      const finalWT = totalWT +tat;
      return{
        pid:p.pid,
        CT:updatedCompletionTime,
        burst:p.burst,
        TAT:tat,
        WT:tat-p.burst,
        AWT:finalWT
      }

    })
    FCFS.push(FCFSOrderExecution);
    localStorage.setItem('FCFS',JSON.stringify(processQueue))

}



static ganchartSimulator() {
  const processQueue = JSON.parse(localStorage.getItem('ProcessQueue')) || [];
  if (processQueue.length === 0) return;

  const STATES = {
    NEW: 'New',
    READY: 'Ready',
    RUNNING: 'Running',
    WAITING: 'Waiting',
    TERMINATED: 'Terminated',
  };

  // Helper to calculate Average Waiting Time & Average Turnaround Time
  const getAverages = (list) => {
    const totalWT = list.reduce((sum, p) => sum + p.WT, 0);
    const totalTAT = list.reduce((sum, p) => sum + p.TAT, 0);
    return {
      AWT: Number((totalWT / list.length).toFixed(2)),
      ATAT: Number((totalTAT / list.length).toFixed(2)),
    };
  };

  // Helper to create a 5-state lifecycle tracker per algorithm run
  const createLifecycleTracker = (processes) => {
    const events = [];
    const currentState = {};

    const transition = (pid, nextState, time, reason = '') => {
      const prevState = currentState[pid] || null;
      if (prevState === nextState) return;
      currentState[pid] = nextState;
      events.push({
        pid,
        time,
        from: prevState,
        to: nextState,
        state: nextState,
        reason,
      });
    };

    // All submitted processes start in New and move to Ready at their arrival time
    const sortedByArrival = [...processes].sort((a, b) => a.arrival - b.arrival);
    for (const p of sortedByArrival) {
      transition(p.pid, STATES.NEW, 0, 'Process created in queue');
      transition(p.pid, STATES.READY, p.arrival, `Arrived at t=${p.arrival}`);
    }

    const getSummary = () => {
      events.sort((a, b) => a.time - b.time || String(a.pid).localeCompare(String(b.pid), undefined, { numeric: true }));
      const byProcess = {};
      for (const ev of events) {
        if (!byProcess[ev.pid]) byProcess[ev.pid] = [];
        byProcess[ev.pid].push(ev);
      }
      return { events, byProcess, finalStates: currentState };
    };

    return { transition, getSummary };
  };

  // ==========================================
  // 1. FIRST-COME, FIRST-SERVED (FCFS)
  // ==========================================
  const fcfsTracker = createLifecycleTracker(processQueue);
  const fcfsSorted = [...processQueue].sort((a, b) => a.arrival - b.arrival);
  let fcfsTime = 0;
  const fcfsResult = fcfsSorted.map((p) => {
    const startTime = Math.max(fcfsTime, p.arrival);
    const CT = startTime + p.burst;
    const TAT = CT - p.arrival;
    const WT = TAT - p.burst;

    fcfsTracker.transition(p.pid, STATES.RUNNING, startTime, 'Dispatched to CPU (FCFS)');
    fcfsTracker.transition(p.pid, STATES.TERMINATED, CT, 'Burst completed');

    fcfsTime = CT;
    return { pid: p.pid, startTime, CT, burst: p.burst, TAT, WT };
  });
  localStorage.setItem(
    'FCFS',
    JSON.stringify({
      gantt: fcfsResult,
      metrics: fcfsResult,
      ...getAverages(fcfsResult),
      lifecycle: fcfsTracker.getSummary(),
    })
  );

  // ==========================================
  // 2. SHORTEST JOB FIRST (SJF - Non-Preemptive)
  // ==========================================
  const sjfTracker = createLifecycleTracker(processQueue);
  let remainingSJF = [...processQueue];
  const sjfResult = [];
  let sjfTime = 0;
  while (remainingSJF.length > 0) {
    const available = remainingSJF.filter((p) => p.arrival <= sjfTime);
    if (available.length === 0) {
      sjfTime = Math.min(...remainingSJF.map((p) => p.arrival));
      continue;
    }
    available.sort((a, b) => a.burst - b.burst || a.arrival - b.arrival);
    const p = available[0];
    const startTime = sjfTime;
    const CT = startTime + p.burst;
    const TAT = CT - p.arrival;
    const WT = TAT - p.burst;

    sjfTracker.transition(p.pid, STATES.RUNNING, startTime, `Dispatched to CPU (SJF burst=${p.burst})`);
    sjfTracker.transition(p.pid, STATES.TERMINATED, CT, 'Burst completed');

    sjfTime = CT;
    sjfResult.push({ pid: p.pid, startTime, CT, burst: p.burst, TAT, WT });
    remainingSJF = remainingSJF.filter((item) => item.pid !== p.pid);
  }
  localStorage.setItem(
    'SJF',
    JSON.stringify({
      gantt: sjfResult,
      metrics: sjfResult,
      ...getAverages(sjfResult),
      lifecycle: sjfTracker.getSummary(),
    })
  );

  // ==========================================
  // 3. PRIORITY SCHEDULING (Non-Preemptive)
  // ==========================================
  const prioTracker = createLifecycleTracker(processQueue);
  let remainingPriority = [...processQueue];
  const priorityResult = [];
  let prioTime = 0;
  while (remainingPriority.length > 0) {
    const available = remainingPriority.filter((p) => p.arrival <= prioTime);
    if (available.length === 0) {
      prioTime = Math.min(...remainingPriority.map((p) => p.arrival));
      continue;
    }
    // Lower number = higher priority (e.g., 1 runs before 2)
    available.sort((a, b) => a.priority - b.priority || a.arrival - b.arrival);
    const p = available[0];
    const startTime = prioTime;
    const CT = startTime + p.burst;
    const TAT = CT - p.arrival;
    const WT = TAT - p.burst;

    prioTracker.transition(p.pid, STATES.RUNNING, startTime, `Dispatched to CPU (Priority=${p.priority})`);
    prioTracker.transition(p.pid, STATES.TERMINATED, CT, 'Burst completed');

    prioTime = CT;
    priorityResult.push({ pid: p.pid, priority: p.priority, startTime, CT, burst: p.burst, TAT, WT });
    remainingPriority = remainingPriority.filter((item) => item.pid !== p.pid);
  }
  localStorage.setItem(
    'Priority',
    JSON.stringify({
      gantt: priorityResult,
      metrics: priorityResult,
      ...getAverages(priorityResult),
      lifecycle: prioTracker.getSummary(),
    })
  );

  // ==========================================
  // 4. ROUND ROBIN (RR)
  // ==========================================
  if (typeof this.quantumTimeSwitch === 'function') {
    this.quantumTimeSwitch();
  }
  const quantum = Number(localStorage.getItem('quantumTime')) || 2;
  const rrTracker = createLifecycleTracker(processQueue);
  const rrQueue = [...processQueue]
    .sort((a, b) => a.arrival - b.arrival)
    .map((p) => ({ ...p, remainingBurst: p.burst }));
  const readyQueue = [];
  const rrGantt = [];
  const rrMetrics = [];
  let rrTime = 0;
  let idx = 0;

  while (idx < rrQueue.length && rrQueue[idx].arrival <= rrTime) {
    readyQueue.push(rrQueue[idx++]);
  }

  while (readyQueue.length > 0 || idx < rrQueue.length) {
    if (readyQueue.length === 0) {
      rrTime = rrQueue[idx].arrival;
      while (idx < rrQueue.length && rrQueue[idx].arrival <= rrTime) {
        readyQueue.push(rrQueue[idx++]);
      }
    }

    const current = readyQueue.shift();
    const execTime = Math.min(current.remainingBurst, quantum);
    const startTime = rrTime;

    rrTracker.transition(current.pid, STATES.RUNNING, startTime, `Dispatched to CPU (RR q=${quantum})`);

    rrTime += execTime;
    current.remainingBurst -= execTime;
    rrGantt.push({ pid: current.pid, startTime, CT: rrTime });

    while (idx < rrQueue.length && rrQueue[idx].arrival <= rrTime) {
      readyQueue.push(rrQueue[idx++]);
    }

    if (current.remainingBurst > 0) {
      // Preempted after quantum: moves through Waiting/context-switch back to Ready
      rrTracker.transition(current.pid, STATES.WAITING, rrTime, 'Time quantum expired (context switch)');
      rrTracker.transition(current.pid, STATES.READY, rrTime, 'Re-queued in Ready queue');
      readyQueue.push(current);
    } else {
      const CT = rrTime;
      const TAT = CT - current.arrival;
      const WT = TAT - current.burst;
      rrTracker.transition(current.pid, STATES.TERMINATED, CT, 'Burst completed');
      rrMetrics.push({ pid: current.pid, CT, burst: current.burst, TAT, WT });
    }
  }

  // Sort RR metrics back by PID order for clean table display
  rrMetrics.sort((a, b) => String(a.pid).localeCompare(String(b.pid), undefined, { numeric: true }));
  localStorage.setItem(
    'RoundRobin',
    JSON.stringify({
      gantt: rrGantt,
      metrics: rrMetrics,
      ...getAverages(rrMetrics),
      lifecycle: rrTracker.getSummary(),
    })
  );
}

}
