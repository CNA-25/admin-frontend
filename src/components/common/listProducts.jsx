import React, { useState, useEffect } from "react";
import "../../style/List.css";
import EditModal from "../page-specific/modal"

const TEMP_TOKEN = process.env.REACT_APP_TEMP_TOKEN;

const API_URL = process.env.REACT_APP_PRODUCTS_API
export default function List({ searchQuery }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch(API_URL, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${TEMP_TOKEN}`,
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
            {filteredProducts.length === 0 ? (<p>Womp womp... No products found.</p>):
            
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
                        <img src={product.image} alt="img src" />

                        <div className="product-edit">
                            <EditModal product={product} />
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>
    );
}
