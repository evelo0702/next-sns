"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchIcon from "./ui/icons/SearchIcon";
import PlusIcon from "./ui/icons/PlusIcon";
import { useSession, signIn, signOut } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="sticky top-0 bg-white z-10">
      <header className="w-full max-w-screen-xl p-4  overflow-auto mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold ms-4">
            <Link href={"/"}>With</Link>
          </div>
          <div className="me-4 flex items-center">
            <SearchIcon />
            <PlusIcon />
            {session ? (
              <button className="ms-2 me-2" onClick={() => signOut()}>
                <p className="font-bold">Sign out</p>
              </button>
            ) : (
              <button className="ms-2 me-2" onClick={() => signIn()}>
                <p className="font-bold">Sign in</p>
              </button>
            )}
            {user ? (
              <Link href={"/"}>
                <Image
                  src={user.image}
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-xl"
                />
              </Link>
            ) : (
              <div className="w-[50px] h-[50px]"></div>
            )}
          </div>
        </div>
        <hr className="mt-4" />
      </header>
    </div>
  );
};

export default Navbar;
