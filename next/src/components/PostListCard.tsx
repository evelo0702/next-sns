"use client";
import { FullPost } from "@/app/model/post";
import React, { useState } from "react";
import Avatar from "./Avatar";
import Link from "next/link";
import ActionBar from "./ActionBar";
import ImageCarousel from "./ImageCarousel";
import ModalProtal from "./ui/ModalProtal";
import PostDetail from "./PostDetail";
import CommentForm from "./CommentForm";
import { mutate } from "swr";

type Props = {
  post: FullPost;
  bookmarked: boolean;
};
const responsive = {
  desk: {
    breakpoint: { max: 4000, min: 576 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};

const PostListCard = ({ post, bookmarked }: Props) => {
  const {
    userImage,
    id,
    image1,
    image2,
    image3,
    image4,
    createdAt,
    likes,
    content,
    commentsCount,
  } = post;
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
  const handlePostComment = (comment: string) => {
    fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ id: post?.postId, comment }),
    }).then(() => mutate("/api/posts"));
  };
  const [openModal, setOpenModal] = useState(false);
  return (
    <div
      className=" border border-gray-200 shadow-md 
    rounded-lg mx-auto tablet:w-[55vw] desktop:w-[40vw] xl:w-[30vw] mb-4"
    >
      <Link
        href={`/user/${id}`}
        className="h-16 w-32 mt-2 ms-2 border-b flex items-center"
      >
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <Avatar image={userImage} size="small" />
        <p className="font-bold">{id}</p>
      </Link>

      <ImageCarousel
        items={images}
        size="home"
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <ActionBar
        mode="HomePage"
        likes={likes}
        content={content}
        createdAt={createdAt}
        commentsCount={commentsCount}
        detail={false}
        post={post}
        bookmarked={bookmarked}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <CommentForm onPostComment={handlePostComment} />

      {openModal && (
        <ModalProtal>
          <PostDetail
            items={images}
            post={post}
            size="detail"
            onClose={() => setOpenModal(false)}
            bookmarked={bookmarked}
            onPostComment={handlePostComment}
          />
        </ModalProtal>
      )}
    </div>
  );
};

export default PostListCard;
