import React from 'react';

const EachImageComponent = ({ image }) => {

    return (
        <>
            <img src={image.fileLink} alt={image.alttext} />
        </>
    )

}

export default EachImageComponent;