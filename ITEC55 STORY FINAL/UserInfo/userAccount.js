import userObj from './userAccountJs/userObj.js';
import RegistrationFunction from './userAccountJs/RegistrationFunctions.js';

const userObjMaker = new userObj();

let p = document.getElementById('status');

/* User INFO */
const userFormRegistration = document.getElementById('userFormRegistration');

/* ADDRESS INFO */
const userFormAddress = document.getElementById('userFormAddress');

let id =0;

async function updateUI(){


}
updateUI();

/* Registration logics*/
const input = document.querySelector('input');
userFormRegistration.addEventListener('submit', async(event) =>{
    const incrementId = id++; 
    event.preventDefault();
    
let username = document.getElementById('username').value.trim();
let email = document.getElementById('email').value.trim();
let phone = document.getElementById('phone').value.trim();

    if (input.value.trim() === ""){
        console.log("cannot be empty");
        p.textContent= 'cannot be empty';
        return;
    }
    const customerInfo = userObjMaker.userObjCreator(username,email,phone,incrementId);
   

        if(RegistrationFunction.userChecker(customerInfo.customerName)){
            p.textContent='account already exist';
            return;
        }
        else{
            p.textContent = 'Registration succeful';
            const userAccount = JSON.parse(localStorage.getItem('Accounts')) || [];

            userAccount.push(customerInfo);
            
            localStorage.setItem('Accounts' , JSON.stringify(userAccount));
            return;
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

localStorage.setItem('userAddress', userAddress);



})

