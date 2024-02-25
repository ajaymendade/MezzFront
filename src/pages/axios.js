import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Replace with your backend URL
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token'); // Assuming you store your token in local storage
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axiosInstance;