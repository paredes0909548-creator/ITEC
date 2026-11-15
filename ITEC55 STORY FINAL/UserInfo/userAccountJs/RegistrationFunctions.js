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
}
