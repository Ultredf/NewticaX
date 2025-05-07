"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import NewsCard from "@/components/news/news-card";
import { Article } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SavedNews() {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    
    // Dalam implementasi nyata, ini akan mengambil dari API
    const savedFromLocal = localStorage.getItem("savedArticles");
    if (savedFromLocal) {
      setSavedArticles(JSON.parse(savedFromLocal));
    }
  }, [status, router]);
  
  const handleDelete = (articleToDelete: Article) => {
    const updated = savedArticles.filter(
      (article) => article.title !== articleToDelete.title
    );
    setSavedArticles(updated);
    localStorage.setItem("savedArticles", JSON.stringify(updated));
  };
  
  if (status === "loading") {
    return <div className="container py-4">Loading...</div>;
  }
  
  return (
    <div className="container py-4">
      <h1 className="text-2xl font-bold mb-4">Berita Tersimpan</h1>
      
      {savedArticles.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">
            Anda belum menyimpan berita apapun
          </p>
          <Button onClick={() => router.push("/")}>Jelajahi Berita</Button>
        </div>
      ) : (
        savedArticles.map((article) => (
          <NewsCard
            key={article.title}
            article={article}
            saved
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}