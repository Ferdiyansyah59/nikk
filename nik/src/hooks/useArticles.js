// src/hooks/useArticles.js
import { useEffect } from 'react';
import useArticleStore from '@/store/articleStore';

export const useArticles = (page = 1, limit = 10, search = '') => {
  const { articles, pagination, loading, error, fetchArticles } =
    useArticleStore();

  useEffect(() => {
    fetchArticles(page, limit, search);
  }, [fetchArticles, page, limit, search]);

  return { articles, pagination, loading, error };
};

export const useArticleBySlug = (slug) => {
  const { article, loading, error, fetchArticleBySlug } = useArticleStore();

  useEffect(() => {
    if (slug) {
      fetchArticleBySlug(slug);
    }
  }, [fetchArticleBySlug, slug]);

  return { article, loading, error };
};
