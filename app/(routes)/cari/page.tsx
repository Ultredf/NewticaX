"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchNews } from "@/hooks/use-news";
import { Input } from "@/components/ui/input";
import NewsCard from "@/components/news/news-card";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { articles, isLoading } = useSearchNews({ query, pageSize: 15 });
  
  useEffect(() => {
    // Load search history from local storage
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
    
    // Focus the input when page loads
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSearch = (q: string) => {
    setQuery(q);
    
    // Add to search history if it's a new search
    if (q && !searchHistory.includes(q)) {
      const newHistory = [q, ...searchHistory].slice(0, 10); // Keep only 10 items
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }
  };
  
  const clearHistory = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter((item) => item !== term);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };
  
  return (
    <div className="container py-4">
      <div className="relative mb-4">
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
          placeholder="Cari berita....."
          className="pl-10 pr-4 h-12"
        />
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
      </div>
      
      {query ? (
        <>
          {isLoading ? (
            <div className="py-4 text-center">Mencari...</div>
          ) : (
            <>
              {articles.length > 0 ? (
                articles.map((article) => (
                  <NewsCard key={article.title} article={article} />
                ))
              ) : (
                <div className="py-4 text-center">
                  Tidak ada hasil untuk "{query}"
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {searchHistory.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Riwayat Pencarian</h3>
              <div className="space-y-2">
                {searchHistory.map((term) => (
                  <div
                    key={term}
                    className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-md"
                    onClick={() => handleSearch(term)}
                  >
                    <span>{term}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => clearHistory(e, term)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="font-medium mb-3">Trending</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { category: "Teknologi", title: "Peluncuran iPhone 17", searches: "200k" },
                { category: "Politik", title: "Demo Penolakan RUU TNI", searches: "345k" },
                { category: "Sport", title: "Swiss Open 2025", searches: "150k" },
                { category: "Hiburan", title: "BTS World Tour 2026", searches: "900k" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-muted/50 p-3 rounded-md"
                  onClick={() => handleSearch(item.title)}
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    {item.category}
                  </div>
                  <div className="font-medium mb-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.searches} Pencarian
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}