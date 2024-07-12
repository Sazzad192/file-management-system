import { useEffect, useState } from "react";
import {
  List,
  Box,
  Paper,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import FileListItem from "./FileListItem";
import FileListHeader from "./FileListHeader";
import FileListEmpty from "./FileListEmpty";
import FileListDialog from "./FileListDialog";
import {
  getFilesFromLocalStorage,
  deleteFileFromLocalStorage,
  renameFileInLocalStorage,
} from "@/utils/localStorage";
import toast from "react-hot-toast";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [newFileName, setNewFileName] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const allFiles = getFilesFromLocalStorage();
    setFiles(allFiles);
    setFilteredFiles(allFiles);
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredFiles(files);
    } else {
      const filtered = files.filter((file) =>
        file.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFiles(filtered);
    }
  };

  const handleDelete = (filename) => {
    deleteFileFromLocalStorage(filename);
    const updatedFiles = getFilesFromLocalStorage();
    setFiles(updatedFiles);
    setFilteredFiles(updatedFiles);
    setSelectedFiles((prevSelected) =>
      prevSelected.filter((name) => name !== filename)
    );
    toast.success("File deleted successfully!");
  };

  const handleDeleteSelected = () => {
    selectedFiles.forEach((filename) => deleteFileFromLocalStorage(filename));
    const updatedFiles = getFilesFromLocalStorage();
    setFiles(updatedFiles);
    setFilteredFiles(updatedFiles);
    setSelectedFiles([]);
    setSelectAll(false);
    toast.success("Selected files deleted successfully!");
  };

  const handleRename = () => {
    if (newFileName.trim() === "") {
      toast.error("New file name cannot be empty.");
      return;
    }

    renameFileInLocalStorage(editingFile, newFileName);
    const updatedFiles = getFilesFromLocalStorage();
    setFiles(updatedFiles);
    setFilteredFiles(updatedFiles);
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

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);

    if (checked) {
      const allFileNames = filteredFiles.map((file) => file.name);
      setSelectedFiles(allFileNames);
    } else {
      setSelectedFiles([]);
    }
  };

  const handleFileSelect = (event, filename) => {
    const checked = event.target.checked;

    if (checked) {
      setSelectedFiles((prevSelected) => [...prevSelected, filename]);
    } else {
      setSelectedFiles((prevSelected) =>
        prevSelected.filter((name) => name !== filename)
      );
      setSelectAll(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <FileListHeader searchTerm={searchTerm} onSearchChange={handleSearch} />

      {filteredFiles.length === 0 ? (
        <FileListEmpty />
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                  color="primary"
                />
              }
              label="Select All"
            />
            {selectedFiles.length > 0 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteSelected}
              >
                Delete Selected
              </Button>
            )}
          </Box>

          <List>
            {filteredFiles.map((file) => (
              <FileListItem
                key={file.name}
                file={file}
                editingFile={editingFile}
                setEditingFile={setEditingFile}
                newFileName={newFileName}
                setNewFileName={setNewFileName}
                onFileSelect={handleFileSelect}
                onFileRename={handleRename}
                onDelete={handleDelete}
                onPreviewOpen={handlePreviewOpen}
                selectedFiles={selectedFiles}
              />
            ))}
          </List>
        </>
      )}

      <FileListDialog
        isOpen={isPreviewOpen}
        onClose={handlePreviewClose}
        file={previewFile}
      />
    </Paper>
  );
};

export default FileList;