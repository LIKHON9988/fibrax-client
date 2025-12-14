const UpdatePlantForm = () => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center rounded-xl bg-white/5 backdrop-blur-2xl border border-purple-300/20 p-4">
      <form className="w-full">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-purple-200">
                Name
              </label>
              <input
                className="
                  w-full px-3 py-2
                  text-gray-200
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
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-purple-200">
                Category
              </label>
              <select
                required
                className="
                  w-full px-3 py-2
                  bg-white/10
                  text-gray-200
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
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-purple-200">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Write plant description here..."
                className="
                  block w-full h-24 px-3 py-2
                  text-gray-200
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

          <div className="space-y-4 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex gap-3">
              {/* Price */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="price" className="block text-purple-200">
                  Price
                </label>
                <input
                  className="
                    w-full px-3 py-2
                    text-gray-200
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

              {/* Quantity */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="quantity" className="block text-purple-200">
                  Quantity
                </label>
                <input
                  className="
                    w-full px-3 py-2
                    text-gray-200
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

            {/* Image */}
            <div className="p-3 w-full rounded-lg bg-white/5 border border-purple-300/20">
              <div className="file_upload px-4 py-2 border-2 border-dashed border-purple-300/30 rounded-lg">
                <div className="flex justify-center text-center">
                  <label>
                    <input
                      className="hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div
                      className="
                        bg-purple-600/30
                        text-purple-200
                        border border-purple-300/30
                        rounded-md
                        font-medium
                        cursor-pointer
                        px-3 py-1.5
                        hover:bg-purple-600/40
                        transition
                        text-sm
                      "
                    >
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                w-full cursor-pointer p-2.5 mt-3
                text-center font-medium
                text-white
                rounded-lg
                bg-purple-600/50
                hover:bg-purple-600/70
                backdrop-blur-md
                shadow-lg
                transition
                text-sm
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
