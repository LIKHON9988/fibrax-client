import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace />;

  // Submit handler
  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err?.message);
      console.log(err);
    }
  };

  // Google login handler
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      setLoading(false);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md w-full p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-xl border border-red-400/40 text-white">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-extrabold tracking-wide text-red-200 drop-shadow-lg">
            Welcome Back
          </h1>
          <p className="text-sm text-red-100">
            Log in to continue your journey
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm text-red-200">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-md bg-white/20 border border-red-300/40 text-white placeholder-red-200 focus:outline-red-300"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-300 text-sm">Email is required</span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm text-red-200">
                Password
              </label>
              <input
                type="password"
                placeholder="*******"
                className="w-full px-3 py-2 rounded-md bg-white/20 border border-red-300/40 text-white placeholder-red-200 focus:outline-red-300"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-300 text-sm">
                  Password is required
                </span>
              )}
            </div>
          </div>

          {/* Submit Button (unchanged) */}
          <button
            type="submit"
            className="bg-lime-500 w-full rounded-md py-3 text-white font-semibold shadow-md"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center pt-6 space-x-2">
          <div className="flex-1 h-px bg-red-300/30"></div>
          <p className="text-sm text-red-200">Or login with</p>
          <div className="flex-1 h-px bg-red-300/30"></div>
        </div>

        {/* Google Button */}
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border border-red-300/40 mt-4 p-2 rounded-md cursor-pointer hover:bg-white/10 transition"
        >
          <FcGoogle size={30} />
          <p className="text-red-100 font-medium">Google</p>
        </div>

        {/* Footer */}
        <p className="text-sm text-center text-red-100 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-300 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
