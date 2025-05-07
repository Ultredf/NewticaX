const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export async function getTopHeadlines(params: {
  country?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}) {
  const { country = "id", category, page = 1, pageSize = 10 } = params;
  
  const url = new URL(`${BASE_URL}/top-headlines`);
  url.searchParams.append("country", country);
  if (category && category !== "trending") url.searchParams.append("category", category);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("pageSize", pageSize.toString());
  
  const response = await fetch(url.toString(), {
    headers: {
      "X-Api-Key": API_KEY!,
    },
    next: { revalidate: 300 }, // Revalidate every 5 minutes
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  
  return response.json();
}

export async function searchNews(params: {
  q: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
}) {
  const { q, page = 1, pageSize = 10, sortBy = "publishedAt" } = params;
  
  const url = new URL(`${BASE_URL}/everything`);
  url.searchParams.append("q", q);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("pageSize", pageSize.toString());
  url.searchParams.append("sortBy", sortBy);
  
  const response = await fetch(url.toString(), {
    headers: {
      "X-Api-Key": API_KEY!,
    },
    next: { revalidate: 300 },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  
  return response.json();
}

export async function getAiSummary(articleContent: string) {
  const response = await fetch('/api/ai/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: articleContent }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate summary');
  }
  
  return response.json();
}