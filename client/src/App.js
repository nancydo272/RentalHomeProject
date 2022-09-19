import './App.css';
import { BrowserRouter, Routes, Route}  from 'react-router-dom';
import AddRental from './components/AddRental'; 
import Dashboard from './components/Dashboard'; 
import EditRental from './components/EditRental'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import ViewRental from './components/ViewRental'; 
// import Map from './components/Map'; --> if we have time

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path ="/user/:id/dashboard" element ={<Dashboard /> } />
          <Route path="/rental/:id" element ={<ViewRental />}/>
          <Route path ="/addRental" element={<AddRental />} />
          <Route path="/editRental/:id" element ={<EditRental />}/>
          <Route path ="/register" element={<Register />} />
          <Route path ="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
