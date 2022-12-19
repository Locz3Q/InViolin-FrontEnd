import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import {ThemeProvider} from '@mui/material/styles'
import theme from "./components/Reusable/Theme/theme";

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
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
