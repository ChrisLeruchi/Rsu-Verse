import React, { useRef, useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions
} from "react-native";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Send,
  Bookmark,
  Repeat,
  ArrowBigDown,
  ArrowBigUp,
  ArrowUpRight,
  MoreHorizontal,
  ArrowLeft,
  MessageSquare,
  Repeat1
} from "lucide-react-native";
import { formatRelativeTime } from "../formatTime/formatRelativeTime";
import * as Crypto from 'expo-crypto';
import { ThemeTokens } from '../../../hooks/theme';
import postService from "../../services/postService";
const { width: windowWidth } = Dimensions.get("window");

export function PostDetail({
  posts,
  postId: directPostId,
  setPosts,
  handleSave,
  handleRepost,
  handleDownvotes,
  handleUpvote,
  handleCommentUpvote,
  handleCommentDownvote,
  getVerseIcon,
  selectedTheme,
  handleReplyUpvote,
  handleReplyDownvote
}) {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  const { postId: routePostId } = route.params || {};
  const postId = directPostId || routePostId;

  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [secReplyingTo, setSecReplyingTo] = useState(null);
  const [viewReply, setViewReply] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const post = posts.find(p => String(p.id) === String(postId));

  const scrollViewRef = useRef(null);
  const [localInput, setLocalInput] = useState("");

  useFocusEffect(
    useCallback(() => {
      return () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        setLocalInput("");
        setActiveImageIndex(0);
      };
    }, [])
  );

  if (!post) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: themeColor.background }]}>
        <Text style={[styles.errorText, { color: themeColor.textSecondary }]}>Post not found or has been removed.</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButtonInline}>
          <ArrowLeft size={16} color="#00BA34" />
          <Text style={styles.backButtonInlineText}>Back to Feed</Text>
        </Pressable>
      </View>
    );
  }

  const handleSendComment = async () => {
    if (!commentText.trim()) return;

    const rawSnippet = secReplyingTo ? secReplyingTo.text : null;
    const cleanSnippet = rawSnippet && rawSnippet.length > 25
      ? `${rawSnippet.substring(0, 25)}...`
      : rawSnippet;

    const newCommentId = Crypto.randomUUID();
    const backupPosts = JSON.parse(JSON.stringify(posts));
    setCommentError(null);
    setIsCommentSubmitting(true);

    const optimisticPosts = posts.map((p) => {
      if (p.id !== postId) return p;
      const rawComments = Array.isArray(p.engagement?.comments) ? p.engagement.comments : [];

      if (replyingTo) {
        return {
          ...p,
          engagement: {
            ...p.engagement,
            comments: rawComments.map((c) => {
              if (c.id !== replyingTo) return c;
              const rawReplies = Array.isArray(c.engagement?.replies) ? c.engagement.replies : [];

              const newReply = {
                id: Crypto.randomUUID(),
                author: { name: "Comp Eng", department: "Comp Eng" },
                text: commentText.trim(),
                createdAt: new Date().toISOString(),
                replyingToText: cleanSnippet,
                engagement: { upvotes: 0, downvotes: 0 }
              };

              return {
                ...c,
                engagement: { ...c.engagement, replies: [...rawReplies, newReply] }
              };
            })
          }
        };
      }

      const newComment = {
        id: newCommentId,
        author: { name: "Law", department: "Law" },
        text: commentText.trim(),
        createdAt: new Date().toISOString(),
        engagement: { upvotes: 0, downvotes: 0, replies: [] }
      };

      return {
        ...p,
        engagement: { ...p.engagement, comments: [newComment, ...rawComments] }
      };
    });

    setPosts(optimisticPosts);

    try {
      if (replyingTo) {
        await postService.addReply(postId, replyingTo, commentText.trim());
      } else {
        await postService.addComment(postId, commentText.trim());
      }

      setCommentText("");
      setReplyingTo(null);
      setSecReplyingTo(null);
      setViewReply(null);
      Keyboard.dismiss();
    } catch (error) {
      setPosts(backupPosts);
      const message = error?.message || 'Unable to submit your comment right now.';
      setCommentError(message);
      Alert.alert('Comment Failed', message);
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / windowWidth);
    setActiveImageIndex(index);
  };

  const isConfession = post.verse === "confession";

  return (
    <View style={[styles.screenWrapper, { backgroundColor: themeColor.background }]}>
      <SafeAreaView edges={['top', 'left', 'right']} style={[styles.safeAreaHeader, { backgroundColor: themeColor.background, borderBottomColor: themeColor.border }]}>
        <View style={styles.headerContainer}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconHitbox}>
            <ArrowLeft size={22} color={isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: themeColor.textPrimary }]}>{post.verse}</Text>
          <Pressable style={styles.iconHitbox}>
            <MoreHorizontal size={22} color={isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)"} />
          </Pressable>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[
            styles.mainPostCard,
            isConfession ? styles.cardConfession : styles.cardDefault,
            {
              backgroundColor: isConfession ? (isDark ? "rgba(245, 158, 11, 0.1)" : "rgba(245, 158, 11, 0.05)") : themeColor.background,
              borderBottomColor: themeColor.border
            }
          ]}>
            <View style={styles.authorRow}>
              <View style={styles.avatarPlaceholder} />
              <View style={styles.metaColumn}>
                <Text style={[styles.authorName, { color: themeColor.textPrimary }]}>
                  {post.verse === "market" ? post.author?.name : post.author?.faculty}
                </Text>
                <Text style={[styles.authorHandle, { color: themeColor.textSecondary }]}>
                  @{post.author?.department} • {formatRelativeTime(post.meta?.createdAt || post.createdAt)}
                </Text>
              </View>
              {getVerseIcon && (
                <View style={styles.verseIconContainer}>
                  {getVerseIcon(post.verse)}
                </View>
              )}
            </View>

            <View style={[styles.badgeWrapper, isConfession ? styles.badgeRose : styles.badgeCyan]}>
              <Text style={[styles.badgeText, isConfession ? styles.textRose : styles.textCyan]}>
                {isConfession ? 'CONFESSION' : post.verse?.toUpperCase()}
              </Text>
            </View>

            <Text style={[styles.bodyText, { color: themeColor.textPrimary }]}>{post.content?.text}</Text>

            {post.content?.images && post.content.images.length > 0 && (
              <View style={styles.instagramContainer}>
                {post.content.images.length === 1 ? (
                  <Image
                    source={{ uri: post.content.images[0] }}
                    style={styles.instagramFullHeightImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View>
                    <ScrollView
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      onScroll={handleScroll}
                      scrollEventThrottle={16}
                    >
                      {post.content.images.map((imgUrl, index) => (
                        <Image
                          key={index}
                          source={{ uri: imgUrl }}
                          style={[styles.instagramFullHeightImage, { width: windowWidth }]}
                          resizeMode="cover"
                        />
                      ))}
                    </ScrollView>
                    <View style={styles.paginationDotsWrapper}>
                      {post.content.images.map((_, index) => (
                        <View
                          key={index}
                          style={[
                            styles.paginationDotElement,
                            activeImageIndex === index
                              ? [styles.paginationDotActive, { backgroundColor: "#00BA34" }]
                              : [styles.paginationDotInactive, { backgroundColor: isDark ? "rgba(255, 255, 255, 0.24)" : "rgba(0, 0, 0, 0.16)" }]
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}

            {post.verse === "market" && (
              <View style={[styles.marketBar, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
                <Text style={[styles.marketPrice, { color: themeColor.textPrimary }]}>₦{post.marketPlace?.price?.toLocaleString()}</Text>
                <Text style={styles.marketDivider}>-</Text>
                <Text style={[styles.marketCondition, { color: themeColor.textSecondary }]}>{post.marketPlace?.condition}</Text>
                <Pressable style={styles.marketBuyBtn}>
                  <Text style={styles.marketBuyBtnText}>Buy Now</Text>
                  <ArrowUpRight size={16} color="#FFFFFF" />
                </Pressable>
              </View>
            )}

            <View style={[styles.interactionFooter, { borderTopColor: themeColor.border }]}>
              <View style={styles.leftMetrics}>
                <Pressable onPress={() => handleUpvote?.(post.id)} style={styles.metricBtn}>
                  <ArrowBigUp size={22} fill={post.userInteraction?.voteStatus === "up" ? "#00BA34" : 'none'} color={post.userInteraction?.voteStatus === "up" ? "#00BA34" : (isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)")} />
                  <Text
                    style={[
                      styles.metricText,
                      { color: post.userInteraction?.voteStatus === "up" ? "rgba(0, 186, 52, 1)" : (isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)") }
                    ]}
                  >
                    {post.engagement?.upvotes || 0}
                  </Text>
                </Pressable>

                <Pressable onPress={() => handleDownvotes?.(post.id)} style={styles.metricBtn}>
                  <ArrowBigDown size={22} fill={post.userInteraction?.voteStatus === "down" ? "#F59E0B" : 'none'} color={post.userInteraction?.voteStatus === "down" ? "#F59E0B" : (isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)")} />
                  <Text
                    style={[
                      styles.metricText,
                      { color: post.userInteraction?.voteStatus === "down" ? "rgba(245, 158, 11, 1)" : (isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)") }
                    ]}
                  >
                    {post.engagement?.downvotes || 0}
                  </Text>
                </Pressable>

                <Pressable onPress={() => handleRepost?.(post.id)} style={styles.metricBtn}>
                  {post.userInteraction?.reposts ? <Repeat1 size={22} color={themeColor.textPrimary} /> : <Repeat size={22} color={isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"} />}
                  <Text
                    style={[
                      styles.metricText,
                      { color: isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)" }
                    ]}
                  >
                    {post.engagement?.reposts || ''}
                  </Text>
                </Pressable>
              </View>

              <Pressable onPress={() => handleSave?.(post.id)} style={styles.metricBtn}>
                <Bookmark size={20} fill={post.userInteraction?.saved ? "#FFCC00" : "none"} color={post.userInteraction?.saved ? "#FFCC00" : (isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)")} />
              </Pressable>
            </View>
          </View>

          <View style={styles.commentsSection}>
            {!post.engagement?.comments || post.engagement.comments.length === 0 ? (
              <View style={styles.emptyCommentsBox}>
                <MessageSquare size={22} color={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)"} />
                <Text style={[styles.emptyCommentsText, { color: themeColor.textSecondary }]}>Be the first to comment</Text>
              </View>
            ) : (
              post.engagement.comments.map((comment) => {
                const replyCount = comment.engagement?.replies?.length || 0;
                const isCurrentParentReplying = replyingTo === comment.id && !secReplyingTo;

                return (
                  <View key={comment.id} style={styles.commentItemBlock}>
                    <View style={styles.commentRowStructure}>
                      <View style={styles.leftTimelineColumn}>
                        <View style={styles.commentAvatar} />
                        {viewReply === comment.id && replyCount > 0 && (
                          <View style={[styles.verticalThreadLine, { backgroundColor: themeColor.border }]} />
                        )}
                      </View>

                      <View style={[styles.commentRightContent, { borderBottomColor: themeColor.border }]}>
                        <View style={styles.commentHeaderRow}>
                          <Text style={[styles.commentAuthorName, { color: themeColor.textPrimary }]}>{comment.author?.department}</Text>
                          <Text style={[styles.commentTimestamp, { color: themeColor.textSecondary }]}>• {formatRelativeTime(comment.createdAt)}</Text>
                          <Pressable style={styles.commentMoreBtn}>
                            <MoreHorizontal size={16} color={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"} />
                          </Pressable>
                        </View>

                        <Text style={[styles.commentBodyText, { color: themeColor.textPrimary }]}>{comment.text}</Text>

                        <View style={styles.commentControlsRow}>
                          <View style={styles.commentActionGroup}>
                            <Pressable
                              onPress={() => {
                                if (isCurrentParentReplying) {
                                  setReplyingTo(null);
                                } else {
                                  setReplyingTo(comment.id);
                                  setSecReplyingTo(null);
                                }
                              }}
                              style={styles.actionInlineLink}
                            >
                              <Text style={[styles.controlLinkText, isCurrentParentReplying && styles.activeTextLink]}>
                                {isCurrentParentReplying ? "Cancel Reply" : "Reply"}
                              </Text>
                            </Pressable>

                            <Pressable
                              onPress={() => setViewReply(viewReply === comment.id ? null : comment.id)}
                              style={styles.actionInlineLink}
                            >
                              {replyCount > 0 ? <Text style={[styles.controlLinkText, viewReply === comment.id && styles.activeTextLink]}>
                                {viewReply === comment.id ? 'Hide replies' : `View ${replyCount === 0 ? '' : replyCount} repl${replyCount > 1 || replyCount === 0 ? 'ies' : 'y'}`}
                              </Text> : ''}
                            </Pressable>
                          </View>

                          <View style={styles.commentVoteMetrics}>
                            <Pressable onPress={() => handleCommentUpvote(post.id, comment.id)} style={styles.voteActionBtn}>
                              <ArrowBigUp size={22} color={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} />
                              <Text style={[styles.voteMetricText, { color: themeColor.textSecondary }]}>{comment.engagement?.upvotes || ""}</Text>
                            </Pressable>
                            <Pressable onPress={() => handleCommentDownvote(post.id, comment.id)} style={styles.voteActionBtn}>
                              <ArrowBigDown size={22} color={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} />
                              <Text style={[styles.voteMetricText, { color: themeColor.textSecondary }]}>{comment.engagement?.downvotes || ""}</Text>
                            </Pressable>
                          </View>
                        </View>

                        {viewReply === comment.id && comment.engagement?.replies?.map((reply, rIdx) => {
                          const isCurrentSubReplying = secReplyingTo?.id === reply.id;
                          return (
                            <View key={reply.id || rIdx} style={styles.replyNestedBlock}>
                              <View style={styles.replyLeftColumn}>
                                <View style={styles.replyAvatar} />
                              </View>
                              <View style={styles.replyRightContent}>
                                <View style={styles.replyHeaderRow}>
                                  <Text style={[styles.replyAuthorName, { color: themeColor.textPrimary }]}>{reply.author?.department || "Comp Eng"}</Text>
                                  <Text style={[styles.replyTimestamp, { color: themeColor.textSecondary }]}>• {formatRelativeTime(reply.createdAt || new Date().toISOString())}</Text>
                                </View>

                                {reply.replyingToText && (
                                  <View style={[styles.contextQuoteBadge, { backgroundColor: themeColor.surface, borderLeftColor: themeColor.border }]}>
                                    <Text style={[styles.contextQuoteText, { color: themeColor.textSecondary }]}>
                                      → {reply.replyingToText}...
                                    </Text>
                                  </View>
                                )}

                                <Text style={[styles.replyBodyText, { color: themeColor.textPrimary }]}>{reply.text || reply}</Text>

                                <View style={styles.replyControlsRow}>
                                  <View style={styles.commentActionGroup}>
                                    <Pressable
                                      onPress={() => {
                                        if (isCurrentSubReplying) {
                                          setReplyingTo(null);
                                          setSecReplyingTo(null);
                                        } else {
                                          setReplyingTo(comment.id);
                                          setSecReplyingTo(reply);
                                        }
                                      }}
                                      style={styles.actionInlineLink}
                                    >
                                      <Text style={[styles.controlLinkText, isCurrentSubReplying && styles.activeTextLink]}>
                                        {isCurrentSubReplying ? "Cancel Reply" : "Reply"}
                                      </Text>
                                    </Pressable>
                                  </View>

                                  <View style={styles.commentVoteMetrics}>
                                    <Pressable style={styles.voteActionBtn}>
                                      <ArrowBigUp size={22} color={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"} />
                                      <Text style={[styles.voteMetricText, { color: themeColor.textSecondary }]}>{reply.engagement?.upvotes || ""}</Text>
                                    </Pressable>
                                    <Pressable style={styles.voteActionBtn}>
                                      <ArrowBigDown size={22} color={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"} />
                                      <Text style={[styles.voteMetricText, { color: themeColor.textSecondary }]}>{reply.engagement?.downvotes || ""}</Text>
                                    </Pressable>
                                  </View>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>

        <View style={[
          styles.fixedFooterInputArea,
          { backgroundColor: themeColor.background, borderTopColor: themeColor.border },
          { paddingBottom: insets.bottom > 0 ? insets.bottom : 12 }
        ]}>
          {replyingTo && (
            <View style={[styles.replyContextNotificationBar, { backgroundColor: isDark ? "rgba(0, 186, 52, 0.04)" : "rgba(0, 186, 52, 0.08)" }]}>
              <View style={styles.replyContextFlex}>
                <Text style={styles.replyContextLabel}>Replying </Text>
                <Text style={[styles.replyContextQuote, { color: themeColor.textSecondary }]} numberOfLines={1}>
                  {secReplyingTo ? `"${secReplyingTo.text}"` : `"${post.engagement.comments.find(c => c.id === replyingTo)?.text}"`}
                </Text>
              </View>
              <Pressable onPress={() => { setReplyingTo(null); setSecReplyingTo(null); }} style={styles.clearBadgeHitbox}>
                <Text style={styles.clearReplyContextBtn}>✕</Text>
              </Pressable>
            </View>
          )}
          <View style={styles.inputActionWrapper}>
            <TextInput
              style={[styles.nativeCommentInput, { backgroundColor: themeColor.surface, borderColor: themeColor.border, color: themeColor.textPrimary }]}
              value={commentText}
              onChangeText={setCommentText}
              placeholder={secReplyingTo ? `Replying to "${secReplyingTo.text?.substring(0, 15)}..."` : replyingTo ? 'Send reply...' : 'Post a comment...'}
              placeholderTextColor={themeColor.textSecondary}
              multiline={false}
            />
            <Pressable
              onPress={handleSendComment}
              disabled={!commentText.trim()}
              style={[styles.sendButtonCircle, !commentText.trim() && styles.sendButtonDisabled]}
            >
              <Send size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeAreaHeader: {
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.04)",
  },
  headerContainer: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  iconHitbox: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 15,
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    textTransform: "uppercase"
  },
  scrollContainer: {
    paddingBottom: 140,
  },
  mainPostCard: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.06)",
    paddingVertical: 18,
    gap: 12,
  },
  cardDefault: {
    backgroundColor: '#000000',
  },
  cardConfession: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
  },
  authorRow: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1F2633",
  },
  metaColumn: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  authorHandle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: 1,
  },
  verseIconContainer: {
    padding: 4,
  },
  badgeWrapper: {
    alignSelf: 'flex-start',
    marginHorizontal: 14,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeCyan: { backgroundColor: "rgba(0, 186, 52, 0.08)" },
  badgeRose: { backgroundColor: "rgba(245, 158, 11, 0.08)" },
  badgeText: { fontSize: 10, fontWeight: "700", },
  textCyan: { color: "#00BA34" },
  textRose: { color: "#F59E0B" },
  bodyText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.92)",
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  instagramContainer: {
    marginTop: 4,
    overflow: "hidden",
    position: "relative",
  },
  instagramFullHeightImage: {
    width: windowWidth,
    height: 400,
  },
  paginationDotsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
  },
  paginationDotElement: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  paginationDotActive: {
    transform: [{ scale: 1.15 }],
  },
  paginationDotInactive: {
    opacity: 1,
  },
  imageGrid: {
    marginTop: 4,
    overflow: "hidden",
    gap: 4,
  },
  gridSingle: { height: 240 },
  gridMulti: { height: 160, flexDirection: "row" },
  attachedImage: { flex: 1, height: "100%" },
  marketBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D0F14",
    padding: 10,
    borderRadius: 8,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  marketPrice: { fontSize: 15, fontWeight: "700", color: "#FFFFFF" },
  marketDivider: { marginHorizontal: 6, color: "rgba(255, 255, 255, 0.2)" },
  marketCondition: { fontSize: 13, color: "rgba(255, 255, 255, 0.4)", flex: 1 },
  marketBuyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00BA34",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 4,
  },
  marketBuyBtnText: { color: "#FFFFFF", fontWeight: "600", fontSize: 12 },
  interactionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.04)",
  },
  leftMetrics: { flexDirection: "row", gap: 24 },
  metricBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  metricText: { fontSize: 12, fontWeight: "500" },
  commentsSection: { paddingVertical: 4 },
  emptyCommentsBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    gap: 6,
  },
  emptyCommentsText: { color: "rgba(255, 255, 255, 0.3)", fontSize: 13 },
  commentItemBlock: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  commentRowStructure: {
    flexDirection: "row",
    gap: 12,
  },
  leftTimelineColumn: {
    alignItems: "center",
    width: 36,
  },
  verticalThreadLine: {
    flex: 1,
    width: 1.5,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginTop: 6,
    marginBottom: -14,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#131722"
  },
  commentRightContent: {
    flex: 1,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.03)",
  },
  commentHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentAuthorName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600"
  },
  commentTimestamp: {
    color: "rgba(255, 255, 255, 0.35)",
    fontSize: 12,
    marginLeft: 4,
    flex: 1
  },
  commentMoreBtn: {
    padding: 2,
  },
  commentBodyText: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 14,
    lineHeight: 19,
    marginTop: 3,
  },
  commentControlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  commentActionGroup: {
    flexDirection: "row",
    gap: 16
  },
  actionInlineLink: {
    paddingVertical: 2,
  },
  controlLinkText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 12,
    fontWeight: "600"
  },
  activeTextLink: {
    color: "#00BA34"
  },
  commentVoteMetrics: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  voteActionBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  voteMetricText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 11,
    marginLeft: -1,
  },
  replyNestedBlock: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  replyLeftColumn: {
    alignItems: "center",
  },
  replyAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#1F2633"
  },
  replyRightContent: {
    flex: 1
  },
  replyHeaderRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  replyAuthorName: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600"
  },
  replyTimestamp: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 11,
    marginLeft: 4
  },
  contextQuoteBadge: {
    alignSelf: 'flex-start',
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginVertical: 4,
    borderLeftWidth: 2,
    borderLeftColor: "rgba(255, 255, 255, 0.15)",
  },
  contextQuoteText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.4)",
  },
  replyBodyText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 1,
  },
  replyControlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  fixedFooterInputArea: {
    backgroundColor: "#000000",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  replyContextNotificationBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 186, 52, 0.04)",
    borderLeftWidth: 2,
    borderLeftColor: "#00BA34",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 8,
  },
  replyContextFlex: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  replyContextLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#00BA34"
  },
  replyContextQuote: {
    color: "rgba(255, 255, 255, 0.4)",
    fontStyle: "italic",
    fontSize: 11,
    flex: 1,
  },
  clearBadgeHitbox: {
    padding: 2,
  },
  clearReplyContextBtn: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 11,
    fontWeight: "600"
  },
  inputActionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  nativeCommentInput: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 20,
    color: "#FFFFFF",
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  sendButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#00BA34",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.4,
    backgroundColor: "#00BA34"
  },
  errorContainer: { flex: 1, backgroundColor: "#1A1A1A", alignItems: "center", justifyContent: "center", padding: 24 },
  errorText: { color: "rgba(255, 255, 255, 0.4)", fontSize: 13, textAlign: "center" },
  backButtonInline: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 14 },
  backButtonInlineText: { color: "#00BA34", fontSize: 13, fontWeight: "600" },
});