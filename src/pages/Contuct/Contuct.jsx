import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiTwitter,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import Container from "../../components/Shared/Container";

const Contact = () => {
  return (
    <section className="relative  text-white px-4 sm:px-6 lg:px-12 py-16 md:py-24 overflow-hidden">
      <Container>
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-12 pt-16">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Get in Touch with Fibrax
            </h1>
            <p className="mt-4 text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              We value clear communication, precision, and care. Reach out via
              any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: <FiMail size={22} />,
                title: "Email",
                info: "support@fibrax.dev",
              },
              {
                icon: <FiPhone size={22} />,
                title: "Phone",
                info: "+1 (555) 012-3456",
              },
              {
                icon: <FiMapPin size={22} />,
                title: "Location",
                info: "San Francisco • Remote-first",
              },
              {
                icon: <FiClock size={22} />,
                title: "Hours",
                info: "Mon–Fri • 09:00–18:00 UTC",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col items-start hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 mb-4">
                  <span className="text-purple-300">{card.icon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
                <p className="text-gray-300 text-sm">{card.info}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <FiTwitter />, label: "Twitter" },
                  { icon: <FiLinkedin />, label: "LinkedIn" },
                  { icon: <FiGithub />, label: "GitHub" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm text-sm sm:text-base hover:bg-purple-500/20 transition-colors"
                  >
                    <span className="text-purple-300">{social.icon}</span>
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Promise */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-3">Our Promise</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Clear communication, thoughtful craftsmanship, and timely
                support. Your experience is our top priority.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
