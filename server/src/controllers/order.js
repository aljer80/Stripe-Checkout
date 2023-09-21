const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const fs = require("fs");

// Sökväg till JSON-filen
const ordersFilePath = "./src/utilities/orders.json";

function readOrdersFromFile() {
  try {
    const ordersData = fs.readFileSync(ordersFilePath, "utf8");
    return JSON.parse(ordersData);
  } catch (error) {
    return [];
  }
}

//funktion för att hämta alla sina egna ordrar
function getOrders(req, res, next) {
  try {
    const userId = req.session.stripeCustomerId
    // const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const orders = readOrdersFromFile();
    
    const userOrders = orders.filter(order => order.customerId === userId); // Filtrerar ordrarna baserat på användaren (användar-ID). 
      console.log(userOrders);
      
      res.status(200).json(userOrders);
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

  module.exports = { getOrders }; 