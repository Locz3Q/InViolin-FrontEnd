import React, { useState, useEffect } from "react";
import { user } from "./Interfaces/types";
import NavBar from "./components/Navbar/navbar";
import { SpeedDial } from "./components/SpeedDial/speedDial";
import { StartView } from "./components/StartView/startView";

function App() {
  const [backendData, setBackendData] = useState<any>([]);

  useEffect(() => {
    fetch("/api/getAll")
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
        : backendData.map((user: user) => (
            <p>{user.name}</p>
      ))}
      <StartView/>
      <SpeedDial/>
    </div>
  );
}

export default App;
