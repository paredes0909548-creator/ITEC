export default class cart{
    constructor(productId,quantity,price){
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }   

    static getCart(){
        return JSON.parse(localStorage.getItem('Cart')) ||[];
    }

    static saveToCart(cart){
        localStorage.setItem('Cart',JSON.stringify(cart))
    }
    
    static addToCart(itemObj){
        const cart = this.getCart();
        const existingProductId = cart.find((item) => ( item.productId === itemObj.productId))
     
        if(existingProductId){
            existingProductId.quantity += Number(itemObj.quantity);
        }
        else{
            cart.push({
                ...itemObj,
                quantity: Number(itemObj.quantity)
            });
        }
        this.saveToCart(cart);
    }

    static showCartList(){
        return JSON.parse(localStorage.getItem('Cart'))||[];
    }

    static renderCart(){
    const container = document.getElementById('productsContainer');

    const subTotalDisplay = document.getElementById('subTotal');
    const shippingFeeDisplay = document.getElementById('shippingFee');
    const finalTotalDisplay = document.getElementById('finalTotal');

    if(!container){
        return;
    }

    const cartBlock = this.showCartList().map(item =>{
        return `
        <div class="productContainerItem">

            <label for="cartProductDeleteBtn${item.productId}" class="cartProductDeleteBtn">

                <input class="checkBox" type="checkbox" id="cartProductDeleteBtn${item.productId}">

                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>

            </label>

            <img src="../images/clothes${item.productId}.jpg" alt="clothes${item.productId}" class="productImage">
            <input type="color">
            <span id="itemQuantityCart">Quantity: ${item.quantity}</span>
        </div>
        `;
    }).join('');
        container.innerHTML = cartBlock;
        
    const subTotal = this.showCartList().reduce((sum,item) => {
        const itemTotal = Number(item.price) * Number(item.quantity)
        return sum+itemTotal;
    },0)
    console.log(subTotal);
    console.log(this.showCartList());
    const shippingFee = 70;
    const finalTotal = subTotal + shippingFee;

    subTotalDisplay.textContent = subTotal;
    shippingFeeDisplay.textContent = shippingFee;
    finalTotalDisplay.textContent = finalTotal;
    

    }
}
cart.renderCart();