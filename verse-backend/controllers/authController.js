const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.register = async (req, res, next) => {
    try {
      
        const uploadedFilePath = req.file ? req.file.path : 'https://res.cloudinary.com/demo/image/upload/sample.jpg';

        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            matricNumber: req.body.matricNumber,
            faculty: req.body.faculty,
            department: req.body.department,
            level: req.body.level
        };

        userData.verificationReceiptUrl = uploadedFilePath;
        userData.verificationRecieptUrl = uploadedFilePath;

        const newUser = await User.create(userData);

        const token = signToken(newUser._id);
        newUser.password = undefined;

        res.status(201).json({
            status: 'success',
            token,
            message: 'Registration successful! Verification is pending review. 🕒',
            data: { user: newUser }
        });
    } catch (error) {
        next(error);
    }
};
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password.'
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password.'
            });
        }

        const token = signToken(user._id);
        user.password = undefined;

        res.status(200).json({
            status: 'success',
            token,
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};