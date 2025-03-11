import React, { useEffect, useState } from 'react';
import InventoryCard from './InventoryCard';  
import "../../style/Inventory.css";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = 'https://inventory-service-inventory-service.2.rahtiapp.fi';

  const fetchInventory = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError("Bearer token is missing.");
      setLoading(false);
      return;
    }

    fetch(`${URL}/inventory`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.productCode.localeCompare(b.productCode, undefined, { numeric: true }));
        setInventory(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInventory();
  }, []);

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
          <InventoryCard key={item.productCode} item={item} onStockUpdate={fetchInventory} />
        ))}
      </div>
    </div>
  );
};

export default InventoryList;
