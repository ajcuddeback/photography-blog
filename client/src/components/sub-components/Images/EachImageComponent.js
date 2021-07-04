import React from 'react';

// Dependencies
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const EachImageComponent = ({ image }) => {

    return (
        <StyledDiv>
            <Link to={'/images/' + image._id}>
                <img src={image.fileLink} alt={image.alttext} className='image' />
            </Link>
        </StyledDiv>
    )

}

const StyledDiv = styled.div`
    .image {
        max-width: 500px;
    }
    @media (max-width: 1065px) {
        .image {
            max-width: 400px;
        }
    }
    @media (max-width: 850px) {
        .image {
            max-width: 350px;
        }
    }
`

export default EachImageComponent;