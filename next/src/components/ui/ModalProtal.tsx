import React from "react";
import reactDOM from "react-dom";
type Props = {
  children: React.ReactNode;
};
const ModalProtal = ({ children }: Props) => {
  if (typeof window === "undefined") {
    return null;
  }
  const el = document.getElementById("portal") as Element;
  return reactDOM.createPortal(children, el);
};

export default ModalProtal;
