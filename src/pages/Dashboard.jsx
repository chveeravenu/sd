import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Award, TrendingUp, Play, Calendar } from 'lucide-react';
import { userService } from '../services/userService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    totalLearningTime: '0h',
    certificates: 0
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [user, setUser] = useState({ name: 'Student' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [userResponse, statsResponse, coursesResponse] = await Promise.all([
        userService.getUserProfile(),
        userService.getUserStats(),
        userService.getEnrolledCourses()
      ]);

      setUser(userResponse.data.user);
      setStats(statsResponse.data.stats);
      setEnrolledCourses(coursesResponse.data.courses);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p style={{ color: '#718096' }}>Continue your learning journey</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <BookOpen size={32} color="#3b82f6" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-number">{stats.enrolledCourses}</div>
          <div className="stat-label">Enrolled Courses</div>
        </div>
        
        <div className="stat-card">
          <Award size={32} color="#10b981" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-number">{stats.completedCourses}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card">
          <Clock size={32} color="#f59e0b" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-number">{stats.totalLearningTime}</div>
          <div className="stat-label">Learning Time</div>
        </div>
        
        <div className="stat-card">
          <TrendingUp size={32} color="#8b5cf6" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-number">{stats.certificates}</div>
          <div className="stat-label">Certificates</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '12px', 
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar />
          Continue Learning
        </h2>
        
        {enrolledCourses.length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {enrolledCourses.map((course) => (
              <div key={course._id} style={{ 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px', 
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem', color: '#2d3748' }}>{course.title}</h3>
                  <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Instructor: {course.instructor}
                  </p>
                  
                  <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginBottom: '0.25rem' 
                    }}>
                      <span style={{ fontSize: '0.9rem', color: '#4a5568' }}>Progress</span>
                      <span style={{ fontSize: '0.9rem', color: '#4a5568' }}>{course.progress}%</span>
                    </div>
                    <div style={{ 
                      background: '#e2e8f0', 
                      height: '8px', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        background: '#3b82f6', 
                        height: '100%', 
                        width: `${course.progress}%`,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                  
                  <p style={{ color: '#718096', fontSize: '0.8rem' }}>
                    Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                  </p>
                </div>
                
                <button 
                  className="btn-primary"
                  style={{ 
                    marginLeft: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Play size={16} />
                  Continue
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <BookOpen size={48} color="#9ca3af" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: '#4a5568', marginBottom: '0.5rem' }}>No courses yet</h3>
            <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
              Start your learning journey by enrolling in a course
            </p>
            <a href="/courses" className="btn-primary" style={{ textDecoration: 'none' }}>
              Browse Courses
            </a>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem' 
      }}>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <BookOpen size={32} color="#3b82f6" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>Browse Courses</h3>
          <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Discover new skills
          </p>
          <a href="/courses" className="btn-outline" style={{ textDecoration: 'none' }}>
            Explore
          </a>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <Award size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>Certificates</h3>
          <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1rem' }}>
            View achievements
          </p>
          <button className="btn-outline">
            View All
          </button>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <TrendingUp size={32} color="#f59e0b" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>Upgrade</h3>
          <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Get premium access
          </p>
          <a href="/premium" className="btn-primary" style={{ textDecoration: 'none' }}>
            Go Premium
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
