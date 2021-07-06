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
        <>
            <StyledDiv>
                { images.map(image => (<EachImageComponent image={image} key={images._id} />)) }
            </StyledDiv>
        </>
    )

}

const StyledDiv = styled.div`
    columns: 4;
    column-gap: 2px;
    @media (max-width: 2000px) {
        columns: 3;
    }
    @media (max-width: 850px) {
        columns: 2;
    }
    @media (max-width: 700px) {
        columns: 1;
    }
`

export default GalleryComponent