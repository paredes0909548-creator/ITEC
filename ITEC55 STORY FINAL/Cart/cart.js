import systemCall from "../KernelMode/SystemCall/systemCall.js";
import cartCore from "./cartCore.js";

systemCall.storeTime();
const profBtn = document.getElementById('profBtn');
profBtn.addEventListener('click', (e)=>{
e.preventDefault();
window.location.replace('../UserInfo/userAccount.html');
});

const modeToggleButton = document.getElementById('modeToggleButton');
modeToggleButton.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('mode', 3); // Switch to Kernel Mode
  window.location.replace('../KernelMode/kernelMode.html');
});

cartCore.renderCart();
cartCore.initCartEvents();

const checkOutBtn = document.getElementById('checkOutBtn');
if (checkOutBtn) {
  checkOutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const cartList = systemCall.getCart();
    const CID = localStorage.getItem('userStatus');
    
    // Optional: Let user pick "Express Shipping" (Priority 1) vs "Standard" (Priority 3) in UI
    const prioritySelect = document.getElementById('shippingPriority'); 
    const priority = prioritySelect ? Number(prioritySelect.value) : 2;

    // Invoke System Call
    const result = systemCall.checkOutRequest(CID, cartList, priority);

    if (result.valid) {
      alert(result.message);
      cartCore.saveToCart([]); // Clear User Mode cart
      cartCore.renderCart();   // Update UI
      
      // Optional: Redirect directly to Kernel Mode to watch the CPU schedule this order
      // localStorage.setItem('mode', 3);
      // window.location.replace('../KernelMode/kernelMode.html');
    } else {
      alert(result.message);
    }
  });
}