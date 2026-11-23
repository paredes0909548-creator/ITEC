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

    static renderCart(){
    const container = document.getElementById('productsContainer');

    const subTotalDisplay = document.getElementById('subTotal');
    const shippingFeeDisplay = document.getElementById('shippingFee');
    const finalTotalDisplay = document.getElementById('finalTotal');

    if(!container){
        return;
    }

    const cartBlock = this.getCart().map(item =>{
        return `
        <div class="productContainerItem">
            <div class="productContainerItemChild">
                <img src="../images/clothes${item.productId}.jpg" alt="clothes${item.productId}" class="productImage">
                <input type="color">
                <span class="itemQuantityCart">Quantity: ${item.quantity}</span>
             </div>

                <label for="cartProductDeleteBtn${item.productId}" class="cartProductDeleteBtn">

                    <input class="checkBox" type="checkbox" class="checkBox" id="cartProductDeleteBtn${item.productId}" data-product-id="${item.productId}">

                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>


                </label>
    
        </div>
        `;
    }).join('');
        container.innerHTML = cartBlock;
        
    const subTotal = this.getCart().reduce((sum,item) => {
        const itemTotal = Number(item.price) * Number(item.quantity)
        return sum+itemTotal;
    },0)
    console.log(subTotal);
    console.log(this.getCart());
    const shippingFee = 70;
    const finalTotal = subTotal + shippingFee;

    subTotalDisplay.textContent = subTotal;
    if(subTotal > 0){
        shippingFeeDisplay.textContent="₱"+shippingFee;
        finalTotalDisplay.textContent = "₱"+finalTotal;
    }
    else{
    shippingFeeDisplay.textContent="₱0";
    finalTotalDisplay.textContent = "₱0"; 
    }
    

    }

    static initCartEvents() {
    const container = document.getElementById('productsContainer');
    if (!container) return; // Prevents errors if this script runs on pages without #productsContainer
    
    container.addEventListener('change', (e) => {
        if (e.target.classList.contains('checkBox')) {
            const productId = e.target.dataset.productId;
            
            // 1. Get the cart array first
            const cart = this.getCart();
            
            // 2. Find the index of the matching item
            const index = cart.findIndex((item) => String(item.productId) === String(productId));
            
            // 3. If found, remove it, save the updated array, and refresh the screen
            if (index !== -1) {
                cart.splice(index, 1);
                this.saveToCart(cart);
                this.renderCart();
            }
        }
    });
    }
}
cart.renderCart();
cart.initCartEvents();

const checkOutBtn =  document.getElementById('checkOutBtn');
if(checkOutBtn){
checkOutBtn.addEventListener('click', (e)=>{
    e.preventDefault();
const cartList = cart.getCart();
console.log(cartList);

/* GAWIN MO NA YUNG CHECK OUT BALE PAG CLICK YUNG checkOutBtn variabl laman niyan is yung mga list ng add to cart na ilalagay mo dun sa array list ng process sa kernel */
})
}