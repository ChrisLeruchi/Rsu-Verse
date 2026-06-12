import React, {useRef, useCallback, useState} from "react";
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

const COLORS = {
  void: "#0A0A0A",
  void80: "rgba(10, 10, 10, 0.8)",
  ink: "#161618",
  cyan: "#00BA34",
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

export function HelpCenter({ searchQuery, setSearchQuery, navigation }) {
  const popularArticles = [
    {
      id: "market-safety",
      title: "How to buy and sell safely on campus",
      category: "Marketplace",
      icon: <Store size={16} color={COLORS.white40} />,
    },
    {
      id: "anon-works",
      title: "How anonymous posts protect your identity",
      category: "Privacy",
      icon: <MessageSquare size={16} color={COLORS.white40} />,
    },
    {
      id: "verification",
      title: "Fixing student verification issues",
      category: "Account",
      icon: <UserCheck size={16} color={COLORS.white40} />,
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
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.introSection}>
          <View style={styles.introHeadingWrapper}>
            <Text style={styles.introTitle}>How can we help?</Text>
            <Text style={styles.introSubtitle}>
              Search for guides or browse campus help topics.
            </Text>
          </View>

          <View style={styles.searchWrapper}>
            <Search style={styles.searchIcon} size={20} color={COLORS.white30} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search help articles..."
              placeholderTextColor={COLORS.white30}
              value={searchQuery}
              onChangeText={setSearchQuery}
              keyboardAppearance="dark"
            />
          </View>
        </View>


        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Popular Articles</Text>

          <View style={styles.cardContainer}>
            {popularArticles.map((article, index) => {
              const isLastItem = index === popularArticles.length - 1;
              return (
                <TouchableOpacity
                  key={article.id}
                  onPress={() => navigation?.navigate("ArticleDetail", { id: article.id })}
                  activeOpacity={0.8}
                  style={[styles.rowItem, !isLastItem && styles.rowBorder]}
                >
                  <View style={styles.rowLeft}>
                    <View style={styles.iconBox}>
                      {article.icon}
                    </View>
                    <View style={styles.metaWrapper}>
                      <Text style={styles.articleTitle} numberOfLines={1}>
                        {article.title}
                      </Text>
                      <Text style={styles.articleCategory}>
                        {article.category}
                      </Text>
                    </View>
                  </View>
                  <ChevronRight size={16} color={COLORS.white20} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>


        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Browse Topics</Text>

          <View style={styles.gridRow}>

            <TouchableOpacity
              onPress={() => navigation?.navigate("TopicMarket")}
              activeOpacity={0.8}
              style={styles.gridCard}
            >
              <Store size={20} color={COLORS.white50} />
              <View style={styles.gridCardMeta}>
                <Text style={styles.gridCardTitle}>Marketplace</Text>
                <Text style={styles.gridCardSubtitle}>Selling guidelines & tips</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => navigation?.navigate("TopicPrivacy")}
              activeOpacity={0.8}
              style={styles.gridCard}
            >
              <MessageSquare size={20} color={COLORS.white50} />
              <View style={styles.gridCardMeta}>
                <Text style={styles.gridCardTitle}>Anonymity</Text>
                <Text style={styles.gridCardSubtitle}>How your data stays safe</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.ctaContainer}>
          <View style={styles.ctaHeadingWrapper}>
            <Text style={styles.ctaTitle}>Still need help?</Text>
            <Text style={styles.ctaSubtitle}>
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
    letterSpacing: -0.4,
  },
  introSubtitle: {
    fontSize: 16,
    fontWeight: "300",
    color: COLORS.white40,
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
    borderWidth: 1,
    borderColor: COLORS.white5,
    borderRadius: 12,
    paddingLeft: 44,
    paddingRight: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.white,
  },
  sectionContainer: {
    gap: 10,
    marginBottom: 28,
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
    flex: 1,
    marginRight: 16,
  },
  iconBox: {
    padding: 8,
    backgroundColor: COLORS.void,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.white5,
  },
  metaWrapper: {
    flex: 1,
    gap: 2,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white90,
  },
  articleCategory: {
    fontSize: 12,
    fontWeight: "300",
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
    borderWidth: 1,
    borderColor: COLORS.white5,
    borderRadius: 16,
    gap: 12,
  },
  gridCardMeta: {
    gap: 2,
  },
  gridCardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white90,
  },
  gridCardSubtitle: {
    fontSize: 12,
    fontWeight: "300",
    color: COLORS.white40,
    lineHeight: 18,
  },
  ctaContainer: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.white5,
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
    fontWeight: "500",
    color: COLORS.white90,
  },
  ctaSubtitle: {
    fontSize: 12,
    fontWeight: "300",
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