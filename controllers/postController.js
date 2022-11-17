const Post = require('../models/postModel')

// Return all posts
exports.getAllPosts = async (req, res, next) => {

    try {
        const posts = await Post.find();

        res.status(200).json({
            status: 'Success',
            results: posts.length,
            data: {
                posts,
            },
        });
    } catch (e) {
        res.status(400).json({
            status: 'Fail',
        });
    }
    
};

// Return a single post
exports.getOnePost = async (req, res, next) => {

    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: {
                post,
            },
        });
    } catch (e) {
        res.status(400).json({
            status: 'Fail',
        });
    }
}

// Create a post

exports.createPost = async (req, res, next) => {

    try {
        const post = await Post.create(req.body);

        res.status(200).json({
            status: 'Success',
            data: {
                post,
            },
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'Fail',
        });
    }
}

// update a post
exports.updatePost = async (req, res, next) => {

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true 
        });

        res.status(200).json({
            status: 'Success',
            data: {
                post,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'Fail',
        });
    }
}

// Delete  a post
exports.deletePost = async (req, res, next) => {

    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'Success',
        });
    } catch (err) {
        res.status(400).json({
            status: 'Fail',
        });
    }
}