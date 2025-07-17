"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm({ product }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    img_url: product?.img_url || "",
    price: product?.price || "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = product ? "UPDATE" : "POST";

    const res = await fetch("/api/products", {
      method,
      body: JSON.stringify({ ...form, id: product?.id }),
    });

    if (res.ok) {
      router.push("/products");
    } else {
      alert("Error saving product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="text"
        name="img_url"
        placeholder="Image URL"
        value={form.img_url}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {product ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}
