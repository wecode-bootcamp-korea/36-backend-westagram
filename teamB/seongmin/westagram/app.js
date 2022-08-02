const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');
const { json } = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(json());
app.use(cors());
app.use(morgan('dev'));

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
        console.log('Data Source has been initialized!')
    })

//server health check
app.get('/ping', (req, res) => {
    res.status(200).json({ mesaage: 'pong' })
});

//모든 사용자 조회
app.get('/users', async (req, res) => {
    await myDataSource.query(`
    SELECT u.id, u.name, u.email, u.profile_image, u.created_at FROM users u 
    `, (err, rows) => {
        res.status(200).json(rows);
    })
});

//모든 게시물 조회
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

//유저 게시물 조회
app.get('/post/:userId', async (req, res) => {
    const userId = req.params.userId;
    const posts =[];
    //유저 정보 조회
    await myDataSource.query(`SELECT
        u.id userId,
        u.profile_image userProfileImage
        FROM users u
        WHERE u.id = ${userId}`, (err, data) => {
            const userData = data;
            //해당 유저가 작성한 게시물 조회
            myDataSource.query(`SELECT p.id postingId, p.title postingTitle, p.content postingContent 
            FROM posts p INNER JOIN users ON p.user_id = users.id WHERE users.id = ${userId};`, (err, datas) => {
                for (const data of datas) {
                    posts.push({
                        postingId : data['postingId'],
                        postingTitle : data['postingTitle'],
                        postingContent : data['postingContent'],
                    })
                }
                const user = {
                    userId : userData[0]['userId'],
                    userProfileImage : userData[0]['userProfileImage'],
                    post : posts
                }
                res.status(200).json({data: user})
            })
        });
    
})

//회원가입
app.post('/signUp', async (req, res) => {
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
});

//게시물 작성
app.post('/addPost', async (req, res) => {
    const { title, content, user_id } = req.body;
    await myDataSource.query(
        `INSERT INTO posts (
            title, content, user_id
        ) VALUES (?, ?, ?);`, [title, content, user_id]
    );
    res.status(201).json({ message: "postCreated" });
});

app.listen(PORT, () => {
    console.log(`server is listning on ${PORT}`);
});