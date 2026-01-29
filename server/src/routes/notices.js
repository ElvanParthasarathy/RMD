const express = require('express');
const router = express.Router();
const { getOrFetch } = require('../cache');
const { scrapeNotices } = require('../scrapers/notices');

const CACHE_KEY = 'notices';
const CACHE_TTL = 900; // 15 minutes

router.get('/', async (req, res) => {
    try {
        const data = await getOrFetch(CACHE_KEY, CACHE_TTL, scrapeNotices);
        res.json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notices',
            error: error.message
        });
    }
});

module.exports = router;
