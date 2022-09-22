import React from 'react';
import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { NavLink } from 'react-router-dom';

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
                <div style={{display: 'flex',justifyContent: 'space-around',}}>
                    {user ? (
                        <div>
                            <p> Welcome back {user.firstName}</p>    
                            <button onClick={handleLogout}>Logout</button>
                            <NavLink className="nav-link" to="/addRental">
                                    Created Listing
                            </NavLink>
                        </div>
                    ) : (
                        <div>
                            <button>
                                <NavLink className="nav-link" to="/login">
                                    Login
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