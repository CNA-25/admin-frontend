import React, { useState } from "react";
import Popup from "reactjs-popup";

export default function CreateProduct() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: null,
        description: "",
    });

    const countries = [
        "Argentina", "Asien", "Belgien", "Brasilien", "Chile", "Colombia", "Danmark", "Finland", 
        "Frankrike", "Indien", "Irland", "Italien", "Japan", "Kanada", "Kina", "Mexiko", "Nederländerna", 
        "Norge", "Polen", "Ryssland", "Schweiz", "Serbien", "Sydafrika", "Sydkorea", "Spanien", 
        "Storbritannien", "Tjeckien", "Tyskland", "Ungern", "USA", "Ukraina", "Vietnam", "Österrike"
    ];

    const categories = [
        "Ale", "IPA", "Lager", "Pilsner", "Stout & Porter", "Suröl & Specialöl", "Veteöl"
      ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setNewProduct({
            ...newProduct,
            image: e.target.files[0],
        });
    };

    const handleSave = () => {

        const formData = new FormData();
        formData.append('country', newProduct.country);
        formData.append('category', newProduct.categories);
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price);
        formData.append("description", newProduct.description);
        formData.append("image", newProduct.image); 
        formData.append("stock", 0)

        const TOKEN = localStorage.getItem('access_token');
        const API_URL = "https://product-service-cna-product-service.2.rahtiapp.fi/products";
   
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
        },
        body: formData,
    })

    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {throw new Error(errData.error);});
        }
        return response.json();
    })
    .then(data => { 
        alert("Product created successfully!");
        setTimeout(() => {window.location.reload();}, 500);
    })
    .catch(error => alert(`Error: ${error.message}`));

    };

    return (
        <Popup trigger={<button className="create-button">Create New Product</button>} modal nested>
            {(close) => (
                <div className="modal">
                    <button className="close" onClick={close}>&times;</button>
                    <div className="header">Create New Product</div>
                    <div className="content">
                        <form className="create-form">
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Price:
                                <input
                                    type="number"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Image:
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                            <br />
                            <label>
                                Description:
                                <textarea
                                    name="description"
                                    value={newProduct.description}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Country:
                                <select
                                    name="country"
                                    value={newProduct.country}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <label>
                            Category:
                                <select
                                    name="categories"
                                    value={newProduct.categories}
                                    onChange={handleChange}
                                >
                                    <option value="">Select category</option>
                                    {categories.map((categories, index) => (
                                        <option key={index} value={categories}>
                                            {categories}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </form>
                    </div>
                    <div className="actions">
                        <button className="button save" onClick={handleSave}>Create Product</button>
                        <button className="button" onClick={close}>Cancel</button>
                    </div>
                </div>
            )}
        </Popup>
    );
}
