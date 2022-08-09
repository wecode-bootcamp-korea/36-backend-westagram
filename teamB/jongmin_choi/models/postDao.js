const { myDataSource } = require('./dataSource');

const createPost = async (title, content, postImage, userId) => {
    try {
        return await myDataSource.query(`
        INSERT INTO posts(
            title,
            content,
            post_image,
            user_id
        ) VALUES (?, ?, ?, ?)`,
        [title, content, postImage, userId]
    );
    } catch (err) {
                const error = new Error('INVALID_DATA_INPUT');
                error.statusCode = 500;
                throw error;
    }
};

const createLike = async (postId, userId) => {
    try {
        return  await myDataSource.query(`
                    INSERT INTO likes(
                        post_id,
                        user_id
                    ) VALUES (?, ?)`,
                    [postId, userId]
                );

    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const deletingPost = async (postId) => {
    try {
        return await myDataSource.query(`
        DELETE FROM posts
        WHERE posts.id = ${postId}`
        );

    } catch (err) {
        const error = new Error('INVALID_DATA');
        error.statusCode = 500;
        throw error;
    }
}

const postList = async () => {
    try {
        return await myDataSource.manager.query(`
            SELECT
                posts.user_id AS userId,
                users.profile_image AS userProfileImage,
                posts.id AS postingId,
                posts.post_image AS postingImageUrl,
                posts.content AS postingContent
            FROM posts
            INNER JOIN users ON posts.user_id = users.id`
            );
    } catch (err) {
        const error = new Error('INVALID_DATA');
        error.statusCode = 500;
        throw error;
    }
}

const getUpdateInfo = async (title, content, postImage, postId) => {
    try {
        await myDataSource.query(`
        UPDATE posts
        SET title = ?,
            content = ?,
            post_image = ?
        WHERE posts.id = ${postId}`,
        [title, content, postImage]
    );

        return await myDataSource.manager.query(`
        SELECT
            posts.user_id AS userId,
            users.name AS userName,
            posts.id AS postingId,
            posts.title AS postingTitle,
            posts.content AS postingContent
        FROM posts
        INNER JOIN users ON (posts.user_id = users.id AND posts.id = ${postId})`
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    createPost,
    createLike,
    deletingPost,
    postList,
    getUpdateInfo
}