import React, { useEffect, useState } from 'react';

// Dependencies
import { getAllImages } from '../../utils/API';
import styled from 'styled-components';

// Components
import EachImageComponent from '../sub-components/Images/EachImageComponent';

const GalleryComponent = () => {
    
    const [images, setImages] = useState([])

    useEffect( async () => {
        const response = await getAllImages();

        if(!response) {
            throw new Error('No images to display!')
        }
        
        let data = await response.json();
        setImages(data)
    }, []);

    return (
        <StyledDiv>
            <div className='container'>
                { images.map(image => (<EachImageComponent image={image} key={images._id} />)) }
            </div>
        </StyledDiv>
    )

}

const StyledDiv = styled.div`
    .container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 0px;
    }
    @media (max-width: 890px) {
        .container {
            grid-template-columns: 1fr 1fr;
        }
    }
    @media (max-width: 550px) {
        .container {
            grid-template-columns: 1fr;
        }
    }
`

export default GalleryComponent