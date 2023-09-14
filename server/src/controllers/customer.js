const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCustomer(req, res) { 
    let endpoint= "https://api.stripe.com/v1/customers"; 
    let requestOptions = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        }        
    };

    return await fetch(endpoint, requestOptions)
    // wait for the response and use .then() to handle outcome
    .then(async (response)  => {
        if(!response.ok){
            throw new Error(
                `${response.status} -> ${response.statusText} \r\n ${response.text()}`
            );
        }
        try{
            let data = await response.json();
            res.json(data);    //skickar tillbaka till FE
        }
        catch(error){
            let responseText = await response.text();
            console.log(responseText);
            throw error;
        }
    })
    // wait for the then() to finish and use .catch() to bubble errors to catch{}
    .catch(async (error)    => {
        throw await error;
    });
}


module.exports = { createCustomer }; 