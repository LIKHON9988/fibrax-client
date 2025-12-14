import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const DeleteModal = ({ closeModal, isOpen, onConfirm }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-purple-300/20 transition-transform duration-300 ease-out">
            <DialogTitle
              as="h3"
              className="text-lg font-semibold text-center text-purple-200"
            >
              Are you sure?
            </DialogTitle>

            <div className="mt-2 text-center">
              <p className="text-sm text-gray-300">
                You cannot undo this action!
              </p>
            </div>

            <hr className="my-6 border-purple-300/30" />

            <div className="flex justify-around gap-4">
              <button
                type="button"
                className="w-24 cursor-pointer rounded-md bg-red-500/20 border border-red-400/30 px-4 py-2 text-sm font-medium text-red-200 hover:bg-red-500/30 transition"
                onClick={() => onConfirm && onConfirm()}
              >
                Yes
              </button>
              <button
                type="button"
                className="w-24 cursor-pointer rounded-md bg-gray-500/20 border border-gray-400/30 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-500/30 transition"
                onClick={closeModal}
              >
                No
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
