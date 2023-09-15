const express = require("express");
const checkoutRouter = express.Router();
const { checkoutSession , verifySession} =require("../controllers/checkout.js");
const { renderSuccess } = require("../controllers/confirmation.js");


//routes för checkout produkter
checkoutRouter.post("/create-checkout-session", checkoutSession);
checkoutRouter.post("/verify-session", verifySession);
checkoutRouter.post("/confirmation", renderSuccess); //blir det en get? eller post?


module.exports = { checkoutRouter }; 