require('dotenv').config()
const express = require('express');
const cors = require('cors');
const AuthRouter = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const flashCardRouter = require('./routes/flashcard.routes');

const app = express();


app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use('/api/auth', AuthRouter);
app.use('/api/flashcard', flashCardRouter);


module.exports = app;