import kernelModeCore from "./kernelModeCore.js";

export default class systemCall {
  static #kernel = new kernelModeCore();

  static stockChecker(productId, quantity) {
    const userStatus = localStorage.getItem('userStatus');
    if (!userStatus || userStatus === 'guess') {
      return { valid: false, message: "LogIn First" };
    }

    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty <= 0) {
      return { valid: false, message: "Invalid quantity" };
    }

    const productInfos = this.#kernel.productInfo();
    const product = productInfos.find(item => item.productId === Number(productId));

    if (!product || product.stocks < qty) {
      return { valid: false, message: "Product Out Of Stock" };
    }

    return { valid: true, message: "Added to cart successfully", price: product.price };
  }

  static storeTime() {
    kernelModeCore.startClock();
  }

  static getCart() {
    return JSON.parse(localStorage.getItem('Cart')) || [];
  }

  // SYSTEM CALL: sys_checkout (Authenticates user, reserves stock, spawns PCB + TCBs)
  static checkOutRequest(CID, cartList, priority = 2) {
    // 1. Mode Switch & Authentication Check
    if (!CID || CID === 'guess') {
      kernelModeCore.logKernel(
        "EPERM_AUTH_FAILED",
        "Blocked unauthenticated checkout syscall.",
        "User attempted a privileged checkout syscall while in guest mode."
      );
      return { valid: false, message: "Authentication Error: Please log in first." };
    }

    if (!cartList || cartList.length === 0) {
      return { valid: false, message: "Your cart is empty." };
    }

    // 2. Atomic Stock Verification (All-or-Nothing)
    const inventory = this.#kernel.productInfo();
    for (const item of cartList) {
      const stockRecord = inventory.find(p => p.productId === Number(item.productId));
      if (!stockRecord || stockRecord.stocks < Number(item.quantity)) {
        kernelModeCore.logKernel(
          "SYS_IO_ERROR",
          `Checkout failed: Product #${item.productId} out of stock.`,
          "Kernel prevented race-condition overselling by aborting before resource allocation."
        );
        return { valid: false, message: `Insufficient stock for Product #${item.productId}.` };
      }
    }

    // 3. Allocate Inventory Resources
    for (const item of cartList) {
      this.#kernel.deductStock(item.productId, item.quantity);
    }

    // 4. Spawn Parent Process (PCB) & Child Threads (TCBs) in Ready Queue
    const pcb = kernelModeCore.createOrderProcess(CID, cartList, Number(priority));

    return {
      valid: true,
      message: `Order placed! Spawned Process PID #${pcb.pid} with ${pcb.threads.length} execution threads.`,
      pcb
    };
  }

  static getProcess(){
  const processList = JSON.parse(localStorage.getItem('ProcessQueue'));
  return processList;
  }

  static getHistory(){
  const historyList= JSON.parse(localStorage.getItem('TimeMachineHistory'));
  return historyList;
  }



}