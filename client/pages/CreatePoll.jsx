import React, { useState } from 'react'
import { BrowserRouter, useNavigate } from "react-router-dom";
// import Questions from '../components/Questions';

export const CreatePoll = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(2);

  const handleFormData = async (e) => {
    e.preventDefault();
    const results = [e.target.title.value];
    for (let i = 1; i <= questions; i++) {
      const answer = `answer${i}`;
      results.push(e.target[answer].value);
    }
    console.log(results);

    const response = await fetch('./api/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(results)
    });
    const data = response.json();
    console.log(data);
  }

  const numOfQuestions = [];
  for (let i = 1; i <= questions; i++) {
    numOfQuestions.push(
      <div className="input-group mb-3" key={i}>
        <input type="text" name={`answer${i}`} className="form-control" placeholder={`Option ${i}`} required/>
        <button type="button" onClick={() => setQuestions(questions - 1)} className="input-group-text" >X</button>
      </div>
    )
  }

  return <div className='mt-5 w-50'>
    <h1>Create a Poll</h1>
    <form onSubmit={handleFormData}>
      <label>Title</label>
      <div className="input-group mb-3">
        <input  type="text" name="title" className="form-control" placeholder="Type your question here" required/>
      </div>

      <label>Questions:</label>
      {numOfQuestions}

      <button type="button" onClick={() => setQuestions(questions + 1)}>Add Option</button>
      <hr />
      <button type="submit" >Create Poll</button>
    </form>
  </div>
}

export default CreatePoll