import { StyleSheet, View, Platform, UIManager, Text, Alert, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigatorComponent } from './src/components/navigation/bottomTabNav/bottomTabNav';
import Toast from 'react-native-toast-message';
import { AppProvider } from './src/context/AppContext';
import { CustomDarkTheme } from './hooks/theme/customDarkTheme';
import { CheckCircle2 } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from './src/services/authService';
import { setPostServiceEnabled } from './src/services/postService';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegistrationScreen';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const toastConfig = {
  success: ({ text1 }) => (
    <View style={[styles.toastBase, styles.toastSuccess]}>
      <View style={styles.toastContent}>
        <CheckCircle2 size={16} color='#FFF' fill='rgba(0, 186, 52, 1)' />
        <Text style={styles.toastTitle}>{text1}</Text>
      </View>
    </View>
  ),
  error: ({ text1 }) => (
    <View style={[styles.toastBase, styles.toastError]}>
      <View style={styles.toastContent}>
        <Text style={styles.toastTitle}>{text1}</Text>
      </View>
    </View>
  ),
};

export default function App() {
  const [authState, setAuthState] = useState('loading');
  const [authScreen, setAuthScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [postServiceConnected, setPostServiceConnected] = useState(true);

  useEffect(() => {
    const restoreAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userJson = await AsyncStorage.getItem('userProfile');

        if (token) {
          setAuthState('app');
          if (userJson) {
            setUser(JSON.parse(userJson));
          }
        } else {
          setAuthState('auth');
          setUser(null);
        }
      } catch (error) {
        console.error('[APP] Failed to restore auth session:', error);
        setAuthState('auth');
        setUser(null);
      }
    };

    restoreAuthState();
  }, []);

  useEffect(() => {
    setPostServiceEnabled(postServiceConnected);
  }, [postServiceConnected]);

  const handleTogglePostServiceConnection = () => {
    setPostServiceConnected((current) => !current);
  };

  const handleLoginSuccess = (authResult) => {
    if (authResult?.user) {
      setUser(authResult.user);
    }

    setAuthState('app');
    Alert.alert(
      'Login Successful! 🎉',
      'Authentication state has been restored. You are now inside the app.',
      [
        { text: 'Understood', onPress: () => console.log('Alert dismissed') }
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (logoutError) {
      console.error('[APP] Logout failed:', logoutError);
    }

    setUser(null);
    setAuthState('auth');
    setAuthScreen('login');
  };

  if (authState === 'loading') {
    return <View style={{ flex: 1, backgroundColor: '#008060' }} />;
  }

  if (authState === 'auth') {
    if (authScreen === 'register') {
      return (
        <View style={styles.authModeContainer}>
          <RegisterScreen
            onNavigateToLogin={() => setAuthScreen('login')}
            onLoginSuccess={handleLoginSuccess}
          />
          {__DEV__ && (
            <Pressable
              style={styles.authModeToggle}
              onPress={() => setAuthState('app')}
            >
              <Text style={styles.authModeToggleText}>Switch to App</Text>
            </Pressable>
          )}
          <Toast config={toastConfig} />
        </View>
      );
    }
    return (
      <View style={styles.authModeContainer}>
        <LoginScreen
          onNavigateToRegister={() => setAuthScreen('register')}
          onLoginSuccess={handleLoginSuccess}
        />
        {__DEV__ && (
          <Pressable
            style={styles.authModeToggle}
            onPress={() => setAuthState('app')}
          >
            <Text style={styles.authModeToggleText}>Switch to App</Text>
          </Pressable>
        )}
        <Toast config={toastConfig} />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <ErrorBoundary>
        <AppProvider user={user} setUser={setUser}>
          <NavigationContainer theme={CustomDarkTheme}>
            <View style={styles.appContainer}>
              <BottomTabNavigatorComponent onLogout={handleLogout} />
              <View style={styles.devToggleContainer}>
                <Pressable
                  style={[styles.serviceToggle, { backgroundColor: postServiceConnected ? 'rgba(0, 186, 52, 0.95)' : 'rgba(255, 69, 58, 0.95)' }]}
                  onPress={handleTogglePostServiceConnection}
                >
                  <Text style={styles.serviceToggleText}>
                    {postServiceConnected ? 'Disconnect PostServ' : 'Connect PostService'}
                  </Text>
                </Pressable>
              </View>
              {__DEV__ && (
                <Pressable
                  style={styles.authToggle}
                  onPress={() => {
                    setAuthState('auth');
                    setAuthScreen('login');
                  }}
                >
                  <Text style={styles.authToggleText}>Switch to Auth</Text>
                </Pressable>
              )}
            </View>
          </NavigationContainer>
        </AppProvider>
        <Toast config={toastConfig} />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  appContainer: { flex: 1, flexDirection: 'column' },
  toastBase: { height: 64, width: '95%', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4.65, elevation: 8 },
  toastSuccess: { backgroundColor: 'rgba(0, 53, 15, 1)', borderLeftWidth: 5, borderLeftColor: 'rgba(0, 186, 52, 1)' },
  toastError: { backgroundColor: '#1E1E1E', borderLeftWidth: 5, borderLeftColor: '#FF3333' },
  toastContent: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  toastTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.2 },
  toastSubtitle: { color: '#A0A0A0', fontSize: 12, fontWeight: '400', marginTop: 2 },
  authToggle: {
    position: 'absolute',
    top: 40,
    right: 130,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(0, 186, 52, 0.95)',
    borderRadius: 999,
    elevation: 6,
  },
  devToggleContainer: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 10,
  },
  serviceToggle: {
    position: 'absolute',
    top: 35,
    right: 99,
    zIndex: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    elevation: 6,
  },
  serviceToggleText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 10,
  },
  authToggleText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 10,
  },
  authModeContainer: {
    flex: 1,
  },
  authModeToggle: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  authModeToggleText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});