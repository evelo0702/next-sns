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
    <section className="w-full  p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto  bg-white relative z-0">
      {loading ? (
        <div className="font-bold">Loading...</div>
      ) : users && users.length > 0 ? (
        <ScrollableBar>
          {users.map((user, index) => (
            <Link
              href={`/user/${user.id}`}
              className="flex flex-col items-center"
              key={index}
            >
              <Avatar image={user.image} size="normal" />
              <p className="w-full font-bold ms-1 text-sm text-center text-ellipsis overflow-hidden">
                {user.id}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      ) : (
        <>
          <div className="mt-4 flex items-center justify-center font-bold">
            팔로잉한 사람이 없습니다
          </div>
          <div className="mt-4 mb-4 flex items-center justify-center font-bold">
            <Link href={`/search`} className="font-bold text-sky-700 text-lg">
              검색창
            </Link>
            에서 유저를 찾아보세요
          </div>
        </>
      )}
    </section>
  );
};

export default FollowingBar;
