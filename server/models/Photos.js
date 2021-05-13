const { Schema, model } = require('mongoose');

const photoSchema = new Schema(
    {
        img: {
            type: String,
            required: true
        },
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
        tags: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Tag',
            required: true
            }
        ],
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