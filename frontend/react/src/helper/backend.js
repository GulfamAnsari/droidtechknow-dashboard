import Axios from 'axios';

var OPTIONS = { 'Content-Type': 'application/json' };

export const get = (url, options = OPTIONS) => Axios.get(url, options);
export const post = (url, data, options = OPTIONS) => Axios.post(url, data, options);
