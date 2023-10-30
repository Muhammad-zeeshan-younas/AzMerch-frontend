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

function SingleSlide() {
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
      <div className="flex mx-auto overflow-hidden relative h-52 sm:h-64 lg:h-96 rounded-xl">
        <img
          src={dummyData[activeIndex].src}
          className="w-full object-cover"
          alt="slide show image"
        />

        <div className="z-10 absolute w-full flex justify-between h-full items-center px-5">
          <IconButton
            type="button"
            onClick={slideToPreviousImage}
            sx={{ color: "black" }}
          >
            <ChevronLeftIcon
              className="w-10 h-10 bg-gray-100/20 rounded-full p-2"
              aria-hidden="false"
            />
          </IconButton>
          <IconButton
            type="button"
            onClick={slideToNextImage}
            sx={{ color: "black" }}
          >
            <ChevronRightIcon
              className="w-10 h-10 bg-gray-100/20 rounded-full p-2"
              aria-hidden="false"
            />
          </IconButton>
        </div>
      </div>
      <div className="flex gap-3 max-w-7xl justify-center py-2 mx-auto">
        {dummyData.map((_, index) => (
          <span
            className="h-3 w-3 bg-black/50 rounded-full cursor-pointer"
            key={index}
            aria-selected={activeIndex == index ? "true" : "false"}
            onClick={() => {
              setActiveSlide(index);
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default SingleSlide;
