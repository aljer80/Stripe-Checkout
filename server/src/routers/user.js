const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/auth.js");
const { createUser } = require("../controllers/user.js");
const { userJoiSchema } = require ("../utilities/userValidation.js");
const { validate, userIsLoggedIn, userLoggedInAsAdmin } = require ("../middlewares/middlewares.js");//ta bort admin?
const userRouter = express.Router();

userRouter.get("/:id", userIsLoggedIn);
userRouter.post("/", userIsLoggedIn, userLoggedInAsAdmin, );    //validate(userJoiSchema)
userRouter.post("/register", registerUser);    //validate(userJoiSchema),
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);


module.exports = { userRouter }; 
