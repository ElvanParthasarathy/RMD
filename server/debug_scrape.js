const { fetchHtml } = require('./src/scraperUtils');
const fs = require('fs');

async function debug() {
    try {
        console.log("Fetching HTML...");
        const $ = await fetchHtml('https://www.rmd.ac.in');
        console.log("Fetch complete. Saving to debug_home.html");
        fs.writeFileSync('debug_home.html', $.html());
        console.log("Done.");
    } catch (e) {
        console.error("Error:", e);
    }
}

debug();
