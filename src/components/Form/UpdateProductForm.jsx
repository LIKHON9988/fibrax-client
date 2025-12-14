import { useState } from "react";
import axios from "axios";
import { imageUpload } from "../../utils";

const UpdateProductForm = ({ product = {}, onUpdated, onClose }) => {
  const [preview, setPreview] = useState(product.image || null);

  return (
    <div className="w-full max-w-sm mx-auto rounded-xl bg-white/5 backdrop-blur-2xl border border-purple-300/20 p-3">
      <form
        className="w-full"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = new FormData(form);
          const payload = {
            name: data.get("name"),
            category: data.get("category"),
            description: data.get("description"),
            price: Number(data.get("price")),
            quantity: Number(data.get("quantity")),
          };
          const file = form.querySelector('input[type="file"]')?.files?.[0];
          try {
            if (file) {
              const imageURL = await imageUpload(file);
              payload.image = imageURL;
            }
            const id = product._id || product.id;
            await axios.patch(
              `${import.meta.env.VITE_API_URL}/products/${id}`,
              payload
            );
            onUpdated && onUpdated();
            onClose && onClose();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <div className="grid grid-cols-1 gap-4">
          {/* BASIC INFO */}
          <div className="space-y-3">
            {/* Name */}
            <div className="space-y-1 text-xs">
              <label htmlFor="name" className="block text-purple-200">
                Name
              </label>
              <input
                className="
                  w-full px-2.5 py-1.5
                  text-gray-200 text-sm
                  bg-white/10
                  border border-purple-300/20
                  rounded-md
                  focus:outline-none
                  focus:ring-2 focus:ring-purple-400/40
                "
                name="name"
                id="name"
                type="text"
                placeholder="Product Name"
                defaultValue={product.name}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1 text-xs">
              <label htmlFor="category" className="block text-purple-200">
                Category
              </label>
              <select
                required
                className="
                  w-full px-2.5 py-1.5
                  bg-white/10
                  text-gray-200 text-sm
                  border border-purple-300/20
                  rounded-md
                  focus:outline-none
                  focus:ring-2 focus:ring-purple-400/40
                "
                name="category"
                defaultValue={product.category}
              >
                <option value="Shirt" className="text-black">
                  Shirt
                </option>
                <option value="Pant" className="text-black">
                  Pant
                </option>
                <option value="Jacket" className="text-black">
                  Jacket
                </option>
                <option value="Accessories" className="text-black">
                  Accessories
                </option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1 text-xs">
              <label htmlFor="description" className="block text-purple-200">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Short description..."
                className="
                  block w-full h-20 px-2.5 py-1.5
                  text-gray-200 text-sm
                  bg-white/10
                  border border-purple-300/20
                  rounded-md
                  focus:outline-none
                  focus:ring-2 focus:ring-purple-400/40
                "
                name="description"
                defaultValue={product.description}
              ></textarea>
            </div>
          </div>

          {/* PRICE & IMAGE */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="space-y-1 text-xs w-full">
                <label htmlFor="price" className="block text-purple-200">
                  Price
                </label>
                <input
                  className="
                    w-full px-2.5 py-1.5
                    text-gray-200 text-sm
                    bg-white/10
                    border border-purple-300/20
                    rounded-md
                    focus:outline-none
                    focus:ring-2 focus:ring-purple-400/40
                  "
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price"
                  defaultValue={product.price}
                  required
                />
              </div>

              <div className="space-y-1 text-xs w-full">
                <label htmlFor="quantity" className="block text-purple-200">
                  Quantity
                </label>
                <input
                  className="
                    w-full px-2.5 py-1.5
                    text-gray-200 text-sm
                    bg-white/10
                    border border-purple-300/20
                    rounded-md
                    focus:outline-none
                    focus:ring-2 focus:ring-purple-400/40
                  "
                  name="quantity"
                  id="quantity"
                  type="number"
                  placeholder="Qty"
                  defaultValue={product.quantity}
                  required
                />
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div className="rounded-lg bg-white/5 border border-purple-300/20 p-2">
              <label className="block text-purple-300 text-xs mb-1">
                Product Image
              </label>

              <div
                className="
                  relative flex itemscenter justify-center
                  h-28 rounded-lg
                  border border-dashed border-purple-400/30
                  bg-purple-500/10
                  cursor-pointer
                  hover:border-purple-400/60
                  transition
                "
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <p className="text-xs text-purple-200 opacity-70">
                    Upload image
                  </p>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="
                w-full p-2
                text-xs font-semibold
                text-white
                rounded-md
                bg-purple-600/50
                hover:bg-purple-600/70
                transition
              "
            >
              Update Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductForm;
