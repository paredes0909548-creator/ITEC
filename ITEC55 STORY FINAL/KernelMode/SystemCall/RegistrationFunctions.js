import userObj from "./userObj.js";
export default class RegistrationFunction{
   static userChecker(usernameToCheck){

    const allAccounts = JSON.parse(localStorage.getItem("Accounts")) || [];
    
    const accountExists = allAccounts.some(user => user.customerName === usernameToCheck);
    
    return accountExists; 
   }

   static loginChecker(username,password){
    const userAccount = JSON.parse(localStorage.getItem("Accounts")) || [];

    const accountExists = userAccount.find(user => user.customerName === username && user.customerPassword === password);

    return accountExists ?? null;
   }

    static intialUi(userFormRegistration,formWrapper,userFormAddress,userInfo){
    if(!localStorage.getItem('userStatus')){
        localStorage.setItem('userStatus', 'guess');
    }

    const userStatus = localStorage.getItem('userStatus');

            /* Check if it is guess mode or not */
    if(userStatus.trim() === "guess"){
        userFormRegistration.classList.add('active'); /* This shows the registration initially */
        formWrapper.classList.add('active');
    }
    else{
            /* CHECKS IF ADDRESS IS CREATED OR NOT */
        const userAddress = JSON.parse(localStorage.getItem('Address')) || [];
        const customerId = localStorage.getItem('userStatus');

        const addressExist = userAddress.find( address => address.customerId == customerId )

        if(addressExist){
            formWrapper.classList.remove('active');
            userInfo.classList.add('active');
        }
        else{
            formWrapper.classList.add('active');
            userFormAddress.classList.add('active');
        }
    }
}

/* Registration logics*/
 static registration(userFormRegistration){
    const userObjMaker = new userObj();
    
    userFormRegistration.addEventListener('submit', async(e) =>{
        e.preventDefault();
        const p = document.querySelector('#registrationStatus');
        const userAccount= JSON.parse(localStorage.getItem('Accounts')) || [];
        const incrementId = userAccount.length > 0 ? Math.max(...userAccount.map(user => user.customerId ||0)) + 1: 1; 
        e.preventDefault();
        
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
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
 }

/* LOGIN LOGIC*/
 static login(userFormLogin,userFormRegistration,formWrapper,userFormAddress,userInfo){
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
 }

/* Address logics*/
static addressLogic(userFormAddress,addressInput,userFormRegistration,formWrapper,userInfo){

userFormAddress.addEventListener('submit', async(event) =>{
event.preventDefault();
const userObjMaker = new userObj();
const p = document.querySelector('#addressStatus');


const unitNum = document.getElementById('unitNum').value.trim();
const streetName = document.getElementById('streetName').value.trim();
const barangay = document.getElementById('barangay').value.trim();
const city_municipality = document.getElementById('city_municipality').value.trim();
const province = document.getElementById('province').value.trim();
const postal_zip = document.getElementById('postal_zip').value.trim();

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
}

}
