"use client";
import { DetailUser } from "@/app/model/user";
import useSWR from "swr";
import Link from "next/link";
import Avatar from "./Avatar";
import ScrollableBar from "./ScrollableBar";

const FollowingBar = () => {
  const { data, error, isLoading: loading } = useSWR<DetailUser>(`/api/me`);
  const users = data?.following;

  return (
    <section className="w-full  p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
      {loading ? (
        <div className="font-bold">Loading...</div>
      ) : users && users.length > 0 ? (
        <ScrollableBar>
          {users.map((user, index) => (
            <div className="flex flex-col items-center" key={index}>
              <Link href={`/user/${user.id}`} className="">
                <Avatar image={user.image} />
              </Link>
              <p className="text-sm  font-bold text-center ms-1 text-ellipsis overflow-hidden">
                {user.id}
              </p>
            </div>
          ))}
        </ScrollableBar>
      ) : (
        <>
          <p>{`팔로잉한 사람이 없습니다`}</p>
        </>
      )}
    </section>
  );
};

export default FollowingBar;
