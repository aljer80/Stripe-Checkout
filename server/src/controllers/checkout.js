const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = "http://localhost:5173/";

//Checkout Session controls what your customer sees on the payment page such as line items, the order amount and currency, and acceptable payment methods. 
  const checkoutSession = async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: req.body.map((item) => {
          return {
            price: "price_1NnPRoFM2JYZGY8MGc8Ahml7",
            quantity: "1"
            //price: item.product,
            //quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${CLIENT_URL}/confirmation`,
        cancel_url: CLIENT_URL,
      });
  
      res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (error) {
      console.log(error.message);
      res.status(400).json("400 Error. Något blev fel på clientsidan.");
    }

  };
    
  // const session = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       // Provide the exact Price ID of the product you want to sell
  //       price: 'price_1NnPRoFM2JYZGY8MGc8Ahml7',
  //       quantity: 1,
  //     },
  //   ],
  //   mode: 'payment',
  //   success_url: `${CLIENT_URL}?success=true`,
  //   cancel_url: `${CLIENT_URL}?canceled=true`,
  // });

  // res.status(200).json({ url: session.url, sessionId: session.id });


  

module.exports = { checkoutSession }; 