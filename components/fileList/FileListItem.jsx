import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Checkbox,
  Box,
} from "@mui/material";
import { Description, Edit, Delete } from "@mui/icons-material";

const FileListItem = ({
  file,
  editingFile,
  onFileSelect,
  onFileRename,
  onDelete,
  onPreviewOpen,
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
      <Checkbox checked={false} onChange={(e) => onFileSelect(e, file.name)} />

      {isSelected ? (
        // Input field for renaming file
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Render your renaming input field */}
        </Box>
      ) : (
        // Displaying file name, preview button, edit button, and delete button
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
            <IconButton color="primary" onClick={() => onFileRename(file)}>
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
