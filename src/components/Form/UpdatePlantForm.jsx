import { useState } from "react";

const UpdatePlantForm = () => {
  const [preview, setPreview] = useState(null);

  return (
    <div className="w-full max-w-sm mx-auto rounded-xl bg-white/5 backdrop-blur-2xl border border-purple-300/20 p-3">
      <form className="w-full">
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
                placeholder="Plant Name"
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
              >
                <option className="bg-gray-900" value="Indoor">
                  Indoor
                </option>
                <option className="bg-gray-900" value="Outdoor">
                  Outdoor
                </option>
                <option className="bg-gray-900" value="Succulent">
                  Succulent
                </option>
                <option className="bg-gray-900" value="Flowering">
                  Flowering
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
                  required
                />
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div className="rounded-lg bg-white/5 border border-purple-300/20 p-2">
              <label className="block text-purple-300 text-xs mb-1">
                Plant Image
              </label>

              <div
                className="
                  relative flex items-center justify-center
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
              Update Plant
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePlantForm;
