import React from 'react'
import { Link } from "react-router";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">Flashcard Generator</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="/flashcards" className="hover:text-blue-600">My Flashcards</a>
          <a href="/about" className="hover:text-blue-600">About</a>
          <a href="/profile" className="hover:text-blue-600">Profile</a>
        </nav>
      </nav>
    );
}