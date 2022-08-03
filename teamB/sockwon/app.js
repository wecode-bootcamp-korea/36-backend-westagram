const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config() //환경변수의 조정. 아래에 있었다면 에러가 났을 것이다. 위치에 신경써야.

const {DataSource} = require('typeorm');



const myDataSource = new DataSource({
    type: 'mysql',
    host: process.env.TYPEORM_HOST ,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
})

const PORT = process.env.PORT;
myDataSource.initialize()
.then(()=>{console.log("data source has been initialized!")})

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.get("/ping", async (req, res)=> {
    res.status(201).json({MESSAGE : "pong"});
})

app.post("/usersignup", async (req, res)=>{
    const {name, email, profile_image,password}= req.body;
    await myDataSource.query(
        `
        INSERT INTO users 
        (name,email, profile_image,password) 
        VALUES (?,?,?,?);
        `,
        [name, email, profile_image,password]
    );
    res.status(201).json({MEASSAGE : 'created_success!'});
})

app.post("/posts", async (req, res)=>{
    const {title, content, user_id} = req.body;
    await myDataSource.query(
        `
        INSERT INTO 
        posts (title,content,user_id)
        VALUES (?,?,?) 
        `,[title,content,user_id]
    );
    res.status(201).json({MESSAGE : 'post_created!'})
})

app.get('/posts', async (req,res)=>{
    await myDataSource.query(
        `
        SELECT posts.user_id AS userId,users.profile_image AS userProfileImage,posts.id AS postingId,posts.content AS postingContent
        FROM users INNER JOIN posts ON posts.user_id = users.id;
        `,(err,rows)=>res.status(200).json({MESSAGE : 'success!', data: rows})
    ); 
})

app.get('/post', async (req,res)=>{
    const {id} = req.body
    await myDataSource.query(
        `
        SELECT *
        FROM posts WHERE ${id} = posts.user_id 
        `,(err,rows)=>res.status(200).json({MESSAGE : 'success!', data: rows})
    ); 
})
app.patch("/post", async (req, res)=>{
    const {title, content,id} = req.body
    console.log(title,content,id)
    await myDataSource.query(
        `
        UPDATE posts SET title="${title}", content="${content}" WHERE id=${id};
        ` //update 는 SET title="${title}", content="${content}" 처럼 따옴표를 꼭 넣어줘야 한다.
        );
        res.status(201).json({MESSAGE : 'success!'})
})

const server = http.createServer(app);

const start = async ()=>{
    server.listen(PORT, ()=>console.log(`server is listening on port ${PORT}`));
}

start();