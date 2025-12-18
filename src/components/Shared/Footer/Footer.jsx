import { Link } from "react-router";
import Container from "../Container";
import { FiFacebook, FiLinkedin } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-purple-800 bg-gradient-to-br from-[#380453] via-[#320149] via-[#2a0140] to-[#000008] text-gray-300 px-6 py-12">
      <Container>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white">Fibrax</h3>
            <p className="mt-3 text-sm text-gray-400">
              Fibrex is a modern garments order and production tracking system
              designed to streamline workflows, enhance transparency, and ensure
              timely delivery from order to shipment.
            </p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-lg font-semibold text-white mb-1">
              Quick Links
            </h4>
            <Link to={"/"} className="hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link
              to={"/aboutUs"}
              className="hover:text-purple-400 transition-colors"
            >
              About Us
            </Link>
            <Link
              to={"/contact"}
              className="hover:text-purple-400 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex space-x-4 text-gray-300">
              <a
                href="https://www.facebook.com/"
                className="hover:text-purple-400 transition-colors flex items-center gap-1"
              >
                <FiFacebook size={18} /> Facebook
              </a>
              <a
                href="https://github.com/LIKHON9988"
                className="hover:text-purple-400 transition-colors flex items-center gap-1"
              >
                <FaGithub size={18} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/sudiptta-datta"
                className="hover:text-purple-400 transition-colors flex items-center gap-1"
              >
                <FiLinkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Bottom Text */}
        <div className="border-t border-purple-800 mt-10 pt-6 text-center text-sm text-gray-400">
          © 2025–2026 FibraX All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
