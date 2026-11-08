const storeContainer = document.getElementById('storeContainer');
const modeToggleButton = document.getElementById('modeToggleButton');


modeToggleButton.addEventListener('click',(e)=>{
e.preventDefault();
localStorage.setItem('mode', 3);
window.location.replace('KernelMode/kernelMode.html');


})