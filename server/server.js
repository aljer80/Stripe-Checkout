require("dotenv").config(); //läggs högt upp så den läses in det första man gör
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs"); 
const cookieSession = require("cookie-session");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = "http://localhost:5173";



//const data = fs.readFileSync("users.json");
const { userRouter } = require("./src/routers/user.js"); 
const { productRouter } = require("./src/routers/product.js"); 
const { orderRouter } = require("./src/routers/order.js"); 
const { checkoutRouter } = require("./src/routers/checkout.js"); 
const { customerRouter } = require("./src/routers/customer.js"); 


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
app.use("/api/customers", customerRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", checkoutRouter); 
// app.use("/confirmation", confirmationRouter);


app.listen(process.env.PORT, () => console.log(`The application is listening on port ${process.env.PORT}.`)); 

