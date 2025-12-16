import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user } = useAuth();

  const [role, isRefreshing] = useRole();

  console.log(role, isRefreshing);

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-12 ">
      <div
        className="
          relative w-full max-w-xl
          rounded-3xl
          bg-white/10
          backdrop-blur-2xl
          border border-purple-300/20
          shadow-2xl
          px-6 pt-14 pb-8
        "
      >
        {/* Avatar */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-purple-500/40 blur-xl"></div>
            <img
              alt="profile"
              src={user?.photoURL}
              className="
                relative
                h-28 w-28
                rounded-full
                border-4 border-purple-300/40
                object-cover
                shadow-xl
              "
            />
          </div>
        </div>

        {/* Role */}
        <div className="flex justify-center mt-2">
          <span
            className="
              px-4 py-1 text-xs
              text-purple-200
              bg-purple-500/20
              border border-purple-300/30
              rounded-full
              backdrop-blur-md
              shadow
            "
          >
            {role || "User"}
          </span>
        </div>

        {/* Name */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold text-white drop-shadow">
            {user?.displayName}
          </h2>
          <p className="text-sm text-gray-300/80 mt-1">User ID: {user?.uid}</p>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
          <div>
            <p className="text-xs uppercase tracking-wide text-purple-300/70">
              Name
            </p>
            <p className="text-lg font-medium">{user?.displayName}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-purple-300/70">
              Email
            </p>
            <p className="text-lg font-medium break-all">{user?.email}</p>
          </div>
        </div>

        {/* Action */}
        <div className="mt-8 flex justify-center">
          <button
            className="
              px-8 py-2
              text-sm font-medium
              text-white
              rounded-xl
              bg-purple-600/40
              border border-purple-300/30
              backdrop-blur-md
              shadow-md
              hover:bg-purple-600/60
              hover:shadow-lg
              transition
            "
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
