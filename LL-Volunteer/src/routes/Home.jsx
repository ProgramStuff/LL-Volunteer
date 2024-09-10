import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerAppBar from '../components/DrawerAppBar';
import { Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { useOutletContext } from 'react-router-dom'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// TODO: Add GitHub and Linkedin to footer
// TODO: Style imported code and add images
// TODO: Use MUI icons on home page
// TODO: Create separate jsx file for volunteer information page
// TODO: Create PostgreSQL database for volunteer info
// TODO: Create admin page for creating and updating posts - View current volunteers


export default function Home() {
  const context = useOutletContext()

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
      <CssBaseline />
        <section id="mainSection">
          <article id="art1">
              <h1 id="titleH1">First Lego League Volunteer Information</h1>
              <p id="art1p">Welcome to the Volunteer Information site for your local First Lego League Events!</p>
          </article>

          
          <article id="art3">
              <img src="/LegoPlaceholder1.png" alt="Lego Blocks" width="25%"/>
          </article>

          <article id="art2">
              <section className="artSection">
                  <AccessTimeIcon fontSize='large'/>
                  <a className="links" href="https://www.firstinspires.org/team-event-search#type=teams&sort=name&programs=FLLJR,FLL,FTC,FRC&year=2023">Upcoming Events</a>
                  <p>Click here to learn more about future FFL events in your area</p>
              </section>

              <section className="artSection">
                  <FormatListNumberedIcon fontSize='large' />
                  <a className="links" href="https://www.firstinspires.org/ways-to-help/volunteer/how-to-register">Requirements</a>
                  <p>Click here to learn more about the requirements to become a FFL Volunteer</p>
              </section>

              <section className="artSection">
                  <NoteAltIcon fontSize='large' />
                  <a className="links" href="https://www.firstinspires.org/resource-library/volunteer/general-volunteer-resources">Expectations</a>
                  <p>Click here to learn more about the expectations of a FFL Volunteer</p>
              </section>

              <section className="artSection">
                  <GridViewRoundedIcon fontSize='large' />
                  <a className="links" href="https://www.firstinspires.org/">First Lego Lego</a>
                  <p>Click here to learn more about First Lego League</p>
              </section>
          </article>
        </section>
          <Footer/>
        </Container>
      </ThemeProvider>
  );
}
