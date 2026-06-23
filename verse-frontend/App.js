import { StyleSheet, View, Platform, UIManager } from 'react-native';
import { SafeAreaProvider,  } from 'react-native-safe-area-context';
import { NavigationContainer,} from '@react-navigation/native';
import { BottomTabNavigatorComponent } from './src/components/navigation/bottomTabNav/bottomTabNav';
import { AppProvider, } from './src/context/AppContext';
import { CustomDarkTheme } from './hooks/theme/customDarkTheme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <AppProvider>
        <NavigationContainer theme={CustomDarkTheme}>
          <View style={styles.appContainer}>
            <BottomTabNavigatorComponent />
          </View>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});