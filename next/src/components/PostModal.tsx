import React from "react";
import CloseIcon from "./ui/icons/CloseIncon";
type Props = {
  children: React.ReactNode;
  onClose: () => void;
};
const PostModal = ({ onClose, children }: Props) => {
  return (
    <div
      className="fixed inset-0 hidden bg-gray-500 bg-opacity-90 transition-opacity md:block z-50 h-full"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        onClick={() => onClose()}
        className="mx-auto w-[70vw] flex justify-end relative top-32 right-14"
      >
        <CloseIcon />
      </button>
      {children}
    </div>
  );
};

export default PostModal;
