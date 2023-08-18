"use client";
import React, { useState } from "react";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostIcon from "./ui/icons/PostIcon";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import UserPostList from "./UserPostList";

const UserContent = ({ userId }: any) => {
  const [tab, setTab] = useState("POSTS");
  const {
    data: userPost,
    isLoading: loading,
    error: isError,
  } = useSWR(`/api/userPosts/${userId}/${tab}`);
  // /api/userPosts/${userId}/posts
  // /api/userPosts/${userId}/likes
  // /api/userPosts/${userId}/bookmarks
  const { data: session } = useSession();
  const user = session?.user;
  const isShow = user && user.id === userId;
  return (
    <div className="h-[70vh]">
      <div className="flex justify-center">
        <button
          className={`flex p-3 mx-8 ${
            tab === "POSTS" && "border-black border-t-2"
          }`}
          onClick={() => setTab("POSTS")}
        >
          <PostIcon />
          POSTS
        </button>
        {isShow && (
          <>
            <button
              className={`flex p-3 mx-8 ${
                tab === "BOOKMARKS" && "border-t-2 border-black"
              }`}
              onClick={() => setTab("BOOKMARKS")}
            >
              <BookmarkIcon />
              BOOKMARKS
            </button>
            <button
              className={`flex p-3 mx-8 ${
                tab === "LIKES" && "border-t-2 border-black"
              }`}
              onClick={() => setTab("LIKES")}
            >
              <HeartIcon />
              LIKES
            </button>
          </>
        )}
      </div>
      <div className="grid grid-cols-3 mt-4">
        {userPost
          ? userPost.map((item: any) => (
              <UserPostList item={item} key={item._id} />
            ))
          : null}
      </div>
    </div>
  );
};

export default UserContent;
