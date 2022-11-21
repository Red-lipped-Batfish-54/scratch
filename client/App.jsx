import { useNavigate, useLocation } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom"
import React, { useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatePoll from './pages/CreatePoll';
import TakePoll from './pages/TakePoll';
import DisplayPoll from "./pages/DisplayPoll";

{/* <Route path='/' element={<Homepage />} /> */}

function App() {

  // Navigate to requested URL on component mount
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    navigate(location.path);
  }, [])

  return (
    <>
      <Link to='/login'>Login - TEST LINK</Link>
      <Link to='/signup'>Signup - TEST LINK</Link>
      <Link to='/1/display'>diplay1</Link>
      <Routes>
        <Route path='/' element={<CreatePoll />} />
        <Route path='/:id' element={<TakePoll />} />
        <Route path='/:id/display' element={<DisplayPoll />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </>

    )
}

export default App;