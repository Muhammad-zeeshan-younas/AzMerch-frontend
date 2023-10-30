import { Box, Modal } from "@mui/material";
import React from "react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: JSX.Element;
};

function CustomModal({ isOpen = false, closeModal, children }: Props) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5px",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 4,
    px: 4,
    pb: 3,
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, minWidth: 500 }}>{children}</Box>
    </Modal>
  );
}

export default CustomModal;
