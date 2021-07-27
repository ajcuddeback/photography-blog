import React, { useEffect, useState } from 'react';

// Api function
import { getTags, postPhoto } from '../../utils/API';
import Auth from '../../utils/auth';

// Components
import TagsComponent from '../sub-components/TagsComponent';
import SpinnerComponent from '../sub-components/SpinnerComponent';

import styled from 'styled-components';

const AdminComponent = () => {
    // State
    const [firstName, setFirstName] = useState('');
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', alttext: '', price: 0, is_featured: false, tagsIndex: 0, file: {} });
    const [src, setSrc] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC');
    const [isLoaded, setIsLoaded] = useState(true);
    
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
        // Grab the file out of the file uploader
        const [file] = e.target.files;
        // If there is a file, create a url for it and store it in state in order to preview it
        if(file) {
            setSrc(URL.createObjectURL(file))
        }
        setFormData({...formData, [name]: data})
    }

    const updateIsFeatured = async (e) => {
        const { name } = e.target;
        const value = e.target.checked;

        setFormData({ ...formData, [name]: value });
    }

    // Handles the submission of an image
    const handleSubmit = async (e) => {
        setIsLoaded(false);
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
            setFormData({ title: '', description: '', alttext: '', price: 0, is_featured: false, tagsIndex: 0, file: {} })
            setSrc('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC')
            setIsLoaded(true);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <StyledDiv>
            <h1>Welcome back {firstName}</h1>
            <h2>Add an image:</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" >
                <div className="wrapper">
                    <div className="col1">
                        <label htmlFor="title">Title: </label>
                        <input onChange={handleInputChange} value={formData.title} type="text" name="title" />
                        <label htmlFor="description">Description</label>
                        <input onChange={handleInputChange} value={formData.description} type="text" name="description" />
                        <label htmlFor="alttext">Alt Text: </label>
                        <input onChange={handleInputChange} value={formData.alttext} type="text" name="alttext" />
                    </div>
                    <div className="col2">
                        <label htmlFor="price">Price</label>
                        <input onChange={handleInputChange} value={formData.price} type="number" name="price" />
                        <label htmlFor="tag">Associate Tag: </label>
                        {/* Map out all of the tags to options */}
                        <select onChange={handleOptionChange} name="tagsIndex" id="tag">
                            {tags.map(tag => (<TagsComponent tag={tag} key={tag._id} />))}
                        </select>
                        <label htmlFor="img">Image: </label>
                        <input className="img-select" onChange={handleImgChange} type="file" name="file" />
                    </div>
                </div>
                <br />
                <div className="img-preview">
                    <h2>Preview Image:</h2>
                    <label htmlFor="is_featured">Main Featured Image? </label>
                    <input onChange={updateIsFeatured} checked={formData.is_featured} type="checkbox" name="is_featured" />
                    <br />
                    {isLoaded ? (<img src={src} alt="your image" />) : (<SpinnerComponent />)}
                    
                </div>
                <button type="submit">Submit</button>
            </form>
            
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 600px;
        height: 500px;
        @media (max-width: 600px) {
            width: 400px;
            height: 500px;;
        }
        @media (max-width: 400px) {
            width: 300px;
            height: 500px;;
        }
        .img-preview {
            img {
                max-width: 500px;
                border: 1px solid #B030B0;
                border-radius: 5px;
            }
        }
        .wrapper {
            display: flex;
            width: 100%;
            @media (max-width: 400px) {
                flex-direction: column;
            }
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                .img-select {
                    width: 90%;
                    margin-left: 2rem;
                }
            }
        }
        button {
            align-self: center;
        }
        
    }
`

export default AdminComponent