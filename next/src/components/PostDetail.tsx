import React from "react";
import { FullPost } from "@/app/model/post";
import ImageCarousel from "./ImageCarousel";
import Avatar from "./Avatar";
import Link from "next/link";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import CloseIcon from "./ui/icons/CloseIncon";
import { mutate } from "swr";

type Props = {
  items: string[];
  post: FullPost;
  size: "detail" | "postDetail";
  bookmarked: boolean;
  onClose: () => void;
  userId?: string;
  tab?: string;
  onPostComment: (comment: string) => void;
};
const PostDetail = ({
  items,
  post,
  size,
  onClose,
  bookmarked,
  userId,
  tab,
  onPostComment,
}: Props) => {
  return (
    <div
      className="fixed inset-0 hidden
     bg-gray-500 bg-opacity-90 transition-opacity md:block z-50 h-full"
    >
      <div className="mx-auto h-full  flex items-center  px-4 ">
        <section
          className="flex w-[68vw]  mx-auto items-center 
          justify-center rounded-xl bg-white shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
        >
          <ImageCarousel items={items} size={size} />
          <div className="p-4 w-[30vw] flex flex-col h-[700px] ms-4">
            <button onClick={() => onClose()} className="flex justify-end">
              <CloseIcon />
            </button>
            <Link
              href={`/user/${post.id}`}
              className="flex items-center w-1/2 mb-2 ms-2"
            >
              <Avatar image={post.userImage} size="small" />
              <p className="font-bold">{post.id}</p>
            </Link>

            <ActionBar
              mode="UserPost"
              likes={post.likes}
              createdAt={post.createdAt}
              commentsCount={post.commentsCount}
              detail={true}
              content={post.content}
              post={post}
              bookmarked={bookmarked}
              userId={userId}
              tab={tab}
            />
            <CommentForm onPostComment={onPostComment} />
            <ul className="border-t border-gray-200  overflow-y-auto p-2 mb-1">
              {post.comments &&
                post.comments.map((item, index) => (
                  <li className="flex items-center mb-1" key={index}>
                    <div className="flex items-center">
                      <Link
                        href={`/user/${item.id}`}
                        className="font-bold mr-2"
                      >
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
    </div>
  );
};

export default PostDetail;
