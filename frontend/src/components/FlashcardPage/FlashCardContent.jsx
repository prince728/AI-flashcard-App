import React, { useState, useEffect } from "react";
import { getAllFlashCard, deleteFlashCard } from "../../services/ApiService/flashcard.apiService";
import FlashCardModel from "./FlashCardModel";

const FlashCardPage = () => {
  const [totalFlashcards, setTotalFlashcards] = useState([]);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flashcard?")) return;

    try {
      await deleteFlashCard(id);
      setTotalFlashcards((prev) => prev.filter((card) => card._id !== id));
    } catch (error) {
      console.error("Error deleting flashcard:", error);
      alert("Failed to delete flashcard. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        My Flashcards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {totalFlashcards.length > 0 ? (
          totalFlashcards.map((card) => (
            <FlashCardModel
              key={card._id}
              card={card}
              actionHandler={handleDelete}   
              actionType="delete"            
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No flashcards found. Generate some to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default FlashCardPage;