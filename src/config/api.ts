import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const baseURL = '/api';

const http = axios.create({
  baseURL,
});

http.interceptors.response.use(
  ({ data }: AxiosResponse) => data,
  (error) => {
    if (error.response.status / 500 === 1) {
      toast.error('Server temporarily in error.\nPlease try again later.\t:(')
    }
    return Promise.reject(error);
  }
);

export default http;
