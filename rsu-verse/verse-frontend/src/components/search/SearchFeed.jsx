import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
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
  ArrowUpRight,
  MessageCircle,
} from "lucide-react-native";
import { formatRelativeTime } from "../../assets/formatRelativeTime";

export function SearchFeed({
  route,
  navigation,
  posts,
  handleSave,
  handleRepost,
  handleUpvote,
  handleDownvotes,
  getVerseIcon,
}) {

  const { query, clickedPostId } = route.params || { query: "", clickedPostId: null };


  const matchingPosts = posts.filter((post) => {
    if (!query) return false;

    const cleanQuery = query.toLowerCase();
    const matchesText = post.content?.text?.toLowerCase().includes(cleanQuery);
    const matchesVerse = post.verse?.toLowerCase().includes(cleanQuery);
    const matchesAuthor =
      post.author?.name?.toLowerCase().includes(cleanQuery) && !post.author?.anonymous;
    const matchesTags =
      Array.isArray(post.content?.tags) &&
      post.content.tags.some(
        (tag) => typeof tag === "string" && tag.toLowerCase().includes(cleanQuery)
      );

    return matchesText || matchesAuthor || matchesTags || matchesVerse;
  });


  const prioritizedPosts = [...matchingPosts].sort((a, b) => {
    if (a.id === clickedPostId) return -1;
    if (b.id === clickedPostId) return 1;
    return 0;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#09090B" />


      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
    
            const { query } = route.params || {};

            navigation.navigate('Search', { query: query });
          }}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <ChevronLeft size={22} color="rgba(255, 255, 255, 0.6)" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Search Results</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            Filtered records for {query || "..."}
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
            const isMarket = post.verse === "market";


            return (
              isMarket ? '' : (
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
                            {post.author?.faculty}
                          </Text>
                          <View style={styles.subMetaRow}>
                            <Text style={styles.departmentText} numberOfLines={1}>
                              @{post.author?.department}
                            </Text>
                            <Text style={styles.dotSeparator}>&bull;</Text>
                            <Text style={styles.timeText} numberOfLines={1}>
                              {formatRelativeTime(post.meta.createdAt)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>


                    <View style={styles.metaRightActions}>
                      <TouchableOpacity activeOpacity={0.6} style={styles.iconActionPadding}>
                        <MoreHorizontal size={20} color="rgba(255, 255, 255, 0.3)" />
                      </TouchableOpacity>
                      <View style={styles.verseIconWrapper}>
                        {getVerseIcon && getVerseIcon(post.verse)}
                      </View>
                    </View>
                  </View>


                  <TouchableOpacity
                    activeOpacity={0.9}
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
                    <View
                      style={[
                        styles.imageGrid,
                        post.content.images.length === 1 ? styles.gridSingle : styles.gridDouble,
                      ]}
                    >
                      {post.content.images.map((imgUrl, index) => (
                        <Image
                          key={index}
                          source={{ uri: imgUrl }}
                          style={[
                            styles.attachedImage,
                            post.content.images.length === 1 ? styles.imageFullHeight : styles.imageSquareHeight,
                          ]}
                          resizeMode="cover"
                        />
                      ))}
                    </View>
                  )}


                  {isMarket && (
                    <View style={styles.marketBar}>
                      <View style={styles.marketMetaInfo}>
                        <Text style={styles.priceText} numberOfLines={1}>
                          ₦{post.marketPlace?.price}
                        </Text>
                        <Text style={styles.marketDivider}>-</Text>
                        <Text style={styles.conditionText} numberOfLines={1}>
                          {post.marketPlace?.condition}
                        </Text>
                      </View>
                      <TouchableOpacity activeOpacity={0.8} style={styles.buyButton}>
                        <Text style={styles.buyButtonText}>Buy Now </Text>
                        <ArrowUpRight size={18} color="rgba(255, 255, 255, 0.9)" />
                      </TouchableOpacity>
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
                          size={24}
                          fill={post.userInteraction?.voteStatus === "up" ? "#17CB49" : "transparent"}
                          color={post.userInteraction?.voteStatus === "up" ? "#17CB49" : "rgba(255, 255, 255, 0.7)"}
                          strokeWidth={post.userInteraction?.voteStatus === "up" ? 2 : 1.5}
                        />
                        <Text
                          style={[
                            styles.toolbarMetric,
                            post.userInteraction?.voteStatus === "up" && styles.textUpvoted,
                          ]}
                        >
                          {post.engagement?.upvotes}
                        </Text>
                      </TouchableOpacity>


                      <TouchableOpacity
                        onPress={() => handleDownvotes(post.id)}
                        activeOpacity={0.6}
                        style={styles.toolbarButton}
                      >
                        <ArrowBigDown
                          size={24}
                          fill={post.userInteraction?.voteStatus === "down" ? "#F59E0B" : "transparent"}
                          color={post.userInteraction?.voteStatus === "down" ? "#F59E0B" : "rgba(255, 255, 255, 0.7)"}
                          strokeWidth={post.userInteraction?.voteStatus === "down" ? 2 : 1.5}
                        />
                        <Text
                          style={[
                            styles.toolbarMetric,
                            post.userInteraction?.voteStatus === "down" && styles.textDownvoted,
                          ]}
                        >
                          {post.engagement?.downvotes}
                        </Text>
                      </TouchableOpacity>


                      <TouchableOpacity activeOpacity={0.6} style={styles.toolbarButton}>
                        <MessageCircle size={22} color="rgba(255, 255, 255, 0.7)" />
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
                          <Repeat1 size={22} color="#FFFFFF" />
                        ) : (
                          <Repeat size={22} color="rgba(255, 255, 255, 0.7)" />
                        )}
                        <Text style={[styles.toolbarMetric, post.userInteraction?.reposts && styles.textWhite]}>
                          {post.engagement?.reposts === 0 ? "" : post.engagement?.reposts}
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
                          size={22}
                          fill={post.userInteraction?.saved ? "#F59E0B" : "transparent"}
                          color={post.userInteraction?.saved ? "#F59E0B" : "rgba(255, 255, 255, 0.7)"}
                          strokeWidth={post.userInteraction?.saved ? 2 : 1.5}
                        />
                      </TouchableOpacity>


                      <TouchableOpacity activeOpacity={0.6} style={styles.toolbarIconButton}>
                        <Share size={22} color="rgba(255, 255, 255, 0.7)" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            );
          })
        ) : (
          <View style={styles.noResultsCard}>
            <Text style={styles.noResultsText}>
              No related results found for {query}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#09090B",
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    gap: 12,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: "col",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: 1,
  },
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 20,
    gap: 16,
  },
  postConfessionBg: {
    backgroundColor: "rgba(245, 158, 11, 0.03)",
  },
  postVoidBg: {
    backgroundColor: "#09090B",
  },
  postMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  profileLayout: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#16161A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  authorMeta: {
    flex: 1,
  },
  metaTextGroup: {
    flexDirection: "column",
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  facultyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  subMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  departmentText: {
    fontSize: 13,
    fontWeight: "300",
    color: "rgba(255, 255, 255, 0.4)",
    maxWidth: "60%",
  },
  dotSeparator: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 4,
  },
  timeText: {
    fontSize: 13,
    fontWeight: "300",
    color: "rgba(255, 255, 255, 0.4)",
  },
  metaRightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconActionPadding: {
    padding: 6,
  },
  verseIconWrapper: {
    padding: 4,
    borderRadius: 100,
  },
  postBodyTouchable: {
    flexDirection: "column",
    gap: 12,
    paddingHorizontal: 12,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeRose: {
    backgroundColor: "rgba(245, 158, 11, 0.08)",
  },
  badgeCyan: {
    backgroundColor: "rgba(23, 203, 73, 0.08)",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  textRose: {
    color: "#F59E0B",
  },
  textCyan: {
    color: "#17CB49",
  },
  bodyTextContainer: {
    marginTop: 2,
  },
  bodyText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 22,
    fontWeight: "400",
  },
  imageGrid: {
    marginTop: 4,
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    gap: 4,
  },
  gridSingle: {
    flexDirection: "column",
  },
  gridDouble: {
    flexDirection: "row",
  },
  attachedImage: {
    flex: 1,
    backgroundColor: "#16161A",
  },
  imageFullHeight: {
    height: 240,
    width: "100%",
  },
  imageSquareHeight: {
    height: 180,
  },
  engagementToolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 6,
  },
  leftToolbarActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  rightToolbarActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  toolbarButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 32,
  },
  toolbarIconButton: {
    height: 32,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  toolbarMetric: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
  },
  textUpvoted: {
    color: "#17CB49",
  },
  textDownvoted: {
    color: "#F59E0B",
  },
  textWhite: {
    color: "#FFFFFF",
  },
  noResultsCard: {
    margin: 16,
    paddingVertical: 48,
    paddingHorizontal: 16,
    backgroundColor: "#16161A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.3)",
    textAlign: "center",
    lineHeight: 20,
  },
});