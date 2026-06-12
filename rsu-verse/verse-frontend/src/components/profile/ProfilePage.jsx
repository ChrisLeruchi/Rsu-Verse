import React, {useRef, useCallback, useState} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Modal } from "react-native";
import { Bell, UserCircle2, LockKeyhole, ArrowRight, NotebookText, SunMoon, EyeOff, HelpCircle, Mail, ShieldCheck, GraduationCap, Flame, MessageSquare, UserCheck, ChevronDown, X } from "lucide-react-native";

export function ProfilePage({ navigation, selectedTheme }) {
  const [isStatsOpen, setIsStatsOpen] = useState(false);

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
      <StatusBar barStyle="light-content" backgroundColor="#09090B" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Profile</Text>

        <View style={styles.verifiedBadge}>
          <ShieldCheck size={14} color="#17CB49" />
          <Text style={styles.verifiedText}>Verified Student</Text>
        </View>
      </View>

      <ScrollView
        style={styles.mainContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroRow}>
          <View style={styles.avatarPlaceholder} />
          <View style={styles.identityMeta}>
            <View style={styles.profileNameRow}>
              <Text style={styles.profileName}>Christopher Igwe</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsStatsOpen(true)}
                style={styles.statsToggleBtn}
              >
                <ChevronDown size={18} color="rgba(255, 255, 255, 0.4)" />
              </TouchableOpacity>
            </View>
            <Text style={styles.bio}>13th disciple  📿 </Text>

            <View style={styles.tagRow}>
              <View style={styles.deptTag}>
                <GraduationCap size={12} color="rgba(255, 255, 255, 0.7)" />
                <Text style={styles.tagText}>Computer Engineering</Text>
              </View>
              <View style={styles.levelTag}>
                <Text style={styles.levelTagText}>500 Level</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Account</Text>
          <View style={styles.cardGroup}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Manage_Profile")}
              style={styles.rowItemBordered}
            >
              <View style={styles.rowLeftGroup}>
                <UserCircle2 size={18} color="rgba(255, 255, 255, 0.8)" strokeWidth={1.8} />
                <Text style={styles.rowText}>Manage Profile</Text>
              </View>
              <ArrowRight size={18} color="rgba(255, 255, 255, 0.4)" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Manage_Security")}
              style={styles.rowItemBordered}
            >
              <View style={styles.rowLeftGroup}>
                <LockKeyhole size={18} color="rgba(255, 255, 255, 0.8)" strokeWidth={1.8} />
                <Text style={styles.rowText}>Password & Security</Text>
              </View>
              <ArrowRight size={18} color="rgba(255, 255, 255, 0.4)" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Notification")}
              style={styles.rowItemClean}
            >
              <View style={styles.rowLeftGroup}>
                <Bell size={18} color="rgba(255, 255, 255, 0.8)" strokeWidth={1.8} />
                <Text style={styles.rowText}>Notifications</Text>
              </View>
              <ArrowRight size={18} color="rgba(255, 255, 255, 0.4)" />
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Preferences</Text>
          <View style={styles.cardGroup}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Theme_Management")}
              style={styles.rowItemBordered}
            >
              <View style={styles.rowLeftGroup}>
                <SunMoon size={18} color="rgba(255, 255, 255, 0.8)" strokeWidth={1.8} />
                <Text style={styles.rowTextSubsequent}>Theme</Text>
              </View>
              <View style={styles.rowRightBadgeGroup}>
                <Text style={styles.badgeLabelText}>{selectedTheme}</Text>
                <ArrowRight size={18} color="rgba(255, 255, 255, 0.4)" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Privacy_Management")}
              style={styles.rowItemClean}
            >
              <View style={styles.rowLeftGroup}>
                <EyeOff size={18} color="rgba(255, 255, 255, 0.8)" strokeWidth={1.8} />
                <Text style={styles.rowTextSubsequent}>Privacy & Safety</Text>
              </View>
              <ArrowRight size={18} color="rgba(255, 255, 255, 0.4)" />
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Support</Text>
          <View style={styles.cardGroup}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("About_Verse")}
              style={styles.rowItemBordered}
            >
              <View style={styles.rowLeftGroup}>
                <NotebookText size={18} color="rgba(255, 255, 255, 0.8)" strokeWidth={1.8} />
                <Text style={styles.rowTextSubsequent}>About Verse</Text>
              </View>
              <ArrowRight size={18} color="rgba(255, 255, 255, 0.4)" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Help_Center")}
              style={styles.rowItemBordered}
            >
              <View style={styles.rowLeftGroup}>
                <HelpCircle size={18} color="rgba(255, 255, 255, 0.8)" strokeWidth={1.8} />
                <Text style={styles.rowTextSubsequent}>Help Center</Text>
              </View>
              <ArrowRight size={18} color="rgba(255, 255, 255, 0.4)" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Contact_Us")}
              style={styles.rowItemClean}
            >
              <View style={styles.rowLeftGroup}>
                <Mail size={18} color="rgba(255, 255, 255, 0.8)" strokeWidth={1.8} />
                <Text style={styles.rowTextSubsequent}>Contact Us</Text>
              </View>
              <ArrowRight size={18} color="rgba(255, 255, 255, 0.4)" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isStatsOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsStatsOpen(false)}
      >
        <View style={styles.modalOverlay}>

          <TouchableOpacity
            style={styles.backdropPressable}
            activeOpacity={1}
            onPress={() => setIsStatsOpen(false)}
          />

          <View style={styles.bottomSheetContainer}>

            <View style={styles.sheetHandle} />

            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Your Stats</Text>
              <TouchableOpacity onPress={() => setIsStatsOpen(false)}>
                <X size={20} color="rgba(255, 255, 255, 0.4)" />
              </TouchableOpacity>
            </View>

            <View style={styles.metricsList}>
              <View style={styles.metricBox}>
                <View style={styles.metricHeaderRow}>
                  <UserCheck size={16} color="#17CB49" />
                  <Text style={[styles.metricLabel, { color: "#17CB49" }]}>Reputation</Text>
                </View>
                <Text style={styles.metricValue}>1,420</Text>
              </View>

              <View style={styles.metricBox}>
                <View style={styles.metricHeaderRow}>
                  <MessageSquare size={16} color="rgba(255, 255, 255, 0.6)" />
                  <Text style={styles.metricLabel}>My Verses</Text>
                </View>
                <Text style={styles.metricValue}>48 posts</Text>
              </View>

              <View style={styles.metricBox}>
                <View style={styles.metricHeaderRow}>
                  <Flame size={16} color="#F59E0B" />
                  <Text style={[styles.metricLabel, { color: "#F59E0B" }]}>Confessions made</Text>
                </View>
                <Text style={styles.metricValue}>12</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#09090B",
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  header: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "rgba(9, 9, 11, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(23, 203, 73, 0.1)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  verifiedText: {
    fontSize: 11,
    color: "#17CB49",
    fontWeight: "600",
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    marginBottom: 24,
    gap: 16,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#27272A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  identityMeta: {
    flexDirection: "column",
    flex: 1,
  },
  profileNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  statsToggleBtn: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  bio: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "300",
    marginTop: 2,
  },
  sectionContainer: {
    flexDirection: "column",
    marginBottom: 24,
    gap: 12,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  deptTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  tagText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
  levelTag: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  levelTagText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
    fontWeight: "600",
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "flex-end",
  },
  backdropPressable: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomSheetContainer: {
    backgroundColor: "#121214",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    color: "#FFFFFF",
  },
  metricsList: {
    flexDirection: "column",
    gap: 12,
  },
  metricBox: {
    width: "100%",
    backgroundColor: "#1A1A1E",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
    padding: 16,
  },
  metricHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.4)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },

  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 4,
  },
  cardGroup: {
    backgroundColor: "#16161A",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    overflow: "hidden",
  },
  rowItemBordered: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  rowItemClean: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  rowLeftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  rowTextSubsequent: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  rowRightBadgeGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badgeLabelText: {
    fontSize: 14,
    fontWeight: "300",
    color: "rgba(255, 255, 255, 0.4)",
  },
});