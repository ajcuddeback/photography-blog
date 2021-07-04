export const loginUser = (userData) => {
    return fetch('/api/users/login', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
};

export const getTags = () => {
    return fetch ('/api/photos/tags');
};

export const postPhoto = (photoData, token) => {
    // Create a new FormData object in order to use multipart/form-data for the header. This will allow us to send binary data for the image
    let fd = new FormData();

    // Loop through the photoData object and append it key value pairs to the FormData object
    Object.keys(photoData).forEach((key) => {
        fd.append(key, photoData[key]);
    })

    // Post the fd object we created along with the token
    return fetch('/api/photos/upload', {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`
        },
        body: fd
    });
};

export const getFeaturedImage = () => {
    return fetch('/api/photos/featured');
};

export const getAllImages = () => {
    return fetch('/api/photos')
};