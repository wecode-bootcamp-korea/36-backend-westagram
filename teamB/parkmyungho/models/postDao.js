const {DataSource} = require('typeorm');

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
    .then(()=>{
        console.log("Data Source has been initialized!");
    })
    .catch((err)=>{
        console.error("Error occurred during Data Source initialization", err);
        appDataSource.destroy();
    });

const createPost = async(title, content, userId)=>{
    try {
        return await appDataSource.query(
            `INSERT INTO posts(
                title,
                content,
                user_id
            ) VALUES (?,?,?);
            `,
            [title, content, userId]
        );
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getAllPosts = async()=>{
    try {
        return await appDataSource.query(
        `SELECT
            users.id UserId,
            users.profile_image userProfileImage,
            posts.id postingId,
            posts.title postingImageUrl,
            posts.content posingContent
        FROM users
        Inner Join posts ON users.id=posts.user_id`
        );
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getPostsByUserId = async(userId) =>{
    try{
        return await appDataSource.query(
            `SELECT 
                postlist
            FROM (
                SELECT json_object(
                'id', u.id,
                'name', u.name,
                'profileImage', u.profile_image,
                'posting', json_arrayagg(json_object(
                    'title', p.title,
                    'content', p.content))
                ) postlist
                    FROM users u
                    INNER JOIN posts p ON u.id = p.user_id
                    WHERE u.id = ${userId}) sub`
        );
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const updatePostByUserId = async(title, content, postId, userId)=>{
    try {
        await appDataSource.query(
            `UPDATE posts 
                SET title= ?, 
                content = ?
            WHERE posts.id= ?`
            , [title, content, postId]
        );
    
       let postNew = await appDataSource.query(
            `SELECT 
                u.id userId,
                u.name userName,
                p.id postingId,
                p.title postingTitle,
                p.content postingContent
            FROM users u
            INNER JOIN posts p ON u.id = ${userId}
            WHERE p.id=${postId};`
            );
        return postNew;
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const deletePostByPostId = async(postId)=>{
    try{
        await appDataSource.query(
            `DELETE FROM posts p
            WHERE p.id = ${postId}`
        )
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT')
        error.statusCode = 500;
        throw error;
    }
}

const getPostByPostId = async(postId) =>{
    return await appDataSource.query(
        `SELECT 
            p.id,
            p.title,
            p.content,
            p.user_id,
            p.created_at,
            p.updated_at
        FROM posts p
        WHERE p.id = ${postId};`
    )
};

module.exports = {
    createPost,
    getAllPosts,
    getPostsByUserId,
    updatePostByUserId,
    deletePostByPostId,
    getPostByPostId
}