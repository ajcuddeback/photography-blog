import React, { useEffect, useState } from 'react';

// Dependencies
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { deleteImage } from '../../../utils/API';
import Auth from '../../../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import "animate.css"
import AOS from 'aos';

const EachImageComponent = ({ image, isLoggedIn, setDeleteSuccess }) => {
    //State
    const [token, setToken] = useState();
    
    useEffect( async() => {
        const data = await Auth.getToken();
        if(data) {
            setToken(data)
        }
        AOS.init();
    }, []);

    const handleDeleteImage = async () => {
        const response = await deleteImage(image.s3_key, token);

        if(!response) {
            throw new Error("You are not authorized to complete this action!")
        }

        const data = await response.json();
        setDeleteSuccess(true);
    }

    return (
        <StyledDiv>
           <div data-aos="fade-up">
                <Link to={'/images/' + image._id}>
                    <LazyLoadImage src={image.fileLink} alt={image.alttext} className='image' />
                </Link>
                {isLoggedIn ? (<FontAwesomeIcon icon={faTrashAlt} onClick={handleDeleteImage} className="delete-icon" />) : ''}
            </div>
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
        @media (max-width: 400px) {
            width: 80%;
        }
        &:hover {
            transform: scale(1.03);
        }
   }
   .delete-icon {
       position: relative;
       bottom: 2rem;
       right: 2rem;
       color: red;
       width: 25px;
       height: 25px;
       &:hover {
           cursor: pointer;
       }
       @media (max-width: 1500px) {
            right: 0rem;
            bottom: 4rem;
        }
        @media (max-width: 630px) {
            bottom: 2rem;
            right: 2rem;
        }
        @media (max-width: 450px) {
            bottom: 4rem;
            right: -22rem;;
        }
        @media (max-width: 403px) {
            bottom: 2rem;
            right: 2rem;
        }
   }
`

export default EachImageComponent;