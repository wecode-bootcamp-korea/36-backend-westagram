const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const myDataSource = new DataSource({
    type: `mysql`,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

myDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })

//server health check
app.get('/ping', (req, res) => {
    res.status(200).json({ mesaage: 'pong' })
});

app.get('/users', async (req, res) => {
    await myDataSource.query(
        `SELECT
        u.id,
        u.name,
        u.email,
        u.profile_image,
        u.created_at
    FROM users u;`, (err, rows) => {
        res.status(200).json(rows);
    });
});

app.get('/posts', async (req, res) => {
    await myDataSource.query(`SELECT
        u.id userId,
        u.profile_image userProFileImage,
        p.id postingId,
        p.title postingTitle,
        p.content postingContent 
    FROM users u 
    INNER JOIN posts p
    on u.id = p.user_id;`,
        (err, rows) => res.status(200).json({ data: rows }));
});

app.get('/posts/:userId', async (req, res) => {
    const userId = req.params.userId;
    const posts = [];
    const user = {};
    await myDataSource.query(`
            SELECT
                u.id userId,
                u.profile_image userProfileImage,
                p.id postingId,
                p.title postingTitle,
                p.content postingContent 
            FROM posts p
            INNER JOIN users u
            ON p.user_id = u.id
            WHERE u.id = ${userId};`, (err, dbDatas) => {
        try {
            for (const dbData of dbDatas) {
                posts.push({
                    postingId: dbData['postingId'],
                    postingTitle: dbData['postingTitle'],
                    postingContent: dbData['postingContent'],
                });
            }
            user.userId = dbDatas[0]['userId'];
            user.userProfileImage = dbDatas[0]['userProfileImage'];
            user.post = posts;
            res.status(200).json({ data: user });
        } catch {
            res.status(404).json({ mesaage: 'USER_DID_NOT_EXIST' });
        }
    });
});

app.post('/users/sign-up', async (req, res) => {
    const { name, email, profile_image, password } = req.body;
    await myDataSource.query(
        `INSERT INTO users (
            name,
            email,
            profile_image,
            password
        ) VALUES (?, ?, ?, ?);`,
        [name, email, profile_image, password]
    );

    res.status(201).json({ mesaage: "userCreated" });
})

app.post('/posts', async (req, res) => {
    const { title, content, user_id } = req.body;

    const userCheck = await dataSource.query(`
    SELECT
        count(*) 
    FROM users 
    WHERE id = ${user_id}
    IS TRUE`); //게시글 작성 유저 확인

    if (userCheck[0]['count(*)'] == 1) {
        await dataSource.query(
            `INSERT INTO posts (
                title,
                content,
                user_id
            ) VALUES (?, ?, ?);`, [title, content, user_id]);
        return res.status(201).json({ message: "postCreated" });
    }

    res.status(404).json({ message: "user id is not exist!" });
});

app.post('/likes/:postId/:userId', async (req, res) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    await myDataSource.query(
        `INSERT INTO likes (
            post_id,
            user_id
        ) VALUES (${postId}, ${userId})`);
    res.status(201).json({ message: "likeCreated" });
});

app.patch('/posts/:postingId', async (req, res) => {
    const postingId = req.params.postingId;
    const { postingTitle, postingContent } = req.body;

    //요청받은 게시글 존재 확인
    const postCheck = await myDataSource.query(`
    SELECT
        count(*) 
    FROM posts
    WHERE id = ${postingId}
    IS TRUE`);

    //게시글 수정
    if (postCheck[0]['count(*)'] == 1) {
        await myDataSource.query(`
            UPDATE posts 
            SET title = "${postingTitle}", content = "${postingContent}"
            WHERE id = ${postingId};`)

        const data = await myDataSource.query(`
        SELECT
            u.id userID,
            u.name userName,
            p.id postingId,
            p.title postingTitle,
            p.content postingContent
        FROM users u 
        INNER JOIN posts p
        ON u.id = p.user_id
        WHERE p.id = ${postingId};`)

        return res.status(200).json({ data: data[0] });
    }
    res.status(404).json({ message: 'POST_ID_DID_NOT_EXIST' })
});

app.delete('/posts/:postId', async (req, res) => {
    const findPostId = req.params.postId;
    await myDataSource.query(`
    DELETE FROM posts WHERE id = ${findPostId};
    `)
    res.status(204).json({ message: "postingDelted" });
});

app.listen(PORT, () => {
    console.log(`server is listning on ${PORT}`);
});