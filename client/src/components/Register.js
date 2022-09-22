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
<<<<<<< HEAD
        firstname:'',
=======
        firstName:'',
>>>>>>> main
        lastName:'',
        email: '',
        password: '',
        confirmPassword:''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,[e.target.name]:e.target.value,
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
                    console.log(res)
                    navigate('/login')
                }
            })
            .catch(err=> console.log(err))
            setUserInfo({
                firstName:'',
                lastName:'',
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
                    <label className="form-label">First Name:</label>
                    <input className="form-control brcolor" type="text" name="firstName" value={userInfo.firstName} onChange={handleChange}/>
<<<<<<< HEAD
                    {ValErrors.firstName? <p className='text-danger'>{ValErrors.firstName.message}</p>:""}
=======
                    {ValErrors.firstName ? <p className='text-danger'>{ValErrors.firstName.message}</p>:""}
>>>>>>> main
                </div>
                <div>
                    <label className="form-label">Last Name:</label>
                    <input className="form-control brcolor" type="text" name="lastName" value={userInfo.lastName} onChange={handleChange}/>
<<<<<<< HEAD
                    {ValErrors.lastName? <p className='text-danger'>{ValErrors.firstName.message}</p>:""}
=======
                    {ValErrors.lastName ? <p className='text-danger'>{ValErrors.lastName.message}</p>:""}
>>>>>>> main
                </div>
                <div>
                    <label className="form-label">Email:</label>
                    <input className="form-control brcolor" type="text" name="email" value={userInfo.email} onChange={handleChange}/>
<<<<<<< HEAD
                    {ValErrors.email? <p className='text-danger'>{ValErrors.email.message}</p>:""}
=======
                    {ValErrors.email ? <p className='text-danger'>{ValErrors.email.message}</p>:""}
>>>>>>> main
                </div>
                <div>
                    <label className="form-label">Password:</label>
                    <input className="form-control brcolor" type="password" name="password" value={userInfo.password} onChange={handleChange}/>
<<<<<<< HEAD
                    {ValErrors.password? <p className='text-danger'>{ValErrors.password.message}</p>:""}
=======
                    {ValErrors.password ? <p className='text-danger'>{ValErrors.password.message}</p>:""}
>>>>>>> main
                </div>
                <div>
                    <label className="form-label">Confirm Password:</label>
                    <input className="form-control brcolor" type="password" name="confirmPassword" value={userInfo.confirmPassword} onChange={handleChange}/>
<<<<<<< HEAD
                    {ValErrors.confirmPassword? <p className='text-danger'>{ValErrors.confirmPassword.message}</p>:""}
=======
                    {ValErrors.confirmPassword ? <p className='text-danger'>{ValErrors.confirmPassword.message}</p>:""}
>>>>>>> main
                </div>
                    <button className='btn btn-info'>Register</button>
            </form>
        </div>
    )
}
export default Register