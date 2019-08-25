import Axios from 'axios';

const AxiosInstance = Axios.create({
  headers: { 'Content-Type': 'application/json' }
});

if (window.location.hostname === 'localhost') {
  AxiosInstance.defaults.baseURL = 'http://localhost:5000';
} else {
  AxiosInstance.defaults.baseURL = 'http://droidtechknow-dashboard.herokuapp.com';
}

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const get = (url, options = null) => AxiosInstance.get(url, options);
export const post = (url, data, options = null) => AxiosInstance.post(url, data, options);
