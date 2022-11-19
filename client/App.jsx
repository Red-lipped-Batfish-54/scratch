import { BrowserRouter, useNavigate } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom"
import React from 'react';
import Homepage from './pages/Homepage';
import CreatePoll from './pages/CreatePoll';

{/* <Route path='/' element={<Homepage />} /> */}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreatePoll />} />
        <Route path='/:id' element={<TakePoll />} />
        <Route path='/:id/display' element={<DisplayPoll />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>

    )
}

export default App;