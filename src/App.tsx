import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import {ThemeProvider} from '@mui/material/styles'
import theme from "./components/Reusable/Theme/theme";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Teachers from "./components/Teachers/Teachers";
import Lessons from "./components/Lessons/lessons";
import Students from "./components/Students/Students";
import NoteCord from "./components/NoteCord/NoteCord";

function App() {
  // BBThesis
  // iZrnSsV1wFnjUeaF

  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/signin" element={<Login/>} />
              <Route path="/signup" element={<Register/>} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/students" element={<Students/>} />
              <Route path="/notecordApp" element={<NoteCord/>} />
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
