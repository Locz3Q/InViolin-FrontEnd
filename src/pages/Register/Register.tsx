import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch/Switch";
import TextField from "@mui/material/TextField/TextField";
import Logo from "../../Resources/Logos/logo-no-text.png";
import { useState, useEffect } from "react";
import { Box, Button, FormControlLabel, IconButton, InputAdornment, Slider, Typography } from "@mui/material";
import NavBar from "../../components/Navbar/navbar";
import { AppDispatch } from "../../app/store";
import Spinner from "../../components/Spinner/spinner";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { register, reset } from "../../features/auth/authSlice";
import Stack from "@mui/system/Stack/Stack";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
    lessons: []
  });

  const [isValid, setIsValid] = useState({password: true, confirm: true});
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const { email, username, password, password2, name, surname, level, isTeacher, teacher, lessons } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  function valid() {
    if(password !== ''){
      setIsValid({
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password),
        confirm: password === password2
      });
    }
    if(email !== '') {
      setIsEmailValid(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    }
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }
    valid()
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, password, password2, email]);

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
    toast.error('Użytkownik o takim emailu lub nazwie już istnieje');
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
            <img alt="InViolin" src={Logo} height={150} />
            <h2>Rejestracja</h2>
          </Grid>
          <form onSubmit={onSubmit}>
            <FormControlLabel control={<Switch onChange={onChange} name="isTeacher" checked={formData.isTeacher} />} label="Nauczyciel?" />
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
                  placeholder="Wprowadź Email"
                  fullWidth
                  required
                  onChange={onChange}
                  error={!isEmailValid}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="username"
                  value={username}
                  label="Nazwa użytkownika"
                  placeholder="Wprowadź nazwę użytkownika"
                  fullWidth
                  required
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="password"
                  value={password}
                  label="Hasło"
                  placeholder="Wprowadź hasło"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  required
                  onChange={onChange}
                  error={!isValid.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="password2"
                  value={password2}
                  label="Potwierdź hasło"
                  placeholder="Wpisz ponownie hasło"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  required
                  onChange={onChange}
                  error={!isValid.confirm}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                        >
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="name"
                  value={name}
                  label="Imię"
                  placeholder="Wprowadź imię"
                  fullWidth
                  required
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="surname"
                  value={surname}
                  label="Nazwisko"
                  placeholder="Wprowadź nazwisko"
                  fullWidth
                  required
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            {/* {formData.isTeacher ? (
              <Grid item xs={6} marginTop={2}>
                <TextField
                  name="bio"
                  value={surname}
                  label="Opis"
                  placeholder="Napisz coś o sobie :)"
                  fullWidth
                  required
                  //onChange={onChange}
                />
              </Grid>
            ) : ''} */}
            <Box padding={2}>
              <Typography id="input-slider" gutterBottom>
                Poziom umiejętności {formData.isTeacher ? 'nauczania' : ''}
              </Typography>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <Typography id="input-slider" gutterBottom>
                  Początkujący
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
                <Typography id="input-slider" gutterBottom>
                  Zaawansowany
                </Typography>
              </Stack>
            </Box>
            <Button
              type="submit"
              key={"Submit"}
              sx={{ my: 2 }}
              variant="contained"
            >
              Zarejestruj
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;
