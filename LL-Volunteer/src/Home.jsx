import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerAppBar from './components/DrawerAppBar';
import { Container } from '@mui/material';
import Footer from './components/Footer';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// TODO: Add GitHub and Linkedin to footer
// TODO: Style imported code and add images
// TODO: Create separate file for volunteer information
// TODO: Create PostgreSQL database for volunteer info
// TODO: Create admin page for creating and updating posts - View current volunteers
// TODO: Implement react router


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

              <button>Login</button>
          </article>

          <article id="art2">
              <section class="artSection">
                  {/* <img src="/public/static/Images/Clock.png" alt="Clock" width="15%"/> */}
                  <a class="links" href="https://www.firstinspires.org/team-event-search#type=teams&sort=name&programs=FLLJR,FLL,FTC,FRC&year=2023">Upcoming Events</a>
                  <p>Click here to learn more about future FFL events in your area</p>
              </section>

              <section class="artSection">
                  {/* <img src="/public/static/Images/Clipboard.png" alt="Clipboard" width="15%"/> */}
                  <a class="links" href="https://www.firstinspires.org/ways-to-help/volunteer/how-to-register">Requirements</a>
                  <p>Click here to learn more about the requirements to become a FFL Volunteer</p>
              </section>

              <section class="artSection">
                  {/* <img src="/public/static/Images/Checkbox.png" alt="Checkbox" width="15%"/> */}
                  <a class="links" href="https://www.firstinspires.org/resource-library/volunteer/general-volunteer-resources">Expectations</a>
                  <p>Click here to learn more about the expectations of a FFL Volunteer</p>
              </section>

              <section class="artSection">
                  {/* <img src="/public/static/Images/Blocks.png" alt="Blocks" width="15%"/> */}
                  <a class="links" href="https://www.firstinspires.org/">First Lego Lego</a>
                  <p>Click here to learn more about First Lego League</p>
              </section>
          </article>

          <article id="art3">
              <img src="/public/static/Images/LegoPlaceholder1.png" alt="Lego Blocks" width=""/>
          </article>
              
          <article id="art4">
              <p>Timeless design or futuristic backlit keyboard? No matter what you prefer we got you covered. Nam ut justo placerat, eleifend sem at, finibus velit.<br/><br/>Nam ut justo placerat, eleifend sem at, finibus velit.Nam ut justo placerat, eleifend sem at, finibus velit. <br/><br/>Nam ut justo placerat, eleifend sem at, finibus velit.Nam ut justo placerat, eleifend sem at, finibus velit. Nam ut justo placerat, eleifend sem at, finibus velit. Nam ut justo placerat.</p>
          </article>
        </section>

        <Footer/>
        </Container>
      </ThemeProvider>
    </>
  );
}
