export default class cart{
static #cartList= [];
    

    static addToCart(itemObj){
        if(itemObj){
            this.#cartList.push(itemObj);
        }
        else{
            return ;
        }
        
    }

    static showCartList(){
        return this.#cartList;
    }
} 

const cartList = cart.showCartList();