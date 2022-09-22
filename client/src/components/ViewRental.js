// import React from 'react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link }    from 'react-router-dom'; 

// const ViewRental = () => {
//     const [rentals, setRentals] = useState([]);
//     useEffect(() => {
//         axios.get('http://localhost:8000/api/rentals',{withCredentials: true} )
//             .then((res) => {setRentals(res.data);})
//             .catch((err) => {console.error("error in get all rentals", err);});
//     }, []);
//     return(// this show all the listing of all the rentals available 
//         <div style={{textAlign: 'center'}} className="card">
//             {rentals.map((rental) => (
//                 <div key={rental._id } className="card">
//                     <h3>Title: {rental.title}</h3>
//                     <p>streetAddress: {rental.description}</p>
//                     <p>owner: {rental.owner}</p>
//                     <p>location: {rental.location}</p>
//                     <p>city: {rental.city}</p>
//                     <p>state: {rental.state}</p>
//                     <p>zipcode: {rental.zipcode}</p>
//                     <p>state: {rental.state}</p>
//                     <p>type: {rental.type}</p>
//                     <Link to={`/viewOne/${rental._id}`}>
//                         Post By: {rental.agent.firstName} 
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default ViewRental