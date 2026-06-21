import React, { useRef, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Pressable,
} from "react-native";
import {
  ArrowLeft,
  Lock,
  Smartphone,
  Fingerprint,
  ShieldAlert,
  ChevronRight,
  Laptop,
  CheckCircle2,
} from "lucide-react-native";
import { ThemeTokens } from "../../../../theme";

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
};

export function PasswordSecurity({
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  twoFactorActive,
  setTwoFactorActive,
  biometricsActive,
  setBiometricsActive,
  navigation,
  selectedTheme,
  setSelectedTheme,
}) {
  const scrollViewRef = useRef(null);
  const [localInput, setLocalInput] = useState("");

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  useFocusEffect(
    useCallback(() => {
      return () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        setLocalInput("");
      };
    }, [])
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColor.background }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={themeColor.background} 
      />

      <View style={[styles.header, { backgroundColor: themeColor.background }]}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()} 
          style={styles.headerAction}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={isDark ? "#FFFFFF" : themeColor.textPrimary} strokeWidth={2.5} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
          Password & Security
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Update Password Section */}
        <View style={styles.sectionGap}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Update Password</Text>

          <View style={styles.passwordCard}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColor.textMuted }]}>Current Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.input, { backgroundColor: themeColor.surface, color: themeColor.textPrimary, borderColor: themeColor.border }]}
                  placeholder="Enter current password"
                  placeholderTextColor={themeColor.textMuted}
                  secureTextEntry={!showCurrentPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance={isDark ? "dark" : "light"}
                />
                <TouchableOpacity
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={styles.visibilityButton}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.visibilityText, { color: themeColor.textMuted }]}>
                    {showCurrentPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColor.textMuted }]}>New Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.input, { backgroundColor: themeColor.surface, color: themeColor.textPrimary, borderColor: themeColor.border }]}
                  placeholder="Minimum 8 characters"
                  placeholderTextColor={themeColor.textMuted}
                  secureTextEntry={!showNewPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance={isDark ? "dark" : "light"}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  style={styles.visibilityButton}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.visibilityText, { color: themeColor.textMuted }]}>
                    {showNewPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.updateButton} activeOpacity={0.8}>
              <Text style={styles.updateButtonText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Security Settings Section */}
        <View style={styles.sectionGap}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Security</Text>

          <View style={[styles.togglesCard, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleRowLeft}>
                <Fingerprint color={themeColor.textMuted} size={20} style={styles.rowIcon} />
                <View style={styles.toggleTextContent}>
                  <Text style={[styles.toggleTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
                    Biometric Authentication
                  </Text>
                  <Text style={[styles.toggleDescription, { color: themeColor.textMuted }]}>
                    Use your device biometrics for faster sign in.
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => setBiometricsActive(!biometricsActive)}
                style={[
                  styles.switchTrack,
                  biometricsActive ? { backgroundColor: COLORS.cyan } : { backgroundColor: themeColor.background, borderWidth: 1, borderColor: themeColor.border },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    biometricsActive 
                      ? { transform: [{ translateX: 14 }], backgroundColor: "#FFFFFF" } 
                      : { transform: [{ translateX: 0 }], backgroundColor: themeColor.textMuted },
                  ]}
                />
              </Pressable>
            </View>

            <View style={[styles.divider, { backgroundColor: themeColor.border }]} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleRowLeft}>
                <Lock color={themeColor.textMuted} size={20} style={styles.rowIcon} />
                <View style={styles.toggleTextContent}>
                  <Text style={[styles.toggleTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
                    Two-Step Verification (2FA)
                  </Text>
                  <Text style={[styles.toggleDescription, { color: themeColor.textMuted }]}>
                    Add an extra layer of security when signing in.
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => setTwoFactorActive(!twoFactorActive)}
                style={[
                  styles.switchTrack,
                  twoFactorActive ? { backgroundColor: COLORS.cyan } : { backgroundColor: themeColor.background, borderWidth: 1, borderColor: themeColor.border },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    twoFactorActive 
                      ? { transform: [{ translateX: 14 }], backgroundColor: "#FFFFFF" } 
                      : { transform: [{ translateX: 0 }], backgroundColor: themeColor.textMuted },
                  ]}
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Active Sessions Section */}
        <View style={styles.sectionGap}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Active Sessions</Text>

          <View style={[styles.sessionsCard, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
            <View style={styles.sessionItem}>
              <View style={styles.sessionItemLeft}>
                <View style={[styles.deviceIconWrapper, { backgroundColor: themeColor.background }]}>
                  <Smartphone size={20} color={isDark ? "rgba(255,255,255,0.8)" : themeColor.textPrimary} />
                </View>
                <View style={styles.sessionMeta}>
                  <View style={styles.sessionNameRow}>
                    <Text style={[styles.deviceName, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>iPhone 15 Pro</Text>
                    <View style={[styles.currentBadge, { backgroundColor: themeColor.background, borderColor: themeColor.border }]}>
                      <Text style={[styles.currentBadgeText, { color: themeColor.textPrimary }]}>Current</Text>
                    </View>
                  </View>
                  <Text style={[styles.sessionLocation, { color: themeColor.textMuted }]}>Port Harcourt • Active now</Text>
                </View>
              </View>
              <CheckCircle2 size={16} color={COLORS.cyan} />
            </View>

            <View style={[styles.sessionItem, styles.borderedSessionItem, { borderTopColor: themeColor.border }]}>
              <View style={styles.sessionItemLeft}>
                <View style={[styles.deviceIconWrapper, { backgroundColor: themeColor.background }]}>
                  <Laptop size={20} color={themeColor.textMuted} />
                </View>
                <View style={styles.sessionMeta}>
                  <Text style={[styles.deviceName, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>MacBook Pro (M3)</Text>
                  <Text style={[styles.sessionLocation, { color: themeColor.textMuted }]}>Last active 3 hours ago</Text>
                </View>
              </View>
              <ChevronRight size={16} color={themeColor.textMuted} />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.logoutOthersButton, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]} 
            activeOpacity={0.7}
          >
            <View style={styles.logoutOthersLeft}>
              <ShieldAlert size={19} color={themeColor.textMuted} strokeWidth={1.8} />
              <Text style={[styles.logoutOthersText, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
                Log out of other devices
              </Text>
            </View>
            <ChevronRight size={16} color={themeColor.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    backgroundColor: COLORS.void,
  },
  headerAction: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
    textAlign: "center",
  },
  headerSpacer: {
    width: 36,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 112,
  },
  sectionGap: {
    marginTop: 28,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.white30,
    textTransform: "uppercase",
    paddingHorizontal: 4,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  passwordCard: {
    gap: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.white50,
    paddingHorizontal: 2,
    marginBottom: 8,
  },
  passwordInputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.ink,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
    paddingLeft: 14,
    paddingRight: 60,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.white,
  },
  visibilityButton: {
    position: "absolute",
    right: 14,
    height: "100%",
    justifyContent: "center",
    zIndex: 1,
  },
  visibilityText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.white40,
  },
  updateButton: {
    width: "100%",
    backgroundColor: COLORS.cyan,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  updateButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.white,
  },
  togglesCard: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 4,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    gap: 16,
  },
  toggleRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  rowIcon: {
    marginTop: 0,
  },
  toggleTextContent: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white90,
    marginBottom: 2,
  },
  toggleDescription: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.white40,
    lineHeight: 16,
  },
  switchTrack: {
    width: 38,
    height: 22,
    borderRadius: 11,
    padding: 2,
    justifyContent: "center",
  },
  switchThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  sessionsCard: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
    overflow: "hidden",
  },
  sessionItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  borderedSessionItem: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  sessionItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  deviceIconWrapper: {
    padding: 8,
    backgroundColor: COLORS.void,
    borderRadius: 10,
  },
  sessionMeta: {
    flexDirection: "column",
  },
  sessionNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
  currentBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  currentBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.white,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sessionLocation: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.white40,
    marginTop: 2,
  },
  logoutOthersButton: {
    width: "100%",
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  logoutOthersLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoutOthersText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white50,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 14,
  }
});