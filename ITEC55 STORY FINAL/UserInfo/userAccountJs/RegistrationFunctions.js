export default class RegistrationFunction{

   static profilePic(username,profile){
        let letterProfile = username.charAt(0).toUpperCase();
        profile.value = letterProfile;
    }
}