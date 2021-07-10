import React from 'react';

const EachCommentComponent = ({ comment }) => {

    return (
        <>
            <h2>Username: {comment.displayName}</h2>
            <p>Comment: {comment.commentText}</p>
        </>
    )

}

export default EachCommentComponent;