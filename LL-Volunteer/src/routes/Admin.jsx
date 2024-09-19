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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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

  
    async function handleSubmit(event) {
      
      event.preventDefault();
      //   TODO: Endpoint to retrieve role info

      try {
        // Hit role insert end point
        const response = await axios.post("http://localhost:3000/role/all", {role: role});
        if (response.status === 200) {
          console.log("Request successful");
          setAllRoles(response.data.data);
          console.log(response.data.data);
        } else {
          console.log("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
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
                    <TableBody>
                  {allRoles.map((single, index) => {
                    return(

                      <TableRow
                      key={single.userid}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {single.fname} {single.lname}
                      </TableCell>

                      <TableCell align="right">{single.role1}
                        <Checkbox
                          color="primary"
                          checked={console.log("checked")}
                        />
                      </TableCell>
                      
                      <TableCell align="right">{single.role2}
                      <Checkbox
                          color="primary"
                          checked={console.log("checked")}
                        />
                      </TableCell>
                      <TableCell align="right">A button here</TableCell>
                    </TableRow>

                    )
                  })}
                      </TableBody>
                    </Table>
                  </TableContainer>
            }

            {/* TODO: Create container for user roles */}
          </Box>
          <Footer />
        </Container>
      </ThemeProvider>
    );
}
