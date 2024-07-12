import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Box,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItemIcon,
} from "@mui/material";
import { Description, Edit, Delete } from "@mui/icons-material";
import {
  getFilesFromLocalStorage,
  deleteFileFromLocalStorage,
  renameFileInLocalStorage,
} from "../utils/localStorage";
import toast from "react-hot-toast";

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [newFileName, setNewFileName] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    setFiles(getFilesFromLocalStorage());
  }, []);

  const handleDelete = (filename) => {
    deleteFileFromLocalStorage(filename);
    setFiles(getFilesFromLocalStorage());
    toast.success("File deleted successfully!");
  };

  const handleRename = () => {
    if (newFileName.trim() === "") {
      toast.error("New file name cannot be empty.");
      return;
    }

    renameFileInLocalStorage(editingFile, newFileName);
    setFiles(getFilesFromLocalStorage());
    setEditingFile(null);
    setNewFileName("");
    toast.success("File renamed successfully!");
  };

  const handlePreviewOpen = (file) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
    setPreviewFile(null);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        File List
      </Typography>
      {files.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
          }}
        >
          <img
            src="/illustration-empty.svg"
            alt="No files"
            width="150"
            height="150"
          />
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            No files uploaded yet.
          </Typography>
        </Box>
      ) : (
        <List>
          {files.map((file) => (
            <ListItem
              key={file.name}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {editingFile === file.name ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <TextField
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    label="New File Name"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRename}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setEditingFile(null)}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <>
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    onClick={() => handlePreviewOpen(file)}
                    sx={{ cursor: "pointer" }}
                  />
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <IconButton
                      color="primary"
                      onClick={() => setEditingFile(file.name)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(file.name)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </>
              )}
            </ListItem>
          ))}
        </List>
      )}
      <Dialog
        open={isPreviewOpen}
        onClose={handlePreviewClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>File Preview</DialogTitle>
        <DialogContent>
          {previewFile && (
            <>
              <Typography variant="subtitle1">
                Name: {previewFile.name}
              </Typography>
              <Typography variant="subtitle2">
                Type: {previewFile.type}
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                {previewFile.type.startsWith("image/") ? (
                  <img
                    src={previewFile.content}
                    alt={previewFile.name}
                    style={{ maxWidth: "100%" }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {previewFile.content}
                  </Typography>
                )}
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
}