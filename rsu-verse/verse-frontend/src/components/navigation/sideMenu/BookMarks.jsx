import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Pressable,
  FlatList,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { PostCard } from "../../../assets/Postcard";
import { ThemeTokens } from "../../../theme";

export function BookMarks({ 
  posts = [], 
  handleUpvote, 
  handleDownvotes, 
  handleRepost, 
  handleSave, 
  handleShare, 
  getVerseIcon, 
  selectedTheme, 
  setSelectedTheme 
}) {
  const navigation = useNavigation();

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  const savedPosts = posts.filter(item => item.userInteraction?.saved === true);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColor.background }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={themeColor.background} 
      />

      <View style={[styles.header, { backgroundColor: themeColor.background }]}>
        <Pressable 
          style={styles.headerAction}
          onPress={() => navigation?.goBack()}
        >
          <ArrowLeft size={20} color={themeColor.textPrimary} strokeWidth={2.5} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: themeColor.textPrimary }]}>
          Bookmarks
        </Text>
        {/* Invisible spacer view matching back button sizing to keep the title perfectly centered */}
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={savedPosts}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            handleUpvote={handleUpvote}
            handleDownvotes={handleDownvotes}
            handleRepost={handleRepost}
            handleShare={handleShare}
            handleSave={handleSave}
            getVerseIcon={getVerseIcon}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            navigation={navigation}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: themeColor.textMuted }]}>
              No saved posts yet.
            </Text>
          </View>
        }
      />
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
    zIndex: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  headerSpacer: {
    width: 28, 
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
  },
});