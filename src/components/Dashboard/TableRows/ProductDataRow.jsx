import { useState } from "react";
import axios from "axios";
import DeleteModal from "../../Modal/DeleteModal";

import UpdateProductModal from "../../Modal/UpdateProductModal";

const ProductDataRow = ({ product, onUpdated, onDeleted }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <tr className="hover:bg-white/5 transition">
      {/* IMAGE */}
      <td className="px-5 py-5 border-b border-purple-300/10 text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <img
              alt="profile"
              src={product.image}
              className="mx-auto object-cover rounded-lg h-10 w-15 border border-purple-300/20 shadow"
            />
          </div>
        </div>
      </td>

      {/* NAME */}
      <td className="px-5 py-5 border-b border-purple-300/10 text-sm">
        <p className="text-gray-200 font-medium">{product.name}</p>
      </td>

      {/* PRICE */}
      <td className="px-5 py-5 border-b border-purple-300/10 text-sm">
        <p className="text-purple-200 font-semibold">${product.price}</p>
      </td>

      {/* PAYMENT MODE */}
      <td className="px-5 py-5 border-b border-purple-300/10 text-sm">
        <p className="text-gray-300">{product.payment}</p>
      </td>

      {/* DELETE */}
      <td className="px-5 py-5 border-b border-purple-300/10 text-sm">
        <span
          onClick={openModal}
          className="
            relative cursor-pointer inline-block px-3 py-1
            font-semibold leading-tight
            text-red-200
          "
        >
          <span
            aria-hidden="true"
            className="
              absolute inset-0
              bg-red-500/20
              backdrop-blur-sm
              rounded-full
            "
          ></span>
          <span className="relative">Delete</span>
        </span>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          onConfirm={async () => {
            try {
              const id = product._id || product.id;
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/products/${id}`
              );
              closeModal();
              onDeleted && onDeleted();
            } catch (err) {
              console.log(err);
              closeModal();
            }
          }}
        />
      </td>

      {/* UPDATE */}
      <td className="px-5 py-5 border-b border-purple-300/10 text-sm">
        <span
          onClick={() => setIsEditModalOpen(true)}
          className="
            relative cursor-pointer inline-block px-3 py-1
            font-semibold leading-tight
            text-green-200
          "
        >
          <span
            aria-hidden="true"
            className="
              absolute inset-0
              bg-green-500/20
              backdrop-blur-sm
              rounded-full
            "
          ></span>
          <span className="relative">Update</span>
        </span>
        <UpdateProductModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          product={product}
          onUpdated={onUpdated}
        />
      </td>
    </tr>
  );
};

export default ProductDataRow;
