import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";

const TOKEN = localStorage.getItem('access_token');

export default function EditModal({ product }) {
    const [editedProduct, setEditedProduct] = useState(product);

    useEffect(() => {
        setEditedProduct(product);
    }, [product]);

    const handleChange = (e) => {
        setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
        //console.log(product.sku)
    };

    //PRODUCT UPDATE AND EDIT
    const handleSave = () => {

    const formData = new FormData();
    formData.append("name", editedProduct.name);
    formData.append("price", editedProduct.price);
    formData.append("description", editedProduct.description);
    formData.append("image", editedProduct.image);
 
    fetch(`https://product-service-cna-product-service.2.rahtiapp.fi/products/${product.sku}`, {
        method: "PUT",
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
        alert("Product updated successfully!");
        setTimeout(() => {window.location.reload();}, 500);
})
    .catch(error => alert(`Error: ${error.message}`));
};

//PRODUCT DELETE
const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
 
    fetch(`https://product-service-cna-product-service.2.rahtiapp.fi/products/${product.sku}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(errorText || 'Failed to delete product');
            });
        }
        return response.text();
    })
    .then(() => {
        alert("Product deleted!");
        setTimeout(() => { window.location.reload(); }, 500);
    })
    .catch(error => alert(`Error: ${error.message}`));
};
}

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
                        <button className="button-save" onClick={handleSave} >Save Changes</button>
                        <button className="button-cancel" onClick={close}>Cancel</button>
                        <button className="delete" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </Popup>
    );
}
