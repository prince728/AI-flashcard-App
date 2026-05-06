const express = require('express');
const flashCardController = require('../controllers/flashcard.controller');
const { authUserMiddleware } = require('../middlewares/auth.middleware')

const flashCardRouter = express.Router();

flashCardRouter.post('/generate', authUserMiddleware, flashCardController.generateFlashCard)
flashCardRouter.post('/', authUserMiddleware, flashCardController.saveFlashCard)
flashCardRouter.get('/', authUserMiddleware, flashCardController.getAllFlashCard)
flashCardRouter.delete('/:id', authUserMiddleware, flashCardController.deleteFlashCard)


module.exports = flashCardRouter;