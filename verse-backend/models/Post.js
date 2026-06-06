const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        department: { type: String, required: true }
    },
    text: { type: String, required: true },
    engagement: {
        upvotes: { type: Number, default: 0 },
        downvotes: { type: Number, default: 0 },
        replies: { type: Array, default: [] }
    }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    verse: {
        type: String,
        required: true,
        enum: ['market', 'gist', 'confession', 'music', 'politics', 'relationship']
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorMeta: {
        anonymous: { type: Boolean, default: false },
        name: { type: String, required: true },
        faculty: { type: String, required: true },
        department: { type: String, required: true },
        level: { type: String, required: true }
    },
    content: {
        text: { type: String, required: true },
        images: [{ type: String }], 
        tags: [{ type: String }]
    },
    location: {
        type: String,
        default: 'RSU'
    },
    engagement: {
        upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        comments: [commentSchema],
        sharesCount: { type: Number, default: 0 },
        savesCount: { type: Number, default: 0 }
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

postSchema.virtual('engagementMetrics').get(function() {
    return {
        upvotes: this.engagement.upvotes.length,
        downvotes: this.engagement.downvotes.length,
        commentsCount: this.engagement.comments.length,
        shares: this.engagement.sharesCount,
        saves: this.engagement.savesCount
    };
});

module.exports = mongoose.model('Post', postSchema);