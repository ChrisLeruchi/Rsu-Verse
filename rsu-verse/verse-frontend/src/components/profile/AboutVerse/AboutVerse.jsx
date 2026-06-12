import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import {
  ArrowLeft,
  BookOpen,
  ShieldQuestion, 
  FileText,
  Heart,
} from "lucide-react-native";

import VerseLogo from '../../../../public/favicon.png'

const COLORS = {
  void: "#0A0A0A",
  void80: "rgba(10, 10, 10, 0.8)",
  ink: "#161618",
  white: "#FFFFFF",
  white5: "rgba(255, 255, 255, 0.05)",
  white30: "rgba(255, 255, 255, 0.3)",
  white40: "rgba(255, 255, 255, 0.4)",
  white50: "rgba(255, 255, 255, 0.5)",
  white60: "rgba(255, 255, 255, 0.6)",
  white90: "rgba(255, 255, 255, 0.9)",
};

export function AboutVerse({ currentYear, navigation }) {
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

        <Text style={styles.headerTitle}>About Verse</Text>
        <View style={styles.headerSpacer} />
      </View>

    
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      
        <View style={styles.heroSection}>
          <View style={styles.logoWrapper}>
            <Image
              source={VerseLogo} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.heroTitle}>RSU Verse</Text>
          <Text style={styles.heroVersion}>Version 1.0.0</Text>
        </View>

       
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>
            A modern campus space for RSU students to share thoughts, connect
            anonymously, and discover what’s happening around school.
          </Text>
        </View>

        <View style={styles.linksSection}>
          <Text style={styles.sectionHeading}>Safety & Terms</Text>

          <View style={styles.cardContainer}>
      
            <TouchableOpacity
              onPress={() => navigation?.navigate("CommunityGuidelines")}
              activeOpacity={0.8}
              style={[styles.rowItem, styles.rowBorder]}
            >
              <View style={styles.rowLeft}>
                <BookOpen size={18} color={COLORS.white50} />
                <Text style={styles.rowTitle}>Community Guidelines</Text>
              </View>
              <Text style={styles.rowActionText}>Read</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation?.navigate("TermsOfService")}
              activeOpacity={0.8}
              style={[styles.rowItem, styles.rowBorder]}
            >
              <View style={styles.rowLeft}>
                <FileText size={18} color={COLORS.white50} />
                <Text style={styles.rowTitle}>Terms of Service</Text>
              </View>
              <Text style={styles.rowActionText}>View</Text>
            </TouchableOpacity>

           
            <TouchableOpacity
              onPress={() => navigation?.navigate("PrivacyPolicy")}
              activeOpacity={0.8}
              style={styles.rowItem}
            >
              <View style={styles.rowLeft}>
                <ShieldQuestion size={18} color={COLORS.white50} />
                <Text style={styles.rowTitle}>Privacy Policy</Text>
              </View>
              <Text style={styles.rowActionText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.footerSection}>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Built for Students of RSU</Text>
            <Heart size={12} color={COLORS.white} fill={COLORS.white} style={styles.heartIcon} />
          </View>
          <Text style={styles.footerText}>
            © {currentYear} RSU Verse. All rights reserved.
          </Text>
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
    letterSpacing: -0.4,
  },
  headerSpacer: {
    width: 36,  
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 112, 
  },
  heroSection: {
    alignItems: "center",
    paddingVertical: 16,
  },
  logoWrapper: {
    width: 112,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logoImage: {
    width: "140%",
    height: "140%",
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: -0.4,
  },
  heroVersion: {
    fontSize: 14,
    color: COLORS.white40,
    marginTop: 4,
  },
  descriptionSection: {
    maxWidth: 290,
    alignSelf: "center",
    paddingHorizontal: 8,
    marginBottom: 32,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.white60,
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: -0.16,
  },
  linksSection: {
    gap: 10,
    marginBottom: 24,
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
    overflow: "hidden",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white5,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white90,
  },
  rowActionText: {
    fontSize: 14,
    color: COLORS.white30,
  },
  footerSection: {
    marginTop: "auto",
    paddingTop: 24,
    alignItems: "center",
    gap: 6,
    opacity: 0.3,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "300",
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  heartIcon: {
    marginLeft: 4,
  },
});