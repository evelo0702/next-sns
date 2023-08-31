import { RiBookmarkLine } from "react-icons/ri";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
type Props = {
  bookmarked?: boolean;
};
export default function BookmarkIcon({ bookmarked }: Props) {
  return (
    <div>
      {bookmarked && <BsFillBookmarkCheckFill className="w-6 h-6" />}
      {!bookmarked && <RiBookmarkLine className="w-6 h-6" />}
    </div>
  );
}
