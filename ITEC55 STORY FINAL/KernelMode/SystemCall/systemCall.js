import kernelMode from "../kernelMode.js";
export default class systemCall{
    static #kernel = new kernelMode();

static stockChecker(productId, quantity) {
    const userStatus = localStorage.getItem('userStatus');
    if(!userStatus || userStatus === "guess"){
        return {valid: false , message: "LogIn First" };
    }

    const qty = Number(quantity);
    const productInfos = this.#kernel.productInfo();
    const product = productInfos.find(item => item.productId === Number(productId));
console.log(product);
    if(qty ==""){
        return {valid: false , message: "Specify the quantity" };
    }
    // Kernel validation: reject tampered IDs, 0/negative quantities, or low stock
    if (!product || qty <= 0 || product.stocks < qty) {
        return {valid: false , message: "Product Out Of Stock" }; // Returns undefined if invalid or out of stock
    }
    return {valid:true, message: "add to cart Succeful;", price:product.price};
}


    static processObj(CID,PID, state, priority, arrival, burst, remaining, time, registers){
        
        const process = {
            CID:CID,
            PID:PID,
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

