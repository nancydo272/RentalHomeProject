import React, {useState, useEffect} from 'react'; 
import {useParams, useNavigate} from 'react-router-dom'; 
import axios from 'axios'; 

const EditRental = () => {
    
    const {id} = useParams(); 
    const navigate = useNavigate(); 
    const [errors, setErrors] = useState({}); 

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
    
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/rentals/${id}`)
        .then((res)=>{
            console.log(res.data); 
            setTitle(res.data.title); 
            setStreetAddress(res.data.streetAddress); 
            setOwner(res.data.owner); 
            setLocation(res.data.location); 
            setDescription(res.data.description); 
            setImage(res.data.image); 
            setCity(res.data.city); 
            setState(res.data.state); 
            setCity(res.data.city); 
            setZipcode(res.data.zipcode); 
            setType(res.data.type); 
        }).catch((err)=>{
            console.log(err)
        })
    }, [])

    const editHandler =(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/rentals/${id}`,{
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
        })
        .then((res)=>{
            console.log(res)
            // navigate('/user/${user.id}/dashboard')
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            <div>
                <h1>Edit Rental Home</h1>
                {/* <Link to={`/user/${user.id}/dashboard`}>Dashboard</Link> */}
            </div>
            <div className="row d-flex">
                <form onSubmit={editHandler}>
                    <div className="col">
                    <label className="form-label">Title:</label>
                        <input value ={title}className ="form-control" type="text" onChange ={(e)=> setTitle(e.target.value)} />
                        {errors.title ? <span className="text-danger">{errors.title.message}</span> : null }<br></br>
                        <label className="form-label">Image:</label>
                        <input value ={image} className ="form-control" type="text" onChange ={(e)=> setImage(e.target.value)} />
                        <label className="form-label">Owner:</label>
                        <input value ={owner} className ="form-control" type="text" onChange ={(e)=> setOwner(e.target.value)} />
                        {errors.image ? <span className="text-danger">{errors.image.message}</span> : null }<br></br>
                        <label className="form-label">Location:</label>
                        <input value ={location} className ="form-control" type="text" onChange ={(e)=> setLocation(e.target.value)} />
                        {errors.location ? <span className="text-danger">{errors.location.message}</span> : null }<br></br>
                        <label className="form-label">Description:</label>
                        <input value ={description} className ="form-control" type="text" onChange ={(e)=> setDescription(e.target.value)} />
                        {errors.description ? <span className="text-danger">{errors.description.message}</span> : null }<br></br>
                    </div>
                    <div className="col">
                    <label className="form-label">Street Address:</label>
                        <input value ={streetAddress} className ="form-control" type="text" onChange ={(e)=> setStreetAddress(e.target.value)} />
                        {errors.streetAddress ? <span className="text-danger">{errors.streetAddress.message}</span> : null }<br></br>
                        <label className="form-label">City:</label>
                        <input value ={city} className ="form-control" type="text" onChange ={(e)=> setCity(e.target.value)} />
                        {errors.city ? <span className="text-danger">{errors.city.message}</span> : null }<br></br>
                        <label className="form-label">State:</label>
                        <input value ={state} className ="form-control" type="text" onChange ={(e)=> setState(e.target.value)} />
                        {errors.state ? <span className="text-danger">{errors.state.message}</span> : null }<br></br>
                        <label className="form-label">Zipcode:</label>
                        <input value ={zipcode} className ="form-control" type="number" onChange ={(e)=> setZipcode(e.target.value)} />
                        {errors.zipcode ? <span className="text-danger">{errors.zipcode.message}</span> : null }<br></br>
                        <label className="form-label">Type:</label>
                        <select value ={type} className ="form-control" name="type" onChange ={(e)=> setType(e.target.value)}>
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
                    <div>
                        <button className="btn btn-info">Update Rental Home</button>
                        <button className="btn btn-info">Cancel</button>
                        {/* <Link to={`/user/${user.id}/dashboard`}>Dashboard</Link> */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditRental