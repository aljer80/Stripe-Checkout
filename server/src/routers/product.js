const express = require("express");
const { getProducts } = require("../controllers/product.js"); 
const { userIsLoggedIn, userLoggedInAsAdmin} = require ("../middlewares/middlewares.js");
const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", userIsLoggedIn, userLoggedInAsAdmin);


module.exports = { productRouter }; 
