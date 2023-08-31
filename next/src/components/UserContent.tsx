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
      <div
        className="tablet:grid grid-cols-3 mt-4
       mobile:h-[50vh] mobile:w-[80vw]"
      >
        {userPost
          ? userPost.map((item: any) => (
              <UserPostList
                post={item}
                key={item._id}
                userId={userId}
                tab={tab}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default UserContent;
