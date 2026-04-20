const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    const results = [];

    page.on('response', async (response) => {
        const url = response.url();
        // We expect the API to return JSON containing game data
        if (url.includes('api') || response.headers()['content-type']?.includes('application/json')) {
            try {
                const json = await response.json();
                // Look for typical game list structures
                const stringified = JSON.stringify(json);
                if (stringified.includes('光·遇') || stringified.includes('迷你枪战精英') || stringified.includes('gameId')) {
                    results.push({ url, data: json });
                }
            } catch (e) {
                // ignore non-json
            }
        }
    });

    await page.goto('https://www.233leyuan.com/', { waitUntil: 'networkidle0' });

    // Also dump all img tags just in case
    const imgs = await page.evaluate(() => Array.from(document.images).map(img => img.src).filter(src => src.includes('http')));

    fs.writeFileSync('api_results.json', JSON.stringify({ api: results, imgs }, null, 2));

    await browser.close();
})();
