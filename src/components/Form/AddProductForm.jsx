import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const AddProductForm = () => {
  const { user } = useAuth();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, payload),

    onSuccess: (data) => {
      console.log(data);
      toast.success("Product added succesfully");
      mutationReset();
    },
    onError: (error) => {
      console.log(error);
    },
    onMutate: (payload) => {
      console.log("i will post this data---->", payload);
    },

    retry: 3,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const {
      name,
      category,
      description,
      price,
      quantity,
      moq,
      payment,
      image,
    } = data;

    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);
      const productData = {
        image: imageURL,
        name,
        description,
        price: Number(price),
        category,
        quantity: Number(quantity),
        moq: Number(moq),
        payment,
        maneger: {
          iamge: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(productData);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  if (isPending) return <LoadingSpinner></LoadingSpinner>;

  if (isError) return <ErrorPage></ErrorPage>;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col items-center py-10 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl p-10 rounded-2xl shadow-xl bg-white/10 backdrop-blur-xl border border-red-400/40"
      >
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
                type="text"
                placeholder="Enter product name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  Product name is required
                </span>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label className="block text-red-200 font-medium">Category</label>
              <select
                className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
                {...register("category", { required: true })}
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
              {errors.category && (
                <span className="text-red-500 text-sm">
                  Category is required
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label className="block text-red-200 font-medium">
                Product Description
              </label>
              <textarea
                placeholder="Write product description..."
                className="block rounded-md w-full h-32 px-4 py-3 border border-red-300/40 bg-white/20 text-white focus:outline-red-300"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && (
                <span className="text-red-500 text-sm">
                  Description is required
                </span>
              )}
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
                  type="number"
                  placeholder="Price"
                  className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className="text-red-500 text-sm">
                    Price is required
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label className="block text-red-200 font-medium">
                  Available Qty
                </label>
                <input
                  type="number"
                  placeholder="Qty"
                  className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
                  {...register("quantity", { required: true })}
                />
                {errors.quantity && (
                  <span className="text-red-500 text-sm">
                    Quantity is required
                  </span>
                )}
              </div>

              {/* MOQ */}
              <div className="space-y-1 text-sm">
                <label className="block text-red-200 font-medium">MOQ</label>
                <input
                  type="number"
                  placeholder="MOQ"
                  className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
                  {...register("moq", { required: true })}
                />
                {errors.moq && (
                  <span className="text-red-500 text-sm">MOQ is required</span>
                )}
              </div>
            </div>

            {/* Payment Option */}
            <div className="space-y-1 text-sm">
              <label className="block text-red-200 font-medium">
                Payment Option
              </label>
              <select
                className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
                {...register("payment", { required: true })}
              >
                <option value="Cash on Delivery" className="text-black">
                  Cash on Delivery
                </option>
                <option value="PayFirst" className="text-black">
                  PayFirst
                </option>
              </select>
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
                  id="images"
                  className="hidden"
                  {...register("image", { required: true })}
                />

                <label
                  htmlFor="images"
                  className="cursor-pointer bg-purple-900 text-white px-4 py-2 rounded-md shadow hover:bg-purple-950 transition"
                >
                  Select Images
                </label>
              </div>
              {errors.image && (
                <span className="text-red-500 text-sm">
                  Product image is required
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className=" mt-4
                w-full py-3 text-center rounded-xl 
                bg-gradient-to-r from-purple-600/40 to-pink-600/40
                border border-purple-300/30 
                text-white font-semibold backdrop-blur-xl 
                hover:from-purple-600/60 hover:to-pink-600/60
                hover:shadow-lg hover:shadow-purple-500/30
                transition-all duration-300"
            >
              {isPending ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Creat Product"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
