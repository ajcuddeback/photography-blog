import React, { useEffect, useState } from 'react';

// Api function
import { getTags, postPhoto } from '../utils/API';
import Auth from '../utils/auth';

// Components
import TagsComponent from './TagsComponent';

const AdminComponent = () => {
    // State
    const [firstName, setFirstName] = useState('');
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', alttext: '', price: 0, tagsIndex: 0, file: {} });
    
    // Use effect hook
    useEffect(async () => {
        // Get the first name out of localstorage in order to keep the first name active on page even after refresh
        setFirstName(localStorage.getItem('firstName'));

        try {
            // Get all tags and parse them and save them to state for use in the select form
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

    // Handles text and number changes in inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };
    // Handles the select changes in select
    const handleOptionChange = (e) => {
        const index = e.target.options.selectedIndex;
        const { name } = e.target;
        setFormData({...formData, [name]: index});
    }
    // Handles the img upload
    const handleImgChange = async (e) => {
        const { name } = e.target;
        const data = e.target.files[0];
        setFormData({...formData, [name]: data})
    }

    // Handles the submission of an image
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const isLoggedIn = await Auth.loggedIn();
            if(!isLoggedIn) {
                return new Error('You are not allowed to access this route!')
            } 
            const token = await Auth.getToken();
            const response = await postPhoto(formData, token);
            if(!response) {
                return new Error('Error while trying to post photo!')
            }
            const data = response.json();
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h1>Welcome back {firstName}</h1>
            <h2>Add an image:</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" >
                <label htmlFor="title">Title: </label>
                <input onChange={handleInputChange} type="text" name="title" />
                <label htmlFor="description">Description</label>
                <input onChange={handleInputChange} type="text" name="description" />
                <label htmlFor="alttext">Alt Text: </label>
                <input onChange={handleInputChange} type="text" name="alttext" />
                <label htmlFor="price">Price</label>
                <input onChange={handleInputChange} type="number" name="price" />
                <label htmlFor="tag">Associate Tag: </label>
                {/* Map out all of the tags to options */}
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