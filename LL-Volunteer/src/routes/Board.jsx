import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from "../components/Footer";
import { Container } from '@mui/material';
import Note from "../components/Note.jsx";
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
      const baseURL = import.meta.env.VITE_VERCEL_ENV === "production"
        ? import.meta.env.VITE_PROD_URL
        : "http://localhost:3000";
  
      // Hit message insert end point
      const response = await axios.post(`${baseURL}/message/all`);
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
      const baseURL = import.meta.env.VITE_VERCEL_ENV === "production"
      ? import.meta.env.VITE_PROD_URL
      : "http://localhost:3000";

      // Hit message insert end point
      const response = await axios.post(`${baseURL}/message/add`, newNote);
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
      const baseURL = import.meta.env.VITE_VERCEL_ENV === "production"
      ? import.meta.env.VITE_PROD_URL
      : "http://localhost:3000";
      // Hit message insert end point
      const response = await axios.post(`${baseURL}/message/delete`, {title: title});
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