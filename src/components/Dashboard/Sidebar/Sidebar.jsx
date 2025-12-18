import { useState } from "react";
import { Link } from "react-router";

import logo from "../../../assets/images/logo.png";
import useRole from "../../../hooks/useRole";
// Icons

import { CgProfile } from "react-icons/cg";
import { AiOutlineBars } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";

// User Menu
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import ManagerMenu from "./Menu/ManagerMenu";
import BuyerMenu from "./Menu/BuyerMenu";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);

  const [role, isRefreshing] = useRole();

  console.log(role);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  if (isRefreshing) return <LoadingSpinner></LoadingSpinner>;

  return (
    <>
      {/* Mobile Navbar */}
      <div className="bg-white/10 backdrop-blur-3xl border-b border-red-400/40 text-white flex justify-between md:hidden px-4 py-3 shadow-lg">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" width="100" height="100" />
        </Link>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-3 bg-red-500/20 rounded-lg border border-red-400/40 shadow hover:bg-red-500/30 transition"
        >
          <AiOutlineBars className="h-6 w-6 text-red-200" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-20 my-36 rounded-3xl ml-3 flex flex-col justify-between 
        overflow-x-hidden bg-white/10 backdrop-blur-xl border border-red-400/40 
        shadow-xl w-64 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform
        ${isActive ? "-translate-x-full" : "translate-x-0"}
        md:translate-x-0 transition duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Middle Content */}
          <div className="flex flex-col justify-between flex-1 mt-4">
            <nav className="space-y-1">
              {/* Common Menu */}
              <MenuItem
                icon={MdDashboard}
                label="Dashboard"
                address="/dashboard"
                className="hover:bg-red-500/20"
              />

              {/* Role-Based Menus */}
              {role === "Buyer" && <BuyerMenu></BuyerMenu>}
              {role === "Manager" && <ManagerMenu />}
              {role === "Admin" && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <hr className="border-red-400/40 mb-4" />

            <MenuItem
              icon={CgProfile}
              label="My Profile"
              address="/dashboard/profile"
              className="hover:bg-red-500/20"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
