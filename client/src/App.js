import './App.css';
import { BrowserRouter, Routes, Route}  from 'react-router-dom';
import AddRental from './components/AddRental'; 
import Dashboard from './components/Dashboard'; 
import EditRental from './components/EditRental'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import ViewRental from './components/ViewRental'; 
import {useState} from 'react';
import NavBar from './components/NavBar'; 
import ViewOne from './components/ViewOne'; 
import Map from './components/Map';
// import Map from './components/Map'; --> if we have time

function App() {
  const[isLoggedin, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedIn}/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path ="/register" element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path ="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path ="/api/agent/:id" element ={<Dashboard /> } />
            <Route path="/rentals" element ={<ViewRental />}/>
            <Route path="/viewOne/:id" element ={<ViewOne />}/>
            <Route path ="/addRental" element={<AddRental />} />
            <Route path="/editRental/:id" element ={<EditRental />}/>
            {/* <Route path="/map" element={<Map />} /> */}
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
