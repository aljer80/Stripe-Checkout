const express = require("express");
const { getOrders } = require("../controllers/order.js") 
const { userIsLoggedIn } = require ("../middlewares/middlewares.js");
const orderRouter = express.Router();

orderRouter.post("/", userIsLoggedIn);
orderRouter.get("/", getOrders, userIsLoggedIn );
// orderRouter.get("/:id", userIsLoggedIn); //behövs den här?


module.exports = { orderRouter };