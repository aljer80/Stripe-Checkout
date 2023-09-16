const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = "http://localhost:5173/";

//Checkout Session controls what your customer sees on the payment page such as line items, the order amount and currency, and acceptable payment methods. 
  const checkoutSession = async (req, res) => {
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
  
      res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (error) {
      console.log(error.message);
      res.status(400).json("400 Error. Något blev fel på clientsidan.");
    }

  };
  
//Verify Session 
const verifySession = async (req, res) => {
  try {
      console.log(req.body.sessionId);
      res.status(200).json({ verified: true });
      //hämta sessionen från Stripe och verifiera den
      const session = await stripe.checkout.sessions.retrieve(req.body.sessionId); //plocka ut vad man vill ha. T.ex. på price. Plocka ut och göra uträkning
        //plocka ut vem som köpt, och vad man köpt
      if(session.payment_status !== "paid"){
        return res.status(400).json({ verified:false });
      }
      //hämtar line_items till ordern nedan
      const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId)

      // skapa en order och spara undan den (ta med det man själv vill ha med)
      const order = {
        created: session.created, 
        customer: session.customer_details.name,
        products: line_items.data.map(item => {
          return {
            //vill man gå djupare får man använda objektet product
            product: item.description, //namnet på produkten
            quantity: item.quantity, 
            price: item.price.unit_amount / 100 * item.quantity, 
            
          }
        })
      };
      //SAVE ORDER
      //SKRIV TILL JSON-filen
      
      console.log("Loggar ut order: ", order);

      res.status(200).json({ verified:true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("400 Error. Något blev fel på klienten.");
  }

};


module.exports = { checkoutSession, verifySession }; 