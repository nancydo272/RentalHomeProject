import React from 'react'
import { useParams, Link }    from 'react-router-dom'; 
import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {

    const [rentalList, setRentalList] = useState([]); 
    const { id } = useParams(); 
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/agent/${id}`,{ withCredentials: true })
            .then((res)=>{console.log(res.data);setRentalList(res.data)})
            .catch((err)=>{
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
                <table className="table">
                    <thead className ="thead-dark">
                        <tr>
                            <th>Rental Type</th>
                            <th>Address</th>
                            <th>Owner</th>
                            <th>Actions</th>
                        </tr>    
                    </thead> 
                    <tbody>
                    {
                        rentalList.map((rental)=>(
                            <tr key={rental.id}>
                                <td>{rental.type}</td>
                                <td>{rental.streetAddress}</td>
                                <td>{rental.owner}</td>
                                <td>
                                    <div>
                                        <button><Link to={"/editRental/" + rental._id}>Edit</Link></button>
                                        <button><Link to={"/viewOne/" + rental._id}>View</Link></button>
                                        <button onClick={()=>deleteHandler(rental._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>    
                        ))
                    }
                    </tbody>
                </table>
                <Link to ={'/addRental'}>Add A New Rental</Link>
        </div>
    )
}

export default Dashboard