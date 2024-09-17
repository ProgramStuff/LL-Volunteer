import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DrawerAppBar from '../components/DrawerAppBar';
import Footer from '../components/Footer';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';




const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Admin() {

    const context = useOutletContext()

    // Manage state 
    const navigate = useNavigate();
    const [role, setRole] = useState("");

  
    async function handleSubmit(event) {
      event.preventDefault();
  
    }
  
//   TODO: Hit endpoint to search for role info
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography sx={{fontSize: '2.5rem'}} component="h1" variant="h5">
            Welcome {context.user.username}
            </Typography>
            <Card variant='outlined' sx={{ minWidth: 275}}>
            <CardContent>
            <Typography sx={{ml: 7, fontSize: '1.5rem'}} component="h2" variant="h5">
            Search Volunteers by Role
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: 400, mt: 1 }}>
              {/* Selection for volunteer type */}
              <FormControl sx={{ m: 1, minWidth: 120,  ml: '13vh'}}>
                <FormHelperText sx={{fontSize: '1rem'}} >Role</FormHelperText>
                <Select
                    labelId="role1"
                    sx={{minWidth: '10rem'}}
                    id="demo-simple-select"
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                >
                    <MenuItem value={1}>Referee</MenuItem>
                    <MenuItem value={2}>Judge</MenuItem>
                    <MenuItem value={3}>Pit Runner</MenuItem>
                    <MenuItem value={4}>Score Keeper</MenuItem>
                    <MenuItem value={5}>Floater</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ml: '14vh', mt: 3, mb: 2, maxWidth: '15vh'}}
              >
                Search
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </Box>
            </CardContent>
            </Card>
          </Box>
          <Footer />
        </Container>
      </ThemeProvider>
    );
}
