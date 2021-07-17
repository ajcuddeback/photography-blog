import React, { useEffect, useState } from 'react';

import { deleteComment } from '../../utils/API';
import Auth from '../../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const EachCommentComponent = ({ comment, photoId, isLoggedIn, setDeleteSuccess }) => {

    const [token, setToken] = useState();

    useEffect(async () => {
        const data = await Auth.getToken();

        if(data) {
            setToken(data);
        }

    }, [])

    const handleCommentDelete = async () => {
        const response = await deleteComment(comment._id, photoId, token);

        if(!response) {
            throw new Error('Something went wrong!');
        }

        const data = await response.json();
        setDeleteSuccess(true);
    }

    return (
        <StyledDiv>
            <h2>{comment.displayName}</h2>
            <p>{comment.commentText}</p>
            {isLoggedIn ? (<FontAwesomeIcon icon={faTrashAlt} onClick={handleCommentDelete} className="icon" />) : ''}
        </StyledDiv>
    )

}

const StyledDiv = styled.div`
    background-color: #202060;
    margin-bottom: 1rem;
    padding: .5rem;
    .icon {
        position: relative;
        float: right;
        bottom: 2rem;
        color: red;
        &:hover {
            cursor: pointer;
        }
    }
`

export default EachCommentComponent;