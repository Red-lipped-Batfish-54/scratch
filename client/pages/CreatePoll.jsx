import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import Questions from '../components/Questions';

export const CreatePoll = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(2);

  const numOfQuestions = [];
  for (let i = 1; i <= questions; i++) {
    numOfQuestions.push(
      <div className="input-group mb-3" key={i}>
        <input type="text" className="form-control" placeholder={`Option ${i}`} />
        <button className="input-group-text" >X</button>
      </div>
    )
  }
  return <div className='mt-5 w-50'>
    <h1>Create a Poll</h1>
    <form>
      <label>Title</label>
      <div className="input-group mb-3">
        <input  type="text" className="form-control" placeholder="Type your question here"/>
      </div>

      <label>Questions:</label>
      {numOfQuestions}

      <button type="button" onClick={() => setQuestions(questions + 1)}>Add Option</button>

    </form>
  </div>
}

export default CreatePoll