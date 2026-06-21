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
import { ArrowLeft, Camera, Store, GraduationCap, Globe } from "lucide-react-native";
import { ThemeTokens } from "../../../theme";

const COLORS = {
  void: "#000000",
  cyan: "#17CB49",
  white: "#FFFFFF",
};

export function ManageProfile({ 
  isSellerActive, 
  setIsSellerActive, 
  navigation, 
  bio, 
  setBio, 
  displayName, 
  setDisplayName, 
  username, 
  setUsername,
  selectedTheme,
  shopName = "",
  setShopName,
  contactLink = "",
  setContactLink
}) {
  const [localBio, setLocalBio] = useState(bio || "");
  const [localDisplayName, setLocalDisplayName] = useState(displayName || "");
  const [localUsername, setLocalUsername] = useState(username || "");
  const [localShopName, setLocalShopName] = useState(shopName);
  const [localContactLink, setLocalContactLink] = useState(contactLink);

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  const handleSave = () => {
    setDisplayName?.(localDisplayName);
    setUsername?.(localUsername);
    setBio?.(localBio);
    setShopName?.(localShopName);
    setContactLink?.(localContactLink);
    navigation?.goBack();
  };

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
  
  const isDisabled = localDisplayName.trim() === '' || localUsername.trim() === '';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColor.background }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={themeColor.background} 
      />
      
      {/* Structural Header */}
      <View style={[styles.header, { backgroundColor: themeColor.background }]}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.headerAction}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={themeColor.textPrimary} strokeWidth={2.5} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: isDark ? COLORS.white : themeColor.textPrimary }]}>Edit Profile</Text>

        <TouchableOpacity 
          style={styles.headerAction} 
          activeOpacity={0.7}
          disabled={isDisabled} 
          onPress={handleSave}
        >
          <Text style={[
            styles.saveButtonText, 
            { color: isDisabled ? themeColor.textMuted : COLORS.cyan },
            isDisabled && { opacity: 0.4 }
          ]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
      
        {/* Avatar Setup Image Canvas */}
        <View style={styles.avatarSection}>
          <TouchableOpacity activeOpacity={0.9} style={styles.avatarWrapper}>
            <View style={[styles.avatarCircle, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
              <Text style={[styles.avatarInitials, { color: themeColor.textMuted }]}>CI</Text>
            </View>

            <View style={[styles.cameraBadge, { backgroundColor: isDark ? themeColor.surface : COLORS.white, borderColor: themeColor.border }]}>
              <Camera size={13} color={isDark ? COLORS.white : COLORS.void} strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
          <Text style={[styles.avatarTapText, { color: themeColor.textMuted }]}>Change Photo</Text>
        </View>

        {/* Public Identifiers Meta Block */}
        <View style={styles.sectionGap}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: themeColor.textMuted }]}>Display Name</Text>
            <TextInput
              value={localDisplayName}
              onChangeText={setLocalDisplayName}
              style={[styles.input, { backgroundColor: themeColor.surface, borderColor: themeColor.border, color: isDark ? COLORS.white : themeColor.textPrimary }]}
              placeholder="Name seen on public actions"
              placeholderTextColor={themeColor.textMuted}
              keyboardAppearance={isDark ? "dark" : "light"}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: themeColor.textMuted }]}>Username</Text>
            <View style={styles.usernameContainer}>
              <Text style={[styles.usernamePrefix, { color: themeColor.textMuted }]}>@</Text>
              <TextInput
                value={localUsername}
                onChangeText={setLocalUsername}
                style={[
                  styles.input, 
                  styles.usernameInput, 
                  { backgroundColor: themeColor.surface, borderColor: themeColor.border, color: isDark ? COLORS.white : themeColor.textPrimary }
                ]}
                placeholder="your_handle"
                placeholderTextColor={themeColor.textMuted}
                autoCapitalize="none"
                keyboardAppearance={isDark ? "dark" : "light"}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: themeColor.textMuted }]}>Bio</Text>
            <TextInput
              value={localBio}
              onChangeText={setLocalBio}
              style={[
                styles.input, 
                styles.textarea, 
                { backgroundColor: themeColor.surface, borderColor: themeColor.border, color: isDark ? COLORS.white : themeColor.textPrimary }
              ]}
              placeholder="Tell the campus who you are..."
              placeholderTextColor={themeColor.textMuted}
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
              keyboardAppearance={isDark ? "dark" : "light"}
            />
          </View>
        </View>

        {/* Read-Only Academic Block */}
        <View style={styles.sectionGap}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Student Profile</Text>
            <View style={[styles.verifiedBadge, { backgroundColor: themeColor.surface }]}>
              <GraduationCap size={13} color={COLORS.cyan} />
              <Text style={[styles.verifiedText, { color: COLORS.cyan }]}>Verified</Text>
            </View>
          </View>

          <View style={[styles.credentialsCard, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
            <View style={[styles.cardRow, { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: themeColor.border }]}>
              <Text style={[styles.cardRowLabel, { color: themeColor.textMuted }]}>Faculty</Text>
              <Text style={[styles.cardRowValue, { color: isDark ? COLORS.white : themeColor.textPrimary }]}>Engineering</Text>
            </View>
            <View style={[styles.cardRow, { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: themeColor.border }]}>
              <Text style={[styles.cardRowLabel, { color: themeColor.textMuted }]}>Department</Text>
              <Text style={[styles.cardRowValue, { color: isDark ? COLORS.white : themeColor.textPrimary }]}>Computer Engineering</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={[styles.cardRowLabel, { color: themeColor.textMuted }]}>Level</Text>
              <Text style={[styles.cardRowValue, { color: isDark ? COLORS.white : themeColor.textPrimary }]}>500 Level</Text>
            </View>
          </View>
          <Text style={[styles.infoFooterText, { color: themeColor.textMuted }]}>
            Academic verification details are extracted from portal registration data and cannot be modified manually.
          </Text>
        </View>

        {/* Marketplace Merchant Section */}
        <View style={styles.sectionGap}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Marketplace Settings</Text>
          
          <View style={[styles.marketplaceCard, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleRowLeft}>
                <Store color={themeColor.textMuted} size={18} style={styles.storeIcon} />
                <View style={styles.toggleTextContent}>
                  <Text style={[styles.toggleTitle, { color: isDark ? COLORS.white : themeColor.textPrimary }]}>Activate Campus Storefront</Text>
                  <Text style={[styles.toggleDescription, { color: themeColor.textMuted }]}>
                    Enables verification options to list gadgets, books, or fashion in the RSU Marketplace.
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => setIsSellerActive?.(!isSellerActive)}
                style={[
                  styles.switchTrack,
                  isSellerActive ? { backgroundColor: COLORS.cyan } : { backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    isSellerActive ? { transform: [{ translateX: 16 }], backgroundColor: COLORS.white } : { transform: [{ translateX: 0 }], backgroundColor: isDark ? COLORS.white : themeColor.textMuted },
                  ]}
                />
              </Pressable>
            </View>

            {isSellerActive && (
              <View style={[styles.sellerFieldsContainer, { borderTopColor: themeColor.border }]}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: themeColor.textMuted }]}>Shop / Brand Name</Text>
                  <TextInput
                    value={localShopName}
                    onChangeText={setLocalShopName}
                    placeholder="e.g., Chris Logistics or Threads Hub"
                    placeholderTextColor={themeColor.textMuted}
                    style={[styles.input, styles.nestedInput, { backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.03)", borderColor: themeColor.border, color: isDark ? COLORS.white : themeColor.textPrimary }]}
                    keyboardAppearance={isDark ? "dark" : "light"}
                  />
                </View>
                
                <View style={[styles.inputGroup, { marginBottom: 0 }]}>
                  <Text style={[styles.label, { color: themeColor.textMuted }]}>Contact Link (WhatsApp / Telegram)</Text>
                  <View style={styles.usernameContainer}>
                    <Globe size={16} color={themeColor.textMuted} style={styles.globeIcon} />
                    <TextInput
                      value={localContactLink}
                      onChangeText={setLocalContactLink}
                      placeholder="https://wa.me/..."
                      placeholderTextColor={themeColor.textMuted}
                      style={[
                        styles.input, 
                        styles.nestedInput, 
                        styles.globeInput, 
                        { backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.03)", borderColor: themeColor.border, color: isDark ? COLORS.white : themeColor.textPrimary }
                      ]}
                      autoCapitalize="none"
                      keyboardType="url"
                      keyboardAppearance={isDark ? "dark" : "light"}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerAction: {
    padding: 4,
    minWidth: 48,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 112, 
  },
  avatarSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontSize: 26,
    fontWeight: "500",
    letterSpacing: -0.5,
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 6,
    borderRadius: 99,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatarTapText: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 10,
  },
  sectionGap: {
    marginTop: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    paddingHorizontal: 2,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "400",
  },
  usernameContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  usernamePrefix: {
    position: "absolute",
    left: 14,
    fontSize: 14,
    fontWeight: "500",
    zIndex: 1,
  },
  usernameInput: {
    paddingLeft: 32,
  },
  textarea: {
    minHeight: 88,
    paddingTop: 12,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    marginBottom: 8,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 99,
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: "600",
  },
  credentialsCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardRow: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardRowLabel: {
    fontSize: 14,
    fontWeight: "400",
  },
  cardRowValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  infoFooterText: {
    fontSize: 12,
    fontWeight: "400",
    paddingHorizontal: 4,
    marginTop: 8,
    lineHeight: 18,
  },
  marketplaceCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  toggleRowLeft: {
    flexDirection: "row",
    flex: 1,
    gap: 12,
  },
  storeIcon: {
    marginTop: 2,
  },
  toggleTextContent: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  toggleDescription: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  sellerFieldsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  nestedInput: {
    borderWidth: 1,
  },
  globeIcon: {
    position: "absolute",
    left: 14,
    zIndex: 1,
  },
  globeInput: {
    paddingLeft: 38,
  },
});