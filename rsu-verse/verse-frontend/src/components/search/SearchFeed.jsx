import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar
} from "react-native";
import {
  ChevronLeft,
  ArrowBigUp,
  ArrowBigDown,
  Repeat,
  Repeat1,
  Bookmark,
  Share,
  MoreHorizontal,
  MessageCircle,
} from "lucide-react-native";
import { formatRelativeTime } from "../../assets/formatRelativeTime";

export function SearchFeed({
  route,
  navigation,
  handleSave,
  handleRepost,
  handleUpvote,
  handleDownvotes,
  getVerseIcon,
  matchingPosts
}) {
  const { query, clickedPostId } = route.params || { query: "", clickedPostId: null };


  const filteredPosts = React.useMemo(() => {
    return (matchingPosts || []).filter(post => post && post.verse !== "market");
  }, [matchingPosts]);

  const prioritizedPosts = React.useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      if (a.id === clickedPostId) return -1;
      if (b.id === clickedPostId) return 1;
      return 0;
    });
  }, [filteredPosts, clickedPostId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Search', { query: query });
            }
          }}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Search Results</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            Filtered records for {`"${query || "..."}"`}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {prioritizedPosts.length > 0 ? (
          prioritizedPosts.map((post) => {
            const isConfession = post.verse === "confession";

            return (
              <View
                key={post.id}
                style={[
                  styles.postContainer,
                  isConfession ? styles.postConfessionBg : styles.postVoidBg,
                ]}
              >
                <View style={styles.postMetaRow}>
                  <View style={styles.profileLayout}>
                    <View style={styles.avatarPlaceholder} />
                    <View style={styles.authorMeta}>
                      <View style={styles.metaTextGroup}>
                        <Text style={styles.facultyText} numberOfLines={1}>
                          {post.author?.faculty || "Anonymous Faculty"}
                        </Text>
                        <View style={styles.subMetaRow}>
                          <Text style={styles.departmentText} numberOfLines={1}>
                            @{post.author?.department || "anonymous"}
                          </Text>
                          <Text style={styles.dotSeparator}>·</Text>
                          <Text style={styles.timeText} numberOfLines={1}>
                            {post.meta?.createdAt ? formatRelativeTime(post.meta.createdAt) : "now"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.metaRightActions}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.iconActionPadding}>
                      <MoreHorizontal size={18} color="rgba(255, 255, 255, 0.4)" />
                    </TouchableOpacity>
                    <View style={styles.verseIconWrapper}>
                      {getVerseIcon && getVerseIcon(post.verse)}
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.95}
                  onPress={() => navigation.navigate("Comments", { postId: post.id })}
                  style={styles.postBodyTouchable}
                >
                  <View style={[styles.badge, isConfession ? styles.badgeRose : styles.badgeCyan]}>
                    <Text style={[styles.badgeText, isConfession ? styles.textRose : styles.textCyan]}>
                      {post.verse}
                    </Text>
                  </View>

                  <View style={styles.bodyTextContainer}>
                    <Text style={styles.bodyText}>{post.content?.text}</Text>
                  </View>
                </TouchableOpacity>

                {post.content?.images && post.content.images.length > 0 && (
                  <View style={styles.mediaContainerWrapper}>
                    <View
                      style={[
                        styles.imageGrid,
                        post.content.images.length === 1 ? styles.gridSingle : styles.gridDouble,
                      ]}
                    >
                      {post.content.images.map((imgUrl, index) => (
                        <Image
                          key={`img-${index}`}
                          source={{ uri: imgUrl }}
                          style={[
                            styles.attachedImage,
                            post.content.images.length === 1 ? styles.imageFullHeight : styles.imageSquareHeight,
                          ]}
                          resizeMode="cover"
                        />
                      ))}
                    </View>
                  </View>
                )}

                <View style={styles.engagementToolbar}>
                  <View style={styles.leftToolbarActions}>
                    <TouchableOpacity
                      onPress={() => handleUpvote(post.id)}
                      activeOpacity={0.6}
                      style={styles.toolbarButton}
                    >
                      <ArrowBigUp
                        size={20}
                        fill={post.userInteraction?.voteStatus === "up" ? "#17CB49" : "transparent"}
                        color={post.userInteraction?.voteStatus === "up" ? "#17CB49" : "rgba(255, 255, 255, 0.5)"}
                        strokeWidth={post.userInteraction?.voteStatus === "up" ? 2 : 1.5}
                      />
                      <Text
                        style={[
                          styles.toolbarMetric,
                          post.userInteraction?.voteStatus === "up" && styles.textUpvoted,
                        ]}
                      >
                        {post.engagement?.upvotes || 0}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleDownvotes(post.id)}
                      activeOpacity={0.6}
                      style={styles.toolbarButton}
                    >
                      <ArrowBigDown
                        size={20}
                        fill={post.userInteraction?.voteStatus === "down" ? "#F59E0B" : "transparent"}
                        color={post.userInteraction?.voteStatus === "down" ? "#F59E0B" : "rgba(255, 255, 255, 0.5)"}
                        strokeWidth={post.userInteraction?.voteStatus === "down" ? 2 : 1.5}
                      />
                      <Text
                        style={[
                          styles.toolbarMetric,
                          post.userInteraction?.voteStatus === "down" && styles.textDownvoted,
                        ]}
                      >
                        {post.engagement?.downvotes || 0}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      activeOpacity={0.6} 
                      style={styles.toolbarButton}
                      onPress={() => navigation.navigate("Comments", { postId: post.id })}
                    >
                      <MessageCircle size={19} color="rgba(255, 255, 255, 0.5)" />
                      <Text style={styles.toolbarMetric}>
                        {Array.isArray(post.engagement?.comments)
                          ? post.engagement.comments.length
                          : post.engagement?.comments || 0}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleRepost(post.id)}
                      activeOpacity={0.6}
                      style={styles.toolbarButton}
                    >
                      {post.userInteraction?.reposts ? (
                        <Repeat1 size={19} color="#17CB49" />
                      ) : (
                        <Repeat size={19} color="rgba(255, 255, 255, 0.5)" />
                      )}
                      <Text style={[styles.toolbarMetric, post.userInteraction?.reposts && styles.textReposted]}>
                        {post.engagement?.reposts || ""}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.rightToolbarActions}>
                    <TouchableOpacity
                      onPress={() => handleSave(post.id)}
                      activeOpacity={0.6}
                      style={styles.toolbarIconButton}
                    >
                      <Bookmark
                        size={19}
                        fill={post.userInteraction?.saved ? "#F59E0B" : "transparent"}
                        color={post.userInteraction?.saved ? "#F59E0B" : "rgba(255, 255, 255, 0.5)"}
                        strokeWidth={post.userInteraction?.saved ? 2 : 1.5}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.6} style={styles.toolbarIconButton}>
                      <Share size={19} color="rgba(255, 255, 255, 0.5)" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.noResultsCard}>
            <Text style={styles.noResultsText}>
              No matching records found for{`"${query}"`}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000000" },
  scrollContainer: { paddingBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#16161D",
    gap: 14,
  },
  backButton: { padding: 4, marginLeft: -4 },
  headerTitleContainer: { flex: 1, flexDirection: "column" },
  headerTitle: { fontSize: 17, fontWeight: "700", color: "#FFFFFF", letterSpacing: -0.4 },
  headerSubtitle: { fontSize: 13, color: "rgba(255, 255, 255, 0.5)", marginTop: 2 },
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#16161D",
    paddingVertical: 16,
    gap: 12,
  },
  postConfessionBg: { backgroundColor: "rgba(245, 158, 11, 0.01)" },
  postVoidBg: { backgroundColor: "#000000" },
  postMetaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16 },
  profileLayout: { flexDirection: "row", alignItems: "center", flex: 1, gap: 10 },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#16161F",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  authorMeta: { flex: 1 },
  metaTextGroup: { flexDirection: "column" },
  facultyText: { fontSize: 15, fontWeight: "600", color: "#FFFFFF", letterSpacing: -0.2 },
  subMetaRow: { flexDirection: "row", alignItems: "center", marginTop: 1 },
  departmentText: { fontSize: 13, fontWeight: "400", color: "rgba(255, 255, 255, 0.55)" },
  dotSeparator: { fontSize: 13, color: "rgba(255, 255, 255, 0.4)", marginHorizontal: 6 },
  timeText: { fontSize: 13, fontWeight: "400", color: "rgba(255, 255, 255, 0.55)" },
  metaRightActions: { flexDirection: "row", alignItems: "center", gap: 6 },
  iconActionPadding: { padding: 4 },
  verseIconWrapper: { padding: 4 },
  postBodyTouchable: { flexDirection: "column", gap: 8, paddingHorizontal: 16 },
  badge: { alignSelf: "flex-start", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeRose: { backgroundColor: "rgba(245, 158, 11, 0.1)" },
  badgeCyan: { backgroundColor: "rgba(23, 203, 73, 0.1)" },
  badgeText: { fontSize: 10, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  textRose: { color: "#F59E0B" },
  textCyan: { color: "#17CB49" },
  bodyTextContainer: { marginTop: 1 },
  bodyText: { fontSize: 15, color: "#EFF1F5", lineHeight: 22, fontWeight: "400" },
  mediaContainerWrapper: { paddingHorizontal: 16, marginTop: 4 },
  imageGrid: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#16161D",
    gap: 4,
  },
  gridSingle: { flexDirection: "column" },
  gridDouble: { flexDirection: "row" },
  attachedImage: { flex: 1, backgroundColor: "#16161F" },
  imageFullHeight: { height: 210, width: "100%" },
  imageSquareHeight: { height: 160 },
  engagementToolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  leftToolbarActions: { flexDirection: "row", alignItems: "center", gap: 24 },
  rightToolbarActions: { flexDirection: "row", alignItems: "center", gap: 16 },
  toolbarButton: { flexDirection: "row", alignItems: "center", gap: 6, height: 32 },
  toolbarIconButton: { height: 32, justifyContent: "center" },
  toolbarMetric: { fontSize: 12, color: "rgba(255, 255, 255, 0.5)", fontWeight: "400" },
  textUpvoted: { color: "#17CB49" },
  textDownvoted: { color: "#F59E0B" },
  textReposted: { color: "#17CB49" },
  noResultsCard: {
    margin: 24,
    paddingVertical: 64,
    paddingHorizontal: 24,
    backgroundColor: "#0B0B0F",
    borderWidth: 1,
    borderColor: "#16161D",
    borderRadius: 16,
    alignItems: "center",
  },
  noResultsText: { fontSize: 15, color: "rgba(255, 255, 255, 0.4)", textAlign: "center", lineHeight: 22 },
});