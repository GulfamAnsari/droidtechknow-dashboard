import Axios from 'axios';
import * as HELPER from './helper-functions';

const excludeUrlForAuthenticate = ['/login', '/signup', 'http://ip-api.com/json'];

const AxiosInstance = Axios.create({
  headers: { 'Content-Type': 'application/json' }
});

if (window.location.hostname === 'localhost') {
  AxiosInstance.defaults.baseURL = 'http://localhost:5000';
} else {
  AxiosInstance.defaults.baseURL = 'http://droidtechknow-dashboard.herokuapp.com';
}

// Request interceptor
AxiosInstance.interceptors.request.use((config) => {
  if (!excludeUrlForAuthenticate.includes(config.url)) {
    AxiosInstance.defaults.headers.common['token'] = HELPER.getCookie('token');
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const get = (url, options = null) => AxiosInstance.get(url, options);
export const post = (url, data, options = null) => AxiosInstance.post(url, data, options);
