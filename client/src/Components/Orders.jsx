import React, { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);   
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Något gick fel vid hämtning av ordrar.");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // fetchOrders(); // Om du vill att ordrar ska hämtas direkt när komponenten renderas, aktivera den här raden.
  }, []); 


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Mina ordrar</h2>
      <button onClick={fetchOrders}>Hämta mina ordrar</button>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <p>Order ID: {order.created}</p>
            <p>Kund: {order.customer}</p>
            <p>Produkter:</p>
            <ul>
              {order.products.map((product, productIndex) => (
                <li key={productIndex}>
                  {product.quantity} x {product.product} - {product.price} kr
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
