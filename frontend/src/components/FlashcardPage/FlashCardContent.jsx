import React, { useState, useEffect } from "react";
import { getAllFlashCard, deleteFlashCard } from "../../services/ApiService/flashcard.apiService";
import FlashCardModel from "./FlashCardModel";

const FlashCardPage = () => {
  const [totalFlashcards, setTotalFlashcards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const fetchFlashCards = async () => {
      try {
        const response = await getAllFlashCard();
        setTotalFlashcards(response.data.flashcards);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    fetchFlashCards();
  }, []);

  const confirmDelete = (id) => {
    setSelectedCardId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteFlashCard(selectedCardId);
      setTotalFlashcards((prev) => prev.filter((card) => card._id !== selectedCardId));
      setShowModal(false);
      setSelectedCardId(null);
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-10 px-6 text-gray-100">
      <h1 className="text-3xl font-extrabold text-center text-teal-400 mb-8 drop-shadow-lg">
        My Flashcards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {totalFlashcards.length > 0 ? (
          totalFlashcards.map((card) => (
            <FlashCardModel
              key={card._id}
              card={card}
              actionHandler={() => confirmDelete(card._id)} 
              actionType="delete"
            />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full italic">
            No flashcards found. Generate some to get started!
          </p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-sm border border-gray-700">
            <h2 className="text-xl font-bold text-teal-400 mb-4">Confirm Delete</h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this flashcard? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashCardPage;
