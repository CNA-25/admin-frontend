import React, { useEffect, useState } from 'react';
import InventoryCard from './InventoryCard';  // Import InventoryCard component
import "../../style/Inventory.css";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = process.env.REACT_APP_API_BEARER_TOKEN; // Correct token reference with REACT_APP_ prefix

    if (!token) {
      setError("Bearer token is missing.");
      setLoading(false);
      return;
    }

    fetch('/inventory', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setInventory(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="inventory-list">
        {inventory.map((item) => (
          <InventoryCard key={item.productCode} item={item} />
        ))}
      </div>
    </div>
  );
};

export default InventoryList;
