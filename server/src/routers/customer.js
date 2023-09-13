const express = require("express");
const { userIsLoggedIn, userLoggedInAsAdmin } = require ("../middlewares/middlewares.js");
const { createCustomer } = require("../controllers/customer.js")
const customerRouter = express.Router();

customerRouter.get("/:id", userIsLoggedIn);
customerRouter.post("/", userIsLoggedIn, userLoggedInAsAdmin, );
customerRouter.post("/register", createCustomer);



module.exports = { customerRouter }; 
