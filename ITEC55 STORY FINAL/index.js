import systemCall from "./KernelMode/systemCall.js";

const modeToggleButton = document.getElementById('modeToggleButton');

const profBtn = document.getElementById('profBtn');


modeToggleButton.addEventListener('click',(e)=>{
e.preventDefault();
localStorage.setItem('mode', 3);
window.location.replace('KernelMode/kernelMode.html');
})

profBtn.addEventListener('click', (e)=>{
e.preventDefault;
window.location.replace('UserInfo/userAccount.html');
});



/* ADDING TO CART ACTIONS */
const productInterface = document.getElementById('productInterface');
const imgContainerProductInterface = document.getElementById('imgContainerProductInterface');
const addToCartBtn = document.querySelectorAll('.addToCartBtn');

const productInterfaceCloseBtn = document.querySelector('.productInterfaceCloseBtn');

addToCartBtn.forEach(button => {
    button.addEventListener('click', (e)=>{
        e.preventDefault();
        productInterface.classList.add('active');
        const productId = button.dataset.productId;

        imgContainerProductInterface.innerHTML = `<img src="./images/clothes${productId}.jpg" alt="clothes${productId}" class="productImage">
        <button class="productInterfaceAddToCartBtn" type="button" data-product-id="${productId}" >Add to Cart</button>`


    })
});

productInterfaceCloseBtn.addEventListener('click', (e)=>{
    productInterface.classList.remove('active');
})

