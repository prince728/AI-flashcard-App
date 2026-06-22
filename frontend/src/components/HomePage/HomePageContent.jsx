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
    if (!textInput.trim()) return alert("Please enter some text!");

    try {
      setLoading(true);
      const response = await generateFlashCard(textInput);


      setGeneratedFlashcards(response.data.flashcards || []);

      handleClosePopup();
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("Failed to generate flashcards. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleSaveAll = async () => {
    try {
      for (const card of generatedFlashcards) {
        await saveFlashCard(card.question, card.answer, card.subject);
      }
      alert("All flashcards saved successfully!");
      setGeneratedFlashcards((prev) =>
        prev.map((card) => ({ ...card, saved: true }))
      );
    } catch (error) {
      console.error("Error saving all flashcards:", error);
      alert("Failed to save all flashcards.");
    }
  };


  const handleDeleteAll = () => {
    if (!window.confirm("Are you sure you want to delete all flashcards?")) return;
    setGeneratedFlashcards([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 relative">


      <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-20 bg-gradient-to-red from-blue-100 to-green-100">
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
            <button
              onClick={handleTextManual}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
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



      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Enter Your Study Material
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste or type your study notes here..."
                rows="6"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700 shadow-inner"
                disabled={loading}
              />

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="px-4 py-2 border border-gray-300 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 shadow-md"
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Flashcards"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {generatedFlashcards.length > 0 && (
        <section className="py-10 px-6">
          <h3 className="text-2xl font-semibold text-center mb-6">Generated Flashcards</h3>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={handleSaveAll}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save All
            </button>
            <button
              onClick={handleDeleteAll}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
