const express = require('express');
const router = express.Router();
const Waitlist = require('../models/Waitlist');

// @route   POST /api/v1/waitlist/signup
// @desc    Register a user for early access
router.post('/signup', async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                status: 'fail', 
                message: 'Please provide a valid email address.' 
            });
        }

        const userExists = await Waitlist.findOne({ email: email.toLowerCase().trim() });
        if (userExists) {
            return res.status(400).json({ 
                status: 'fail', 
                message: 'This email is already secured on the waitlist! 🎉' 
            });
        }

        const newSignup = await Waitlist.create({ email });

        return res.status(201).json({
            status: 'success',
            message: 'Successfully registered for early access!',
            data: {
                id: newSignup._id,
                email: newSignup.email,
                joinedAt: newSignup.joinedAt
            }
        });

    } catch (error) {
        next(error); 
    }
});

// @route   GET /api/v1/waitlist/registry
// @desc    Secure Admin Retrieval
router.get('/registry', async (req, res, next) => {
    try {
        const adminKey = req.headers['x-admin-key'];
        if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
            return res.status(401).json({ 
                status: 'fail', 
                message: 'Unauthorized. Access Denied.' 
            });
        }

        const list = await Waitlist.find({}).sort({ joinedAt: -1 });

        return res.status(200).json({
            status: 'success',
            results: list.length,
            data: { list }
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;