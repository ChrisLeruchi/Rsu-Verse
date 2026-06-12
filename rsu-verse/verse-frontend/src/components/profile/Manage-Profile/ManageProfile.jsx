import React from "react";
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

const COLORS = {
  void: "#0A0A0A",
  void80: "rgba(10, 10, 10, 0.8)",
  ink: "#161618", 
  ink40: "rgba(22, 22, 24, 0.4)",
  cyan:"#17CB49", 
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

export function ManageProfile({ isSellerActive, setIsSellerActive, navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.void} />
      
      
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.navigate('Profile')}
          style={styles.headerAction}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={COLORS.white60} strokeWidth={2.5} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <TouchableOpacity style={styles.headerAction} activeOpacity={0.7}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      
        <View style={styles.avatarSection}>
          <TouchableOpacity activeOpacity={0.9} style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>CI</Text>
            </View>

            <View style={styles.cameraBadge}>
              <Camera size={14} color="white" fill="white" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
          <Text style={styles.avatarTapText}>Tap</Text>
        </View>

     
        <View style={styles.sectionGap}>
 
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              defaultValue="Christopher Igwe"
              style={styles.input}
              placeholder="Name seen on public actions"
              placeholderTextColor={COLORS.white30}
              keyboardAppearance="dark"
            />
          </View>

   
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.usernameContainer}>
              <Text style={styles.usernamePrefix}>@</Text>
              <TextInput
                defaultValue="chris_igwe"
                style={[styles.input, styles.usernameInput]}
                placeholder="your_handle"
                placeholderTextColor={COLORS.white30}
                autoCapitalize="none"
                keyboardAppearance="dark"
              />
            </View>
          </View>


          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              defaultValue="Coffee addict."
              style={[styles.input, styles.textarea]}
              placeholder="Tell the campus who you are..."
              placeholderTextColor={COLORS.white30}
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
              keyboardAppearance="dark"
            />
          </View>
        </View>

    
        <View style={styles.sectionGap}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Student Profile</Text>
            <View style={styles.verifiedBadge}>
              <GraduationCap size={14} color={COLORS.white40} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>

          <View style={styles.credentialsCard}>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowLabel}>Faculty</Text>
              <Text style={styles.cardRowValue}>Engineering</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowLabel}>Department</Text>
              <Text style={styles.cardRowValue}>Computer Engineering</Text>
            </View>
            <View style={[styles.cardRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.cardRowLabel}>Level</Text>
              <Text style={styles.cardRowValue}>500 Level</Text>
            </View>
          </View>
          <Text style={styles.infoFooterText}>
            Academic verification details are extracted from portal registration data and cannot be modified manually.
          </Text>
        </View>

        <View style={styles.sectionGap}>
          <Text style={styles.sectionHeading}>Marketplace Settings</Text>
          
          <View style={styles.marketplaceCard}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleRowLeft}>
                <Store color={COLORS.white60} size={20} style={styles.storeIcon} />
                <View style={styles.toggleTextContent}>
                  <Text style={styles.toggleTitle}>Activate Campus Storefront</Text>
                  <Text style={styles.toggleDescription}>
                    Enables verification options to list gadgets, books, or fashion in the RSU Marketplace.
                  </Text>
                </View>
              </View>

         
              <Pressable
                onPress={() => setIsSellerActive(!isSellerActive)}
                style={[
                  styles.switchTrack,
                  isSellerActive ? { backgroundColor: COLORS.cyan } : { backgroundColor: COLORS.white10 },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    isSellerActive ? { transform: [{ translateX: 16 }], backgroundColor: COLORS.white } : { transform: [{ translateX: 0 }], backgroundColor: COLORS.white60 },
                  ]}
                />
              </Pressable>
            </View>

    
            {isSellerActive && (
              <View style={styles.sellerFieldsContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Shop / Brand Name</Text>
                  <TextInput
                    placeholder="e.g., Chris Logistics or Threads Hub"
                    placeholderTextColor={COLORS.white30}
                    style={[styles.input, styles.nestedInput]}
                    keyboardAppearance="dark"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Contact Link (WhatsApp / Telegram)</Text>
                  <View style={styles.usernameContainer}>
                    <Globe size={16} color={COLORS.white30} style={styles.globeIcon} />
                    <TextInput
                      placeholder="https://wa.me/..."
                      placeholderTextColor={COLORS.white30}
                      style={[styles.input, styles.nestedInput, styles.globeInput]}
                      autoCapitalize="none"
                      keyboardType="url"
                      keyboardAppearance="dark"
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
    backgroundColor: COLORS.void,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.void80,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white5,
  },
  headerAction: {
    padding: 4,
    minWidth: 40,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
    textAlign: "center",
    flex: 1,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.white,
    textAlign: "right",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 112, 
  },
  avatarSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#27272A", 
    borderWidth: 2,
    borderColor: COLORS.white10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: "300",
    color: COLORS.white40,
    letterSpacing: -0.5,
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 8,
    backgroundColor: COLORS.ink,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  avatarTapText: {
    fontSize: 14,
    color: COLORS.white40,
    marginTop: 12,
    letterSpacing: 0.5,
  },
  sectionGap: {
    marginTop: 28,
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
  input: {
    width: "100%",
    backgroundColor: COLORS.ink40,
    borderWidth: 1,
    borderColor: COLORS.white5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.white,
    
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
    color: COLORS.white30,
    fontWeight: "300",
    zIndex: 1,
  },
  usernameInput: {
    paddingLeft: 32,
  },
  textarea: {
    minHeight: 80,
    paddingTop: 10,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white30,
    textTransform: "uppercase",
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 99,
    gap: 4,
  },
  verifiedText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white40,
  },
  credentialsCard: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.white5,
    overflow: "hidden",
  },
  cardRow: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.01)",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white5,
  },
  cardRowLabel: {
    fontSize: 14,
    fontWeight: "300",
    color: COLORS.white60,
  },
  cardRowValue: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white90,
  },
  infoFooterText: {
    fontSize: 12,
    color: COLORS.white30,
    paddingHorizontal: 4,
    marginTop: 12,
    lineHeight: 16,
  },
  marketplaceCard: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.white5,
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
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  sellerFieldsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.white5,
  },
  nestedInput: {
    backgroundColor: "rgba(10, 10, 10, 0.4)", 
  },
  globeIcon: {
    position: "absolute",
    left: 14,
    zIndex: 1,
  },
  globeInput: {
    paddingLeft: 40,
  },
});