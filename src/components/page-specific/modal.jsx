import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";


export default function EditModal({ product }) {
    const [editedProduct, setEditedProduct] = useState(product);

    useEffect(() => {
        setEditedProduct(product);
    }, [product]);

    const handleChange = (e) => {
        setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
        console.log(product.sku)
    };

    //PRODUCT UPDATE AND EDIT
    const handleSave = () => {

    const formData = new FormData();
    formData.append("name", editedProduct.name);
    formData.append("price", editedProduct.price);
    formData.append("description", editedProduct.description);
    formData.append("image", editedProduct.image);

    const TEMP_TOKEN = process.env.REACT_APP_TEMP_TOKEN;
 
    fetch(`/products/${product.sku}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${TEMP_TOKEN}`,
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => console.log("Success:", data))
    .catch(error => console.error("Error:", error));

    console.log("local: Updated product:", editedProduct);
};

    return (
        <Popup trigger={<button className="edit-button">Edit</button>} modal nested>
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>&times;</button>
                    <div className="header">Edit Product</div>
                    <div className="content">
                        <form className="edit-form">
                            <label>
                                Name:
                                <input 
                                    type="text" 
                                    name="name"
                                    value={editedProduct.name} 
                                    onChange={handleChange} 
                                />
                            </label><br/>
                            <label>
                                Price:
                                <input 
                                    type="number" 
                                    name="price"
                                    value={editedProduct.price} 
                                    onChange={handleChange} 
                                />
                            </label><br/>
                            <label>
                                Image:
                                <input 
                                    type="file" 
                                    name="image"
                                    accept="image/*"
                                   // value={editedProduct.image}
                                    onChange={handleChange} 
                                />
                            </label><br/>
                            <label>
                                Description: <br/>
                                <textarea 
                                    name="description"
                                    value={editedProduct.description} 
                                    onChange={handleChange} 
                                />
                            </label><br/>
                        </form>
                    </div>
                    <div className="actions">
                        <button className="button save" onClick={handleSave}>Save Changes</button>
                        <button className="button" onClick={close}>Cancel</button>
                    </div>
                </div>
            )}
        </Popup>
    );
}
