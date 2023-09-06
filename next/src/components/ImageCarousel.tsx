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
  size: "detail" | "home" | "postDetail";
  openModal?: boolean;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
};
const ImageCarousel = ({
  items,
  size,
  openModal = false,
  setOpenModal,
}: Props) => {
  return (
    <div>
      {size === "home" && (
        <Carousel
          containerClass="max-h-[40vh] flex z-30"
          itemClass=""
          responsive={responsive}
        >
          {setOpenModal != undefined &&
            items.map((item, index) => (
              <button
                onClick={() => setOpenModal(!openModal)}
                key={index}
                className="mobile:w-[80vw] tablet:w-[55vw] 
                desktop:w-[40vw] xl:w-[30vw] relative mobile:h-[20vh] tablet:h-[40vh]"
              >
                <Image
                  className=" object-cover aspect-square"
                  src={item}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </button>
            ))}
        </Carousel>
      )}
      {size == "detail" && (
        <Carousel
          containerClass="w-[35vw] h-[60vh] flex z-30"
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
      {size == "postDetail" && (
        <Carousel
          containerClass="w-[35vw] h-[60vh] flex overflow-auto z-30"
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
