import userFetcher from './userAccountJs/userFetcher.js';
import userObj from './userAccountJs/userObj.js';
import RegistrationFunction from './userAccountJs/RegistrationFunctions.js';

const userObjMaker = new userObj();
const userObjFetcher = new userFetcher();

let p = document.getElementById('status');
let input = document.querySelector('input');

const formWrapper = document.getElementById('formWrapper');

/* User INFO */
const userInfoWrapper = document.getElementById('userInfoWrapper');
const userFormRegistration = document.getElementById('userFormRegistration');
const userProfilePic =document.getElementById('userProfilePic');
const userProfileName = document.getElementById('userProfileName');

/* ADDRESS INFO */
const userFormAddress = document.getElementById('userFormAddress');


/* in here is when the user succefully register it will remove the userFormRegistration so that the user cannot accidentally sigup again*/
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
userFormRegistration.addEventListener('submit', async(event) =>{
    event.preventDefault();
    
let username = document.getElementById('username').value.trim();
let email = document.getElementById('email').value.trim();
let phone = document.getElementById('phone').value.trim(); 

    if (input.value.trim() === ""){
        console.log("WALANG LAMAN BOIIII");
        return;
    }

    let customerInfo = userObjMaker.userObjCreator(username,email,phone);

    try{
    const data= await userObjFetcher.fetchCustomer(customerInfo);
        console.log("Registration complete on UI!",data);

        localStorage.setItem("username" , username)
        localStorage.setItem("loggedUser", data.data.customerID);    
        userFormRegistration.remove();
        userFormAddress.style.display = 'flex';    


        updateUI();

        p.textContent = data.message;



    }catch(error){
        console.log(error.message);
        p.textContent = error.message;
    }
  
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
console.log(userAddress);

try{
    const data =  await userObjFetcher.fetchCustomerAddress(userAddress);
    console.log("Response: ",data)
    localStorage.setItem('boolean', '1');
    setTimeout(()=>{
        window.location.replace("../UserInterface.html");
    },3000) 

    p.textContent = data.message;

}catch(error){
    console.log(error.message);
    p.textContent = error.message;
}


})

