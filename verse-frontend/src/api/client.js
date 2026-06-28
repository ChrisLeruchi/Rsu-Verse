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
    const status = error.response?.status ?? 'NO_STATUS';
    const url = error.config?.url ?? 'NO_URL';
    const message = error.response?.data?.message ?? error.message ?? 'Unknown error';
    const rawResponse = error.response?.data ?? 'No response body';

    console.error(`🔴 [RESPONSE ERROR] Status: ${status} | URL: ${url}`);
    console.error(`💬 [ERROR MESSAGE] ${message}`);
    console.error(`📄 [RAW RESPONSE]`, rawResponse);

    if (error.message?.includes('JSON Parse error')) {
      console.error('⚠️ [CLIENT] Server returned non-JSON. Backend may be sending plain text or HTML instead of JSON.');
    }

    if (!error.response) {
      console.error('⚠️ [CLIENT] No response received — server unreachable, wrong IP, or CORS issue.');
    }

    return Promise.reject(error);
  }
);

export default API;