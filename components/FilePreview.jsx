import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import Image from "next/image";

export default function FilePreview({ file }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Preview
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: "white",
            margin: "auto",
            marginTop: 10,
          }}
        >
          <Typography variant="h6">{file.name}</Typography>
          <Image
            src={file.content}
            alt={file.name}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
            height={300}
          />
        </Box>
      </Modal>
    </div>
  );
}