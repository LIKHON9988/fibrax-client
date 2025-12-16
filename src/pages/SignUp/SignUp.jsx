import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";

import { imageUpload, saveOrUpdateUser } from "../../utils";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image, email, password, role } = data;

    const imageData = image?.[0];
    // const formData = new FormData();

    // formData.append("image", imageData);

    try {
      // const { data } = await axios.post(
      //   `https://api.imgbb.com/1/upload?key=${
      //     import.meta.env.VITE_IMGBB_API_KEY
      //   }`,
      //   formData
      // );

      const imageURL = await imageUpload(imageData);

      const result = await createUser(email, password);

      await saveOrUpdateUser({ name, email, role, image: imageURL });

      await updateUserProfile(name, imageURL);

      console.log(result);

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        role: "Buyer",
        image: user?.photoURL,
      });

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex flex-col max-w-md w-full p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-xl border border-red-400/40 text-white">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-extrabold tracking-wide text-red-200 drop-shadow-lg">
            Create Account
          </h1>
          <p className="text-sm text-red-100">Join the PlantNet Community</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate=""
        >
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm text-red-200">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-2 rounded-md bg-white/20 border border-red-300/40 text-white focus:outline-red-300 placeholder-red-200"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-300 text-sm">Name is required</span>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="block mb-2 text-sm text-red-200">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-red-100
                  file:px-4 file:py-2 file:border-0 file:rounded-md
                  file:bg-red-200 file:text-red-700
                  hover:file:bg-red-300
                  bg-white/10 border border-red-400/40 rounded-md cursor-pointer"
                {...register("image")}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-2 text-sm text-red-200">Role</label>
              <select
                className="w-full px-3 py-2 rounded-md bg-white/20 border border-red-300/40 text-white focus:outline-red-300"
                {...register("role", { required: true })}
              >
                <option value="" className="text-black">
                  Select role
                </option>
                <option value="Buyer" className="text-black">
                  Buyer
                </option>
                <option value="Manager" className="text-black">
                  Manager
                </option>
              </select>
              {errors.role && (
                <span className="text-red-300 text-sm">Role is required</span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm text-red-200">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-md bg-white/20 border border-red-300/40 text-white focus:outline-red-300 placeholder-red-200"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-300 text-sm">
                  Please enter a valid email
                </span>
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
                autoComplete="new-password"
                className="w-full px-3 py-2 rounded-md bg-white/20 border border-red-300/40 text-white focus:outline-red-300 placeholder-red-200"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-300 text-sm">
                  Strong password required
                </span>
              )}
            </div>
          </div>

          {/* Submit Button (unchanged) */}
          <button
            type="submit"
            className="  w-full py-3 text-center rounded-xl
                bg-gradient-to-r from-purple-600/40 to-pink-600/40
                border border-purple-300/30
                text-white font-semibold backdrop-blur-xl
                hover:from-purple-600/60 hover:to-pink-600/60
                hover:shadow-lg hover:shadow-purple-500/30
                transition-all"
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
          <p className="text-sm text-red-200">Or sign up with</p>
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

        <p className="text-sm text-center text-red-100 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-300 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
