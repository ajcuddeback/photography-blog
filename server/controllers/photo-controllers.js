const { Photo, Comment, Tag } = require('../models');
const uploadFile  = require('../utils/s3');
require('dotenv').config();

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
    },
    async addPhoto(req, res) {

        const file = req.file;

        const result = await uploadFile(file);

        console.log(result)
                // const newFileUploaded = {
                //     title: req.body.title,
                //     description: req.body.description,
                //     altext: req.body.alttext,
                //     price: req.body.price,
                //     tags: req.body.tags,
                //     fileLink: s3FileURL + file.originalname,
                //     s3_key: params.Key
                // };

                // const photoData = Photo.create(newFileUploaded);

                // if(!photoData) {
                //     res.json(500).json({ message: 'something went wrong!' });
                //     return;
                // }

                // res.json(photoData)
    }
}