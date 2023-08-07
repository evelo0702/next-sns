import { User } from "@/app/model/user";

import React from "react";
type Props = {
  image: string | undefined;
  size: "normal" | "small";
};
const Avatar = ({ image, size = "normal" }: Props) => {
  return (
    <>
      {size === "normal" ? (
        <div className=" rounded-full flex justify-center items-center w-14 h-14 bg-gradient-to-tr font-bold from-avatarGradientStart to-avatarGradientEnd">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={image}
            alt=""
            className="rounded-full p-[0.2rem] w-14 h-14"
            referrerPolicy="no-referrer" // x박스 이슈 사라짐
          />
        </div>
      ) : (
        <div className="me-2  rounded-full flex justify-center items-center w-12 h-12 bg-gradient-to-tr font-bold from-avatarGradientStart to-avatarGradientEnd">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={image}
            alt=""
            className="rounded-full p-[0.2rem] w-12 h-12"
            referrerPolicy="no-referrer" // x박스 이슈 사라짐
          />
        </div>
      )}
    </>
  );
};

export default Avatar;
