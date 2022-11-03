import { useState} from 'react';
import axios from 'axios'; 
import { useNavigate} from 'react-router-dom'; 
import React from "react";

const AddRental = () => {

    const [title, setTitle] = useState(''); 
    const [streetAddress, setStreetAddress] = useState(''); 
    const [owner, setOwner] = useState(''); 
    const [location, setLocation] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [image, setImage] = useState(''); 
    const [city, setCity] = useState(''); 
    const [state, setState] = useState(''); 
    const [zipcode, setZipcode] = useState(''); 
    const [type, setType] = useState(''); 

    //set errors to useState object
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate(); 

    //define submitHandler
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/rentals/create`,{
            title, 
            streetAddress, 
            owner, 
            location, 
            description, 
            image, 
            city, 
            state, 
            zipcode,
            type
        },{withCredentials:true})
        .then((res)=>{
            console.log(res)
            navigate(`/api/agent/${res.data.agent}`)
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.error)
        })
    }

    return (
        <div>
            <div>
                <h1 className="addHeader">Add Rental Home</h1>
                {/* <Link to={`/user/${user.id}/dashboard`}>Dashboard</Link> */}
            </div>
            <div className="col-4 mx-auto">
                <form onSubmit={submitHandler}>
                    <div className="d-flex justify-content-between w-100">
                        <div className="form-group">
                            <label htmlFor="name">Title: </label>
                            <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                            />
                            {errors.title ? <span className="text-danger">{errors.title.message}</span> : null }<br></br>
                            <label htmlFor="name">Image URL: </label>
                            <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setImage(e.target.value)}
                                    value={image}
                                />
                            {errors.image ? <span className="text-danger">{errors.image.message}</span> : null }<br></br>
                            <label htmlFor="name">Owner: </label>
                            <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setOwner(e.target.value)}
                                    value={owner}
                                />
                                {errors.owner ? <span className="text-danger">{errors.owner.message}</span> : null }<br></br>
                            <label htmlFor="name">Location: </label>
                            <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setLocation(e.target.value)}
                                    value={location}
                                />
                            <label htmlFor="name">Description: </label>
                            <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                                {errors.description ? <span className="text-danger">{errors.description.message}</span> : null }<br></br>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Street Address: </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setStreetAddress(e.target.value)}
                                    value={streetAddress}
                                />
                                {errors.streetAddress ? <span className="text-danger">{errors.streetAddress.message}</span> : null }<br></br>
                            <label htmlFor="name">City: </label>
                            <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                />
                                {errors.city ? <span className="text-danger">{errors.city.message}</span> : null }<br></br>
                            <label htmlFor="name">State: </label>
                            <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setState(e.target.value)}
                                    value={state}
                                />
                                {errors.state ? <span className="text-danger">{errors.state.message}</span> : null }<br></br>
                                <label htmlFor="name">Zip Code: </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    onChange={(e) => setZipcode(e.target.value)}
                                    value={zipcode}
                                />
                                {errors.zipcode ? <span className="text-danger">{errors.zipcode.message}</span> : null }<br></br>
                                <label htmlFor="name">Type: </label>
                                <select className ="form-control" value={type} name="type" onChange ={(e)=> setType(e.target.value)}>
                                    <option>Select Rental Home Type</option>
                                    <option value="Apartment Complex">Apartment Complex</option>
                                    <option value="Luxury Condos">Luxury Condos</option>
                                    <option value="Single Family Home">Single Family Home</option>
                                    <option value="Twin Family Home">Twin Family Home</option>
                                    <option value="Row Home">Row Home</option>
                                    <option value="Rancher">Rancher</option>
                                </select>
                                {errors.type ? <span className="text-danger">{errors.type.message}</span> : null }<br></br>
                        </div>
                    </div>
                        <br/>
                        <div className="d-flex justify-content-around w-100">
                            <button className="navbuttons" type="submit">Submit</button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default AddRental
