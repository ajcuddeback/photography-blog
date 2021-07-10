import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSinglePhoto } from '../../utils/API';

const SingleImageComponent = () => {
    
    const [image, setImage] = useState({})
    let { id } = useParams()

    
    useEffect( async () => {
        try {
            const response = await getSinglePhoto(id)

            if(!response) {
                return new Error('No Photo at this ID!')
            }

            const data = await response.json();

            setImage(data);

            console.log(image)

            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }, [])
    
    return (
        <>
            <img src={image.fileLink} alt="" />
        </>
    )
}

export default SingleImageComponent