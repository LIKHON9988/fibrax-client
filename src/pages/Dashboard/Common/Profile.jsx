import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/images/cover.jpg";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10">
      <div
        className="relative bg-white/10 backdrop-blur-xl border border-red-400/30
       shadow-2xl rounded-3xl w-full md:w-4/5 lg:w-3/5 overflow-hidden"
      >
        {/* Cover Image */}
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full h-56 object-cover"
        />

        {/* Floating Profile Image */}
        <div className="flex flex-col items-center -mt-16">
          <img
            alt="profile"
            src={user?.photoURL}
            className="rounded-full h-28 w-28 border-4 border-white shadow-xl object-cover"
          />

          {/* User Role */}
          <span className="mt-3 px-4 py-1 text-xs text-white bg-purple-500/60 border border-purple-300/40 rounded-full backdrop-blur-md shadow">
            {user?.role || "User"}
          </span>

          {/* User Name */}
          <p className="mt-3 text-2xl font-semibold text-white drop-shadow-md">
            {user?.displayName}
          </p>

          {/* User ID */}
          <p className="text-sm text-gray-200/80 -mt-1">User ID: {user?.uid}</p>
        </div>

        {/* Info Section */}
        <div className="px-6 py-6 mt-4 bg-white/5 backdrop-blur-xl border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
            <div>
              <p className="uppercase text-xs tracking-wide text-white/60">
                Name
              </p>
              <p className="text-lg font-medium">{user?.displayName}</p>
            </div>

            <div>
              <p className="uppercase text-xs tracking-wide text-white/60">
                Email
              </p>
              <p className="text-lg font-medium">{user?.email}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              className="px-8 py-2 bg-purple-500/40 text-white border border-purple-300/40 
              rounded-xl backdrop-blur-md shadow-md hover:bg-purple-500/60 hover:shadow-lg transition"
            >
              Update Profile
            </button>

            <button
              className="px-8 py-2 bg-purple-500/40 text-white border border-purple-300/40 
              rounded-xl backdrop-blur-md shadow-md hover:bg-purple-500/60 hover:shadow-lg transition"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
