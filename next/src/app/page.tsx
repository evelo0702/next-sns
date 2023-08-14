import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import { createPortal } from "react-dom";
export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user; 

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section className="w-full flex flex-col p-4 md:flex-row ">
      <div className="w-3/4 mx-auto min-w-0">
        <FollowingBar />
        <PostList />
      </div>
    </section>
  );
}
