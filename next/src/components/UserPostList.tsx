"use client";
import React, { useState } from "react";
import Image from "next/image";
import ModalProtal from "./ui/ModalProtal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
const UserPostList = ({ item }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const images = [];
  images.push(item.image1);
  if (item.image2 != null) {
    images.push(item.image2);
  }
  if (item.image3 != null) {
    images.push(item.image3);
  }
  if (item.image4 != null) {
    images.push(item.image4);
  }
  return (
    <div key={item._id} className="cursor-pointer">
      <div className="m-4 w-full h-full">
        <Image
          src={item.image1}
          width={500}
          height={500}
          alt=""
          priority
          className="rounded-xl w-80 h-64"
          onClick={() => setOpenModal(!openModal)}
        />
      </div>
      {openModal && images && (
        <ModalProtal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail items={images} post={item} size="postDetail" />
          </PostModal>
        </ModalProtal>
      )}
    </div>
  );
};

export default UserPostList;
