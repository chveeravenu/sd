const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  enrolledCourses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0
    },
    lastAccessed: {
      type: Date,
      default: Date.now
    }
  }],
  completedCourses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  subscriptionPlan: {
    type: String,
    enum: ['basic', 'premium', 'pro'],
    default: 'basic'
  },
  subscriptionExpiry: {
    type: Date
  },
  totalLearningTime: {
    type: Number,
    default: 0 // in minutes
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);