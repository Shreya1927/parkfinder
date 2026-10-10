// routes/authRoutes.js
const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  validateRegister,
  validateLogin,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Use express-validator middlewares for input validation
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/me', protect, getMe);

module.exports = router;
