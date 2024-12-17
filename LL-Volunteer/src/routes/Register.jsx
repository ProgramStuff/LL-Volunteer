import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Footer from '../components/Footer';
import axios from 'axios';

const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export default function register() {
  const context = useOutletContext()

  
  // Manage state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const navigate = useNavigate();


  // Error state
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [fNameError, setFNameError] = React.useState(false);
  const [fNameErrorMessage, setFNameErrorMessage] = React.useState('');
  const [lNameError, setLNameError] = React.useState(false);
  const [lNameErrorMessage, setLNameErrorMessage] = React.useState('');
  

  function validateInput(){
    if (!email ||!/\S+@\S+\.\S+/.test(email)){
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email.");
    }else{
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if(!password || password.length < 8){
      setPasswordError(true);
      setPasswordErrorMessage("Password must be a minimum of 8 characters long");
    }else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!fName || fName.length < 1){
      setFNameError(true);
      setFNameErrorMessage("First name required.");
    }else{
      setFNameError(false);
      setFNameErrorMessage("");
    }

    if (!lName || lName.length < 1){
      setLNameError(true);
      setLNameErrorMessage("Last name required.");
    }else{
      setLNameError(false);
      setLNameErrorMessage("");
    }

  }


  async function handleSubmit(event) {

    validateInput();
    if (emailError || passwordError || fNameError || lNameError) {
      event.preventDefault();
      return;
    }else{
      event.preventDefault();

    try {
      // Hit sever registration end point
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, { email, password, lName, fName });

      if (response.status === 200) {
        // If successful navigate to home
        try {
          // Hit server login end point
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, { email, password });
    
          if (response.status === 200) {
            console.log("Login successful");
            !context.user && context.loginUser(response.data.id, response.data.userName, response.data.role);
            navigate('/')
          } else {
            console.log("Unexpected response:", response);
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
        navigate('/');
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: {xs: 0, sm: 1, md: 8, lg: 8},
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#FCC737' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>

                <FormControl>
                  <FormLabel htmlFor="fName">First Name</FormLabel>
                  <TextField
                    error={fNameError}
                    helperText={fNameErrorMessage}
                    required
                    fullWidth
                    type="fName"
                    id="fName"
                    name="fName"
                    autoFocus
                    autoComplete="given-name"
                    color={fNameError ? 'error' : 'primary'}
                    onChange={(e) => setFName(e.target.value)}
                    />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
              <FormControl>
              <FormLabel htmlFor="lName">Last Name</FormLabel>
              <TextField
                error={lNameError}
                helperText={lNameErrorMessage}
                required
                fullWidth
                type="lName"
                id="lName"
                name="lName"
                autoComplete="family-name"
                color={lNameError ? 'error' : 'primary'}
                onChange={(e) => setLName(e.target.value)}
                />
              </FormControl>

              </Grid>
              <Grid item xs={12}>

                <FormControl fullWidth>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    error={emailError}
                    helperText={emailErrorMessage}
                    required
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    placeholder="your@email.com"
                    color={emailError ? 'error' : 'primary'}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">Password</FormLabel>
                  <TextField
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    required
                    fullWidth
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    id="password"
                    autoComplete="current-password"
                    color={passwordError ? 'error' : 'primary'}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            <Button
              id="submitButton"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#FCC737'}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/Login"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer sx={{mt: {xs: 3, sm: 3, md: '18vh', lg: '18vh'}}} />
      </Container>
    </ThemeProvider>
  );
}