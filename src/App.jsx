import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Premium from './pages/Premium';
import Dashboard from './pages/Dashboard';
import { userService } from './services/userService'; // Import the userService
import './App.css';

function App() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Call the API to update login history
            userService.updateLoginHistory()
                .then(response => {
                    console.log(response.data.message);
                })
                .catch(error => {
                    console.error('Failed to update login history:', error);
                });
        }
    }, []); // The empty dependency array ensures this runs only once on component mount

    return (
        <Router>
            <div className="app">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/course/:id" element={<CourseDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/premium" element={<Premium />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;