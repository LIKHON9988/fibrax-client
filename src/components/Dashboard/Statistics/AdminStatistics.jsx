import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading: pLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  const { data: orders = [], isLoading: oLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-orders`);
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  const { data: users = [], isLoading: uLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure(`/all-users`);
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  if (pLoading || oLoading || uLoading) return <LoadingSpinner smallHeight />;

  const approved = orders.filter(
    (o) => (o.status || "").toLowerCase() === "approved"
  );
  const totalRevenue = approved.reduce(
    (sum, o) => sum + Number(o.price || 0) * Number(o.quantity || 1),
    0
  );
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = users.length;

  const statusCounts = ["pending", "approved", "rejected"].map((s) => ({
    label: s[0].toUpperCase() + s.slice(1),
    value: orders.filter((o) => (o.status || "").toLowerCase() === s).length,
  }));

  const categoryMap = products.reduce((acc, p) => {
    const c = p.category || "Uncategorized";
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryMap).map(([label, value]) => ({
    label,
    value,
  }));

  const roleMap = users.reduce((acc, u) => {
    const r = u.role || "User";
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {});
  const roleData = Object.entries(roleMap).map(([name, value]) => ({
    name,
    value,
  }));

  const colors = {
    purple: "#a78bfa",
    pink: "#f472b6",
    blue: "#60a5fa",
    green: "#34d399",
    yellow: "#fbbf24",
    red: "#f87171",
  };

  return (
    <div className="mt-6 px-0 md:px-5">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          color="from-orange-600 to-orange-400"
          Icon={FaDollarSign}
        />
        <StatCard
          title="Orders"
          value={totalOrders}
          color="from-blue-600 to-blue-400"
          Icon={BsFillCartPlusFill}
        />
        <StatCard
          title="Products"
          value={totalProducts}
          color="from-pink-600 to-pink-400"
          Icon={BsFillHouseDoorFill}
        />
        <StatCard
          title="Users"
          value={totalUsers}
          color="from-green-600 to-green-400"
          Icon={FaUserAlt}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-xl border border-purple-300/20 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-purple-200 font-semibold mb-3">
            Orders by Status
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusCounts}
                  dataKey="value"
                  nameKey="label"
                  outerRadius={90}
                  label
                >
                  {statusCounts.map((_, i) => (
                    <Cell
                      key={i}
                      fill={[colors.yellow, colors.green, colors.red][i % 3]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-purple-300/20 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-purple-200 font-semibold mb-3">Users by Role</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {roleData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={
                        [
                          colors.purple,
                          colors.green,
                          colors.blue,
                          colors.yellow,
                          colors.red,
                        ][i % 5]
                      }
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white/10 backdrop-blur-xl border border-purple-300/20 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-purple-200 font-semibold mb-3">
            Inventory by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
                <XAxis dataKey="label" stroke="#e9d5ff" />
                <YAxis stroke="#e9d5ff" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={colors.blue} />
              </BarChart>
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

export default AdminStatistics;
