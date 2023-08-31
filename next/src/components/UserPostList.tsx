"use client";
import React, { useState } from "react";
import Image from "next/image";
import ModalProtal from "./ui/ModalProtal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import { DetailUser } from "@/app/model/user";

import useSWR, { mutate } from "swr";
const UserPostList = ({ post, userId, tab }: any) => {
  const handlePostComment = (comment: string) => {
    fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ id: post?.postId, comment }),
    }).then(() => mutate(`/api/userPosts/${userId}/${tab}`));
  };
  const [openModal, setOpenModal] = useState(false);
  const images = [];
  images.push(post.image1);
  if (post.image2 != null) {
    images.push(post.image2);
  }
  if (post.image3 != null) {
    images.push(post.image3);
  }
  if (post.image4 != null) {
    images.push(post.image4);
  }
  const { data } = useSWR<DetailUser>(`/api/me`);
  const bookmark = data?.bookmarks;
  let bookmarked = bookmark?.includes(post.postId) ? true : false;
  return (
    <div key={post._id} className="cursor-pointer me-2">
      <div className="m-4 w-full h-full mt-8">
        <Image
          src={post.image1}
          width={500}
          height={500}
          alt=""
          priority
          className="rounded-xl w-80 h-64"
          onClick={() => setOpenModal(!openModal)}
        />
      </div>
      {openModal && images && (
        <ModalProtal>
          <PostDetail
            items={images}
            post={post}
            size="postDetail"
            onClose={() => setOpenModal(false)}
            bookmarked={bookmarked}
            userId={userId}
            tab={tab}
            onPostComment={handlePostComment}
          />
        </ModalProtal>
      )}
    </div>
  );
};

export default UserPostList;
