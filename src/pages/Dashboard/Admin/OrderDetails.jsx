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
    <section className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-purple-200">
              Order Details
            </h1>
            <p className="text-sm text-gray-400">
              Detailed overview of this order
            </p>
          </div>
          <Link
            to="/dashboard/All-orders"
            className="px-4 py-2 rounded-xl bg-white/10 border border-purple-300/20 text-gray-200 hover:bg-white/20 transition"
          >
            ← Back
          </Link>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-purple-300/20 shadow-2xl overflow-hidden">
          {/* Top Product Strip */}
          <div className="flex gap-6 p-6 border-b border-purple-300/20">
            <div className="w-32 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-300/20">
              {pLoading && (
                <div className="h-full flex items-center justify-center">
                  <LoadingSpinner smallHeight />
                </div>
              )}
              {!pLoading && product?.image && (
                <img
                  src={product.image}
                  alt={order?.name}
                  className="w-full h-full object-cover"
                />
              )}
              {!pLoading && !product?.image && (
                <div className="h-full flex items-center justify-center text-xs text-gray-300">
                  No image
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-purple-200">
                {order?.name}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Order ID: <span className="font-mono">{order?._id}</span>
              </p>

              <div className="mt-3">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border
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
            </div>
          </div>

          {/* Info Grid */}
          <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Info label="Transaction ID" value={order?.transactionId} />
            <Info label="Category" value={order?.category} />
            <Info label="Quantity" value={order?.quantity} />
            <Info label="Price" value={`$${Number(order?.price || 0)}`} />
            <Info label="Customer" value={order?.customer_name} />
            <Info label="Email" value={order?.customer_email} />
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
  <div className="rounded-2xl border border-purple-300/20 bg-white/10 backdrop-blur-xl p-4">
    <p className="text-xs text-gray-300">{label}</p>
    <p className="mt-1 text-lg font-semibold text-purple-200">{value}</p>
  </div>
);

export default OrderDetails;
