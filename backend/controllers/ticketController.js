// ticketController.js
const Ticket = require('../models/ticketModel');

exports.createTicket = async (req, res) => {
    try {
        const userId = req.userId; // This comes from the authMiddleware
        const { category, subject } = req.body;
        
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const newTicket = new Ticket({
            category,
            subject,
            user: userId,
        });

        await newTicket.save();

        res.status(201).json({ 
            message: 'Ticket created successfully!', 
            ticket: newTicket 
        });

    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ 
            message: 'Failed to create ticket. Please try again.',
            error: error.message
        });
    }
};