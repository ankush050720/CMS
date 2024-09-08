const express = require('express');
const { getAllClubs } = require('../controllers/clubController');
const router = express.Router();

router.get('/clubs', getAllClubs);

module.exports = router;