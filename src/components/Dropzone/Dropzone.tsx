import React, { useCallback, useState } from "react";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Cancel, CancelOutlined } from "@mui/icons-material";

type DropzoneProps = {
  files: FileList | null;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
};

const CustomDropzone: React.FC<DropzoneProps> = ({ files, setFiles }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  }, []);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList | null) => {
    if (files) {
      setFiles(files);

      const firstImage = files[0];

      if (firstImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          setImageSrc(src);
        };
        reader.readAsDataURL(firstImage);
      }
    }
  };

  const removeFiles = () => {
    setImageSrc(null);
    setFiles(null);
  };

  return (
    <div
      className={`border border-dashed border-[#959595] ${
        imageSrc ? "p-1" : "p-4"
      } bg-[#f0f0f0] flex items-center justify-center flex-col gap-2 realtive`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ position: "relative" }}
    >
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt="Dropped Image"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />

          <Cancel
            sx={{ color: "red" }}
            className="absolute -top-3 -right-4 rounded-full hover:scale-105 active:scale-95 cursor-pointer"
            onClick={removeFiles}
          />
        </>
      ) : (
        <>
          <CollectionsIcon className="text-[#959595]" />
          <p className="text-gray-500 text-center">Drag and drop images here</p>
          <input
            type="file"
            onChange={handleFileInput}
            required
            className="absolute top-0 bottom-0 left-0 right-0 opacity-0"
          />
        </>
      )}
    </div>
  );
};

export default CustomDropzone;
