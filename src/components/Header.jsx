import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <BookOpen size={32} />
          LearnHub
        </Link>
        
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/premium">Premium</Link>
          {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
        </nav>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="btn-outline">
                <User size={18} />
              </Link>
              <button onClick={handleLogout} className="btn-primary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
