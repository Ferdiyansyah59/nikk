// src/store/articleStore.js
import { create } from 'zustand';

const API_URL = 'http://localhost:8081/api';

const useArticleStore = create((set) => ({
  articles: [],
  article: null,
  pagination: {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,

  // Get all articles
  fetchArticles: async (page = 1, limit = 10, search = '') => {
    set({ loading: true, error: null });
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) {
        queryParams.append('search', search);
      }

      const response = await fetch(`${API_URL}/articles?${queryParams}`);

      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }

      const result = await response.json();

      if (result.status) {
        set({
          articles: result.data.articles,
          pagination: result.data.pagination,
          loading: false,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error fetching articles:', error);
    }
  },

  // Get article by slug
  fetchArticleBySlug: async (slug) => {
    set({ loading: true, error: null, article: null });
    try {
      const response = await fetch(`${API_URL}/articles/slug/${slug}`);

      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }

      const result = await response.json();

      if (result.status) {
        set({ article: result.data, loading: false });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error fetching article:', error);
    }
  },

  // Search articles
  searchArticles: async (query, page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const queryParams = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(`${API_URL}/articles/search?${queryParams}`);

      if (!response.ok) {
        throw new Error('Failed to search articles');
      }

      const result = await response.json();

      if (result.status) {
        set({
          articles: result.data.articles,
          pagination: result.data.pagination,
          loading: false,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error searching articles:', error);
    }
  },

  // Change pagination
  setPage: (page) => {
    set((state) => ({
      pagination: { ...state.pagination, page },
    }));
  },
}));

export default useArticleStore;
