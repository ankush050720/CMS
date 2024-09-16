const express = require('express');
const { register, login, forgotPassword, resetPassword, checkAuth, logout } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);
// Route to check if the user is authenticated
router.get('/check-auth', authMiddleware, checkAuth);

module.exports = router;