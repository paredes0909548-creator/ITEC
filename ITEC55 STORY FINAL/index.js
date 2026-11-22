import userObj from "./KernelMode/SystemCall/userObj.js";
import systemCall from "./KernelMode/SystemCall/systemCall.js";
import cart from "./Cart/cart.js";

const userObjs = new userObj();

const modeToggleButton = document.getElementById('modeToggleButton');

const profBtn = document.getElementById('profBtn');


modeToggleButton.addEventListener('click',(e)=>{
e.preventDefault();
localStorage.setItem('mode', 3);
window.location.replace('KernelMode/kernelMode.html');
})

profBtn.addEventListener('click', (e)=>{
e.preventDefault();
window.location.replace('UserInfo/userAccount.html');
});



/* ADDING TO CART ACTIONS */
const productInterface = document.getElementById('productInterface');
const imgContainerProductInterface = document.getElementById('imgContainerProductInterface');
const productInterfaceOptions = document.getElementById('productInterfaceOptions');

const addToCartBtn = document.querySelectorAll('.addToCartBtn');

const productInterfaceCloseBtn = document.querySelector('.productInterfaceCloseBtn');

addToCartBtn.forEach(button => {
    button.addEventListener('click', (e)=>{
        e.preventDefault();
        productInterface.classList.add('active');
        const productId = button.dataset.productId;

        imgContainerProductInterface.innerHTML = `<img src="./images/clothes${productId}.jpg" alt="clothes${productId}" class="productImage">`
        productInterfaceOptions.innerHTML = `
            <input type="color">
            <input type="number" min="1" max="99" id="itemQuantity">
            <button class="productInterfaceAddToCartBtn" type="button" data-final-product-id="final${productId}" >Add to Cart</button>
            `        
    })
});

productInterfaceOptions.addEventListener('click', (e) => {
    // Check if the clicked element is the new Add to Cart button
    const finalBtn = e.target.closest('.productInterfaceAddToCartBtn');
    if (!finalBtn) return; // Ignore clicks on the color or number inputs

    e.preventDefault();

    const quantity = document.getElementById('itemQuantity').value;

    const rawId = finalBtn.dataset.finalProductId; // Matches data-final-product-id
    const finalProductId = rawId.replace("final", "");

    const stockCheckerResult = systemCall.stockChecker(finalProductId,quantity);
    if(stockCheckerResult){
        localStorage.setItem();
    }
    
});
productInterfaceCloseBtn.addEventListener('click', (e)=>{
    productInterface.classList.remove('active');
})


