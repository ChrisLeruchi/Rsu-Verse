import React from "react";
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
}) {
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

        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerSpacer} />
      </View>


      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionGap}>
          <View style={styles.cardContainer}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Bell className="shrink-0" color={COLORS.white60} size={20} style={styles.rowIcon} />
                <View style={styles.textContent}>
                  <Text style={styles.rowTitle}>Push Notifications</Text>
                  <Text style={styles.rowDescription}>
                    Get notified about important activity
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => setPushMaster(!pushMaster)}
                style={[
                  styles.switchTrack,
                  pushMaster ? { backgroundColor: COLORS.cyan } : { backgroundColor: COLORS.white10 },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    pushMaster ? { transform: [{ translateX: 16 }], backgroundColor: COLORS.white } : { transform: [{ translateX: 0 }], backgroundColor: COLORS.white60 },
                  ]}
                />
              </Pressable>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Mail className="shrink-0" color={COLORS.white60} size={20} style={styles.rowIcon} />
                <View style={styles.textContent}>
                  <Text style={styles.rowTitle}>Weekly Recap</Text>
                  <Text style={styles.rowDescription}>
                    Catch up on trending posts and listings
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => setEmailDigest(!emailDigest)}
                style={[
                  styles.switchTrack,
                  emailDigest ? { backgroundColor: COLORS.cyan } : { backgroundColor: COLORS.white10 },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    emailDigest ? { transform: [{ translateX: 16 }], backgroundColor: COLORS.white } : { transform: [{ translateX: 0 }], backgroundColor: COLORS.white60 },
                  ]}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.sectionGap}>
          <Text style={styles.sectionHeading}>Activity</Text>

          <View style={styles.cardContainer}>
            <View style={[styles.row, !pushMaster && styles.disabledRow]}>
              <View style={styles.rowLeft}>
                <MessageSquare className="shrink-0" color={COLORS.white60} size={20} style={styles.rowIcon} />
                <View style={styles.textContent}>
                  <Text style={styles.rowTitle}>Replies & Mentions</Text>
                  <Text style={styles.rowDescription}>
                    Get notified when someone replies to your post or mentions you.
                  </Text>
                </View>
              </View>
              <Pressable
                disabled={!pushMaster}
                onPress={() => setSocialAlerts(!socialAlerts)}
                style={[
                  styles.switchTrack,
                  socialAlerts && pushMaster ? { backgroundColor: COLORS.cyan } : { backgroundColor: COLORS.white10 },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    socialAlerts && pushMaster ? { transform: [{ translateX: 16 }], backgroundColor: COLORS.white } : { transform: [{ translateX: 0 }], backgroundColor: COLORS.white60 },
                  ]}
                />
              </Pressable>
            </View>

            <View style={styles.divider} />

            <View style={[styles.row, !pushMaster && styles.disabledRow]}>
              <View style={styles.rowLeft}>
                <Flame className="shrink-0" color={COLORS.white60} size={20} style={styles.rowIcon} />
                <View style={styles.textContent}>
                  <Text style={styles.rowTitle}>Anonymous Activity</Text>
                  <Text style={styles.rowDescription}>
                    Replies and reactions on anonymous posts.
                  </Text>
                </View>
              </View>
              <Pressable
                disabled={!pushMaster}
                onPress={() => setConfessionAlerts(!confessionAlerts)}
                style={[
                  styles.switchTrack,
                  confessionAlerts && pushMaster ? { backgroundColor: COLORS.cyan } : { backgroundColor: COLORS.white10 },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    confessionAlerts && pushMaster ? { transform: [{ translateX: 16 }], backgroundColor: COLORS.white } : { transform: [{ translateX: 0 }], backgroundColor: COLORS.white60 },
                  ]}
                />
              </Pressable>
            </View>
          </View>
        </View>


        <View style={styles.sectionGap}>
          <Text style={styles.sectionHeading}>Marketplace Notifications</Text>

          <View style={styles.cardContainer}>

            <View style={[styles.row, !pushMaster && styles.disabledRow]}>
              <View style={styles.rowLeft}>
                <Store className="shrink-0" color={COLORS.white60} size={20} style={styles.rowIcon} />
                <View style={styles.textContent}>
                  <Text style={styles.rowTitle}>Marketplace Messages</Text>
                  <Text style={styles.rowDescription}>
                    Get notified when someone messages you about an item.
                  </Text>
                </View>
              </View>
              <Pressable
                disabled={!pushMaster}
                onPress={() => setMarketAlerts(!marketAlerts)}
                style={[
                  styles.switchTrack,
                  marketAlerts && pushMaster ? { backgroundColor: COLORS.cyan } : { backgroundColor: COLORS.white10 },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    marketAlerts && pushMaster ? { transform: [{ translateX: 16 }], backgroundColor: COLORS.white } : { transform: [{ translateX: 0 }], backgroundColor: COLORS.white60 },
                  ]}
                />
              </Pressable>
            </View>
          </View>
        </View>


        <View style={styles.sectionGap}>
          <Text style={styles.sectionHeading}>Verse</Text>

          <View style={styles.cardContainer}>

            <View style={[styles.row, !pushMaster && styles.disabledRow]}>
              <View style={styles.rowLeft}>
                <Megaphone className="shrink-0" color={COLORS.white60} size={20} style={styles.rowIcon} />
                <View style={styles.textContent}>
                  <Text style={styles.rowTitle}>Verse Notifications</Text>
                  <Text style={styles.rowDescription}>
                    Recieve notifications from Verse
                  </Text>
                </View>
              </View>
              <Pressable
                disabled={!pushMaster}
                onPress={() => setVerseAlerts(!verseAlerts)}
                style={[
                  styles.switchTrack,
                  verseAlerts && pushMaster ? { backgroundColor: COLORS.cyan } : { backgroundColor: COLORS.white10 },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    verseAlerts && pushMaster ? { transform: [{ translateX: 16 }], backgroundColor: COLORS.white } : { transform: [{ translateX: 0 }], backgroundColor: COLORS.white60 },
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
    letterSpacing: -0.2,
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
  cardContainer: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.white5,
    padding: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 14,
    gap: 16,
  },
  disabledRow: {
    opacity: 0.3,
  },
  rowLeft: {
    flexDirection: "row",
    flex: 1,
    gap: 12,
  },
  rowIcon: {
    marginTop: 2,
  },
  textContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white90,
  },
  rowDescription: {
    fontSize: 12,
    fontWeight: "300",
    color: COLORS.white40,
    marginTop: 2,
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
});