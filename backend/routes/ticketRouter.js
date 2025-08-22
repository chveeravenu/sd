// ticketRouter.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/auth'); // Make sure this path is correct

router.post('/', authMiddleware, ticketController.createTicket);

module.exports = router;