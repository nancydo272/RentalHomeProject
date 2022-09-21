import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate} from 'react-router-dom'; 

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
        axios.post('http://localhost:8000/api/rentals/create', {
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
            navigate('/user/:id/dashboard')
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.error)
        })
    }
    return (
        <div>
            <div>
                <h1>Add Rental Home</h1>
                {/* <Link to={`/user/${user.id}/dashboard`}>Dashboard</Link> */}
            </div>
            <div className="row d-flex">
                <form onSubmit={submitHandler}>
                    <div className="col">
                    <label className="form-label">Title:</label>
                        <input className ="form-control" type="text" onChange ={(e)=> setTitle(e.target.value)} />
                        {errors.title ? <span className="text-danger">{errors.title.message}</span> : null }<br></br>
                        <label className="form-label">Image:</label>
                        <input className ="form-control" type="text" onChange ={(e)=> setImage(e.target.value)} />
                        <label className="form-label">Owner:</label>
                        <input className ="form-control" type="text" onChange ={(e)=> setOwner(e.target.value)} />
                        {errors.image ? <span className="text-danger">{errors.image.message}</span> : null }<br></br>
                        <label className="form-label">Location:</label>
                        <input className ="form-control" type="text" onChange ={(e)=> setLocation(e.target.value)} />
                        {errors.location ? <span className="text-danger">{errors.location.message}</span> : null }<br></br>
                        <label className="form-label">Description:</label>
                        <input className ="form-control" type="text" onChange ={(e)=> setDescription(e.target.value)} />
                        {errors.description ? <span className="text-danger">{errors.description.message}</span> : null }<br></br>
                    </div>
                    <div className="col">
                    <label className="form-label">Street Address:</label>
                        <input className ="form-control" type="text" onChange ={(e)=> setStreetAddress(e.target.value)} />
                        {errors.streetAddress ? <span className="text-danger">{errors.streetAddress.message}</span> : null }<br></br>
                        <label className="form-label">City:</label>
                        <input className ="form-control" type="text" onChange ={(e)=> setCity(e.target.value)} />
                        {errors.city ? <span className="text-danger">{errors.city.message}</span> : null }<br></br>
                        <label className="form-label">State:</label>
                        <input className ="form-control" type="text" onChange ={(e)=> setState(e.target.value)} />
                        {errors.state ? <span className="text-danger">{errors.state.message}</span> : null }<br></br>
                        <label className="form-label">Zipcode:</label>
                        <input className ="form-control" type="number" onChange ={(e)=> setZipcode(e.target.value)} />
                        {errors.zipcode ? <span className="text-danger">{errors.zipcode.message}</span> : null }<br></br>
                        <label className="form-label">Type:</label>
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
                    <div>
                        <button className="btn btn-info">Create Rental Home</button>
                        <button className="btn btn-info">Cancel</button>
                        {/* <Link to={`/user/${user.id}/dashboard`}>Dashboard</Link> */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddRental