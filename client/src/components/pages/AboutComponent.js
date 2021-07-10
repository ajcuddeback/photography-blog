import React from 'react';
import Profile from '../../images/Profile.jpg'

//Dependencies
import styled from 'styled-components';

const AboutComponent = () => {
    
    return (
        <StyledDiv>
            <img src={Profile} alt="Nikki's Profile Picture" />
            <h2>Nikki Cuddeback</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi temporibus facilis laboriosam praesentium necessitatibus dolore voluptates cupiditate deleniti, numquam itaque perspiciatis alias nisi. Quibusdam facere sint incidunt dolores, distinctio sed dignissimos, quia dicta soluta repellendus ut, in vel ratione. Officiis placeat sequi corporis, incidunt ab non a quod doloribus laudantium cum quis aliquam. Alias doloremque pariatur repellat laborum iste rem sed magni provident quibusdam unde. Rem, possimus provident. Accusantium veniam adipisci ab. Suscipit officiis quos facilis rem quae sint necessitatibus.</p>
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
    }
    p {
        width: 30%;
        text-align: center;
    }
`

export default AboutComponent;