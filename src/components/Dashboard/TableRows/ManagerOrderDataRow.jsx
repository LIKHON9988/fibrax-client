import { useState } from "react";
import axios from "axios";
import DeleteModal from "../../Modal/DeleteModal";

const ManagerOrderDataRow = ({ order, onDeleted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

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
          <select
            required
            defaultValue={order.status}
            className="p-1 border border-purple-300/30 focus:outline-purple-400 rounded-md text-purple-200 bg-white/10 backdrop-blur-sm"
            name="category"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">Start Processing</option>
            <option value="Delivered">Deliver</option>
          </select>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 text-red-200 text-xs font-semibold hover:bg-red-500/30 transition"
          >
            Cancel
          </button>
        </div>

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
