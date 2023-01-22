import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuIcon from '@mui/icons-material/Menu';

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../Resources/Logos/logo-no-background.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { logout, reset } from "../../features/auth/authSlice";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const settings = [(user?.isTeacher ? 'Studenci' : 'Nauczyciele'), "Lekcje", "Wyloguj"];
  const signOptions = ["Zaloguj się", "Zarejestruj się"];

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    setAnchorElUser(null);
  };
  
  const handleLessons = () => {
    navigate('/lessons');
    setAnchorElUser(null);
  };

  const handleTeachers = () => {
    navigate('/teachers');
    setAnchorElUser(null);
  };

  const handleStudents = () => {
    navigate('/students');
    setAnchorElUser(null);
  };

  const loggedin = (
    <Box sx={{ flexGrow: 0, fontSize: '20px'}}>
      <Typography>
        Konto {user?.isTeacher ? 'Nauczycel' : 'Student'}a
        <Tooltip title="Pokaż opcje">
          <IconButton onClick={handleOpenUserMenu}>
            <AccountCircle sx={{ color: "white", fontSize: "45px" }}/>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          >
          {settings.map((setting) => {
            if(!user && setting === 'Lekcje') {
              return (<></>)
            }
            else {
              return (
                <MenuItem key={setting} onClick={setting === 'Wyloguj' ? handleLogOut : (setting === 'Lekcje' ? handleLessons : (setting === 'Studenci' ? handleStudents : handleTeachers))}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              )
            }
          })}
        </Menu>
      </Typography>
    </Box>
  );

  const notLoggedin = (
    <Box sx={{ display: { xs: 'flex' }, mr: 1 }}>
      {signOptions.map((page, index) => (
        <Link to={index === 0 ? "/signin" : "/signup"}>
          <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
            {page}
          </Button>
        </Link>
      ))}
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img alt='InViolin' src={Logo} height={80} style={{ marginBottom: 5, marginTop: 5 }} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={user?.isTeacher ? "/students" : "/teachers"}>
                  <Button
                    key={user?.isTeacher ? "Studenci" : "Nauczyciele"}
                    onClick={handleCloseNavMenu}
                    
                  >
                    {user?.isTeacher ? "Studenci" : "Nauczyciele"}
                  </Button>
                </Link>
              </MenuItem>
              {user ? (
                <MenuItem>
                  <Link to={"/lessons"}>
                    <Button
                      key='Lekcje'
                      onClick={handleCloseNavMenu}
                      >
                      Lekcje
                    </Button>
                  </Link>
                </MenuItem>
              ) : (<></>)}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: user ? 15 : 24,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img alt='InViolin' src={Logo} height={80} style={{ marginBottom: 5, marginTop: 5 }}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to={user?.isTeacher ? "/students" : "/teachers"}>
                <Button
                  key={user?.isTeacher ? "Studenci" : "Nauczyciele"}
                  onClick={handleCloseNavMenu}
                  sx={{ fontSize: "20px", my: 2, color: "white", display: "block" }}
                >
                  {user?.isTeacher ? "Studenci" : "Nauczyciele"}
                </Button>
              </Link>
              {user ? (
                <Link to={"/lessons"}>
                  <Button
                    key='Lekcje'
                    onClick={handleCloseNavMenu}
                    sx={{ fontSize: "20px", my: 2, color: "white", display: "block" }}
                    >
                    Lekcje
                  </Button>
                </Link>
              ) : (<></>)}
            </Box>
          {user ? loggedin : notLoggedin}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
