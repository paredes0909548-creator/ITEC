import userObj from './userAccountJs/userObj.js';
import RegistrationFunction from './userAccountJs/RegistrationFunctions.js';

const userObjMaker = new userObj();
/* FORM WRAPPER */
const formWrapper = document.getElementById('formWrapper');

/* Registration INFO */
const userFormRegistration = document.getElementById('userFormRegistration');
const registrationButton = document.getElementById('registrationButton');


/* Login INFO*/
const userFormLogin = document.getElementById('userFormLogin');
const loginButton = document.getElementById('loginButton');

/* ADDRESS INFO */
const userFormAddress = document.getElementById('userFormAddress');
const addressInput = document.querySelector('.addressInput');

/* USERINFO */
const userInfo = document.getElementById('userInfo');

let id =0;


window.addEventListener('pageshow',()=>{
RegistrationFunction.intialUi(userFormRegistration,formWrapper,userFormAddress,userInfo);
})
RegistrationFunction.intialUi(userFormRegistration,formWrapper,userFormAddress,userInfo);

    loginButton.addEventListener('click',(e)=>{
        e.preventDefault();
        userFormRegistration.classList.remove('active');
        userFormLogin.classList.add('active');
    });

    registrationButton.addEventListener('click',(e)=>{
        e.preventDefault();
        userFormRegistration.classList.add('active');
        userFormLogin.classList.remove('active');
    });



/* Registration logics*/
userFormRegistration.addEventListener('submit', async(e) =>{
    const p = document.querySelector('#registrationStatus');
    const incrementId = id++; 
    e.preventDefault();
    
let username = document.getElementById('username').value.trim();
let email = document.getElementById('email').value.trim();
let password = document.getElementById('password').value.trim();

    if (username === "" || email === "" || password === ""){
        console.log("cannot be empty");
        p.textContent= 'field cannot be empty';
        return;
    }
    const customerInfo = userObjMaker.userObjCreator(username,email,password,incrementId);
   

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


/* LOGIN LOGIC*/
userFormLogin.addEventListener('submit' , async(e) =>{
    const p = document.querySelector('#loginStatus');
    e.preventDefault();
    const userLoginInput = document.getElementById('userLoginInput').value.trim();
    const passwordLoginInput = document.getElementById('passwordLoginInput').value.trim();

    if(userLoginInput ==="" || passwordLoginInput ===""){
        console.log("field cannot be empty");
        p.textContent = "field cannot be empty";
        return;
    }
    const loginAccount = RegistrationFunction.loginChecker(userLoginInput,passwordLoginInput);
    if(loginAccount !== null){
        localStorage.setItem('userStatus', loginAccount.customerId);
        p.textContent = 'Login Succefully';
        userFormLogin.classList.remove('active');
        RegistrationFunction.intialUi(userFormRegistration,formWrapper,userFormAddress,userInfo);
    }
    
})


/* Address logics*/
userFormAddress.addEventListener('submit', async(event) =>{
event.preventDefault();
const p = document.querySelector('#addressStatus');


const unitNum = document.getElementById('unitNum');
const streetName = document.getElementById('streetName');
const barangay = document.getElementById('barangay');
const city_municipality = document.getElementById('city_municipality');
const province = document.getElementById('province');
const postal_zip = document.getElementById('postal_zip');

if(addressInput.value.trim() === ""){
    p.textContent ="Field Cannot be empty";
    return;
}

const userName = localStorage.getItem('userStatus');

const userAccounts = JSON.parse(localStorage.getItem('Accounts'));
const account = userAccounts.find(user => user.customerId == userName);



const userAddress = userObjMaker.userAddress(account.customerId, unitNum, streetName, barangay, city_municipality, province, postal_zip);

console.log(userAddress);
const userAdressList = JSON.parse(localStorage.getItem('Address')) || [];
userAdressList.push(userAddress);
localStorage.setItem('Address', JSON.stringify(userAdressList));
RegistrationFunction.intialUi(userFormRegistration,formWrapper,userFormAddress,userInfo);
})


