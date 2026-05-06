const mongoose = require('mongoose');

const flashCardSchema = mongoose.connect({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    subject: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamp: true
})