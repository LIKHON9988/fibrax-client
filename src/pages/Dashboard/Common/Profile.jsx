import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { imageUpload } from "../../../utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user, setUser, updateUserProfile, logOut } = useAuth();
  const [role, isRefreshing] = useRole();
  const axiosSecure = useAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  console.log(role, isRefreshing);

  const closeModal = () => {
    setIsOpen(false);
    setFile(null);
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      let photoURL = user?.photoURL;
      if (file) {
        photoURL = await imageUpload(file);
      }

      await updateUserProfile(name, photoURL);
      await axiosSecure.patch("/users/profile", { name, image: photoURL });

      setUser((prev) => ({
        ...prev,
        displayName: name,
        photoURL,
      }));

      toast.success("Profile updated");
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || err?.message || "Update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 ">
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
                relative h-28 w-28
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

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          {/* Update */}
          <button
            onClick={() => setIsOpen(true)}
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

          {/* Logout */}
          <button
            onClick={logOut}
            className="
              px-8 py-2
              text-sm font-medium
              text-red-200
              rounded-xl
              bg-red-500/20
              border border-red-400/30
              backdrop-blur-md
              shadow-md
              hover:bg-red-500/40
              hover:text-white
              hover:shadow-lg
              transition
            "
          >
            Logout
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-2xl border border-purple-300/20 p-6 text-white">
            <DialogTitle className="text-lg font-semibold">
              Update Profile
            </DialogTitle>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm text-purple-200">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="text-sm text-purple-200">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none file:mr-3 file:rounded-lg file:border file:border-white/20 file:bg-white/20 file:px-3 file:py-1"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={saving || !name?.trim()}
                  className="px-4 py-2 rounded-xl border border-purple-300/30 bg-purple-600/40 hover:bg-purple-600/60 transition disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Update"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Profile;
