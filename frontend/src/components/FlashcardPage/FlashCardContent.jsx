import React, { useState, useEffect } from "react";
import { getAllFlashCard } from "../../services/ApiService/flashcard.apiService";

const FlashCardPage = () => {
  const [totalFlashcards, setTotalFlashcards] = useState([]);


  useEffect(() => {
    const fetchFlashCards = async () => {
      const response = await getAllFlashCard();
      setTotalFlashcards(response.data.flashcards);
    };
    fetchFlashCards();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        My Flashcards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {totalFlashcards.length > 0 ? (
          totalFlashcards.map((card, index) => (
            <div
              key={card._id || index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer flex flex-col gap-2">

              <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                Subject: {card.subject || "General"}
              </span>


              <h2 className="text-lg font-semibold text-gray-800">
                <span className="text-blue-600">Q:</span> {card.question}
              </h2>

              <hr className="my-1 border-gray-100" />

              <p className="text-gray-600 text-sm">
                <span className="font-medium text-gray-700">A:</span> {card.answer}
              </p>
            </div>
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
