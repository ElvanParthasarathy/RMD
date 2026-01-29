const NodeCache = require('node-cache');
const cache = new NodeCache();

/**
 * Get data from cache or fetch it if missing
 * @param {string} key - Cache key
 * @param {number} ttl - Time to live in seconds
 * @param {Function} fetchFunction - Async function to fetch data if cache miss
 * @returns {Promise<any>}
 */
async function getOrFetch(key, ttl, fetchFunction) {
    const cachedData = cache.get(key);
    if (cachedData) {
        console.log(`[CACHE] HIT: ${key}`);
        return cachedData;
    }

    console.log(`[CACHE] MISS: ${key}`);
    try {
        const data = await fetchFunction();
        cache.set(key, data, ttl);
        return data;
    } catch (error) {
        console.error(`[CACHE] Fetch error for ${key}:`, error.message);
        throw error;
    }
}

module.exports = {
    cache,
    getOrFetch
};
