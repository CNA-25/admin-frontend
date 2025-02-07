// Products page
import React from "react";
import List from "../components/common/listProducts";
import "../style/List.css";
import "../style/SearchBar.css";

const Products = () => {
    return (
        <div>
            <h1 className="h1">
                Products page
            </h1>
            
            <div className="search-container">
            <input type="text" placeholder="Search..." />
            </div>


            <List /> {/* Using the List component here */}
        </div>
        
    );
};

export default Products;
