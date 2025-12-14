import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/paymentSuccessful`, {
        sessionId,
      });
    }
  }, [sessionId]);

  return (
    <div className="flex items-center justify-center min-h-screen  backdrop-blur-sm px-4">
      <div className="bg-white/10 backdrop-blur-2xl border border-purple-300/20 rounded-3xl shadow-2xl shadow-purple-900/20 p-10 max-w-md text-center">
        {/* SUCCESS ICON */}
        <div className="flex items-center justify-center w-24 h-24 mx-auto rounded-full bg-green-500/20 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* SUCCESS MESSAGE */}
        <h1 className="text-3xl font-bold text-purple-200 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-300 mb-6">
          Your payment has been processed successfully.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-4">
          <Link
            to="/dashboard/my-orders"
            className="px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-200 font-semibold hover:bg-purple-500/30 transition"
          >
            View Orders
          </Link>
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-green-500/20 border border-green-400/30 text-green-200 font-semibold hover:bg-green-500/30 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
