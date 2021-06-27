import React from 'react';

// Dependencies
import { Link } from 'react-router-dom';

// Images
import logo from '../images/logo.jpg'

const LoginComponent = () => {

    return (
        <>
            <div>
                <img src={logo} alt="" />
                <form className="login-form">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" />
                    <label htmlFor="email">Password:</label>
                    <input type="password" name="password" id="password" />
                    <button type="submit">Login</button>
                </form>
                <Link to='/forgot-password'>Forgot Password?</Link>
            </div>
        </>
    )
}

export default LoginComponent