import { useState } from "react";
import { Button, IconButton, Typography, Grid, Paper, Box } from "@mui/material";
import { UploadFile, Delete } from "@mui/icons-material";
import { saveFileToLocalStorage } from "../utils/localStorage";
import toast from "react-hot-toast";

export default function UploadForm({ onFileUpload }) {
  const [file, setFile] = useState(null);
  const [inputKey, setInputKey] = useState(Date.now());

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileData = {
        name: file.name,
        content: reader.result,
        type: file.type,
      };
      saveFileToLocalStorage(fileData);
      onFileUpload();
      setFile(null); // Clear the file input after upload
      setInputKey(Date.now()); // Reset the input field
      toast.success("File uploaded successfully!");
    };
    reader.onerror = () => {
      toast.error("Failed to upload file.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setInputKey(Date.now()); // Reset the input field
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Upload a File
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <input
            key={inputKey} // Use the key prop to reset the input field
            style={{ display: "none" }}
            id="file-input"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input">
            <Button
              variant="outlined"
              component="span"
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                backgroundColor: "#f0f0f0",
                borderRadius: 1,
                textAlign: "center",
              }}
            >
              <UploadFile sx={{ fontSize: 40, mb: 1 }} />
              {file ? file.name : "Please upload your file."}
            </Button>
          </label>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpload}
              disabled={!file}
              sx={{ marginRight: 1 }}
            >
              Upload
            </Button>
            {file && (
              <IconButton color="secondary" onClick={handleRemoveFile}>
                <Delete />
              </IconButton>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}