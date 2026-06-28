import API from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authService = {
  register: async (userData) => {
    console.log('[AUTH] Raw data received by authService:', JSON.stringify(userData, null, 2));
    console.log('📝 [AUTH] Register called, handing off to API client...');
    console.log('📝 [AUTH] Register called, handing off to API client...');
    console.log('📝 [AUTH] Payload being sent:', userData);
    try {
      const response = await API.post('/auth/register', userData);
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        console.log('🔐 [AUTH] Token saved to AsyncStorage after registration');
      }
      console.log('✅ [AUTH] Registration successful:', response.data.message);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      console.error('❌ [AUTH] Registration failed:', errorMsg);
      throw new Error(errorMsg);
    }
  },

  login: async (credentials) => {
    console.log('🔍 [AUTH] Raw data received by authService:', JSON.stringify(credentials, null, 2));
    console.log('🔓 [AUTH] Login called, handing off to API client...');
    console.log('🔓 [AUTH] Login called, handing off to API client...');
    console.log('🔓 [AUTH] Attempting login for:', credentials.email);
    try {
      const response = await API.post('/auth/login', credentials);
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        console.log('🔐 [AUTH] Token saved to AsyncStorage after login');
      }
      console.log('✅ [AUTH] Login successful for:', credentials.email);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed';
      console.error('❌ [AUTH] Login failed:', errorMsg);
      throw new Error(errorMsg);
    }
  },

  logout: async () => {
    console.log('👋 [AUTH] Logout called, clearing token...');
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('👋 [AUTH] Token cleared, user logged out');
    } catch (error) {
      console.error('❌ [AUTH] Error clearing auth session:', error);
    }
  }
};

export default authService;
