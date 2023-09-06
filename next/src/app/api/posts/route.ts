import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { createPost, getFollowingPostsOf } from "@/service/posts";
export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  return getFollowingPostsOf(user.id).then((data) => NextResponse.json(data));
}
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const form = await req.formData();
  const text = form.get("content")?.toString();
  const files0 = form.get("files0") as Blob;
  const files1 = (form.get("files1") as Blob) ?? "";
  const files2 = (form.get("files2") as Blob) ?? "";
  const files3 = (form.get("files3") as Blob) ?? "";
  if (!text || !files0) {
    return new Response("Bad Request", { status: 400 });
  }

  return createPost(user.id2, text, files0, files1, files2, files3).then(
    (data) => NextResponse.json(data)
  );
}
