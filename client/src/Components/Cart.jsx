import React, { useEffect, useState } from "react"; 
import { NavLink } from "react-router-dom";


function Cart({cart}) {

  const isUserLoggedIn = document.cookie.includes("userId");


  async function handlePayment() {
    try {
      // Kontrollera om någon är inloggad innan du utför betalningen
      if (!isUserLoggedIn) {
        alert("Logga in för att genomföra betalningen.");
        return;
      }
      console.log(cart);
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
        <button onClick={handlePayment}>BETALA VIA STRIPE CHECKOUT</button>
      </div>

    </div>
  ) : (
    <div>
      <p>Du måste vara inloggad för att kunna gå till kassan. <br />
        Gå till inloggningssidan: <br />
        <NavLink to="/login">Logga in</NavLink>
      </p>
    </div>
  );
    

}

export default Cart;

{/* <div className="products_in_cart-div">
        {cart.map((cartItem, index) => (
          <div key={`${cartItem.product.id}-${index}`}>
            <p>{cartItem.product.name}</p>
            <div>
              <p>Pris: {cartItem.product.price / 100} kr per st</p>
            </div>
          </div>
        ))}
      </div> */}

    //   .products_in_cart-div{
    //     display: flex;
    // }
    
    // .cart-button{
    //     display: flex;
    //     align-content: center;
    //     justify-content: flex-end;
    //     width: 90%;
    //     padding: 10px;
    // }