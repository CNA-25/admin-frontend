import React from 'react';
import InventoryList from '../components/page-specific/InventoryList';  // Import the InventoryList component
import "../style/Inventory.css";


const Inventory = () => {
  return (
    <div>
      <h1>Inventory Page</h1>
      <InventoryList />
    </div>
  );
};

export default Inventory;
