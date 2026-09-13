import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD

  baseURL: 'https://e-commerce-api-3wara.vercel.app',
  withCredentials: true,
=======
  baseURL: "https://e-commerce-api-3wara.vercel.app",
>>>>>>> 24247de387af8aabe98fa4152b84a17816302a07
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
<<<<<<< HEAD
    const token = 
      localStorage.getItem('luma_admin_token') || 
      localStorage.getItem('token');
=======
    const token = localStorage.getItem("token");
>>>>>>> 24247de387af8aabe98fa4152b84a17816302a07

    if (token) {
      config.headers['token'] = token;
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;