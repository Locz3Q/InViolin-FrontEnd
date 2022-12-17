import { SpeedDial } from '../../components/SpeedDial/speedDial';
import { teacher, user } from "../../Interfaces/types";
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/Navbar/navbar'
import { StartView } from '../../components/StartView/startView';
import {ThemeProvider} from '@mui/material/styles'
import theme from '../../components/Reusable/Theme/theme';

const Home = () => {
  const [backendData, setBackendData] = useState<any>([]);

  useEffect(() => {
    fetch("/api/teachers/getAll")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);
  
  // BBThesis
  // iZrnSsV1wFnjUeaF

  const apiErr: JSX.Element = <p>Loading...</p>;


  return (
    <div>
      <ThemeProvider theme={theme}>
        <NavBar/>
        {typeof backendData === "undefined"
          ? apiErr
          : backendData.map((teacher: teacher) => (
              <p>{teacher.name} - {teacher.surname} - {teacher.teach_level}</p>
        ))}
        <StartView/>
        <SpeedDial/>
      </ThemeProvider>
    </div>
  )
}

export default Home