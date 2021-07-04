import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import './style.css';

// Dependencies
import { getAllImages } from '../../utils/API';

// Components
import EachImageComponent from '../sub-components/Images/EachImageComponent';

const GalleryComponent = () => {
    
    const [images, setImages] = useState([])

    useEffect( async () => {
        const response = await getAllImages();

        if(!response) {
            throw new Error('No images to display!')
        }
        
        let data = await response.json();
        setImages(data)
    }, []);

    const breakpointColumnsObj = {
        default: 3,
        1520: 3,
        1500: 2,
        700: 1
      };

    return (
        <>
            <Masonry  breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                { images.map(image => (<EachImageComponent image={image} key={images._id} />)) }
            </Masonry>
        </>
    )

}

export default GalleryComponent