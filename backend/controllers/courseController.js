const Course = require('../models/Course');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key-here';

// Sample courses data
const sampleCourses = [
  {
    _id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB from scratch',
    detailedDescription: 'This comprehensive web development course covers everything you need to become a full-stack developer. Starting with the basics of HTML and CSS, you\'ll progress through JavaScript, React, Node.js, and MongoDB. Build real-world projects and deploy them to the cloud.',
    instructor: 'John Smith',
    duration: '40 hours',
    price: 89,
    isPremium: true,
    category: 'programming',
    level: 'beginner',
    rating: 4.8,
    students: 15420,
    modules: [
      {
        title: 'HTML & CSS Fundamentals',
        lessons: [
          { title: 'Introduction to HTML', duration: '15 min', isPreview: true },
          { title: 'CSS Styling Basics', duration: '20 min', isPreview: false },
          { title: 'Responsive Design', duration: '25 min', isPreview: false }
        ]
      },
      {
        title: 'JavaScript Essentials',
        lessons: [
          { title: 'Variables and Functions', duration: '30 min', isPreview: true },
          { title: 'DOM Manipulation', duration: '35 min', isPreview: false },
          { title: 'Async Programming', duration: '40 min', isPreview: false }
        ]
      }
    ]
  },
  {
    _id: '2',
    title: 'Python for Beginners',
    description: 'Master Python programming from basics to advanced concepts',
    detailedDescription: 'Start your programming journey with Python, one of the most popular and versatile programming languages. This course covers Python basics, data structures, object-oriented programming, and practical applications.',
    instructor: 'Sarah Johnson',
    duration: '30 hours',
    price: 0,
    isPremium: false,
    category: 'programming',
    level: 'beginner',
    rating: 4.6,
    students: 8750,
    modules: [
      {
        title: 'Python Basics',
        lessons: [
          { title: 'Getting Started with Python', duration: '20 min', isPreview: true },
          { title: 'Variables and Data Types', duration: '25 min', isPreview: true },
          { title: 'Control Structures', duration: '30 min', isPreview: true }
        ]
      }
    ]
  },
  {
    _id: '3',
    title: 'Data Science with Python',
    description: 'Learn data analysis, visualization, and machine learning with Python',
    detailedDescription: 'Dive into the world of data science using Python. Learn pandas for data manipulation, matplotlib for visualization, and scikit-learn for machine learning. Work with real datasets and build predictive models.',
    instructor: 'Dr. Michael Chen',
    duration: '45 hours',
    price: 129,
    isPremium: true,
    category: 'data-science',
    level: 'intermediate',
    rating: 4.9,
    students: 5240,
    modules: [
      {
        title: 'Data Analysis Fundamentals',
        lessons: [
          { title: 'Introduction to Pandas', duration: '25 min', isPreview: true },
          { title: 'Data Cleaning', duration: '35 min', isPreview: false },
          { title: 'Statistical Analysis', duration: '40 min', isPreview: false }
        ]
      }
    ]
  },
  {
    _id: '4',
    title: 'UI/UX Design Principles',
    description: 'Create beautiful and user-friendly interfaces',
    detailedDescription: 'Master the art of user interface and user experience design. Learn design principles, color theory, typography, and how to create wireframes and prototypes using industry-standard tools.',
    instructor: 'Emily Rodriguez',
    duration: '25 hours',
    price: 0,
    isPremium: false,
    category: 'design',
    level: 'beginner',
    rating: 4.7,
    students: 12340,
    modules: [
      {
        title: 'Design Fundamentals',
        lessons: [
          { title: 'Principles of Good Design', duration: '18 min', isPreview: true },
          { title: 'Color Theory', duration: '22 min', isPreview: true },
          { title: 'Typography Basics', duration: '20 min', isPreview: true }
        ]
      }
    ]
  }
];

const courseController = {
  getAllCourses: async (req, res) => {
    try {
      // In a real app, this would fetch from database
      // const courses = await Course.find().sort({ createdAt: -1 });
      
      res.json({
        message: 'Courses fetched successfully',
        courses: sampleCourses
      });
    } catch (error) {
      console.error('Get courses error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getCourseById: async (req, res) => {
    try {
      const { id } = req.params;
      
      // In a real app, this would fetch from database
      // const course = await Course.findById(id);
      
      const course = sampleCourses.find(c => c._id === id);
      
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      res.json({
        message: 'Course fetched successfully',
        course
      });
    } catch (error) {
      console.error('Get course error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getCoursesByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      
      // In a real app, this would fetch from database
      // const courses = await Course.find({ category }).sort({ createdAt: -1 });
      
      const courses = sampleCourses.filter(c => c.category === category);
      
      res.json({
        message: 'Courses fetched successfully',
        courses
      });
    } catch (error) {
      console.error('Get courses by category error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  searchCourses: async (req, res) => {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({ message: 'Search query is required' });
      }

      // In a real app, this would search in database
      // const courses = await Course.find({
      //   $or: [
      //     { title: { $regex: q, $options: 'i' } },
      //     { description: { $regex: q, $options: 'i' } },
      //     { tags: { $in: [new RegExp(q, 'i')] } }
      //   ]
      // });

      const courses = sampleCourses.filter(course =>
        course.title.toLowerCase().includes(q.toLowerCase()) ||
        course.description.toLowerCase().includes(q.toLowerCase())
      );
      
      res.json({
        message: 'Search completed successfully',
        courses
      });
    } catch (error) {
      console.error('Search courses error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  enrollInCourse: async (req, res) => {
    try {
      const { id } = req.params;
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if already enrolled
      const alreadyEnrolled = user.enrolledCourses.some(
        enrollment => enrollment.courseId.toString() === id
      );

      if (alreadyEnrolled) {
        return res.status(400).json({ message: 'Already enrolled in this course' });
      }

      // Add course to user's enrolled courses
      user.enrolledCourses.push({
        courseId: id,
        enrolledAt: new Date(),
        progress: 0,
        lastAccessed: new Date()
      });

      await user.save();

      res.json({
        message: 'Successfully enrolled in course',
        enrollment: {
          courseId: id,
          enrolledAt: new Date(),
          progress: 0
        }
      });
    } catch (error) {
      console.error('Enroll in course error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = courseController;