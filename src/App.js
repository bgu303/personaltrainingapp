import './App.css';
import Customers from './components/customers';
import Trainings from "./components/trainings"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TrainingCalendar from './components/calendar';


function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Training Schedule Pages</Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Link to="/trainings">Trainings</Link>{' '}
        <Link to="/customers">Customers</Link>{' '}
        <Link to="/calendar">Calendar</Link>{" "}
        <Routes>
          <Route path="/trainings" element={<Trainings />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/calendar" element={<TrainingCalendar />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
