const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    verse: {
        type: String,
        default: "market"
    },
    time: {
        type: String,
        default: "1m"
    },
    author: {
        anonymous: { type: Boolean, default: false },
        name: { type: String, required: true },
        faculty: { type: String, required: true },
        department: { type: String, required: true },
        level: { type: String, required: true },
        rating: { type: Number, default: 5.0 },
        totalSales: { type: Number, default: 0 },
        hostel: { type: String, default: null }
    },
    content: {
        text: { type: String, required: true },
        images: { type: [String], default: [] },
        tags: { type: [String], default: [] }
    },
    meta: {
        createdAt: { type: Date, default: Date.now },
        location: { type: String, default: "RSU" },
        edited: { type: Boolean, default: false }
    },
    engagement: {
        upvotes: { type: Number, default: 0 },
        downvotes: { type: Number, default: 0 },
        comments: { type: Array, default: [] },
        shares: { type: Number, default: 0 },
        saves: { type: Number, default: 0 },
        reposts: { type: Number, default: 0 }
    },
    userInteraction: {
        voteStatus: { type: String, default: null },
        saved: { type: Boolean, default: false },
        reposts: { type: Boolean, default: false }
    },
    marketPlace: {
        description: { type: String, required: true },
        price: { type: Number, required: true },
        condition: { type: String, enum: ['New', 'Used', 'Refurbished'], default: 'Used' },
        category: { type: String, required: true },
        negotiable: { type: Boolean, default: true }
    },
    theme: {
        bg: { type: String, default: "bg-cyan/10" },
        text: { type: String, default: "text-cyan" },
        glow: { type: String, default: "glow-cyan" },
        border: { type: String, default: "border-cyan/20" }
    }
});

module.exports = mongoose.model('Product', productSchema);