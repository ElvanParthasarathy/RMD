const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

// Create axios instance with relaxed SSL for scraped site if needed, and browser headers
const apiClient = axios.create({
    timeout: 10000,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }), // In case of SSL issues with target
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
});

/**
 * Fetch HTML from a URL and return a loaded Cheerio instance
 * @param {string} url 
 * @returns {Promise<CheerioAPI>}
 */
async function fetchHtml(url) {
    try {
        const response = await apiClient.get(url);
        return cheerio.load(response.data);
    } catch (error) {
        console.error(`[SCRAPER] Error fetching ${url}:`, error.message);
        throw new Error('Failed to fetch data from RMD source');
    }
}

module.exports = {
    apiClient,
    fetchHtml
};
