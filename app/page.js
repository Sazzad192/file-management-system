"use client"
import { useState } from 'react';
import Head from 'next/head';
import { Container, Box, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import UploadForm from '../components/UploadForm';
import FileList from '@/components/fileList/FileList';

export default function Home() {
  const [update, setUpdate] = useState(false);

  const handleFileUpload = () => {
    setUpdate(!update);
  };

  return (
    <>
      <CssBaseline />
      <Head>
        <title>File Management System</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            File Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <UploadForm onFileUpload={handleFileUpload} />
        <Box sx={{ marginTop: 4 }}>
          <FileList key={update} />
        </Box>
      </Container>
    </>
  );
}