const initStripe = () => {
    const Stripe = require("stripe");
    return Stripe(process.env.STRIPE_SECRET_KEY);
};

module.exports = { initStripe };

//i filen man tar in Stripe:
// const { initStripe } = require("../path till stripe");
// const stripe = initStripe();


// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const app = express();
// app.use(express.json());

// // const CLIENT_URL = "http://127.0.0.1:5173";
// const CLIENT_URL = "http://localhost:5173";

// //Middlewares
// app.use(
//   cors({
//     origin: "*",
//   })
// );

// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//             {
//             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//             price: '{{price_1NnPRoFM2JYZGY8MGc8Ahml7}}',
//             quantity: 1,
//             },
//         ],
//         mode: "payment",
//         success_url: `${CLIENT_URL}/confirmation`,
//         cancel_url: CLIENT_URL,
//     });

//     res.redirect(303, session.url);
//     // res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json("Det gick inte bra...");
//   }
// });

// app.listen(3000, () => console.log("Server is up and running..."));