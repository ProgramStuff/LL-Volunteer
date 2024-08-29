import { Outlet, Link } from "react-router-dom";
import DrawerAppBar from "../components/DrawerAppBar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from "../components/Footer";
import { Container } from '@mui/material';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Layout = () => {
  return (
    <ThemeProvider theme={darkTheme}>
    <Container>
      <CssBaseline />
      <DrawerAppBar />
      <h1>Message Board</h1>
        <Footer />
    </Container>
    </ThemeProvider>
  )
};

export default Layout;