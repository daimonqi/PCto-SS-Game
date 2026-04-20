const https = require('https');
const fs = require('fs');

https.get('https://www.233leyuan.com/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            // Find the window.__NUXT__ payload
            const nuxtMatch = data.match(/window\.__NUXT__=\((function\([^)]*\)\{return (\{.*?\})\}\([^)]*\))\)/) || data.match(/window\.__NUXT__=(\{.*?\});/);

            if (nuxtMatch && nuxtMatch[1] || nuxtMatch && nuxtMatch[2]) {
                // Using regex to find image urls and titles in the raw HTML instead since the JSON parsing via eval might fail
            }

            // Simpler approach: grab all game-detail links and their nearest image
            const games = [];
            let heroImage = '';

            const regex = /game-detail\/\d+[^>]*>.*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"/g;
            let match;
            const seen = new Set();
            while ((match = regex.exec(data)) !== null) {
                const img = match[1];
                const title = match[2];
                if (!seen.has(title) && img.startsWith('http')) {
                    seen.add(title);
                    if (title === '光·遇' && !heroImage) {
                        heroImage = img;
                    }
                    games.push({ title, image: img });
                }
            }

            // Sort to match our chosen ones or just output all
            console.log(JSON.stringify({ heroImage, games: games.slice(0, 15) }, null, 2));

        } catch (e) {
            console.error("Error parsing", e);
        }
    });
}).on('error', (err) => {
    console.error(err);
});
