// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://greatconnectionltd.onrender.com/api', 
  withCredentials: true, 
});

export default axiosClient;