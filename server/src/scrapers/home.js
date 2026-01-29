const { fetchHtml } = require('../scraperUtils');

/**
 * Scrape full home page content: Slider, Menus, Quick Links, News, Brochures
 * @returns {Promise<Object>}
 */
async function scrapeHomeContent() {
    const $ = await fetchHtml('https://www.rmd.ac.in');

    const content = {
        slider: [],
        menus: {},
        brochures: [],
        news: [], // Highlights/Achievements
        quickLinks: [], // "Pages"
        committees: [],
        social: [],
        disclosures: []
    };

    // 1. Slider Images (Robust Jssor Logic)
    // Structure: <div id="jssor_1"> ... <div data-u="slides"> ... <div> <img data-u="image" src="...">
    const slideImages = [];
    // Use the less specific selector that was confirmed to work in test
    $('div[data-u="slides"] img').each((i, el) => {
        let src = $(el).attr('src') || $(el).attr('data-u="image"');

        if (src) {
            src = src.trim();
            // Fix relative paths
            if (!src.startsWith('http')) {
                // Ensure no double slashes if src starts with / or if base has /
                const cleanSrc = src.replace(/^\/+/, '');
                src = `https://www.rmd.ac.in/${cleanSrc}`;
            }

            slideImages.push({
                image: src,
                alt: $(el).attr('alt') || 'RMD Banner',
                id: i
            });
        }
    });

    // Fallback: If Jssor fails, look for generic banner images
    if (slideImages.length === 0) {
        $('img').each((i, el) => {
            let src = $(el).attr('src');
            if (src && (src.includes('banner') || src.includes('slide'))) {
                if (!src.startsWith('http')) {
                    const cleanSrc = src.replace(/^\/+/, '');
                    src = `https://www.rmd.ac.in/${cleanSrc}`;
                }
                slideImages.push({ image: src, alt: 'Banner' });
            }
        });
    }

    content.slider = slideImages;

    // 2. Navigation Menus
    const menuSections = ['About Us', 'Academics', 'Administration', 'Departments', 'Facilities'];
    menuSections.forEach(section => {
        const sectionLinks = [];
        $('a').each((i, el) => {
            const text = $(el).text().trim();
            const href = $(el).attr('href');
            if (href && text && !href.startsWith('#') && !href.startsWith('javascript')) {
                // Strict check to avoid grabbing random links
                const isRelevant = href.toLowerCase().includes(section.toLowerCase().replace(' ', '')) ||
                    $(el).closest('ul').prev().text().includes(section);

                if (isRelevant) {
                    sectionLinks.push({
                        label: text,
                        url: href.startsWith('http') ? href : `https://www.rmd.ac.in/${href.replace(/^\//, '')}`
                    });
                }
            }
        });
        if (sectionLinks.length > 0) {
            // Dedupe
            const unique = [];
            const seen = new Set();
            for (const link of sectionLinks) {
                if (!seen.has(link.url + link.label)) {
                    seen.add(link.url + link.label);
                    unique.push(link);
                }
            }
            content.menus[section] = unique.slice(0, 15);
        }
    });

    // 3. Department Brochures (Keep existing logic)
    const deptNames = ['CSE', 'ECE', 'IT', 'AIML', 'CSBS', 'S&H'];
    $('a[href$=".pdf"]').each((i, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr('href');
        const url = href.startsWith('http') ? href : `https://www.rmd.ac.in/${href.replace(/^\//, '')}`;

        if (deptNames.includes(text)) {
            content.brochures.push({ dept: text, url });
        }
    });

    // 4. Quick Access Links (REMOVED - Hardcoded in Frontend)
    // content.quickLinks = [];

    // 5. Certifications & Important Links (Images)
    content.certifications = [];
    $('.mg-image').each((i, el) => {
        const $link = $(el).find('a');
        const $img = $(el).find('img');

        const href = $link.attr('href');
        let src = $img.attr('src');

        if (src && href) {
            // Fix relative paths
            src = src.startsWith('http') ? src : `https://www.rmd.ac.in/${src.replace(/^\.?\/?/, '')}`;
            const url = href.startsWith('http') ? href : `https://www.rmd.ac.in/${href.replace(/^\.?\/?/, '')}`;

            content.certifications.push({
                image: src,
                link: url,
                title: $img.attr('alt') || 'Certification'
            });
        }
    });

    // 6. News, Awards, Placements
    // Strategy: Find the headers using span.style3 inside .latest-post, then find the corresponding marquee
    $('.latest-post').each((i, el) => {
        const headerText = $(el).find('span.style3').text().trim();
        const marqueeItems = $(el).find('marquee ul li');

        if (headerText.includes('Awards and Achievements')) {
            marqueeItems.each((j, item) => {
                const $item = $(item);
                const $link = $item.find('a').first();
                // Clean text: remove "click here", "new.gif", etc.
                let text = $item.text().trim().replace(/click here/gi, '').replace(/^-+\s*/, '').replace(/\s*-+\s*$/, '').trim();
                const url = $link.attr('href');

                if (text) {
                    content.news.push({
                        title: text,
                        url: url ? (url.startsWith('http') ? url : `https://www.rmd.ac.in/${url.replace(/^\.?\/?/, '')}`) : '#',
                        date: 'Latest',
                        type: 'award'
                    });
                }
            });
        }
        else if (headerText.includes('Placement')) {
            content.placements = content.placements || [];
            marqueeItems.each((j, item) => {
                const $item = $(item);
                const text = $item.text().trim();
                if (text) {
                    content.placements.push(text);
                }
            });
        }
        else if (headerText.includes('News and Events')) {
            marqueeItems.each((j, item) => {
                const $item = $(item);
                const $link = $item.find('a').first();
                let text = $item.text().trim().replace(/click here/gi, '').replace(/^-+\s*/, '').replace(/\s*-+\s*$/, '').trim();
                const url = $link.attr('href');

                if (text) {
                    content.news.push({
                        title: text,
                        url: url ? (url.startsWith('http') ? url : `https://www.rmd.ac.in/${url.replace(/^\.?\/?/, '')}`) : '#',
                        type: 'news'
                    });
                }
            });
        }
    });

    // Initialize placements array if empty
    if (!content.placements) content.placements = [];

    // 7. Social Media (Dynamic)
    content.social = [];
    $('.footer-widget').each((i, el) => {
        const $widget = $(el);
        const title = $widget.find('h3').text().trim();

        if (title === 'Social Media') {
            $widget.find('ul li a').each((j, link) => {
                const $link = $(link);
                const href = $link.attr('href');
                const label = $link.text().trim();

                if (href) {
                    content.social.push({
                        platform: label || 'Social',
                        url: href.startsWith('http') ? href : `https://www.rmd.ac.in/${href.replace(/^\.?\/?/, '')}`
                    });
                }
            });
        }
    });

    return content;
}

module.exports = { scrapeHomeContent };
