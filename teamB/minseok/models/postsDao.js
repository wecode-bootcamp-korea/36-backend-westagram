const myDataSource = require('./myDataSource')

const posting = async(title, content, user_id, userProfileImage, postingImageUrl) =>{
    try{
        return await myDataSource.query(
        `INSERT INTO posts(
            title,
            content,
            user_id,
            userProfileImage,
            postingImageUrl
        ) VALUES (?, ?, ?, ? ,?); `,
        [title, content, user_id, userProfileImage, postingImageUrl]
    );}
        catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;}
}

const getList = async() =>{
    try{ return await myDataSource.query(
        `SELECT
            id,
            title,
            content,
            user_id,
            userProfileImage,
            postingImageUrl
        FROM posts `,)}
    catch(err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;}
}

const patchPost = async(title, content, postingId) => {
    try{ await myDataSource.query(
        `UPDATE posts
        SET title = ?,
            content = ?
        WHERE posts.id = ${postingId}`, 
        [title, content]
        );
        return await myDataSource.query(
            `SELECT
                posts.user_id AS userId,
                users_table.name AS username,
                posts.id AS postingId,
                posts.title AS postingTitle,
                posts.content AS postingContent
            FROM users_table
            INNER JOIN posts ON users_table.id = posts.user_id
            WHERE posts.id = ${postingId}
            `,)
    }
    catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;}}

const deleteList = async(Delete) => {
    try{return await myDataSource.query(
        `DELETE FROM posts WHERE id = ${Delete};
        `)}
    catch (err) { const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;}}

module.exports={posting, getList, patchPost, deleteList}