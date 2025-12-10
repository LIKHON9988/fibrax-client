import { useState } from "react";

const AddProductForm = () => {
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col items-center py-10 text-white">
      <form className="w-full max-w-5xl p-10 rounded-2xl shadow-xl bg-white/10 backdrop-blur-xl border border-red-400/40">
        <h2 className="text-3xl font-bold text-red-300 mb-10 text-center drop-shadow">
          Add New Product
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Product Name */}
            <div className="space-y-1 text-sm">
              <label className="block text-red-200 font-medium">
                Product Name
              </label>
              <input
                className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
                name="name"
                type="text"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label className="block text-red-200 font-medium">Category</label>
              <select
                required
                name="category"
                className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
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
            <div className="space-y-1 text-sm">
              <label className="block text-red-200 font-medium">
                Product Description
              </label>
              <textarea
                name="description"
                placeholder="Write product description..."
                required
                className="block rounded-md w-full h-32 px-4 py-3 border border-red-300/40 bg-white/20 text-white focus:outline-red-300"
              ></textarea>
            </div>

            {/* Video */}
            <div className="space-y-1 text-sm">
              <label className="block text-red-200 font-medium">
                Demo Video Link (Optional)
              </label>
              <input
                name="video"
                type="url"
                placeholder="https://example.com/video"
                className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6 flex flex-col">
            {/* Price / Qty / MOQ */}
            <div className="grid grid-cols-3 gap-4">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label className="block text-red-200 font-medium">Price</label>
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  required
                  className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label className="block text-red-200 font-medium">
                  Available Qty
                </label>
                <input
                  name="quantity"
                  type="number"
                  placeholder="Qty"
                  required
                  className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
                />
              </div>

              {/* MOQ */}
              <div className="space-y-1 text-sm">
                <label className="block text-red-200 font-medium">MOQ</label>
                <input
                  name="moq"
                  type="number"
                  placeholder="MOQ"
                  required
                  className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
                />
              </div>
            </div>

            {/* Payment Option */}
            <div className="space-y-1 text-sm">
              <label className="block text-red-200 font-medium">
                Payment Option
              </label>
              <select
                required
                name="payment"
                className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
              >
                <option value="Cash on Delivery" className="text-black">
                  Cash on Delivery
                </option>
                <option value="PayFirst" className="text-black">
                  PayFirst
                </option>
              </select>
            </div>

            {/* Home Page Toggle */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="showHome"
                name="showHome"
                className="w-4 h-4"
              />
              <label htmlFor="showHome" className="text-red-200 font-medium">
                Show on Home Page
              </label>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-2 text-sm text-red-200 font-medium">
                Upload Product Images
              </label>

              <div className="border-2 border-dashed border-red-400/40 rounded-xl p-5 text-center bg-white/10 backdrop-blur-md">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  id="images"
                  className="hidden"
                />

                <label
                  htmlFor="images"
                  className="cursor-pointer bg-red-600/80 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
                >
                  Select Images
                </label>
              </div>

              {/* Preview */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {previewImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className="w-full h-24 rounded-md object-cover shadow-md border border-red-300/40"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer p-3 mt-6 font-medium text-white transition rounded-lg shadow-md bg-red-600/80 hover:bg-red-600"
            >
              Create Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
