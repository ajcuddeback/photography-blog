const { Photo, Comment, Tag } = require('../models');

module.exports = {
    async getPhotos(req, res) {
        const photoData = await Photo.find({});
        res.json(photoData);
    }, 
    async getPhoto(req, res) {
        const photoData = await Photo.findOne({ _id: req.body.id });

        if(!photoData) {
            return res.status(400).json({ message: 'No photo found at this id!' });
        }

        res.json(photoData);
    }
}