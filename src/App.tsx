import React, { useState, useEffect } from "react";
import { teacher, user } from "./Interfaces/types";
import NavBar from "./components/Navbar/navbar";
import { SpeedDial } from "./components/SpeedDial/speedDial";
import { StartView } from "./components/StartView/startView";

function App() {
  const [backendData, setBackendData] = useState<any>([]);

  useEffect(() => {
    fetch("/api/teachers/getAll")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const apiErr: JSX.Element = <p>Loading...</p>;

  return (
    <div>
      <NavBar/>
      {typeof backendData === "undefined"
        ? apiErr
        : backendData.map((teacher: teacher) => (
            <p>{teacher.name} - {teacher.surname} - {teacher.teach_level}</p>
      ))}
      <StartView/>
      <SpeedDial/>
    </div>
  );
}

export default App;
