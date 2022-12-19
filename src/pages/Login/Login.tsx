import Button from "@mui/material/Button/Button";
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField/TextField";
import { useState } from "react";
import NavBar from "../../components/Navbar/navbar";
import Logo from "../../Resources/Logos/logo-no-text.png";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const {username, password} = formData;

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
        <Paper elevation={10} style={{height:'50vh',width:580, margin:"20px auto", padding:"20px"}}>
          <Grid alignItems='center'>
            <img src={Logo} height={150} />
            <h2>Sign In</h2>
          </Grid>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}> 
              <TextField name="username" value={username} label='Username' placeholder='Enter username' fullWidth required onChange={onChange}/>
            </Grid>
            <Grid item xs={6}>
              <TextField name="password" value={password} label='Password' placeholder='Enter password' type='password' fullWidth required onChange={onChange}/>
            </Grid>
          </Grid>
          <Button key={"Submit"} sx={{ my: 2 }} variant="contained">
              Submit
          </Button>
        </Paper>
      </Grid>
    </div>
  )
}

export default Login