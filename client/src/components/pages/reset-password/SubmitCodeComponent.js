import React, { useState } from 'react';

//dependencies
import { confirmCode } from '../../../utils/API';
import styled from 'styled-components';
const SubmitCodeComponent = () => {

    const [code, setCode] = useState('');

    const handleInputChange = (event) => {
        setCode(event.target.value);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await confirmCode(code);

            if(!response) {
                throw new Error('Incorrect code!');
            }

            const data = await response.json();

            document.location.assign('/reset-pw')
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <StyledDiv>
            <h1>Your code has been sent</h1>
            <br/>
            <h2>Please check the email you provided for you 6 digit authorization code. Please enter it below</h2>
            <br></br>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="code">Code: </label>
                <input type="number" onChange={handleInputChange} value={code} name="code" />
                <button type="submit">Submit Code</button>
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

export default SubmitCodeComponent;