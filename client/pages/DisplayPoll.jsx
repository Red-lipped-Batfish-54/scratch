import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react'

function DisplayPoll() {

    const [polls, setPolls] = useState([]);
    const {id} = useParams();

    useEffect(()=>{
        const fetchPolls = async () => {
            let response = await fetch(`http://localhost:3000/api/poll/${id}`)
        let data = await response.json()
        // console.log(data)
        setPolls(data.poll)
        console.log('polls', polls)
        }
        fetchPolls()
        .catch(console.err)
    },[])  
    console.log(polls)

    let filteredPoll = polls.filter(poll => poll.entries !== null)
    console.log('filteredPoll', filteredPoll)


    
    return (
     
        <div>
    
      <div className="list-group">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="bg-primary table-warning">
                <th className="text-center" scope="col">poll_id</th>
                <th className="text-center" scope="col">poll_options</th>
                <th className="text-center" scope="col">users</th>
                <th className="text-center" scope="col">entries</th>
            </tr>
          </thead>

          <tbody>
            
                {   filteredPoll &&
                    filteredPoll.map(poll => {
                        return (
                            <tr key={polls.id} value={poll.id} onClick={(e)=> navigateFlask(e, poll.id)}>
                                <td className="text-center">{poll.poll_id}</td>
                                <td className="text-center">{poll.poll_options}</td>
                                <td className="text-center">{poll.users}</td>
                                <td className="text-center">{poll.entries}</td>
                            
                            </tr>
                        )
                    })
                }
           
          </tbody>
        </table>
      </div>

    </div>
    )
}

export default DisplayPoll