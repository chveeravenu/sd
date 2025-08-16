import React from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Award, Users, Star, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Master New Skills with Expert-Led Courses</h1>
          <p>
            Join thousands of learners worldwide. Access premium content, 
            interactive lessons, and earn certificates from industry experts.
          </p>
          <div className="cta-buttons">
            <Link to="/courses" className="btn-large btn-white">
              Explore Courses
            </Link>
            <Link to="/premium" className="btn-large btn-outline">
              Go Premium
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose LearnHub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Play />
            </div>
            <h3>Video Learning</h3>
            <p>
              High-quality video content from industry experts. 
              Learn at your own pace with interactive exercises and projects.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Award />
            </div>
            <h3>Certificates</h3>
            <p>
              Earn industry-recognized certificates upon course completion. 
              Showcase your skills to employers and advance your career.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Users />
            </div>
            <h3>Community</h3>
            <p>
              Connect with fellow learners, participate in discussions, 
              and get help from our supportive community.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <BookOpen />
            </div>
            <h3>Comprehensive Content</h3>
            <p>
              From beginner to advanced levels. Our courses cover 
              everything you need to master your chosen field.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp />
            </div>
            <h3>Career Growth</h3>
            <p>
              Advance your career with skills that are in demand. 
              Get job-ready with practical, hands-on learning.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Star />
            </div>
            <h3>Premium Experience</h3>
            <p>
              Unlock exclusive content, 1-on-1 mentoring, 
              and priority support with our premium plans.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ background: '#f8fafc', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#2d3748' }}>
            Join Our Growing Community
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem' 
          }}>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3b82f6' }}>
                50K+
              </div>
              <div style={{ color: '#718096', fontSize: '1.1rem' }}>
                Active Learners
              </div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3b82f6' }}>
                500+
              </div>
              <div style={{ color: '#718096', fontSize: '1.1rem' }}>
                Expert Courses
              </div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3b82f6' }}>
                95%
              </div>
              <div style={{ color: '#718096', fontSize: '1.1rem' }}>
                Success Rate
              </div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3b82f6' }}>
                24/7
              </div>
              <div style={{ color: '#718096', fontSize: '1.1rem' }}>
                Support Available
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
