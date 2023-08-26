import { getUserByUsername, searchUsers } from "@/service/user";
import { notFound } from "next/navigation";
import React from "react";
import UserCard from "@/components/UserCard";
import UserPostList from "@/components/UserPostList";
import UserContent from "@/components/UserContent";
import { Metadata } from "next";
type Props = {
  params: {
    userId: string;
  };
};
const UserDetailPage = async ({ params: { userId } }: Props) => {
  const user = await searchUsers(userId);
  if (!user) {
    notFound();
  }
  
  return (
    <>
      <div className="h-full w-full p-4">
        <div className="w-2/5 mx-auto mt-4 mb-4">
          <UserCard user={user} size="big" />
        </div>
        <div className="mx-auto w-5/6 border-t border-neutral-300">
          <UserContent userId={userId} />
        </div>
      </div>
    </>
  );
};

export default UserDetailPage;

export async function generateMetadata({
  params: { userId },
}: Props): Promise<Metadata> {
  const user = await searchUsers(userId);
  return {
    title: `${user?.name} (@${user?.id}) - BLISS Photos`,
    description: `${user?.name}'s all BLISS posts`,
  };
}
