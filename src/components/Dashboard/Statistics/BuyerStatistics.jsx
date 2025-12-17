import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const BuyerStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["buyer-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/my-orders`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!user?.email,
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingSpinner smallHeight />;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => (o.status || "").toLowerCase() === "pending"
  ).length;
  const approvedOrders = orders.filter(
    (o) => (o.status || "").toLowerCase() === "approved"
  ).length;
  const rejectedOrders = orders.filter(
    (o) => (o.status || "").toLowerCase() === "rejected"
  ).length;
  const totalSpent = orders.reduce(
    (sum, o) => sum + Number(o.price || 0) * Number(o.quantity || 1),
    0
  );

  const statusData = [
    { label: "Pending", value: pendingOrders },
    { label: "Approved", value: approvedOrders },
    { label: "Rejected", value: rejectedOrders },
  ];

  const monthKey = (d) => {
    try {
      const dt = new Date(d);
      return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
    } catch {
      return null;
    }
  };
  const spendByMonthMap = orders.reduce((acc, o, idx) => {
    const key = monthKey(o.created_at) ?? `#${idx + 1}`;
    const amt = Number(o.price || 0) * Number(o.quantity || 1);
    acc[key] = (acc[key] || 0) + amt;
    return acc;
  }, {});
  const spendingSeries = Object.entries(spendByMonthMap)
    .map(([month, amount]) => ({ month, amount }))
    .slice(-10);

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
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
                <XAxis dataKey="month" stroke="#e9d5ff" />
                <YAxis stroke="#e9d5ff" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#a78bfa" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-gray-300 text-sm">Total Spent: ${totalSpent.toFixed(2)}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-purple-300/20 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-purple-200 font-semibold mb-3">Status Breakdown</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="label" outerRadius={80} label>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={["#fbbf24", "#34d399", "#f87171"][i % 3]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
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
