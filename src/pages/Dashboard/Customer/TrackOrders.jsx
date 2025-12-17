import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import axios from "axios";

const OrderCard = ({ order }) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", order.productId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${order.productId}`
      );
      return data;
    },
    enabled: !!order?.productId,
    staleTime: 60 * 1000,
  });

  const img = product?.image;

  return (
    <div className="w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-purple-300/20 shadow-lg px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* LEFT: Image + Info */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Image */}
          <div className="w-20 h-16 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-500/20 to-pink-500/10 border border-purple-300/20 flex-shrink-0">
            {isLoading && (
              <div className="h-full flex items-center justify-center">
                <LoadingSpinner smallHeight />
              </div>
            )}
            {!isLoading && !isError && img && (
              <img
                src={img}
                alt={order.name}
                className="w-full h-full object-cover"
              />
            )}
            {!isLoading && (!img || isError) && (
              <div className="h-full flex items-center justify-center text-[10px] text-gray-300">
                No image
              </div>
            )}
          </div>

          {/* Text */}
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-purple-200 truncate">
              {order.name}
            </h3>
            <p className="text-xs text-gray-400 truncate">
              Order ID: <span className="font-mono">{order._id}</span>
            </p>
            <p className="text-xs text-gray-400">
              {order.category} • Qty: {order.quantity}
            </p>
          </div>
        </div>

        {/* RIGHT: Track Button */}
        <Link
          to={`/dashboard/track-order/${order._id || order.id}`}
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-blue-500/20 border border-blue-400/30 text-blue-200
                     hover:bg-blue-500/30 transition text-sm font-medium"
        >
          Track
        </Link>
      </div>
    </div>
  );
};

const TrackOrders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["track-orders"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-orders`);
      return data;
    },
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <section className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-purple-200 mb-6">
          Track Orders
        </h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order._id || order.id} order={order} />
          ))}
          {orders.length === 0 && (
            <div className="text-center text-gray-400">No orders yet.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrackOrders;
