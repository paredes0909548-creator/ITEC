export default class cart{
    constructor(productId,quantity){
        this.productId = productId;
        this.quantity = quantity;
    }

    static addToCart(itemObj){
        const cart = JSON.parse(localStorage.getItem('Cart')) ||[];
        cart.push(itemObj);
        localStorage.setItem('Cart',JSON.stringify(cart))
    }

    static showCartList(){
        return JSON.parse(localStorage.getItem('Cart'))||[];
    }

    static renderCart(){
        
    const container = document.getElementById('productsContainer');

    if(!container){
        return;
    }

    const cartBlock = this.showCartList().map(item =>{
    
        return `<img src="../images/clothes${item.productId}.jpg" alt="clothes${item.productId}" class="productImage">`;
    }).join('');

        container.innerHTML = cartBlock;

    }
}
cart.renderCart();