import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ApproveData = ({ request, refetch }) => {
  const axiosSequre = useAxiosSecure();

  const handleApprove = async () => {
    try {
      await axiosSequre.patch(`/update-role`, {
        email: request.email,
        role: "Manager",
      });
      toast.success("Role updated!");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <tr className="bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all">
      {/* Email */}
      <td className="px-6 py-5 text-sm text-white">{request.email}</td>

      {/* Action */}
      <td className="px-6 py-5 text-sm">
        <button
          onClick={handleApprove}
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
          Make manager
        </button>
      </td>
    </tr>
  );
};

export default ApproveData;
