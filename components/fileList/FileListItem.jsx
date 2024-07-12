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
import { Description, Edit, Delete, Save, Cancel } from "@mui/icons-material";

const FileListItem = ({
  file,
  editingFile,
  onFileSelect,
  onEditClick,
  onFileRename,
  onDelete,
  onPreviewOpen,
  newFileName,
  setNewFileName,
}) => {
  const isSelected = editingFile === file.name;

  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Checkbox
        checked={false}
        onChange={(e) => onFileSelect(e, file.name)}
      />

      {isSelected ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            label="New File Name"
          />
          <IconButton color="primary" onClick={onFileRename}>
            <Save />
          </IconButton>
          <IconButton color="secondary" onClick={() => onEditClick(null)}>
            <Cancel />
          </IconButton>
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
            <IconButton color="primary" onClick={() => onEditClick(file.name)}>
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