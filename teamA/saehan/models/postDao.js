const { dataSource } = require("../utils/daoUtil");

//er
const postsList = async() => {
    try{
        return await dataSource.query(
        `SELECT 
            p.id,
            p.title,
            p.content,
            p.user_id
        FROM posts p;
        `);
    } catch(err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};
 
const posting = async(title, content, user_id) => {
    try{
        return await dataSource.query(
            `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?, ?, ?);
        `,
        [title, content, user_id]);
    } catch(err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }; 
};

const updatePost = async(userId,postId,title,content) => {
    try{
        await dataSource.query(
            `UPDATE posts
            SET
                title = "${title}",
                content = "${content}"
            WHERE id = ${postId};`);
        
        return await dataSource.query(
            `SELECT
                    u.id as userId,
                    u.name as userName,
                    p.id as postingId,
                    p.title as postingTitle,
                    p.content as postingContent
            FROM users u, posts p
            WHERE u.id = ${userId} AND p.id = ${postId};
            `);
    } catch(err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }; 
};

const removePost = async(postId) => {
    try{
        await dataSource.query(
            `DELETE FROM posts
                WHERE posts.id = ${postId}
            `);
    } catch(err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};


module.exports = {
    postsList,
    posting,
    updatePost,
    removePost
}