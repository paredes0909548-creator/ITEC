import userObj from '../KernelMode/SystemCall/userObj.js';
import RegistrationFunction from '../KernelMode/SystemCall/RegistrationFunctions.js';

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
RegistrationFunction.registration(userFormRegistration);


/* LOGIN LOGIC*/
RegistrationFunction.login(userFormLogin,userFormRegistration,formWrapper,userFormAddress,userInfo);

/* Address logics*/
RegistrationFunction.addressLogic(userFormAddress,addressInput,userFormRegistration,formWrapper,userInfo);


