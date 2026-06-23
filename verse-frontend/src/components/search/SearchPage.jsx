import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Keyboard,
} from "react-native";
import { ChevronLeft, Search, Clock, ArrowUpRight, X } from "lucide-react-native";
import { ThemeTokens } from "../../../hooks/theme";

export function SearchPage({
  setActiveFilter,
  recents,
  setRecents,
  search,
  setSearch,
  posts,
  navigation,
  selectedTheme,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  useEffect(() => {
    if (!search || search.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const newSuggestions = [];
    const query = search.toLowerCase().trim();

    posts.forEach(post => {
      post.content?.tags?.forEach(tag => {
        if (
          tag.toLowerCase().includes(query) &&
          tag.toLowerCase() !== 'market' && post.verse !== 'market' &&
          !newSuggestions.some(s => s.value === tag)
        ) {
          newSuggestions.push({ type: 'tag', value: tag, display: '#' + tag });
        }
      });

      if (
        post.verse &&
        post.verse !== 'market' &&
        post.verse.toLowerCase().includes(query) &&
        !newSuggestions.some(s => s.value === post.verse)
      ) {
        newSuggestions.push({ type: 'verse', value: post.verse, display: post.verse });
      }

      if (
        post.author?.faculty &&
        post.author.faculty.toLowerCase().includes(query) && post.verse !== 'market' &&
        !newSuggestions.some(s => s.value === post.author.faculty)
      ) {
        newSuggestions.push({ type: 'faculty', value: post.author.faculty, display: post.author.faculty });
      }

      if (
        post.author?.department &&
        post.author.department.toLowerCase().includes(query) && post.verse !== 'market' &&
        !newSuggestions.some(s => s.value === post.author.department)
      ) {
        newSuggestions.push({ type: 'department', value: post.author.department, display: post.author.department });
      }

      if (post.verse !== 'market' && post.content?.text && post.verse !== 'market') {
        const textLower = post.content.text.toLowerCase();
        const index = textLower.indexOf(query);

        if (index !== -1) {
          const start = Math.max(0, index - 15);
          const end = Math.min(post.content.text.length, index + 25);
          let snippet = (start > 0 ? "..." : "") + post.content.text.substring(start, end) + "...";

          if (!newSuggestions.some(s => s.display === snippet)) {
            newSuggestions.push({ type: 'content', value: post.content.text, display: snippet });
          }
        }
      }
    });

    setSuggestions(newSuggestions.slice(0, 6));
  }, [search, posts]);

  const handleSearchNavigation = (term) => {
    const cleanedTerm = term.trim();
    if (!cleanedTerm) return;

    Keyboard.dismiss();

    setRecents((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== cleanedTerm.toLowerCase());
      return [cleanedTerm, ...filtered].slice(0, 6);
    });

    navigation.navigate('Search_feed', { query: cleanedTerm });
  };

  const handleRecentSearch = (term) => {
    setSearch(term);
    handleSearchNavigation(term);
  };

  const handleSuggestedSearch = (term) => {
    const cleanedTerm = term ? term.trim() : "";
    if (!cleanedTerm) return;

    setSearch(cleanedTerm);
    handleSearchNavigation(cleanedTerm);
  };

  const handleClearAll = () => {
    setRecents([]);
  };

  const handleBackPress = () => {
    setSearch('');
    setActiveFilter("all");
    if (navigation) navigation.goBack();
  };

  const isSearching = search.trim().length > 0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColor.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={themeColor.background} />

      <View style={styles.container}>
        <View style={[styles.header, { borderBottomColor: themeColor.border }]}>
          <Pressable onPress={handleBackPress} activeOpacity={0.7} style={styles.backButton}>
            <ChevronLeft size={24} color={themeColor.textPrimary} />
          </Pressable>

          <View style={[styles.searchBarContainer, { backgroundColor: themeColor.surface }, isFocused && styles.searchBarFocused]}>
            <Search size={18} color={isFocused ? themeColor.textPrimary : themeColor.textMuted} style={styles.searchIcon} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor={themeColor.textMuted}
              style={[styles.input, { color: themeColor.textPrimary }]}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoCorrect={false}
              keyboardAppearance={isDark ? "dark" : "light"}
              returnKeyType="search"
              onSubmitEditing={() => handleSearchNavigation(search)}
            />
            {search.length > 0 ? (
              <Pressable onPress={() => setSearch('')}>
                <X size={16} color={themeColor.textPrimary} />
              </Pressable>
            ) : null}
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.scrollContent}
        >
          {!isSearching ? (
            <>
              {recents.length > 0 && (
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleRow}>
                    <Clock size={14} color={themeColor.textMuted} />
                    <Text style={[styles.sectionTitleText, { color: themeColor.textPrimary }]}>Recent searches</Text>
                  </View>
                  <Pressable onPress={handleClearAll} activeOpacity={0.6} style={styles.clearAllButton}>
                    <Text style={styles.clearAllText}>Clear all</Text>
                  </Pressable>
                </View>
              )}

              {recents.length > 0 ? (
                recents.map((item, index) => (
                  <Pressable
                    key={`recent-${index}`}
                    onPress={() => handleRecentSearch(item)}
                    activeOpacity={0.7}
                    style={styles.recentItem}
                  >
                    <Text style={[styles.recentItemText, { color: themeColor.textPrimary }]} numberOfLines={1}>
                      {item}
                    </Text>
                    <ArrowUpRight size={16} color={themeColor.textMuted} />
                  </Pressable>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={[styles.emptyStateTitle, { color: themeColor.textPrimary }]}>Search for anything</Text>
                  <Text style={[styles.emptyStateText, { color: themeColor.textMuted }]}>
                    Find communities, department updates, campus confessions, or trending keywords instantly.
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.suggestionsWrapper}>
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <Pressable
                    key={`suggest-${index}`}
                    onPress={() => handleSuggestedSearch(suggestion.value)}
                    activeOpacity={0.7}
                    style={[styles.suggestionItemRow, { borderBottomColor: themeColor.border }]}
                  >
                    <View style={styles.suggestionLeftGroup}>
                      <Search size={16} color={themeColor.textMuted} />
                      <Text style={[styles.suggestionItemText, { color: themeColor.textPrimary }]} numberOfLines={1}>
                        {suggestion.display}
                      </Text>
                    </View>
                    <ArrowUpRight size={16} color={themeColor.textMuted} />
                  </Pressable>
                ))
              ) : (
                <Pressable
                  onPress={() => handleSuggestedSearch(search)}
                  activeOpacity={0.7}
                  style={[styles.suggestionItemRow, { borderBottomColor: themeColor.border }]}
                >
                  <View style={styles.suggestionLeftGroup}>
                    <Search size={16} color={themeColor.textPrimary} />
                    <Text style={[styles.suggestionItemText, styles.directSearchText, { color: themeColor.textPrimary }]} numberOfLines={1}>
                      Search for {`"${search}"`}
                    </Text>
                  </View>
                  <ArrowUpRight size={16} color={themeColor.textPrimary} />
                </Pressable>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  backButton: { marginRight: 12, paddingVertical: 4 },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 44,
    borderWidth: 1,
    borderColor: "transparent"
  },
  searchBarFocused: {
    borderColor: "rgba(128, 128, 128, 0.2)",
  },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, fontWeight: "400" },
  scrollContent: { paddingBottom: 40 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10
  },
  sectionTitleRow: { flexDirection: "row", alignItems: "center" },
  sectionTitleText: { fontSize: 16, fontWeight: "700", marginLeft: 8 },
  clearAllButton: { padding: 4 },
  clearAllText: { color: "#17CB49", fontSize: 14, fontWeight: "500" },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  recentItemText: { fontSize: 14, fontWeight: "400", flex: 1, paddingRight: 16 },
  emptyContainer: { alignItems: "center", marginTop: 80, paddingHorizontal: 40 },
  emptyStateTitle: { fontSize: 20, fontWeight: "700", marginBottom: 8, textAlign: "center" },
  emptyStateText: { fontSize: 14, textAlign: "center", lineHeight: 20 },
  suggestionsWrapper: { paddingTop: 8 },
  suggestionItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  suggestionLeftGroup: { flexDirection: "row", alignItems: "center", flex: 1, paddingRight: 16 },
  suggestionItemText: { fontSize: 15, marginLeft: 14, flex: 1 },
  directSearchText: { fontWeight: "600" }
});