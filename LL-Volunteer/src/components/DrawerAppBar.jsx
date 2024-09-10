import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

// TODO: Conditionally render logout when logged in
// TODO: Make get request to an endpoint to retrieve login status

const drawerWidth = 240;
const navItems = ['Home', 'Board', 'Register', 'Login'];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = useState(null)

  const loginUser = (id, username, role) => {
      setUser({id:id, username:username, role:role})
  }

  const logoutUser = () => {
      setUser(null)
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        FLL Volunteer
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            FLL Volunteer
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                <Link to={"/" + item} style={{ color: 'inherit', textDecoration: 'none' }}>{item}</Link>
              </Button>

            ))}

            {user && <Button sx={{ color: '#fff' }}>
              <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>Profile</Link>
            </Button>}
            {user &&
                <>
                    <Button sx={{ color: '#fff' }}>
                      <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Admin</Link>
                    </Button>
                    <Button sx={{ color: '#fff' }} onClick={logoutUser}>Logout</Button>

                </>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
    <Outlet context={{user, setUser, loginUser, logoutUser}}/>
    </ThemeProvider>
    </>
  );
}
