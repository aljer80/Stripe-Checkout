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
      price: product.default_price.unit_amount, // populate, expand
      priceId: product.default_price.id
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = { getProducts }; 