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

   static addressChecker(customerId){
    const userAddress = JSON.parse(localStorage.getItem('Address')) || [];


    const addressExist = userAddress.find( address => address.customerId == customerId )

    return addressExist ?? null;
    
   }

    static intialUi(userFormRegistration,formWrapper,userFormAddress){
    if(!localStorage.getItem('userStatus')){
        localStorage.setItem('userStatus', 'guess');
    }
    if(!localStorage.getItem('addressStatus')){
        localStorage.setItem('addressStatus',0);
    }
    const userStatus = localStorage.getItem('userStatus');

            /* Check if it is guess mode or not */
    if(userStatus.trim() === "guess"){
    userFormRegistration.classList.add('active');/* This shows the registration initially */
    formWrapper.classList.add('active');
    }    



    
}
static showUserInfo(userInfo){
    userInfo.classList.add('active');
    }

}