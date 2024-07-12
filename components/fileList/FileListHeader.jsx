import { Typography, TextField } from "@mui/material";

const FileListHeader = ({ searchTerm, onSearchChange }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        File List
      </Typography>
      <TextField
        label="Search Files"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={onSearchChange}
        sx={{ marginBottom: 2 }}
      />
    </>
  );
};

export default FileListHeader;
