"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditedData({ ...product });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedData({});
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete");
    }
  };
  const handleChange = (e, field) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSave = async () => {
    const res = await fetch("/api/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    });

    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === updated[0].id ? updated[0] : p))
      );
      handleCancel();
    } else {
      alert("Failed to update");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Product Manager</h1>
      <table className="w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-3">ID</th>
            <th className="py-2 px-3">Name</th>
            <th className="py-2 px-3">Price</th>
            <th className="py-2 px-3">Description</th>
            <th className="py-2 px-3">Image</th>
            <th className="py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-2 px-3">{p.id}</td>

              <td className="py-2 px-3">
                {editingId === p.id ? (
                  <input
                    value={editedData.name}
                    onChange={(e) => handleChange(e, "name")}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  p.name
                )}
              </td>

              <td className="py-2 px-3">
                {editingId === p.id ? (
                  <input
                    type="number"
                    value={editedData.price}
                    onChange={(e) => handleChange(e, "price")}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  `$${p.price}`
                )}
              </td>

              <td className="py-2 px-3">
                {editingId === p.id ? (
                  <input
                    value={editedData.description}
                    onChange={(e) => handleChange(e, "description")}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  p.description || "-"                  
                )}
              </td>
              <td className="py-2 px-3">
                {editingId === p.id ? ( 
                  <input    
                    value={editedData.img_url}
                    onChange={(e) => handleChange(e, "image")}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  p.img_url ? <Image src={p.img_url} alt={p.name} width={50} height={50} className="rounded" /> : "-"
                )
                }
              </td>
                

              <td className="py-2 px-3 space-x-2">
                {editingId === p.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  
                )}
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
