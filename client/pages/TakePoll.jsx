import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom';

function TakePoll() {
    const { id } = useParams();
    const [prompt, setPrompt] = useState('');
    const [checked, setChecked] = useState([]);
    const [pollOptions, setPollOptions] = useState([]);
    const [checkBoxOptions, setCheckBoxOptions] = useState([]);

    useEffect(() => {
      try {
        const fetchPollQuestions = async () => {
          const response = await fetch(`http://localhost:3000/api/poll/${id}`)
          const accessPoll = await response.json();
          const pollOptionsArray = accessPoll.pollOptionsArray;
          console.log(pollOptionsArray)
          setPollOptions(pollOptionsArray);
          const pollPrompt = accessPoll.pollPrompt;
          console.log(pollPrompt)
          setPrompt(pollPrompt);
          console.log('here is prompt');
          console.log(prompt);
          pollOptions.forEach((option) => {
              checkBoxOptions.push(
                <div>
                  <input value={option} type="checkbox" onChange={handleCheck}></input>
                  <h3>{option}</h3>
                  <br></br>
                </div>
              )
          })
          setCheckBoxOptions(checkBoxOptions);
        }
        fetchPollQuestions();
      }
      catch(err) {
        console.log(err);
      }
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