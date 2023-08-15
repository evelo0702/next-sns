import { SearchUser } from "@/app/model/user";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";

type Props = {
  user: SearchUser;
};
const UserCard = ({
  user: { name, id, image, followersNum, followingNum },
}: Props) => {
  return (
    <Link
      href={`/user/${id}`}
      className="flex items-center w-full rounded-xl border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-100"
    >
      <Avatar image={image} size="small" />
      <div className="text-neutral-500 ms-4">
        <p className="text-black font-bold leading-4">{id}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followersNum} followers ${followingNum} following`}</p>
      </div>
    </Link>
  );
};

export default UserCard;
