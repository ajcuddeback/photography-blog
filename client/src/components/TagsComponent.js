import React from 'react';

const TagsComponent = ({ tag }) => {

    return (
        <>
            <option>{tag.tagName}</option>
        </>
    )

}

export default TagsComponent;