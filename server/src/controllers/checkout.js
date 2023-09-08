const { app } = require("../utilities/app.js");

const CLIENT_URL = "http://127.0.0.1:5173";

//göra om, ej app.post
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.map((item) => {
        return {
          price: item.product,
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Det gick inte bra...");
  }
});
  

module.exports = { checkoutSession };