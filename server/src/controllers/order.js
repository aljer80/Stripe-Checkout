const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const fs = require("fs");

//funktion för att skapa en order/beställning
async function createOrder(req, res, next) {
  try {
    const newOrder = {
      // Skapa orderstruktur här 
    };

    // Lägger till order i JSON-filen för att spara orderhistoriken
    const orders = readOrdersFromFile();
    orders.push(newOrder);
    writeOrdersToFile(orders);

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
}

function readOrdersFromFile() {
  try {
    const ordersData = fs.readFileSync(ordersFilePath, "utf8");
    return JSON.parse(ordersData);
  } catch (error) {
    return [];
  }
}

function writeOrdersToFile(orders) {
  const jsonData = JSON.stringify(orders, null, 2);
  fs.writeFileSync(ordersFilePath, jsonData);
}

//funktion för att hämta alla ordrar
function getOrders(req, res, next) {
    try {
      const orders = readOrdersFromFile();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json();
    }
  }
 
//funktion för att hämta en specifik order
  function getOrderById(req, res, next) {
    try {
      const orders = readOrdersFromFile();
      const order = orders.find((order) => order.id === req.params.id);
  
      if (!order) {
        return res.status(404).json(req.params.id + " not found");
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json();
    }
  }
  
  module.exports = { createOrder, getOrders, getOrderById }; 