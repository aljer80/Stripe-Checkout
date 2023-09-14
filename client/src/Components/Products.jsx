import React, { useEffect, useState } from "react";

function renderProducts() {
  
    const [products, setProducts] = useState([]);
  
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
  
    return (
      <div>
        <h2>Produkter</h2>
        <div className="product-container">
          {products.map((product) => (
            <div key={product.id} className="product">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Pris: {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

}

// VILL HA DEN HÄR DATAN FRÅN OBJEKTET
  // const product = {
  //     id: product.id,
  //     image: product.images,
  //     name: product.name,
  //     price: product.default_price,  
  //     description: product.description
  // }


export default renderProducts;
