import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function TakePoll() {
    // Create hooks
    const { id } = useParams();
    const [prompt, setPrompt] = useState('');
    const [checked, setChecked] = useState([]);
    const [pollOptions, setPollOptions] = useState([]);

    // Define helper functions
    useEffect(() => {
      const fetchPollQuestions = async () => {
        const response = await fetch(`http://localhost:3000/api/poll/${id}`)
        return await response.json();
      }
      
      fetchPollQuestions()
      .then((accessPoll) => {
        const pollOptionsArray = accessPoll.pollOptionsArray;
        setPollOptions(pollOptionsArray);
        const pollPrompt = accessPoll.pollPrompt;
        setPrompt(pollPrompt);
      })      
    }, [])

    const handleCheck = (event) => {
        let updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const submit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/api/poll/${id}`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(checked),
        }) 
    }

    const checkBoxOptions = [];
    pollOptions.forEach((option, i) => {
      checkBoxOptions.push(
        <div key={i}>
          <input value={option} type="checkbox" onChange={handleCheck}></input>
          <h3>{option}</h3>
          <br></br>
        </div>
      )
  })

  
    return (
        <div>
            <h1>Take Poll</h1>
            <h2>{prompt}</h2>
            <form onSubmit={submit}>
              {checkBoxOptions}
              <input type='text' placeholder="enter your name"></input>
              <input type='submit' value="Submit!"></input>
            </form>
        </div>
    )
}

export default TakePoll;