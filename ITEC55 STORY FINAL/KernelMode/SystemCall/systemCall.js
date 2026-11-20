import kernelMode from "../kernelMode.js";
export default class systemCall{


    static itemObj(productID,quantity,color){
    const kernel = new kernelMode();
    const productInfo = kernel.productInfo();
    /* kailangan ko iloop para mag match yung Product id ng item and yung roduct id nung pinili ni customer and by that ma chcheck ko na if yung quantity nung product inside kernel is greater than the user wants okay tandaan mo yan ASHLEY *Note to self ito */
    const order= {
        productID:productID,
        quantity:quantity,
        color:color
    }

    if(productInfo){
        
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

