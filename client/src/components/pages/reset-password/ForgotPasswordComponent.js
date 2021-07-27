import React, { useState } from 'react';

import { sendMail } from '../../../utils/API';
import styled from 'styled-components';

const ForgotPasswordComponent = () => {

    const [email, setEmail] = useState('');

    const handleInputChange = (event) => {
        setEmail(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await sendMail(email);

            if(!response) {
                throw new Error("something went wrong");
            }

            const data = await response.json();

            window.location.assign('/submit-code');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <StyledDiv>
            <h1>Please enter you email below so we can send you a one time code!</h1>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email: </label>
                <input onChange={handleInputChange} value={email} type="email" name="email" />
                <button type="submit">Send my Code</button>
            </form>
        </StyledDiv>
    )

}

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40vh;
`

export default ForgotPasswordComponent;