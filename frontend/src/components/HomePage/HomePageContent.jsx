import React, { useState, useContext } from "react";
import heroImage from "../../assets/homepage-hero.png";
import { generateFlashCard, saveFlashCard } from "../../services/ApiService/flashcard.apiService";
import AllGeneratedFlashCard from "../FlashcardPage/AllGeneratedFlashCard";
import { AuthContext } from "../../context/AuthContext";

function HomePageContent() {
  const { loading, setLoading } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [generatedFlashcards, setGeneratedFlashcards] = useState([]);

  const handleTextManual = () => setIsOpen(true);
  const handleClosePopup = () => {
    setIsOpen(false);
    setTextInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    try {
      setLoading(true);
      const response = await generateFlashCard(textInput);
      setGeneratedFlashcards(response.data.flashcards || []);
      handleClosePopup();
    } catch (error) {
      console.error("Error generating flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      for (const card of generatedFlashcards) {
        await saveFlashCard(card.question, card.answer, card.subject);
      }
      setGeneratedFlashcards((prev) =>
        prev.map((card) => ({ ...card, saved: true }))
      );
    } catch (error) {
      console.error("Error saving all flashcards:", error);
    }
  };

  const handleDeleteAll = () => {
    setGeneratedFlashcards([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 relative">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-20 bg-gradient-to-r from-darkBlue to-teal rounded-b-3xl shadow-inner">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-5xl font-extrabold text-lightBeige leading-tight drop-shadow-lg">
            Generate, Study & Save Your Flashcards
          </h2>
          <p className="text-lg text-gray-300">
            Turn your notes into smart flashcards in seconds! Upload your study material or type text manually to get started.
          </p>
          <div className="space-x-4">
            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition shadow-md">
              Upload Notes / PDF
            </button>
            <button
              onClick={handleTextManual}
              className="border border-teal-500 text-teal-400 px-6 py-3 rounded-lg hover:bg-teal-600 hover:text-white transition shadow-md"
            >
              Type Text Manually
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <img
            src={heroImage}
            alt="Professional homepage illustration"
            className="rounded-xl shadow-2xl w-full max-w-md border border-gray-700"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-900">
        <h3 className="text-3xl font-semibold text-center mb-10 text-teal-400">
          Why Choose Us?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-xl hover:scale-105 transform transition">
            <span className="text-3xl">⚡</span>
            <h4 className="mt-4 font-bold text-lightBeige">Instant AI Generation</h4>
            <p className="text-gray-300 mt-2">Create flashcards instantly from your notes or PDFs.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-xl hover:scale-105 transform transition">
            <span className="text-3xl">👀</span>
            <h4 className="mt-4 font-bold text-lightBeige">Preview Before Saving</h4>
            <p className="text-gray-300 mt-2">Review generated flashcards before adding them to your study set.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-xl hover:scale-105 transform transition">
            <span className="text-3xl">💾</span>
            <h4 className="mt-4 font-bold text-lightBeige">Personalized Storage</h4>
            <p className="text-gray-300 mt-2">Save only the flashcards that matter to you.</p>
          </div>
        </div>
      </section>

      {/* Manual Input Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-lg border border-gray-700">
            <h3 className="text-xl font-bold text-teal-400 mb-4">
              Enter Your Study Material
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste or type your study notes here..."
                rows="6"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none text-gray-100 shadow-inner"
                disabled={loading}
              />

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="px-4 py-2 border border-gray-600 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition disabled:bg-teal-400 shadow-md"
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Flashcards"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generated Flashcards */}
      {generatedFlashcards.length > 0 && (
        <section className="py-10 px-6">
          <h3 className="text-2xl font-semibold text-center mb-6 text-teal-400">
            Generated Flashcards
          </h3>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={handleSaveAll}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
            >
              Save All
            </button>
            <button
              onClick={handleDeleteAll}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
            >
              Delete All
            </button>
          </div>

          <AllGeneratedFlashCard
            totalFlashcards={generatedFlashcards}
            setTotalFlashcards={setGeneratedFlashcards}
          />
        </section>
      )}
    </div>
  );
}

export default HomePageContent;
