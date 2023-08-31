`use client`;
import { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";
type Props = {
  onPostComment: (comment: string) => void;
};
export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };
  return (
    <form
      className="flex items-center px-3 border-t border-neutral-300"
      onSubmit={handleSubmit}
    >
      <SmileIcon />
      <input
        className="w-full ml-2 border-none outline-none p-3"
        type="text"
        placeholder="댓글을 입력해주세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <div className="p-4">
        {comment.length > 0 ? (
          <button className="font-bold whitespace-nowrap">작성</button>
        ) : (
          <p className="text-gray-500 whitespace-nowrap">작성</p>
        )}
      </div>
    </form>
  );
}
