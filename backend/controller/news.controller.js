const axios = require('axios');
const apiKey = process.env.GNEWS_API_KEY;

const fetchTopHeadlines = async (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ error: 'Category parameter is required for top headlines' });
  }

  try {
    const response = await axios.get('https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + `${ process.env.GNEWS_API_KEY}`
, {
      params: {
        category: category,
        lang: 'en',
        country: 'us',
        max: 30,
        token: apiKey,
      },
    });

    const articles = response.data.articles;

    // Extract and format the desired fields from the articles
    const simplifiedArticles = articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt,
      source: article.source.name,
    }));

    res.json({ articles: simplifiedArticles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch top headlines' });
  }
};

const searchNews = async (req, res) => {
   const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required for search' });
  }

  try {
    const response = await axios.get('https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=' + `${ process.env.GNEWS_API_KEY}`, {
      params: {
        q: query, 
        lang: 'en',
        country: 'us',
        max: 30,
        token: apiKey,
      },
    });

    const articles = response.data.articles;

    // Extract and format the desired fields from the articles
    const simplifiedArticles = articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt,
      source: article.source.name,
    }));

    res.json({ articles: simplifiedArticles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
};

module.exports = {
  fetchTopHeadlines,
  searchNews,
};
