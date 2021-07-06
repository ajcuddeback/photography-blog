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
        width: 90%;
    }
`

export default EachImageComponent;