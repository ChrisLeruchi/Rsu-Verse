import API from '../api/client';

let postServiceEnabled = true;

export const setPostServiceEnabled = (value) => {
  postServiceEnabled = Boolean(value);
};

const makeDisabledResponse = (payload) => Promise.resolve(payload);

const postService = {
  getAllPosts: async () => {
    console.log('📰 [POSTS] getAllPosts called');
    if (!postServiceEnabled) {
      console.log('⚠️ [POSTS] Backend disconnected, returning empty feed');
      return makeDisabledResponse({ data: { data: { feed: [] } } });
    }
    try {
      const response = await API.get('/posts');
      console.log(`✅ [POSTS] Fetched ${response.data?.data?.feed?.length ?? 0} posts`);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Failed to fetch posts:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Could not fetch posts');
    }
  },

  createPost: async (postData) => {
    console.log('✍️ [POSTS] createPost called');
    console.log('✍️ [POSTS] Post data:', postData);
    if (!postServiceEnabled) {
      console.log('⚠️ [POSTS] Backend disconnected, simulating createPost');
      return makeDisabledResponse({ data: { data: { post: postData, message: 'Post service disconnected - local post created' } } });
    }
    try {
      const response = await API.post('/posts', postData);
      console.log('✅ [POSTS] Post created:', response.data?.data?.post?._id);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Failed to create post:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to publish post');
    }
  },

  toggleUpvote: async (postId) => {
    console.log(`👍 [POSTS] toggleUpvote called for post: ${postId}`);
    if (!postServiceEnabled) {
      console.log('⚠️ [POSTS] Backend disconnected, simulating toggleUpvote');
      return makeDisabledResponse({ message: 'Local upvote toggled' });
    }
    try {
      const response = await API.post(`/posts/${postId}/upvote`);
      console.log('✅ [POSTS] Upvote result:', response.data?.message);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Upvote failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to upvote');
    }
  },

  toggleDownvote: async (postId) => {
    console.log(`👎 [POSTS] toggleDownvote called for post: ${postId}`);
    if (!postServiceEnabled) {
      console.log('⚠️ [POSTS] Backend disconnected, simulating toggleDownvote');
      return makeDisabledResponse({ message: 'Local downvote toggled' });
    }
    try {
      const response = await API.post(`/posts/${postId}/downvote`);
      console.log('✅ [POSTS] Downvote result:', response.data?.message);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Downvote failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to downvote');
    }
  },

  addComment: async (postId, text) => {
    console.log(`💬 [POSTS] addComment called for post: ${postId}`);
    console.log('💬 [POSTS] Comment text:', text);
    if (!postServiceEnabled) {
      console.log('⚠️ [POSTS] Backend disconnected, simulating addComment');
      return makeDisabledResponse({ data: { data: { _id: `local-comment-${Date.now()}` } } });
    }
    try {
      const response = await API.post(`/posts/${postId}/comments`, { text });
      console.log('✅ [POSTS] Comment added:', response.data?.data?._id);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Comment failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to post comment');
    }
  },

  addReply: async (postId, commentId, text) => {
    console.log(`↩️ [POSTS] addReply called for comment: ${commentId} on post: ${postId}`);
    console.log('↩️ [POSTS] Reply text:', text);
    if (!postServiceEnabled) {
      console.log('⚠️ [POSTS] Backend disconnected, simulating addReply');
      return makeDisabledResponse({ data: { data: { reply: { id: `local-reply-${Date.now()}` } } } });
    }
    try {
      const response = await API.post(`/posts/${postId}/comments/${commentId}/replies`, { text });
      console.log('✅ [POSTS] Reply added:', response.data?.data?.reply?.id);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Reply failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to post reply');
    }
  },

  toggleCommentUpvote: async (postId, commentId) => {
    console.log(`👍 [POSTS] toggleCommentUpvote called for comment: ${commentId}`);
    if (!postServiceEnabled) {
      console.log('⚠️ [POSTS] Backend disconnected, simulating toggleCommentUpvote');
      return makeDisabledResponse({ message: 'Local comment upvote toggled' });
    }
    try {
      const response = await API.post(`/posts/${postId}/comments/${commentId}/upvote`);
      console.log('✅ [POSTS] Comment upvote result:', response.data?.message);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Comment upvote failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to upvote comment');
    }
  },

  toggleCommentDownvote: async (postId, commentId) => {
    console.log(`👎 [POSTS] toggleCommentDownvote called for comment: ${commentId}`);
    if (!postServiceEnabled) {
      console.log('⚠️ [POSTS] Backend disconnected, simulating toggleCommentDownvote');
      return makeDisabledResponse({ message: 'Local comment downvote toggled' });
    }
    try {
      const response = await API.post(`/posts/${postId}/comments/${commentId}/downvote`);
      console.log('✅ [POSTS] Comment downvote result:', response.data?.message);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Comment downvote failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to downvote comment');
    }
  },

  toggleReplyUpvote: async (postId, commentId, replyId) => {
    console.log(`👍 [POSTS] toggleReplyUpvote called for reply: ${replyId}`);
    if (!postServiceEnabled) {
      console.log('⚠️ [POSTS] Backend disconnected, simulating toggleReplyUpvote');
      return makeDisabledResponse({ message: 'Local reply upvote toggled' });
    }
    try {
      const response = await API.post(`/posts/${postId}/comments/${commentId}/replies/${replyId}/upvote`);
      console.log('✅ [POSTS] Reply upvote result:', response.data?.message);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Reply upvote failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to upvote reply');
    }
  },

  toggleReplyDownvote: async (postId, commentId, replyId) => {
    console.log(`👎 [POSTS] toggleReplyDownvote called for reply: ${replyId}`);
    if (!postServiceEnabled) {
      console.log('⚠️ [POSTS] Backend disconnected, simulating toggleReplyDownvote');
      return makeDisabledResponse({ message: 'Local reply downvote toggled' });
    }
    try {
      const response = await API.post(`/posts/${postId}/comments/${commentId}/replies/${replyId}/downvote`);
      console.log('✅ [POSTS] Reply downvote result:', response.data?.message);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Reply downvote failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to downvote reply');
    }
  },

  toggleSave: async (postId) => {
    console.log(`🔖 [POSTS] toggleSave called for post: ${postId}`);
    if (!postServiceEnabled) {
      console.log('⚠️ [POSTS] Backend disconnected, simulating toggleSave');
      return makeDisabledResponse({ message: 'Local save toggled' });
    }
    try {
      const response = await API.post(`/posts/${postId}/save`);
      console.log('✅ [POSTS] Save result:', response.data?.message);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Save failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to update bookmark');
    }
  },

  trackShare: async (postId) => {
    console.log(`🔗 [POSTS] trackShare called for post: ${postId}`);
    if (!postServiceEnabled) {
      console.log('⚠️ [POSTS] Backend disconnected, simulating trackShare');
      return makeDisabledResponse({ message: 'Local share tracked' });
    }
    try {
      const response = await API.post(`/posts/${postId}/share`);
      console.log('✅ [POSTS] Share tracked:', response.data?.data?.sharesCount);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Share tracking failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to track share');
    }
  }
};

export default postService;
