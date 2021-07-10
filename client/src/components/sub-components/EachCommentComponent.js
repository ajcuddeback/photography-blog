import React, { useEffect, useState } from 'react';

import { deleteComment } from '../../utils/API';
import Auth from '../../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

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
        <>
            <h2>Username: {comment.displayName}</h2>
            <p>Comment: {comment.commentText}</p>
            {isLoggedIn ? (<FontAwesomeIcon icon={faTrashAlt} onClick={handleCommentDelete} />) : ''}
        </>
    )

}

export default EachCommentComponent;