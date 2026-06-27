import { StyleSheet, View, Platform, UIManager, Text, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigatorComponent } from './src/components/navigation/bottomTabNav/bottomTabNav';
import Toast from 'react-native-toast-message';
import { AppProvider } from './src/context/AppContext';
import { CustomDarkTheme } from './hooks/theme/customDarkTheme';
import { CheckCircle2 } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  useEffect(() => {
    setAuthState('app');
  }, []);


  const handleLoginSuccess = () => {
    console.log("Intercepted login completion state check successfully.");
    
    Alert.alert(
      "Login Successful! 🎉",
      "Authentication state intercepted. In production, this shifts layout focus to the main app dashboard routing layer.",
      [
        { text: "Understood", onPress: () => console.log("Alert dismissed") }
      ]
    );
  }
  const handleLogout = async () => {
    setAuthState('auth');
    setAuthScreen('login');
  };

  if (authState === 'loading') {
    return <View style={{ flex: 1, backgroundColor: '#008060' }} />;
  }

  if (authState === 'auth') {
    if (authScreen === 'register') {
      return (
        <>
          <RegisterScreen
            onNavigateToLogin={() => setAuthScreen('login')}
            onLoginSuccess={handleLoginSuccess}
          />
          <Toast config={toastConfig} />
        </>
      );
    }
    return (
      <>
        <LoginScreen
          onNavigateToRegister={() => setAuthScreen('register')}
          onLoginSuccess={handleLoginSuccess}
        />
        <Toast config={toastConfig} />
      </>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <AppProvider>
        <NavigationContainer theme={CustomDarkTheme}>
          <View style={styles.appContainer}>
            <BottomTabNavigatorComponent onLogout={handleLogout} />
          </View>
        </NavigationContainer>
      </AppProvider>
      <Toast config={toastConfig} />
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
});