import React, { useEffect, useState } from "react"; 
import { NavLink } from "react-router-dom";
import "../assets/css/products.css"


function Cart({cart}) {

  const isUserLoggedIn = document.cookie.includes("userId");


  async function handlePayment() {
    try {
      // Kontrollera om någon är inloggad innan du utför betalningen
      if (!isUserLoggedIn) {
        alert("Logga in för att genomföra betalningen.");
        return;
      }
      const response = await fetch("/api/checkout/create-checkout-session/",
        {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Något gick fel vid hämtning av data.");
      }
      
      const { url, sessionId } = await response.json();
      localStorage.setItem("session-id", sessionId);
      window.location = url;
      
    } catch (error) {
      console.error(error);
    }
  }


  return isUserLoggedIn ? (
    <div> 
      

      <div> 
        <button onClick={handlePayment}>Betala via Stripe Checkout</button>
      </div>

    </div>
  ) : (
    <div>
      <p>Du måste vara inloggad för att kunna gå till kassan. <br />
        Gå till inloggningssidan: <br />
        <NavLink to="/">Logga in</NavLink>
      </p>
    </div>
  );
    

}

export default Cart;
