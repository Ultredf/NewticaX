import useSWR from "swr";
import { Article } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useNews(params: {
  category?: string;
  country?: string;
  page?: number;
  pageSize?: number;
}) {
  const { category, country = "id", page = 1, pageSize = 10 } = params;
  
  // Build query string
  const queryParams = new URLSearchParams();
  if (country) queryParams.append("country", country);
  if (category && category !== "trending") queryParams.append("category", category);
  queryParams.append("page", page.toString());
  queryParams.append("pageSize", pageSize.toString());
  
  const { data, error, isLoading } = useSWR(
    `/api/news/headlines?${queryParams.toString()}`,
    fetcher
  );
  
  return {
    articles: data?.articles as Article[] || [],
    isLoading,
    isError: error,
    totalResults: data?.totalResults || 0,
  };
}

export function useSearchNews(params: {
  query: string;
  page?: number;
  pageSize?: number;
}) {
  const { query, page = 1, pageSize = 10 } = params;
  
  // Don't fetch if query is empty
  const shouldFetch = query && query.length > 2;
  
  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? `/api/news/search?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
      : null,
    fetcher
  );
  
  return {
    articles: data?.articles as Article[] || [],
    isLoading,
    isError: error,
    totalResults: data?.totalResults || 0,
  };
}