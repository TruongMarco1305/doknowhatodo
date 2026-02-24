import axios from 'axios';

import { API_URL } from '@/config/env';
import { getAccessToken } from './cookie';

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    config.headers.Authorization = token ? `Bearer ${token}` : undefined;
    return config;
  }
);

export default instance;
