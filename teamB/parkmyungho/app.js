const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config(); 

const {DataSource} = require('typeorm');
const { ppid } = require("process");

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
        console.log("Data Source has been initialized!")
    });

const app = express()

app.use(express.json());
app.use(cors());
app.use(morgan('dev')); 

app.get("/ping", (req, res)=>{
    res.json({message: "pong"})
})

//Assingment2 - 회원가입 엔드포인트
app.post('/user/signup', async(req,res)=>{
    const {name, email, profileImage, password} = req.body

    await appDataSource.query(
        `INSERT INTO users(
            name,
            email,
            profile_image,
            password
        ) VALUES (?,?,?,?);
        `,
        [name, email, profileImage, password]
    )
    res.status(201).json({message:"userCreated"})
})
//Assingment3 - 게시글 등록 엔드포인트
app.post('/post/new', async(req,res)=>{
    const {title, content, userId} = req.body

    await appDataSource.query(
        `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?,?,?);
        `,
        [title, content, userId]
    )
    res.status(201).json({message:"postCreated"})
})

//Assignment4 - 전체 게시글 조회 엔드포인트
app.get('/users-posts', async (req, res)=>{
    await appDataSource.manager.query(
        `SELECT
                users.id UserId,
                users.profile_image userProfileImage,
                posts.id postingId,
                posts.title postingImageUrl,
                posts.content posingContent
            FROM users
            Inner Join posts ON users.id=posts.user_id`
        ,(err, rows) => {
                res.status(200).json(rows);
        })
})

// assignment5 - 유저 게시글 조회 엔드포인트
app.get('/posts/:userId', async (req, res) => {
    const userId = req.params.userId;
    const posts =[];

    await appDataSource.query(
        `SELECT
            u.id userId,
            u.name userName,
            u.profile_image userProfileImage
        FROM users u
        WHERE u.id = ${userId}`
        , (err, data) => {
            const userData = data;
            appDataSource.query(
                `SELECT 
                    p.id postingId,
                    p.title postingTitle,
                    p.content postingContent 
                FROM posts p 
                INNER JOIN users 
                ON p.user_id = users.id 
                WHERE users.id = ${userId}`
                , (err, datas) => {
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
                res.status(200).json({data: user})
            })
        });
})

//Assignment6 - 게시물 수정 엔드포인트
app.put('/postFix/:userId-:postId', async(req,res) =>{
    const {userId, postId} = req.params
    const {content} =req.body
    await appDataSource.query(
        `UPDATE posts 
            SET content = ?
            WHERE posts.id=${postId};`
            , [content]
    );

    await appDataSource.query(
        `SELECT 
            u.id userId,
            u.name userName,
            p.id postingId,
            p.title postingTitle,
            p.content postingContent
        FROM users u
        INNER JOIN posts p ON u.id = ${userId}
        WHERE p.id=${postId};`
        ,(err,rows) => {
        res.status(206).json({data : rows})
        }
    );
})

const server = http.createServer(app)
const PORT = process.env.PORT;

const start = async()=>{
    server.listen(PORT, ()=> console.log(`server is listening on ${PORT}`))
}

start()