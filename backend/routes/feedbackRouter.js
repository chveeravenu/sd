// feedbackRouter.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/auth'); // Assuming you have this middleware

router.post('/', authMiddleware, feedbackController.createFeedback);

module.exports = router;