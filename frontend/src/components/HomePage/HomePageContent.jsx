import React from "react";
import heroImage from "../../assets/homepage-hero.png"; // replace with your generated image path

function HomePageContent() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

  
      <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-20 bg-gradient-to-r from-blue-100 to-green-100">
        
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Generate, Study & Save Your Flashcards
          </h2>
          <p className="text-lg text-gray-700">
            Turn your notes into smart flashcards in seconds! Upload your study material or type text manually to get started.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Upload Notes / PDF
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              Type Text Manually
            </button>
          </div>
        </div>

        
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <img
            src={heroImage}
            alt="Professional homepage illustration"
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        </div>
      </section>

     
      <section className="py-16 bg-white">
        <h3 className="text-3xl font-semibold text-center mb-10">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition">
            <span className="text-3xl">⚡</span>
            <h4 className="mt-4 font-bold">Instant AI Generation</h4>
            <p className="text-gray-600 mt-2">Create flashcards instantly from your notes or PDFs.</p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-lg transition">
            <span className="text-3xl">👀</span>
            <h4 className="mt-4 font-bold">Preview Before Saving</h4>
            <p className="text-gray-600 mt-2">Review generated flashcards before adding them to your study set.</p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-lg shadow hover:shadow-lg transition">
            <span className="text-3xl">💾</span>
            <h4 className="mt-4 font-bold">Personalized Storage</h4>
            <p className="text-gray-600 mt-2">Save only the flashcards that matter to you.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePageContent;
