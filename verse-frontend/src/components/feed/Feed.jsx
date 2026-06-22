import React, { useCallback, useState, useRef, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, DeviceEventEmitter } from "react-native";
import { FlashList } from "@shopify/flash-list"
import { Plus } from "lucide-react-native";
import { PostCard } from "../../assets/Postcard";
import { FeedFilter } from "./FeedFilter";
import { FeedPostSkeleton } from "./FeedPostSkeleton";
import { HapticEngine } from "../../../haptics";
import { ThemeTokens } from "../../theme";

export function Feed({
  posts,
  activeFilter,
  isLoading,
  setActiveFilter,
  handleUpvote,
  handleDownvotes,
  handleRepost,
  handleSave,
  onPlusClick,
  getVerseIcon,
  handleShare,
  selectedTheme,
  setSelectedTheme,
  onScrollUp,
  onScrollDown,
  TOTAL_HEADER_HEIGHT,
  navigation
}) {

  const SCROLL_THRESHOLD = 8;
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(({ nativeEvent }) => {
    const currentY = nativeEvent.contentOffset.y;
    const diff = currentY - lastScrollY.current;

    if (Math.abs(diff) < SCROLL_THRESHOLD) return;

    if (diff > 0) onScrollDown?.();
    else onScrollUp?.();

    lastScrollY.current = currentY;
  }, [onScrollDown, onScrollUp]);

  const [trackedTabs, setTrackedTabs] = useState([activeFilter]);
  const postsCache = useRef({});

  const listRefs = useRef({});

  useEffect(() => {
    setTrackedTabs((prev) => {
      if (prev.includes(activeFilter)) return prev;
      return [...prev, activeFilter];
    });
  }, [activeFilter]);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener("verse_reset_feed_scroll", () => {

      setTimeout(() => {
        listRefs.current[activeFilter]?.scrollToOffset({ offset: 0, animated: true });
      }, 150);
    });
    return () => subscription.remove();
  }, [activeFilter]);

  if (!isLoading) {
    postsCache.current[activeFilter] = posts;
  }

  const getItemType = useCallback((item) => {
    if (typeof item === 'number') return 'skeleton';
    return item?.verse || 'standard'
  }, []);

  const renderItem = useCallback(({ item }) => {
    if (isLoading) {
      return <FeedPostSkeleton />
    }
    return (
      <PostCard
        post={item}
        handleUpvote={handleUpvote}
        handleDownvotes={handleDownvotes}
        handleRepost={handleRepost}
        handleShare={handleShare}
        handleSave={handleSave}
        getVerseIcon={getVerseIcon}
        setSelectedTheme={setSelectedTheme}
        selectedTheme={selectedTheme}
        navigation={navigation}
      />
    );
  }, [isLoading, handleUpvote, handleDownvotes, handleRepost, handleShare, handleSave, getVerseIcon, navigation, selectedTheme, setSelectedTheme]);

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  return (
    <View style={[styles.feedLayoutWrapper, { backgroundColor: themeColor.background }]}>

      <FeedFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
      />

      {trackedTabs.map((filterKey) => {
        const isCurrentTab = activeFilter === filterKey;
        const currentListData = isCurrentTab
          ? (isLoading ? [1, 2, 3] : posts)
          : (postsCache.current[filterKey] || []);

        return (
          <View
            key={filterKey}
            style={[
              styles.animatedContentContainer, 
              { display: isCurrentTab ? "flex" : "none" }
            ]}
          >
            <FlashList
              ref={(instance) => {
                if (instance) {
                  listRefs.current[filterKey] = instance;
                }
              }}
              data={currentListData}
              extraData={currentListData}
              renderItem={renderItem}
              getItemType={getItemType}
              keyExtractor={(item, index) => typeof item === 'number' ? `skeleton-${index}` : item.id.toString()}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              estimatedItemSize={260}

              ListEmptyComponent={
                isCurrentTab && !isLoading && currentListData.length === 0 ? (
                  <View style={styles.emptyFeedStateBox}>
                    <Text style={styles.emptyHeadingText}>
                      No posts in this Verse yet.
                    </Text>
                    <Text style={styles.emptySubheadingText}>
                      Be the first to start the conversation.
                    </Text>
                  </View>
                ) : null
              }
            />
          </View>
        );
      })}

      <Pressable
        onPress={() => {
          HapticEngine.medium();
          onPlusClick?.();
        }}
        style={styles.floatingActionButton}
      >
        <Plus
          size={24}
          strokeWidth={2.5}
          color="#FFFFFF"
        />
        <Text style={styles.fabLabelText}>Post</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  feedLayoutWrapper: {
    flex: 1,
    width: "100%",
    maxWidth: 448,
    alignSelf: "center",
    position: "relative",
  },

  listContainer: {
    paddingBottom: 112,
  },

  animatedContentContainer: {
    flex: 1,
    width: "100%",
  },

  emptyFeedStateBox: {
    paddingVertical: 64,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  emptyHeadingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.4)",
    letterSpacing: 0.5,
    textAlign: "center",
  },

  emptySubheadingText: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.2)",
    textAlign: "center",
  },

  floatingActionButton: {
    position: "absolute",
    bottom: 88,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#00BA34",
    padding: 12,
    borderRadius: 9999,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  fabLabelText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  }
});