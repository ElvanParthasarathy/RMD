const { fetchHtml } = require('../scraperUtils');

/**
 * Scrape notices from the RMD main page
 * @returns {Promise<Array>}
 */
async function scrapeNotices() {
    const $ = await fetchHtml('https://www.rmd.ac.in');
    const notices = [];

    // Selector hypothesis based on H5 usage for news
    // Also checking for marquee or list items commonly used in older sites
    const selectors = [
        'h5 a',
        'marquee a',
        '.news a',
        '#news a'
    ];

    const seenLinks = new Set();

    selectors.forEach(selector => {
        $(selector).each((i, el) => {
            const link = $(el).attr('href');
            const text = $(el).text().trim();

            if (link && text && !seenLinks.has(link)) {
                // Fix relative URLs
                const absoluteLink = link.startsWith('http')
                    ? link
                    : `https://www.rmd.ac.in/${link.replace(/^\//, '')}`;

                seenLinks.add(link);
                notices.push({
                    title: text,
                    link: absoluteLink,
                    date: new Date().toISOString().split('T')[0], // Placeholder date, scraper doesn't see dates clearly yet
                    isNew: text.toLowerCase().includes('new') || text.toLowerCase().includes('congratulations')
                });
            }
        });
    });

    return notices;
}

module.exports = { scrapeNotices };
