"use client";
import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
// icons
import NewFillIcon from "./ui/icons/NewFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import Avatar from "./Avatar";
const Navbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const navMenu = [
    {
      name: "Search",
      href: "/search",
      icon: <SearchIcon />,
      clicked: <SearchFillIcon />,
    },
    {
      name: "New",
      href: "/new",
      icon: <NewIcon />,
      clicked: <NewFillIcon />,
    },
  ];
  return (
    <div className="">
      <header className="w-full max-w-screen-xl p-4  overflow-auto mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-2xl ms-4 ">
            <Link href={"/"}>
              <p className="bg-gradient-to-tr font-bold from-gradientStart to-gradientEnd bg-clip-text text-transparent">
                BLISS
              </p>
            </Link>
          </div>
          <div className="me-4 flex items-center">
            {session ? (
              <button className="ms-2 me-2" onClick={() => signOut()}>
                <p className="font-bold  rounded-xl p-2">LOGOUT</p>
              </button>
            ) : (
              <button className="ms-2 me-2" onClick={() => signIn()}>
                <p className="font-bold  rounded-xl p-2">LOGIN</p>
              </button>
            )}
            {navMenu.map((item) => (
              <div key={item.href} className="me-4">
                <Link href={item.href}>
                  <div className="flex">
                    <p className="me-2">
                      {pathName === item.href ? item.clicked : item.icon}
                    </p>
                    <p className="font-bold">{item.name}</p>
                  </div>
                </Link>
              </div>
            ))}
            {user ? (
              <Link href={`/user/${user.id}`} className="">
                <Avatar image={user.image} size="normal" />
              </Link>
            ) : (
              <div className="w-[50px] h-[50px]"></div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
