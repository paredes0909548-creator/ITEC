export default class cart{
static #cartList= [];
    

    static addToCart(itemObj){
        this.#cartList.push(itemObj);
    }

    static showCartList(){
        return this.#cartList;
    }
} 

const cartList = cart.showCartList();