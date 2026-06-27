import API from '../api/client';

const postService = {
  getAllPosts: async () => {
    try {
      const response = await API.get('/posts');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Could not fetch posts');
    }
  },

  createPost: async (postData) => {
    try {
      const response = await API.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to publish post');
    }
  },

  toggleUpvote: async (postId) => {
    try {
      const response = await API.post(`/posts/${postId}/upvote`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upvote');
    }
  },

  toggleDownvote: async (postId) => {
    try {
      const response = await API.post(`/posts/${postId}/downvote`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to downvote');
    }
  },

  addComment: async (postId, text) => {
    try {
      const response = await API.post(`/posts/${postId}/comments`, { text });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to post comment');
    }
  },

  addReply: async (postId, commentId, text) => {
    try {
      const response = await API.post(`/posts/${postId}/comments/${commentId}/replies`, { text });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to post reply');
    }
  },

  toggleCommentUpvote: async (postId, commentId) => {
    try {
      const response = await API.post(`/posts/${postId}/comments/${commentId}/upvote`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upvote comment');
    }
  },

  toggleCommentDownvote: async (postId, commentId) => {
    try {
      const response = await API.post(`/posts/${postId}/comments/${commentId}/downvote`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to downvote comment');
    }
  },

  toggleSave: async (postId) => {
    try {
      const response = await API.post(`/posts/${postId}/save`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update bookmark');
    }
  },

  trackShare: async (postId) => {
    try {
      const response = await API.post(`/posts/${postId}/share`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to track share');
    }
  }
};

export default postService;