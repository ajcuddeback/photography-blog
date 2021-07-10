import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import { getSinglePhoto } from '../../utils/API';
import styled from 'styled-components';

const SingleImageComponent = () => {
    
    const [image, setImage] = useState({});
    const [commentInput, setCommentInput] = useState({ displayName: '', commentText: '' });
    let { id } = useParams()

    
    useEffect( async () => {
        try {
            const response = await getSinglePhoto(id)

            if(!response) {
                return new Error('No Photo at this ID!')
            }

            const data = await response.json();

            setImage(data);
        } catch (error) {
            console.error(error)
        }
    }, [])
    
    return (
        <StyledDiv>
            <div className="img-wrapper">
                <img src={image.fileLink} alt={image.alttext} />
            </div>
            <h2>Comments</h2>
            <div className="comments-wrapper">
                <div className="comments">
                    
                </div>
                <div className="Comments-input">
                    <form>
                        <label htmlFor="displayName">Name:</label>
                        <input type="text" name="displayName" />
                        <label htmlFor="commentText">Comment:</label>
                        <textarea name="commentText" id="comment" cols="30" rows="10"></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <br />
            </div>
        </StyledDiv>
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
            &:hover {
                transform: scale(1.01);
            }
        }
    }
`

export default SingleImageComponent