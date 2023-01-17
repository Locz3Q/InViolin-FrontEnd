import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch/Switch";
import TextField from "@mui/material/TextField/TextField";
import Logo from "../../Resources/Logos/logo-no-text.png";
import { useState, useEffect } from "react";
import { Box, Button, FormControl as form, FormControlLabel, Slider, Typography } from "@mui/material";
import NavBar from "../../components/Navbar/navbar";
import { AppDispatch } from "../../app/store";
import Spinner from "../../components/Spinner/spinner";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { register, reset } from "../../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
    name: "",
    surname: "",
    level: 5,
    isTeacher: false,
    teacher: null,
    lessons: [null]
  });

  const [isValid, setIsValid] = useState(true);

  const { email, username, password, password2, name, surname, level, isTeacher, teacher, lessons } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }
    setIsValid(password === password2);
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, password, password2]);

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
    e.preventDefault();

    if (password !== password2) {
      toast.error("Hasła nie są identyczne");
    } else {
      const userData = {
        email,
        username,
        password,
        name,
        surname,
        level,
        isTeacher,
        teacher,
        lessons
      };
      dispatch(register(userData));
    }
  };

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
    toast.error('Użytkownik o takim emailu lub nazwie lub istnieje');
  }

  return (
    <div>
      <NavBar />
      <Grid>
        <Paper
          elevation={10}
          style={{
            width: 580,
            margin: "20px auto",
            padding: "20px",
          }}
        >
          <Grid alignItems="center">
            <img src={Logo} height={150} />
            <h2>Sign Up</h2>
          </Grid>
          <form onSubmit={onSubmit}>
            <FormControlLabel control={<Switch onChange={onChange} name="isTeacher" checked={formData.isTeacher} />} label="Teacher" />
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <TextField
                  name="email"
                  value={email}
                  label="Email"
                  placeholder="Enter email"
                  fullWidth
                  required
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="username"
                  value={username}
                  label="Username"
                  placeholder="Enter username"
                  fullWidth
                  required
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="password"
                  value={password}
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  fullWidth
                  required
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="password2"
                  value={password2}
                  label="Confirm Password"
                  placeholder="Confirm password"
                  type="password"
                  fullWidth
                  required
                  onChange={onChange}
                  error={!isValid}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="name"
                  value={name}
                  label="Name"
                  placeholder="Enter Name"
                  fullWidth
                  required
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="surname"
                  value={surname}
                  label="Surname"
                  placeholder="Enter Surname"
                  fullWidth
                  required
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Box padding={2}>
              <Typography id="input-slider" gutterBottom>
                Level
              </Typography>
              <Slider
                name="level"
                aria-label="Level"
                defaultValue={level}
                valueLabelDisplay="auto"
                onChange={onChange}
                step={1}
                marks
                min={0}
                max={10}
              />
            </Box>
            <Button
              type="submit"
              key={"Submit"}
              sx={{ my: 2 }}
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;
