const express = require('express');
const router = express.Router();
const { getOrFetch } = require('../cache');
const { scrapeHomeContent } = require('../scrapers/home');

const CACHE_KEY = 'home_content';
const CACHE_TTL = 3600; // 1 hour for better performance

// Warm up the cache on server start
getOrFetch(CACHE_KEY, CACHE_TTL, scrapeHomeContent).catch(err => {
    console.error('[CACHE WARMUP] Failed to warm cache:', err.message);
});

router.get('/', async (req, res) => {
    try {
        const data = await getOrFetch(CACHE_KEY, CACHE_TTL, scrapeHomeContent);
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch home content',
            error: error.message
        });
    }
});

module.exports = router;
