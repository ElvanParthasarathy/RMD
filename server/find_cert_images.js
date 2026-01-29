const cheerio = require('cheerio');
const axios = require('axios');

async function findCertImages() {
    try {
        console.log('Fetching https://www.rmd.ac.in ...');
        const { data } = await axios.get('https://www.rmd.ac.in', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(data);

        console.log('Searching for NBA, NAAC, NIRF images...');

        // Search 1: Look for images with these keywords in src or alt
        $('img').each((i, el) => {
            const src = $(el).attr('src');
            const alt = $(el).attr('alt') || '';
            const parentHref = $(el).closest('a').attr('href');

            if (src && (src.toLowerCase().includes('nba') || src.toLowerCase().includes('naac') || src.toLowerCase().includes('nirf') || alt.toLowerCase().includes('nba'))) {
                console.log(`Found Image: src="${src}", alt="${alt}", parentLink="${parentHref}"`);
            }
        });

        // Search 2: Look for specific container that might hold these "Important Links"
        // Often these are in a grid or sidebar.
        console.log('Checking "Important Links" or similar headers...');
        $('h1, h2, h3, h4, h5, span, div').each((i, el) => {
            const text = $(el).text().trim();
            if (text.includes('mportant') && text.includes('ink')) { // fuzzy match "Important Links"
                console.log(`Found header: "${text}" - checking siblings/children`);
                // Log some structure around it
                console.log($(el).next().html()?.substring(0, 200));
            }
        });

    } catch (e) {
        console.error("Error:", e.message);
    }
}

findCertImages();
