// Adapted animepahe.js based on provided core files
(function() {
    const baseUrl = "https://animepahe.ru";

    async function searchResults(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const results = [];

        const items = doc.querySelectorAll(".search-results-wrap div"); // Adjusted based on search container structure
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

        const description = doc.querySelector("div.synopsis p")?.textContent.trim() || "";
        const aliases = Array.from(doc.querySelectorAll("div.alternative-names span"))
            .map(span => span.textContent.trim())
            .join(", ");
        const airdate = doc.querySelector("span[class='aired']")?.textContent.trim() || "";

        return [{ description, aliases, airdate }];
    }

    async function extractEpisodes(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const episodes = [];

        const items = doc.querySelectorAll(".episode-list div"); // Adjusted for episodes structure
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

        return doc.querySelector("video source")?.getAttribute("src") || "";
    }

    window.searchResults = searchResults;
    window.extractDetails = extractDetails;
    window.extractEpisodes = extractEpisodes;
    window.extractStreamUrl = extractStreamUrl;
})();