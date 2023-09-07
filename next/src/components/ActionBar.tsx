import { FullPost } from "@/app/model/post";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import { parseDate } from "@/util/date";
import { useSession } from "next-auth/react";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import { useSWRConfig } from "swr";

type Props = {
  likes: string[];
  createdAt: string;
  commentsCount: number;
  detail: boolean;
  content: string;
  bookmarked: boolean;
  post: FullPost;
  openModal?: boolean;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  mode: string;
  userId?: string;
  tab?: string;
};

export default function ActionBar({
  likes,
  createdAt,
  commentsCount,
  detail,
  content,
  post,
  bookmarked,
  openModal = false,
  setOpenModal,
  mode,
  userId,
  tab,
}: Props) {
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();
  const user = session?.user;

  const liked = user ? likes.includes(user.id) : false;
  const handleLike = (like: boolean) => {
    fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: post?.postId, like }),
    }).then(() => mutate("/api/posts"));
  };
  const handleLikeForUserPost = (like: boolean) => {
    fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: post?.postId, like }),
    })
      .then(() => mutate(`/api/userPosts/${userId}/${tab}`))
      .then(() => mutate(`/api/posts`));
  };
  const handleBookmark = (bookmark: boolean) => {
    fetch("/api/bookmarks", {
      method: "PUT",
      body: JSON.stringify({ id: post?.postId, bookmark: bookmarked }),
    }).then(() => mutate("/api/me"));
  };
  return (
    <div className="relative">
      <div className="flex justify-between my-2 px-4">
        {mode === "HomePage" ? (
          <ToggleButton
            toggled={liked}
            onToggle={handleLike}
            onIcon={<HeartFillIcon />}
            offIcon={<HeartIcon />}
          />
        ) : (
          <ToggleButton
            toggled={liked}
            onToggle={handleLikeForUserPost}
            onIcon={<HeartFillIcon />}
            offIcon={<HeartIcon />}
          />
        )}

        <button onClick={() => handleBookmark(bookmarked)}>
          <BookmarkIcon bookmarked={bookmarked} />
        </button>
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        <p className=" overflow-y-auto max-h-32">{content}</p>
        {detail == false ? (
          <p className=" my-6 text-blue-400 font-bold text-sm text-center">
            {setOpenModal != undefined && commentsCount && (
              <button onClick={() => setOpenModal(!openModal)} className="">
                {commentsCount}개의 댓글이 있습니다{" "}
              </button>
            )}
          </p>
        ) : null}
        <p className="text-xs text-neutral-500 uppercase my-2 text-end">
          {parseDate(createdAt)}
        </p>
      </div>
    </div>
  );
}
