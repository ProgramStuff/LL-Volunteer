import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from "../components/Footer";
import { Container } from '@mui/material';
import Note from "../components/Note.jsx";
import Typography from '@mui/material/Typography';
import CreateArea from "../components/CreateArea.jsx";
import "../assets/styles/board.css"
import { useOutletContext } from "react-router-dom";
import axios from 'axios';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Board() {
  const context = useOutletContext()

  const [notes, setNotes] = useState([]);

  async function loadNotes() {
    try {
      // Hit message insert end point
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/message/all`);
      if (response.status === 200) {
        const noteData = response.data.data;

        noteData.map((note) => {
          let id = note.messageId
          let title = note.title;
          let content = note.content
          let newNote = {title: title, content: content}
          setNotes(prevNotes => {
            return [...prevNotes, newNote];
          });
        });
   
        console.log("Load successful");
        return response.data.data;
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Load failed:", error);
    }
  }

  async function addNote(newNote) {
    try {
      // Hit message insert end point
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/message/add`, newNote);
      if (response.status === 200) {
        setNotes(prevNotes => {
          return [...prevNotes, newNote];
        });
        console.log("Insert successful");
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  async function deleteNote(id, title) {
    try {
      // Hit message insert end point
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/message/delete`, {title: title});
      if (response.status === 200) {
        setNotes(prevNotes => {
          return prevNotes.filter((noteItem, index) => {
            return index !== id;
          });
        });
        console.log("Delete successful");
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }
  useEffect(() => {
    loadNotes();
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
    <Container>
      <>
      <CssBaseline />
      <Typography sx={{
              fontSize: { xs: '2rem', sm: '2.25rem', md: '2.5rem' },
              textAlign: 'center',
              mb: { xs: 2, sm: 3, md: 4 }
            }} component="h1" variant="h5" className="title">
              Share A Message
            </Typography>
      <CreateArea onAdd={addNote} />

      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      </>
        <Footer sx={{pt: '45vh'}}/>
    </Container>
    </ThemeProvider>
  )
};