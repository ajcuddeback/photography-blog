import React, { useState } from 'react';

import { sendMail } from '../../../utils/API';

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
        <>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email: </label>
                <input onChange={handleInputChange} value={email} type="email" name="email" />
                <button type="submit">Send my Code</button>
            </form>
        </>
    )

}

export default ForgotPasswordComponent;