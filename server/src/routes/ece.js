const express = require('express');
const router = express.Router();
const { scrapeECEContent } = require('../scrapers/ece');

router.get('/', async (req, res) => {
    try {
        const data = await scrapeECEContent();
        res.json({ success: true, data });
    } catch (error) {
        console.error('Scraping error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch ECE content' });
    }
});

router.get('/image', async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) {
        return res.status(400).send('Missing URL');
    }

    try {
        const axios = require('axios');
        const response = await axios({
            method: 'get',
            url: imageUrl,
            responseType: 'stream',
            headers: {
                'Referer': 'https://www.rmd.ac.in/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        // Forward content type
        if (response.headers['content-type']) {
            res.setHeader('Content-Type', response.headers['content-type']);
        }

        // Cache for 24 hours (86400 seconds)
        // 'public' = can be cached by Vercel CDN
        // 'max-age' = browser cache
        // 's-maxage' = CDN cache
        res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');

        response.data.pipe(res);
    } catch (error) {
        console.error('Proxy error:', error.message);
        res.status(500).send('Failed to fetch image');
    }
});

module.exports = router;
