/* Buttons */
const accountBtn     = document.getElementById('accountBtn');
const transactionBtn = document.getElementById('transactionBtn');
const cartBtn        = document.getElementById('cartBtn');
const historyBtn     = document.getElementById('historyBtn');

/* Interface */
const accountInterface     = document.getElementById('accountInterface');
const transactionInterface = document.getElementById('transactionInterface');
const cartInterface        = document.getElementById('cartInterface');
const historyInterface     = document.getElementById('historyInterface');

accountBtn.addEventListener('click',(e)=>{
    const clickedBtn = e.target.closest('.optionButton');
    if (!clickedBtn) return; 
accountInterface.classList.add('active');
});