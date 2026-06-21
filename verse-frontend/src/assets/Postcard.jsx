import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import {
  MoreHorizontal,
  ArrowBigDown,
  ArrowBigUp,
  MessageCircle,
  Send,
  Repeat,
  Bookmark,
  ArrowUpRight,
  AlertCircle,
  UserRoundX
} from "lucide-react-native";
import { useRelativeTime } from "./useRelativeTime";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming
} from 'react-native-reanimated';

import { HapticEngine } from '../../haptics';
import { ThemeTokens } from '../theme';

export function PostCard({
  post,
  handleUpvote,
  handleDownvotes,
  handleRepost,
  handleSave,
  getVerseIcon,
  handleShare,
  selectedTheme,
  setSelectedTheme,
  navigation
}) {

  const totalCommentsAndReplies = post.engagement?.comments?.reduce((total, comment) => {
    const replyCount = comment.engagement?.replies?.length || 0;
    return total + 1 + replyCount;
  }, 0) || 0;

  const isConfession = post.verse === 'confession';
  const isMarket = post.verse === 'market';
  const isUpvoted = post.userInteraction?.voteStatus === 'up';
  const isDownvoted = post.userInteraction?.voteStatus === 'down';
  const isSaved = post.userInteraction?.saved;
  const [isDotOpen, setIsDotOpen] = useState(false);
  const isReposted = post.userInteraction?.reposts;

  const upvoteScale = useSharedValue(1);
  const downvoteScale = useSharedValue(1);

  const repostScale = useSharedValue(1);
  const repostRotate = useSharedValue(0);

  const saveScale = useSharedValue(1);
  const saveTranslateY = useSharedValue(0);

  useEffect(() => {
    if (isUpvoted) {
      upvoteScale.value = withSequence(
        withTiming(1.5, { duration: 450 }),
        withTiming(1.2, { duration: 80 })
      );
    }
  }, [isUpvoted]);

  useEffect(() => {
    if (isDownvoted) {
      downvoteScale.value = withSequence(
        withTiming(0.9, { duration: 80 }),
        withTiming(1.2, { duration: 450 })
      )
    }
  }, [isDownvoted])

  useEffect(() => {
    if (isReposted) {
      repostRotate.value = withTiming(360, { duration: 400 });

      repostScale.value = withSequence(
        withTiming(1.2, { duration: 80 }),
        withTiming(1, { duration: 80 })
      );
    } else {
      repostRotate.value = withTiming(0, { duration: 200 });
    }
  }, [isReposted]);

  useEffect(() => {
    if (!isSaved) {
      saveTranslateY.value = withSequence(
        withTiming(6, { duration: 60 }),
        withTiming(0, { duration: 80 })
      );

      saveScale.value = withSequence(
        withTiming(1.15, { duration: 70 }),
        withTiming(1, { duration: 70 })
      );
    }
  }, [!isSaved]);

  const animatedRepostStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: repostScale.value },
        { rotate: `${repostRotate.value}deg` }
      ],
    };
  });

  const animatedSaveStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: saveScale.value },
        { translateY: saveTranslateY.value }
      ],
    };
  });

  const animatedUpvoteStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: upvoteScale.value }],
    };
  });

  const animatedDownvoteStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: downvoteScale.value }]
    };
  })

  const handleRepostPress = () => {
    HapticEngine.medium();

    repostRotate.value = withTiming(isReposted ? 0 : 360, { duration: 200 });
    repostScale.value = withSequence(
      withTiming(1.2, { duration: 80 }),
      withTiming(1, { duration: 80 })
    );

    handleRepost(post.id);
  };

  const handleSavePress = () => {
    HapticEngine.light();

    saveScale.value = withSequence(
      withTiming(0.9, { duration: 40 }),
      withTiming(1, { duration: 40 })
    );

    handleSave(post.id);
  }

  const handleUpvotePress = () => {
    HapticEngine.medium();
    upvoteScale.value = withSequence(
      withTiming(0.9, { duration: 450 }),
      withTiming(1, { duration: 40 })
    );
    handleUpvote(post.id);
  };

  const handleDownvotePress = () => {
    HapticEngine.light();
    downvoteScale.value = withSequence(
      withTiming(0.9, { duration: 450 }),
      withTiming(1, { duration: 40 })
    )
    handleDownvotes(post.id)
  }

  const handleNavigateToDetail = () => {
    navigation.navigate("Comments", { postId: post.id });
  };

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  return (
    <View
      style={[
        styles.cardContainer,
        { borderBottomColor: themeColor.border },
        isConfession ? isDark ? styles.confessionCardBg : {backgroundColor: themeColor.background} : { backgroundColor: themeColor.background }
      ]}
    >

      <View style={styles.headerLayer}>
        <View style={styles.profileRow}>

          <View style={[styles.avatarPlaceholder, { backgroundColor: themeColor.surface }]} />

          <View style={styles.metaTextColumn}>
            <View style={styles.topInfoRow}>
              <View style={styles.identityBlock}>
                <Text numberOfLines={1} style={[styles.authorTitle, { color: themeColor.textPrimary }]}>
                  {isMarket ? post.author?.name : post.author?.faculty}
                </Text>

                <View style={styles.subMetaRow}>
                  <Text numberOfLines={1} style={[styles.handleText, { color: themeColor.textMuted }]}>
                    @{post.author?.department}
                  </Text>
                  <Text style={[styles.handleText, { color: themeColor.textMuted }]}>
                    {" "}&bull; {useRelativeTime(post.meta.createdAt)}
                  </Text>
                </View>
              </View>

              <View style={styles.utilityActionBox}>
                <Pressable
                  style={styles.iconPadding}
                  onPress={() => setIsDotOpen(true)}
                >
                  <MoreHorizontal size={18} color={themeColor.textMuted} />
                </Pressable>
                <View style={styles.badgeIconWrapper}>
                  {getVerseIcon?.(post.verse)}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Pressable
        onPress={handleNavigateToDetail}
        style={styles.contentBodyWrapper}
      >

        <View style={[styles.badgeWrapper, { backgroundColor: themeColor.surface }]}>
          <Text style={[styles.badgeText, isConfession ? styles.textRose : styles.textCyan]}>
            {isConfession ? 'CONFESSION' : post.verse?.toUpperCase()}
          </Text>
        </View>

        {post.content?.text && (
          <Text style={[styles.bodyText, { color: themeColor.textPrimary }]}>
            {post.content?.text}
          </Text>
        )}
      </Pressable>

      {post.content?.images && post.content.images.length > 0 && (
        <View style={[
          styles.imagesGrid,
          { borderColor: themeColor.border },
          post.content.images.length === 1 ? styles.gridSingle : styles.gridMulti
        ]}>
          {post.content.images.map((imgUrl, index) => (
            <Image
              key={index}
              source={imgUrl}
              style={[
                styles.gridImage,
                { backgroundColor: themeColor.surface },
                post.content.images.length === 1 ? styles.singleImageSize : styles.multiImageSize
              ]}
              contentFit="cover"
              transition={200}
              cachePolicy="disk"
            />
          ))}
        </View>
      )}

      {isMarket && (
        <View style={styles.marketContainer}>
          <View style={styles.marketInfoRow}>
            <Text numberOfLines={1} style={[styles.marketPriceText, { color: themeColor.textPrimary }]}>
              ₦{post.marketPlace?.price}
            </Text>
            <Text style={[styles.marketDivider, { color: themeColor.textMuted }]}>-</Text>
            <Text numberOfLines={1} style={[styles.marketConditionText, { color: themeColor.textPrimary }]}>
              {post.marketPlace?.condition}
            </Text>
          </View>
          <Pressable style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy Now </Text>
            <ArrowUpRight size={16} color="rgba(255,255,255,0.9)" />
          </Pressable>
        </View>
      )}

      <View style={styles.toolbarWrapper}>
        <View style={styles.leftActionGroup}>

          <Pressable
            onPress={handleUpvotePress}
            style={styles.interactionButton}
          >
            <Animated.View style={animatedUpvoteStyle}>
              <ArrowBigUp
                size={22}
                fill={isUpvoted ? "#17CB49" : "transparent"}
                color={isUpvoted ? "#17CB49" : themeColor.textSecondary}
                strokeWidth={isUpvoted ? 2 : 1.5}
              />
            </Animated.View>
            <Text style={[styles.metricCounterText, { color: themeColor.textSecondary }, isUpvoted && styles.textUpvotedGreen]}>
              {post.engagement?.upvotes}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleDownvotePress}
            style={styles.interactionButton}
          >
            <Animated.View style={animatedDownvoteStyle}>
              <ArrowBigDown
                size={22}
                fill={isDownvoted ? "#F59E0B" : "transparent"}
                color={isDownvoted ? "#F59E0B" : themeColor.textSecondary}
                strokeWidth={isDownvoted ? 2 : 1.5}
              />
            </Animated.View>
            <Text style={[styles.metricCounterText, { color: themeColor.textSecondary }, isDownvoted && styles.textRose]}>
              {post.engagement?.downvotes}
            </Text>
          </Pressable>

          <View style={styles.interactionButton}>
            <MessageCircle size={22} color={themeColor.textSecondary} onPress={handleNavigateToDetail} />
            <Text style={[styles.metricCounterText, { color: themeColor.textSecondary }]}>
              {totalCommentsAndReplies === 0 ? '' : totalCommentsAndReplies}
            </Text>
          </View>

          <Pressable
            onPress={handleRepostPress}
            style={styles.interactionButton}
          >
            <Animated.View style={animatedRepostStyle}>
              {isReposted ? (
                <Repeat size={22} color="#17CB49" />
              ) : (
                <Repeat size={22} color={themeColor.textSecondary} />
              )}
            </Animated.View>
            <Text style={[styles.metricCounterText, { color: themeColor.textSecondary }, isReposted && styles.textCyan]}>
              {post.engagement?.reposts === 0 ? '' : post.engagement?.reposts}
            </Text>
          </Pressable>
        </View>

        <View style={styles.rightActionGroup}>
          <Pressable
            onPress={handleSavePress}
            style={styles.interactionButton}
          >
            <Animated.View style={animatedSaveStyle}>
              <Bookmark
                size={22}
                fill={isSaved ? "#F59E0B" : "transparent"}
                color={isSaved ? "#F59E0B" : themeColor.textSecondary}
                strokeWidth={isSaved ? 2 : 1.5}
              />
            </Animated.View>
          </Pressable>
          <Pressable
            onPress={() => handleShare(post.id)}
            style={styles.interactionButton}
          >
            <Send size={22} color={themeColor.textSecondary} />
          </Pressable>
        </View>
      </View>
      <Modal
        key={post.id}
        visible={isDotOpen}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setIsDotOpen(false)}
      >
        <View
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            onPress={() => setIsDotOpen(false)}
            activeOpacity={1}
            style={styles.backdropPressable}
          />

          <View style={[styles.bottomSheetContainer, { backgroundColor: themeColor.background, borderColor: themeColor.border }]}>
            <View style={[styles.sheetHandle, { backgroundColor: themeColor.border }]} />

            <View style={styles.metricsList}>
              <Pressable style={[styles.metricBox, { backgroundColor: themeColor.surface }]}>
                <View style={[styles.metricHeaderRow, { backgroundColor: themeColor.surface }]}>
                  <AlertCircle size={16} color="rgba(245, 0, 0, 1)" />
                  <Text style={[styles.metricLabel, { color: "rgba(245, 0, 0, 1)" }]}>Report Post</Text>
                </View>
              </Pressable>

              <View style={[styles.metricBox, { backgroundColor: themeColor.surface }]}>
                <View style={[styles.metricHeaderRow, { backgroundColor: themeColor.surface }]}>
                  <UserRoundX size={16} color={themeColor.textSecondary} />
                  <Text style={[styles.metricLabel, { color: themeColor.textSecondary }]}>Block User</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 20,
    gap: 16,
  },
  voidCardBg: {
    backgroundColor: '#000000',
  },
  confessionCardBg: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  headerLayer: {
    paddingHorizontal: 12,
    width: '100%',
  },
  profileRow: {
    flexDirection: 'row',
    gap: 6,
    width: '100%',
  },
  avatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 28,
    backgroundColor: '#374151',
  },
  metaTextColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  topInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  identityBlock: {
    flex: 1,
    gap: 4,
  },
  authorTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  subMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  handleText: {
    fontSize: 14,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.3)',
  },
  utilityActionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconPadding: {
    padding: 4,
  },
  badgeIconWrapper: {
    padding: 4,
    borderRadius: 9999,
  },
  contentBodyWrapper: {
    paddingHorizontal: 12,
    gap: 16,
  },
  badgeWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  textRose: {
    color: '#F59E0B',
  },
  textCyan: {
    color: '#00BA34',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.25,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
  },
  imagesGrid: {
    marginTop: 12,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    gap: 6,
  },
  gridSingle: {
    flexDirection: 'column',
  },
  gridMulti: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
  },
  singleImageSize: {
    width: '100%',
    maxHeight: 440,
    aspectRatio: 1.33,
  },
  multiImageSize: {
    width: '49%',
    aspectRatio: 1,
  },
  marketContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  marketInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  marketPriceText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  marketDivider: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  marketConditionText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BA34',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buyButtonText: {
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
  },
  toolbarWrapper: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  rightActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    gap: 4,
    minWidth: 40,
  },
  metricCounterText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'System',
  },
  textUpvotedGreen: {
    color: '#17CB49',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    backgroundColor: "#000000",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 100,
    paddingHorizontal: 16,
    paddingTop: 10,
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backdropPressable: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  metricBox: {
    width: "100%",
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 16
  },
  metricsList: {
    flexDirection: "column",
    gap: 12,
    width: "100%"
  },
  metricHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    marginBottom: 6,
    gap: 4,
    justifyContent: 'center'
  },
  metricLabel: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.4)",
    letterSpacing: 0.5,
  },
});