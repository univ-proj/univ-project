import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:3006/api',
});

instance.interceptors.response.use(
  (res) => {
    // console.log(res);
    return res.data;
  },
  (error) => {
    throw error;
  }
);

// TODO: add authentication

export default instance;
