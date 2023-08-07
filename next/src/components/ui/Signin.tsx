"use client";
import React from "react";
import { ClientSafeProvider } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};
const Signin = ({ providers, callbackUrl }: Props) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="flex justify-center w-full">
          <button
            onClick={() => signIn(provider.id, { callbackUrl })}
            className="border m-4  flex w-1/5  justify-center items-center p-4 rounded-xl hover:bg-skyblue"
          >
            <p className=" font-bold me-2">Sign in {provider.name}</p>
            <Image
              src={`/${provider.name}.png`}
              alt=""
              width={40}
              height={40}
            ></Image>
          </button>{" "}
        </div>
      ))}
    </>
  );
};

export default Signin;
