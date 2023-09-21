const express = require('express');
const { fetchTopHeadlines, searchNews } = require('../controller/news.controller');
const router = express.Router();

// Route for fetching news articles
router.get('/top-headlines', fetchTopHeadlines);

// Route for searching news articles by keywords
router.get('/search', searchNews);

module.exports = router;
