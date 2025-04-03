const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const {authverifyToken  } = require('../middlewares/authmiddleware');
const router = express.Router();

// Get user profile
router.get('/profile', authverifyToken , getUserProfile);

// Update user profile
router.put('/update-profile', authverifyToken , updateUserProfile);

module.exports = router;