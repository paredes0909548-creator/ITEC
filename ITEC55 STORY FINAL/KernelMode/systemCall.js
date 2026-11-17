import kernelMode from "./kernelMode.js";
export default class systemCall{


    static itemObj(productID,qunatity,color){
    const order= {
        productID:productID,
        qunatity:qunatity,
        color:color
    }
    return order;

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