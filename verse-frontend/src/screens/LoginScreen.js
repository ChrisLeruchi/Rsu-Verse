import React, { useState, useRef } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  TouchableOpacity, 
  Image,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import authService from '../services/authService';
import VerseLogo from '../../assets/verse_logo2.png';

export default function LoginScreen({ onNavigateToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      await authService.login({ email, password });
      Alert.alert('Success', 'Welcome back to Verse!');
    } catch (err) {
      Alert.alert('Login Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image style={styles.logo} source={VerseLogo} />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#A0AEC0"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()} 
          blurOnSubmit={false}
        />
        
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          placeholderTextColor="#A0AEC0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          editable={!loading}
          returnKeyType="done"
          onSubmitEditing={handleLogin} 
        />

        {loading ? (
          <ActivityIndicator size="large" color="#111" style={styles.loader} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onNavigateToRegister}>
          <Text style={styles.switchText}>
            {"Don't have an account?"} <Text style={styles.linkText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, backgroundColor: '#008060' },
  logo: { width: 160, height: 160, alignSelf: 'center', marginBottom: 20, resizeMode: 'contain' },
  input: { borderWidth: 1, borderColor: '#004d3a', padding: 16, marginBottom: 16, borderRadius: 12, backgroundColor: '#ffffff', color: '#111111', fontSize: 16 },
  button: { backgroundColor: '#111111', padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  switchText: { color: '#e2e8f0', textAlign: 'center', marginTop: 28, fontSize: 14, fontWeight: '500' },
  linkText: { color: '#ffffff', fontWeight: '700', textDecorationLine: 'underline' },
  loader: { marginVertical: 16 }
});