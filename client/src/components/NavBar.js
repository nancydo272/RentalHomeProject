import React from 'react';
import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { NavLink , Link} from 'react-router-dom';

const NavBar = ({isLoggedin}) => {
    const [user, setUser] = useState();
    useEffect(() => {
        const userToken = Cookies.get('userToken');
        console.log('USER TOKEN', userToken);
        if (userToken) {
            const user = jwtDecode(userToken);
            console.log('User Login', user);
            setUser(user);
            console.log('TOKEN', userToken);
        }
    }, [isLoggedin]);
    const handleLogout = () => {
        axios
            .post('http://localhost:8000/logout', {}, { withCredentials: true, },)
            .then((res) => {Cookies.remove('userToken');setUser(null);})
            .catch((err) => console.log('Logout Failed', err));
    };
    return ( // this is the nav bar when. When login it'll display user firstname
            //line 26-38 is when user login. Line 40-46 is when the user is log out
            // You can add link to register to login , to agentlisting 
        <div className="container">
            <header>
                <div>
                    {user ? (
                        <div>
                            <h3> Welcome Back Agent, {user.firstName}!</h3> 
                            <div className="d-flex justify-content-between">
                                <button><Link to={"/api/agent/" + user._id}>Dashboard</Link></button>   
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button>
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                            </button>
                            <button>
                                <NavLink className="nav-link" to="/register">
                                    Register
                                </NavLink>
                            </button>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default NavBar;
