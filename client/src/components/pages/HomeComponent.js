import React, { useEffect, useState } from 'react';

// Dependencies
import { getTags, getAllImages, getFeaturedImage } from '../../utils/API';
import styled from 'styled-components';

// Components
import EachImageComponent from '../sub-components/Images/EachImageComponent';
import TagsComponent from '../sub-components/TagsComponent';
import SpinnerComponent from '../sub-components/SpinnerComponent';

const GalleryComponent = ({ isLoggedIn }) => {
    const [images, setImages] = useState([]);
    const [featuredImage, setFeaturedImage] = useState();
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('All');
    const [isAll, setIsAll] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect( async () => {
        const response = await getAllImages();

        if(!response) {
            throw new Error('No images to display!')
        }
        
        let data = await response.json();
        setImages(data);

        try {
            const response = await getFeaturedImage();

            if(!response) {
                throw new Error('No featured Image!');
            }

            let data = await response.json();
            setFeaturedImage(data.fileLink);
        } catch (error) {
            console.error(error);
        }

        try {
            // Get all tags and parse them and save them to state for use in the select form
            const response = await getTags();

            if(!response.ok) {
                throw new Error('No tags found!');
            }

            const tags = await response.json();
            tags.unshift({tagName: "All"});

            setTags(tags);
            setIsLoaded(true)
        } catch (err) {
            console.log(err)
        }
        setDeleteSuccess(false);
        
    }, [selectedTag, deleteSuccess]);

    const handleSelectChange = async (e) => {
        setSelectedTag(e.target.value)
        if(e.target.value === 'All') {
            setIsAll(true);
        } else {
            setIsAll(false)
        }
        images.filter(img => img.tags.tagName !== selectedTag).map(image => console.log('-------' , image))
    }

    return (
        <StyledDiv>
            {isLoaded ? (
            <>
                <div className="welcome-wrapper">
                    <h1>Welcome to NC Photograhy Group!</h1>
                    <img src={featuredImage} alt="featured image" className="featured-img" />
                </div>
                <div>
                    <select onChange={handleSelectChange} name="tagsIndex" id="tag">
                        { tags.map(tag => (<TagsComponent tag={tag} key={tag._id} />)) }
                    </select>
                </div>
                <StyledImages>
                    { isAll ? images.map(image => (<EachImageComponent image={image} isLoggedIn={isLoggedIn} setDeleteSuccess={setDeleteSuccess} key={images._id} />)) : images.filter(img => img.tags.tagName === selectedTag).map(image => (<EachImageComponent image={image} key={images._id} />)) }
                </StyledImages>
            </>
            ) : (
                <SpinnerComponent />
            )}
             
        </StyledDiv>
    )

}

const StyledImages = styled.div`
    margin-top: 1rem;
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
const StyledDiv = styled.div`
    .welcome-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 3rem;
        h1 {
            margin-bottom: 1rem;
        }
        img {
        width: 70%;
        }
    }
    
`

export default GalleryComponent