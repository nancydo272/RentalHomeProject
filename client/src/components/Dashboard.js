import React from 'react'
import { useParams, Link, NavLink}    from 'react-router-dom'; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const Dashboard = ({isLoggedin}) => {

    const [rentalList, setRentalList] = useState([]); 
    const [user, setUser] = useState();
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

    useEffect(() => {
        const userToken = Cookies.get('userToken');
        console.log('USER TOKEN', userToken);
        if (userToken) {
            const user = jwtDecode(userToken);
            console.log('User Login', user);
            setUser(user);
            console.log('TOKEN', userToken);
        }
    }, [isLoggedin]);
    const handleLogout = () => {
        axios
            .post('http://localhost:8000/logout', {}, { withCredentials: true, },)
            .then((res) => {Cookies.remove('userToken');setUser(null);})
            .catch((err) => console.log('Logout Failed', err));
    };
    return (
        <div>
            <div>
            {user ? (
                        <div>
                            <h3 className="regHeader"> Welcome back {user.firstName}!</h3> 
                            <div className="d-flex justify-content-end">   
                                <button className="navbuttons"onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button className="navbuttons">
                                <NavLink className="nav-link text-white" to="/login">
                                    Login
                                </NavLink>
                            </button>
                            <button className="navbuttons">
                                <NavLink className="nav-link text-white" to="/register">
                                    Register
                                </NavLink>
                            </button>
                        </div>
                    )}
            </div>
                <table className="table">
                    <thead>
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
                            <tr  key={rental._id}>
                                <td>{rental.type}</td>
                                <td>{rental.streetAddress}</td>
                                <td>{rental.owner}</td>
                                <td>
                                    <div>
                                        <Link className="navbuttons p-2 text-decoration-none" to={"/editRental/" + rental._id}>Edit</Link>
                                        <Link className="navbuttons p-2 text-decoration-none" to={"/viewOne/" + rental._id}>View</Link>
                                        <button className="navbuttons p-1" onClick={()=>deleteHandler(rental._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>    
                        ))
                    }
                    </tbody>
                </table>
                <Link className="navbuttons p-2 text-decoration-none" to ={'/addRental'}>Add A New Rental</Link>
        </div>
    )
}

export default Dashboard
