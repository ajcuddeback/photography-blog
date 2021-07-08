import React, { useEffect } from 'react';

// Dependencies
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const EachImageComponent = ({ image }) => {
    useEffect(() => {
        console.log(image)
    }, [])

    return (
        <StyledDiv>
            
            <Link to={'/images/' + image._id}>
            <h1>{image.tags.tagName}</h1>
                <img src={image.fileLink} alt={image.alttext} className='image' id={image.tags.tagName } />
            </Link>
        </StyledDiv>
    )

}

const StyledDiv = styled.div`
   .image {
       width: 95%;
        margin-bottom: 20px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        transition: 0.5s;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
            transform: scale(1.03);
        }
   }
`

export default EachImageComponent;