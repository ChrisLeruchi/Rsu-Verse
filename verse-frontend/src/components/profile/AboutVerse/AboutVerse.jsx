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
  Image,
} from "react-native";
import {
  ArrowLeft,
  BookOpen,
  ShieldQuestion,
  FileText,
  Heart,
} from "lucide-react-native";
import { ThemeTokens } from "../../../../hooks/theme";

import VerseLogo from '../../../assets/images/favicon.png';

const COLORS = {
  void: "#000000",
  ink: "#1A1A1A",
  cyan: "#17CB49",
  white: "#FFFFFF",
};

export function AboutVerse({ currentYear, navigation, selectedTheme }) {
  const scrollViewRef = useRef(null);
  const [localInput, setLocalInput] = useState("");

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  const safetyLinks = [
    {
      id: "guidelines",
      title: "Community Guidelines",
      action: "Read",
      target: "CommunityGuidelines",
      Icon: BookOpen,
    },
    {
      id: "terms",
      title: "Terms of Service",
      action: "View",
      target: "TermsOfService",
      Icon: FileText,
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      action: "View",
      target: "PrivacyPolicy",
      Icon: ShieldQuestion,
    },
  ];

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

      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColor.background }]}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()} 
          style={styles.headerAction}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={isDark ? COLORS.white : themeColor.textPrimary} strokeWidth={2.5} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: isDark ? COLORS.white : themeColor.textPrimary }]}>About Verse</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Hero */}
        <View style={styles.heroSection}>
          <View style={styles.logoWrapper}>
            <Image
              source={VerseLogo}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.heroTitle, { color: isDark ? COLORS.white : themeColor.textPrimary }]}>RSU Verse</Text>
          <Text style={[styles.heroVersion, { color: themeColor.textMuted }]}>Version 1.0.0</Text>
        </View>

        {/* Value Proposition Statement */}
        <View style={styles.descriptionSection}>
          <Text style={[styles.descriptionText, { color: themeColor.textMuted }]}>
            A modern campus space for RSU students to share thoughts, connect
            anonymously, and discover what’s happening around school.
          </Text>
        </View>

        {/* Document Links Section */}
        <View style={styles.linksSection}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Safety & Terms</Text>

          <View style={[styles.cardContainer, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
            {safetyLinks.map((link, index) => {
              const isLastItem = index === safetyLinks.length - 1;
              const LinkIcon = link.Icon;
              
              return (
                <TouchableOpacity
                  key={link.id}
                  onPress={() => navigation?.navigate(link.target)}
                  activeOpacity={0.8}
                  style={[
                    styles.rowItem,
                    !isLastItem && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: themeColor.border }
                  ]}
                >
                  <View style={styles.rowLeft}>
                    <LinkIcon size={18} color={themeColor.textMuted} />
                    <Text style={[styles.rowTitle, { color: isDark ? COLORS.white : themeColor.textPrimary }]}>
                      {link.title}
                    </Text>
                  </View>
                  <Text style={[styles.rowActionText, { color: themeColor.textMuted }]}>{link.action}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Clean Minimal Footer */}
        <View style={styles.footerSection}>
          <View style={styles.footerRow}>
            <Text style={[styles.footerText, { color: themeColor.textMuted }]}>Built for Students of RSU</Text>
            <Heart size={12} color={themeColor.textMuted} fill={themeColor.textMuted} style={styles.heartIcon} />
          </View>
          <Text style={[styles.footerText, { color: themeColor.textMuted }]}>
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
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
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
  },
  heroVersion: {
    fontSize: 14,
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
    textAlign: "center",
    lineHeight: 24,
  },
  linksSection: {
    gap: 10,
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    paddingHorizontal: 4,
    letterSpacing: 0.5,
  },
  cardContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  rowActionText: {
    fontSize: 14,
  },
  footerSection: {
    marginTop: "auto",
    paddingTop: 24,
    alignItems: "center",
    gap: 6,
    opacity: 0.5,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: 0.2,
  },
  heartIcon: {
    marginLeft: 4,
  },
});