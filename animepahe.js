// Remade animepahe.js script for AnimePahe based on AnimeWorld.js
(function() {
    const baseUrl = "https://animepahe.ru";

    async function searchResults(query) {
        const apiUrl = `${baseUrl}/api?m=search&q=${encodeURIComponent(query)}`;
        const results = [];

        try {
            // Fetch data from the API
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

            const data = await response.json();

            // Parse the returned JSON data
            if (data && data.data) {
                data.data.forEach(item => {
                    results.push({
                        title: item.title,
                        href: `${baseUrl}/anime/${item.session}`,
                        type: item.type,
                        episodes: item.episodes,
                        status: item.status,
                        season: item.season,
                        year: item.year,
                        score: item.score,
                        poster: item.poster
                    });
                });
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
        }

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

    // Expose functions globally
    window.searchResults = searchResults;
    window.extractDetails = extractDetails;
    window.extractEpisodes = extractEpisodes;
    window.extractStreamUrl = extractStreamUrl;
})();
