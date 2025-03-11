// animehaven.js

function searchResults(html) {
    const results = [];
    const filmListRegex = /<div class='similarimg'><div class='p1'>([\s\S]*?)<\/div><\/div>/g;
    const items = html.matchAll(filmListRegex);
  
    for (const item of items) {
        const itemHtml = item[1];
        
        const titleMatch = itemHtml.match(/<a href='[^']+' class='c'>([^<]+)<\/a>/);
        const hrefMatch = itemHtml.match(/<a href='([^']+)'/);
        const imgMatch = itemHtml.match(/<img class='coverimg' src='([^']+)' alt='([^']+)'>/);
  
        if (titleMatch && hrefMatch && imgMatch) {
            const title = titleMatch[1];
            const href = hrefMatch[1];
            const imageUrl = imgMatch[1];
            
            const fullHref = `https://animeheaven.me/${href}`;
            const fullImageUrl = `https://animeheaven.me/${imageUrl}`;
  
            results.push({
                title: title.trim(),
                image: fullImageUrl.trim(),
                href: fullHref.trim()
            });
        }
    }
    return results;
  }
  
  function extractDetails(html) {
    const details = [];
   
    const descriptionMatch = html.match(/<div class='infodes c'>([^<]+)<\/div>/);
    let description = descriptionMatch ? descriptionMatch[1] : '';
    
    const aliasesMatch = html.match(/<div class='infotitle c'>([^<]+)<\/div>/);
    let aliases = aliasesMatch ? aliasesMatch[1] : '';
    
    const airdateMatch = html.match(/Year: <div class='inline c2'>([^<]+)<\/div>/);
    let airdate = airdateMatch ? airdateMatch[1] : '';
    
    if (description && airdate) {
        details.push({
            description: description,
            aliases: aliases || 'N/A',
            airdate: airdate
        });
    }
    
    return details;
}
  function extractEpisodes(html) {
    const episodes = [];
    const baseUrl = "https://animeheaven.me/episode.php?";
  
    const episodeRegex = /<a href='episode\.php\?([^']+)'[^>]*>.*?<div class='watch2 bc'\s*>(\d+)<\/div>/gs;
    let match;
  
    while ((match = episodeRegex.exec(html)) !== null) {
        let href = match[1];
        const number = parseInt(match[2], 10);
      
        if (!href.startsWith("https")) {
            href = href.startsWith("/") ? baseUrl + href : baseUrl + "/" + href;
        }
        episodes.push({
            href: href,
            number: number.toString()
        });
    }
  
    episodes.reverse();
    return episodes;
}
  
  function extractStreamUrl(html) {
    const sourceRegex = /<source\s+src=['"]([^'"]+)['"][^>]*type=['"]video\/mp4['"][^>]*>/i;
    const match = html.match(sourceRegex);
    return match ? match[1].replace(/&amp;/g, '&') : null;

    // Return the stream info in JSON:
    return JSON.stringify({
      stream: streamUrl,
      subtitles: subtitlesUrl
    });
  }
  
  function extractStreamUrlDub(html) {
    const sourceRegex = /<source\s+src=['"]([^'"]+)['"][^>]*type=['"]video\/mp4['"][^>]*>/i;
    const match = html.match(sourceRegex);
    return match ? match[1].replace(/&amp;/g, '&') : null;
  }
  
  // If you're using async/await in your iOS code, but the code calls these 
  // as synchronous functions (parseFunction.call(...) ), you can remove "async" 
  // from the function definitions. The above are all synchronous returns.
