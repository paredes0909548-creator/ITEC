import userFetcher from './userAccountJs/userFetcher.js';
import userObj from './userAccountJs/userObj.js';
import RegistrationFunction from './userAccountJs/RegistrationFunctions.js';

const userObjMaker = new userObj();
const userObjFetcher = new userFetcher();

let p = document.getElementById('status');

const formWrapper = document.getElementById('formWrapper');

/* User INFO */
const userInfoWrapper = document.getElementById('userInfoWrapper');
const userFormRegistration = document.getElementById('userFormRegistration');
const userProfilePic =document.getElementById('userProfilePic');
const userProfileName = document.getElementById('userProfileName');

/* ADDRESS INFO */
const userFormAddress = document.getElementById('userFormAddress');



async function updateUI(){
    const boolean =localStorage.getItem('boolean');
    const username =localStorage.getItem('username')

if( boolean === '1'){
    userFormAddress.remove();
    formWrapper.remove();
    userInfoWrapper.classList.add('show')

    const firstLetter = username.trim().charAt(0).toUpperCase();  

    userProfilePic.textContent  = firstLetter;
    userProfileName.textContent = username;


    const unitNumText = document.getElementById('unitNumText');

    const barangayText = document.getElementById('barangayText');

    const streetNameText = document.getElementById('streetNameText');

    const cityMunicipalityText = document.getElementById('cityMunicipalityText');

    const provinceText = document.getElementById('provinceText');

    const postalZipText = document.getElementById('postalZipText');

    const  userInfo = await userObjFetcher.fetchGetInfo();

    unitNumText.textContent = userInfo.unitNum;
    barangayText.textContent = userInfo.barangay;
    streetNameText.textContent = userInfo.streetName;
    cityMunicipalityText.textContent = userInfo.city_municipality;
    provinceText.textContent = userInfo.province;
    postalZipText.textContent = userInfo.postal_zip;

    

}
else if(username){
    userFormRegistration.remove();
    userFormAddress.style.display = 'flex';
}
}
updateUI();

/* Registration logics*/
const input = document.querySelector('input');
userFormRegistration.addEventListener('submit', async(event) =>{
    event.preventDefault();
    
let username = document.getElementById('username').value.trim();
let email = document.getElementById('email').value.trim();
let phone = document.getElementById('phone').value.trim(); 

    if (input.value.trim() === ""){
        console.log("cannot be empty");
        return;
    }

    const customerInfo = userObjMaker.userObjCreator(username,email,phone);

    localStorage.setItem('customerInfo',customerInfo);
})



/* Address logics*/
userFormAddress.addEventListener('submit', async(event) =>{
event.preventDefault();

const unitNum = document.getElementById('unitNum').value.trim();
const streetName = document.getElementById('streetName').value.trim();
const barangay = document.getElementById('barangay').value.trim();
const city_municipality = document.getElementById('city_municipality').value.trim();
const province = document.getElementById('province').value.trim();
const postal_zip = document.getElementById('postal_zip').value.trim();

const customerId = localStorage.getItem('loggedUser');


const userAddress = userObjMaker.userAddress(customerId, unitNum, streetName, barangay, city_municipality, province, postal_zip);

localStorage.setItem('userAddress', userAddress);



})

