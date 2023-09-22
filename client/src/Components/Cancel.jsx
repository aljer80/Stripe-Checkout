import React from 'react'
import { NavLink } from "react-router-dom";
import "../assets/css/products.css"; 

function Cancel() {
  return (
    <div>
        <h3>Köpet avbröts pga att du lämnade Stripe checkout</h3>
        <p>Avbröt du köpet av misstag? Här är en länk tillbaka till <NavLink to="/products"> webbshopen</NavLink></p>
    </div>
  )
}

export default Cancel