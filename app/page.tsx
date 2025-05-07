import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsList from "@/components/news/news-list";
import { getTopHeadlines } from "@/lib/api/news-api";

const categories = [
  { value: "trending", label: "Trending" },
  { value: "entertainment", label: "Hiburan" },
  { value: "politics", label: "Politik" },
  { value: "sports", label: "Sport" },
];

export default async function Home() {
  // Prefetch trending news
  const trendingNews = await getTopHeadlines({ country: "id", pageSize: 15 });

  return (
    <div className="container py-4">
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {categories.map((category) => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value}>
            <NewsList 
              initialData={category.value === "trending" ? trendingNews.articles : undefined}
              category={category.value === "trending" ? undefined : category.value} 
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}