const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//funktion som hämtar produkter 
async function getProducts(req, res, next) {
  try {
    const products = await stripe.products.list();

    // Formatera och returnera produkterna
    const formattedProducts = products.data.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.metadata.price, // Om du har prisinformation som metadata i Stripe
      // Lägg till andra önskade fält här
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = { getProducts }; 