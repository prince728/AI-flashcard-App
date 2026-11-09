# 🧠 AI Flashcard Generator

An AI-powered flashcard platform that turns a topic or your notes into study-ready flashcards using Google Gemini. Generate cards, preview them, and save only the ones you want to your personal study set.

🔗 **Live Demo:** [ai-flashcard-app-amber.vercel.app](https://ai-flashcard-app-amber.vercel.app)
🔗 **GitHub:** [github.com/prince728/AI-flashcard-App](https://github.com/prince728/AI-flashcard-App)

> ⏳ The backend runs on a free tier, so the first request may take up to a minute while the server wakes up.

---

## 📸 Screenshots

<!-- TIP: Add a 10-15 second GIF of the generate -> preview -> save flow here. It is the highest-impact addition. -->
<!-- ![Demo](screenshots/demo.gif) -->

### Landing Page
![Landing](screenshots/landing.png)

### Login
![Login](screenshots/login.png)

### My Flashcards
![My Flashcards](screenshots/my-flashcards.png)

### Profile Dashboard
![Profile](screenshots/profile.png)

### About
![About](screenshots/about.png)

---

## ✨ Features

- 🤖 **AI generation** of flashcards from a topic or pasted notes using the Google Gemini API
- 👀 **Preview before saving**: review generated cards and keep only the ones you want
- 📚 **My Flashcards**: view your saved cards, grouped by subject, and delete the ones you no longer need
- 👤 **Profile dashboard** showing your account details and total flashcard count
- 🔐 **Secure authentication** with JWT and bcrypt password hashing
- 🛡️ **Protected routes** using auth middleware
- 🐳 **Dockerized** frontend and backend with Docker Compose
- ☁️ **MongoDB Atlas** storage with Mongoose schemas

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS 4, React Router 7 |
| HTTP Client | Axios |
| Backend | Node.js, Express.js 5 |
| Database | MongoDB Atlas, Mongoose |
| AI | Google Gemini API |
| Auth | JWT, bcryptjs |
| DevOps | Docker, Docker Compose |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

---

## 🏗️ Architecture

```
React (Vercel)  ──Axios──▶  Express API (Render)  ──Mongoose──▶  MongoDB Atlas
                                   │
                                   └──▶  Google Gemini API
```

1. The user signs up or logs in and receives a JWT.
2. The user enters a topic or notes; the backend sends a structured prompt to Gemini.
3. Gemini returns flashcards, which the frontend shows as a preview.
4. The user saves the cards they want, and they are stored in MongoDB under their account.

---

## 📁 Project Structure

```
AI-flashcard-App/
│
├── Backend/
│   ├── Dockerfile
│   ├── src/
│   │   ├── Controller/      # Auth and flashcard controllers
│   │   ├── Routes/          # API route definitions
│   │   ├── Models/          # Mongoose schemas
│   │   └── Middlewares/     # JWT auth middleware
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   │   ├── pages/           # Home, My Flashcards, About, Profile, Login, Signup
│   │   ├── components/      # Reusable UI components
│   │   └── services/        # API call functions
│   ├── public/
│   └── package.json
│
├── screenshots/             # README images
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Docker Desktop (optional, for the Docker setup)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (or a local MongoDB instance)
- A [Google Gemini API key](https://aistudio.google.com/)

### 1. Clone the repository

```bash
git clone https://github.com/prince728/AI-flashcard-App
cd AI-flashcard-App
```

### 2. Configure environment variables

Create `Backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

> 🔒 Never commit your `.env` file. Make sure it is listed in `.gitignore`.

### 3a. Run with Docker

```bash
docker compose up --build
```

Stop the containers:

```bash
docker compose down
```

### 3b. Run locally without Docker

**Backend:**

```bash
cd Backend
npm install
npm start
```

**Frontend** (in a second terminal):

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 🔌 API Endpoints

### Auth Routes

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Log in and receive a JWT | No |

### Flashcard Routes

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/flashcard/generate` | Generate flashcards with AI | Yes |
| GET | `/api/flashcard/get-all` | Get all of the user's flashcards | Yes |
| DELETE | `/api/flashcard/delete/:id` | Delete a flashcard | Yes |

<!-- Add any other endpoints you have built (save flashcards, profile, update profile, delete account) so this table matches your app. -->

Protected routes expect an `Authorization: Bearer <token>` header.

---

<!-- UNCOMMENT THIS SECTION AFTER you add the unique index and the aggregation pipeline.

## 🗄️ Database Design

- `users`: name, email (unique), hashed password, createdAt
- `flashcards`: userId, subject, question, answer, createdAt
- Compound unique index on `{ userId, question }` prevents duplicate cards
- Dashboard stats are computed with an aggregation pipeline (`$match` + `$group`) instead of loading every document

---
-->

## 🌐 Deployment

| Service | Provider | Purpose |
|---------|----------|---------|
| Frontend | Vercel | React app hosting |
| Backend | Render | Node.js API |
| Database | MongoDB Atlas | Cloud database |

---

## 💡 What I Learned

- Integrating the Google Gemini API with structured prompts to get usable flashcard output
- Building JWT authentication with bcrypt password hashing and protected routes
- Designing a RESTful API with Express middleware
- Dockerizing a frontend and backend with Docker Compose
- Deploying a full-stack MERN app across Vercel, Render, and MongoDB Atlas

---

## 🔮 Future Improvements

- [ ] Flip-card study mode
- [ ] Prevent duplicate flashcards with a unique index
- [ ] Aggregation-based dashboard stats and progress tracking
- [ ] Spaced repetition algorithm for smarter studying
- [ ] AI quiz mode with scoring
- [ ] Flashcard sharing between users
- [ ] PDF upload and PDF export of decks
- [ ] Automated tests and CI with GitHub Actions

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Prince Gupta**
[GitHub](https://github.com/prince728) • [LinkedIn](https://linkedin.com/in/prince-gupta2) • [LeetCode](https://leetcode.com/u/pCvTFwpDjV)

---

⭐ If you found this project useful, please give it a star!
