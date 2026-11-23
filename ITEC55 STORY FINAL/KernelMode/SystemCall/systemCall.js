import kernelModeCore from "./kernelModeCore.js";
export default class systemCall{
    static #kernel = new kernelModeCore();

static stockChecker(productId, quantity) {
    const userStatus = localStorage.getItem('userStatus');
    if(!userStatus || userStatus === 'guess'){
        return {valid: false , message: "LogIn First" };
    }

    if(quantity === null || quantity === undefined || String(quantity).trim() === ""){
      return { valid: false, message: "Specify the quantity" };
    }
    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty <= 0) {
      return { valid: false, message: "Invalid quantity" };
    }


    const productInfos = this.#kernel.productInfo();
    const product = productInfos.find(item => item.productId === Number(productId));
    console.log(product);

    // Kernel validation: reject tampered IDs, 0/negative quantities, or low stock
    if (!product || qty <= 0 || product.stocks < qty) {
        return {valid: false , message: "Product Out Of Stock" }; // Returns undefined if invalid and out of stock
    }

    return {valid:true, message: "add to cart Succeful;", price:product.price};
}


static processObj(CID,PID, state, priority, arrival, burst, remaining, time, registers){
    
    const process = {
        cid:CID,
        pid:PID,
        state:state,
        priority:priority,
        arrival:arrival,
        burst:burst,
        remaining:remaining,
        time:time,
        registers:registers
    }
    return process;
}
}

