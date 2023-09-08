const express = require("express");
const { getProducts, getProductsById } = require("../controllers/product.js"); 
const { userIsLoggedIn, userLoggedInAsAdmin} = require ("../middlewares/middlewares.js");
const productRouter = express.Router();

//productRouter.get("", getProducts);
//productRouter.get("/:id", getProductsById); //behövs ej
productRouter.post("", userIsLoggedIn, userLoggedInAsAdmin);


module.exports = { productRouter }; 