import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Switch from "@mui/material/Switch/Switch";
import TextField from "@mui/material/TextField/TextField";
import Logo from "../../Resources/Logos/logo-no-text.png";
import {useState, useEffect} from 'react';
import { Button } from "@mui/material";
import NavBar from "../../components/Navbar/navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password2: '',
    name: '',
    surname: '',
    level: ''
  });

  const {email, username, password, password2, name, surname, level} = formData;

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    console.log(e.target.value);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
  }

  return (
    <div>
      <NavBar/>
      <Grid>
        <Paper elevation={10} style={{height:'70vh',width:580, margin:"20px auto", padding:"20px"}}>
          <Grid alignItems='center'>
            <img src={Logo} height={150} />
            <h2>Sign Up</h2>
            <Switch></Switch>
          </Grid>
          <form onSubmit={onSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}> 
                <TextField name="email" value={email} label='Email' placeholder='Enter email' fullWidth required onChange={onChange}/>
              </Grid>
              <Grid item xs={6}> 
                <TextField name="username" value={username} label='Username' placeholder='Enter username' fullWidth required onChange={onChange}/>
              </Grid>
              <Grid item xs={6}>
                <TextField name="password" value={password} label='Password' placeholder='Enter password' type='password' fullWidth required onChange={onChange}/>
              </Grid>
              <Grid item xs={6}>
                <TextField name="password2" value={password2} label='Confirm Password' placeholder='Confirm password' type='password' fullWidth required onChange={onChange}/>
              </Grid>
              <Grid item xs={6}>
                <TextField name="name" value={name} label='Name' placeholder='Enter Name' fullWidth required onChange={onChange}/>
              </Grid>
              <Grid item xs={6}>
                <TextField name="surname" value={surname} label='Surname' placeholder='Enter Surname' fullWidth required onChange={onChange}/>
              </Grid>
            </Grid>
            <Button key={"Submit"} sx={{ my: 2 }} variant="contained">
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}

export default Register