import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Confirmation from "./Confirmation";
import Cancel from "./Cancel";
import Products from "./Products"

function Main() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/cancel" element={<Cancel />} /> 
                <Route path="/" element={<Products />} />
            </Routes>
        </div>
    
      );
}

export default Main;


// app.use("/api/users", userRouter);
    // userRouter.get("/:id", userIsLoggedIn);
    // userRouter.post("/", userIsLoggedIn, userLoggedInAsAdmin, );    //validate(userJoiSchema)
    // userRouter.post("/register", registerUser);    //validate(userJoiSchema),
    // userRouter.post("/login", loginUser);
    // userRouter.post("/logout", logoutUser);


// app.use("/api/checkout", checkoutRouter); 
    // checkoutRouter.post("/create-checkout-session", checkoutSession);
    // checkoutRouter.post("/confirmation", renderSuccess); //blir det en get? eller post?


// app.use("/api/customers", customerRouter);
    // customerRouter.get("/:id", userIsLoggedIn);
    // customerRouter.post("/", userIsLoggedIn, userLoggedInAsAdmin, );
    // customerRouter.post("/register", createCustomer);


// app.use("/api/orders", orderRouter);
    // orderRouter.post("/", userIsLoggedIn, createOrder);
    // orderRouter.get("/", userIsLoggedIn, getOrders);
    // orderRouter.get("/:id", userIsLoggedIn); //behövs den här?
    // orderRouter.put("/:id", userLoggedInAsAdmin);

// app.use("/api/products", productRouter);
    // productRouter.get("/", getProducts);
    // productRouter.post("/", userIsLoggedIn, userLoggedInAsAdmin);