const { dataSource } = require('./daoUtil');


const insertPost = async (title, content, user_id) => {
    try {
        return await dataSource.query(
            `INSERT INTO posts (
                title, content, user_id
            ) VALUES (?, ?, ?);`, [title, content, user_id]);
    } catch (err) {
        const error = new Error('INVALID_DATA_INOUT');
        error.statusCode = 500;
        throw error;
    }
}

const searchPosts = async () => {
    try {
        return await dataSource.query(`SELECT
        u.id userId,
        u.profile_image userProFileImage,
        p.id postingId,
        p.title postingTitle,
        p.content postingContent 
    FROM users u 
    INNER JOIN posts p
    on u.id = p.user_id;`)
    } catch (err) {
        const error = new Error('INVALID_DATA_INOUT');
        error.statusCode = 500;
        throw error;
    }
}

const searchUserPost = async (userId) => {
    try {
        return await dataSource.query(
        `select result
        FROM (SELECT json_object(
            'id', u.id,
            'name', u.name,
            'post', json_arrayagg(json_object(
                'title', p.title,
                'content', p.content
            ))
        )result FROM users u
        INNER join posts p on u.id = p.user_id
        WHERE u.id = ${userId}) temp;`
        )
    } catch (err) {
        const error = new Error('INVALID_DATA_INOUT');
        error.statusCode = 500;
        throw error;
    }
}

const patchPost = async (postId, postingTitle, postingContent) => {
    try {
        await dataSource.query(`
            UPDATE posts 
            SET title = "${postingTitle}", content = "${postingContent}"
            WHERE id = ${postId};`)

        const data = await dataSource.query(`
            SELECT
                u.id userID,
                u.name userName,
                p.id postingId,
                p.title postingTitle,
                p.content postingContent
            FROM users u 
            INNER JOIN posts p
            ON u.id = p.user_id
            WHERE p.id = ${postId};`)
        console.log(data);
        return data;

    } catch (err) {
        const error = new Error('INVALID_DATA_INOUT');
        error.statusCode = 500;
        throw error;
    }
}

const deletePost = async (postId) => {
    try {
        await dataSource.query(`
    DELETE FROM posts WHERE id = ${postId};
    `)
    } catch (err) {
        const error = new Error('INVALID_DATA_INOUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    insertPost,
    searchPosts,
    searchUserPost,
    patchPost,
    deletePost
}