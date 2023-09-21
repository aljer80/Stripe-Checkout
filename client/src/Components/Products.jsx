import React, { useEffect, useState } from "react";
// import Aside from "./Aside";
import Cart from './Cart';
import Orders from './Orders';
import "../assets/css/products.css"


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

    // useEffect(() =>{
    //  console.log(cart);
    // },[cart])


  return (
    <div className="container">
      
      <div className="wrapper-all_products">
        <h1>Produkter</h1>
        <div className="product-container">
          {products.map((product) => (
            <div key={product.id} className="product">
              <div className="product-image">
                <img src={product.images} alt={product.name} />
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                  <div>
                    <p>{product.description}</p>
                    <p>Pris: {product.price / 100}kr</p>
                  </div>
                  <div className="product-button">
                    <button onClick={() => addToCart(product.priceId)}>Köp</button>
                  </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>

      <div className="aside">
        <div className="cart-div"><Cart cart={cart} /> </div>
        <div className="order-div"><Orders /></div>
      </div>
    </div>
  );

}


export default renderProducts;
