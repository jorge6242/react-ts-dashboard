import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'http://localhost:8181',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default AXIOS;