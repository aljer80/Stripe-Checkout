import { useState } from "react";


function Home() {

  const cart = [
    {
        product: "price_1NnPRoFM2JYZGY8MGc8Ahml7",
        quantity: 1
    },
]
  // const [cart, setCart] = useState([
  //   {
  //     product: "price_1NnPRoFM2JYZGY8MGc8Ahml7",
  //     quantity: 1,  
  //   },
  
  // ]);
 

  // mode: 'payment',
  //     success_url: `${CLIENT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: CLIENT_URL,

  async function handlePayment() {

    const response = await fetch(
      "http://localhost:3000/api/checkout/create-checkout-session/",
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
      return;
    }

    const { url, sessionId } = await response.json();
    localStorage.setItem("session-id", sessionId);
    window.location = url;

  }

  return (
    <div>
      <button onClick={handlePayment}>BETALA VIA STRIPE CHECKOUT</button>
    </div>
  );

}


export default Home;
