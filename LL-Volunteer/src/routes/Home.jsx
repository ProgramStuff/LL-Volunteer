import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerAppBar from '../components/DrawerAppBar';
import { Container } from '@mui/material';
import Footer from '../components/Footer';


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
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <Container>
      <CssBaseline />
      <DrawerAppBar />

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
                  <img src="/Clock.png" alt="Clock" width="15%"/>
                  <a className="links" href="https://www.firstinspires.org/team-event-search#type=teams&sort=name&programs=FLLJR,FLL,FTC,FRC&year=2023">Upcoming Events</a>
                  <p>Click here to learn more about future FFL events in your area</p>
              </section>

              <section className="artSection">
                  <img src="/Clipboard.png" alt="Clipboard" width="15%"/>
                  <a className="links" href="https://www.firstinspires.org/ways-to-help/volunteer/how-to-register">Requirements</a>
                  <p>Click here to learn more about the requirements to become a FFL Volunteer</p>
              </section>

              <section class="artSection">
                  <img src="/Checkbox.png" alt="Checkbox" width="15%"/>
                  <a class="links" href="https://www.firstinspires.org/resource-library/volunteer/general-volunteer-resources">Expectations</a>
                  <p>Click here to learn more about the expectations of a FFL Volunteer</p>
              </section>

              <section className="artSection">
                  <img src="/Blocks.png" alt="Blocks" width="15%"/>
                  <a className="links" href="https://www.firstinspires.org/">First Lego Lego</a>
                  <p>Click here to learn more about First Lego League</p>
              </section>
          </article>
              
          <article id="art4">
              <p>Timeless design or futuristic backlit keyboard? No matter what you prefer we got you covered. Nam ut justo placerat, eleifend sem at, finibus velit.<br/><br/>Nam ut justo placerat, eleifend sem at, finibus velit.Nam ut justo placerat, eleifend sem at, finibus velit. <br/><br/>Nam ut justo placerat, eleifend sem at, finibus velit.Nam ut justo placerat, eleifend sem at, finibus velit. Nam ut justo placerat, eleifend sem at, finibus velit. Nam ut justo placerat.</p>
          </article>
        </section>

        <footer>
          <section>
              <img src="/Socials.png" alt="Socials" width="100"/>
          </section>

          <p>Contact Us</p>
          <Footer/>
          </footer>
        </Container>
      </ThemeProvider>
    </>
  );
}
