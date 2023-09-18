import React, { useEffect, useState } from "react";
import "../assets/css/products.css"
import Cart from "./Cart"

function renderProducts() {
  
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);    // Skapar en tom varukorg
  
    useEffect(() => {
      async function getProducts() {
        try {
          const response = await fetch("http://localhost:3000/api/products");
          if (!response.ok) {
            throw new Error("Något gick fel vid hämtning av data.");
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error(error);
        }
      }
      getProducts();
    }, []);


    function addToCart(priceId){
      setCart([... cart, {product:priceId, quantity:1}]);

    }

    useEffect(() =>{
     console.log(cart);
    },[cart])
  

    return (
      <div>
        <h1>Produkter</h1>
        <br />
        <div className="product-container">
          {products.map((product) => (
            <div key={product.id} className="product">
              <div className="product-image">
                <img src={product.images} alt={product.name} />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                  <div>
                    <p>{product.description}</p>
                    <p>Pris: {product.price / 100}kr</p>
                  </div>
                  <div>
                    <button onClick={() => addToCart(product.priceId)}>Köp</button>
                  </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-div">
          <Cart cart={cart} />
        </div>
      </div>
    );


}


export default renderProducts;
