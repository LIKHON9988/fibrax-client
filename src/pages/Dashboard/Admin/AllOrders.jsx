import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import { useQuery } from "@tanstack/react-query";

const AllOrders = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: allOrders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-orders`);
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      order.name?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-2 sm:px-8 py-10">
      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Search by Order ID, Customer, Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full md:w-1/2 px-4 py-2 rounded-xl
            bg-white/10 backdrop-blur-xl
            border border-purple-300/20
            text-gray-200 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-purple-400/40
          "
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            px-4 py-2 rounded-xl
            bg-white/10 backdrop-blur-xl
            border border-purple-300/20
            text-gray-200
            focus:outline-none focus:ring-2 focus:ring-purple-400/40
          "
        >
          <option className="bg-gray-900" value="all">
            All
          </option>
          <option className="bg-gray-900" value="pending">
            Pending
          </option>
          <option className="bg-gray-900" value="approved">
            Approved
          </option>
          <option className="bg-gray-900" value="rejected">
            Rejected
          </option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white/5 backdrop-blur-2xl border border-purple-300/20 rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-200">
            <thead>
              <tr className="bg-purple-500/10 border-b border-purple-300/20">
                {[
                  "Order ID",
                  "Customer",
                  "Product",
                  "Quantity",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase text-purple-200"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-purple-300/10">
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-purple-500/10 transition"
                >
                  <td className="px-6 py-4 font-mono text-purple-200">
                    {order._id}
                  </td>

                  <td className="px-6 py-4">{order.customer_name}</td>

                  <td className="px-6 py-4">{order.name}</td>

                  <td className="px-6 py-4 font-semibold">{order.quantity}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          order.status === "approved" &&
                          "bg-green-500/20 text-green-300"
                        }
                        ${
                          order.status === "pending" &&
                          "bg-yellow-500/20 text-yellow-300"
                        }
                        ${
                          order.status === "rejected" &&
                          "bg-red-500/20 text-red-300"
                        }
                      `}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      to={`/dashboard/orders/${order._id}`}
                      className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-semibold hover:bg-purple-500/30 transition"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
