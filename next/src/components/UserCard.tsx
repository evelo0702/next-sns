"use client";
import { SearchUser } from "@/app/model/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";

import FollowBtn from "./FollowBtn";

type Props = {
  user: SearchUser;
  size: "small" | "big";
};
const UserCard = ({
  user: {
    name,
    id,
    image,
    followersNum,
    followingNum,
    posts,
    following,
    followers,
    _id,
  },
  size,
  user,
}: Props) => {
  return (
    <>
      <div>
        {size == "big" && (
          <Link
            href={`/user/${id}`}
            className="flex w-full 
            rounded-xl border border-neutral-300 mb-2 p-4
             bg-white hover:bg-neutral-200
             "
          >
            <Avatar image={image} size="big" />
            <div className="text-neutral-500 ms-4">
              <div className="flex items-center">
                <p className="text-black font-bold leading-4 me-4 text-2xl">
                  {id}
                </p>
                <FollowBtn followers={followers} id={id} _id={_id} />
              </div>
              <div className="flex items-center">
                <p className="mb-1 mt-1 font-bold me-2 text-lg">{name}</p>
                <p className="text-sm font-bold">{posts} posts</p>
              </div>
              <p className="text-sm leading-4 font-bold">
                {`${followersNum} followers ${followingNum} following`}
              </p>
            </div>
          </Link>
        )}
      </div>
      {size == "small" && (
        <Link
          href={`/user/${id}`}
          className="flex items-center w-full rounded-xl border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-100"
        >
          <Avatar image={image} size="normal" />
          <div className="text-neutral-500 ms-4">
            <div className="flex items-center">
              <p className="text-black font-bold leading-4 me-4 text-lg">
                {id}
              </p>
            </div>
            <div className="flex items-center">
              <p className="mb-1 mt-1 font-bold me-2  text-base">{name}</p>
              <p className="text-sm font-bold">{posts} posts</p>
            </div>
            <p className="text-sm leading-4 font-bold">
              {`${followersNum} followers ${followingNum} following`}
            </p>
          </div>
        </Link>
      )}
    </>
  );
};

export default UserCard;
