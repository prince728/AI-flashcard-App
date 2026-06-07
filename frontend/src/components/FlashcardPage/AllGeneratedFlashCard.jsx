import React from 'react'
import FlashCardModel from "./FlashCardModel";
import { saveFlashCard } from '../../services/ApiService/flashcard.apiService';

const AllGeneratedFlashCard = ({ totalFlashcards, setTotalFlashcards }) => {

    const handleSave = async (id) => {
        try {

            const cardToSave = totalFlashcards.find((card) => card._id === id);
            if (!cardToSave) return alert("Flashcard not found!");

            // Call API
            const response = await saveFlashCard(
                cardToSave.question,
                cardToSave.answer,
                cardToSave.subject
            );

            console.log("Flashcard saved:", response.data);

            setTotalFlashcards((prev) =>
                prev.map((card) =>
                    card._id === id ? { ...card, saved: true } : card
                )
            );
        } catch (error) {
            console.error("Error saving flashcard:", error);
            alert("Failed to save flashcard. Please try again.");
        }
    };

    return (
        <div>
            {totalFlashcards.map((card, index) => (
                <FlashCardModel key={card._id || index} card={card} actionHandler={handleSave} actionType="save" />
            ))
            }
        </div>
    )
}

export default AllGeneratedFlashCard
