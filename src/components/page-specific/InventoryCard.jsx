import React, { useState } from 'react';
import "../../style/Inventory.css";

const InventoryCard = ({ item, onStockUpdate }) => {
  const [increaseQuantity, setIncreaseQuantity] = useState(0);  
  const [decreaseQuantity, setDecreaseQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('access_token');
  const URL = 'https://inventory-service-inventory-service.2.rahtiapp.fi';

  const handleIncrease = async () => {
    if (increaseQuantity <= 0) {
      setError('Please enter a valid quantity greater than 0.');
      return;
    }

    const requestBody = {
      productCode: item.productCode,
      quantity: increaseQuantity,
    };

    try {
      const response = await fetch(`${URL}/inventory/increase`, {
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
        onStockUpdate(); // Refresh inventory list
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

  const handleDecrease = async () => {
    if (decreaseQuantity <= 0) {
      setError('Please enter a valid quantity greater than 0.');
      return;
    }
  
    const requestBody = {
      items: [
        {
          productCode: item.productCode,
          quantity: decreaseQuantity,
        }
      ],
    };
  
    try {
      const response = await fetch(`${URL}/inventory/decrease`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        setSuccess('Stock decreased successfully!');
        setError(null);
        onStockUpdate(); // Refresh inventory list
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
      <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit Stock'}</button>

      {isEditing && (
        <div>
          {/* Form for increasing stock */}
          <div className="stock-form">
            <input
              type="number"
              placeholder="Quantity"
              value={increaseQuantity}
              onChange={(e) => setIncreaseQuantity(parseInt(e.target.value) || 0)}
            />
            <button onClick={handleIncrease}>Increase Stock</button>
          </div>

          <hr className="separator" />

          {/* Form for decreasing stock */}
          <div className="stock-form">
            <input
              type="number"
              placeholder="Quantity"
              value={decreaseQuantity}
              onChange={(e) => setDecreaseQuantity(parseInt(e.target.value) || 0)}
            />
            <button onClick={handleDecrease}>Decrease Stock</button>
          </div>
        </div>
      )}

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default InventoryCard;
