import "../../style/List.css";
import porkImage from "../../assets/pork.jpg";
import EditModal from "../page-specific/modal"

const products = [
    {
        "sku": "123-ABC",
        "name": "Pale Ale",
        "price": 59.99,
        "description": "En fruktig och frisk pale ale. En fruktig och frisk pale ale. En fruktig och frisk pale ale. En fruktig och frisk pale ale. En fruktig och frisk pale ale.",
        "image": "../assets/images/pork.jpg",
        "created_at": "2024-01-01T20:54:00Z",
        "updated_at": "2024-01-01T20:54:00Z"
    },   {
        "sku": "123-ABC",
        "name": "kakirumppa",
        "price": 59.99,
        "description": "En fruktig och frisk pale ale.",
        "image": "path-to-image",
        "created_at": "2024-01-01T20:54:00Z",
        "updated_at": "2024-01-01T20:54:00Z"
    },   {
        "sku": "123-ABC",
        "name": "kakirumppa",
        "price": 59.99,
        "description": "En fruktig och frisk pale ale.",
        "image": "path-to-image",
        "created_at": "2024-01-01T20:54:00Z",
        "updated_at": "2024-01-01T20:54:00Z"
    }
];
   



export default function List() {

    return (
        <div className="product-list">
            {products.map((product, index) => (
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
                        <img src={porkImage} alt="img src" />

                        <div className="product-edit">
                            <EditModal product={product} /> {/*Modal component*/}
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>
    );
}
