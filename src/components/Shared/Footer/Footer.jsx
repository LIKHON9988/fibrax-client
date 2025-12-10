import Container from "../Container";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#7a1cac] via-[#53027a] via-[#2a0140] to-[#000008] text-gray-300 px-6 py-12">
      <Container>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white">PlantNet Inc.</h3>
            <p className="mt-3 text-sm text-gray-400">
              Building intelligent, sustainable solutions for a greener future.
            </p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-lg font-semibold text-white mb-1">
              Quick Links
            </h4>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Services
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-400 transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Bottom Text */}
        <div className="border-t border-purple-800 mt-10 pt-6 text-center text-sm text-gray-400">
          © 2025–2026 PlantNet Inc. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
