export default class userObj{

userObjCreator(username, email,phone){
const customer = {
customerName: username,
customerEmail: email,
customerPhone:phone
}
return customer;
}

userAddress(customerId,unitNum, streetName, barangay, city_municipality, province, postal_zip){
const address = {
    customerId:parseInt(customerId, 10),
    unitNum:unitNum,
    streetName:streetName,
    barangay:barangay,
    city_municipality:city_municipality,
    province:province,
    postal_zip:parseInt(postal_zip, 10) || 0
}
return address;
}
}