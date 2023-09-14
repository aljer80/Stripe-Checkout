const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//funktion som hämtar produkter 
async function getProducts (req, res){
  let endpoint= "https://api.stripe.com/v1/products"; 
  let requestOptions = {
      method:"GET",
      headers:{
          "Content-Type":"application/json",
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

// async function getProducts(req, res) {
//   try {
//     const products = await stripe.products.list();

//     // Formatera och returnera produkterna
//     const formattedProducts = products.data.map((product) => ({
//       id: product.id,
//       name: product.name,
//       description: product.description,
//       price: product.metadata.price, // Om du har prisinformation som metadata i Stripe
//       // Lägg till andra önskade fält här
//     }));

//     res.status(200).json(formattedProducts);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// }

module.exports = { getProducts }; 