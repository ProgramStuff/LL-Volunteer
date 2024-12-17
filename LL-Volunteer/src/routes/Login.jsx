import React, { useState } from 'react';
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

export default function Login() {
  const context = useOutletContext()

  // Manage state  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Error state
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

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
  }


  async function handleSubmit(event) {
    validateInput();
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }else{
      event.preventDefault();
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
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              required
              fullWidth
              type="email"
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              autoFocus
              color={emailError ? 'error' : 'primary'}
              onChange={(e) => setEmail(e.target.value)}
            />
            </FormControl>

            <FormControl>
            <FormLabel htmlFor="email">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              required
              fullWidth
              name="password"
              placeholder="••••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              color={passwordError ? 'error' : 'primary'}
              onChange={(e) => setPassword(e.target.value)}
            />
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#FCC737'}}
            >
              LogIn
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <Link to="/Register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer sx={{mt: {xs: 10, sm: 10, md: '27vh', lg: '27vh'}}} />
      </Container>
    </ThemeProvider>
  );
}
