import React, { useState } from "react";
import { Card, CardContent } from "../components/page-specific/Card";
import { Button } from "../components/page-specific/Button";
import { Input } from "../components/page-specific/Input";
import { Label } from "../components/page-specific/Label";

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([
    { productCode: "kalja1", stock: 100 },
    { productCode: "kalja2", stock: 50 },
    { productCode: "kalja3", stock: 30 },
  ]);
  
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ productCode: "", quantity: 0 });

  const handleEditClick = (product) => {
    setEditing(product.productCode);
    setEditData({ productCode: product.productCode, quantity: product.stock });
  };

  const handleSaveClick = () => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.productCode === editData.productCode
          ? { ...item, stock: editData.quantity }
          : item
      )
    );
    setEditing(null);
  };

  return (
    <div className="container">
      <h1 className="title">Inventory Management</h1>

      <div className="product-cards">
        {inventory.map((item) => (
          <Card key={item.productCode}>
            <CardContent>
              <h2 className="card-header">Product Code: {item.productCode}</h2>
              {editing === item.productCode ? (
                <>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={editData.quantity}
                    onChange={(e) =>
                      setEditData({ ...editData, quantity: Number(e.target.value) })
                    }
                  />
                  <Button className="save-btn" onClick={handleSaveClick}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p className="card-body">Stock: {item.stock}</p>
                  <Button className="edit-btn" onClick={() => handleEditClick(item)}>
                    Edit
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
