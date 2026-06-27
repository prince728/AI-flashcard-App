# ⚙️ AI Flashcard Generator Backend

The backend powers the AI Flashcard Generator by handling authentication, database operations, and AI-powered flashcard generation through the Google Gemini API.

---

## Features

- Express.js REST API
- JWT Authentication
- Password hashing with bcryptjs
- MongoDB integration
- Google Gemini AI
- Cookie-based authentication
- Docker support

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Google Gemini API
- dotenv

---

## Installation

```bash
npm install
```

---

## Start Server

```bash
npm start
```

---

## Docker

Build image

```bash
docker build -t ai-flashcard-backend .
```

Run container

```bash
docker run -p 5000:5000 ai-flashcard-backend
```

---

## Environment Variables

```env
PORT=5000

MONGO_URI=your_connection_string

JWT_SECRET=your_secret

GEMINI_API_KEY=your_api_key
```

---

## Main Dependencies

- Express.js
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- CORS
- dotenv
- Google Gemini SDK

---

## Security

- JWT Authentication
- Password Hashing
- Environment Variables
- Secure API Design

---

## Author

Prince Gupta
