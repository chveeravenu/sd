const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.get('/stats', userController.getUserStats);
router.get('/enrolled-courses', userController.getEnrolledCourses);

module.exports = router;