import * as React from 'react';
import { useState } from 'react';
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

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = useState(null); // null means no user logged in

  const loginUser = (id, username, role) => {
      setUser({ id, username, role });
  };

  const logoutUser = () => {
      setUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        FLL Volunteer
      </Typography>
      <Divider />
      <List>
        {/* Render only Home, and conditionally Register Login if not logged in */}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <ListItemText primary="Home" />
            </Link>
          </ListItemButton>
        </ListItem>

        {/* Conditionally show Register and Login if no user is logged in */}
        {!user && (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link to="/Register" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <ListItemText primary="Register" />
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link to="/Login" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <ListItemText primary="Login" />
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        )}

        {/* Conditionally show Profile and Logout if user is logged in */}
        {user && (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <ListItemText primary="Profile" />
                </Link>
              </ListItemButton>
            </ListItem>

            {/* Conditionally show Admin or Board if user is an admin */}
            {user.role === "admin" && (
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <ListItemText primary="Admin" />
                  </Link>
                </ListItemButton>
              </ListItem>
            )}

            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Button sx={{ color: '#fff' }} onClick={logoutUser}>Logout</Button>
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
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
              {/* Render "Home" */}
              <Button sx={{ color: '#fff' }}>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              </Button>

              {/* Conditionally render "Profile" and "Admin" based on user state */}
              {user && user.role === "user" && <Button sx={{ color: '#fff' }}>
                <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>Profile</Link>
              </Button>}

              {user && user.role === "admin" && <Button sx={{ color: '#fff' }}>
                <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Admin</Link>
              </Button>}

              {user && user.role === "user" && <Button sx={{ color: '#fff' }}>
                <Link to="/userBoard" style={{ color: 'inherit', textDecoration: 'none' }}>Board</Link>
              </Button>}

              {user && user.role === "admin" && <Button sx={{ color: '#fff' }}>
                <Link to="/board" style={{ color: 'inherit', textDecoration: 'none' }}>Board</Link>
              </Button>}

              {/* Conditionally render "Register" and "Login" when no user is logged in */}
              {!user && <Button sx={{ color: '#fff' }}>
                <Link to="/Register" style={{ color: 'inherit', textDecoration: 'none' }}>Register</Link>
              </Button>}

              {!user && <Button sx={{ color: '#fff' }}>
                <Link to="/Login" style={{ color: 'inherit', textDecoration: 'none' }}>Login</Link>
              </Button>}

              {/* Show "Logout" if user is logged in */}
              {user && <Button sx={{ color: '#fff' }} onClick={logoutUser}>Logout</Button>}
            </Box>
          </Toolbar>
        </AppBar>
        <>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
          >
            {drawer}
          </Drawer>
        </>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
      <Outlet context={{ user, setUser, loginUser, logoutUser }} />
    </ThemeProvider>
  );
}
