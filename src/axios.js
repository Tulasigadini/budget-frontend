import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://budget-track-19hu.onrender.com/',
});

export default instance;