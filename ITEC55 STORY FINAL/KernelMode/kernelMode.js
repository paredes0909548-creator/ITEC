export default class kernelMode{

#item =[
{productId: 1, stocks: 20, price:10},
{productId:2, stocks:35, price:20},
{productId:3, stocks:10, price:30}
];

#process =[];

  productInfo(){
    return this.#item;
  }

  pushProcess(processObj) {
    this.#process.push(processObj);
  }

 deductStock(productId, qty) {
    const target = this.#item.find(item => item.productId === Number(productId));
    if (target && target.stocks >= Number(qty)) {
        target.stocks -= qty;
    }

}
}














const modeToggleButton = document.getElementById('modeToggleButton');

modeToggleButton.addEventListener('click', ()=>{
    localStorage.setItem('mode', 1);
    window.location.replace('../index.html');
});
document.addEventListener('DOMContentLoaded', () => {
    const optionButtons = document.querySelectorAll('.optionButton');
    const childInterfaces = document.querySelectorAll('.childInterface');

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            optionButtons.forEach(btn => btn.classList.remove('active'));
            childInterfaces.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');

            const targetId = button.dataset.target.trim();
            const targetInterface = document.getElementById(targetId);
            
            if (targetInterface) {
                targetInterface.classList.add('active');
            }
        });
    });
});





