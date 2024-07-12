import { Box, Typography } from "@mui/material";

const FileListEmpty = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "200px",
      }}
    >
      <img src="/illustration-empty.svg" alt="No files" width="150" height="150" />
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        No files uploaded yet.
      </Typography>
    </Box>
  );
};

export default FileListEmpty;
