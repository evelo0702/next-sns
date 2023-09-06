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
                <p>{name}</p>
                <FollowBtn followers={followers} id={id} _id={_id} />
              </div>
              <div className="text-sm leading-4 mt-3">
                <span className="font-bold text-black me-1">
                  {followersNum}
                </span>
                <span className="me-4">followers</span>
                <span className="font-bold text-black me-1">
                  {followingNum}
                </span>
                <span className="">following</span>
              </div>
              <div className="flex items-center mt-2">
                <p className="text-sm">
                  <span className="font-bold text-black me-1">{posts}</span>{" "}
                  posts
                </p>
              </div>
            </div>
          </Link>
        )}
      </div>
      {size == "small" && (
        <Link
          href={`/user/${id}`}
          className="flex items-center w-full rounded-xl border 
          border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-100"
        >
          <Avatar image={image} size="normal" />
          <div className="text-black ms-4 mb-2">
            <div className="flex items-center">
              <p className="mb-1 mt-1 font-bold me-2  text-xl">{id}</p>
              <p>{name}</p>
            </div>
            <p className="text-sm leading-4">
              {`${followersNum} followers ${followingNum} following`}
            </p>
          </div>
        </Link>
      )}
    </>
  );
};

export default UserCard;
