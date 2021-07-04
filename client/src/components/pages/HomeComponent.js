import React, { useState, useEffect } from 'react';

// Dependencies
import { getFeaturedImage } from '../../utils/API';
import styled from 'styled-components';

// Components
import SpinnerComponent from '../sub-components/SpinnerComponent';

const HomeComponent = () => {

    const [featuredSrc, setFeaturedSrc] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        try {
            const response = await getFeaturedImage();

            if(!response) {
                console.log('No featured Image');
                throw new Error('No Featured Image!')
            }

            const photoData = await response.json();
            setFeaturedSrc(photoData.fileLink);
            setIsLoaded(true);

        } catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <StyledDiv>
            <h1>Welcome</h1>
            { isLoaded ? (<img src={featuredSrc} alt="" />) : (<SpinnerComponent />) }
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
    img {
        max-width: 800px;
    }
`

export default HomeComponent