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

const COLORS = {
  void: "#0A0A0A",
  void80: "rgba(10, 10, 10, 0.8)",
  ink: "#161618",
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
}) {
  const scrollViewRef = useRef(null);
  const [localInput, setLocalInput] = useState("");

  useFocusEffect(
    useCallback(() => {

      return () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        setLocalInput("");
        
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.void} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.navigate("Profile")}
          style={styles.headerAction}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={COLORS.white60} strokeWidth={2.5} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Password & Security</Text>
        <View style={styles.headerSpacer} />
      </View>


      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.sectionGap}>
          <Text style={styles.sectionHeading}>Update Password</Text>

          <View style={styles.passwordCard}>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter current password"
                  placeholderTextColor={COLORS.white30}
                  secureTextEntry={!showCurrentPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance="dark"
                />
                <TouchableOpacity
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={styles.visibilityButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.visibilityText}>
                    {showCurrentPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>


            <View style={styles.inputGroup}>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Minimum 8 characters"
                  placeholderTextColor={COLORS.white30}
                  secureTextEntry={!showNewPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance="dark"
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  style={styles.visibilityButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.visibilityText}>
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


        <View style={styles.sectionGap}>
          <Text style={styles.sectionHeading}>Security</Text>

          <View style={styles.togglesCard}>

            <View style={styles.toggleRow}>
              <View style={styles.toggleRowLeft}>
                <Fingerprint color={COLORS.white60} size={20} style={styles.rowIcon} />
                <View style={styles.toggleTextContent}>
                  <Text style={styles.toggleTitle}>Biometric Authentication</Text>
                  <Text style={styles.toggleDescription}>
                    Use your device biometrics for faster sign in.
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => setBiometricsActive(!biometricsActive)}
                style={[
                  styles.switchTrack,
                  biometricsActive ? { backgroundColor: COLORS.cyan } : { backgroundColor: COLORS.white10 },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    biometricsActive ? { transform: [{ translateX: 16 }], backgroundColor: COLORS.white } : { transform: [{ translateX: 0 }], backgroundColor: COLORS.white60 },
                  ]}
                />
              </Pressable>
            </View>


            <View style={styles.divider} />


            <View style={styles.toggleRow}>
              <View style={styles.toggleRowLeft}>
                <Lock color={COLORS.white60} size={20} style={styles.rowIcon} />
                <View style={styles.toggleTextContent}>
                  <Text style={styles.toggleTitle}>Two-Step Verification (2FA)</Text>
                  <Text style={styles.toggleDescription}>
                    Add an extra layer of security when signing in.
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => setTwoFactorActive(!twoFactorActive)}
                style={[
                  styles.switchTrack,
                  twoFactorActive ? { backgroundColor: COLORS.cyan } : { backgroundColor: COLORS.white10 },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    twoFactorActive ? { transform: [{ translateX: 16 }], backgroundColor: COLORS.white } : { transform: [{ translateX: 0 }], backgroundColor: COLORS.white60 },
                  ]}
                />
              </Pressable>
            </View>
          </View>
        </View>


        <View style={styles.sectionGap}>
          <Text style={styles.sectionHeading}>Active Sessions</Text>

          <View style={styles.sessionsCard}>

            <View style={styles.sessionItem}>
              <View style={styles.sessionItemLeft}>
                <View style={styles.deviceIconWrapper}>
                  <Smartphone size={20} color={COLORS.white80} />
                </View>
                <View style={styles.sessionMeta}>
                  <View style={styles.sessionNameRow}>
                    <Text style={styles.deviceName}>iPhone 15 Pro</Text>
                    <View style={styles.currentBadge}>
                      <Text style={styles.currentBadgeText}>Current</Text>
                    </View>
                  </View>
                  <Text style={styles.sessionLocation}>Port Harcourt • Active now</Text>
                </View>
              </View>
              <CheckCircle2 size={16} color={COLORS.white40} />
            </View>


            <View style={[styles.sessionItem, styles.borderedSessionItem]}>
              <View style={styles.sessionItemLeft}>
                <View style={styles.deviceIconWrapper}>
                  <Laptop size={20} color={COLORS.white40} />
                </View>
                <View style={styles.sessionMeta}>
                  <Text style={[styles.deviceName, { color: COLORS.white }]}>MacBook Pro (M3)</Text>
                  <Text style={styles.sessionLocation}>Last active 3 hours ago</Text>
                </View>
              </View>
              <ChevronRight size={16} color={COLORS.white20} />
            </View>
          </View>

          <TouchableOpacity style={styles.logoutOthersButton} activeOpacity={0.7}>
            <View style={styles.logoutOthersLeft}>
              <ShieldAlert size={19} color={COLORS.white50} strokeWidth={1.8} />
              <Text style={styles.logoutOthersText}>Log out of other devices</Text>
            </View>
            <ChevronRight size={16} color={COLORS.white20} />
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
    backgroundColor: COLORS.void80,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white5,
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
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white30,
    textTransform: "uppercase",
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  passwordCard: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.white5,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "300",
    color: COLORS.white50,
    paddingHorizontal: 2,
    marginBottom: 6,
  },
  passwordInputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.void40,
    borderWidth: 1,
    borderColor: COLORS.white5,
    borderRadius: 12,
    paddingLeft: 14,
    paddingRight: 60,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  visibilityButton: {
    position: "absolute",
    right: 14,
    height: "100%",
    justifyContent: "center",
    zIndex: 1,
  },
  visibilityText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white40,
  },
  updateButton: {
    width: "100%",
    backgroundColor: COLORS.cyan,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
  togglesCard: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.white5,
    padding: 4,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 14,
    gap: 16,
  },
  toggleRowLeft: {
    flexDirection: "row",
    flex: 1,
    gap: 12,
  },
  rowIcon: {
    marginTop: 2,
  },
  toggleTextContent: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white90,
    marginBottom: 2,
  },
  toggleDescription: {
    fontSize: 12,
    fontWeight: "300",
    color: COLORS.white40,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.white5,
    marginHorizontal: 16,
  },
  switchTrack: {
    width: 40,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: "center",
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  sessionsCard: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.white5,
    overflow: "hidden",
  },
  sessionItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.01)",
  },
  borderedSessionItem: {
    borderTopWidth: 1,
    borderTopColor: COLORS.white5,
  },
  sessionItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  deviceIconWrapper: {
    padding: 8,
    backgroundColor: COLORS.void,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.white5,
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
    fontWeight: "500",
    color: COLORS.white,
  },
  currentBadge: {
    backgroundColor: COLORS.white10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  currentBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.white,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sessionLocation: {
    fontSize: 12,
    fontWeight: "300",
    color: COLORS.white40,
    marginTop: 2,
  },
  logoutOthersButton: {
    width: "100%",
    backgroundColor: COLORS.ink,
    borderWidth: 1,
    borderColor: COLORS.white5,
    borderRadius: 16,
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
    fontWeight: "500",
    color: COLORS.white50,
  },
});