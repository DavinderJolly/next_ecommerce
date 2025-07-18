import ProductForm from "@/components/ProductForm";

async function getProduct(id) {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function EditProductPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-center mt-4">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
