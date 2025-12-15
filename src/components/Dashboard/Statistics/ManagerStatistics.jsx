import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaBoxes, FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdWarningAmber } from "react-icons/md";

const ManagerStatistics = () => {
  const { user } = useAuth();

  const { data: products = [], isLoading: pLoading } = useQuery({
    queryKey: ["manager-products", user?.email],
    queryFn: async () =>
      (
        await axios.get(
          `${import.meta.env.VITE_API_URL}/manage-products/${user?.email}`
        )
      ).data,
    enabled: !!user?.email,
  });

  const { data: orders = [], isLoading: oLoading } = useQuery({
    queryKey: ["manager-orders", user?.email],
    queryFn: async () =>
      (
        await axios.get(
          `${import.meta.env.VITE_API_URL}/manage-orders/${user?.email}`
        )
      ).data,
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

  return (
    <div className="mt-8 space-y-8">
      {/* TOP STATS */}
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

      {/* ORDER BREAKDOWN */}
      <div className="bg-white/5 backdrop-blur-2xl border border-purple-300/20 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-lg font-semibold text-purple-200 mb-6">
          Order Breakdown
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <RingStat label="Pending" value={pending} total={totalOrders} />
          <RingStat label="Approved" value={approved} total={totalOrders} />
          <RingStat label="Rejected" value={rejected} total={totalOrders} />
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

const RingStat = ({ label, value, total }) => {
  const colors = {
    Pending: "#facc15",
    Approved: "#22c55e",
    Rejected: "#ef4444",
  };

  const safeTotal = Math.max(total, 1);
  const anglePerOrder = 360 / safeTotal;
  const filledAngle = value * anglePerOrder;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-28 w-28 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(
            ${colors[label]} 0deg ${filledAngle}deg,
            rgba(255,255,255,0.08) ${filledAngle}deg 360deg
          )`,
        }}
      >
        <div className="h-18 w-18 rounded-full bg-[#0b0b16] backdrop-blur-xl flex items-center justify-center border border-white/10">
          <span className="text-2xl font-semibold text-white">{value}</span>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-300">{label}</p>
      <p className="text-xs text-gray-500">
        {value} of {total}
      </p>
    </div>
  );
};

export default ManagerStatistics;
