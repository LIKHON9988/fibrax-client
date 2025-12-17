import { useMemo } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";

const stepsTemplate = [
  { key: "Cutting Completed", icon: "✂️" },
  { key: "Sewing Started", icon: "🧵" },
  { key: "Finishing", icon: "✨" },
  { key: "QC Checked", icon: "✅" },
  { key: "Packed", icon: "📦" },
  { key: "Shipped / Out for Delivery", icon: "🚚" },
];

const TrackOrder = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: async () => {
      const { data } = await axiosSecure(`/orders/${orderId}`);
      return data;
    },
    enabled: !!orderId,
    staleTime: 60 * 1000,
  });

  const timeline = useMemo(() => {
    const tracking = Array.isArray(order?.tracking) ? order.tracking : [];
    const trackedKeys = tracking.map((t) => t.label?.toLowerCase());
    const merged = [
      ...(order?.created_at
        ? [
            {
              label: "Order Placed",
              date: order.created_at,
              location: null,
              notes: `Transaction: ${order.transactionId}`,
            },
          ]
        : []),
      ...tracking
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((t) => ({
          label: t.label,
          date: t.date,
          location: t.location || null,
          notes: t.notes || null,
          image: t.image || null,
        })),
      ...stepsTemplate
        .filter((s) => !trackedKeys.includes(s.key.toLowerCase()))
        .map((s) => ({
          label: s.key,
          date: null,
          location: null,
          notes: null,
          icon: s.icon,
        })),
    ];
    return merged;
  }, [order]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const latestIndex =
    timeline.length -
    1 -
    [...timeline].reverse().findIndex((s) => !!s.date);

  return (
    <section className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-purple-200">Track Order</h1>
          <Link
            to="/dashboard/track-orders"
            className="px-4 py-2 rounded-xl bg-white/10 border border-purple-300/20 text-gray-200 hover:bg-white/20 transition"
          >
            Back to Track Orders
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4">
            <InfoCard label="Order ID" value={order?._id} />
            <InfoCard label="Product" value={order?.name} />
            <InfoCard label="Status" value={order?.status} />
            <InfoCard label="Quantity" value={order?.quantity} />
            <InfoCard label="Price" value={`$${Number(order?.price || 0)}`} />
          </div>

          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-purple-300/20 rounded-3xl shadow-2xl p-6">
            <h2 className="text-xl font-semibold text-purple-200 mb-4">
              Production & Shipping Timeline
            </h2>
            <ol className="relative border-s border-purple-300/20">
              {timeline.map((step, idx) => {
                const isLatest = idx === latestIndex && step.date;
                return (
                  <li key={idx} className="mb-8 ms-6">
                    <span
                      className={`absolute -start-3 flex items-center justify-center w-6 h-6 rounded-full ${
                        step.date
                          ? "bg-gradient-to-tr from-purple-600 to-pink-500"
                          : "bg-white/10"
                      } border border-purple-300/30`}
                    >
                      <span className="text-xs text-white">
                        {step.icon ? step.icon : "•"}
                      </span>
                    </span>
                    <div
                      className={`rounded-2xl border ${
                        isLatest
                          ? "border-pink-300/40 bg-pink-500/10"
                          : "border-purple-300/20 bg-white/10"
                      } backdrop-blur-xl p-4`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-purple-200">
                          {step.label}
                        </h3>
                        {step.date && (
                          <time className="text-xs text-gray-300">
                            {new Date(step.date).toLocaleString()}
                          </time>
                        )}
                      </div>
                      <div className="mt-2 text-sm text-gray-300">
                        {step.location && (
                          <p>
                            <span className="font-semibold">Location:</span>{" "}
                            {step.location}
                          </p>
                        )}
                        {step.notes && (
                          <p className="mt-1">
                            <span className="font-semibold">Notes:</span>{" "}
                            {step.notes}
                          </p>
                        )}
                      </div>
                      {step.image && (
                        <div className="mt-3">
                          <img
                            src={step.image}
                            alt={step.label}
                            className="rounded-xl border border-purple-300/20 max-h-40"
                          />
                        </div>
                      )}
                      {!step.date && (
                        <p className="mt-3 text-xs text-gray-400">
                          Awaiting update
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({ label, value }) => (
  <div className="rounded-2xl border border-purple-300/20 bg-white/10 backdrop-blur-xl p-5 shadow-2xl">
    <p className="text-sm text-gray-300">{label}</p>
    <p className="mt-1 text-lg font-semibold text-purple-200">{value}</p>
  </div>
);

export default TrackOrder;
