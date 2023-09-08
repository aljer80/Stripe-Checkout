const express = require("express");
const userRouter = express.Router();

const { registerUser, loginUser, logoutUser } = require("../controllers/auth.js");
const { createUser } = require("../controllers/user.js");
const { userJoiSchema } = require ("../utilities/userValidation.js");
const { validate, userIsLoggedIn, userLoggedInAsAdmin } = require ("../middlewares/middlewares.js"); 


//Behövs routes för checkout, kunder, produkter
//ROUTES
//get-routes
userRouter.get("", getUsers);
userRouter.get("/:id", userIsLoggedIn, getUserById);
//post-routes
userRouter.post("", userIsLoggedIn, userLoggedInAsAdmin, validate(userJoiSchema), createUser);
userRouter.post("/register", validate(userJoiSchema), registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
//checkout-routes 


module.exports = { userRouter }; 