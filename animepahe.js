// Finalized animepahe.js based on updated structure and developer console insights
(function() {
    const baseUrl = "https://animepahe.ru";

    async function searchResults(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const results = [];

        const items = doc.querySelectorAll("ul.search-results > li"); // Search container structure
        items.forEach(item => {
            const title = item.querySelector(".result-title")?.textContent.trim() || "";
            const href = item.querySelector("a")?.getAttribute("href");
            const image = item.querySelector("img")?.getAttribute("data-src") || "";
            const status = item.querySelector(".result-status")?.textContent.trim() || "";
            const season = item.querySelector(".result-season")?.textContent.trim() || "";

            if (title && href) {
                results.push({ title, href: baseUrl + href, image, status, season });
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

        const items = doc.querySelectorAll("div.episode-list div"); // Episode list structure
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
