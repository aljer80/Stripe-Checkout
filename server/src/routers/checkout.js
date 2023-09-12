const express = require("express");
const checkoutRouter = express.Router();
const { checkoutSession } =require("../controllers/checkout.js")


//routes för checkout produkter
checkoutRouter.post("/create-checkout-session", checkoutSession);


module.exports = { checkoutRouter }; 