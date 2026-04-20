const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto('https://www.taptap.io/', { waitUntil: 'networkidle2' });

    // Scroll to lazy load images
    await page.evaluate(() => {
        return new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 300;
            let timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight || totalHeight > 5000) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });

    // Small delay to ensure images load
    await new Promise(r => setTimeout(r, 2000));

    const gamesList = await page.evaluate(() => {
        const games = [];
        const cards = document.querySelectorAll('a[href*="/app/"]');

        cards.forEach(card => {
            const imgNode = card.querySelector('img');
            const titleNode = card.querySelector('h2, h3, h4, .title, [class*="title"], [class*="name"]');
            const tagsNode = card.querySelectorAll('[class*="tag"], [class*="label"], [class*="genre"]');

            if (imgNode && titleNode) {
                // Bypassing base64 placeholders
                let imgUrl = imgNode.getAttribute('data-src') || imgNode.src;
                if (imgUrl.startsWith('data:image')) {
                    imgUrl = imgNode.getAttribute('src');
                }
                const title = titleNode.innerText.trim();

                let tags = [];
                if (tagsNode.length) {
                    tags = Array.from(tagsNode).map(n => n.innerText.trim()).filter(Boolean);
                }

                if (title && imgUrl && !imgUrl.startsWith('data:image') && !imgUrl.includes('avatar') && !games.find(g => g.title === title)) {
                    const isLarge = card.offsetWidth > 300 || imgNode.offsetWidth > 300;
                    games.push({ title, image: imgUrl, tags, isLarge });
                }
            }
        });

        const banners = [];
        document.querySelectorAll('img').forEach(img => {
            const src = img.getAttribute('data-src') || img.src;
            if (img.width > 500 && src && src.includes('http') && !src.startsWith('data:image')) {
                banners.push(src);
            }
        });

        // Extracting possible games from JSON inside __NEXT_DATA__ if present
        const nextData = document.getElementById('__NEXT_DATA__');
        let nextDataGames = [];
        if (nextData) {
            try {
                const json = JSON.parse(nextData.innerText);
                const findGames = (obj) => {
                    if (!obj) return;
                    if (obj.title && obj.icon && obj.id) {
                        nextDataGames.push({ title: obj.title, image: obj.icon, isLarge: false });
                    }
                    if (typeof obj === 'object') {
                        Object.keys(obj).forEach(k => findGames(obj[k]));
                    }
                };
                findGames(json);
            } catch (e) { }
        }

        return { games, banners, nextDataGames: nextDataGames.slice(0, 20) };
    });

    fs.writeFileSync('taptap_data.json', JSON.stringify({ dom: gamesList }, null, 2));

    await browser.close();
})();
