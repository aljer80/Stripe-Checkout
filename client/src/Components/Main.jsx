import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Confirmation from "./Confirmation";
import Cancel from "./Cancel";
import Products from "./Products"
import Cart from "./Cart";

function Main() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/cancel" element={<Cancel />} /> 
            </Routes>
        </div>
    
      );
}

export default Main;