import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { useOutletContext } from 'react-router-dom';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



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

{/*           
          <article id="art3">
              <img src="/LegoPlaceholder1.png" alt="Lego Blocks" width="35%"/>
          </article> */}

          <article id="art2">
              <section className="artSection">
                  <AccessTimeIcon fontSize='large'/>
                  <a className="links" href="https://www.firstinspires.org/team-event-search#type=teams&sort=name&programs=FLLJR,FLL,FTC,FRC&year=2023">Upcoming Events</a>
                  <p>Click here to learn more about future FLL events in your area</p>
              </section>

              <section className="artSection">
                  <FormatListNumberedIcon fontSize='large' />
                  <a className="links" href="https://www.firstinspires.org/ways-to-help/volunteer/how-to-register">Requirements</a>
                  <p>Click here to learn more about the requirements to become a Fll Volunteer</p>
              </section>

              <section className="artSection">
                  <NoteAltIcon fontSize='large' />
                  <a className="links" href="https://www.firstinspires.org/resource-library/volunteer/general-volunteer-resources">Expectations</a>
                  <p>Click here to learn more about the expectations of a FLL Volunteer</p>
              </section>

              <section className="artSection">
                  <GridViewRoundedIcon fontSize='large' />
                  <a className="links" href="https://www.firstinspires.org/">First Lego League</a>
                  <p>Click here to learn more about First Lego League</p>
              </section>
          </article>
        </section>
          <Footer 
            sx={{
              pt: {
                xs: '0',
                sm: '0',
                md: '17vh',
                lg: '17vh'
              },
            }}
          />
        </Container>
      </ThemeProvider>
  );
}
