const { fetchHtml } = require('../scraperUtils');

/**
 * Scrape ECE department page for slider images
 * @returns {Promise<Object>}
 */
async function scrapeECEContent() {
    // ECE Department URL
    const url = 'https://www.rmd.ac.in/dept/ece/index.html';
    const $ = await fetchHtml(url);

    const content = {
        slider: []
    };

    // Scrape Slider Images
    // Based on user provided HTML: <div id="slider"> <img src="..."> </div>
    $('#slider img').each((i, el) => {
        let src = $(el).attr('src');
        const alt = $(el).attr('alt');

        if (src) {
            // Fix relative paths
            if (!src.startsWith('http')) {
                src = `https://www.rmd.ac.in/dept/ece/${src.replace(/^\.?\/?/, '')}`;
            }

            // Use Proxy
            const originalUrl = src;
            src = `http://localhost:3000/api/ece/image?url=${encodeURIComponent(originalUrl)}`;

            content.slider.push({
                url: src,
                caption: alt || ''
            });
        }
    });

    // Log the scraper results
    console.log(`[ECE Scraper] Found ${content.slider.length} slider images`);

    // Fallback: If scraping fails (0 images), use known hardcoded URLs so the UI isn't empty
    if (content.slider.length === 0) {
        console.log('[ECE Scraper] No images found via selector, using fallback URLs.');
        const fallbackImages = [
            { url: `http://localhost:3000/api/ece/image?url=${encodeURIComponent('https://www.rmd.ac.in/dept/ece/images/image-slider-1.jpg')}`, caption: 'Dr.K.HelenPrabha, Head of the Department, received the ISTE-Periyar Best Engineering College Teacher Award in 2022.' },
            { url: `http://localhost:3000/api/ece/image?url=${encodeURIComponent('https://www.rmd.ac.in/dept/ece/images/image-slider-2.jpg')}`, caption: 'Won first prize with cash prize of Rs.1,00,000/ in Smart India Hackathon 2023' },
            { url: `http://localhost:3000/api/ece/image?url=${encodeURIComponent('https://www.rmd.ac.in/dept/ece/images/image-slider-3.jpg')}`, caption: 'Won Third prize in Kumaraguru Livestock Hackathon' },
            { url: `http://localhost:3000/api/ece/image?url=${encodeURIComponent('https://www.rmd.ac.in/dept/ece/images/image-slider-4.jpg')}`, caption: 'Won third prize in IBM Nalayathiran project' }
        ];
        content.slider = fallbackImages;
    }

    return content;
}

module.exports = { scrapeECEContent };
