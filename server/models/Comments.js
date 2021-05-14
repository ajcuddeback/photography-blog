const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
    {
        displayName: {
            type: String,
            required: true
        },
        commentText: {
            type: String,
            required: true
        }, 
        createAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;