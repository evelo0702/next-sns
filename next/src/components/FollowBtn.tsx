"use client";
import { simpleUser } from "@/app/model/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {
  following: simpleUser[];
  id: string;
};
const FollowBtn = ({ following, id }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
  const isShow = user && user.id !== id;
  const isFollow = user && following?.filter((item) => item.id === user.id);

  return (
    <>
      {isShow && (
        <div>
          {isFollow?.length > 0 ? (
            <button className="p-1 rounded-md bg-red-700 text-white">
              Unfollow
            </button>
          ) : (
            <button className="p-1 rounded-md bg-blue-700 text-white">
              Follow
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FollowBtn;
