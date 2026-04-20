const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://www.233leyuan.com/', { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
        // 1. Get the featured game (Hero Banner equivalent)
        let hero = null;
        const bannerItems = document.querySelectorAll('.banner-item');
        if (bannerItems.length > 0) {
            const firstBanner = bannerItems[0];
            const img = firstBanner.querySelector('img');
            const title = firstBanner.querySelector('.title, h2, h3');
            const desc = firstBanner.querySelector('.desc, p');

            if (img) {
                hero = {
                    title: title ? title.innerText : '光·遇',
                    desc: desc ? desc.innerText : '全国大蜡烛持续进行中',
                    image: img.src
                };
            }
        }

        // fallback for hero if the above classes didn't match
        if (!hero) {
            const largeImgs = Array.from(document.querySelectorAll('img')).filter(img => img.width > 500);
            if (largeImgs.length > 0) {
                hero = { title: 'Featured', desc: '', image: largeImgs[0].src };
            }
        }

        // 2. Get the game cards (Recommended, Trending)
        const games = [];
        const gameLinks = document.querySelectorAll('a[href^="/game-detail/"]');

        gameLinks.forEach(link => {
            const img = link.querySelector('img');
            if (!img) return;
            // Find title (usually h3 or a div with text)
            const texts = Array.from(link.querySelectorAll('div, span, p')).map(t => t.innerText.trim()).filter(t => t.length > 0);
            let title = '';
            let tags = [];

            if (texts.length > 0) {
                title = texts[0]; // first text is usually title
                if (texts.length > 1) {
                    tags = texts.slice(1); // rest might be tags or desc
                }
            }

            if (img.src && title && !games.find(g => g.title === title)) {
                games.push({
                    title,
                    image: img.src,
                    tags: tags.length > 0 ? tags[0] : '游戏'
                });
            }
        });

        return { hero, games };
    });

    console.log(JSON.stringify(data, null, 2));

    await browser.close();
})();
