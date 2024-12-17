import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useOutletContext } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import axios from 'axios';
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

export default function Profile() {

    const context = useOutletContext()

    // Manage state 
    const [role1, setRole1] = useState("");
    const [role2, setRole2] = useState("");
    const [chosenRole1, setChosenRole1] = useState("");
    const [chosenRole2, setChosenRole2] = useState("");
    const [selectedRoles, setSelectedRoles] = useState("");
    const [roleStatus, setRoleStatus] = useState("");
    const userid = context.user.id;

    async function handleSubmit(event) {
      
      event.preventDefault();

      try {
        // Hit role insert end point
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/role/add`, {userid: userid, role1: role1, role2: role2});
        if (response.status === 200) {
          console.log("Insert successful");
          setChosenRole1(response.role1);
          setChosenRole2(response.role2);
          getRoles()
        } else {
          console.log("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Insert failed:", error);
      }
    }

    async function getRoles() {
      try {
        // Hit message insert end point
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/role`, {userid: userid});
        if (response.status === 200) {
          const userRoles = response.data.data[0];
          setSelectedRoles(userRoles)
          console.log("Load successful");
          return response.data.data;
        } else {
          console.log("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Load failed:", error);
      }
    }
  
    useEffect(() =>{
      getRoles();
    },[])
  

    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" sx={{
          maxWidth: { xs: '100%', sm: '540px', md: '800px', lg: '1200px' },
          padding: { xs: 2, sm: 3, md: 4 }
        }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: { xs: 4, sm: 6, md: 8 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography sx={{
              textAlign: 'center',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              mb: { xs: 2, sm: 3 }
            }} component="h1" variant="h5">
            Welcome {context.user.username}
            </Typography>
            <Card variant='outlined' sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: '500px', md: '600px' },
              marginTop: { xs: 2, sm: 3 }
            }}>
            <CardContent>
            <Typography sx={{
              textAlign: 'center',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              mb: { xs: 2, sm: 3 }
            }} component="h2" variant="h5">
              Select your roles
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{
              width: '100%',
              maxWidth: '400px',
              mt: 1,
              mx: 'auto'
            }}>
              {/* Selection for volunteer type */}
              <FormControl sx={{
                m: 1,
                width: { xs: '100%', sm: 'calc(50% - 16px)' },
                minWidth: { xs: '100%', sm: '120px' }
              }}>
                <FormHelperText sx={{ fontSize: '1rem' }}>Role 1</FormHelperText>
                <Select
                    labelId="role1"
                    id="demo-simple-select"
                    value={role1}
                    label="Role"
                    required
                    onChange={(e) => setRole1(e.target.value)}
                    sx={{ width: '100%' }}
                >
                    <MenuItem value={"Referee"}>Referee</MenuItem>
                    <MenuItem value={"Judge"}>Judge</MenuItem>
                    <MenuItem value={"Pit Runner"}>Pit Runner</MenuItem>
                    <MenuItem value={"Score Keeper"}>Score Keeper</MenuItem>
                    <MenuItem value={"Floater"}>Floater</MenuItem>
                </Select>
              </FormControl>
  
              <FormControl sx={{
                m: 1,
                width: { xs: '100%', sm: 'calc(50% - 16px)' },
                minWidth: { xs: '100%', sm: '120px' }
              }}>
              <FormHelperText sx={{ fontSize: '1rem' }}>Role 2</FormHelperText>
              <Select
                    labelId="role2"
                    id="demo-simple-select"
                    value={role2}
                    label="Role"
                    required
                    onChange={(e) => setRole2(e.target.value)}
                    sx={{ width: '100%' }}
                >
                    <MenuItem value={"Referee"}>Referee</MenuItem>
                    <MenuItem value={"Judge"}>Judge</MenuItem>
                    <MenuItem value={"Pit Runner"}>Pit Runner</MenuItem>
                    <MenuItem value={"Score Keeper"}>Score Keeper</MenuItem>
                    <MenuItem value={"Floater"}>Floater</MenuItem>
                </Select>
              </FormControl>
              <Button
              id='submitButton'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#FCC737' }}
                onSubmit={handleSubmit}
              >
                Confirm
              </Button>
              {/* TODO: Conditionally render selected roles */}
            </Box>


            </CardContent>
            </Card>

            {selectedRoles != "" &&           
            <Card variant='outlined' sx={{
              mt: { xs: 3, sm: 4 },
              width: '100%',
              maxWidth: { xs: '100%', sm: '500px', md: '600px' }
            }}>
                {selectedRoles.role2 != null ? 
                <CardContent>
                <Typography sx={{
                  textAlign: 'center',
                  fontSize: { xs: '1.2rem', sm: '1.4rem' },
                  mb: { xs: 2, sm: 3 }
                }}>Roles Waiting for Approval</Typography>
                <Typography sx={{ fontSize: '1rem', mb: 2 }}>Role Choice 1 |  {selectedRoles.role1}</Typography>
                <Typography sx={{ fontSize: '1rem', mb: 2 }}>Role Choice 2 |  {selectedRoles.role2}</Typography>
                </CardContent>
                :
                <CardContent>
                <Typography sx={{
                  textAlign: 'center',
                  fontSize: { xs: '1.2rem', sm: '1.4rem' },
                  mb: { xs: 2, sm: 3 }
                }}>Approved</Typography>
                <Typography sx={{ fontSize: '1rem', mb: 2 }}>Approved Role |  {selectedRoles.role1}</Typography>
                </CardContent>
              }
            </Card>
            }
  

          </Box>
          <Footer sx={{ mt: { xs: 6, sm: 8, md: 10 } }}/>
        </Container>
      </ThemeProvider>
    );
}