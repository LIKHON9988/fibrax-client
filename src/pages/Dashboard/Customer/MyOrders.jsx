import React from "react";
import { Link } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-orders/${user?.email}`
      );
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  console.log(orders);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="min-h-screen  backdrop-blur-sm px-2 py-10">
      <h1 className="text-4xl text-purple-200 font-bold text-center mb-10">
        My Orders
      </h1>

      <div
        className="
        max-w-6xl mx-auto 
        bg-white/10 backdrop-blur-2xl 
        border border-purple-300/20 
        rounded-3xl shadow-2xl shadow-purple-900/20
        overflow-x-auto
      "
      >
        <table className="min-w-full text-sm text-gray-200">
          {/* TABLE HEAD */}
          <thead>
            <tr className="bg-purple-500/10 border-b border-purple-300/20">
              {["Order ID", "Product", "Quantity", "Status", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-purple-200"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="divide-y divide-purple-300/10">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-purple-500/10 transition">
                <td className="px-6 py-4 font-mono text-purple-200">
                  {order.productId}
                </td>
                <td className="px-6 py-4">{order.name}</td>
                <td className="px-6 py-4 font-semibold">{order.quantity}</td>

                {/* STATUS BADGE */}
                <td className="px-6 py-4">
                  <span
                    className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      order.status === "Approved" &&
                      "bg-green-500/20 text-green-300"
                    }
                    ${
                      order.status === "Pending" &&
                      "bg-yellow-500/20 text-yellow-300"
                    }
                    ${
                      order.status === "Rejected" &&
                      "bg-red-500/20 text-red-300"
                    }
                  `}
                  >
                    {order.status}
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-6 py-4">
                  <div
                    className="
                      inline-flex items-center justify-center
                      px-4 py-1.5 rounded-full hover:cursor-pointer
                      bg-purple-500/20 border border-purple-400/30
                      text-purple-200 text-xs font-semibold
                      hover:bg-purple-500/30 transition
                    "
                  >
                    Cancel
                  </div>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
