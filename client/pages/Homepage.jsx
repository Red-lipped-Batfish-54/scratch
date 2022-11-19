import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Homepage = () => {
  const navigate = useNavigate();

  return <div className='container'>
    <div className="mt-5 mb-3 d-flex justify-content-center"><h1 className="text-align-center">Poll-a-Bear</h1></div>
    <div className="d-flex justify-content-center">
      <button onClick={() => navigate('/newPoll')} className="btn btn-primary btn-lg">Create a Poll</button>
    </div>
  </div>
}

export default Homepage