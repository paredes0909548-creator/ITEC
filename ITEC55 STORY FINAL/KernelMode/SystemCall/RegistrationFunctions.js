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
 static registration(userFormRegistration,userFormLogin){
    const userObjMaker = new userObj();
    
    userFormRegistration.addEventListener('submit', async(e) =>{
        e.preventDefault();
    const p = document.querySelector('#registrationStatus');
    const userAccount= JSON.parse(localStorage.getItem('Accounts')) || [];
    const incrementId = userAccount.length > 0 ? Math.max(...userAccount.map(user => user.customerId ||0)) + 1: 1; 
    
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const username = usernameInput.value.trim();
    const email    = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
        if (username === "" || email === "" || password === ""){
            console.log("cannot be empty");
            p.textContent= 'field cannot be empty';
            return;
        }
        
        const customerInfo = userObjMaker.userObjCreator(username,email,password,incrementId);
            if(RegistrationFunction.userChecker(customerInfo.customerName)){
                p.textContent='account already exist';

                /* cliniclear neto yung fields */
                usernameInput.value = "";
                emailInput.value = "";
                passwordInput.value = "";
                return;
            }
            else{
                p.textContent = 'Registration succeful';
                const userAccount = JSON.parse(localStorage.getItem('Accounts')) || [];
                userAccount.push(customerInfo);
                localStorage.setItem('Accounts' , JSON.stringify(userAccount));


                /* cliniclear neto yung fields */
                usernameInput.value = "";
                emailInput.value = "";
                passwordInput.value = "";

                userFormRegistration.classList.remove('active');
                userFormLogin.classList.add('active');
                return;
            }    
            
        })
 }

/* LOGIN LOGIC*/
 static login(userFormLogin,userFormRegistration,formWrapper,userFormAddress,userInfo){
    userFormLogin.addEventListener('submit' , async(e) =>{
        const p = document.querySelector('#loginStatus');
        e.preventDefault();
        const userLoginInput = document.getElementById('userLoginInput');
        const passwordLoginInput = document.getElementById('passwordLoginInput');

        const usernameLogin = userLoginInput.value.trim();
        const passwordLogin = passwordLoginInput.value.trim();
    
        if(usernameLogin ==="" || passwordLogin ===""){
            console.log("field cannot be empty");
            p.textContent = "field cannot be empty";
            return;
        }
        const loginAccount = RegistrationFunction.loginChecker(usernameLogin,passwordLogin);
        if(loginAccount !== null){
            localStorage.setItem('userStatus', loginAccount.customerId);
            p.textContent = 'Login Succefully';
            userFormLogin.classList.remove('active');
            RegistrationFunction.intialUi(userFormRegistration,formWrapper,userFormAddress,userInfo);
        }
        else{
            console.log("create an account first");
            p.textContent ="create an account first";
            userLoginInput.value ="";
            passwordLoginInput.value ="";
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

const hasEmptyField = Array.from(addressInput).some(input => input.value.trim() === "");
    if (hasEmptyField) {
        p.textContent = "Fill every field";
        return;
    }

const userName = localStorage.getItem('userStatus');

const userAccounts = JSON.parse(localStorage.getItem('Accounts'));
const account = userAccounts.find(user => user.customerId == userName);



const userAddress = userObjMaker.userAddress(account.customerId, unitNum, streetName, barangay, city_municipality, province, postal_zip);

console.log(userAddress);
const userAddressList = JSON.parse(localStorage.getItem('Address')) || [];
userAddressList.push(userAddress);
localStorage.setItem('Address', JSON.stringify(userAddressList));
RegistrationFunction.intialUi(userFormRegistration,formWrapper,userFormAddress,userInfo);
})
}

}
