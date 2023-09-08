const express = require("express");
const confirmationRouter = express.Router();

confirmationRouter.post("/create-checkout-session", renderSuccess); //behöver kanske ej vara "hemligt"? funkar med GET


module.exports = { confirmationRouter }; 