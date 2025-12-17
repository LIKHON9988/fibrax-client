import React from "react";

const TrackOrder = () => {
  return (
    <section className="min-h-screen flex items-center justify-center  p-6">
      <div className="w-full max-w-6xl rounded-3xl border border-white/25 bg-white/10 backdrop-blur-xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white">
            Track Your Order
          </h1>
          <p className="mt-2 text-white/70">
            Live location updates and delivery progress
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Info */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/25 bg-white/20 backdrop-blur-md p-5">
              <p className="text-sm text-white/70">Order ID</p>
              <p className="mt-1 text-lg font-semibold text-white">
                #ORD-24891
              </p>
            </div>

            <div className="rounded-2xl border border-white/25 bg-white/20 backdrop-blur-md p-5">
              <p className="text-sm text-white/70">Status</p>
              <p className="mt-1 text-lg font-semibold text-emerald-400">
                Out for Delivery
              </p>
            </div>

            <div className="rounded-2xl border border-white/25 bg-white/20 backdrop-blur-md p-5">
              <p className="text-sm text-white/70">Estimated Arrival</p>
              <p className="mt-1 text-lg font-semibold text-white">
                25 – 30 mins
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="h-full min-h-[320px] rounded-3xl border border-dashed border-white/40 bg-gradient-to-br from-white/30 to-white/5 backdrop-blur-lg flex flex-col items-center justify-center text-center">
              <span className="text-xl font-semibold text-white">Map View</span>
              <p className="mt-2 text-sm text-white/70">
                React-Leaflet will be mounted here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackOrder;
