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
        // Determine the API URL based on the environment
        const baseURL = import.meta.env.VITE_VERCEL_ENV === "production"
          ? import.meta.env.VITE_PROD_URL
          : "http://localhost:3000";
    
        // Hit role insert endpoint with the appropriate URL
        const response = await axios.post(`${baseURL}/role/add`, {
          userid: userid, 
          role1: role1, 
          role2: role2
        });
    
        if (response.status === 200) {
          console.log("Insert successful");
          setChosenRole1(response.role1);
          setChosenRole2(response.role2);
          getRoles(); // Assuming this fetches roles after insertion
        } else {
          console.log("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Insert failed:", error);
      }
    }
    

    async function getRoles() {
      try {
        const baseURL = import.meta.env.VITE_VERCEL_ENV === "production"
        ? import.meta.env.VITE_PROD_URL
        : "http://localhost:3000";
        // Hit message insert end point
        const response = await axios.post(`${baseURL}/role`, {userid: userid});
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
            <Typography sx={{textAlign: 'center',fontSize: '4vh'}} component="h1" variant="h5">
            Welcome {context.user.username}
            </Typography>
            <Card variant='outlined' sx={{ minWidth: 275}}>
            <CardContent>
            <Typography sx={{textAlign: 'center', fontSize: '2vh'}} component="h2" variant="h5">
              Select your roles
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: 400, mt: 1 }}>
              {/* Selection for volunteer type */}
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <FormHelperText sx={{fontSize: '1rem'}} >Role 1</FormHelperText>
                <Select
                    labelId="role1"
                    sx={{minWidth: '10rem'}}
                    id="demo-simple-select"
                    value={role1}
                    label="Role"
                    required
                    onChange={(e) => setRole1(e.target.value)}
                >
                    <MenuItem value={"Referee"}>Referee</MenuItem>
                    <MenuItem value={"Judge"}>Judge</MenuItem>
                    <MenuItem value={"Pit Runner"}>Pit Runner</MenuItem>
                    <MenuItem value={"Score Keeper"}>Score Keeper</MenuItem>
                    <MenuItem value={"Floater"}>Floater</MenuItem>
                </Select>
              </FormControl>
  
              <FormControl sx={{ m: 1, minWidth: 120, ml: 7}}>
              <FormHelperText sx={{fontSize: '1rem'}} >Role 2</FormHelperText>
              <Select
                    labelId="role2"
                    sx={{minWidth: '10rem'}}
                    id="demo-simple-select"
                    value={role2}
                    label="Role"
                    required
                    onChange={(e) => setRole2(e.target.value)}
                >
                    <MenuItem value={"Referee"}>Referee</MenuItem>
                    <MenuItem value={"Judge"}>Judge</MenuItem>
                    <MenuItem value={"Pit Runner"}>Pit Runner</MenuItem>
                    <MenuItem value={"Score Keeper"}>Score Keeper</MenuItem>
                    <MenuItem value={"Floater"}>Floater</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={{handleSubmit}}
              >
                Confirm
              </Button>
              {/* TODO: Conditionally render selected roles */}
            </Box>


            </CardContent>
            </Card>

            {selectedRoles != "" &&           
            <Card variant='outlined' sx={{mt: '2vh', minWidth: '40vh'}}>
                {selectedRoles.role2 != null ? 
                <CardContent>
                <Typography sx={{textAlign: 'center', fontSize: '2vh', mb: '2vh'}}>Roles Waiting for Approval</Typography>
                <Typography sx={{fontSize: '2vh', mb: '2vh'}}>Role Choice 1 |  {selectedRoles.role1}</Typography>
                <Typography sx={{fontSize: '2vh', mb: '2vh'}}>Role Choice 2 |  {selectedRoles.role2}</Typography>
                </CardContent>
                :
                <CardContent>
                <Typography sx={{textAlign: 'center', fontSize: '2vh', mb: '2vh'}}>Approved</Typography>
                <Typography sx={{fontSize: '2vh', mb: '2vh'}}>Approved Role |  {selectedRoles.role1}</Typography>
                </CardContent>
              }
            </Card>
            }
  

          </Box>
          <Footer sx={{mt: '12vh'}}/>
        </Container>
      </ThemeProvider>
    );
}
