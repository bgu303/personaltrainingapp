import './App.css';
import { useState } from 'react';
import Customers from './components/customers';
import Trainings from "./components/trainings"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Tabs, Tab } from '@mui/material';
import Typography from '@mui/material/Typography';
import TrainingCalendar from './components/calendar';


function App() {
  const [page, setPage] = useState("customers")

  const changeTab = (event, page) => {
    setPage(page)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Personal Training Scheduling Pages</Typography>
        </Toolbar>
        <Tabs textColor="white" value={page} onChange={changeTab}>
          <Tab label="Customers" className="tabs" value="customers"></Tab>
          <Tab label="Trainings" className="tabs" value="trainings"></Tab>
          <Tab label="Calendar" className="tabs" value="calendar"></Tab>

        </Tabs>
      </AppBar>
      {page === "customers" && <Customers />}
      {page === "trainings" && <Trainings />}
      {page === "calendar" && <TrainingCalendar />}
    </>
  );
}

export default App;
