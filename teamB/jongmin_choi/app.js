const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const { DataSource } = require('typeorm');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));


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
})

app.get("/ping", (req, res) => {
    res.status(200).json({"message" : "pong"});
});

app.post('/users', async (req, res) => {
    const { name, email, profileImage } = req.body;

    await myDataSource.query(`
        INSERT INTO users(
            name,
            email,
            profile_image
        ) VALUES (?, ?, ?)`,
        [name, email, profileImage]
    );

    res.status(201).json({ message : "userCreated"});
});

app.post('/posts', async (req, res) => {
    const { title, content, postImage, userId} = req.body;

    await myDataSource.query(`
        INSERT INTO posts(
            title,
            content,
            post_image,
            user_id
        ) VALUES (?, ?, ?, ?)`,
        [title, content, postImage, userId]
    );

    res.status(201).json({ message : "postCreated"});
});

app.get('/posts', async (req, res) => {
    const postList = await myDataSource.manager.query(`
        SELECT
            posts.user_id AS userId,
            users.profile_image AS userProfileImage,
            posts.id AS postingId,
            posts.post_image AS postingImageUrl,
            posts.content AS postingContent
        FROM posts
        INNER JOIN users ON posts.user_id = users.id`
    );
    
    res.status(200).json({data : postList});
});

app.get('/users/post/:userId', async (req, res) => {
    const { userId } = req.params;
    const getUserPost = await myDataSource.manager.query(`
        SELECT
            posts.id AS postingId,
            posts.post_image AS postingImageUrl,
            posts.content AS postingContent
        FROM posts
        WHERE posts.user_id = ${userId}`
    );

    const posts = {
        userId : userId,
        posting : getUserPost
    }
    res.status(200).json({data : posts})
});

app.patch('/users/:postId', async (req, res) => {
    const { title, content, postImage} = req.body;
    const {postId}  = req.params;

    await myDataSource.query(`
        UPDATE posts
        SET title = ?,
            content = ?,
            post_image = ?
        WHERE posts.id = ${postId}`,
        [title, content, postImage]
    );

    const getUpdatedUserInfo = await myDataSource.manager.query(`
            SELECT
                posts.user_id AS userId,
                users.name AS userName,
                posts.id AS postingId,
                posts.title AS postingTitle,
                posts.content AS postingContent
            FROM posts
            INNER JOIN users ON (posts.user_id = users.id AND posts.id = ${postId})`,
    );
    
    res.status(200).json({data : getUpdatedUserInfo})
});

app.delete('/posts/:postId', async (req, res,) => {
    const {postId} = req.params;

    await myDataSource.query(`
        DELETE FROM posts
        WHERE posts.id = ${postId}`
        );

    res.status(200).json({ message : "postingDeleted" });
});

app.post('/posts/likes', async (req, res) => {
    const { postId, userId } = req.body;

    await myDataSource.query(`
        INSERT INTO likes(
            post_id,
            user_id
        ) VALUES (?, ?)`,
        [postId, userId]
    );

    res.status(201).json({ message : "likeCreated"});
});


const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.error(err);
    }
};

start();