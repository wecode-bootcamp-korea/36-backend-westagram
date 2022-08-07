const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

myDataSource.initialize()
.then(() => {
    console.log("Data source has been initialized!");
})
.catch((err) => {
    console.error("Error during Data Source initialization", err);
    myDataSource.destroy();
});

const createUser = async ( name, email, profileImage, password) => {
    try {
        return await myDataSource.query(
            `INSERT INTO users(
                name,
                email,
                profile_image,
                password
            ) VALUES (?, ?, ?, ?);`,
            [name, email, profileImage, password]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const gettingUserPosts = async (userId) => {
    try {
        return await myDataSource.manager.query(`
        SELECT
            posts.id AS postingId,
            posts.post_image AS postingImageUrl,
            posts.content AS postingContent
        FROM posts
        WHERE posts.user_id = ${userId}`
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    createUser,
    gettingUserPosts
};