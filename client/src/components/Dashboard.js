import React, {useState, useEffect} from 'react'; 
import axios from 'axios'; 
import {useParams, Link} from 'react-router-dom'; 

const Dashboard = () => {

    const [rentalList, setRentalList] = useState([]); 
    const [agent, setAgent] = useState({}); 
    const {id} = useParams(); 

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/agent/${id}`)
        .then((res)=>{
            setRentalList(res.data)
            setAgent(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])
    
    const deleteHandler =(id)=>{
        axios.delete(`http://localhost:8000/api/rentals/${id}`)
        .then((res)=>{
            const newRentalList = rentalList.filter((rental)=>{
                return rental._id !== id
            })
            setRentalList(newRentalList)
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            <div>
                <h1>Welcome, ${agent.firstName}! </h1>
                <Link to="/logout">Logout</Link>
            </div>
            <div>
                <table>
                    <tr>
                        <th>Rental Type</th>
                        <th>Address</th>
                        <th>Owner</th>
                        <th>Actions</th>
                    </tr>
                    {
                        rentalList.map((rental)=>(
                            <tr>
                                <td>{rental.type}</td>
                                <td>{rental.streetAddress}</td>
                                <td>{rental.owner}</td>
                                <td>
                                    <div>
                                        <Link to={`/rental/${rental._id}`}>View</Link>
                                        <button onClick={()=>deleteHandler(rental._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>    
                        ))
                    }
                </table>
                <Link to ={'/addRental'}>Add A New Rental</Link>
            </div>
        </div>
    )
}

export default Dashboard