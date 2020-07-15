import axios from 'axios';
import history from '../router/history';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        'x-auth': localStorage.getItem('token'),
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      localStorage.removeItem('token');

      history.push('/');
    }
    return Promise.reject(error);
  }
);

export default instance;
