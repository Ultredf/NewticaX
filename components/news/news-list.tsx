"use client";

import { useNews } from "@/hooks/use-news";
import NewsCard from "./news-card";
import { Article } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsListProps {
  category?: string;
  initialData?: Article[];
}

export default function NewsList({ category, initialData }: NewsListProps) {
  const { articles, isLoading } = useNews({
    category,
    pageSize: 15,
  });

  const displayArticles = initialData || articles;

  if (isLoading && !initialData) {
    return (
      <div className="space-y-4 mt-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-24 w-24 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/4 mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4">
      {displayArticles.map((article) => (
        <NewsCard key={article.title} article={article} />
      ))}
    </div>
  );
}