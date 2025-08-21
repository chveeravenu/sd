// ticketController.js
const Ticket = require('../models/ticketModel');

// Controller function to create a new ticket
exports.createTicket = async (req, res) => {
    try {
        const { category, subject } = req.body;
        
        // Create a new ticket instance using the data from the request body
        const newTicket = new Ticket({
            category,
            subject,
        });

        // Save the new ticket to the database
        await newTicket.save();

        // Send a success response back to the client
        res.status(201).json({ 
            message: 'Ticket created successfully!', 
            ticket: newTicket 
        });

    } catch (error) {
        console.error('Error creating ticket:', error);
        // Send an error response
        res.status(500).json({ 
            message: 'Failed to create ticket. Please try again.',
            error: error.message
        });
    }
};
