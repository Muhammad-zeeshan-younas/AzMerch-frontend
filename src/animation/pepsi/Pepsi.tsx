import React, { useState, useEffect } from "react";

const PepsiAnimation = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const totalFrames = 196;
  const frameInterval = 35;
  const framesPath = "/images/pepsi/";
  const frameExtension = ".png";
  const frameNumberFormat = (num: number) => num.toString().padStart(5, "0"); // Format frame number

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame % totalFrames) + 1);
    }, frameInterval);

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const frameUrl = `${framesPath}Pepsi%20logo%20animation_${frameNumberFormat(
    currentFrame
  )}${frameExtension}`;

  return (
    <div>
      <img src={frameUrl} alt={`Frame ${currentFrame}`} />
    </div>
  );
};

export default PepsiAnimation;
