/* import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cerulean-fossa-cap.cyclic.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem('token');

const setToken = newToken => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
};

if (token) {
  setToken(token);
}

export default instance; */