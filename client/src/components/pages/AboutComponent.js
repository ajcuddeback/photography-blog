import React from 'react';
import Profile from '../../images/Profile.jpg'

//Dependencies
import styled from 'styled-components';

const AboutComponent = () => {
    
    return (
        <StyledDiv>
            <img src={Profile} alt="Nikki's Profile Picture" />
            <h2>Nichole Cuddeback</h2>
            <p>Hello! My name is Nichole Cuddeback, and I am a small photographer trying to put myself out there. I have been doing photography for 6 years, almost 7. It is my passion and my dream. I wanted to share my best work with you. I hope you enjoy!</p>
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        margin-top: 3rem;
        border-radius: 50%;
        width: 30%;
        @media (max-width: 900px) {
            width: 40%;
        }
        @media (max-width: 800px) {
            width: 50%;
        }
        @media (max-width: 600px) {
            width: 60%;
        }
    }
    p {
        width: 30%;
        text-align: center;
        @media (max-width: 900px) {
            width: 40%;
        }
        @media (max-width: 800px) {
            width: 50%;
        }
        @media (max-width: 600px) {
            width: 60%;
        }
    }
`

export default AboutComponent;