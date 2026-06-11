import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { ChevronLeft, Search, Clock, ArrowUpRight, Store } from "lucide-react-native";

export function SearchPage({
  setActiveFilter,
  recents,
  setRecents,
  search,
  setSearch,
  matchingPosts,
  getVerseIcon,
  navigation
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClearAll = () => {
    setRecents([]);
  };

  const handleBackPress = () => {
    const state = navigation.getState();
    const currentRouteName = state?.routes[state.index]?.name;

    if (currentRouteName !== "Search" && currentRouteName !== "SearchFeed") {
    setActiveFilter("all");
    setSearch(''); 
  }
    setActiveFilter("all");
    
    
    if (navigation) navigation.goBack();
  };

  const filteredRecents = recents.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const isSearching = search.trim().length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#09090B" />

      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBackPress}
            activeOpacity={0.7}
            style={styles.backButton}
          >
            <ChevronLeft size={22} color="rgba(255, 255, 255, 0.8)" />
          </TouchableOpacity>

          <View
            style={[
              styles.searchBarContainer,
              isFocused && styles.searchBarFocused
            ]}
          >
            <Search size={18} color="rgba(255, 255, 255, 0.3)" style={styles.searchIcon} />
            <TextInput
              value={search}
              onChangeText={(text) => setSearch(text)}
              placeholder="Search"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              style={styles.input}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoCorrect={false}
              keyboardAppearance="dark"
            />
          </View>
        </View>


        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {!isSearching ? (
            <>
              {recents.length > 0 && (
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleRow}>
                    <Clock size={14} color="rgba(255, 255, 255, 0.4)" />
                    <Text style={styles.sectionTitleText}>Recents</Text>
                  </View>
                  <TouchableOpacity onPress={handleClearAll} activeOpacity={0.6}>
                    <Text style={styles.clearAllText}>Clear all</Text>
                  </TouchableOpacity>
                </View>
              )}

              {filteredRecents.length > 0 ? (
                filteredRecents.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSearch(item)}
                    activeOpacity={0.6}
                    style={styles.recentItem}
                  >
                    <Text style={styles.recentItemText}>{item}</Text>
                    <ArrowUpRight size={16} color="rgba(255, 255, 255, 0.3)" />
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyStateText}>
                    Try searching for names, departments, topics or keywords
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.resultsWrapper}>
              <Text style={styles.resultsCountText}>
                {matchingPosts.length > 0 &&
                  `SEARCH RESULTS (${matchingPosts.length})`
                }
              </Text>


              <View style={styles.postsList}>
                {matchingPosts.length > 0 ? (
                  matchingPosts.map((post) => (
                    <TouchableOpacity
                      key={post.id}
                      activeOpacity={0.85}
                      onPress={() => {
                        if (navigation) {
                          navigation.navigate('Search_feed', {
                            query: search,
                            clickedPostId: post.id
                          });
                        }
                      }}
                      style={styles.postCard}
                    >

                      <View style={styles.postCardHeader}>
                        <View style={styles.verseMetaContainer}>
                          {post.verse === "market" ? (
                            <>
                              <Store size={14} color="rgba(255, 255, 255, 0.4)" />
                              <Text style={styles.verseText}>Marketplace</Text>
                            </>
                          ) : (
                            <>
                              {getVerseIcon && getVerseIcon(post.verse)}
                              <Text style={[styles.verseText, styles.capitalizeText]}>
                                {post.verse}
                              </Text>
                            </>
                          )}
                        </View>

                        {post.verse === "market" && post.marketPlace && (
                          <Text style={styles.priceText}>
                            ₦{post.marketPlace.price.toLocaleString()}
                          </Text>
                        )}
                      </View>


                      <Text
                        style={styles.postBodyText}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {post.content?.text}
                      </Text>


                      {post.content?.tags && post.content.tags.length > 0 && (
                        <View style={styles.tagsContainer}>
                          {post.content.tags.map((tag, tIdx) => (
                            <View key={tIdx} style={styles.tagBadge}>
                              <Text style={styles.tagText}>#{tag}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.noResultsCard}>
                    <Text style={styles.noResultsText}>
                      {`No matching posts found for "${search}"`}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#09090B",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 16,
    gap: 12,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#16161A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 100,
    alignItems: "center",
    paddingHorizontal: 14,
  },
  searchBarFocused: {
    borderColor: "rgba(34, 211, 238, 0.3)",
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    paddingVertical: 10,
    letterSpacing: 0.2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionTitleText: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.3)",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  clearAllText: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.4)",
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.03)",
  },
  recentItemText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  emptyContainer: {
    paddingTop: 32,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.3)",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  resultsWrapper: {
    marginTop: 8,
  },
  resultsCountText: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.3)",
    letterSpacing: 1.2,
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  postsList: {
    gap: 12,
  },
  postCard: {
    backgroundColor: "#16161A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
  },
  postCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  verseMetaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  verseText: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.5)",
  },
  capitalizeText: {
    textTransform: "capitalize",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.95)",
  },
  postBodyText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.75)",
    lineHeight: 21,
    fontWeight: "400",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 12,
  },
  tagBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.02)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.4)",
  },
  noResultsCard: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.3)",
    textAlign: "center",
  },
});