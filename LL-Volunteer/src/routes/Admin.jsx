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
        const response = await axios.post("http://localhost:3000/role/all", {role: role});
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
        const response = await axios.post("http://localhost:3000/role/update", {userid: userid, role: role});
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
                    labelId="role"
                    sx={{minWidth: '10rem'}}
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
                fullWidth
                variant="contained"
                onSubmit={handleSubmit}
                sx={{ml: '14vh', mt: 3, mb: 2, maxWidth: '15vh'}}
              >
                Search
              </Button>
            </Box>
            </CardContent>
            </Card>


 
            {allRoles == "" ? null : 
                <FormControl>
                  <RadioGroup sx={{padding: 0, margin: 0}}>
                  <TableContainer sx={{minWidth: '90vh', mt: '3vh'}} component={Paper}>
                  <Table sx={{ minWidth: '80vh' }} aria-label="simple table">
                    <TableHead sx={{backgroundColor: 'black'}}>
                      <TableRow>
                        <TableCell>Volunteer Name</TableCell>
                        <TableCell align="right">First Role</TableCell>
                        <TableCell align="right">Second Role</TableCell>
                        <TableCell align="right">Approve</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{'&:last-child td, &:last-child th': {border: 0}}}>

                        
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

            {/* TODO: Create container for user roles */}
          </Box>
          <Footer sx={{mt: '30vh'}}/>
        </Container>
      </ThemeProvider>
    );
}
