import React, { useEffect, useState } from "react";

//PÅBÖRJAD FUNKTION, EJ KLAR! 
function renderProducts() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
        try {
            const response = await fetch("http://localhost:3000/api/products/product-list"); // hittade på product-list
            if (response.ok) {
            const data = await response.json();
            setProducts(data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        }

        getProducts();
    }, []);

    return (
        <div>
            <h2>Produkter</h2>
            <ul>
                {products.map((product) => (
                <li key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Pris: {product.price}</p>
                    {/* Lägg till andra produktinformationselement här */}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default renderProducts