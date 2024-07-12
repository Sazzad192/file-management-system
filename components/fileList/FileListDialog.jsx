import { Dialog, DialogTitle, DialogContent, Typography, Box } from "@mui/material";

const FileListDialog = ({ isOpen, onClose, file }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>File Preview</DialogTitle>
      <DialogContent>
        {file && (
          <>
            <Typography variant="subtitle1">Name: {file.name}</Typography>
            <Typography variant="subtitle2">Type: {file.type}</Typography>
            <Box sx={{ marginTop: 2 }}>
              {file.type.startsWith("image/") ? (
                <img src={file.content} alt={file.name} style={{ maxWidth: "100%" }} />
              ) : (
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                  {file.content}
                </Typography>
              )}
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FileListDialog;