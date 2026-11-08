export default class userFetcher{

async fetchCustomer(customer){
try{
    const fetchC= await fetch(`http://localhost:8080/api/v1/useraccount/customer`,{
    method:"POST",
    headers:{
    "Content-type":"application/json"
    },
    body: JSON.stringify(customer)
});


    const data = await fetchC.json();

    if(!fetchC.ok){
    console.error("Backend validation error details:", data);
      throw new Error(data.message || data.info || data.text || "Sign up failed");
    }



    return data;


    }catch(error){
    throw  error;
    }

}

async fetchCustomerAddress(address){
    try{
    const fetchC= await fetch(`http://localhost:8080/api/v1/useraccount/address`,{
    method:"POST",
    headers:{
    "Content-type":"application/json"
    },
    body: JSON.stringify(address)
});


    const data = await fetchC.json();

    if(!fetchC.ok){
      throw new Error(data.message || data.data || data.text || "Sign up failed");
    }
    return data;



    }catch(error){
    throw error;
    }
}


async fetchGetInfo(){
 const customerId = localStorage.getItem('loggedUser');

 try{
    const data = await fetch(`http://localhost:8080/api/v1/useraccount/${customerId}`,{
        method: 'GET',
        headers:{
        'Accept': 'application/json',
        }
    });

    if(!data.ok){
        throw new Error(data);
    }

    const info = await data.json();
    return info;
 }catch(error){
    throw  error;
 }
}
}