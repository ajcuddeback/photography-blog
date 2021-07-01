import React, { useEffect, useState } from 'react';

import { getTags } from '../utils/API';

import TagsComponent from './TagsComponent';

const AdminComponent = () => {
    const [firstName, setFirstName] = useState('')
    const [tags, setTags] = useState([])
    
    useEffect(async () => {
        setFirstName(localStorage.getItem('firstName'));
        try {
            const response = await getTags();

            if(!response.ok) {
                throw new Error('No tags found!');
            }

            const tags = await response.json();

            setTags(tags);
        } catch (err) {
            console.log(err)
        }
    }, [])
    return (
        <>
            <h1>Welcome back {firstName}</h1>
            <h2>Add an image:</h2>
            <form>
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" />
                <label htmlFor="description">Description</label>
                <input type="text" name="description" />
                <label htmlFor="alttext">Alt Text: </label>
                <input type="text" name="alttext" />
                <label htmlFor="price">Price</label>
                <input type="number" name="price" />
                <label htmlFor="tag">Associate Tag: </label>
                <select name="tag" id="tag">
                    {tags.map(tag => (<TagsComponent tag={tag} />))}
                </select>
                <label htmlFor="img">Image: </label>
                <input type="file" name="img" />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AdminComponent