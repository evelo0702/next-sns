import React from "react";
import Carousel from "react-multi-carousel";
import Image from "next/image";

const responsive = {
  desk: {
    breakpoint: { max: 4000, min: 576 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};
type Props = {
  items: string[];
  size: "detail" | "home";
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const ImageCarousel = ({ items, size, openModal, setOpenModal }: Props) => {
  return (
    <div>
      {size === "home" ? (
        <Carousel
          containerClass="w-full  h-[500px] flex z-30"
          itemClass=""
          responsive={responsive}
        >
          {items.map((item, index) => (
            <button onClick={() => setOpenModal(!openModal)} key={index}>
              <Image
                className="object-cover aspect-square w-[500px] h-[500px]"
                src={item}
                alt=""
                width={500}
                height={500}
              />
            </button>
          ))}
        </Carousel>
      ) : (
        <Carousel
          containerClass="w-[35vw] h-[60vh] flex"
          itemClass=""
          responsive={responsive}
        >
          {items.map((item, index) => (
            <div key={index}>
              <Image
                className="object-cover aspect-square w-[35vw] h-[60vh]"
                src={item}
                alt=""
                width={500}
                height={500}
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ImageCarousel;
