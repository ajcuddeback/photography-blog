import React, { useState } from 'react';

import { resetPw } from '../../../utils/API';
import styled from 'styled-components';

const ResetPWComponent = () => {

    const [passwordData, setPasswordData] = useState({ email: '', password: '', confirmPassword: '' });
    const [samePassword, setSamePassword] = useState(true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if(passwordData.password === passwordData.confirmPassword) {
            try {

                const response = await resetPw(passwordData.email, passwordData.password);

                if(!response) {
                    throw new Error('Something went wrong!');
                }

                const data = await response.json();

                document.location.assign('/login')
            } catch (error) {
                console.error(error);
            }
        } else {
            setSamePassword(false);
        }
    }

    return (
        <StyledDiv>
            <h2>Reset your password!</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email: </label>
                <input onChange={handleInputChange} value={passwordData.email} type="email" name="email" />
                <label htmlFor="password">Enter your new Password: </label>
                <input onChange={handleInputChange} value={passwordData.password} type="password" name="password" />
                <label htmlFor="confirmPassword">Confirm your password: </label>
                <input onChange={handleInputChange} value={passwordData.confirmPassword} type="password" name="confirmPassword" />
                <button type="submit">Submit</button>
            </form>
            <div>
                {samePassword ? '' : <p>Password do not match!</p>}
            </div>
        </StyledDiv>
    )

}
const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40vh;
    form {
        display: flex;
        flex-direction: column;
        input {
            margin-bottom: 1rem;
        }
    }
    div {
        p {
            padding:.5rem;
            border: 1px solid white;
            background-color: red;
            color: black
        }
    }
`
export default ResetPWComponent;