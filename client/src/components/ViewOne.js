
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useParams }    from 'react-router-dom'; 

const ViewOne = (props) => {
    const [rentals, setRentals] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/rentals/${id}` )
            .then((res) => {setRentals(res.data);})
            .catch((err) => {console.error("error in get all rentals", err);});
    }, [id]);
    return(// this show all the listing of all the rentals available 
        <div className='card'>
            <h3>Title: {rentals.title}</h3>
            <p>streetAddress: {rentals.description}</p>
            <p>owner: {rentals.owner}</p>
            <p>location: {rentals.location}</p>
            <p>city: {rentals.city}</p>
            <p>state: {rentals.state}</p>
            <p>zipcode: {rentals.zipcode}</p>
            <p>state: {rentals.state}</p>
            <p>type: {rentals.type}</p>    
        </div>
    );
}

export default ViewOne