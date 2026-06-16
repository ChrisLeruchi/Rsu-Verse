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
          onPress={() => navigation?.goBack()} style={styles.headerAction}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={COLORS.white60} strokeWidth={2.5} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Privacy & Safety</Text>
        <View style={styles.headerSpacer} />
      </View>


      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Sharing</Text>

          <View style={styles.cardContainer}>

            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <EyeOff style={styles.rowIcon} color={COLORS.white60} size={20} />
                <View style={styles.textStack}>
                  <Text style={styles.rowTitle}>Post anonymously by default</Text>
                  <Text style={styles.rowSubText}>
                    Hide your name and username automatically when creating a new post.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setAnonymousDefault(!anonymousDefault)}
                activeOpacity={0.8}
                style={[
                  styles.toggleTrack,
                  anonymousDefault ? styles.toggleTrackActive : styles.toggleTrackInactive,
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    anonymousDefault ? styles.toggleThumbActive : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
            </View>


            <View style={styles.divider} />


            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <Shield style={styles.rowIcon} color={COLORS.white60} size={20} />
                <View style={styles.textStack}>
                  <Text style={styles.rowTitle}>Hide academic details</Text>
                  <Text style={styles.rowSubText}>
                    Only show your faculty on anonymous posts. Your department and level will be hidden.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setHideDetails(!hideDetails)}
                activeOpacity={0.8}
                style={[
                  styles.toggleTrack,
                  hideDetails ? styles.toggleTrackActive : styles.toggleTrackInactive,
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    hideDetails ? styles.toggleThumbActive : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Messages</Text>

          <View style={styles.cardContainer}>
            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <MessageSquare style={styles.rowIcon} color={COLORS.white60} size={20} />
                <View style={styles.textStack}>
                  <Text style={styles.rowTitle}>Allow direct messages</Text>
                  <Text style={styles.rowSubText}>
                    Let other students message you directly from your posts or marketplace listings.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setAllowDirectMessages(!allowDirectMessages)}
                activeOpacity={0.8}
                style={[
                  styles.toggleTrack,
                  allowDirectMessages ? styles.toggleTrackActive : styles.toggleTrackInactive,
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    allowDirectMessages ? styles.toggleThumbActive : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Moderation</Text>

          <TouchableOpacity
            onPress={() => navigation?.navigate("BlockedAccounts")}
            activeOpacity={0.8}
            style={styles.navigationCard}
          >
            <View style={styles.rowLeft}>
              <UserX style={styles.rowIcon} color={COLORS.white60} size={20} strokeWidth={2.5} />
              <View style={styles.textStack}>
                <Text style={styles.navigationTitle}>Blocked accounts</Text>
                <Text style={styles.rowSubText}>
                  {`Manage the accounts you've restricted.`}
                </Text>
              </View>
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
    backgroundColor: COLORS.void,
  },
  headerAction: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
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
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white30,
    textTransform: "uppercase",
    paddingHorizontal: 4,
  },
  cardContainer: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.white5,
    padding: 4,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "start",
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
    fontWeight: "500",
    color: COLORS.white90,
  },
  rowSubText: {
    fontSize: 12,
    fontWeight: "300",
    color: COLORS.white40,

  },

  toggleTrack: {
    width: 40,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
  },
  toggleTrackActive: {
    backgroundColor: COLORS.cyan,
  },
  toggleTrackInactive: {
    backgroundColor: COLORS.white10,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  toggleThumbActive: {
    transform: [{ translateX: 16 }],
    backgroundColor: COLORS.white,
  },
  toggleThumbInactive: {
    transform: [{ translateX: 0 }],
    backgroundColor: COLORS.white60,
  },

  navigationCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    padding: 16,
  },
  navigationTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white90,
  },
});