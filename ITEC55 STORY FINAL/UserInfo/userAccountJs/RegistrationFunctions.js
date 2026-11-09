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


}