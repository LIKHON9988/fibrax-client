import React from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";

const Contuct = () => {
  return (
    <section className="relative px-6 py-20 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute -top-6 -right-10 w-64 h-64 rounded-full bg-gradient-to-tr from-fuchsia-500/30 to-purple-500/30 blur-3xl" />
          <div className="absolute -bottom-8 -left-10 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-500/25 to-cyan-500/25 blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl p-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact Fibrax</h1>
                <p className="mt-4 text-lg text-gray-200">Precision, clarity, and care. Choose the channel that suits you best.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-4">
                  <div className="flex items-center gap-3">
                    <FiMail className="text-purple-300" size={22} />
                    <span className="text-sm text-gray-300">support@fibrax.dev</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-4">
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-purple-300" size={22} />
                    <span className="text-sm text-gray-300">+1 (555) 012-3456</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-4">
                  <div className="flex items-center gap-3">
                    <FiMapPin className="text-purple-300" size={22} />
                    <span className="text-sm text-gray-300">San Francisco • Remote-first</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-4">
                  <div className="flex items-center gap-3">
                    <FiClock className="text-purple-300" size={22} />
                    <span className="text-sm text-gray-300">Mon–Fri • 09:00–18:00 UTC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl p-6">
            <h3 className="text-xl font-semibold">General Inquiries</h3>
            <p className="mt-2 text-gray-300">support@fibrax.dev</p>
            <p className="text-gray-300">+1 (555) 012-3456</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl p-6">
            <h3 className="text-xl font-semibold">Partnerships</h3>
            <p className="mt-2 text-gray-300">partnerships@fibrax.dev</p>
            <p className="text-gray-300">We collaborate with teams that value craft and velocity.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl p-6">
            <h3 className="text-xl font-semibold">Press</h3>
            <p className="mt-2 text-gray-300">press@fibrax.dev</p>
            <p className="text-gray-300">Media requests and statements.</p>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl p-6">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-2">
                <FiTwitter className="text-purple-300" />
                <span className="text-sm text-gray-300">Twitter</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-2">
                <FiLinkedin className="text-purple-300" />
                <span className="text-sm text-gray-300">LinkedIn</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-2">
                <FiGithub className="text-purple-300" />
                <span className="text-sm text-gray-300">GitHub</span>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl p-6">
            <h3 className="text-xl font-semibold">Our Promise</h3>
            <p className="mt-3 text-gray-300">Clear communication, thoughtful craftsmanship, and timely support. Your experience is our priority.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contuct;
