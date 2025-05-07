import { notFound } from "next/navigation";
import Image from "next/image";
import { getTopHeadlines, searchNews } from "@/lib/api/news-api";
import { formatDate } from "@/lib/utils/format-date";
import { Bookmark, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsCard from "@/components/news/news-card";

interface BeritaDetailProps {
  params: {
    id: string;
  };
}

export default async function BeritaDetail({ params }: BeritaDetailProps) {
  // Decode the ID (which is actually the title)
  const title = decodeURIComponent(params.id);
  
  // Find the article by searching for it
  const searchResults = await searchNews({
    q: title,
    pageSize: 1,
  });
  
  const article = searchResults.articles[0];
  
  if (!article) {
    notFound();
  }
  
  // Get related news
  const relatedNews = await searchNews({
    q: article.title.split(" ").slice(0, 3).join(" "), // Use first 3 words for related
    pageSize: 4,
  });
  
  // Filter out the current article
  const filteredRelatedNews = relatedNews.articles.filter(
    (relatedArticle) => relatedArticle.title !== article.title
  );
  
  const publishDate = new Date(article.publishedAt);
  const formattedDate = formatDate(publishDate);
  
  return (
    <div className="container py-4">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          <span>{article.source.name}</span>
          <span className="mx-2">•</span>
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Simpan
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Bagikan
          </Button>
        </div>
      </div>
      
      {article.urlToImage && (
        <div className="relative w-full h-64 mb-4 rounded-md overflow-hidden">
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="prose dark:prose-invert max-w-none mb-8">
        {article.content ? (
          <>
            <p className="font-medium text-lg mb-4">{article.description}</p>
            <p>{article.content.replace(/\[\+\d+ chars\]$/, "")}</p>
            
            {article.url && (
              <p className="mt-4">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Baca artikel lengkap di {article.source.name}
                </a>
              </p>
            )}
          </>
        ) : (
          <p className="font-medium text-lg">{article.description}</p>
        )}
      </div>
      
      {filteredRelatedNews.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Berita Terkait</h2>
          {filteredRelatedNews.map((relatedArticle) => (
            <NewsCard key={relatedArticle.title} article={relatedArticle} />
          ))}
        </div>
      )}
    </div>
  );
}