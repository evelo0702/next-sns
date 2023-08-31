import { User } from "@/app/model/user";

import React from "react";
type Props = {
  image: string | undefined;
  size: "big" | "normal" | "small";
};
const Avatar = ({ image, size = "normal" }: Props) => {
  return (
    <>
      {size === "normal" && (
        <div className=" rounded-full flex justify-center items-center w-14 h-14 bg-gradient-to-tr  from-avatarGradientStart to-avatarGradientEnd">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={image}
            alt=""
            className="rounded-full p-[0.1rem] w-14 h-14"
            referrerPolicy="no-referrer" // x박스 이슈 사라짐
          />
        </div>
      )}
      {size === "small" && (
        <div className="me-2  rounded-full flex justify-center items-center w-11 h-11 bg-gradient-to-tr font-bold from-avatarGradientStart to-avatarGradientEnd">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={image}
            alt=""
            className="rounded-full p-[0.1rem] w-11 h-11"
            referrerPolicy="no-referrer" // x박스 이슈 사라짐
          />
        </div>
      )}
      {size === "big" && (
        <div
          className="me-2  rounded-full flex justify-center 
          items-center   w-24 h-24 
          bg-gradient-to-tr font-bold from-avatarGradientStart to-avatarGradientEnd"
        >
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={image}
            alt=""
            className="rounded-full p-[0.1rem] w-24 h-24"
            referrerPolicy="no-referrer" // x박스 이슈 사라짐
          />
        </div>
      )}
    </>
  );
};

export default Avatar;
