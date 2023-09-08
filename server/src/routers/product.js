//routes för checkout produkter
const express = require("express");
const productRouter = express.Router();



//routes för produkter
productRouter.get("", getProducts);


module.exports = { productRouter }; 