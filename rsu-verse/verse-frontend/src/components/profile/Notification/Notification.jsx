import React, { useRef, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Pressable,
} from "react-native";
import {
  ArrowLeft,
  Bell,
  MessageSquare,
  Flame,
  Store,
  Megaphone,
  Mail,
} from "lucide-react-native";
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
};

export function Notification({
  pushMaster,
  setPushMaster,
  emailDigest,
  setEmailDigest,
  socialAlerts,
  setSocialAlerts,
  confessionAlerts,
  setConfessionAlerts,
  marketAlerts,
  setMarketAlerts,
  verseAlerts,
  setVerseAlerts,
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
          Notifications
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionGap}>
          <View style={[styles.cardContainer, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Bell color={themeColor.textMuted} size={20} style={styles.rowIcon} />
                <View style={styles.textContent}>
                  <Text style={[styles.rowTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>Push Notifications</Text>
                  <Text style={[styles.rowDescription, { color: themeColor.textMuted }]}>
                    Get notified about important activity
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => setPushMaster(!pushMaster)}
                style={[
                  styles.switchTrack,
                  pushMaster ? { backgroundColor: COLORS.cyan } : { backgroundColor: themeColor.background, borderWidth: 1, borderColor: themeColor.border },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    pushMaster 
                      ? { transform: [{ translateX: 16 }], backgroundColor: "#FFFFFF" } 
                      : { transform: [{ translateX: 0 }], backgroundColor: themeColor.textMuted },
                  ]}
                />
              </Pressable>
            </View>

            <View style={[styles.divider, { backgroundColor: themeColor.border }]} />

            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Mail color={themeColor.textMuted} size={20} style={styles.rowIcon} />
                <View style={styles.textContent}>
                  <Text style={[styles.rowTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>Weekly Recap</Text>
                  <Text style={[styles.rowDescription, { color: themeColor.textMuted }]}>
                    Catch up on trending posts and listings
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => setEmailDigest(!emailDigest)}
                style={[
                  styles.switchTrack,
                  emailDigest ? { backgroundColor: COLORS.cyan } : { backgroundColor: themeColor.background, borderWidth: 1, borderColor: themeColor.border },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    emailDigest 
                      ? { transform: [{ translateX: 16 }], backgroundColor: "#FFFFFF" } 
                      : { transform: [{ translateX: 0 }], backgroundColor: themeColor.textMuted },
                  ]}
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Activity Section */}
        <View style={styles.sectionGap}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Activity</Text>

          <View style={[styles.cardContainer, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
            <View style={[styles.row, !pushMaster && styles.disabledRow]}>
              <View style={styles.rowLeft}>
                <MessageSquare color={themeColor.textMuted} size={20} style={styles.rowIcon} />
                <View style={styles.textContent}>
                  <Text style={[styles.rowTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>Replies & Mentions</Text>
                  <Text style={[styles.rowDescription, { color: themeColor.textMuted }]}>
                    Get notified when someone replies to your post or mentions you.
                  </Text>
                </View>
              </View>
              <Pressable
                disabled={!pushMaster}
                onPress={() => setSocialAlerts(!socialAlerts)}
                style={[
                  styles.switchTrack,
                  socialAlerts && pushMaster ? { backgroundColor: COLORS.cyan } : { backgroundColor: themeColor.background, borderWidth: 1, borderColor: themeColor.border },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    socialAlerts && pushMaster 
                      ? { transform: [{ translateX: 16 }], backgroundColor: "#FFFFFF" } 
                      : { transform: [{ translateX: 0 }], backgroundColor: themeColor.textMuted },
                  ]}
                />
              </Pressable>
            </View>

            <View style={[styles.divider, { backgroundColor: themeColor.border }]} />

            <View style={[styles.row, !pushMaster && styles.disabledRow]}>
              <View style={styles.rowLeft}>
                <Flame color={themeColor.textMuted} size={20} style={styles.rowIcon} />
                <View style={styles.textContent}>
                  <Text style={[styles.rowTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>Anonymous Activity</Text>
                  <Text style={[styles.rowDescription, { color: themeColor.textMuted }]}>
                    Replies and reactions on anonymous posts.
                  </Text>
                </View>
              </View>
              <Pressable
                disabled={!pushMaster}
                onPress={() => setConfessionAlerts(!confessionAlerts)}
                style={[
                  styles.switchTrack,
                  confessionAlerts && pushMaster ? { backgroundColor: COLORS.cyan } : { backgroundColor: themeColor.background, borderWidth: 1, borderColor: themeColor.border },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    confessionAlerts && pushMaster 
                      ? { transform: [{ translateX: 16 }], backgroundColor: "#FFFFFF" } 
                      : { transform: [{ translateX: 0 }], backgroundColor: themeColor.textMuted },
                  ]}
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Marketplace Section */}
        <View style={styles.sectionGap}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Marketplace Notifications</Text>
          <View style={[styles.cardContainer, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
            <View style={[styles.row, !pushMaster && styles.disabledRow]}>
              <View style={styles.rowLeft}>
                <Store color={themeColor.textMuted} size={20} style={styles.rowIcon} />
                <View style={styles.textContent}>
                  <Text style={[styles.rowTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>Marketplace Messages</Text>
                  <Text style={[styles.rowDescription, { color: themeColor.textMuted }]}>
                    Get notified when someone messages you about an item.
                  </Text>
                </View>
              </View>
              <Pressable
                disabled={!pushMaster}
                onPress={() => setMarketAlerts(!marketAlerts)}
                style={[
                  styles.switchTrack,
                  marketAlerts && pushMaster ? { backgroundColor: COLORS.cyan } : { backgroundColor: themeColor.background, borderWidth: 1, borderColor: themeColor.border },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    marketAlerts && pushMaster 
                      ? { transform: [{ translateX: 16 }], backgroundColor: "#FFFFFF" } 
                      : { transform: [{ translateX: 0 }], backgroundColor: themeColor.textMuted },
                  ]}
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Verse Section */}
        <View style={styles.sectionGap}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Verse</Text>
          <View style={[styles.cardContainer, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
            <View style={[styles.row, !pushMaster && styles.disabledRow]}>
              <View style={styles.rowLeft}>
                <Megaphone color={themeColor.textMuted} size={20} style={styles.rowIcon} />
                <View style={styles.textContent}>
                  <Text style={[styles.rowTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>Verse Notifications</Text>
                  <Text style={[styles.rowDescription, { color: themeColor.textMuted }]}>
                    Recieve notifications from Verse
                  </Text>
                </View>
              </View>
              <Pressable
                disabled={!pushMaster}
                onPress={() => setVerseAlerts(!verseAlerts)}
                style={[
                  styles.switchTrack,
                  verseAlerts && pushMaster ? { backgroundColor: COLORS.cyan } : { backgroundColor: themeColor.background, borderWidth: 1, borderColor: themeColor.border },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    verseAlerts && pushMaster 
                      ? { transform: [{ translateX: 16 }], backgroundColor: "#FFFFFF" } 
                      : { transform: [{ translateX: 0 }], backgroundColor: themeColor.textMuted },
                  ]}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.void },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 16 },
  headerAction: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: "600", color: COLORS.white, letterSpacing: -0.2 },
  headerSpacer: { width: 36 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 112 },
  sectionGap: { marginTop: 28 },
  sectionHeading: { fontSize: 12, fontWeight: "700", color: COLORS.white30, textTransform: "uppercase", paddingHorizontal: 4, marginBottom: 12, letterSpacing: 0.5 },
  cardContainer: { backgroundColor: COLORS.ink, borderRadius: 16, padding: 4, borderWidth: 1, borderColor: 'transparent' },
  row: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", padding: 14, gap: 16 },
  disabledRow: { opacity: 0.4 },
  rowLeft: { flexDirection: "row", flex: 1, gap: 12 },
  rowIcon: { marginTop: 2 },
  textContent: { flex: 1 },
  rowTitle: { fontSize: 14, fontWeight: "600", color: COLORS.white90 },
  rowDescription: { fontSize: 12, fontWeight: "400", color: COLORS.white40, marginTop: 2, lineHeight: 18 },
  switchTrack: { width: 38, height: 22, borderRadius: 11, padding: 2, justifyContent: "center" },
  switchThumb: { width: 18, height: 18, borderRadius: 9 },
  divider: { height: StyleSheet.hairlineWidth, marginHorizontal: 14 }
});