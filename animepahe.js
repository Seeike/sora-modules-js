// Adapted animepahe.js based on provided core files
(function() {
    const baseUrl = "https://animepahe.ru";

    async function searchResults(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const results = [];

        const items = doc.querySelectorAll("div.content-wrapper div.latest-release div.episode-list-wrapper div.episode-list div");
        items.forEach(item => {
            const title = item.querySelector("a")?.textContent.trim() || "";
            const href = item.querySelector("a")?.getAttribute("href");
            const image = item.querySelector("img")?.getAttribute("src") || "";

            if (title && href) {
                results.push({ title, href: baseUrl + href, image });
            }
        });

        return results;
    }

    async function extractDetails(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const description = doc.querySelector("div.synopsis")?.textContent.trim() || "";
        const aliases = doc.querySelector("span.alternative-names")?.textContent.trim() || "";
        const airdate = doc.querySelector("span.aired")?.textContent.trim() || "";

        return [{ description, aliases, airdate }];
    }

    async function extractEpisodes(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const episodes = [];

        const items = doc.querySelectorAll("div.episode-list div");
        items.forEach((item, index) => {
            const href = item.querySelector("a")?.getAttribute("href");
            if (href) {
                episodes.push({ number: index + 1, href: baseUrl + href });
            }
        });

        return episodes;
    }

    async function extractStreamUrl(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        return doc.querySelector("video > source")?.getAttribute("src") || "";
    }

    window.searchResults = searchResults;
    window.extractDetails = extractDetails;
    window.extractEpisodes = extractEpisodes;
    window.extractStreamUrl = extractStreamUrl;
})();
