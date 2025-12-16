import { useState } from "react";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <tr className="bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all">
      {/* name */}
      <td className="px-6 py-5 text-sm text-white">{user?.name}</td>

      {/* email */}
      <td className="px-6 py-5 text-sm text-gray-300">{user?.email}</td>

      {/* Status */}
      <td className="px-6 py-5 text-sm text-gray-300">{user?.role}</td>

      {/* Action */}
      <td className="px-6 py-5 text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="
            px-4 py-2 rounded-xl
            bg-gradient-to-r from-purple-600/40 to-pink-600/40
            border border-purple-300/30
            text-white font-semibold
            backdrop-blur-xl
            hover:from-purple-600/60 hover:to-pink-600/60
            hover:shadow-lg hover:shadow-purple-500/30
            transition-all
          "
        >
          Update Role
        </button>

        {/* Modal */}
        <UpdateUserRoleModal
          refetch={refetch}
          user={user}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
