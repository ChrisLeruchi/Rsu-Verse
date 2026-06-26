import { Alert, Share } from "react-native";
import { useAppContext } from "../src/context/AppContext";
import Toast from "react-native-toast-message";
import postService from "../src/services/postService";

export function useEngagement() {
  const { posts, setPosts, setIsSubmitted, selectedTopic, message } = useAppContext();

  const handleUpvote = async (postId) => {
    const backupPosts = [...posts];

    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id === postId) {
        const currentStatus = post.userInteraction.voteStatus;
        const isUpvoted = currentStatus === 'up';
        const isDownvoted = currentStatus === 'down';
        return {
          ...post,
          engagement: {
            ...post.engagement,
            upvotes: Math.max(0, post.engagement.upvotes + (isUpvoted ? -1 : 1)),
            downvotes: Math.max(0, post.engagement.downvotes + (isDownvoted ? -1 : 0)),
          },
          userInteraction: {
            ...post.userInteraction,
            voteStatus: isUpvoted ? null : 'up'
          }
        };
      }
      return post;
    }));

    try {
      await postService.toggleUpvote(postId);
    } catch (error) {
      setPosts(backupPosts);
      Alert.alert("Connection Lost", "We couldn't sync your upvote right now.");
    }
  };

  const handleDownvotes = async (postId) => {
    const backupPosts = JSON.parse(JSON.stringify(posts));

    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;
      const currentStatus = post.userInteraction.voteStatus;
      const isUpvoted = currentStatus === 'up';
      const isDownvoted = currentStatus === 'down';
      return {
        ...post,
        engagement: {
          ...post.engagement,
          upvotes: Math.max(0, post.engagement.upvotes + (isUpvoted ? -1 : 0)),
          downvotes: Math.max(0, post.engagement.downvotes + (isDownvoted ? -1 : 1)),
        },
        userInteraction: {
          ...post.userInteraction,
          voteStatus: isDownvoted ? null : 'down'
        }
      };
    }));

    try {
      await postService.toggleDownvote(postId);
    } catch (error) {
      setPosts(backupPosts);
      Alert.alert("Connection Lost", "We couldn't register your vote choice.");
    }
  };

  const handleCommentUpvote = async (postId, commentId) => {
    const backupPosts = JSON.parse(JSON.stringify(posts));

    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;
      return {
        ...post,
        engagement: {
          ...post.engagement,
          comments: post.engagement.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            const currentStatus = comment.userInteraction?.voteStatus;
            const isUpvoted = currentStatus === 'up';
            const isDownvoted = currentStatus === 'down';
            return {
              ...comment,
              engagement: {
                ...comment.engagement,
                upvotes: Math.max(0, comment.engagement.upvotes + (isUpvoted ? -1 : 1)),
                downvotes: Math.max(0, comment.engagement.downvotes + (isDownvoted ? -1 : 0)),
              },
              userInteraction: {
                ...comment.userInteraction,
                voteStatus: isUpvoted ? null : 'up',
              },
            };
          }),
        },
      };
    }));

    try {
      await postService.toggleCommentUpvote(postId, commentId);
    } catch (error) {
      setPosts(backupPosts);
      Alert.alert("Connection Lost", "We couldn't sync your upvote right now.");
    }
  };

  const handleCommentDownvote = async (postId, commentId) => {
    const backupPosts = JSON.parse(JSON.stringify(posts));

    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;
      return {
        ...post,
        engagement: {
          ...post.engagement,
          comments: post.engagement.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            const currentStatus = comment.userInteraction?.voteStatus;
            const isUpvoted = currentStatus === 'up';
            const isDownvoted = currentStatus === 'down';
            return {
              ...comment,
              engagement: {
                ...comment.engagement,
                upvotes: Math.max(0, comment.engagement.upvotes + (isUpvoted ? -1 : 0)),
                downvotes: Math.max(0, comment.engagement.downvotes + (isDownvoted ? -1 : 1)),
              },
              userInteraction: {
                ...comment.userInteraction,
                voteStatus: isDownvoted ? null : 'down',
              },
            };
          }),
        },
      };
    }));

    try {
      await postService.toggleCommentDownvote(postId, commentId);
    } catch (error) {
      setPosts(backupPosts);
      Alert.alert("Connection Lost", "We couldn't register your vote choice.");
    }
  };

  const handleReplyUpvote = async (postId, commentId, replyId) => {
    const backupPosts = JSON.parse(JSON.stringify(posts));

    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;
      return {
        ...post,
        engagement: {
          ...post.engagement,
          comments: post.engagement.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id !== replyId) return reply;
                const currentStatus = reply.userInteraction?.voteStatus;
                const isUpvoted = currentStatus === 'up';
                const isDownvoted = currentStatus === 'down';
                return {
                  ...reply,
                  engagement: {
                    ...reply.engagement,
                    upvotes: Math.max(0, reply.engagement.upvotes + (isUpvoted ? -1 : 1)),
                    downvotes: Math.max(0, reply.engagement.downvotes + (isDownvoted ? -1 : 0)),
                  },
                  userInteraction: {
                    ...reply.userInteraction,
                    voteStatus: isUpvoted ? null : 'up',
                  },
                };
              }),
            };
          }),
        },
      };
    }));

    try {
      await postService.addReply(postId, commentId, replyId);
    } catch (error) {
      setPosts(backupPosts);
      Alert.alert("Connection Lost", "We couldn't sync your upvote right now.");
    }
  };

  const handleReplyDownvote = async (postId, commentId, replyId) => {
    const backupPosts = JSON.parse(JSON.stringify(posts));

    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;
      return {
        ...post,
        engagement: {
          ...post.engagement,
          comments: post.engagement.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id !== replyId) return reply;
                const currentStatus = reply.userInteraction?.voteStatus;
                const isUpvoted = currentStatus === 'up';
                const isDownvoted = currentStatus === 'down';
                return {
                  ...reply,
                  engagement: {
                    ...reply.engagement,
                    upvotes: Math.max(0, reply.engagement.upvotes + (isUpvoted ? -1 : 0)),
                    downvotes: Math.max(0, reply.engagement.downvotes + (isDownvoted ? -1 : 1)),
                  },
                  userInteraction: {
                    ...reply.userInteraction,
                    voteStatus: isDownvoted ? null : 'down',
                  },
                };
              }),
            };
          }),
        },
      };
    }));

    try {
      await postService.addReply(postId, commentId, replyId);
    } catch (error) {
      setPosts(backupPosts);
      Alert.alert("Connection Lost", "We couldn't register your vote choice.");
    }
  };

  const handleRepost = async (postId) => {
    const backupPosts = JSON.parse(JSON.stringify(posts));

    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;
      const hasReposted = post.userInteraction?.reposts === true;
      return {
        ...post,
        engagement: {
          ...post.engagement,
          reposts: hasReposted ? Math.max(0, post.engagement.reposts - 1) : post.engagement.reposts + 1
        },
        userInteraction: {
          ...post.userInteraction,
          reposts: !hasReposted
        }
      };
    }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
    } catch (error) {
      setPosts(backupPosts);
      Alert.alert("Network Error", "Unable to forward broadcast metrics.");
    }
  };

  const handleSave = async (postId) => {
    const targetPost = posts.find((p) => p.id === postId);
    const isNowSaving = targetPost ? !targetPost.userInteraction.saved : true;
    const backupPosts = JSON.parse(JSON.stringify(posts));

    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;
      const hasSaved = post.userInteraction.saved === true;
      return {
        ...post,
        engagement: {
          ...post.engagement,
          saves: Math.max(0, hasSaved ? post.engagement.saves - 1 : post.engagement.saves + 1)
        },
        userInteraction: {
          ...post.userInteraction,
          saved: !hasSaved
        }
      };
    }));

    Toast.show({
      type: 'success',
      text1: isNowSaving ? 'Post saved to bookmarks!' : 'Post removed from bookmarks',
      position: 'top',
      visibilityTime: 1500
    });

    try {
      await postService.toggleSave(postId);
    } catch (error) {
      setPosts(backupPosts);
      Toast.show({
        type: 'error',
        text1: 'Could not update your bookmarks',
        position: 'top',
        visibilityTime: 1500
      });
    }
  };

  const handleShare = async (postId) => {
    try {
      await Share.share({
        message: `Check out this broadcast on Verse: verse://post/${postId}`,
      });
      await postService.trackShare(postId);
    } catch (error) {
      Alert.alert("Sharing Error", error.message);
    }
  };

  const handleSubmitSupport = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (selectedTopic && message) {
      setIsSubmitted(true);
    }
  };

  return {
    handleUpvote,
    handleDownvotes,
    handleCommentUpvote,
    handleCommentDownvote,
    handleReplyUpvote,
    handleReplyDownvote,
    handleRepost,
    handleSave,
    handleShare,
    handleSubmitSupport,
  };
}