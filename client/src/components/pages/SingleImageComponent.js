import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import { getSinglePhoto, postComment } from '../../utils/API';
import styled from 'styled-components';

// Components
import EachCommentComponent from '../sub-components/EachCommentComponent';
import SpinnerComponent from '../sub-components/SpinnerComponent';

const SingleImageComponent = ({ isLoggedIn }) => {
    
    const [image, setImage] = useState({});
    const [commentInput, setCommentInput] = useState({ displayName: '', commentText: '' });
    const [hasComments, setHasComments] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [commentLength, setCommentLength] = useState(0);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    let { id } = useParams();

    
    useEffect( async () => {
        const response = await getSinglePhoto(id)

        if(!response) {
            return new Error('No Photo at this ID!')
        }

        const data = await response.json();

        setImage(data);
        setSubmitted(false);
        setDeleteSuccess(false)

        if (data.comments.length < 1) {
            setHasComments(false);
        } else {
            setHasComments(true)
        }

        if(data.comments.length < 1) {
            setCommentLength(0);
        } else {
            setCommentLength(data.comments.length);
        }
        setIsLoaded(true);
    }, [submitted, deleteSuccess])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setCommentInput({...commentInput, [name]: value});
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await postComment(commentInput, id);

            if(!response) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            setCommentInput({ displayName: '', commentText: '' })
            setSubmitted(true);

        } catch (e) {
            console.error(e);
        }
    }
    
    return (
        <>
            {isLoaded ? (
                <StyledDiv>
                <div className="img-wrapper">
                    <img src={image.fileLink} alt={image.alttext} />
                </div>
                
                <div className="comments-wrapper">
                <h1>Comments</h1>
                    <div className="comments">
                        { hasComments ? image.comments.map(comment => (<EachCommentComponent comment={comment} commentLength={commentLength} photoId={id} setDeleteSuccess={setDeleteSuccess} isLoggedIn={isLoggedIn} />)) : (<h2 className="comment">No Commments here! Be the first to comment!</h2>) }
                    </div>
                    <div className="Comments-input">
                        <form onSubmit={handleFormSubmit}>
                            <label htmlFor="displayName">Username:</label>
                            <input onChange={handleInputChange} value={commentInput.displayName} type="text" name="displayName" required />
                            <label htmlFor="commentText">Comment:</label>
                            <textarea onChange={handleInputChange} value={commentInput.commentText} name="commentText" id="comment" cols="30" rows="10" required></textarea>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <br />
                </div>
            </StyledDiv>
            ) : (
                <SpinnerComponent />
            )}
        </>
        
    )
}

const StyledDiv = styled.div`
    .img-wrapper {
        display: flex;
        justify-content: center;
        img {
            margin-top: 2rem;
            width: 40%;
            margin-bottom: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transition: 0.5s;
            border-radius: 3px;
            @media (max-width: 550px) {
                width: 80%;
            }
            &:hover {
                transform: scale(1.01);
            }
        }
    }
    .comments-wrapper {
        border: 1px solid white;
        border-radius: 5px;
        max-width: 70%;
        margin: 0 auto;
        padding: 2rem;
        margin-bottom: 2rem;
        display: flex;
        flex-direction: column;
        background-color: #0e0e52;
        .comments {
            .comment {
                background-color: #202060;
                margin-bottom: 1rem;
                padding: .5rem;
            }
        }
        .Comments-input {
            form {
                display: flex;
                flex-direction: column;
                input, textarea {
                    margin-bottom: 1rem;
                }
            }
        }
    }
`

export default SingleImageComponent