const { Photo, Comment, Tag } = require('../models');
const { uploadFile, deleteObject }  = require('../utils/s3');
const fs = require('fs');
require('dotenv').config();
const multer = require('multer');
const { resolve } = require('path');
const upload = multer({ dest: 'uploads/' });

module.exports = {
    async getPhotos(req, res) {
        const photoData = await Photo.find({}).populate('tags').populate('comments');

        res.json(photoData);
    }, 
    async getPhoto(req, res) {
        const photoData = await Photo.findOne({ _id: req.params.id }).populate('tags').populate('comments');

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
    async getPhotoByTag(req, res) {
        const photoData = await Photo.find({ tags: req.params.tags });

        if(!photoData) {
            res.status(400).json({ message: 'No Photos associated with this tag!' });
            return;
        }

        res.json(photoData);
    },
    async getFeaturedPhoto(req, res) {
        const photoData = await Photo.findOne({ is_featured: true });

        if(!photoData) {
            res.status(400).json({ message: 'There is no featured photo!' });
            return;
        }

        res.json(photoData);
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
            is_featured: req.body.is_featured,
            tags: tags[req.body.tagsIndex]._id,
            fileLink: `https://${process.env.AWS_ClOUDFRONT_DOMAIN}.cloudfront.net/${result.Key}`,
            s3_key: result.Key
        };

        const photoData = await Photo.create(newFileUploaded);

        if(!photoData) {
            res.json(500).json({ message: 'something went wrong!' });
            return;
        }

        if(result) {
            fs.unlink(req.file.path, (err) => {
                if(err) {
                    console.error(err);
                    return;
                }

                console.log('file removed')
            })
        }

        res.json(photoData)
    }, 
    async addComment(req, res) {
        const commentData = await Comment.create(req.body);

        const photoData = await Photo.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: commentData._id } }, { new: true }).populate('comments').populate('tags');

        if(!photoData) {
            res.status(500).json({ message: 'Something went wrong!' });
            return;
        }

        res.json(photoData);
    },
    async deleteComment(req, res) {
        const commentData = await Comment.findOneAndDelete({ _id: req.params.id });

        const photoData = await Photo.findOneAndUpdate({ _id: req.params.photoId }, { $pull: { comments: req.params.id } }, { new: true }).populate('comments').populate('tags');

        if(!photoData) {
            res.status(400).json({ message: 'No photo or comment found at this id!' });
            return;
        }

        res.json(photoData);
    },
    async deletePhoto(req, res) {
        const data = await deleteObject(req.params.key);

        const photoData = await Photo.deleteOne({ s3_key: req.params.key }, { new: true });

        if(!photoData) {
            res.status(400).json({ message: 'No photo found with this key!' });
            return;
        }

        res.json(photoData);
    }, 
    async addTag(req, res) {
        const data = await Tag.create(req.body);

        if(!data) {
            res.status(400).json({ message: 'Something went wrong!' });
            return;
        }

        res.json(data);
    },
    async deleteTag(req, res) {
        const data = await Tag.deleteOne({ _id: req.params.id }, { new: true });

        if(!data) {
            res.status(400).json({ message: 'No tag found at this ID!' });
            return;
        }

        res.json(data);
    }
}