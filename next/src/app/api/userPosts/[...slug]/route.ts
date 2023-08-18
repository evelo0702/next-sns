import { NextRequest, NextResponse } from "next/server";
import { getUserBookmarks, getUserLikes, getUserPost } from "@/service/posts";
type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;
  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const [userId, tab] = slug;
  if (tab == "POSTS") {
    return getUserPost(userId).then((data) => NextResponse.json(data));
  } else if (tab == "BOOKMARKS") {
    return getUserBookmarks(userId).then((data) => NextResponse.json(data));
  } else if (tab == "LIKES") {
    return getUserLikes(userId).then((data) => NextResponse.json(data));
  }
}
