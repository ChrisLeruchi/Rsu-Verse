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