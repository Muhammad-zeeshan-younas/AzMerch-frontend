"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";

const dummyData = [
  {
    src: "/images/design1.jpg",
  },
  {
    src: "/images/design.jpg",
  },
  {
    src: "/images/image.jpg",
  },
];
type Props = {
  images: string[];
};

function SingleSlide({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideToNextImage = () => {
    activeIndex < dummyData.length - 1
      ? setActiveIndex((prevIndex) => prevIndex + 1)
      : setActiveIndex(0);
  };

  const slideToPreviousImage = () => {
    activeIndex > 0
      ? setActiveIndex((prevIndex) => prevIndex - 1)
      : setActiveIndex(dummyData.length - 1);
  };

  const setActiveSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div className="flex mx-auto overflow-hidden relative h-64 sm:h-64 lg:h-96">
        <img
          src={`/${images[activeIndex]}`}
          className="w-full object-fill"
          alt="slide show image"
        />

        <div className="z-10 absolute w-full flex justify-between h-full items-center px-1">
          <IconButton
            type="button"
            onClick={slideToPreviousImage}
            sx={{ color: "white" }}
          >
            <ChevronLeftIcon
              className="w-10 h-10 bg-gray-100/20 rounded-full p-2"
              aria-hidden="false"
            />
          </IconButton>
          <IconButton
            type="button"
            onClick={slideToNextImage}
            sx={{ color: "white" }}
          >
            <ChevronRightIcon
              className="w-10 h-10 bg-gray-100/20 rounded-full p-2"
              aria-hidden="false"
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default SingleSlide;
