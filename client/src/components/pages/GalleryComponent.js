import React, { useEffect, useState } from 'react';

// Dependencies
import { getTags, getAllImages } from '../../utils/API';
import styled from 'styled-components';

// Components
import EachImageComponent from '../sub-components/Images/EachImageComponent';
import TagsComponent from '../sub-components/TagsComponent';

const GalleryComponent = () => {
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('All')
    const [isAll, setIsAll] = useState(true)

    useEffect( async () => {
        const response = await getAllImages();

        if(!response) {
            throw new Error('No images to display!')
        }
        
        let data = await response.json();
        setImages(data);

        try {
            // Get all tags and parse them and save them to state for use in the select form
            const response = await getTags();

            if(!response.ok) {
                throw new Error('No tags found!');
            }

            const tags = await response.json();
            tags.unshift({tagName: "All"});

            setTags(tags);
        } catch (err) {
            console.log(err)
        }
        
    }, [selectedTag]);

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
        <>
             <select onChange={handleSelectChange} name="tagsIndex" id="tag">
                { tags.map(tag => (<TagsComponent tag={tag} key={tag._id} />)) }
            </select>
            <StyledDiv>
                { isAll ? images.map(image => (<EachImageComponent image={image} key={images._id} />)) : images.filter(img => img.tags.tagName === selectedTag).map(image => (<EachImageComponent image={image} key={images._id} />)) }
            </StyledDiv>
        </>
    )

}

const StyledDiv = styled.div`
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

export default GalleryComponent