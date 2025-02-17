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
        console.log("New Product Created:", newProduct);
        //make an API request
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
