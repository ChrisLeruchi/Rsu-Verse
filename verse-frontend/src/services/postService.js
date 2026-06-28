import API from '../api/client';

const postService = {
  getAllPosts: async () => {
    console.log('📰 [POSTS] getAllPosts called, handing off to API client...');
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
    console.log('✍️ [POSTS] createPost called, handing off to API client...');
    console.log('✍️ [POSTS] Post data:', postData);
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
    try {
      const response = await API.post(`/posts/${postId}/comments/${commentId}/downvote`);
      console.log('✅ [POSTS] Comment downvote result:', response.data?.message);
      return response.data;
    } catch (error) {
      console.error('❌ [POSTS] Comment downvote failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to downvote comment');
    }
  },

  toggleSave: async (postId) => {
    console.log(`🔖 [POSTS] toggleSave called for post: ${postId}`);
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
