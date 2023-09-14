import React, { useEffect, useState } from "react"; 


function Home({Products}) {

 
  
  // const cart = [
  //   {
  //       product: "price_1NnPRoFM2JYZGY8MGc8Ahml7",
  //       quantity: 1
  //   },
  // ] 


  const [cart, setCart] = useState([
    {
      product: "price_1NnPRoFM2JYZGY8MGc8Ahml7",
      quantity: 1,  
    },
  
  ]);
 

  // mode: 'payment',
  //     success_url: `${CLIENT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: CLIENT_URL,

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
      sessionStorage.setItem("session-id", sessionId);
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

export default Home;
