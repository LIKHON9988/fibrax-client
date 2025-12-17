import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const AddProductForm = () => {
  const { user } = useAuth();
  const axiosSequre = useAxiosSecure();
  const [previewImages, setPreviewImages] = useState([]);

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axiosSequre.post(`/products`, payload),

    onSuccess: () => {
      toast.success("Product added succesfully");
      mutationReset();
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
      setPreviewImages([]);
    } catch (err) {
      console.log(err);
    }
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

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
              />
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
              {["price", "quantity", "moq"].map((field, i) => (
                <div key={i} className="space-y-1 text-sm">
                  <label className="block text-red-200 font-medium">
                    {field.toUpperCase()}
                  </label>
                  <input
                    type="number"
                    placeholder={field.toUpperCase()}
                    className="w-full px-4 py-3 border border-red-300/40 rounded-md bg-white/20 text-white focus:outline-red-300"
                    {...register(field, { required: true })}
                  />
                </div>
              ))}
            </div>

            {/* Payment */}
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

            {/* IMAGE UPLOAD WITH PREVIEW */}
            <div>
              <label className="block mb-2 text-sm text-red-200 font-medium">
                Upload Product Images
              </label>

              <div className="border-2 border-dashed border-red-400/40 rounded-xl p-5 bg-white/10 backdrop-blur-md">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="images"
                  className="hidden"
                  {...register("image", {
                    required: true,
                    onChange: (e) => {
                      const files = Array.from(e.target.files);
                      const previews = files.map((file) =>
                        URL.createObjectURL(file)
                      );
                      setPreviewImages(previews);
                    },
                  })}
                />

                <label
                  htmlFor="images"
                  className="cursor-pointer bg-purple-900 text-white px-4 py-2 rounded-md shadow hover:bg-purple-950 transition"
                >
                  Select Images
                </label>

                {previewImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {previewImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        className="w-full h-24 object-cover rounded-lg border border-red-300/30"
                        alt="preview"
                      />
                    ))}
                  </div>
                )}
              </div>

              {errors.image && (
                <span className="text-red-500 text-sm">
                  Product image is required
                </span>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-300/30 text-white font-semibold backdrop-blur-xl hover:shadow-lg transition-all"
            >
              {isPending ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
