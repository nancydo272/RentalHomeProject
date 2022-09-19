import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate} from 'react-router-dom'; 

const AddRental = () => {
    
    const [title, setTitle] = useState(''); 
    const [streetAddress, setStreetAddress] = useState(''); 
    const [owner, setOwner] = useState(''); 
    const [location, setLocation] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [image, sestImage] = useState(''); 
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
                <Link>Dashboard</Link>
            </div>
            <div>
                <form>
                    <div className="left-rental-form"></div>
                    <div className="right-rental-form"></div>
                </form>
            </div>
        </div>
    )
}

export default AddRental