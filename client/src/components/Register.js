import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Register() {
    const [userInfo, setUserInfo] = useState({
        username:'',
        email: '',
        password: '',
        confirmPassword:''
    })
    const [ValErrors, setValErrors] = useState({
        username:'',
        email: '',
        password: '',
        confirmPassword:''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({
            ...user,[e.target.name]:e.target.value,
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/register', userInfo,{withCredentials:true})
            .then((res)=>{
                console.log(res.data);
                if(res.data.errors){
                    console.log(res.data.errors)
                    setValErrors(res.data.errors)
                }else{
                    console.log("success!")
                    navigate('/')
                }

            })
            .catch(err=> console.log(err))
            setUserInfo({
                username:'',
                email: '',
                password: '',
                confirmPassword:''
            })
    };
return(
        <div className='font'>
            <h4 className='my-4 org'>Register Here:</h4>
            <form onSubmit={submitHandler} className="form-w mx-auto">
                <div>
                    <label className="form-label">Username:</label>
                    <input className="form-control brcolor" type="text" name="username" value={user.username} onChange={handleChange}/>
                    {ValErrors.username? <p className='text-danger'>{ValErrors. username.message}</p>:""}
                </div>
                <div>
                    <label className="form-label">Email:</label>
                    <input className="form-control brcolor" type="text" name="email" value={user.email} onChange={handleChange}/>
                    {ValErrors.email? <p className='text-danger'>{ValErrors.email.message}</p>:""}
                </div>
                <div>
                    <label className="form-label">Password:</label>
                    <input className="form-control brcolor" type="text" name="password" value={user.password} onChange={handleChange}/>
                </div>
                <div>
                    <label className="form-label">Confirm Password:</label>
                    <input className="form-control brcolor" type="text" name="confirmPassword" value={user.confirmPassword} onChange={handleChange}/>
                </div>
                    <button classname='btn btn-info'>Register</button>
            </form>
        </div>
    )
}
export default Register