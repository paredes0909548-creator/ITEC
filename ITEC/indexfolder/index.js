
function showSidebar(){
    const sidebar=document.querySelector('.side-bar')
    sidebar.style.display='flex'
}
function closeSidebar(){
    const sidebar=document.querySelector('.side-bar')
    sidebar.style.display='none'
}

const recipe_creationbtn=document.getElementById('recipe_creationbtn')
const recipe_creation=document.getElementById('recipe_creation')
const close_recipe_creationbtn=document.getElementById('close_recipe_creationbtn')

recipe_creationbtn.addEventListener('click', (e) => {
    e.preventDefault();
    recipe_creation.classList.add('active');
});
close_recipe_creationbtn.addEventListener('click', (e) => {
    e.preventDefault();
    recipe_creation.classList.remove('active');
});