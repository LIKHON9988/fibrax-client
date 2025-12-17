import { useState } from "react";
import axios from "axios";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DeleteModal from "../../Modal/DeleteModal";

const ManagerOrderDataRow = ({ order, onDeleted, onUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(order.status);
  const axiosSecure = useAxiosSecure();
  const closeModal = () => setIsOpen(false);
  const closeStatusModal = () => setIsStatusOpen(false);

  const handleStatusUpdate = async () => {
    try {
      const id = order._id || order.id;
      await axiosSecure.patch(`/orders/${id}/status`, {
        status: updatedStatus,
      });
      closeStatusModal();
      onUpdated && onUpdated();
    } catch (err) {
      console.log(err);
      closeStatusModal();
    }
  };

  return (
    <tr className="hover:bg-white/10 backdrop-blur-sm transition">
      <td className="px-5 py-5 border-b border-purple-300/20 bg-white/5 text-sm">
        <p className="text-purple-200">{order.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-purple-300/20 bg-white/5 text-sm">
        <p className="text-purple-200">{order.customer_email}</p>
      </td>
      <td className="px-5 py-5 border-b border-purple-300/20 bg-white/5 text-sm">
        <p className="text-purple-200">${order.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-purple-300/20 bg-white/5 text-sm">
        <p className="text-purple-200">{order.quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-purple-300/20 bg-white/5 text-sm">
        <p className="text-purple-200">{order.status}</p>
      </td>
      <td className="px-5 py-5 border-b border-purple-300/20 bg-white/5 text-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStatusOpen(true)}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-semibold hover:bg-purple-500/30 transition"
          >
            Update Status
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 text-red-200 text-xs font-semibold hover:bg-red-500/30 transition"
          >
            Cancel
          </button>
        </div>

        <Dialog
          open={isStatusOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={closeStatusModal}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="w-full max-w-md bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-purple-300/20 transition-transform duration-300 ease-out">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-center text-purple-200"
                >
                  Update Order Status
                </DialogTitle>

                <div className="mt-3">
                  <select
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                    className="w-full my-3 border border-purple-300/30 rounded-xl px-3 py-2 text-gray-200 bg-purple-900/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="flex justify-around gap-4 mt-4">
                  <button
                    type="button"
                    className="w-28 cursor-pointer rounded-md bg-green-500/20 border border-green-400/30 px-4 py-2 text-sm font-medium text-green-200 hover:bg-green-500/30 transition"
                    onClick={handleStatusUpdate}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="w-28 cursor-pointer rounded-md bg-gray-500/20 border border-gray-400/30 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-500/30 transition"
                    onClick={closeStatusModal}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>

        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          onConfirm={async () => {
            try {
              const id = order._id || order.id;
              await axios.delete(`${import.meta.env.VITE_API_URL}/orders/${id}`);
              closeModal();
              onDeleted && onDeleted();
            } catch (err) {
              console.log(err);
              closeModal();
            }
          }}
        />
      </td>
    </tr>
  );
};

export default ManagerOrderDataRow;
