
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const CLIENT_URL = "http://localhost:5173/";

//Checkout Session controls what your customer sees on the payment page such as 
//line items, the order amount and currency, and acceptable payment methods. 
  const checkoutSession = async (req, res) => {
    console.log("från checkout-session", req.body);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID of the product you want to sell
          price: 'price_1NnPRoFM2JYZGY8MGc8Ahml7',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${CLIENT_URL}?success=true`,
      cancel_url: `${CLIENT_URL}?canceled=true`,
    });

    res.status(200).json({ url: session.url, sessionId: session.id });


    // try {
    //   const session = await stripe.checkout.sessions.create({
    //     line_items: req.body.map((item) => {
    //       return {
    //         price: item.product,
    //         quantity: item.quantity,
    //       };
    //     }),
    //     mode: "payment",
    //     success_url: `${CLIENT_URL}/confirmation`,
    //     cancel_url: CLIENT_URL,
    //   });
  
    //   res.status(200).json({ url: session.url, sessionId: session.id });
    // } catch (error) {
    //   console.log(error.message);
    //   res.status(400).json("Det gick inte bra...");
    // }


  };
    
    

//kod från kodstuga 11/9
// app.post("verify-session", async (req, res) => {
//   console.log('req.body.sessionId');
//   try{
//       const session = await stripe.checkout.sessions.retrieve(req.body.sessionId); //MAN KAN expanda här och lägga till line items eller göra ett anrop till

//       if(session.payment_status !== "paid") {
//           return res.status(400).json({ verified: false });
//       };

//       const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId) //plocka ut vad man vill ha. Veta vem som köpt och vad iaf. 


//       //skapa en order och spara undan
//       const order = {
//           created: session.created, 
//           customer: session.customer_details.name,
//           products: line_items.data.map(item => {
//               return {
//                   product: item.description,
//                   quantity: item.quantity,
//                   price: item.price.unit_amount / 100 * item.quantity, 
//               };
//           }),
//       };

//       //Save order t.ex. en orders.json

//       console.log("ORDER", order);

//       res.status(200).json({ verified: true });
//   } catch (error){
//       console.error(error.message);
//   }
// });
  

module.exports = { checkoutSession }; 