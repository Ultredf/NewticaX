import { getTopHeadlines } from "@/lib/api/news-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const country = searchParams.get("country") || "id";
  const category = searchParams.get("category") || undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  try {
    const data = await getTopHeadlines({
      country,
      category,
      page,
      pageSize,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching headlines:", error);
    return NextResponse.json(
      { error: "Failed to fetch headlines" },
      { status: 500 }
    );
  }
}