import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import { parseDate } from "@/util/date";
type Props = {
  likes: string[];
  createdAt: string;
  commentsCount: number;
  detail: boolean;
  content: string;
};
export default function ActionBar({
  likes,
  createdAt,
  commentsCount,
  detail,
  content,
}: Props) {
  return (
    <div className="relative">
      <div className="flex justify-between my-2 px-4">
        <HeartIcon />
        <BookmarkIcon />
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
