import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const ProductDetailsCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      return result.data;
    },
  });

  const closeModal = () => setIsOpen(false);

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const {
    image,
    price,
    category,
    quantity,
    description,
    moq,
    name,
    payment,
    maneger,
  } = product || {};

  return (
    <Container>
      <div className="flex justify-center py-12">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-3xl border border-purple-300/20 rounded-3xl shadow-2xl overflow-hidden hover:shadow-purple-500/30 transition-all duration-300">
          {/* PRODUCT IMAGE */}
          <div className="relative w-full h-64 md:h-72">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-purple-600/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
              {category}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-purple-200">{name}</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              {description}
            </p>

            <div className="flex gap-4">
              <div className="flex-1 p-3 bg-white/10 rounded-xl border border-purple-300/20 shadow-inner text-center">
                <p className="text-purple-200 text-sm">Available</p>
                <p className="text-white font-bold">{quantity}</p>
              </div>
              <div className="flex-1 p-3 bg-white/10 rounded-xl border border-purple-300/20 shadow-inner text-center">
                <p className="text-purple-200 text-sm">Min Order</p>
                <p className="text-white font-bold">{moq}</p>
              </div>
            </div>

            {/* SELLER INFO */}
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-purple-300/20 shadow">
              <img
                src={maneger?.iamge || maneger?.image}
                alt={maneger?.name}
                className="w-10 h-10 rounded-full border border-purple-300/30"
              />
              <div>
                <p className="text-purple-200 font-semibold">{maneger?.name}</p>
                <p className="text-gray-300 text-sm">{maneger?.email}</p>
              </div>
            </div>

            {/* PAYMENT */}
            <div>
              <p className="text-purple-200 text-sm font-semibold mb-1">
                Payment:
              </p>
              <p className="text-gray-300 text-sm">{payment}</p>
            </div>

            {/* PRICE */}
            <div className="mt-4">
              <p className="text-3xl font-bold text-purple-200">
                {price} <span className="text-lg">Tk.</span>
              </p>
            </div>

            {/* ORDER BUTTON */}
            <div className="mt-2">
              <Button
                onClick={() => setIsOpen(true)}
                label="Order Now"
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>

      <PurchaseModal
        product={product}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </Container>
  );
};

export default ProductDetailsCard;
