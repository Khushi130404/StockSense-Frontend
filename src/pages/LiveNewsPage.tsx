import React, { useEffect, useState } from 'react';

interface NewsArticle {
  title: string;
  url: string;
  source: { name: string };
  publishedAt: string;
  description: string;
  urlToImage?: string;
}

const NEWS_API_KEY = '5eb2b3d9f49643a69763a77acef6fa0a'; // Replace 'demo' with your actual API key if needed

export const LiveNewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Example using NewsAPI.org (you need to get a free API key)
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=stock%20market&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
        );
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Live Stock Market News</h1>
      {loading ? (
        <div>Loading news...</div>
      ) : articles.length === 0 ? (
        <div>No news found.</div>
      ) : (
        <div className="space-y-6">
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded-lg p-4 hover:bg-accent transition"
            >
              <div className="flex items-start space-x-4">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{article.title}</h2>
                  <p className="text-sm text-muted-foreground mb-1">{article.source.name} &middot; {new Date(article.publishedAt).toLocaleString()}</p>
                  <p className="text-sm">{article.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveNewsPage;