const { Schema, model } = require('mongoose');

const photoSchema = new Schema(
    {
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String,
            required: true
        },
        alttext: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: false
        },
        is_featured: {
            type: Boolean,
            required: true,
            unique: true,
            default: false
        },
        tags: 
            {
            type: Schema.Types.ObjectId,
            ref: 'Tag',
            required: true
            },
        fileLink: {
            type: String,
            required: true
        },
        s3_key: {
            type: String,
            required: true
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    }
);

const Photo = model('Photo', photoSchema);

module.exports = Photo;