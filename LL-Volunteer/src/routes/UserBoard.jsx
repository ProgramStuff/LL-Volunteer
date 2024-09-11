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


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function UserBoard() {

  const context = useOutletContext()
  const [notes, setNotes] = useState([]);

  return (
    <ThemeProvider theme={darkTheme}>
    <Container>
      <CssBaseline />

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