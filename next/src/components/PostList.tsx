"use client";
import { SimplePost } from "@/app/model/post";
import React from "react";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import PostListCard from "./PostListCard";

const PostList = () => {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>("/api/posts");
  return (
    <div>
      <section>
        {loading && (
          <div className="font-bold">
            Loading...
          </div>
        )}
        {posts && (
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <PostListCard post={post} index={index} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default PostList;
