import { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Checkbox,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { Description, Edit, Delete } from "@mui/icons-material";

const FileListItem = ({
  file,
  isSelected,
  isEditing,
  onFileSelect,
  onEditStart,
  onEditCancel,
  onEditSave,
  onDelete,
  onPreviewOpen,
}) => {
  const [newFileName, setNewFileName] = useState(file.name);

  const handleInputChange = (event) => {
    setNewFileName(event.target.value);
  };

  const handleSaveClick = () => {
    onEditSave(file.name, newFileName);
  };

  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Checkbox
        checked={isSelected}
        onChange={(e) => onFileSelect(e, file.name)}
      />

      {isEditing ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            value={newFileName}
            onChange={handleInputChange}
            autoFocus
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClick}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onEditCancel}
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
            onClick={() => onPreviewOpen(file)}
            sx={{ cursor: "pointer" }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton color="primary" onClick={() => onEditStart(file.name)}>
              <Edit />
            </IconButton>
            <IconButton color="secondary" onClick={() => onDelete(file.name)}>
              <Delete />
            </IconButton>
          </Box>
        </>
      )}
    </ListItem>
  );
};

export default FileListItem;