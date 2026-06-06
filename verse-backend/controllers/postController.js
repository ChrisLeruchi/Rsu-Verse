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