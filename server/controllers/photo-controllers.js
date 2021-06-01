const { Photo, Comment, Tag } = require('../models');
const uploadFile  = require('../utils/s3');
require('dotenv').config();

module.exports = {
    async getPhotos(req, res) {
        const photoData = await Photo.find({}).populate('tags');

        res.json(photoData);
    }, 
    async getPhoto(req, res) {
        const photoData = await Photo.findOne({ _id: req.params.id });

        if(!photoData) {
            return res.status(400).json({ message: 'No photo found at this id!' });
        }

        res.json(photoData)
    },
    async getTags(req, res) {
        const tagData = await Tag.find({});

        if(!tagData) {
            res.status(500).json({ message: 'tags not seeded' });
            return;
        }

        res.json(tagData);
    },
    async addPhoto(req, res) {
        const file = req.file;
        const result = await uploadFile(file);
        const tags = await Tag.find({});
        const newFileUploaded = {
            title: req.body.title,
            description: req.body.description,
            alttext: req.body.alttext,
            price: req.body.price,
            tags: tags[req.body.tagsIndex]._id,
            fileLink: `https://${process.env.AWS_ClOUDFRONT_DOMAIN}.cloudfront.net/${result.Key}`,
            s3_key: result.Key
        };

        const photoData = await Photo.create(newFileUploaded);

        if(!photoData) {
            res.json(500).json({ message: 'something went wrong!' });
            return;
        }

        res.json(photoData)
    }
}