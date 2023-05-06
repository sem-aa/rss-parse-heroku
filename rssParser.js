const axios = require('axios');
const xml2js = require('xml2js');

async function parseRSS(url) {
  try {
    const response = await axios.get(url);
    const xml = response.data;

    // Convert XML to JSON
    const parser = new xml2js.Parser();
    const parsedXML = await parser.parseStringPromise(xml);

    // Extract items from the feed
    const items = parsedXML.rss.channel[0].item;

    // Normalize items into a simplified format
    const normalizedItems = items.map((item) => ({
      title: item.title[0],
      link: item.link[0],
      description: item.description[0],
      pubDate: new Date(item.pubDate[0]),
    }));

    return normalizedItems;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
}

module.exports = parseRSS;
