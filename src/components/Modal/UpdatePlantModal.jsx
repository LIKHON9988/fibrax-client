import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import UpdatePlantForm from "../Form/UpdatePlantForm";

const UpdatePlantModal = ({ setIsEditModalOpen, isOpen }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsEditModalOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="
              w-full max-w-md
              bg-white/10
              backdrop-blur-3xl
              border border-purple-300/20
              p-6
              rounded-2xl
              shadow-2xl
              duration-300 ease-out
              data-closed:transform-[scale(95%)]
              data-closed:opacity-0
            "
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="
                  px-3 py-1 rounded-md
                  text-red-200
                  bg-red-500/20
                  backdrop-blur-sm
                  hover:bg-red-500/30
                  transition
                  cursor-pointer
                "
              >
                ✕
              </button>
            </div>

            <DialogTitle
              as="h3"
              className="text-lg font-semibold text-center text-purple-200"
            >
              Update Plant Info
            </DialogTitle>

            <div className="mt-4 w-full">
              <UpdatePlantForm />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdatePlantModal;
