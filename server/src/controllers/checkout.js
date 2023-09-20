const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');

const CLIENT_URL = "http://localhost:5173";


//Checkout Session controls what your customer sees on the payment page such as line items, the order amount and currency, and acceptable payment methods. 
  const checkoutSession = async (req, res) => {
    try {
      const customerId = req.session.stripeCustomerId;

      const session = await stripe.checkout.sessions.create({
        customer: customerId, // Anger kund för sessionen
        line_items: req.body.map((item) => {
          return {
            price: item.product,
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        allow_promotion_codes: true, 
        success_url: `${CLIENT_URL}/confirmation`, //man kan - om man vill - få sessions id:t från Stripe här, lagrad i url:en, som en query parameter: success_url: `${CLIENT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${CLIENT_URL}/cancel`,
      });
  
      res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (error) {
      console.log(error.message);
      res.status(400).json("400 Error. Något blev fel på clientsidan.");
    }

  };


// Sökväg till JSON-filen
const ordersFilePath = "./src/utilities/orders.json";

// Funktion för att läsa användare från JSON-filen
function readOrdersFromFile() {
  try {
    const ordersData = fs.readFileSync(ordersFilePath, 'utf8');
    return JSON.parse(ordersData);
  } catch (error) {
    return [];
  }
}

// Funktion för att skriva användare till JSON-filen
function writeOrdersToFile(orders) {
  const jsonData = JSON.stringify(orders, null, 2); //ersätt inga värden, indenterar JSON-strängen med två mellanslag
  fs.writeFileSync(ordersFilePath, jsonData);
}

  
//Verify Session 
//Funktion som tar emot sessions-id:t, kollar om den är betalad, hämtar ut line-items (hämta ut det man behöver för att pussla ihop en order)
const verifySession = async (req, res) => {
  try {
      //hämta sessionen från Stripe och verifiera den
      const session = await stripe.checkout.sessions.retrieve(req.body.sessionId); 
      console.log(req.body.sessionId);
      
      //plocka ut vem som köpt, och vad man köpt (om sessionen är paid)
      if(session.payment_status !== "paid"){
        return res.status(400).json({ verified:false });
      }
      //hämtar line_items till ordern nedan (det man behöver/vill ha för att pussla ihop en order)
      const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId);
      // skapar en order och sparar undan den
      const order = {
        created: session.created, 
        customer: session.customer_details.name,
        products: line_items.data.map(item => {
          return {
            product: item.description, //namnet på produkten
            quantity: item.quantity, 
            price: item.price.unit_amount / 100 * item.quantity, 
            //vill man gå djupare får man använda objektet product
          };
        }),
      };

      //Spara ORDER (SKRIV TILL JSON-filen)
      const orders = readOrdersFromFile(); // Läser in befintliga ordrar
      //orders.push(order);
      writeOrdersToFile([... orders, order]); // Sparar ordern i json-filen
      res.status(200).json({ verified:true });

  } catch (error) {
    console.log(error.message);
    res.status(400).json("400 Error. Något blev fel på klienten.");
  }

};


module.exports = { checkoutSession, verifySession }; 