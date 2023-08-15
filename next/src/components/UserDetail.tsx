"use client";
import React, { useState } from "react";
import useSWR from "swr";
import UserCard from "./UserCard";
import { SearchUser } from "@/app/model/user";
import Image from "next/image";
const UserDetail = ({ userId }: string) => {
  const [selectedTap, setSelectedTap] = useState("posts");
  const {
    data: user,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${userId}`);
  const {
    data: userPost,
    isLoading: loading,
    error: isError,
  } = useSWR(`/api/userPosts/${userId}`);
  console.log(userPost);
  return (
    <div className="h-full w-full">
      <div className="mt-4 mb-4">{user && <UserCard user={user[0]} />}</div>
      <div>
        <button
          onClick={() => setSelectedTap("posts")}
          className="border p-4 m-4"
        >
          posts
        </button>
        <button
          onClick={() => setSelectedTap("bookmarks")}
          className="border p-4 m-4"
        >
          bookmarks
        </button>
        <button
          onClick={() => setSelectedTap("likes")}
          className="border p-4 m-4"
        >
          likes
        </button>
      </div>
      <div>
        {userPost && selectedTap === "posts"
          ? userPost.map((item) => (
              <div key={item.id}>
                <Image src={item.image1} width={500} height={500} alt="" />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default UserDetail;
