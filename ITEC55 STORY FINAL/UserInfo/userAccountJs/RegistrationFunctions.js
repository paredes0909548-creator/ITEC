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

   static addressChecker(userFormAddress){

      userFormAddress.addEventListener('submit',(e)=>{
         e.preventDefault();
         const addressStatus = localStorage.getItem('addressStatus');
         if(addressStatus == 0){

         }

         })
   }

    static updateUI(userFormRegistration,userFormAddress,formWrapper,userInfo){
    if(!localStorage.getItem('userStatus')){
        localStorage.setItem('userStatus', 'Guess');
    }
    if(!localStorage.getItem('addressStatus')){
        localStorage.setItem('addressStatus',0);
    }
    const userStatus = localStorage.getItem('userStatus');
    const addressStatus = localStorage.getItem('addressStatus');
            /* Check if it is guess mode or not */
    if(userStatus === "Guess"){
    userFormRegistration.classList.add('active'); /* This shows the button initially */
    }
    else{
        userFormRegistration.classList.remove('active');
        userFormAddress.classList.add('active');
    }
        if(addressStatus == 1){
         formWrapper.classList.add('active');
         userInfo.classList.add('active');

      }
 
}

}