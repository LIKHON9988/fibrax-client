import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["manager-pending-orders", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/manage-orders/${user?.email}/pending`
      );
      return data;
    },
    enabled: !!user?.email,
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <section className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-purple-200 mb-6">
          Pending Orders
        </h1>

        <div
          className="
            bg-white/10 backdrop-blur-2xl
            border border-purple-300/20
            rounded-3xl shadow-2xl shadow-purple-900/20
            overflow-hidden
          "
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-200">
              <thead>
                <tr className="bg-purple-500/10 border-b border-purple-300/20">
                  {["Order ID", "User", "Product", "Quantity", "Order Date"].map(
                    (head) => (
                      <th
                        key={head}
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-purple-200"
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-300/10">
                {orders.map((o) => (
                  <tr
                    key={o._id || o.id}
                    className="hover:bg-purple-500/10 transition"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-gray-300">
                      {o._id || o.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-purple-600/40 border border-purple-300/20 flex items-center justify-center text-white text-xs">
                          {String(o.customer_name || "?")
                            .slice(0, 1)
                            .toUpperCase()}
                        </div>
                        <div>
                          <div className="text-gray-100 font-medium">
                            {o.customer_name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {o.customer_email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-100">{o.name}</td>
                    <td className="px-6 py-4 text-purple-200 font-semibold">
                      {o.quantity}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {o.created_at
                        ? new Date(o.created_at).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-8 text-gray-400"
                    >
                      No pending orders.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PendingOrders;
