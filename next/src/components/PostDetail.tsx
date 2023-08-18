import React from "react";
import { FullPost } from "@/app/model/post";
import ImageCarousel from "./ImageCarousel";
import Avatar from "./Avatar";
import Link from "next/link";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";

type Props = {
  items: string[];
  post: FullPost;
  size: "detail" | "postDetail";
};
const PostDetail = ({ items, post, size }: Props) => {
  return (
    <div className="w-[70vw] mx-auto h-full flex items-center  overflow-hidden px-4">
      <section
        className="flex w-[68vw] mx-auto items-center justify-center rounded-xl bg-white shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8
        "
      >
        <ImageCarousel items={items} size={size} />
        <div className="p-4 w-[30vw] flex flex-col h-[700px] ms-4">
          <Link
            href={`/user/${post.id}`}
            className="flex items-center w-1/2 mb-2 ms-2"
          >
            <Avatar image={post.userImage} size="small" />
            <p className="font-bold">{post.id}</p>
          </Link>
          <ActionBar
            likes={post.likes}
            createdAt={post.createdAt}
            commentsCount={post.commentsCount}
            detail={true}
            content={post.content}
          />
          <CommentForm />
          <ul className="border-t border-gray-200  overflow-y-auto p-2 mb-1">
            {post.comments &&
              post.comments.map((item, index) => (
                <li className="flex items-center mb-1" key={index}>
                  <div className="flex items-center">
                    <Link href={`/user/${item.id}`} className="font-bold mr-2">
                      {item.id}
                    </Link>
                    <span>{item.comment}</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
