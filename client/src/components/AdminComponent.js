import React, { useEffect, useState } from 'react';

import { getTags } from '../utils/API';

import TagsComponent from './TagsComponent';

const AdminComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', alttext: '', price: 0, tagsIndex: 0, file: {} });
    
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
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleOptionChange = (e) => {
        const index = e.target.options.selectedIndex;
        const { name } = e.target;
        setFormData({...formData, [name]: index});
    }
    const handleImgChange = (e) => {
        const { name } = e.target;
        const data = e.target.files[0];

        setFormData({...formData, [name]: data})
    }

    return (
        <>
            <h1>Welcome back {firstName}</h1>
            <h2>Add an image:</h2>
            <form encType="multipart/form-data">
                <label htmlFor="title">Title: </label>
                <input onChange={handleInputChange} type="text" name="title" />
                <label htmlFor="description">Description</label>
                <input onChange={handleInputChange} type="text" name="description" />
                <label htmlFor="alttext">Alt Text: </label>
                <input onChange={handleInputChange} type="text" name="alttext" />
                <label htmlFor="price">Price</label>
                <input onChange={handleInputChange} type="number" name="price" />
                <label htmlFor="tag">Associate Tag: </label>
                <select onChange={handleOptionChange} name="tagsIndex" id="tag">
                    {tags.map(tag => (<TagsComponent tag={tag} key={tag._id} />))}
                </select>
                <label htmlFor="img">Image: </label>
                <input onChange={handleImgChange} type="file" name="file" />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AdminComponent