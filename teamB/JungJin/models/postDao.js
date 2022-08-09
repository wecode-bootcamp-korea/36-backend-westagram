const { database } = require('./database');

const lookupPost = () => {
    return database.query(`
        SELECT 
            id,
            title,
            content,
            imageurl,
            user_id,
            created_at,
            updated_at 
        FROM posts`
    )
};

const uploadPost = async (title, content, user_id, imageurl) => {
    const sql = await database.query(`
                    SELECT EXISTS(
                        SELECT 
                            id 
                        from users 
                        WHERE users.id=${user_id}
                        ) AS RESULT`)
    if(Number(Object.values(sql[0])[0]) === 0){
        const err = new Error('no user.id')
        err.statusCode = 400
        throw err;
    }   
    try {
        return database.query(`
        INSERT INTO posts(
            title,
            content,
            user_id,
            imageurl    
        ) VALUES (?, ?, ?, ?)`, 
        [title, content, user_id, imageurl]
    )
    }          
    catch (err) {  
        throw new Error('INVALID_DATA_INPUT')
    }
};

const delPost = async (postid) => {
    const sql = await database.query(`
                    SELECT EXISTS(
                        SELECT 
                            id 
                        from posts 
                        WHERE posts.id=${postid}
                        ) AS RESULT`)
    if(Number(Object.values(sql[0])[0]) === 0){
        const err = new Error('nothing to DELETE (wrong postid)')
        err.statusCode = 400
        throw err
    }
    return database.query(`
        DELETE 
        FROM posts 
        WHERE id = ${postid}`
    )
}

const imagelookupData = () => {
    return database.query(`
        SELECT 
            users.id as userId, 
            profile_image as userProfileImage, 
            posts.id as postingId, 
            imageurl as postingImageUrl, 
            content as postingContent 
        FROM users 
        INNER JOIN posts ON users.id = posts.user_id`
    )
};

const imageuserlookupData = (userid) => {
    return database.query(`
        SELECT 
        postslist
        FROM (
            SELECT json_object(
                'userId', users.id,
                'userProfileImage',  profile_image,
                'postings', json_arrayagg(json_object(
                    'postingId', posts.id,
                    'postingImageUrl', imageurl,
                    'postingContent', content)
                )
            ) postslist
            FROM users
            INNER JOIN posts ON users.id = posts.user_id
            WHERE users.id = ${userid}
            GROUP BY users.id, profile_image
        ) sub`
    )
};

const titlelookupList = () => {
    return database.query(
        `SELECT 
            users.id AS userId, 
            users.name AS userName, 
            posts.id AS postingId, 
            posts.title AS postingTitle, 
            content AS postingContent 
        FROM users 
        INNER JOIN posts ON users.id = posts.user_id`
    )
};

const titlepostlookupList = (postid) => {
    return database.query(`
        SELECT 
            users.id AS userId, 
            users.name AS userName, 
            posts.id AS postingId, 
            posts.title AS postingTitle, 
            content AS postingContent 
        FROM users 
        INNER JOIN posts ON users.id = posts.user_id 
        WHERE posts.id = ${postid}`
    )
};

const postpatchList = async (postid, content) => {
    const sql = await database.query(`
                    SELECT EXISTS(
                        SELECT 
                            id 
                        from posts 
                        WHERE posts.id=${postid}
                        ) AS RESULT`)
    if(Number(Object.values(sql[0])[0]) === 0){
        const err = new Error('nothing to UPDATE (wrong postid)')
        err.statusCode = 400
        throw err
    }
    return database.query(`
    UPDATE posts 
        SET ? WHERE id = ${postid}`, 
        {content:content}
    )
};

module.exports = {
    lookupPost, uploadPost, delPost, imagelookupData, imageuserlookupData, titlelookupList, titlepostlookupList, postpatchList
}