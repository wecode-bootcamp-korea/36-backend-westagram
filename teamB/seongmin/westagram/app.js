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

const dataSource = new DataSource({
    type: `mysql`,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

dataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })

//server health check
app.get('/ping', (req, res) => {
    res.status(200).json({ mesaage: 'pong' })
});

app.get('/users', async (req, res) => {
    const users = await dataSource.query(
        `SELECT
        u.id,
        u.name,
        u.email,
        u.profile_image,
        u.created_at
    FROM users u;`);

    res.status(200).json(users);
});

app.get('/posts', async (req, res) => {
    const posts = await dataSource.query(`
    SELECT
        u.id userId,
        u.profile_image userProFileImage,
        p.id postingId,
        p.title postingTitle,
        p.content postingContent 
    FROM users u 
    INNER JOIN posts p
    on u.id = p.user_id;`)

    res.status(200).json({ data: posts });
});

app.get('/posts/:userId', async (req, res) => {
    const userId = req.params.userId;
    const posts = [];
    const user = {};
    
    const dbDatas = await dataSource.query(`
            SELECT
                u.id userId,
                u.profile_image userProfileImage,
                p.id postingId,
                p.title postingTitle,
                p.content postingContent 
            FROM posts p
            INNER JOIN users u
            ON p.user_id = u.id
            WHERE u.id = ${userId};`)

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

app.post('/users/sign-up', async (req, res) => {
    const { name, email, profile_image, password } = req.body;

    await dataSource.query(
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
    SELECT EXISTS
        (SELECT id FROM users
        WHERE id = ${user_id});
    `); //게시글 작성 유저 확인
    
    if (Object.values(userCheck[0])[0] == 1) {
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
    const { postId, userId } = req.params;

    try {
        await dataSource.query(
            `INSERT INTO likes (
                post_id,
                user_id
            ) VALUES (${postId}, ${userId})`);

        res.status(201).json({ message: "likeCreated" });
    } catch (err) {

        res.status(404).json({message : 'Already Existed Data'})
    }
    
});

app.patch('/posts/:postingId', async (req, res) => {
    const postingId = req.params.postingId;
    const { postingTitle, postingContent } = req.body;

    //요청받은 게시글 존재 확인
    const postCheck = await dataSource.query(`
    SELECT EXISTS
        (SELECT id FROM posts
        WHERE id = ${postingId});
    `); //게시글 작성 유저 확인
    
    if (Object.values(postCheck[0])[0] == 1) {
        await dataSource.query(`
            UPDATE posts 
            SET title = "${postingTitle}", content = "${postingContent}"
            WHERE id = ${postingId};`)

        const data = await dataSource.query(`
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

    await dataSource.query(`
    DELETE FROM posts WHERE id = ${findPostId};
    `)

    res.status(204).json({ message: "postingDelted" });
});

app.listen(PORT, () => {
    console.log(`server is listning on ${PORT}`);
});