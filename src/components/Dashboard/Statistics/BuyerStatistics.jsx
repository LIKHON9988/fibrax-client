import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const BuyerStatistics = () => {
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["buyer-stats", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-orders/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingSpinner smallHeight />;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "Pending").length;
  const approvedOrders = orders.filter((o) => o.status === "approved" || o.status === "Approved").length;
  const rejectedOrders = orders.filter((o) => o.status === "rejected" || o.status === "Rejected").length;
  const totalSpent = orders.reduce((sum, o) => sum + Number(o.price || 0) * Number(o.quantity || 1), 0);

  return (
    <div className="mt-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          color="from-blue-600 to-blue-400"
          Icon={BsFillCartPlusFill}
        />
        <StatCard
          title="Pending"
          value={pendingOrders}
          color="from-yellow-600 to-yellow-400"
          Icon={FaClock}
        />
        <StatCard
          title="Approved"
          value={approvedOrders}
          color="from-green-600 to-green-400"
          Icon={FaCheckCircle}
        />
        <StatCard
          title="Rejected"
          value={rejectedOrders}
          color="from-red-600 to-red-400"
          Icon={FaTimesCircle}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-xl border border-purple-300/20 rounded-2xl p-6 shadow-2xl lg:col-span-2">
          <h3 className="text-purple-200 font-semibold mb-3">Spending Overview</h3>
          <div className="flex items-end gap-2 h-40">
            {orders.slice(0, 12).map((o, idx) => {
              const amt = Number(o.price || 0) * Number(o.quantity || 1);
              const height = Math.min(100, Math.round((amt / (totalSpent || 1)) * 100));
              return (
                <div
                  key={idx}
                  className="flex-1 bg-purple-500/30 border border-purple-400/30 rounded-t"
                  style={{ height: `${Math.max(10, height)}%` }}
                  title={`$${amt}`}
                />
              );
            })}
          </div>
          <p className="mt-4 text-gray-300 text-sm">Total Spent: ${totalSpent.toFixed(2)}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-purple-300/20 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-purple-200 font-semibold mb-3">Status Breakdown</h3>
          <ul className="space-y-3 text-gray-200">
            <li className="flex justify-between">
              <span>Pending</span>
              <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-200 border border-yellow-400/20">
                {pendingOrders}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Approved</span>
              <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-200 border border-green-400/20">
                {approvedOrders}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Rejected</span>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-200 border border-red-400/20">
                {rejectedOrders}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Total Orders</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-200 border border-blue-400/20">
                {totalOrders}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, Icon }) => (
  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white/10 text-gray-200 shadow-md">
    <div
      className={`mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center ${color} text-white`}
    >
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="p-4 text-right">
      <p className="text-sm font-normal text-gray-300">{title}</p>
      <h4 className="text-2xl font-semibold text-purple-200">{value}</h4>
    </div>
  </div>
);

export default BuyerStatistics;
