import { useState } from "react";
import { Link } from "react-router";

const AllOrders = ({ orders = [] }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      order.user?.toLowerCase().includes(search.toLowerCase()) ||
      order.product?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-2 sm:px-8 py-10">
      {/* HEADER + CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Search by Order ID, User, Product"
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
          <option className="bg-gray-900" value="All">
            All
          </option>
          <option className="bg-gray-900" value="Pending">
            Pending
          </option>
          <option className="bg-gray-900" value="Approved">
            Approved
          </option>
          <option className="bg-gray-900" value="Rejected">
            Rejected
          </option>
        </select>
      </div>

      {/* TABLE */}
      <div
        className="
        bg-white/5 backdrop-blur-2xl
        border border-purple-300/20
        rounded-3xl shadow-2xl shadow-purple-900/20
        overflow-hidden
      "
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-200">
            {/* TABLE HEAD */}
            <thead>
              <tr className="bg-purple-500/10 border-b border-purple-300/20">
                {[
                  "Order ID",
                  "User",
                  "Product",
                  "Quantity",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-purple-200"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-purple-300/10">
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-purple-500/10 transition"
                >
                  <td className="px-6 py-4 font-mono text-purple-200">
                    {order._id}
                  </td>

                  <td className="px-6 py-4">{order.user}</td>

                  <td className="px-6 py-4">{order.product}</td>

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
                    <Link
                      to={`/dashboard/orders/${order._id}`}
                      className="
                        inline-flex items-center justify-center
                        px-4 py-1.5 rounded-full
                        bg-purple-500/20 border border-purple-400/30
                        text-purple-200 text-xs font-semibold
                        hover:bg-purple-500/30 transition
                      "
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
