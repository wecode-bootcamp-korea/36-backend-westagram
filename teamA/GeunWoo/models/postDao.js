const {myDataSource} = require('./dataSource');

const postPostings = async (title, content, user_id) => {
    try {
        return await myDataSource.query(
            `INSERT INTO posts(
                title,
                content,
                user_id
            ) VALUES (?, ?, ?);
            `,
            [title, content, user_id]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getPostings = async () => {
    try {
        return await myDataSource.query(
            `SELECT
                p.id,
                p.title,
                p.content,
                p.user_id,
                p.created_at,
                p.updated_at
            FROM posts p
            `
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const getPostingsByUserId = async (user_id) => {
    try {
        return await myDataSource.query( 
            `SELECT
                p.id,
                p.title,
                p.content,
                p.created_at,
                p.updated_at
            FROM posts p
            WHERE user_id=${user_id}
            `
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const updatePostings = async (title, content, post_id, user_id) => {
    try {
        await myDataSource.query(
            `UPDATE posts
            SET
              title = ?,
              content = ?
            WHERE id = ?
            AND user_id = ?
            `,
            [title, content, post_id, user_id]
        );
    
        return await myDataSource.query(
            `SELECT
                p.title,
                p.content,
                p.user_id,
                p.id,
                u.name
            FROM posts p
            INNER JOIN users u
            ON p.user_id=u.id
            WHERE p.user_id=${user_id} AND p.id=${post_id}
            `
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const deletePostings = async (post_id) => {
    try {
        return myDataSource.query(
            `DELETE FROM posts
            WHERE posts.id=${post_id}`
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    postPostings, 
    getPostings, 
    getPostingsByUserId, 
    updatePostings, 
    deletePostings
}