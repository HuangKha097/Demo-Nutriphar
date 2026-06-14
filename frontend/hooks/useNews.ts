import { useState, useEffect } from "react";
import { getNewsArticles, NewsArticle } from "@/services/api";

export function useNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    getNewsArticles()
      .then((data) => {
        if (active) {
          setNews(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { news, loading, error };
}
