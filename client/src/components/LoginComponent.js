import React, { useState } from 'react';

// Dependencies
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { loginUser } from '../utils/API';
import styled from 'styled-components';

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

            localStorage.setItem('firstName', user.first_name);

            Auth.login(token);
            setIsLoggedIn(true);
            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <StyledLogin>
            <div>
                <img src={logo} alt="" />
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="username-wrapper">
                        <label htmlFor="username">Username: </label>
                        <input onChange={handleInputChange} type="text" name="username" id="username" />
                    </div>
                    
                    <div className="password-wrapper">
                        <label htmlFor="email">Password: </label>
                        <input onChange={handleInputChange} type="password" name="password" id="password" />
                    </div>

                    <button type="submit">Login</button>
                </form>
                <br />
                <Link to='/forgot-password'>Forgot Password?</Link>
            </div>
        </StyledLogin>
    )
}

const StyledLogin = styled.div`
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        form {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 200px;
            padding: 2rem;
            border: 2px solid #B030B0;
            border-radius: 7px;
            background-color: #202040;
            div {
                display: block;
            }
            button {
                
            }
        }
    }
`;

export default LoginComponent