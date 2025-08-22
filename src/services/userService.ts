import axios from 'axios';

const API_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Define the interface for the user data
interface UserData {
  name?: string;
  email?: string;
  // Add any other profile fields that can be updated
}

export const userService = {
  getUserProfile: () => {
    return api.get('/user/profile');
  },

  getUserStats: () => {
    return api.get('/user/stats');
  },

  getEnrolledCourses: () => {
    return api.get('/user/enrolled-courses');
  },

  // Add the type to the userData parameter
  updateProfile: (userData: UserData) => {
    return api.put('/user/profile', userData);
  },

  updateLoginHistory: () => {
    return api.post('/user/update-login-history');
  }
};