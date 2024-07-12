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
  editingFile,
  setEditingFile,
  newFileName,
  setNewFileName,
  onFileSelect,
  onFileRename,
  onDelete,
  onPreviewOpen,
  selectedFiles,
}) => {
  const isSelected = selectedFiles.includes(file.name);
  const isEditing = editingFile === file.name;

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
            onChange={(e) => setNewFileName(e.target.value)}
            label="New File Name"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={onFileRename}
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
            onClick={() => onPreviewOpen(file)}
            sx={{ cursor: "pointer" }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton color="primary" onClick={() => setEditingFile(file.name)}>
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