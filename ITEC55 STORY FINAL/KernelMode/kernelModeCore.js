export default class kernelModeCore {
  static #storeClock = Number(localStorage.getItem('clockTime')) || 0;
  static #clockInterval = null;
  static nextPid = Number(localStorage.getItem('nextPid')) || 1;
  static nextTid = Number(localStorage.getItem('nextTid')) || 100;

  #item = JSON.parse(localStorage.getItem('KernelInventory')) || [
    { productId: 1, name: "Classic Tee", stocks: 20, price: 10 },
    { productId: 2, name: "Denim Jacket", stocks: 35, price: 20 },
    { productId: 3, name: "Cargo Pants", stocks: 10, price: 30 }
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
      processQueue: JSON.parse(localStorage.getItem('ProcessQueue')) || [],
      inventory: JSON.parse(localStorage.getItem('KernelInventory')) || [],
      kernelLog: JSON.parse(localStorage.getItem('KernelLog')) || []
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

  deductStock(productId, qty) {
    const target = this.#item.find(item => item.productId === Number(productId));
    if (target && target.stocks >= Number(qty)) {
      target.stocks -= Number(qty);
      this.#saveInventory();
      return true;
    }
    return false;
  }
}
