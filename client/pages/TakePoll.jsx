import React, { useEffect, useState } from "react";

function TakePoll() {
    const { id } = useParams();
    const [prompt, setPrompts] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
      try {
        const fetchPollQuestions = async () => {
          const response = await fetch(`http://localhost:3000/api/poll/${id}`)
          const accessPoll = await response.json();
          const pollOptions = accessPoll.pollOptionsArray;
          const pollPrompt = accessPoll.pollPrompt;
          setOptions(pollOptions);
          setPrompts(pollPrompt);
        }
      }
      catch(err) {
        console.log(err);
      }
    })
    
    const checkBoxOptions = [];

    pollOptions.forEach((option) => {
        checkBoxOptions.push(
          <div>
            <input type="checkbox"></input>
            <h3>{option}</h3>
            <br></br>
          </div>
        )
    })


    return (
        <div>
            <h1>Take Poll</h1>
            <h2>{pollPrompt}</h2>
            {checkBoxOptions}
        </div>
    )
}

export default TakePoll;