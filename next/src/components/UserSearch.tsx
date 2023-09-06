"use client";
import { SearchUser } from "@/app/model/user";
import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import UserCard from "./UserCard";
import useDebounce from "@/hooks/debounce";
const UserSearch = () => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className="w-[100vw] h-full max-w-2xl flex flex-col items-center">
      <form onSubmit={onSubmit} className="w-full text-center mt-4 mb-4">
        <input
          className="w-5/6  text-base p-4 outline-none border border-gray-400"
          type="text"
          autoFocus
          placeholder="ID나 이름으로 검색해주세요"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
      </form>
      {error && <p>에러가 발생했습니다</p>}
      {!isLoading && !error && users?.length === 0 && (
        <p>찾는 사용자가 없습니다</p>
      )}
      <ul className="w-5/6  p-4">
        {users &&
          users.map((user) => (
            <li key={user.email}>
              <UserCard user={user} size="small" />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default UserSearch;
