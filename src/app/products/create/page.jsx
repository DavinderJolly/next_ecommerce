export default function Page() {
  async function createProduct(formData) {
    "use server";
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      img_url: formData.get("img_url"),
      price: Number(formData.get("price")),
    };

    await fetch("http://localhost:3000/api/products/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  return (
    <div className="flex  justify-center items-center min-h-screen">
      <form action={createProduct}>
        <label htmlFor="name">Name</label>

        <input
          id="name"
          type="text"
          name="name"
          placeholder="Name of Product"
        />
        <label htmlFor="desc">Description</label>

        <input
          id="desc"
          type="text"
          name="description"
          placeholder="Description of Product"
        />
        <label htmlFor="img_url">URL for Image</label>
        <input
          id="img_url"
          type="text"
          name="img_url"
          placeholder="Image URL of Product"
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="float"
          name="price"
          placeholder="Price of Product"
        />

        <button
          type="submit"
          className="flex justify-center  border-double border-4 border-sky-500 p-3  "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
