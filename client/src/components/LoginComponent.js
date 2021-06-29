import React, { useState } from 'react';

// Dependencies
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { loginUser } from '../utils/API';

// Images
import logo from '../images/logo1.jpg'

const LoginComponent = ({ setIsLoggedIn }) => {

    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await loginUser(formData);

            if(!response.ok) {
                throw new Error('something went wrong');
            }

            const { token, user } = await response.json();

            Auth.login(token);
            setIsLoggedIn(true);
            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div>
                <img src={logo} alt="" />
                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="username">Username:</label>
                    <input onChange={handleInputChange} type="text" name="username" id="username" />
                    <label htmlFor="email">Password:</label>
                    <input onChange={handleInputChange} type="password" name="password" id="password" />
                    <button type="submit">Login</button>
                </form>
                <Link to='/forgot-password'>Forgot Password?</Link>
            </div>
        </>
    )
}

export default LoginComponent