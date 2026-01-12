const https = require('https');
const urls = [
  'https://kpopofficial.com/super-junior-super-show-10-tour-dates-schedule/',
  'https://us.trip.com/travel-guide/new-attraction/macau/macau-super-junior-super-show-10-20th-anniversary-tour-151705337/',
  'https://www.londonermacao.com/macau-events-shows/qwer-rockation-2026.html'
];

urls.forEach(url => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } }, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      // Look for og:image
      const ogMatch = data.match(/property=["']og:image["']\s+content=["']([^"']+)["']/) || 
                      data.match(/content=["']([^"']+)["']\s+property=["']og:image["']/);
      
      if (ogMatch) {
        console.log(`FOUND|${url}|${ogMatch[1]}`);
      } else {
        console.log(`NOTFOUND|${url}`);
      }
    });
  }).on('error', (e) => console.log(`ERROR|${url}|${e.message}`));
});