import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { formatTimeAgo } from "@/lib/utils/format-date";
import { Article } from "@/lib/types";
import { Bookmark, Share, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsCardProps {
  article: Article;
  saved?: boolean;
  onDelete?: (article: Article) => void;
}

export default function NewsCard({
  article,
  saved = false,
  onDelete,
}: NewsCardProps) {
  const formattedDate = formatTimeAgo(new Date(article.publishedAt));

  return (
    <Card className="overflow-hidden mb-4">
      <Link href={`/berita/${encodeURIComponent(article.title)}`}>
        <div className="flex p-3 gap-3">
          <div className="relative w-24 h-24 rounded-md overflow-hidden">
            {article.urlToImage ? (
              <Image
                src={article.urlToImage}
                alt={article.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium line-clamp-2">{article.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {formattedDate}
            </p>
          </div>
        </div>
      </Link>
      <CardContent className="p-0 flex">
        {saved ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none flex-1"
            >
              <Share className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none flex-1 text-red-500 hover:text-red-600"
              onClick={() => onDelete && onDelete(article)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-none flex-1"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}