"use client";
import { simpleUser } from "@/app/model/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type Props = {
  followers: simpleUser[];
  id: string;
  _id?: string;
};
const FollowBtn = ({ followers, id, _id }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;
  const isShow = user && user.id !== id;
  const isFollow: boolean =
    user && followers?.filter((item) => item.id === user.id).length > 0 && true;
  const updateFollow = (targetId?: string) => {
    return fetch("/api/follow", {
      method: "PUT",
      body: JSON.stringify({ id: targetId, follow: isFollow }),
    })
      .then((res) => res.json())
      .then(() => location.reload());
  };
  return (
    <>
      {isShow && (
        <div>
          {isFollow ? (
            <button
              className="p-1 rounded-md bg-red-700 text-white"
              onClick={() => {
                updateFollow(_id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="p-1 rounded-md bg-blue-700 text-white"
              onClick={() => {
                updateFollow(_id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FollowBtn;
