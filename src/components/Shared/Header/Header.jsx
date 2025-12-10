import React from "react";
import logo from "../../../assets/images/logo.png";
import { Link } from "react-router";

const Header = () => {
  return (
    <div>
      {/* Sticky Blurry Header */}
      <div
        className="w-full hidden md:flex px-4 py-4
        bg-gradient-to-b from-black/60 via-black/40 to-transparent 
      backdrop-blur-xl border-b border-red-400/30 
        justify-center items-center
        shadow-xl
        fixed top-0 left-0 right-0 z-50"
      >
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="logo"
            width="100"
            height="100"
            className="drop-shadow-md"
          />
        </Link>
      </div>

      {/* Spacer to prevent layout jump */}
      <div className="hidden md:block "></div>
    </div>
  );
};

export default Header;
