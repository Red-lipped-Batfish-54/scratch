import React, { useEffect } from "react";

function TakePoll() {
    const { id } = useParams();

    useEffect(() => {
      try {
        const fetchPollQuestions = async () => {
          const response = await fetch(`http://localhost:3000/api/${id}`)
          const accessPoll = await response.json();
          const pollOptions = [];
          
        }
      }
      catch(err) {
        console.log(err);
      }
    })
    
    return (
        <div>
            <h1>Take Poll</h1>
            <input type="checkbox"></input><br></br>
            <input type="checkbox"></input><br></br>
            <input type="checkbox"></input><br></br>
        </div>
    )
}

export default TakePoll;