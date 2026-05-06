const express = require('express');
const flashCardController =  require('../controllers/flashcard.controller')

const flashCardRouter = express.Router();

flashCardRouter.post('/generate',flashCardController.generateFlashCard )
flashCardRouter.post('/', flashCardController.saveFlashCard)
flashCardRouter.get('/',flashCardController.getAllFlashCard )
flashCardRouter.delete('/:id', flashCardController.deleteFlashCard )


module.exports = flashCardRouter;