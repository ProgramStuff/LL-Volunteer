import React, { useEffect, useState } from "react";
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
import Typography from '@mui/material/Typography';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function UserBoard() {

  const context = useOutletContext()
  const [notes, setNotes] = useState([]);

  async function loadNotes() {
    try {
      // Hit message insert end point
      const response = await axios.post("http://localhost:3000/message/all");
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

  useEffect(() =>{
    loadNotes();
  },[])

  return (
    <ThemeProvider theme={darkTheme}>
    <Container>
      <CssBaseline />
      <Typography sx={{textAlign: 'center',fontSize: '4vh'}} component="h1" variant="h5">
        Message Board
      </Typography>

      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
          />
        );
      })}
    </Container>
    <Footer sx={{pt: '45vh'}} />
    </ThemeProvider>
  )
};