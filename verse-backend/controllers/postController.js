const mongoose = require('mongoose');
const Post = require('../models/Post');


exports.createPost = async (req, res, next) => {
  try {
    const { verse, anonymous, tags, content } = req.body;

    let postText = '';
    if (content) {
      if (typeof content === 'object' && content.text) {
        postText = content.text;
      } else if (typeof content === 'string') {
        try {
          const parsed = JSON.parse(content);
          postText = parsed.text || '';
        } catch (e) {
          postText = content;
        }
      }
    } else if (req.body.text) {
      postText = req.body.text;
    }

    if (!verse || !postText) {
      return res.status(400).json({
        status: 'fail',
        message: 'A verse type and content text are required to make a post.'
      });
    }

    const imageUrls = req.files ? req.files.map(file => file.path) : [];
    const isAnonymous = anonymous === true || anonymous === 'true';

    const verifiedLevel = req.user.level || req.user.Level || req.user.studentLevel || req.body.level || '500';
    const verifiedFaculty = req.user.faculty || req.user.Faculty || 'Engineering';
    const verifiedDept = req.user.department || req.user.Department || 'Computer';

    const authorMeta = {
      anonymous: isAnonymous,
      name: isAnonymous ? "Anonymous" : req.user.name,
      faculty: verifiedFaculty,
      department: verifiedDept,
      level: verifiedLevel
    };

    const newPost = await Post.create({
      verse,
      authorId: req.user._id,
      authorMeta,
      content: {
        text: postText,
        images: imageUrls,
        tags: Array.isArray(tags) ? tags : (tags ? [tags] : [])
      },
      location: req.user.location || 'RSU'
    });

    res.status(201).json({
      status: 'success',
      data: { post: newPost }
    });
  } catch (error) {
    console.error('💥 ERROR INSIDE CREATE_POST CONTROLLER:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal Server Error'
    });
  }
};


exports.getFeed = async (req, res, next) => {
  try {
    const { verse } = req.query;
    const filter = {};
    if (verse) filter.verse = verse;

    const posts = await Post.find(filter).sort({ createdAt: -1 });

    const structuredFeed = posts.map(post => ({
      id: post._id,
      verse: post.verse,
      author: {
        anonymous: post.authorMeta.anonymous,
        name: post.authorMeta.name,
        faculty: post.authorMeta.faculty,
        department: post.authorMeta.department,
        level: post.authorMeta.level,
        hostel: post.authorMeta.hostel || null
      },
      content: {
        text: post.content.text,
        images: post.content.images,
        tags: post.content.tags
      },
      meta: {
        createdAt: post.createdAt,
        location: post.location,
        edited: false
      },
      engagement: {
        upvotes: Array.isArray(post.engagement?.upvotes) ? post.engagement.upvotes.length : 0,
        downvotes: Array.isArray(post.engagement?.downvotes) ? post.engagement.downvotes.length : 0,
        comments: post.engagement?.comments || [],
        shares: post.engagement?.sharesCount || 0,
        saves: post.engagement?.savesCount || 0
      }
    }));

    res.status(200).json({
      status: 'success',
      results: structuredFeed.length,
      data: { feed: structuredFeed }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal Server Error'
    });
  }
};


