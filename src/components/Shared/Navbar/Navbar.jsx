import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fixed top-0 w-full z-30 
      bg-gradient-to-b from-black/60 via-black/40 to-transparent 
      backdrop-blur-xl border-b border-red-400/30 shadow-xl"
    >
      <Container>
        <div className="flex items-center justify-between py-3 px-2 md:px-4">
          {/* LOGO BOX WITH GRADIENT + GLOW */}
          <Link to="/" className="flex items-center gap-2 group">
            <div>
              <img
                src={logo}
                alt="logo"
                width="110"
                className="object-contain drop-shadow-lg group-hover:scale-105 transition"
              />
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-[16px] font-medium text-white">
            <NavLink to="/" className="hover:text-red-300 transition-all">
              Home
            </NavLink>

            <NavLink
              to="/allProducts"
              className="hover:text-red-300 transition-all"
            >
              All Products
            </NavLink>

            {!user && (
              <>
                <NavLink
                  to="/aboutUs"
                  className="hover:text-red-300 transition-all"
                >
                  About Us
                </NavLink>

                <NavLink
                  to="/contact"
                  className="hover:text-red-300 transition-all"
                >
                  Contact
                </NavLink>

                <NavLink
                  to="/login"
                  className="hover:text-red-300 transition-all"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className="px-5 py-2 rounded-full bg-red-600/80 text-white shadow-md
                  hover:bg-red-700 hover:shadow-xl transition-all backdrop-blur-lg"
                >
                  Register
                </NavLink>
              </>
            )}

            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className="hover:text-red-300 transition-all"
                >
                  Dashboard
                </NavLink>

                {/* Avatar */}
                <img
                  src={user.photoURL || avatarImg}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-red-400 shadow-lg 
                  cursor-pointer hover:scale-110 transition hover:shadow-red-400"
                />

                <div
                  onClick={logOut}
                  className="cursor-pointer px-5 py-2 rounded-full bg-red-600/70 text-white shadow-md 
                  hover:bg-red-700 hover:shadow-xl transition-all"
                >
                  Logout
                </div>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div
            className="md:hidden px-4 py-2 mr-2 border border-red-400/40 rounded-full cursor-pointer 
            flex items-center gap-3 bg-black/30 backdrop-blur-xl shadow-md hover:shadow-red-400/40 
            transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AiOutlineMenu className="text-[22px] text-red-300" />
            <img
              src={user?.photoURL || avatarImg}
              alt="avatar"
              className="rounded-full w-7 h-7 object-cover border border-red-400 shadow"
            />
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {isOpen && (
          <div
            className="md:hidden mt-3 p-5 rounded-2xl bg-black/40 backdrop-blur-xl shadow-xl 
            flex flex-col gap-5 border border-red-300/40 animate-fadeIn"
          >
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-red-300"
            >
              Home
            </NavLink>

            <NavLink
              to="/allProducts"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-red-300"
            >
              All Products
            </NavLink>

            {!user && (
              <>
                <NavLink
                  to="/aboutUs"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-red-300"
                >
                  About Us
                </NavLink>

                <NavLink
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-red-300"
                >
                  Contact
                </NavLink>

                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-red-300"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-full bg-red-600/80 text-white shadow 
                  hover:bg-red-700 hover:shadow-xl transition"
                >
                  Register
                </NavLink>
              </>
            )}

            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-red-300"
                >
                  Dashboard
                </NavLink>

                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={user.photoURL || avatarImg}
                    alt="avatar"
                    className="w-12 h-12 rounded-full border-2 border-red-500 shadow-md"
                  />
                  <div className="font-semibold text-white">
                    {user.displayName || "User"}
                  </div>
                </div>

                <div
                  onClick={() => {
                    logOut();
                    setIsOpen(false);
                  }}
                  className="cursor-pointer text-red-300 font-semibold hover:text-red-400 transition"
                >
                  Logout
                </div>
              </>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
