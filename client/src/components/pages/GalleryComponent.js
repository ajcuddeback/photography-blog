import React, { useEffect, useState } from 'react';

// Dependencies
import { getAllImages } from '../../utils/API';

const GalleryComponent = () => {
    
    const [images, setImages] = useState([])

    useEffect( async () => {
        const response = await getAllImages();

        if(!response) {
            throw new Error('No images to display!')
        }
        
        let data = await response.json();
        setImages(data)
    }, [])

    return (
        <>
            
        </>
    )

}

export default GalleryComponent