const optionButton = document.querySelector('.optionButton');
optionButton.addEventListener('click',(e) =>{
    const targetId = e.target.dataset;

    const targetPanel = document.getElementById('targetId');

    targetPanel.classList.add('active')
})