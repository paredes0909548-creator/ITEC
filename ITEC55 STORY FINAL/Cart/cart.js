import cartCore from "./cartCore.js";

const modeToggleButton = document.getElementById('modeToggleButton');

modeToggleButton.addEventListener('click',(e)=>{
e.preventDefault();
localStorage.setItem('mode', 3);
window.location.replace('../KernelMode/kernelMode.html');
})

cartCore.renderCart();
cartCore.initCartEvents();

const checkOutBtn =  document.getElementById('checkOutBtn');
if(checkOutBtn){
checkOutBtn.addEventListener('click', (e)=>{
    e.preventDefault();
const cartList = cart.getCart();
console.log(cartList);

/* GAWIN MO NA YUNG CHECK OUT BALE PAG CLICK YUNG checkOutBtn variabl laman niyan is yung mga list ng add to cart na ilalagay mo dun sa array list ng process sa kernel */
})
}