import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Login = ({isLoggedin, setIsLoggedIn}) => {

    const { id } = useParams();
    const navigate= useNavigate()
    const [valErrors, setValErrors] = useState('')
    const [user,setUser] = useState({
        email:'',
        password:'',
    
    })
    const handleChange = (e) => {
        setUser ({
            ...user, [e.target.name]:e.target.value,
        });
    };
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/login`,
        user,
        {withCredentials:true})
        .then((res)=>{
            console.log(res)
            navigate("/agent/:id")
        })
        .catch(err=> {
            setValErrors(err.response.data)
            console.log(err)
        })
    }; 

    useEffect(()=>{
        axios.get(`http://localhost:8000/agent/${id}`,{ withCredentials: true })
            .then((res)=>{
                console.log(res.data);
                setUser(res.data)})
            .catch((err)=>{
                console.log(err)
            })
    }, [])

    return (
        <div className='font'>
            <h4 className='my-4 org'>Login Here:</h4>
            <form onSubmit={submitHandler} className='form-w mx-auto'>
                <div>
                    <label>Email:</label>
                    <input className='form control brcolor' type="text" name="email" value={user.email} onChange={handleChange}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input  className='form control brcolor' type="password" name="password" value={user.password} onChange={handleChange}/>
                    {valErrors? <p className='text-danger'>{valErrors.message}</p>:""}
                </div>
                    <button className='btn btn-secondary'>Login</button>
            </form>
            {/* <Link to={/register}><button className='text-reset btn mt-3'>Register here!</button></Link> */}
        </div>
    )
}


export default Login