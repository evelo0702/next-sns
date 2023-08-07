"use client";
import { SimplePost } from "@/app/model/post";
import React, { useState } from "react";
import Avatar from "./Avatar";
import Link from "next/link";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import ImageCarousel from "./ImageCarousel";
import ModalProtal from "./ui/ModalProtal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";

type Props = {
  post: SimplePost;
  index: number;
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

const PostListCard = ({ post, index }: Props) => {
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
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="border border-gray-200 shadow-md rounded-lg max-w-[500px] mx-auto h-[800px] mb-4">
      <Link
        href={"/"}
        className="h-[70px] w-32 mt-2 ms-2 border-b flex items-center"
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
        likes={likes}
        content={content}
        createdAt={createdAt}
        commentsCount={commentsCount}
        detail={false}
      />
      <CommentForm />
      {openModal && (
        <ModalProtal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail items={images} post={post} />
          </PostModal>
        </ModalProtal>
      )}
    </div>
  );
};

export default PostListCard;
