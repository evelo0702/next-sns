import { searchUsers2 } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";
type Context = {
  params: {
    keyword: string;
  };
};
export async function GET(_: NextRequest, context: Context) {
  return searchUsers2(context.params.keyword).then((data) =>
    NextResponse.json(data)
  );
}
