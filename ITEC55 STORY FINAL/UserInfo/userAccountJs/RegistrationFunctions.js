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

   addresMaker(){
      
   }

}