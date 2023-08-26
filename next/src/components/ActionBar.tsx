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
};

export default function ActionBar({
  likes,
  createdAt,
  commentsCount,
  detail,
  content,
  post,
  bookmarked,
}: Props) {
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();
  const user = session?.user;

  const liked = user ? likes.includes(user.id) : false;
  const handleLike = (like: boolean) => {
    fetch("api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: post?.postId, like }),
    }).then(() => mutate("/api/posts"));
  };
  const handleBookmark = (bookmark: boolean) => {
    fetch("api/bookmarks", {
      method: "PUT",
      body: JSON.stringify({ id: post?.postId, bookmark: bookmarked }),
    }).then(() => mutate("/api/me"));
  };
  return (
    <div className="relative">
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />

        <button onClick={() => handleBookmark(bookmarked)}>
          <BookmarkIcon bookmarked={bookmarked} />
        </button>
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        <p>{content}</p>
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
        {detail == false ? <p>{commentsCount}</p> : null}
      </div>
    </div>
  );
}
