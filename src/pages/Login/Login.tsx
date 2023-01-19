import Button from "@mui/material/Button/Button";
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField/TextField";
import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar/navbar";
import Logo from "../../Resources/Logos/logo-no-text.png";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

import { login, reset } from "../../features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import Spinner from "../../components/Spinner/spinner";
import { FormControlLabel, Switch } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    isTeacher: false
  });

  const {user, isLoading, isError, isSuccess, message} = useSelector((state: any) => state.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }
    
    return () => {
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const {username, password, isTeacher} = formData;

  const onChange = (e: any) => {
    if(e.target.name === 'isTeacher') {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    const userData = {
      username,
      password,
      isTeacher
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return (
      <>
        <NavBar />
        <Spinner />
      </>
    )
  }
  else if (isError) {
    toast.dismiss()
    toast.error('Niepoprawna nazwa użytkownika lub hasło');
  }

  return (
    <div>
      <NavBar/>
      <Grid>
        <Paper elevation={10} style={{width:580, margin:"20px auto", padding:"20px"}}>
          <Grid alignItems='center'>
            <img src={Logo} height={150} />
            <h2>Sign In</h2>
          </Grid>
          <form onSubmit={onSubmit}>
            <FormControlLabel control={<Switch onChange={onChange} name="isTeacher" checked={formData.isTeacher} />} label="Teacher" />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}> 
                <TextField name="username" value={username} label='Username' placeholder='Enter username' fullWidth required onChange={onChange}/>
              </Grid>
              <Grid item xs={6}>
                <TextField name="password" value={password} label='Password' placeholder='Enter password' type='password' fullWidth required onChange={onChange}/>
              </Grid>
            </Grid>
            <Button type="submit" key={"Submit"} sx={{ my: 2 }} variant="contained">
                Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}

export default Login