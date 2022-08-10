const postDao = require('../models/postDao');

const postPostings = async (title, content, user_id) => {
    if (typeof(title) != 'string' || typeof(content) != 'string' || typeof(user_id) != 'number' || user_id == 0) {
        const err = new Error('INVALID INPUTs');
        err.statusCode = 409;
        throw err;
    }

    const postPostings = await postDao.postPostings(
        title,
        content,
        user_id
    );

    return postPostings;
};

const getPostings = async () => {
    const getPostings = await postDao.getPostings();

    return getPostings;
};

const getPostingsByUserId = async (user_id) => {
    if (typeof(user_id) != 'number' || user_id == 0) {
        const err = new Error('INVALID ID');
        err.statusCode = 409;
        throw err;
    }

    const getPostingsByUserId = await postDao.getPostingsByUserId(
        user_id
    );

    return getPostingsByUserId;
};

const updatePostings = async (title, content, post_id, user_id) => {
    if (typeof(title) != 'string' || typeof(content) != 'string' || typeof(post_id) != 'number' || typeof(user_id) != 'number' || post_id == 0 || user_id == 0) {
        const err = new Error('INVALID INPUTs');
        err.statusCode = 409;
        throw err;
    }

    const updatePostings = await postDao.updatePostings(
        title,
        content,
        post_id,
        user_id
    );

    return updatePostings;
};

const deletePostings = async (post_id) => {
    if (type_of(post_id) != 'number' || post_id == 0) {
        const err = new Error('INVALID ID');
        err.statusCode = 409;
        throw err;
    }

    const deletePostings = await postDao.deletePostings(
        post_id
    );
};

module.exports = {
    postPostings, getPostings, getPostingsByUserId, updatePostings, deletePostings
}