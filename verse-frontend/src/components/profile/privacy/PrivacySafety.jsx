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
} from "react-native";
import {
  ArrowLeft,
  EyeOff,
  UserX,
  MessageSquare,
  Shield,
  ChevronRight,
} from "lucide-react-native";
import { ThemeTokens } from "../../../../hooks/theme";

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

export function PrivacySafety({
  anonymousDefault,
  setAnonymousDefault,
  hideDetails,
  setHideDetails,
  allowDirectMessages,
  setAllowDirectMessages,
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
          Privacy & Safety
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sharing Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Sharing</Text>

          <View style={[styles.cardContainer, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <EyeOff style={styles.rowIcon} color={themeColor.textMuted} size={20} />
                <View style={styles.textStack}>
                  <Text style={[styles.rowTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
                    Post anonymously by default
                  </Text>
                  <Text style={[styles.rowSubText, { color: themeColor.textMuted }]}>
                    Hide your name and username automatically when creating a new post.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setAnonymousDefault(!anonymousDefault)}
                activeOpacity={0.8}
                style={[
                  styles.toggleTrack,
                  anonymousDefault ? { backgroundColor: COLORS.cyan } : { backgroundColor: themeColor.background, borderWidth: 1, borderColor: themeColor.border },
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    anonymousDefault 
                      ? { transform: [{ translateX: 14 }], backgroundColor: "#FFFFFF" } 
                      : { transform: [{ translateX: 0 }], backgroundColor: themeColor.textMuted },
                  ]}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.divider, { backgroundColor: themeColor.border }]} />

            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <Shield style={styles.rowIcon} color={themeColor.textMuted} size={20} />
                <View style={styles.textStack}>
                  <Text style={[styles.rowTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
                    Hide academic details
                  </Text>
                  <Text style={[styles.rowSubText, { color: themeColor.textMuted }]}>
                    Only show your faculty on anonymous posts. Your department and level will be hidden.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setHideDetails(!hideDetails)}
                activeOpacity={0.8}
                style={[
                  styles.toggleTrack,
                  hideDetails ? { backgroundColor: COLORS.cyan } : { backgroundColor: themeColor.background, borderWidth: 1, borderColor: themeColor.border },
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    hideDetails 
                      ? { transform: [{ translateX: 14 }], backgroundColor: "#FFFFFF" } 
                      : { transform: [{ translateX: 0 }], backgroundColor: themeColor.textMuted },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Messages Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Messages</Text>

          <View style={[styles.cardContainer, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <MessageSquare style={styles.rowIcon} color={themeColor.textMuted} size={20} />
                <View style={styles.textStack}>
                  <Text style={[styles.rowTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
                    Allow direct messages
                  </Text>
                  <Text style={[styles.rowSubText, { color: themeColor.textMuted }]}>
                    Let other students message you directly from your posts or marketplace listings.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setAllowDirectMessages(!allowDirectMessages)}
                activeOpacity={0.8}
                style={[
                  styles.toggleTrack,
                  allowDirectMessages ? { backgroundColor: COLORS.cyan } : { backgroundColor: themeColor.background, borderWidth: 1, borderColor: themeColor.border },
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    allowDirectMessages 
                      ? { transform: [{ translateX: 14 }], backgroundColor: "#FFFFFF" } 
                      : { transform: [{ translateX: 0 }], backgroundColor: themeColor.textMuted },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Moderation Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Moderation</Text>

          <TouchableOpacity
            onPress={() => navigation?.navigate("BlockedAccounts")}
            activeOpacity={0.8}
            style={[styles.navigationCard, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}
          >
            <View style={styles.rowLeft}>
              <UserX style={styles.rowIcon} color={themeColor.textMuted} size={20} strokeWidth={2.5} />
              <View style={styles.textStack}>
                <Text style={[styles.navigationTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
                  Blocked accounts
                </Text>
                <Text style={[styles.rowSubText, { color: themeColor.textMuted }]}>
                  Manage the accounts {"you've"} restricted.
                </Text>
              </View>
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
  section: {
    marginBottom: 24,
    gap: 10,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.white30,
    textTransform: "uppercase",
    paddingHorizontal: 4,
    letterSpacing: 0.5,
  },
  cardContainer: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 4,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 14,
    gap: 16,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
  },
  rowIcon: {
    marginTop: 2,
    flexShrink: 0,
  },
  textStack: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white90,
  },
  rowSubText: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.white40,
    lineHeight: 16,
  },
  toggleTrack: {
    width: 38,
    height: 22,
    borderRadius: 11,
    padding: 2,
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  navigationCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 16,
  },
  navigationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white90,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 14,
  },
});