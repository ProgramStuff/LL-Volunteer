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
import Footer from '../components/Footer';
import axios from 'axios';

const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

// TODO: Pass user role when hitting end point


export default function register() {
  const context = useOutletContext()

  
  // Manage state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const navigate = useNavigate();


  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      // Determine the API URL based on environment
      const baseURL = import.meta.env.VITE_VERCEL_ENV === "production"
        ? import.meta.env.VITE_PROD_URL
        : "http://localhost:3000";
  
      // Hit the server registration endpoint
      const registrationResponse = await axios.post(`${baseURL}/register`, { email, password, lName, fName });
  
      if (registrationResponse.status === 200) {
        console.log("Registration successful");
  
        // After successful registration, automatically log in the user
        const loginResponse = await axios.post(`${baseURL}/login`, { email, password });
  
        if (loginResponse.status === 200) {
          console.log("Login successful");
          // Update the context with user information if not already logged in
          !context.user && context.loginUser(loginResponse.data.id, loginResponse.data.userName, loginResponse.data.role);
          navigate('/');
        } else {
          console.log("Unexpected login response:", loginResponse);
        }
      } else {
        console.log("Unexpected registration response:", registrationResponse);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
        <Footer sx={{mt: '18vh'}} />
      </Container>
    </ThemeProvider>
  );
}