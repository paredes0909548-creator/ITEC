export default class cart{
static #cartList= localStorage.getItem('cart'); /* i think you need to save this in local storage to have a permanent shit */
    

    static addToCart(itemObj){
        if(itemObj){
            this.#cartList.push(itemObj);
            console.log(this.#cartList);
        }
        else{
            return console.log("stock unavailable");
        }
        
    }

    static showCartList(){
        return this.#cartList;
    }

    static renderCart(){
        
    const container = document.getElementById('productsContainer');

    if(!container){
        return;
    }

    const cartBlock = this.#cartList.map(item =>{
    
        return `<img src="./images/clothes${item.productId}.jpg" alt="clothes${item.productId}" class="productImage">`;
    }).join('');

        container.innerHTML = cartBlock;

    }
}
cart.renderCart();