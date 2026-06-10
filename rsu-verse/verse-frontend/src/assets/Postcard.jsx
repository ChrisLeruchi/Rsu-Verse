import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import {
  MoreHorizontal,
  ArrowBigDown,
  ArrowBigUp,
  MessageCircle,
  Send,
  Repeat,
  Bookmark,
  Repeat1,
  ArrowUpRight
} from "lucide-react-native";
import { formatRelativeTime } from "./formatRelativeTime";

export function PostCard({
  post,
  handleUpvote,
  handleDownvotes,
  handleRepost,
  handleSave,
  getVerseIcon,
  handleShare,
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
  const isReposted = post.userInteraction?.reposts;
  const handleNavigateToDetail = () => {
    navigation.navigate("PostDetail", { postId: post.id });
  };

  return (
    <View
      style={[
        styles.cardContainer,
        isConfession ? styles.confessionCardBg : styles.voidCardBg
      ]}
    >
    
      <View style={styles.headerLayer}>
        <View style={styles.profileRow}>
      
          <View style={styles.avatarPlaceholder} />

          <View style={styles.metaTextColumn}>
            <View style={styles.topInfoRow}>
              <View style={styles.identityBlock}>
                <Text numberOfLines={1} style={styles.authorTitle}>
                  {isMarket ? post.author?.name : post.author?.faculty}
                </Text>

                <View style={styles.subMetaRow}>
                  <Text numberOfLines={1} style={styles.handleText}>
                    @{post.author?.department}
                  </Text>
                  <Text style={styles.handleText}>
                    {" "}&bull; {formatRelativeTime(post.meta.createdAt)}
                  </Text>
                </View>
              </View>

         
              <View style={styles.utilityActionBox}>
                <Pressable style={styles.iconPadding}>
                  <MoreHorizontal size={18} color="rgba(255,255,255,0.3)" />
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

        <View style={styles.badgeWrapper}>
          <Text style={[styles.badgeText, isConfession ? styles.textRose : styles.textCyan]}>
            {isConfession ? 'CONFESSION' : post.verse?.toUpperCase()}
          </Text>
        </View>

       
        <Text style={styles.bodyText}>
          {post.content?.text}
        </Text>
      </Pressable>

     
      {post.content?.images && post.content.images.length > 0 && (
        <View style={[
          styles.imagesGrid,
          post.content.images.length === 1 ? styles.gridSingle : styles.gridMulti
        ]}>
          {post.content.images.map((imgUrl, index) => (
            <Image
              key={index}
              source={{ uri: imgUrl }}
              style={[
                styles.gridImage,
                post.content.images.length === 1 ? styles.singleImageSize : styles.multiImageSize
              ]}
            />
          ))}
        </View>
      )}

     
      {isMarket && (
        <View style={styles.marketContainer}>
          <View style={styles.marketInfoRow}>
            <Text numberOfLines={1} style={styles.marketPriceText}>
              ₦{post.marketPlace?.price}
            </Text>
            <Text style={styles.marketDivider}>-</Text>
            <Text numberOfLines={1} style={styles.marketConditionText}>
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
            onPress={() => handleUpvote(post.id)}
            style={styles.interactionButton}
          >
            <ArrowBigUp
              size={22}
              fill={isUpvoted ? "#17CB49" : "transparent"}
              color={isUpvoted ? "#17CB49" : "rgba(255,255,255,0.7)"}
              strokeWidth={isUpvoted ? 2 : 1.5}
            />
            <Text style={[styles.metricCounterText, isUpvoted && styles.textUpvotedGreen]}>
              {post.engagement?.upvotes}
            </Text>
          </Pressable>

         
          <Pressable
            onPress={() => handleDownvotes(post.id)}
            style={styles.interactionButton}
          >
            <ArrowBigDown
              size={22}
              fill={isDownvoted ? "#F59E0B" : "transparent"}
              color={isDownvoted ? "#F59E0B" : "rgba(255,255,255,0.7)"}
              strokeWidth={isDownvoted ? 2 : 1.5}
            />
            <Text style={[styles.metricCounterText, isDownvoted && styles.textRose]}>
              {post.engagement?.downvotes}
            </Text>
          </Pressable>

          
          <View style={styles.interactionButton}>
            <MessageCircle size={22} color="rgba(255,255,255,0.7)" onPress={handleNavigateToDetail}/>
            <Text style={styles.metricCounterText}>
              {totalCommentsAndReplies === 0 ? '' : totalCommentsAndReplies}
            </Text>
          </View>

         
          <Pressable
            onPress={() => handleRepost(post.id)}
            style={styles.interactionButton}
          >
            {isReposted ? (
              <Repeat1 size={22} color="#FFFFFF" />
            ) : (
              <Repeat size={22} color="rgba(255,255,255,0.7)" />
            )}
            <Text style={[styles.metricCounterText, isReposted && styles.textWhite]}>
              {post.engagement?.reposts === 0 ? '' : post.engagement?.reposts}
            </Text>
          </Pressable>
        </View>

  
        <View style={styles.rightActionGroup}>
          <Pressable
            onPress={() => handleSave(post.id)}
            style={styles.interactionButton}
          >
            <Bookmark
              size={22}
              fill={isSaved ? "#F59E0B" : "transparent"}
              color={isSaved ? "#F59E0B" : "rgba(255,255,255,0.7)"}
              strokeWidth={isSaved ? 2 : 1.5}
            />
          </Pressable>
          <Pressable
            onPress={() => handleShare(post.id)}
            style={styles.interactionButton}
          >
            <Send size={22} color="rgba(255,255,255,0.7)" />
          </Pressable>
        </View>
      </View>
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
    backgroundColor: '#121212',
  },
  confessionCardBg: {
    backgroundColor: 'rgba(245, 158, 11, 0.04)',
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
    borderWidth: 1,
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
  textWhite: {
    color: '#FFFFFF',
  }
});