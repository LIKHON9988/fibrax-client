import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaBoxes, FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdWarningAmber } from "react-icons/md";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const ManagerStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading: pLoading } = useQuery({
    queryKey: ["manager-products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/manage-products/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: orders = [], isLoading: oLoading } = useQuery({
    queryKey: ["manager-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/manage-orders/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (pLoading || oLoading) return <LoadingSpinner smallHeight />;

  const inventoryCount = products.length;
  const lowStock = products.filter(
    (p) => Number(p.quantity || 0) <= Number(p.moq || 0)
  ).length;

  const totalOrders = orders.length;
  const pending = orders.filter((o) =>
    o.status?.toLowerCase().includes("pending")
  ).length;
  const approved = orders.filter((o) =>
    o.status?.toLowerCase().includes("approved")
  ).length;
  const rejected = orders.filter((o) =>
    o.status?.toLowerCase().includes("rejected")
  ).length;

  const revenue = orders
    .filter((o) => o.status?.toLowerCase() === "approved")
    .reduce((sum, o) => sum + Number(o.price || 0), 0);

  const statusData = [
    { label: "Pending", value: pending },
    { label: "Approved", value: approved },
    { label: "Rejected", value: rejected },
  ];

  const categoryMap = products.reduce((acc, p) => {
    const c = p.category || "Uncategorized";
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryMap).map(([label, value]) => ({
    label,
    value,
  }));

  return (
    <div className="mt-8 space-y-5 px-0 md:px-5 ">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Inventory" value={inventoryCount} icon={FaBoxes} />
        <StatCard title="Low Stock" value={lowStock} icon={MdWarningAmber} />
        <StatCard
          title="Orders"
          value={totalOrders}
          icon={BsFillCartPlusFill}
        />
        <StatCard title="Revenue" value={`$${revenue}`} icon={FaDollarSign} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-2xl border border-purple-300/20 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-lg font-semibold text-purple-200 mb-3">
            Orders by Status
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="label"
                  outerRadius={80}
                  label
                >
                  {statusData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={["#fbbf24", "#34d399", "#f87171"][i % 3]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-2xl border border-purple-300/20 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-lg font-semibold text-purple-200 mb-3">
            Inventory by Category
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
                <XAxis dataKey="label" stroke="#e9d5ff" />
                <YAxis stroke="#e9d5ff" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===================== COMPONENTS ===================== */

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="relative bg-white/10 backdrop-blur-xl border border-purple-300/20 rounded-2xl p-5 shadow-lg">
    <div className="absolute -top-5 left-5 h-12 w-12 rounded-xl bg-purple-600/40 flex items-center justify-center shadow-lg">
      <Icon className="text-white w-5 h-5" />
    </div>
    <div className="text-right">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-semibold text-purple-200 mt-1">{value}</p>
    </div>
  </div>
);

export default ManagerStatistics;
