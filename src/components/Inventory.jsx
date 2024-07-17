"use client"
import ProductCard from "./ProductCard";
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
      <ul className="grid grid-cols-5 gap-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard name={product.name} price={product.price} description={product.description} img_url={product.img_url} id={product.id} />
          </li>
          ))}
      </ul>
    </section>
  );
}

export default Inventory;
