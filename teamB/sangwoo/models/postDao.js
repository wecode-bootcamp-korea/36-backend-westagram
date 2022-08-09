const database = require('./dataSource');

const createPost = async ( title, content, user_id ) => {
    try {
        return await database.query(
            `INSERT INTO posts(
                title,
                content,
                user_id
            ) VALUES( ?, ?, ? )
            `,
            [ title, content, user_id ]
        )
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
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
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
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
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
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
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
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
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
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
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    createPost,
    viewPost,
    postUser,
    patchPost,
    postDelete,
    postLike
}

