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

  updateProfile: (userData: any) => {
    return api.put('/user/profile', userData);
  }
};