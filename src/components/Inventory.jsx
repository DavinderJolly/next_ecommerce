"use client";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { useEffect, useState, Suspense } from "react";

function InventoryList({ products }) {
  return products.map((product) => (
    <li key={product.id}>
      <ProductCard
        name={product.name}
        price={product.price}
        description={product.description}
        img_url={product.img_url}
        id={product.id}
      />
    </li>
  ));
}

function Inventory() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const response = await fetch("/api/products?page=" + page);
      if (response.status === 404) {
        setPage((prev) => Math.max(prev - 1, 1));
        throw new Error("No products found");
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  function SkeletonCard() {
    return (
      <div className="w-[300px] h-[500px] bg-gray-200 animate-pulse rounded shadow flex flex-col p-4">
        <div className="h-40 bg-gray-300 rounded mb-4" />
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/2" />
        <div className="h-4 bg-gray-300 rounded w-2/3" />
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-3xl">Inventory</h2>
      <ul className="flex flex-wrap gap-4">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, i) => (
            <li key={i}>
              <SkeletonCard />
            </li>
          ))
        ) : (
          <InventoryList products={data.products} />
        )}
      </ul>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={isLoading || page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 rounded">{page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !data.hasMore}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default Inventory;
