export default class kernelMode{

#item =[
{productID: 1, quantity: 20},
{productID:2, quantity:35},
{productID:3, quantity:10}
];

#process =[];
  productInfo(){
    return this.#item;
  }

  pushProcess(processObj) {
    this.#process.push(processObj);
  }


}

const modeToggleButton = document.getElementById('modeToggleButton');

modeToggleButton.addEventListener('click', ()=>{
    localStorage.setItem('mode', 1);
    window.location.replace('../index.html');
});
document.addEventListener('DOMContentLoaded', () => {
      const kernel = new kernelMode();

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





