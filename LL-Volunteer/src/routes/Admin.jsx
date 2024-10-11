import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate, useOutletContext } from "react-router-dom";
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';





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
    const [allRoles, setAllRoles] = useState("");
    const [userRole, setUserRole] = useState({
      userid: "",
      role: ""
    });

  
    async function handleSubmit(event) {
      // Retrieve volunteer role info and update state
      
      event.preventDefault();

      try {

        // Hit role insert end point
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/role/all`, {role: role});
        if (response.status === 200) {
          console.log("Request successful");
          setAllRoles(response.data.data);
        } else {
          console.log("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    }

    async function handleClick(event) {
      // Send confirmed role to update endpoint
      event.preventDefault();
      const userid = userRole.userid
      const role = userRole.role
      try {
        // Hit role insert end point
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/role/update`, {userid: userid, role: role});
        if (response.status === 200) {
          console.log("Request successful");
        } else {
          console.log("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }

    }
    
    function handleChange(event) {
      const [userid, role] = event.target.value.split(':'); // Split value into userid and role
      setUserRole(prevState => ({
        ...prevState,
        userid: userid, // Update userid
        role: role      // Update role
      }));

    }

    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" sx={{
          maxWidth: { xs: '100%', sm: '540px', md: '800px', lg: '1200px' },
          padding: { xs: 2, sm: 3, md: 4 }
        }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: { xs: 4, sm: 6, md: 0 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography sx={{
              fontSize: { xs: '2rem', sm: '2.25rem', md: '2.5rem' },
              textAlign: 'center',
              mb: { xs: 2, sm: 3, md: 4 }
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
                  fontSize: { xs: '1.2rem', sm: '1.35rem', md: '1.5rem' },
                  textAlign: 'center',
                  mb: { xs: 2, sm: 3 }
                }} component="h2" variant="h5">
                  Search Volunteers by Role
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 1 }}>
                  <FormControl sx={{
                    m: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FormHelperText sx={{ fontSize: '1rem' }}>Role</FormHelperText>
                    <Select
                      labelId="role"
                      sx={{
                        width: { xs: '100%', sm: '80%', md: '60%' },
                        minWidth: '10rem'
                      }}
                      id="demo-simple-select"
                      value={role}
                      label="Role"
                      required
                      onChange={(e) => setRole(e.target.value)}
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
                    variant="contained"
                    onSubmit={handleSubmit}
                    sx={{
                      mt: 3,
                      mb: 2,
                      width: { xs: '100%', sm: '80%', md: '60%' },
                      maxWidth: '200px',
                      alignSelf: 'center',
                      display: 'block',
                      mx: 'auto'
                    }}
                  >
                    Search
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {allRoles == "" ? null : 
              <FormControl sx={{ width: '100%', mt: { xs: 3, sm: 4, md: 5 } }}>
                <RadioGroup sx={{ padding: 0, margin: 0, width: '100%' }}>
                  <TableContainer sx={{
                    width: '100%',
                    overflowX: 'auto',
                    '& .MuiTable-root': {
                      minWidth: { xs: '600px', md: '100%' }
                    }
                  }} component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead sx={{ backgroundColor: 'black' }}>
                        <TableRow>
                          <TableCell>Volunteer Name</TableCell>
                          <TableCell align="right">First Role</TableCell>
                          <TableCell align="right">Second Role</TableCell>
                          <TableCell align="right">Approve</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {/* Map though role and display them in a table with user names to confirm */}
                        {allRoles.map((single, index) => {
                          return(
                            <TableRow
                            key={single.userid}
                          >
                            <TableCell component="th" scope="row">
                              {single.fname} {single.lname}
                            </TableCell>

                            <TableCell align="right">
                            <FormControlLabel value={`${single.userid}:${single.role1}`} control={single.role2 != null ? <Radio /> : <> </>} onChange={handleChange} label={single.role1}/>
                            </TableCell>
                            {single.role2 != null &&   
                            <>              
                            <TableCell align="right">
                              <FormControlLabel value={`${single.userid}:${single.role2}`} control={<Radio />} onChange={handleChange} label={single.role2}/>
                            </TableCell>
                            <TableCell align="right">
                            <Button onClick={handleClick}>Confirm</Button>
                            </TableCell>
                            </>
                            }
            
                          </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </RadioGroup>
              </FormControl>
            }
          </Box>
          <Footer sx={{ mt: { xs: '10vh', sm: '15vh', md: '20vh', lg: '28vh' }, mb:0 }} />
        </Container>
      </ThemeProvider>
    );
}