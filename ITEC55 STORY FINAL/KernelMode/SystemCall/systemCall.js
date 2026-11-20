import kernelMode from "../kernelMode.js";
export default class systemCall{
    #items=[];


    static itemChecker(productId,quantity){
    const productInfos = kernel.productInfo();
    /* kailangan ko iloop para mag match yung Product id ng item and yung roduct id nung pinili ni customer and by that ma chcheck ko na if yung quantity nung product inside kernel is greater than the user wants okay tandaan mo yan ASHLEY *Note to self ito */

    const itemStock = productInfos[productId-1].stocks;
    if(itemStock < itemAddedToCart){
        return "Item Out of Stock";
    }
    else{
        const itemOrderInfo= {
        productID:productId,
        quantity:quantity,
    }
}
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

