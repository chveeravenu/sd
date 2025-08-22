const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Assuming you have an authentication middleware to protect routes
const authMiddleware = require('../middleware/auth'); 

router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateUserProfile);
router.get('/stats', authMiddleware, userController.getUserStats);
router.get('/enrolled-courses', authMiddleware, userController.getEnrolledCourses);

// New route for updating login history on session start
router.post('/update-login-history', authMiddleware, userController.updateLoginHistory);

module.exports = router;