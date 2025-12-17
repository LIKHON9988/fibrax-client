import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import ManagerOrderDataRow from "../../../components/Dashboard/TableRows/ManagerOrderDataRow";

const ManageOrders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSequre = useAxiosSecure();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["manage-orders", user?.email],
    queryFn: async () => {
      const result = await axiosSequre(`/manage-orders/${user?.email}`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="overflow-x-auto">
        <div
          className="
            inline-block min-w-full
            bg-white/10 backdrop-blur-2xl
            border border-purple-300/20
            rounded-3xl shadow-2xl shadow-purple-900/20
            overflow-hidden
          "
        >
          <table className="min-w-full text-gray-200">
            <thead>
              <tr className="bg-purple-500/10 border-b border-purple-300/20">
                {[
                  "Name",
                  "Customer",
                  "Price",
                  "Quantity",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-purple-200"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-300/10">
              {orders.map((order) => (
                <ManagerOrderDataRow
                  key={order._id}
                  order={order}
                  onDeleted={() =>
                    queryClient.invalidateQueries({
                      queryKey: ["manage-orders", user?.email],
                    })
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
