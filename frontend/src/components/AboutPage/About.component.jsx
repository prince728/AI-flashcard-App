// src/pages/AboutPage.jsx
import React from "react";

function AboutComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      {/* 🎯 Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-darkBlue to-teal shadow-inner rounded-b-3xl">
        <h2 className="text-4xl font-extrabold text-lightBeige drop-shadow-lg">
          About Our Flashcard Generator
        </h2>
        <p className="mt-4 text-lg text-brightOrange font-medium tracking-wide">
          Learn smarter, not harder.
        </p>
      </section>

      {/* 📘 Mission Statement */}
      <section className="max-w-4xl mx-auto px-6 py-12 bg-gray-800/70 backdrop-blur rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-teal-400">Our Mission</h3>
        <p className="text-gray-300 leading-relaxed">
          Our goal is to make studying simple and effective. By combining AI
          with a clean interface, we help learners generate, preview, and save
          flashcards tailored to their needs.
        </p>
      </section>

      {/* ⚡ Key Features */}
      <section className="py-12">
        <h3 className="text-2xl font-semibold text-center mb-8 text-teal-400">
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {[
            {
              icon: "🧠",
              title: "AI-Powered Generation",
              desc: "Create flashcards instantly from notes or PDFs.",
              bg: "bg-darkBlue",
            },
            {
              icon: "👀",
              title: "Preview Before Saving",
              desc: "Review flashcards before committing them to your study set.",
              bg: "bg-deepRed",
            },
            {
              icon: "💾",
              title: "Personalized Storage",
              desc: "Save only the flashcards that matter to you.",
              bg: "bg-brightOrange",
            },
            {
              icon: "📱",
              title: "Beginner-Friendly Design",
              desc: "Simple, intuitive interface inspired by Quizlet/Anki.",
              bg: "bg-teal",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`${feature.bg} text-lightBeige p-6 rounded-lg shadow hover:shadow-xl hover:scale-105 transform transition duration-300`}
            >
              <span className="text-3xl">{feature.icon}</span>
              <h4 className="mt-4 font-bold">{feature.title}</h4>
              <p className="mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 👥 Who It's For */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-4 text-teal-400">Who It’s For</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Students → Quick study aids for exams</li>
          <li>Professionals → Learn new skills efficiently</li>
          <li>Lifelong Learners → Organize knowledge in bite-sized pieces</li>
        </ul>
      </section>

      {/* 🌍 Vision */}
      <section className="bg-darkBlue py-12 text-center text-lightBeige">
        <blockquote className="text-xl italic max-w-3xl mx-auto tracking-wide drop-shadow-lg">
          “We believe learning should be accessible, personalized, and engaging for everyone.”
        </blockquote>
      </section>

      {/* 📞 Footer */}
      <footer className="bg-gray-800 text-lightBeige py-6">
        <div className="flex flex-col items-center space-y-2">
          <p>© 2026 Flashcard Generator</p>
          <nav className="flex space-x-6">
            <a href="#" className="hover:text-brightOrange transition">Privacy Policy</a>
            <a href="#" className="hover:text-brightOrange transition">Terms of Service</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default AboutComponent;
