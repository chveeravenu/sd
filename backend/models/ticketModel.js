// ticketModel.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    // New field to store the username
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'closed'],
        default: 'open',
    },
});

module.exports = mongoose.model('Ticket', ticketSchema);