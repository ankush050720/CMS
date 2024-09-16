// routes/paymentRoute.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { simplePaymentGateway } = require('../controllers/paymentController');

// Simple payment gateway endpoint
router.post('/payment', authMiddleware, simplePaymentGateway);

module.exports = router;