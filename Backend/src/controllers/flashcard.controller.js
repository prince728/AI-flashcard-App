const flashCardModel = require('../models/flashcard.model');
const express = require('express');
const AiService = require('../services/AIflashCard.service')

const generateFlashCard = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "No text provided" });
        }

        const flashCards = await AiService(text);
        return res.status(200).json(flashCards);

    } catch (error) {
        console.log("Error generating flashcards:", error);
        return res.status(500).json({ message: "Failed to generate flashcards" });
    }

}


const deleteFlashCard = async (req, res) => {

    try {
        const flashcardId = req.params.id;

        const flashcard = await flashCardModel.findOneAndDelete({
            _id: flashcardId,
            userId: req.user
        });

        if (!flashcard) {
            return res.status(404).json({
                message: "flashcard not found"
            })
        }

        return res.status(200).json({
            message: "flashcard deleted successfully",
            id: flashcardId
        })
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


const saveFlashCard = async (req, res) => {
    try {
        const { question, answer, subject } = req.body;

        if (!question || !answer) {
            return res.status(400).json({
                message: "Please provide require field"
            })
        }

        const flashcard = await flashCardModel.create({
            question,
            answer,
            subject,
            userId: req.user
        });

        return res.status(201).json({
            message: "flashcard save successfully",
            flashcard: {
                question: flashcard.question,
                answer: flashcard.answer,
                subject: flashcard.subject
            }
        })

    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}


const getAllFlashCard = async (req, res) => {
    try {
        const userId = req.user;

        const flashcards = await flashCardModel.find({ userId: userId });

        return res.status(200).json({
            message: "Flashcards retrieved successfully",
            flashcards: flashcards
        })
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    saveFlashCard,
    getAllFlashCard,
    deleteFlashCard,
    generateFlashCard
};