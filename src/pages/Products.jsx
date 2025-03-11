// Admin Frontend products page
import React, { useState } from "react";
import List from "../components/common/listProducts";
import CreateProduct from "../components/page-specific/NewProduct";
import "../style/List.css";
import "../style/SearchBar.css";
import Redirect from "../components/common/Redirect"




const Products = () => {

    const [searchQuery, setSearchQuery] = useState("");

    // Handle the change in the search input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);

 };


    return (
       <div>
            <Redirect/>
            <h1 className="h1">Products page</h1>
            
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={handleSearchChange} // Update state on change
                />
                
            </div>
            <div className="center-container">
            <CreateProduct/>
            </div>
            <List searchQuery={searchQuery} /> {/* Pass searchQuery to list component */}
        </div>
        
    );
};

export default Products;