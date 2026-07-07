// src/pages/AboutPage.jsx
import React from "react";

function AboutComponent() {
  return (
    <div className="min-h-screen bg-lightBeige text-gray-800">
      {/* 🎯 Hero Section */}
      <section className="text-center py-16 bg-gradient-to-red from-darkBlue to-teal">
        <h2 className="text-4xl font-extrabold text-lightBeige">
          About Our Flashcard Generator
        </h2>
        <p className="mt-4 text-lg text-brightOrange">Learn smarter, not harder.</p>
      </section>

      {/* 📘 Mission Statement */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-4 text-darkBlue">Our Mission</h3>
        <p className="text-gray-700 leading-relaxed">
          Our goal is to make studying simple and effective. By combining AI
          with a clean interface, we help learners generate, preview, and save
          flashcards tailored to their needs.
        </p>
      </section>

      {/* ⚡ Key Features */}
      <section className="bg-lightBeige py-12">
        <h3 className="text-2xl font-semibold text-center mb-8 text-darkBlue">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          <div className="p-6 bg-darkBlue text-lightBeige rounded-lg shadow hover:shadow-lg transition">
            <span className="text-3xl">🧠</span>
            <h4 className="mt-4 font-bold">AI-Powered Generation</h4>
            <p className="mt-2">Create flashcards instantly from notes or PDFs.</p>
          </div>
          <div className="p-6 bg-deepRed text-lightBeige rounded-lg shadow hover:shadow-lg transition">
            <span className="text-3xl">👀</span>
            <h4 className="mt-4 font-bold">Preview Before Saving</h4>
            <p className="mt-2">Review flashcards before committing them to your study set.</p>
          </div>
          <div className="p-6 bg-brightOrange text-lightBeige rounded-lg shadow hover:shadow-lg transition">
            <span className="text-3xl">💾</span>
            <h4 className="mt-4 font-bold">Personalized Storage</h4>
            <p className="mt-2">Save only the flashcards that matter to you.</p>
          </div>
          <div className="p-6 bg-teal text-lightBeige rounded-lg shadow hover:shadow-lg transition">
            <span className="text-3xl">📱</span>
            <h4 className="mt-4 font-bold">Beginner-Friendly Design</h4>
            <p className="mt-2">Simple, intuitive interface inspired by Quizlet/Anki.</p>
          </div>
        </div>
      </section>

      {/* 👥 Who It's For */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-4 text-darkBlue">Who It’s For</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Students → Quick study aids for exams</li>
          <li>Professionals → Learn new skills efficiently</li>
          <li>Lifelong Learners → Organize knowledge in bite-sized pieces</li>
        </ul>
      </section>

      {/* 🌍 Vision */}
      <section className="bg-darkBlue py-12 text-center text-lightBeige">
        <blockquote className="text-xl italic max-w-3xl mx-auto">
          “We believe learning should be accessible, personalized, and engaging for everyone.”
        </blockquote>
      </section>

      {/* 📞 Footer */}
      <footer className="bg-deepRed text-lightBeige py-6 text-center">
        <p>© 2026 Flashcard Generator</p>
        <nav className="mt-2 space-x-4">
          <a href="#" className="hover:text-brightOrange">Privacy Policy</a>
          <a href="#" className="hover:text-brightOrange">Terms of Service</a>
        </nav>
      </footer>
    </div>
  );
}

export default AboutComponent;
