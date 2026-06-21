import React, { useState, useRef } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import authService from '../services/authService';
import VerseLogo from '../../assets/verse_logo2.png';

const { width } = Dimensions.get('window');

const RSU_DEPARTMENTS = [
  "Computer Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Petroleum Engineering",
  "Marine Engineering",
  "Computer Science",
  "Criminology",
  "Law",
  "Business Administration",
  "Accountancy",
  "Architecture"
];

export default function RegisterScreen({ onNavigateToLogin }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);


  const [dob, setDob] = useState(new Date(2005, 0, 1));
  const [isAgeValid, setIsAgeValid] = useState(true);
  const [level, setLevel] = useState('');
  const [department, setDepartment] = useState('');
  const [deptSearch, setDeptSearch] = useState('');
  const [filteredDepts, setFilteredDepts] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name] = useState(''); 
  const [matricNumber] = useState(''); 
  const [receiptImage] = useState(null);

  
  const passwordInputRef = useRef(null);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setDob(currentDate);
    const today = new Date();
    let age = today.getFullYear() - currentDate.getFullYear();
    const monthDiff = today.getMonth() - currentDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < currentDate.getDate())) {
      age--;
    }
    setIsAgeValid(age >= 16);
  };

  const renderHeaderNavigation = () => (
    <View style={styles.navHeader}>
      {step > 1 ? (
        <TouchableOpacity style={styles.backButton} onPress={() => { Keyboard.dismiss(); setStep(step - 1); }}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.backButtonPlaceholder} />
      )}
      <Text style={styles.stepProgress}>Step {step} of 5</Text>
    </View>
  );

  const handleRegisterFinalSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email.trim().toLowerCase());
      formData.append('password', password);
      formData.append('level', level);
      formData.append('department', department);
      formData.append('name', name ? name.trim() : 'Pending OCR Extraction');
      formData.append('matricNumber', matricNumber ? matricNumber.trim().toUpperCase() : `TEMP-${Date.now()}`);
      formData.append('faculty', 'Engineering');

      if (receiptImage) {
        formData.append('receiptImage', {
          uri: receiptImage.uri,
          name: 'receipt.jpg',
          type: 'image/jpeg',
        });
      }

      const result = await authService.register(formData);
      Alert.alert('Success 🎉', result.message || 'Account created successfully!');
      onNavigateToLogin();
    } catch (err) {
      Alert.alert('Registration Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            
            {renderHeaderNavigation()}
            <Image style={styles.logo} source={VerseLogo} />

            {/* STEP 1: DOB */}
            {step === 1 && (
              <View style={styles.stepBox}>
                <Text style={styles.stepTitle}>When is your birthday?</Text>
                <Text style={styles.stepDescription}>Neither your birthday or age will be displayed publicly</Text>
                
                <View style={styles.pickerContainer}>
                  <DateTimePicker
                    value={dob}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    textColor="#ffffff"
                    style={styles.wheelPicker}
                  />
                </View>

                {!isAgeValid && (
                  <View style={styles.policyAlertBox}>
                    <Text style={styles.policyAlertText}>
                      ⚠️ Verse requires users to be 16 years or older.
                    </Text>
                  </View>
                )}

                <TouchableOpacity 
                  style={[styles.nextButton, !isAgeValid && styles.disabledButton]} 
                  onPress={() => isAgeValid && setStep(2)}
                  disabled={!isAgeValid}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* STEP 2: LEVEL */}
            {step === 2 && (
              <View style={styles.stepBox}>
                <Text style={styles.stepTitle}>{"What's your current level?"}</Text>
              
                <View style={styles.chipGrid}>
                  {['100L', '200L', '300L', '400L', '500L', 'Alumni'].map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={[styles.chipButton, level === item && styles.chipActive]}
                      onPress={() => setLevel(item)}
                    >
                      <Text style={[styles.chipText, level === item && styles.chipTextActive]}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity 
                  style={[styles.nextButton, !level && styles.disabledButton]} 
                  onPress={() => level && setStep(3)}
                  disabled={!level}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}

     
            {step === 3 && (
              <View style={styles.stepBox}>
                <Text style={styles.stepTitle}>Search your Department</Text>
                <Text style={styles.stepDescription}>Just start typing...</Text>

                <TextInput
                  placeholder="Type your department..."
                  placeholderTextColor="#A0AEC0"
                  value={deptSearch}
                  onChangeText={(text) => {
                    setDeptSearch(text);
                    if (text.trim() === '') {
                      setFilteredDepts([]);
                    } else {
                      // Strict block filter checking consecutive letter strings directly
                      const filtered = RSU_DEPARTMENTS.filter(d => 
                        d.toLowerCase().indexOf(text.toLowerCase()) !== -1
                      );
                      setFilteredDepts(filtered);
                    }
                  }}
                  style={styles.input}
                  returnKeyType="done"
                />

                {filteredDepts.length > 0 && (
                  <View style={styles.dropdownScrollContainer}>
                    <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 180 }} keyboardShouldPersistTaps="handled">
                      {filteredDepts.map((item) => (
                        <TouchableOpacity 
                          key={item} 
                          style={[styles.suggestionRow, department === item && styles.suggestionActive]}
                          onPress={() => {
                            setDepartment(item);
                            setDeptSearch(item);
                            setFilteredDepts([]);
                            Keyboard.dismiss();
                          }}
                        >
                          <Text style={[styles.suggestionText, department === item && styles.suggestionTextActive]}>{item}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}

                <TouchableOpacity 
                  style={[styles.nextButton, !department && styles.disabledButton]} 
                  onPress={() => department && setStep(4)}
                  disabled={!department}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* STEP 4: EMAIL VERIFIATION */}
            {step === 4 && (
              <View style={styles.stepBox}>
                <Text style={styles.stepTitle}>Set up your account</Text>
                <Text style={styles.stepDescription}>Please provide your email for verification</Text>

                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="#A0AEC0"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()} // Advances focus
                  blurOnSubmit={false}
                />

                <TextInput
                  ref={passwordInputRef}
                  placeholder="Password (Min 8 Characters)"
                  placeholderTextColor="#A0AEC0"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                  returnKeyType="done"
                  onSubmitEditing={() => { if (email && password.length >= 8) setStep(5); }}
                />

                <TouchableOpacity 
                  style={[styles.nextButton, (!email || password.length < 8) && styles.disabledButton]} 
                  onPress={() => email && password.length >= 8 && setStep(5)}
                  disabled={!email || password.length < 8}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* STEP 5: USER VERIFICATION */}
            {step === 5 && (
              <View style={styles.stepBox}>
                <Text style={styles.stepTitle}>Verify Student </Text>
                <Text style={styles.stepDescription}>Upload your e-campus school fee. This is to ensure that every user is a student of RSU. Your name, dept and mat-no will be extracted from here.</Text>

                <TouchableOpacity style={styles.uploadPlaceholderCard} onPress={() => Alert.alert('Camera Input', 'Next checkpoint step!')}>
                  <Text style={styles.uploadPlaceholderText}>📸 Tap to Upload Fee Receipt</Text>
                </TouchableOpacity>

                {loading ? (
                  <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
                ) : (
                  <TouchableOpacity style={styles.buttonSubmit} onPress={handleRegisterFinalSubmit}>
                    <Text style={styles.buttonTextFinal}>Complete Registration 🚀</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <TouchableOpacity onPress={onNavigateToLogin} disabled={loading}>
              <Text style={styles.switchText}>
                Already have an account? <Text style={styles.linkText}>Log In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#008060', },
  container: { padding: 24, paddingBottom: 40 },
  navHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  },
  backButton: { padding: 8, paddingLeft: 0 },
  backArrow: { color: '#ffffff', fontSize: 24, fontWeight: 'bold' },
  backButtonPlaceholder: { width: 40 },
  stepProgress: { color: '#e2e8f0', fontSize: 14, fontWeight: '600' },
  logo: { width: 180, height: 180, alignSelf: 'center', resizeMode: 'contain' },
  stepBox: { width: '100%', marginTop: 10 },
  stepTitle: { fontSize: 26, fontWeight: '800', color: '#ffffff', textAlign: 'center', marginBottom: 20 },
  stepDescription: { fontSize: 14, color: '#e2e8f0', textAlign: 'center', marginBottom: 24, paddingHorizontal: 10, lineHeight: 20 },
  pickerContainer: { alignItems: 'center', justifyContent: 'center', marginVertical: 10, width: '100%' },
  wheelPicker: { width: width - 48, height: 180 },
  policyAlertBox: { backgroundColor: '#7f1d1d', padding: 16, borderRadius: 12, marginTop: 15, borderWidth: 1, borderColor: '#f87171' },
  policyAlertText: { color: '#fca5a5', fontSize: 13, fontWeight: '500', lineHeight: 18, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#004d3a', padding: 16, marginBottom: 12, borderRadius: 12, backgroundColor: '#ffffff', color: '#111111', fontSize: 16 },
  
  
  dropdownScrollContainer: { backgroundColor: '#004d3a', borderRadius: 12, padding: 6, marginBottom: 14, borderWidth: 1, borderColor: '#005c45', overflow: 'hidden' },
  suggestionRow: { padding: 14, borderRadius: 8, marginBottom: 4 },
  suggestionActive: { backgroundColor: '#ffffff' },
  suggestionText: { color: '#ffffff', fontSize: 15, fontWeight: '500' },
  suggestionTextActive: { color: '#008060', fontWeight: '700' },

  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  chipButton: { width: '48%', backgroundColor: '#004d3a', padding: 16, borderRadius: 12, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#005c45' },
  chipActive: { backgroundColor: '#ffffff', borderColor: '#ffffff' },
  chipText: { color: '#e2e8f0', fontSize: 16, fontWeight: '600' },
  chipTextActive: { color: '#008060', fontWeight: '700' },
  uploadPlaceholderCard: { borderStyle: 'dashed', borderWidth: 2, borderColor: '#e2e8f0', borderRadius: 16, height: 150, justifyContent: 'center', alignItems: 'center', marginVertical: 15, backgroundColor: 'rgba(255,255,255,0.05)' },
  uploadPlaceholderText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  nextButton: { backgroundColor: '#111111', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  buttonSubmit: { backgroundColor: '#ffffff', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  disabledButton: { backgroundColor: '#005c45', opacity: 0.5 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  buttonTextFinal: { color: '#008060', fontSize: 16, fontWeight: '700' },
  loader: { marginVertical: 16 },
  switchText: { color: '#e2e8f0', textAlign: 'center', marginTop: 28, fontSize: 14, fontWeight: '500' },
  linkText: { color: '#ffffff', fontWeight: '700', textDecorationLine: 'underline' }
});