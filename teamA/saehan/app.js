const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const { DataSource } = require('typeorm');

const dataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    });
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/ping', function (req, res) {
    res.status(200).json({ message: 'pong' })
});

app.get('/allPosts', async (req, res) => {
    try {
        const data = await dataSource.query(
            `SELECT 
                posts.id,
                posts.title,
                posts.content,
                posts.user_id
            FROM posts
            `);
        res.status(200).json({ "data": data })
    } catch (err) {
        console.error(err);
    };
});

app.get('/viewSomeonePosts/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const data = await dataSource.query(
            `SELECT
                    p.id as postingId,
                    p.title,
                    p.content,
                    p.user_id
            FROM posts p
            WHERE p.user_id = ${userId}
            `);
        let obj = {
            Id: parseInt(userId)
        };
        obj["postings"] = data;
        res.status(200).json({ "data": obj })
    } catch (err) {
        console.error(err);
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await dataSource.query(
            `INSERT INTO users(
        name,
        email,
        password
    ) VALUES (?, ?, ?);
    `, [name, email, password]);
        res.status(201).json({ message: "userCreated" })
    } catch (err) {
        console.error(err)
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { title, content, user_id } = req.body;
        await dataSource.query(
            `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?, ?, ?);
        `, [title, content, user_id]);
        res.status(201).json({ message: "postCreated" });
    } catch (err) {
        console.error(err);
    }
});

app.post('/like', async (req, res) => {
    try {
        const { user_id, post_id } = req.body;
        await dataSource.query(
            `INSERT INTO likes(
                user_id,
                post_id
        ) VALUES (?, ?);
        `, [user_id, post_id]);
        res.status(201).json({ message: "likeCreated" });
    } catch (err) {
        console.error(err);
    };
});

app.patch('/revisePost/:userId/:postId', (req, res) => {
    const { userId, postId } = req.params;
    const { title, content } = req.body;
    dataSource.query(
        `UPDATE posts
        SET
            title = "${title}",
            content = "${content}"
        WHERE id = ${postId};`)

    dataSource.query(
        `SELECT
                u.id as userId,
                u.name as userName,
                p.id as postingId,
                p.title as postingTitle,
                p.content as postingContent
        FROM users u, posts p
        WHERE u.id = ${userId} AND p.id = ${postId};
        `,(err,rows) => {
            res.status(201).json({ data : rows });
        });
});

app.delete('/postDelete/:postId', (req, res) => {
    const { postId } = req.params;
    dataSource.query(
        `DELETE FROM posts
            WHERE posts.id = ${postId}
        `);
    res.status(200).json({ message: "postingDeleted" });
});

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.error(err);
    }
};

start();