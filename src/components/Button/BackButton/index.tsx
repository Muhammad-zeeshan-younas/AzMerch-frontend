import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

function BackButton({}: Props) {
  const navigate = useNavigate();
  return (
    <>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBack sx={{ color: "black" }} />
      </IconButton>
      <Button
        onClick={() => navigate(-1)}
        sx={{
          color: "black",
          fontSize: "1rem",
          fontWeight: "bold",
          width: "max-content",
          height: "max-content",
        }}
      >
        Back
      </Button>
    </>
  );
}

export default BackButton;
