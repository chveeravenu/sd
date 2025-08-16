const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key-here';

const userController = {
  getUserProfile: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user });
    } catch (error) {
      console.error('Get user profile error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const { name, email } = req.body;

      const user = await User.findByIdAndUpdate(
        decoded.userId,
        { name, email },
        { new: true }
      ).select('-password');

      res.json({
        message: 'Profile updated successfully',
        user
      });
    } catch (error) {
      console.error('Update user profile error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getUserStats: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const stats = {
        enrolledCourses: user.enrolledCourses.length,
        completedCourses: user.completedCourses.length,
        totalLearningTime: `${Math.floor(user.totalLearningTime / 60)}h ${user.totalLearningTime % 60}m`,
        certificates: user.completedCourses.length
      };

      res.json({ stats });
    } catch (error) {
      console.error('Get user stats error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getEnrolledCourses: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId).populate('enrolledCourses.courseId');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Mock enrolled courses data for demonstration
      const enrolledCourses = user.enrolledCourses.map((enrollment, index) => ({
        _id: `enrolled_${index}`,
        title: `Course ${index + 1}`,
        progress: Math.floor(Math.random() * 100),
        lastAccessed: new Date(),
        instructor: 'Sample Instructor'
      }));

      res.json({ courses: enrolledCourses });
    } catch (error) {
      console.error('Get enrolled courses error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = userController;