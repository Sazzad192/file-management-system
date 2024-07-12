export const saveFileToLocalStorage = (file) => {
  const files = JSON.parse(localStorage.getItem('files')) || [];
  files.push(file);
  localStorage.setItem('files', JSON.stringify(files));
};

export const getFilesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('files')) || [];
};

export const deleteFileFromLocalStorage = (filename) => {
  const files = JSON.parse(localStorage.getItem('files')) || [];
  const updatedFiles = files.filter(file => file.name !== filename);
  localStorage.setItem('files', JSON.stringify(updatedFiles));
};

export const renameFileInLocalStorage = (oldName, newName) => {
  const files = JSON.parse(localStorage.getItem('files')) || [];
  const updatedFiles = files.map(file => {
    if (file.name === oldName) {
      return { ...file, name: newName };
    }
    return file;
  });
  localStorage.setItem('files', JSON.stringify(updatedFiles));
}; 