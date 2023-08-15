import { NextRequest, NextResponse } from "next/server";
import { getUserPost } from "@/service/posts";
type Context = {
  params: {
    userId: string;
  };
};

export async function GET(_: NextRequest, context: Context) {
  return getUserPost(context.params.userId).then((data) =>
    NextResponse.json(data)
  );
}
