export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
  logout: `${API_URL}/auth/logout`,
  me: `${API_URL}/auth/me`,
  forgotPassword: `${API_URL}/auth/forgot-password`,
  resetPassword: `${API_URL}/auth/reset-password`,
  demo: `${API_URL}/leads/demo`,
  newsletter: `${API_URL}/leads/newsletter`,
  blog: `${API_URL}/blog`,
  dashboardStats: `${API_URL}/dashboard/stats`,
  dashboardEmployees: `${API_URL}/dashboard/employees`,
};

export default {
  API_URL,
  API_ENDPOINTS,
};
