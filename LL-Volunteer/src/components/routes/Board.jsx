import { Outlet, Link } from "react-router-dom";
import DrawerAppBar from "../DrawerAppBar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from "../Footer";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Layout = () => {
  return (
    <ThemeProvider theme={darkTheme}>
    <div>
      <CssBaseline />
      <DrawerAppBar />
      <h1>Message Board</h1>
      <Footer />
    </div>
    </ThemeProvider>
  )
};

export default Layout;