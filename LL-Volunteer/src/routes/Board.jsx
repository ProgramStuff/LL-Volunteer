import React, { useState } from "react";
import DrawerAppBar from "../components/DrawerAppBar";
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

  async function addNote(newNote) {
    try {
      // Hit message insert end point
      const response = await axios.post("http://localhost:3000/message/add", newNote);
      if (response.status === 200) {
        setNotes(prevNotes => {
          return [...prevNotes, newNote];
        });
        console.log("Insert successful:", response.data);
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
      console.log(title);
      const response = await axios.post("http://localhost:3000/message/delete", {title: title});
      if (response.status === 200) {
        setNotes(prevNotes => {
          return prevNotes.filter((noteItem, index) => {
            return index !== id;
          });
        });
        console.log("Delete successful:", response.data);
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
    <Container>
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
        <Footer />
    </Container>
    </ThemeProvider>
  )
};