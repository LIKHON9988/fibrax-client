import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import axios from "axios";

const OrderDetails = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-order", orderId],
    queryFn: async () => {
      const { data } = await axiosSecure(`/admin/orders/${orderId}`);
      return data;
    },
    enabled: !!orderId,
    staleTime: 60 * 1000,
  });

  const { data: product, isLoading: pLoading } = useQuery({
    queryKey: ["admin-order-product", order?.productId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${order?.productId}`
      );
      return data;
    },
    enabled: !!order?.productId,
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <section className="min-h-screen px-4 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-purple-200">
              Order Details
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Complete overview of the selected order
            </p>
          </div>

          <Link
            to="/dashboard/All-orders"
            className="w-fit px-4 py-2 rounded-xl bg-white/10 border border-purple-300/20 text-gray-200 hover:bg-white/20 transition"
          >
            ← Back to Orders
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-purple-300/20 shadow-xl overflow-hidden">
          {/* Product & Status */}
          <div className="p-6 flex flex-col lg:flex-row gap-6 border-b border-purple-300/20">
            {/* Image */}
            <div className="w-full lg:w-48 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-300/20 flex items-center justify-center">
              {pLoading && <LoadingSpinner smallHeight />}
              {!pLoading && product?.image && (
                <img
                  src={product.image}
                  alt={order?.name}
                  className="w-full h-full object-cover"
                />
              )}
              {!pLoading && !product?.image && (
                <span className="text-sm text-gray-300">No image</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-xl sm:text-2xl font-semibold text-purple-200">
                  {order?.name}
                </h2>

                <span
                  className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold border
                    ${
                      order?.status === "approved"
                        ? "bg-green-500/20 text-green-300 border-green-400/30"
                        : order?.status === "rejected"
                        ? "bg-red-500/20 text-red-300 border-red-400/30"
                        : "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                    }
                  `}
                >
                  {order?.status}
                </span>
              </div>

              <p className="text-sm text-gray-400">
                Order ID:{" "}
                <span className="font-mono text-gray-300">{order?._id}</span>
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Info label="Transaction ID" value={order?.transactionId} />
            <Info label="Category" value={order?.category} />
            <Info label="Quantity" value={order?.quantity} />
            <Info label="Price" value={`$${Number(order?.price || 0)}`} />
            <Info label="Customer Name" value={order?.customer_name} />
            <Info label="Customer Email" value={order?.customer_email} />
            <Info
              label="Placed At"
              value={
                order?.created_at
                  ? new Date(order.created_at).toLocaleString()
                  : "—"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Info = ({ label, value }) => (
  <div className="rounded-2xl border border-purple-300/20 bg-white/10 backdrop-blur-xl p-4 hover:bg-white/15 transition">
    <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
    <p className="mt-1 text-base sm:text-lg font-semibold text-purple-200 break-words">
      {value || "—"}
    </p>
  </div>
);

export default OrderDetails;
