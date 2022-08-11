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

const enrollPost = async(title, content, userId)=>{
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

const allPost = async()=>{
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

const userPost = async(userId)=>{
    try {
        let userData = await appDataSource.query(
            `SELECT
                u.id userId,
                u.name userName,
                u.profile_image userProfileImage
            FROM users u
            WHERE u.id = ${userId}`)
    
        let datas = await appDataSource.query(
            `SELECT 
                p.id postingId,
                p.title postingTitle,
                p.content postingContent 
            FROM posts p
            INNER JOIN users 
            ON p.user_id = users.id 
            WHERE users.id = ${userId}`)

        let posts=[]
        for (const data of datas) {
            posts.push({
                postingId : data['postingId'],
                postingTitle : data['postingTitle'],
                postingContent : data['postingContent'],
            })
        }
        const user = {
            userId : userData[0]['userId'],
            userName : userData[0]['userName'],
            userProfileImage : userData[0]['userProfileImage'],
            post : posts
        }
        return  user;
   
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const fixPost = async(title, content, postId, userId)=>{
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

module.exports = {
    enrollPost,
    allPost,
    userPost,
    fixPost
}