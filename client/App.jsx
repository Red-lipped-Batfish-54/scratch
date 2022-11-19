import { BrowserRouter, useNavigate } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom"
import React from 'react';
import Homepage from './pages/Homepage';
import CreatePoll from './pages/CreatePoll';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/newPoll' element={<CreatePoll />} />
      </Routes>
    </BrowserRouter>

    )
}

export default App;