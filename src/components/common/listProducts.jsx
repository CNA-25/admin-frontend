import React, { useState, useEffect } from "react";
import "../../style/List.css";
import EditModal from "../page-specific/modal"

const TOKEN = localStorage.getItem('access_token');
const API_URL ="https://product-service-cna-product-service.2.rahtiapp.fi/products";

export default function List({ searchQuery }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch(API_URL, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {console.log("get all products done", data); setProducts(data.products);})
        .catch((error) => { console.error("Error:", error);});
    }, []);
  
    // Filter products based on name
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        
        <div className="product-list">
            {/*  product not found */}
            {filteredProducts.length === 0 ? (<p>No products found...</p>):
            
            // Show filterd products
            filteredProducts.map((product, index) => (
                <div key={index} className="product-box">
                    <div className="product-info">
                        <div className="product-detail">
                            <strong>Namn:</strong> {product.name}
                        </div>
                        <div className="product-detail">
                            <strong>Price:</strong> {product.price} $
                        </div>
                        <div className="product-detail">
                            <strong>SKU:</strong> {product.sku}
                        </div>
                        <div className="product-detail">
                            <strong>Bio:</strong> {product.description}
                        </div>
                        <div className="product-detail">
                            <strong>Created:</strong> {new Date(product.created_at).toLocaleString()}
                        </div>
                        <div className="product-detail">
                            <strong>Updated:</strong> {new Date(product.updated_at).toLocaleString()}
                        </div>
                    </div>
                    <div className="product-image">
                        <img src={`${API_URL}${product.image}`} alt="img" />

                        <div className="product-edit">
                            <EditModal product={product} />
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>
    );
}
