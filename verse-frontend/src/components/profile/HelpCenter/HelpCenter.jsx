import React, { useRef, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  ArrowLeft,
  Search,
  Store,
  MessageSquare,
  UserCheck,
  ChevronRight,
  MessageCircle,
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

export function HelpCenter({ searchQuery, setSearchQuery, navigation, selectedTheme, setSelectedTheme }) {
  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  const popularArticles = [
    {
      id: "market-safety",
      title: "How to buy and sell safely on campus",
      category: "Marketplace",
      icon: <Store size={16} color={themeColor.textMuted} />,
    },
    {
      id: "anon-works",
      title: "How anonymous posts protect your identity",
      category: "Privacy",
      icon: <MessageSquare size={16} color={themeColor.textMuted} />,
    },
    {
      id: "verification",
      title: "Fixing student verification issues",
      category: "Account",
      icon: <UserCheck size={16} color={themeColor.textMuted} />,
    },
  ];

  const scrollViewRef = useRef(null);
  const [localInput, setLocalInput] = useState("");

  useFocusEffect(
    useCallback(() => {
      return () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        setLocalInput("");
        setSearchQuery("");
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
        <Text style={[styles.headerTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>Help Center</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro / Search Section */}
        <View style={styles.introSection}>
          <View style={styles.introHeadingWrapper}>
            <Text style={[styles.introTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>How can we help?</Text>
            <Text style={[styles.introSubtitle, { color: themeColor.textMuted }]}>
              Search for guides or browse campus help topics.
            </Text>
          </View>

          <View style={styles.searchWrapper}>
            <Search style={styles.searchIcon} size={20} color={themeColor.textMuted} />
            <TextInput
              style={[
                styles.searchInput, 
                { 
                  backgroundColor: themeColor.surface, 
                  borderColor: themeColor.border,
                  color: isDark ? "#FFFFFF" : themeColor.textPrimary 
                }
              ]}
              placeholder="Search help articles..."
              placeholderTextColor={themeColor.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              keyboardAppearance={isDark ? "dark" : "light"}
            />
          </View>
        </View>

        {/* Popular Articles Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Popular Articles</Text>

          <View style={[styles.cardContainer, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
            {popularArticles.map((article, index) => {
              const isLastItem = index === popularArticles.length - 1;
              return (
                <TouchableOpacity
                  key={article.id}
                  onPress={() => navigation?.navigate("ArticleDetail", { id: article.id })}
                  activeOpacity={0.8}
                  style={[
                    styles.rowItem, 
                    !isLastItem && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: themeColor.border }
                  ]}
                >
                  <View style={styles.rowLeft}>
                    <View style={[styles.iconBox, { backgroundColor: themeColor.background }]}>
                      {article.icon}
                    </View>
                    <View style={styles.metaWrapper}>
                      <Text style={[styles.articleTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]} numberOfLines={1}>
                        {article.title}
                      </Text>
                      <Text style={[styles.articleCategory, { color: themeColor.textMuted }]}>
                        {article.category}
                      </Text>
                    </View>
                  </View>
                  <ChevronRight size={16} color={themeColor.textMuted} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Browse Topics Grid */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionHeading, { color: themeColor.textMuted }]}>Browse Topics</Text>

          <View style={styles.gridRow}>
            <TouchableOpacity
              onPress={() => navigation?.navigate("TopicMarket")}
              activeOpacity={0.8}
              style={[styles.gridCard, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}
            >
              <Store size={20} color={themeColor.textMuted} />
              <View style={styles.gridCardMeta}>
                <Text style={[styles.gridCardTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>Marketplace</Text>
                <Text style={[styles.gridCardSubtitle, { color: themeColor.textMuted }]}>Selling guidelines & tips</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation?.navigate("TopicPrivacy")}
              activeOpacity={0.8}
              style={[styles.gridCard, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}
            >
              <MessageSquare size={20} color={themeColor.textMuted} />
              <View style={styles.gridCardMeta}>
                <Text style={[styles.gridCardTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>Anonymity</Text>
                <Text style={[styles.gridCardSubtitle, { color: themeColor.textMuted }]}>How your data stays safe</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support CTA Callout */}
        <View style={[styles.ctaContainer, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
          <View style={styles.ctaHeadingWrapper}>
            <Text style={[styles.ctaTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>Still need help?</Text>
            <Text style={[styles.ctaSubtitle, { color: themeColor.textMuted }]}>
              {`If you can't find an answer, chat directly with a student support representative.`}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation?.navigate("ContactSupport")}
            activeOpacity={0.85}
            style={styles.ctaButton}
          >
            <MessageCircle size={16} color={COLORS.white} />
            <Text style={styles.ctaButtonText}>Contact Support</Text>
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
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 112,
  },
  introSection: {
    paddingHorizontal: 4,
    gap: 16,
    marginBottom: 28,
  },
  introHeadingWrapper: {
    gap: 4,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
  },
  introSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.white40,
    lineHeight: 20,
  },
  searchWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.ink,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
    paddingLeft: 44,
    paddingRight: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white,
  },
  sectionContainer: {
    gap: 10,
    marginBottom: 28,
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
    flex: 1,
    marginRight: 16,
  },
  iconBox: {
    padding: 8,
    backgroundColor: COLORS.void,
    borderRadius: 12,
  },
  metaWrapper: {
    flex: 1,
    gap: 2,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white90,
  },
  articleCategory: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.white40,
  },
  gridRow: {
    flexDirection: "row",
    gap: 12,
  },
  gridCard: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
    gap: 12,
  },
  gridCardMeta: {
    gap: 2,
  },
  gridCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white90,
  },
  gridCardSubtitle: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.white40,
    lineHeight: 18,
  },
  ctaContainer: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 16,
    alignItems: "center",
    gap: 16,
    marginTop: 8,
  },
  ctaHeadingWrapper: {
    alignItems: "center",
    gap: 4,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white90,
  },
  ctaSubtitle: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.white40,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 280,
  },
  ctaButton: {
    width: "100%",
    backgroundColor: COLORS.cyan,
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
});