"use client"
import { useEffect, useState } from "react";

function Inventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <section>
      <h2 className="text-3xl">Inventory</h2>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}

export default Inventory;
