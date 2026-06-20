import React, { useRef, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Modal, Pressable } from "react-native";
import { ShieldCheck, GraduationCap, Flame, MessageSquare, UserCheck, ChevronDown, X, Pencil } from "lucide-react-native";
import { ThemeTokens } from "../../theme";

export function ProfilePage({ navigation, selectedTheme, bio, displayName }) {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const scrollViewRef = useRef(null);

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  useFocusEffect(
    useCallback(() => {
      return () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
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
        <Text style={[styles.headerTitle, { color: themeColor.textPrimary }]}>Your Profile</Text>

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
          <View style={[styles.avatarPlaceholder, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]} />
          
          <View style={styles.identityMeta}>
            <View style={styles.profileNameRow}>
              <Text style={[styles.profileName, { color: themeColor.textPrimary }]}>{displayName}</Text>
              
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsStatsOpen(true)}
                style={styles.statsToggleBtn}
              >
                <ChevronDown size={18} color={themeColor.textPrimary} />
              </TouchableOpacity>

              <Pressable
                onPress={() => navigation.navigate("Manage_Profile")}
                style={({ pressed }) => [
                  styles.editButton,
                  { opacity: pressed ? 0.7 : 1 }
                ]}
              >
                <Pencil size={16} color={themeColor.textSecondary} />
              </Pressable>
            </View>
            
            <Text style={[styles.bio, { color: themeColor.textSecondary }]}>{bio}</Text>

            <View style={styles.tagRow}>
              <View style={[styles.deptTag, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
                <GraduationCap size={12} color={themeColor.textMuted} />
                <Text style={[styles.tagText, { color: themeColor.textPrimary }]}>Computer Engineering</Text>
              </View>
              <View style={styles.levelTag}>
                <Text style={styles.levelTagText}>500 Level</Text>
              </View>
            </View>
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

          <View style={[styles.bottomSheetContainer, { backgroundColor: themeColor.background, borderColor: themeColor.border }]}>
            <View style={[styles.sheetHandle, { backgroundColor: themeColor.border }]} />

            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: themeColor.textPrimary }]}>Your Stats</Text>
              <TouchableOpacity onPress={() => setIsStatsOpen(false)}>
                <X size={20} color={themeColor.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.metricsList}>
              <View style={[styles.metricBox, { backgroundColor: themeColor.surface }]}>
                <View style={styles.metricHeaderRow}>
                  <UserCheck size={16} color="#17CB49" />
                  <Text style={[styles.metricLabel, { color: "#17CB49" }]}>Reputation</Text>
                </View>
                <Text style={[styles.metricValue, { color: themeColor.textPrimary }]}>1,420</Text>
              </View>

              <View style={[styles.metricBox, { backgroundColor: themeColor.surface }]}>
                <View style={styles.metricHeaderRow}>
                  <MessageSquare size={16} color={themeColor.textMuted} />
                  <Text style={[styles.metricLabel, { color: themeColor.textSecondary }]}>My Verses</Text>
                </View>
                <Text style={[styles.metricValue, { color: themeColor.textPrimary }]}>48 posts</Text>
              </View>

              <View style={[styles.metricBox, { backgroundColor: themeColor.surface }]}>
                <View style={styles.metricHeaderRow}>
                  <Flame size={16} color="#F59E0B" />
                  <Text style={[styles.metricLabel, { color: "#F59E0B" }]}>Confessions made</Text>
                </View>
                <Text style={[styles.metricValue, { color: themeColor.textPrimary }]}>12</Text>
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
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
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
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 16,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
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
  },
  statsToggleBtn: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    padding: 4,
    marginLeft: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  bio: {
    fontSize: 13,
    fontWeight: "400",
    marginTop: 4,
    lineHeight: 18,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  deptTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  levelTag: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  levelTagText: {
    color: "#F59E0B",
    fontSize: 11,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sheetTitle: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
  },
  metricsList: {
    flexDirection: "column",
    gap: 12,
  },
  metricBox: {
    width: "100%",
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
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
});