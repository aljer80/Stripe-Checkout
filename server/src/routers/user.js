const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/auth.js");
const { userIsLoggedIn, userLoggedInAsAdmin } = require ("../middlewares/middlewares.js");//ta bort admin?
const userRouter = express.Router();

userRouter.get("/:id", userIsLoggedIn);
userRouter.post("/", userIsLoggedIn, userLoggedInAsAdmin, );  
userRouter.post("/register", registerUser);    
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);


module.exports = { userRouter }; 
