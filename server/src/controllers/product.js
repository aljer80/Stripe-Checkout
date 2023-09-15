const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function getProducts(req, res) {
  try {
    const products = await stripe.products.list({expand:["data.default_price"]});

    // Formatera och returnera produkterna
    const formattedProducts = products.data.map((product) => ({
      id: product.id,
      images: product.images,
      name: product.name,
      description: product.description,
      price: product.default_price.unit_amount // populate, expand
      // Lägg till andra önskade fält här
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = { getProducts }; 

// const product = {
  //     id: product.id,
  //     image: product.images,
  //     name: product.name,
  //     price: product.default_price,  
  //     description: product.description
  // }

//funktion som hämtar produkter 
// async function getProducts (req, res){
//   let endpoint= "https://api.stripe.com/v1/products"; 
//   let requestOptions = {
//       method:"GET",
//       headers:{
//           "Content-Type":"application/json",
//           "Authorization": `Bearer ${key}`
//       }        
//   };
//   return await fetch(endpoint, requestOptions)
//   // wait for the response and use .then() to handle outcome
//   .then(async (response)  => {
//       if(!response.ok){
//           throw new Error(
//               `${response.status} -> ${response.statusText} \r\n ${response.text()}`
//           );
//       }
//       try{
//           let data = await response.json();
//           res.json(data);    //skickar tillbaka till FE
//       }
//       catch(error){
//           let responseText = await response.text();
//           console.log(responseText);
//           throw error;
//       }
//   })
//   // wait for the then() to finish and use .catch() to bubble errors to catch{}
//   .catch(async (error)    => {
//       throw await error;
//   });
// }