exports.toggleUpvote = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ status: 'error', message: 'Post not found' });

    const userId = req.user.id;
    const hasUpvoted = post.engagement.upvotes.includes(userId);

    if (hasUpvoted) {
      post.engagement.upvotes.pull(userId);
    } else {
      post.engagement.upvotes.addToSet(userId);
      post.engagement.downvotes.pull(userId);
    }

    await post.save();
    res.status(200).json({
      status: 'success',
      message: hasUpvoted ? 'Upvote removed' : 'Post upvoted',
      data: {
        upvotes: post.engagement.upvotes.length,
        downvotes: post.engagement.downvotes.length,
        voteStatus: post.engagement.upvotes.includes(userId) ? 'up' : 'none'
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.toggleDownvote = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ status: 'error', message: 'Post not found' });

    const userId = req.user.id;
    const hasDownvoted = post.engagement.downvotes.includes(userId);

    if (hasDownvoted) {
      post.engagement.downvotes.pull(userId);
    } else {
      post.engagement.downvotes.addToSet(userId);
      post.engagement.upvotes.pull(userId);
    }

    await post.save();
    res.status(200).json({
      status: 'success',
      message: hasDownvoted ? 'Downvote removed' : 'Post downvoted',
      data: {
        upvotes: post.engagement.upvotes.length,
        downvotes: post.engagement.downvotes.length,
        voteStatus: post.engagement.downvotes.includes(userId) ? 'down' : 'none'
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};


exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ status: 'error', message: 'Comment text is required' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ status: 'error', message: 'Post not found' });
    }

    const newComment = {
      author: {
        id: req.user.id,
        name: req.user.name || "Anonymous",
        department: req.user.department || "General"
      },
      text: text.trim(),
      engagement: {
        upvotes: [],
        downvotes: [],
        replies: []
      }
    };

    post.engagement.comments.unshift(newComment);
    await post.save();

    res.status(201).json({
      status: 'success',
      message: 'Comment added',
      data: post.engagement.comments[0]
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.addCommentReply = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ status: 'error', message: 'Reply text cannot be empty' });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ status: 'error', message: 'Post not found' });
    }

    const comment = post.engagement.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ status: 'error', message: 'Comment not found' });
    }

    // Clean instantiation using the top-level mongoose import
    const newReply = {
      id: new mongoose.Types.ObjectId(), 
      author: {
        id: req.user.id,
        name: req.user.name || "Anonymous",
        department: req.user.department || "General",
        level: req.user.level || "500"
      },
      text: text.trim(),
      createdAt: new Date()
    };

    comment.engagement.replies.push(newReply);
    await post.save();

    res.status(201).json({
      status: 'success',
      message: 'Reply added successfully',
      data: {
        reply: newReply,
        totalReplies: comment.engagement.replies.length
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.toggleCommentUpvote = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ status: 'error', message: 'Post not found' });
    }

    const comment = post.engagement.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ status: 'error', message: 'Comment not found' });
    }

    const hasUpvoted = comment.engagement.upvotes.includes(userId);

    if (hasUpvoted) {
      comment.engagement.upvotes.pull(userId);
    } else {
      comment.engagement.upvotes.addToSet(userId); // Fixed: was pull
      comment.engagement.downvotes.pull(userId);
    }

    await post.save();

    res.status(200).json({
      status: 'success',
      message: hasUpvoted ? 'Comment upvote removed' : 'Comment upvoted',
      data: {
        upvotes: comment.engagement.upvotes.length,
        downvotes: comment.engagement.downvotes.length,
        voteStatus: comment.engagement.upvotes.includes(userId) ? 'up' : 'none'
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.toggleCommentDownvote = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ status: 'error', message: 'Post not found' });
    }

    const comment = post.engagement.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ status: 'error', message: 'Comment not found' });
    }

    const hasDownvoted = comment.engagement.downvotes.includes(userId);

    if (hasDownvoted) {
      comment.engagement.downvotes.pull(userId);
    } else {
      comment.engagement.downvotes.addToSet(userId);
      comment.engagement.upvotes.pull(userId);
    }

    await post.save();

    res.status(200).json({
      status: 'success',
      message: hasDownvoted ? 'Comment downvote removed' : 'Comment downvoted',
      data: {
        upvotes: comment.engagement.upvotes.length,
        downvotes: comment.engagement.downvotes.length,
        voteStatus: comment.engagement.downvotes.includes(userId) ? 'down' : 'none'
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};


exports.toggleSavePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const userTarget = req.user._id || req.user.id;
    if (!userTarget) {
      return res.status(401).json({ status: 'error', message: 'User authorization context missing' });
    }
    const userIdString = userTarget.toString();

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ status: 'error', message: 'Post not found' });


    if (!post.engagement) {
      post.engagement = { upvotes: [], downvotes: [], comments: [], sharesCount: 0, saves: [], savesCount: 0 };
    }
    if (!Array.isArray(post.engagement.saves)) {
      post.engagement.saves = [];
    }

    // 3. Determine toggle state cleanly using native string arrays
    const stringifiedSaves = post.engagement.saves.map(id => id.toString());
    const existingIndex = stringifiedSaves.indexOf(userIdString);
    const hasSaved = existingIndex > -1;

    if (hasSaved) {

      post.engagement.saves.splice(existingIndex, 1);
      post.engagement.savesCount = Math.max(0, (post.engagement.savesCount || 1) - 1);
    } else {
  
      post.engagement.saves.push(userTarget);
      post.engagement.savesCount = (post.engagement.savesCount || 0) + 1;
    }

    post.markModified('engagement');


    await post.save({ validateBeforeSave: false });

    res.status(200).json({
      status: 'success',
      message: hasSaved ? 'Removed from bookmarks' : 'Added to bookmarks',
      data: {
        savesCount: post.engagement.savesCount,
        isSaved: !hasSaved
      }
    });
  } catch (err) {
    
    console.error('💥 EXCEPTION CAUGHT IN TOGGLE_SAVE_POST:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};


exports.incrementShare = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ status: 'error', message: 'Post not found' });

    post.engagement.sharesCount = (post.engagement.sharesCount || 0) + 1;
    

    await post.save({ validateBeforeSave: false });

    res.status(200).json({
      status: 'success',
      message: 'Share counter updated',
      data: {
        sharesCount: post.engagement.sharesCount
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};