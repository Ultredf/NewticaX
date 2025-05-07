export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  subscriptionStatus?: 'free' | 'premium';
  subscriptionExpiryDate?: string | null;
}

export interface SavedArticle extends Article {
  savedAt: string;
  userId: string;
}