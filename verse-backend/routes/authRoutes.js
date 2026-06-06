const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../config/cloudinaryConfig');

router.post('/register', upload.single('receiptImage'), authController.register);
router.post('/login', authController.login);

module.exports = router;