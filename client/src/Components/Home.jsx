import { useState } from "react";


function Home() {
  const [cart, setCart] = useState([
    {
      product: "price_1NnPRoFM2JYZGY8MGc8Ahml7",
      quantity: 1,  
    },
  
  ]);
 

  async function handlePayment() {
    const response = await fetch(
      "http://localhost:3000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
          
        },
        body: JSON.stringify(cart),
      }
    );

    if (!response.ok) {
      return;
    }

    const { url } = await response.json();
    window.location = url;
  }

  return (
    <div>
      <button onClick={handlePayment}>BETALA VIA STRIPE CHECKOUT</button>
    </div>
  );
}


export default Home;
