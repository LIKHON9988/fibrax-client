import React from "react";

const AboutUs = () => {
  return (
    <section className="relative pt-32 px-6 py-16 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Fibrax
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              We are pleased to inform you that you have successfully passed the
              first round of the selection process. Your application and skills
              have impressed us, and we are excited to move forward with you in
              the next stages.
            </p>
            <p className="mt-2 text-gray-300">
              This project is designed to assess your skills, creativity, and
              problem-solving abilities. It helps us understand how you approach
              challenges and your ability to deliver high-quality solutions.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <h3 className="text-xl font-semibold">Mission</h3>
            <p className="mt-2 text-gray-300">
              Empower creators to build elegant, robust experiences with clarity
              and speed.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <h3 className="text-xl font-semibold">Values</h3>
            <p className="mt-2 text-gray-300">
              Craft, integrity, and curiosity. We iterate, learn fast, and ship
              thoughtfully.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <h3 className="text-xl font-semibold">Approach</h3>
            <p className="mt-2 text-gray-300">
              Outcome-driven design with a focus on performance, accessibility,
              and delightful details.
            </p>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <h3 className="text-xl font-semibold">Why Fibrax</h3>
            <p className="mt-2 text-gray-300">
              Fibrax blends engineering precision with modern aesthetics. From
              onboarding to delivery, our systems keep teams aligned and
              productive.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <h3 className="text-xl font-semibold">What You Can Expect</h3>
            <ul className="mt-2 space-y-2 text-gray-300">
              <li>Clear briefs and practical challenges</li>
              <li>Feedback loops that accelerate learning</li>
              <li>Real-world constraints and measurable impact</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
