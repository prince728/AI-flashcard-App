# 🧠 AI Flashcard Generator

An AI-powered flashcard generation platform that helps users create, organize, and study flashcards effortlessly. The application leverages Google's Gemini AI to generate high-quality flashcards from user prompts and provides a modern, responsive interface for an enhanced learning experience.

---

## ✨ Features

- 🤖 AI-powered flashcard generation using Google Gemini
- 🔐 Secure JWT Authentication
- 👤 User Registration & Login
- 📚 Create and manage flashcards
- ⚡ RESTful API
- 📱 Responsive React UI
- 🐳 Docker & Docker Compose support
- ☁️ MongoDB database integration

---

## 🛠 Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS 4
- React Router 7
- Axios

### Backend
- Node.js
- Express.js 5
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Google Gemini API

### DevOps
- Docker
- Docker Compose

---

## 📂 Project Structure

```text
AI flashcard generator/
│
├── Backend/
│   ├── Dockerfile
│   ├── src/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Running with Docker

```bash
docker compose up --build
```

Stop containers

```bash
docker compose down
```

---

## 💻 Local Development

### Backend

```bash
cd Backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the `Backend` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

## Future Improvements

- Flashcard sharing
- AI quiz mode
- Spaced repetition
- User dashboard
- Progress tracking
- PDF export

---

## License

MIT License

---

## Author

Prince Gupta
