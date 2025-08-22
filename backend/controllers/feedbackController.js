// feedbackController.js
const Feedback = require('../models/feedbackModel');

exports.createFeedback = async (req, res) => {
    try {
        const userId = req.userId; // User ID from the authMiddleware
        const { rating, description } = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const newFeedback = new Feedback({
            user: userId,
            rating,
            description,
        });

        await newFeedback.save();

        res.status(201).json({
            message: 'Feedback submitted successfully!',
            feedback: newFeedback,
        });

    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({
            message: 'Failed to submit feedback. Please try again.',
            error: error.message,
        });
    }
};