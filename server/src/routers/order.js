const express = require("express");
const { createOrder, getOrders, getOrderById } = require("../controllers/order.js") 
const { userIsLoggedIn, userLoggedInAsAdmin } = require ("../middlewares/middlewares.js");
const { validate } = require ("../utilities/userValidation.js");
const orderRouter = express.Router();

orderRouter.post("/", userIsLoggedIn, createOrder);
orderRouter.get("/", userIsLoggedIn, getOrders);
orderRouter.get("/:id", userIsLoggedIn); //behövs den här?
orderRouter.put("/:id", userLoggedInAsAdmin);


module.exports = { orderRouter };