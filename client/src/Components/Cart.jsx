import React, { useEffect, useState } from "react"; 


function Cart({cart}) {


  async function handlePayment() {
    try {
      const response = await fetch("http://localhost:3000/api/checkout/create-checkout-session/",
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


  return (
    <div>
      <button onClick={handlePayment}>BETALA VIA STRIPE CHECKOUT</button>
    </div>
    
  );

}

export default Cart;
