const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: [true, 'Post must have Title'],
    },
    body: {
        type: 'string',
        required: [true, 'Post must have Body'],
    },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;