import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS} from 'chart.js/auto'
//notes: 
// npm install chart.js
// npm install react-chartjs-2


function DisplayPoll() {

    const [polls, setPolls] = useState([]);
    const {id} = useParams();
    const [disable, setDisable ] = useState(true);
    const [val, setValue] = useState("");
    const [user, setUser] = useState("");

   

    useEffect(()=>{
        const fetchPolls = async () => {
            let response = await fetch(`http://localhost:3000/api/poll/${id}`)
        let data = await response.json()
        // console.log(data)
        console.log('polls', polls)
        setPolls(data.poll)
       
        console.log('data.poll', data.poll)
        ///////////////////////
        // setUser(data.poll.user)
        // console.log('data.poll.user', data.poll)
        console.log('polls', polls)
        }
        fetchPolls()
        .catch(console.err)
    },[])  
    console.log('polls', polls)

    // function handleUpdate(e){
    //     console.log('enters handleUpdate', 'e', e)
    //     console.log('e.id', e.poll_id)
    //     e.stopPropagation();
    //     e.preventDefault();
    //     console.log('e.target', e.target)
    //     // async function postFlask (){
    //     //     const response = await fetch(`http://localhost:3000/api/poll/${id}`, {
    //     //         method: 'PUT',
    //     //         headers: {
    //     //             'Content-Type': 'application/json'
    //     //         },
    //     //         body: JSON.stringify({
    //     //             poll.id,

    //     //         })
    //     //     })
    //     //   // const data = await response.json()  
    //     //   // setFlasks(data.data.flasks) 
    //     //   // console.log('submit update flask', data)
    //     // }
    //     // postFlask()
    //     // .catch(err => console.log('error in post server adding flask'))
    //      }

    function handleDelete(e, key, poll_id, users, entries) {
        console.log("entering handleSubmit?")
      
        e.preventDefault();
        // e.stopPropagation();
        console.log('e', e);
        console.log('e.target', e.target.parentElement.parentElement)
        console.log('id', key)
        console.log('poll.poll_id', poll_id)
        
        async function postFlask (){
            const response = await fetch(`http://localhost:3000/api/poll/${poll_id}/${key}`, {
                method: 'DELETE'
      
            })
          // const data = await response.json()  
          // setFlasks(data.data.flasks) 
          // console.log('submit update flask', data)
        }
        postFlask()
        .catch(err => console.log('error in post server deleting flask'))
        // navigateFlaskHome()
      
      }
      //filtered poll:  removed all rows that did not have entries.  
    let filteredPoll = polls.filter(poll => poll.entries !== null)
    // console.log('filteredPoll', filteredPoll)
    const pollResult = {}
    const pollOptions = polls.filter(poll => poll.poll_options !==null)
    //making sure graph contains all poll_options since it is filtered out in the entries
    pollOptions.forEach(poll => {
        pollResult[poll.poll_options] = 0
    })
    // console.log('pollOptions, check if it has all options, fish', pollOptions)
    // console.log( 'pollResult', pollResult)
    
    filteredPoll.forEach(poll => {
        pollResult[poll.entries] ? pollResult[poll.entries]++ : pollResult[poll.entries] = 1;
    })
    // console.log('pollResult', pollResult)
    // console.log('Object.entries(pollResult)', Object.entries(pollResult))
    const test = Object.entries(pollResult).map(entry=> entry[0]);

    //
    const pollGraph = {
        labels: Object.entries(pollResult).map((entry)=> entry[0]),
        datasets: [{
          label: "votes",
          data: Object.entries(pollResult).map((entry)=> entry[1])
        }]
      }

      //getting the prompt to display on top of the page
      let prompt = polls.filter(poll => poll.poll_prompt !== null)
    //   console.log('prompt[0]', (prompt[0]))
    //   let oneObj = prompt[0]
    //   console.log('oneObj', {...prompt[0]}.poll_prompt)
// 
    return (
     
     <div className="displayPoll">
      <div className="displayPrompt"><h2>{{...prompt[0]}.poll_prompt}</h2></div>        
    {/* bar chart below */}
      <div className="barchartdiv">
        <Bar className="display-barchart" data={pollGraph} options={{
            title: {
            display: true,
            text: 'od600'
            },
            legend: {
            display:true,
            text: "hi"
            }
            }}/> 
        </div>
    {/*  
     
         
          
            
                {   polls.filter(poll => poll.entries !== null) &&
                    polls.filter(poll => poll.entries !== null).map(poll => {
                        return (


                            <div className="updateFlask">
      
      <form key={poll.id} action="">
        <div className="form-group">
          <label htmlFor="cell_bank">{poll.id}</label>
          <input id={poll.id} placeholder={poll.users} onChange={e=> setUser(e.target.value)} className="form-control" type="text"></input>
        <button type="submit" onClick={handleUpdate} className="btn btn-danger btn-sm  ">Update</button>   
        </div>
                     
      </form>
      </div>
                        )
                    })
                }
           
     */}  
      
     {/*  */} 
     <div className="display-list-group2">
     <table className="table table-hover table-dark">
       <thead>
         <tr className="bg-primary table-warning">
             <th className="text-center" scope="col">poll_id</th>
             <th className="text-center" scope="col">poll_options</th>
             <th className="text-center" scope="col">Users</th>
             <th className="text-center" scope="col">Vote</th>
             <th className="text-center" scope="col">delete</th>
         </tr>
       </thead>

       <tbody>
         
             {   filteredPoll &&
                 filteredPoll.map(poll => {
                     return (
                         <tr key={poll.id} value={poll.id} >
                             <td className="text-center">{poll.poll_id}</td>
                             <td className="text-center">{poll.poll_options}</td>
                             <td className="text-center">{poll.users}</td>
                             <td className="text-center">{poll.entries}</td>
                             <td className="text-center"><button type="submit" onClick={(e) => handleDelete(e, poll.id, poll.poll_id, poll.users, poll.entries)} className="btn btn-danger btn-sm ">Delete</button></td>
                         </tr>
                     )
                 })
             }
        
       </tbody>
     </table>
   </div>
     
     {/*  */}
    </div>
    )
}

export default DisplayPoll