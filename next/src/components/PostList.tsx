"use client";
import { FullPost, SimplePost } from "@/app/model/post";
import React from "react";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import PostListCard from "./PostListCard";
import { DetailUser } from "@/app/model/user";
import { redirect } from "next/navigation";

const PostList = () => {
  const { data: posts, isLoading: loading } = useSWR<FullPost[]>("/api/posts");
  const { data } = useSWR<DetailUser>(`/api/me`);
  const bookmarked = data?.bookmarks;
  return (
    <div>
      <section>
        {posts && posts.length > 0 && (
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                {bookmarked?.includes(post.postId) ? (
                  <PostListCard post={post} bookmarked={true} />
                ) : (
                  <PostListCard post={post} bookmarked={false} />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default PostList;
