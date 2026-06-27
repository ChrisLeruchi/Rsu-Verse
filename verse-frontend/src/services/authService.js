import API from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authService = {
  register: async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      throw new Error(errorMsg);
    }
  },

  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed';
      throw new Error(errorMsg);
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Error clearing auth session:', error);
    }
  }
};

export default authService;