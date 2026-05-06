require('dotenv').config()
const express =  require('express');
const AuthRouter = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const flashCardRouter = require('./routes/flashcard.routes');

const app =  express();

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', AuthRouter);
app.use('/api/flashcard', flashCardRouter);


module.exports = app;