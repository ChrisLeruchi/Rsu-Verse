import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const runHaptic = (action) => {
  if (Platform.OS === 'web') return;
  try {
    action();
  } catch (error) {
    console.warn("Haptic failed to execute:", error)
  }
}

export const HapticEngine = {
  selection: () => runHaptic(() => Haptics.selectionAsync()),

  light: () => runHaptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),

  medium: () => runHaptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),

  heavy: () => runHaptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)),

  success: () => runHaptic(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
}