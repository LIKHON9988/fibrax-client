import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BecomeManagerModal = ({ closeModal, isOpen }) => {
  const axiosSequre = useAxiosSecure();

  const handleRequest = async () => {
    try {
      await axiosSequre.post(`/become-manager`);
      toast.success("Request sent, please wait for admin approval!");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    } finally {
      closeModal();
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="
            w-full max-w-md
            rounded-2xl
            bg-white/10
            backdrop-blur-2xl
            border border-red-400/40
            shadow-lg shadow-purple-500/20
            p-6
            text-white
            duration-300 ease-out
            data-[closed]:scale-95
            data-[closed]:opacity-0
          "
        >
          {/* Title */}
          <DialogTitle
            as="h3"
            className="text-2xl font-extrabold text-center tracking-tight"
          >
            Become a Manager
          </DialogTitle>

          {/* Description */}
          <p className="mt-3 text-sm text-gray-300 text-center">
            Please read all the terms & conditions before becoming a manager.
          </p>

          <hr className="my-6 border-white/20" />

          {/* Actions */}
          <div className="flex justify-between gap-4">
            <button
              onClick={handleRequest}
              type="button"
              className="
                flex-1 py-2.5 rounded-xl
                bg-gradient-to-r from-green-500/30 to-emerald-500/30
                border border-green-300/30
                text-white font-semibold
                backdrop-blur-xl
                hover:from-green-500/50 hover:to-emerald-500/50
                hover:shadow-lg hover:shadow-green-500/30
                transition-all
              "
            >
              Continue
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="
                flex-1 py-2.5 rounded-xl
                bg-gradient-to-r from-red-500/30 to-pink-500/30
                border border-red-300/30
                text-white font-semibold
                backdrop-blur-xl
                hover:from-red-500/50 hover:to-pink-500/50
                hover:shadow-lg hover:shadow-red-500/30
                transition-all
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

export default BecomeManagerModal;
