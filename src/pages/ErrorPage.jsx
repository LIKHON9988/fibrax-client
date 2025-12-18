import Button from "../components/Shared/Button/Button";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br "
    >
      <div className="container px-6 py-12 mx-auto">
        <div
          className="
          flex flex-col items-center
          max-w-md mx-auto text-center
          p-8 rounded-2xl
          bg-white/10
          backdrop-blur-2xl
          border border-red-400/40
          shadow-lg shadow-purple-500/30
          text-white
        "
        >
          {/* Icon */}
          <div
            className="
            p-4 rounded-full
            bg-red-500/20
            border border-red-400/40
            backdrop-blur-xl
          "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8 text-red-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          {/* Text */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
            Something Went Wrong
          </h1>
          <p className="mt-3 text-gray-300">
            An unexpected error occurred. Please try again or use the options
            below.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center w-full mt-6 gap-4">
            <button
              onClick={() => navigate(-1)}
              className="
                flex items-center justify-center gap-2
                w-full sm:w-auto px-6 py-2.5
                rounded-xl
                bg-white/10
                border border-white/20
                text-white font-medium
                backdrop-blur-xl
                hover:bg-white/20
                transition-all
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-lime-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              Back
            </button>

            <Button label="Take Me Home" onClick={() => navigate("/")} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
