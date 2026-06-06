const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { protect } = require('../middleware/authMiddleware');
const postController = require('../controllers/postController'); 

const adaptiveUpload = (req, res, next) => {
    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('multipart/form-data')) {
        const upload = require('../config/cloudinaryConfig');
        return upload.array('images', 4)(req, res, next);
    }
    next();
};

router.route('/')
    .get(protect, postController.getFeed)
    .post(protect, adaptiveUpload, async (req, res) => {
        try {
            const { verse, anonymous, tags, content } = req.body;
            
            // Safely parse text content
            let postText = '';
            if (content) {
                if (typeof content === 'object' && content.text) postText = content.text;
                else if (typeof content === 'string') postText = content;
            } else if (req.body.text) {
                postText = req.body.text;
            }

            if (!verse || !postText) {
                return res.status(400).json({ status: 'fail', message: 'Verse type and text are required.' });
            }

            const verifiedLevel = req.user?.level || req.user?.Level || req.body.level || '500';
            const verifiedFaculty = req.user?.faculty || 'Engineering';
            const verifiedDept = req.user?.department || 'Computer';

            const isAnonymous = anonymous === true || anonymous === 'true';

            const newPost = await Post.create({
                verse,
                authorId: req.user._id,
                authorMeta: {
                    anonymous: isAnonymous,
                    name: isAnonymous ? "Anonymous" : (req.user?.name || "Chris L"),
                    faculty: verifiedFaculty,
                    department: verifiedDept,
                    level: verifiedLevel 
                },
                content: {
                    text: postText,
                    images: req.files ? req.files.map(f => f.path) : [],
                    tags: Array.isArray(tags) ? tags : []
                },
                location: req.user?.location || 'RSU'
            });

            return res.status(201).json({ status: 'success', data: { post: newPost } });
        } catch (error) {
            console.error('💥 Inline Route Error:', error);
            return res.status(500).json({ status: 'error', message: error.message });
        }
    });

module.exports = router;