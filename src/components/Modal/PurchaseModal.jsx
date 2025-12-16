import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const PurchaseModal = ({ closeModal, isOpen, product }) => {
  const { user } = useAuth();
  const {
    _id,
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

  const handlePayment = async () => {
    const paymentInfo = {
      productId: _id,
      image,
      price,
      category,
      quantity: 1,
      description,
      moq,
      name,
      payment,
      maneger,
      customer: {
        customer: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );

    window.location.href = data.url;

    console.log(data.url);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="
            w-full max-w-md 
            bg-white/10 
            backdrop-blur-2xl 
            border border-purple-300/20 
            shadow-xl shadow-purple-900/20 
            rounded-3xl p-6
            transition-all duration-300 ease-out
            data-[closed]:opacity-0 data-[closed]:scale-95
          "
        >
          <DialogTitle
            as="h3"
            className="text-2xl font-semibold text-purple-200 text-center mb-4"
          >
            Review Before Purchase
          </DialogTitle>

          {/* INFO BLOCK */}
          <div className="space-y-2 text-gray-200">
            <p className="text-sm">
              Product: <span className="text-purple-200">{name}</span>
            </p>
            <p className="text-sm">
              Category: <span className="text-purple-200">{category}</span>
            </p>
            <p className="text-sm">
              Customer:{" "}
              <span className="text-purple-200">{user?.displayName}</span>
            </p>
            <p className="text-sm">
              Price: <span className="text-purple-200">${price}</span>
            </p>
            <p className="text-sm">
              Available Quantity:{" "}
              <span className="text-purple-200">{quantity}</span>
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePayment}
              type="button"
              className="
                px-5 py-2 
                rounded-xl 
                bg-purple-500/20 
                text-purple-200 
                border border-purple-400/20 
                shadow hover:bg-purple-500/30 
                transition-all
                font-medium text-sm
              "
            >
              Pay
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="
                px-5 py-2 
                rounded-xl 
                bg-red-500/20 
                text-red-200 
                border border-red-400/20 
                shadow hover:bg-red-500/30 
                transition-all
                font-medium text-sm
              "
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
