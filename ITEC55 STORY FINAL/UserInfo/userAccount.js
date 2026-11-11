import userObj from './userAccountJs/userObj.js';
import RegistrationFunction from './userAccountJs/RegistrationFunctions.js';

const userObjMaker = new userObj();
/* FORM WRAPPER */
const formWrapper = document.getElementById('formWrapper');

/* Registration INFO */
const userFormRegistration = document.getElementById('userFormRegistration');
const registrationButton = document.getElementById('registrationButton');


/* Login INFO*/
const userLogin = document.getElementById('userLogin');
const loginButton = document.getElementById('loginButton');

/* ADDRESS INFO */
const userFormAddress = document.getElementById('userFormAddress');

/* USERINFO */
const userInfo = document.getElementById('userInfo');

let id =0;



RegistrationFunction.updateUI(userFormRegistration,userFormAddress,formWrapper,userInfo);

    loginButton.addEventListener('click',(e)=>{
        e.preventDefault();
        userFormRegistration.classList.remove('active');
        userLogin.classList.add('active');
    });

        registrationButton.addEventListener('click',(e)=>{
        e.preventDefault();
        userFormRegistration.classList.add('active');
        userLogin.classList.remove('active');
    });

/* Registration logics*/
userFormRegistration.addEventListener('submit', async(e) =>{
    let p = document.getElementById('status');
    const incrementId = id++; 
    e.preventDefault();
    
let username = document.getElementById('username').value.trim();
let email = document.getElementById('email').value.trim();
let password = document.getElementById('password').value.trim();

    if (username === "" || email === "" || password === ""){
        console.log("cannot be empty");
        p.textContent= 'cannot be empty';
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
userLogin.addEventListener('submit' , async(e) =>{
    let p = document.getElementById('status');
    e.preventDefault();
    const userLoginInput = document.getElementById('userLoginInput').value.trim();
    const passwordLoginInput = document.getElementById('passwordLoginInput').value.trim();

    if(userLoginInput ==="" || passwordLoginInput ===""){
        console.log("field cannot be empty");
        p.textContent = "field cannot be empty";
        return;
    }
    const loginAccount = RegistrationFunction.loginChecker(userLoginInput,passwordLoginInput);
    console.log(loginAccount);

    if(loginAccount !== null){
        localStorage.setItem('userStatus', loginAccount.customerName);
        p.textContent = 'Login Succefully';

        userLogin.classList.remove('active');
        userFormAddress.classList.add('active');
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

const userName = localStorage.getItem('userStatus');
const userAccounts = JSON.parse(localStorage.getItem('Accounts'));
const account = userAccounts.find(user => user.customerName == userName);
console.log(account);



const userAddress = userObjMaker.userAddress(account.customerId, unitNum, streetName, barangay, city_municipality, province, postal_zip);

console.log(userAddress);
const userAdressList = JSON.parse(localStorage.getItem('Address')) || [];
userAdressList.push(userAddress);
localStorage.setItem('Address', JSON.stringify(userAdressList));
localStorage.setItem('addressStatus', 1);
RegistrationFunction.updateUI(userFormRegistration,userFormAddress,formWrapper,userInfo);

})

