import React, { useState } from 'react';
import "../../style/Inventory.css";


const InventoryCard = ({ item }) => {
  const [quantity, setQuantity] = useState(0);  // Default quantity set to 0
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleIncrease = async () => {
    const token = process.env.REACT_APP_API_BEARER_TOKEN; // Ensure you're getting the token from .env
    if (quantity <= 0) {
      setError('Please enter a valid quantity greater than 0.');
      return;
    }

    const requestBody = {
      productCode: item.productCode,
      quantity: quantity,
    };

    try {
      const response = await fetch('/inventory/increase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSuccess('Stock increased successfully!');
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong!');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className="inventory-card">
      <h3>{item.productCode}</h3>
      <p>Stock: {item.stock}</p>

      {/* Form for increasing stock */}
      <div className="increase-form">
        <input
          type="number"
          placeholder="Quantity to increase"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button onClick={handleIncrease}>Increase Stock</button>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default InventoryCard;