import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Clock, Users, Star, CheckCircle, Lock } from 'lucide-react';
import { courseService } from '../services/courseService';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (id) {
      loadCourse(id);
    }
  }, [id]);

  const loadCourse = async (courseId) => {
    try {
      const response = await courseService.getCourseById(courseId);
      setCourse(response.data.course);

      const token = localStorage.getItem('token');
      if (token) {
        setIsEnrolled(false); // Placeholder until API check is added
      }
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    try {
      if (course) {
        await courseService.enrollInCourse(course._id);
        setIsEnrolled(true);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>Course not found</h2>
        <Link to="/courses" className="btn-primary">Browse Courses</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* Course Header ... (same as before) */}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Main Content */}
        <div>
          {/* Video Preview */}
          <div className="video-container">
            {showVideo ? (
              <iframe
                width="100%"
                height="450"
                src={course.previewVideo}
                title="Course Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                className="video-placeholder"
                onClick={() => setShowVideo(true)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ textAlign: 'center' }}>
                  <Play size={64} />
                  <p>Course Preview</p>
                  {course.isPremium && !isEnrolled && (
                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                      Full content available with enrollment
                    </p>
                  )}
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Click to play preview video
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Course Description */}
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ marginBottom: '1rem' }}>About This Course</h2>
            <p style={{ lineHeight: 1.8, color: '#4a5568' }}>
              {course.detailedDescription || course.description}
            </p>
          </div>

          {/* Course Modules */}
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ marginBottom: '1rem' }}>Course Content</h2>
            {course.modules?.map((module, moduleIndex) => (
              <div key={moduleIndex} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: '#2d3748'
                }}>
                  {module.title}
                </h3>
                {module.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {lesson.isPreview || !course.isPremium || isEnrolled ? (
                        <Play size={16} color="#3b82f6" />
                      ) : (
                        <Lock size={16} color="#9ca3af" />
                      )}
                      <span style={{ 
                        color: lesson.isPreview || !course.isPremium || isEnrolled ? '#2d3748' : '#9ca3af'
                      }}>
                        {lesson.title}
                      </span>
                    </div>
                    <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                      {lesson.duration}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Enrollment Card */}
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: '2rem'
          }}>
            {isEnrolled ? (
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={48} color="#10b981" style={{ marginBottom: '1rem' }} />
                <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>Enrolled!</h3>
                <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
                  You have access to all course content
                </p>
                <Link to="/dashboard" className="btn-primary" style={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  textDecoration: 'none',
                  padding: '0.75rem'
                }}>
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                    {course.isPremium ? `$${course.price}` : 'Free'}
                  </div>
                  {course.isPremium && (
                    <p style={{ color: '#718096', fontSize: '0.9rem' }}>
                      One-time payment
                    </p>
                  )}
                </div>
                
                {course.isPremium && !localStorage.getItem('token') ? (
                  <div>
                    <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#4a5568' }}>
                      Sign up to access premium content
                    </p>
                    <Link to="/signup" className="btn-primary" style={{ 
                      display: 'block', 
                      textAlign: 'center', 
                      textDecoration: 'none',
                      padding: '0.75rem',
                      marginBottom: '0.5rem'
                    }}>
                      Sign Up Now
                    </Link>
                    <Link to="/login" className="btn-outline" style={{ 
                      display: 'block', 
                      textAlign: 'center', 
                      textDecoration: 'none',
                      padding: '0.75rem'
                    }}>
                      Already have an account?
                    </Link>
                  </div>
                ) : (
                  <button 
                    onClick={handleEnroll}
                    className="form-submit"
                  >
                    {course.isPremium ? 'Enroll Now' : 'Start Learning'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Instructor Info */}
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Instructor</h3>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                {course.instructor.charAt(0)}
              </div>
              <h4 style={{ marginBottom: '0.5rem' }}>{course.instructor}</h4>
              <p style={{ color: '#718096', fontSize: '0.9rem' }}>
                Expert Instructor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
