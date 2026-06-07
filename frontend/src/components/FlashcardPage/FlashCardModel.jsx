import React from "react";
import { FaTrash, FaSave } from "react-icons/fa";

const FlashCardModel = ({ card, actionHandler, actionType }) => {
  const isDelete = actionType === "delete";
  const Icon = isDelete ? FaTrash : FaSave;
  const buttonColor = isDelete ? "text-red-500 hover:text-red-700" : "text-green-500 hover:text-green-700";
  const title = isDelete ? "Delete Flashcard" : "Save Flashcard";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col gap-2 relative">
      {/* Action Button */}
      <button
        onClick={() => actionHandler(card._id)}
        className={`absolute top-3 right-3 ${buttonColor}`}
        title={title}
      >
        <Icon />
      </button>

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
  );
};

export default FlashCardModel;
