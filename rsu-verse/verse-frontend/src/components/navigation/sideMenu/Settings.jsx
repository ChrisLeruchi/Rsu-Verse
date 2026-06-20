import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Pressable,
  ScrollView,
} from "react-native";

import {
  ArrowLeft,
  ChevronRight,
  User2,
  LucideLockKeyhole,
  EyeOff,
  Bell
} from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";
import { ThemeTokens } from "../../../theme";

const COLORS = {
  void: "#000000",
  void80: "rgba(10, 10, 10, 0.8)",
  ink: "#1A1A1A",
  ink40: "rgba(22, 22, 24, 0.4)",
  cyan: "#17CB49",
  white: "#FFFFFF",
  white5: "rgba(255, 255, 255, 0.05)",
  white10: "rgba(255, 255, 255, 0.1)",
  white20: "rgba(255, 255, 255, 0.2)",
  white30: "rgba(255, 255, 255, 0.3)",
  white40: "rgba(255, 255, 255, 0.4)",
  white50: "rgba(255, 255, 255, 0.5)",
  white60: "rgba(255, 255, 255, 0.6)",
  white90: "rgba(255, 255, 255, 0.9)",

  gradientCyanToBlack: ["#17CB49", "#000000"],
  gradientCyanToWhite: ["#17CB49", "#FFFFFF"],
};

export function Settings({ selectedTheme, setSelectedTheme }) {
  const navigation = useNavigation();

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColor.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={themeColor.background}
      />
      <View style={styles.header}>
        <Pressable
          style={styles.headerAction}
          onPress={() => navigation?.goBack()}
        >
          <ArrowLeft size={20} strokeWidth={2.5} color={isDark ? "#FFFFFF" : themeColor.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
          Settings
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={styles.setGroup}
        >
          <User2 size={20} strokeWidth={2.5} color={themeColor.textMuted} />

          <View style={styles.setInfo}>
            <Text style={[styles.setHeading, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
              Your account
            </Text>
            <Text style={[styles.setText, { color: themeColor.textMuted }]}>
              See your account information, or learn about your account deactivation options.
            </Text>
          </View>

          <ChevronRight size={20} color={themeColor.textMuted} />
        </Pressable>
        <Pressable
          style={styles.setGroup}
          onPress={() => navigation.navigate('Manage_Security')}
        >
          <LucideLockKeyhole size={20} strokeWidth={2.5} color={themeColor.textMuted} />

          <View style={styles.setInfo}>
            <Text style={[styles.setHeading, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
              Security
            </Text>
            <Text style={[styles.setText, { color: themeColor.textMuted }]}>
              Manage your {"account's"} security and account access.
            </Text>
          </View>

          <ChevronRight size={20} color={themeColor.textMuted} />
        </Pressable>
        <Pressable
          style={styles.setGroup}
          onPress={() => navigation.navigate('Privacy_Management')}
        >
          <EyeOff size={20} strokeWidth={2.5} color={themeColor.textMuted} />

          <View style={styles.setInfo}>
            <Text style={[styles.setHeading, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
              Privacy & Safety
            </Text>
            <Text style={[styles.setText, { color: themeColor.textMuted }]}>
              Manage what information you share on Verse.
            </Text>
          </View>

          <ChevronRight size={20} color={themeColor.textMuted} />
        </Pressable>
        <Pressable
          style={styles.setGroup}
          onPress={() => navigation.navigate('Notification')}
        >
          <Bell size={20} strokeWidth={2.5} color={themeColor.textMuted} />

          <View style={styles.setInfo}>
            <Text style={[styles.setHeading, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
              Notifications
            </Text>
            <Text style={[styles.setText, { color: themeColor.textMuted }]}>
              Select the kinds of notification you get.
            </Text>
          </View>

          <ChevronRight size={20} color={themeColor.textMuted} />
        </Pressable>
        <Pressable
          style={styles.setGroup}
        >
          <User2 size={20} strokeWidth={2.5} color={themeColor.textMuted} />

          <View style={styles.setInfo}>
            <Text style={[styles.setHeading, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
              Further resources
            </Text>
            <Text style={[styles.setText, { color: themeColor.textMuted }]}>
              Check out more helpful information to learn more about Verse.
            </Text>
          </View>

          <ChevronRight size={20} color={themeColor.textMuted} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.void,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  scrollContent: {
    flexDirection: 'column',
    gap: 30,
    paddingVertical: 20
  },
  headerAction: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.white,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  setGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16
  },
  setInfo: {
    width: "85%"
  },
  setBtn: {
    flexDirection: 'row',
  },
  setHeading: {
    color: COLORS.white,
    fontWeight: 600
  },
  setText: {
    color: COLORS.white40
  }
})