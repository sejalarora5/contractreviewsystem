import axios from 'axios';

const api = axios.create({
  baseURL: 'https://9669-112-196-16-34.ngrok-free.app/',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

export default api;
