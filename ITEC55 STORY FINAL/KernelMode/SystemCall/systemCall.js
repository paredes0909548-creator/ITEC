import kernelMode from "../kernelMode.js";
export default class systemCall{
    static #kernel = new kernelMode();

static stockChecker(productId, quantity) {
    const qty = Number(quantity);
    const productInfos = this.#kernel.productInfo();
    const product = productInfos[productId - 1];

    // Kernel validation: reject tampered IDs, 0/negative quantities, or low stock
    if (!product || qty <= 0 || product.stocks < qty) {
        return; // Returns undefined if invalid or out of stock
    }

    return{
        productID: productId,
        quantity: qty,
        status:"item added to cart succefully"
    };
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

