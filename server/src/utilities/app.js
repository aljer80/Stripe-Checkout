require("dotenv").config(); //läggs högt upp så den läses in det första man gör
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs"); 
const cookieSession = require("cookie-session");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = "http://localhost:5173";

//const data = fs.readFileSync("users.json");
const { userRouter } = require("../routers/user.js"); 
const { productRouter } = require("../routers/product.js"); 
const { orderRouter } = require("../routers/order.js"); 
const { confirmationRouter } = require("../routers/confirmation.js");
const { checkoutRouter } = require("../routers/checkout.js"); 
const { checkoutSession } = require("../controllers/checkout.js");



//sätta upp middlewares
app.use(
    cors({
    //origin: CLIENT_URL,
    origin: "*"
})
);

app.use(express.json());

app.use(
    cookieSession({
    secret: "s3cr3t",
    maxAge: 1000 * 60 * 60 * 24,  //ms konverterat till 1 dygn
    httpOnly: false
})
);

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
// app.use("/checkout", checkoutRouter); 
// app.use("/confirmation", confirmationRouter);



module.exports = { app };