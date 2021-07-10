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
    return fetch('/api/photos');
};

export const getPhotoByTag = (id) => {
    return fetch(`/api/photos/tag/${id}`);
};

export const getSinglePhoto = (id) => {
    return fetch(`/api/photos/${id}`);
};

export const postComment = (data, id) => {
    return fetch(`/api/photos/comment/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
};

export const deleteImage = (key, token) => {
    return fetch(`/api/photos/delete/${key}`, {
        method: 'DELETE', 
        headers: {
            authorization: `Bearer ${token}`
        }
    })
};

export const deleteComment = (commentId, photoId, token) => {
    return fetch(`/api/photos/comment/${commentId}/${photoId}`, {
        method: 'PUT',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
};

export const sendMail = (email) => {
    let emailObj = { email }
    return fetch('/api/users/sendMail', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailObj)
    });
};

export const confirmCode = (code) => {
    let codeObj = { code }
    return fetch('/api/users/confirmCode', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(codeObj)
    });
};

export const resetPw = (data) => {
    return fetch('/api/users/resetpw', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
};