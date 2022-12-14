import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Login = ({isLoggedin, setIsLoggedIn}) => {

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
        axios.post(`http://localhost:8000/login`,user,{withCredentials:true})
        .then((res)=>{
            console.log(res)
            navigate(`/api/agent/${res.data.user._id}`)
        })
        .catch(err=> {
            setValErrors(err.response.data)
            console.log(err)
        })
    }; 

    return (
        <div className='col-4 mx-auto'>
            <h4 className='regHeader'>Login Here</h4>
            <form onSubmit={submitHandler} className='form-w mx-auto'>
                <div>
                    <label className="form-label">Email:</label>
                    <input className='form-control brcolor' type="text" name="email" value={user.email} onChange={handleChange}/>
                </div>
                <div>
                    <label className="form-label">Password:</label>
                    <input  className='form-control brcolor' type="password" name="password" value={user.password} onChange={handleChange}/>
                    {valErrors? <p className='text-danger'>{valErrors.message}</p>:""}
                </div>
                    <button className='navbuttons p-2'>Login</button>
            </form>
            {/* <Link to={/register}><button className='text-reset btn mt-3'>Register here!</button></Link> */}
        </div>
    )
}


export default Login