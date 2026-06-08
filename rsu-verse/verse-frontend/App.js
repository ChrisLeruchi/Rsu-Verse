import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegistrationScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('LOGIN'); // Alternates between 'LOGIN' and 'REGISTER'

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {currentScreen === 'LOGIN' ? (
        <LoginScreen 
          onNavigateToRegister={() => setCurrentScreen('REGISTER')} 
        />
      ) : (
        <RegisterScreen 
          onNavigateToLogin={() => setCurrentScreen('LOGIN')} 
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});