import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: 'http://172.20.10.3:5000/api/v1',
  timeout: 10000,
  headers: {
    'Content-type': 'application/json',
  },
});

API.interceptors.request.use(
  async (config) => {
    console.log('🔧 [CLIENT] Interceptor fired, building request...');
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🌐 [REQUEST] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('📦 [REQUEST BODY]', config.data ? JSON.parse(config.data) : 'none');
    console.log('🔑 [AUTH HEADER]', token ? 'Bearer token attached' : 'No token');
    return config;
  },
  (error) => {
    console.error('❌ [REQUEST ERROR]', error.message);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    console.log(`✅ [RESPONSE] ${response.status} ${response.config.url}`);
    console.log('📬 [RESPONSE DATA]', response.data);
    return response;
  },
  (error) => {
    console.error(`🔴 [RESPONSE ERROR] ${error.response?.status} ${error.config?.url}`);
    console.error('💬 [ERROR MESSAGE]', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default API;