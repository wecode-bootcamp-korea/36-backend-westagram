const database = require('./dataSource');

const dataErrors = (err) => {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
}

const getPostPublishers = async (userId) => {
    const [user] = await database.query(
        `SELECT
            user_id userId
        FROM posts p
        WHERE p.user_id = '${userId}'
        `
    )
    return user;
}

const findPostUser = async (userId) => {
    const [user] = await database.query(
        `
        SELECT 
            user_id userId
        FROM posts p 
        WHERE EXISTS(
            SELECT 
                id
            FROM users u
            WHERE u.id = '${userId}'
        )
        `
    ) 
    return user;
}

const findPost = async (postId) => {
    const [post] = await database.query(
        `
        SELECT
            id postId
        FROM posts p
        WHERE p.id = '${postId}'
        `
    )
    return post
}
const createPost = async ( title, content, userId ) => {
    try {
        return await database.query(
            `INSERT INTO posts(
                title,
                content,
                user_id
            ) VALUES( ?, ?, ? )
            `,
            [ title, content, userId ]
        )
    } catch (err) {
        dataErrors(err);
    }
};

const viewPost = async () => {
    try {
        return await database.query(
            `SELECT
                u.id,
                u.name,
                p.id ponstingId,
                p.title postingTitle,
                p.content postingContent
            FROM posts p
            INNER JOIN users u ON u.id = p.user_id
            `,
        )
    }
    catch (err) {
        dataErrors(err);
    }
}

const postUser = async ( userId ) => {
    try{    
        return await database.query(
        `SELECT 
        u.id userId,
        u.name userName,
        'posting', JSON_ARRAYAGG(
                JSON_OBJECT(
                    'title', p.title, 
                    'content', p.content)
                ) posting FROM users u
            INNER JOIN posts p ON u.id = p.user_id
            WHERE u.id = ${ userId }
        `,  
    )      
    } catch (err) {
        dataErrors(err);
    }
}

const patchPost = async ( userId, postId, title, content ) => {
    try{    
        await database.query(
            `UPDATE posts
            SET
                title = ?,
                content = ?
            WHERE posts.id = ${postId}
            `,
            [title, content]
        );
        return await database.query(
            `SELECT 
                u.id AS userId,
                u.name AS userName,
                p.id AS postingId,
                p.title AS postingTitle,
                p.content AS postingContent
            FROM users AS u
            INNER JOIN posts AS p ON u.id = p.user_id
            WHERE u.id = ${userId} AND p.id = ${postId}
                `,
    )       
    } catch (err) {
        dataErrors(err);
    }
}

const postDelete = async ( postId ) => {
    try {
        return await database.query(
            `DELETE FROM posts
            WHERE posts.id = ${postId}
            `,
        )
    }
    catch (err) {
        dataErrors(err);
    }
}

const postLike = async ( postId, userId ) => {
    try {
        return await database.query(
            `
            INSERT INTO likes(
                user_id,
                post_id
            ) VALUES(?, ${postId})
            `,
            [userId]
        )
    }
    catch (err) {
        dataErrors(err);
    }
}

module.exports = {
    createPost,
    viewPost,
    postUser,
    patchPost,
    postDelete,
    postLike,
    getPostPublishers,
    findPostUser,
    findPost
}

