import { searchNews } from "@/lib/api/news-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const sortBy = searchParams.get("sortBy") || "publishedAt";

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
  }

  try {
    const data = await searchNews({
      q: query,
      page,
      pageSize,
      sortBy,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching news:", error);
    return NextResponse.json(
      { error: "Failed to search news" },
      { status: 500 }
    );
  }
}