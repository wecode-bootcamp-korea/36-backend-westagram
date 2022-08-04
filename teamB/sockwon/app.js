
const dotenv = require("dotenv");
dotenv.config() //환경변수의 조정. 아래에 있었다면 에러가 났을 것이다. 위치에 신경써야.
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
    type: 'mysql',
    host: process.env.TYPEORM_HOST ,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
})

const PORT = process.env.PORT;

appDataSource.initialize()
.then(()=>
    {console.log("data source has been initialized!")})
.catch((err)=>
    {console.log("ERROR")}
)

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.get("/ping", async (req, res)=> {
    res.status(201).json({MESSAGE : "pong"});
})
app.post("/user", async (req, res)=>{
    const { name, email, profile_image, password }= req.body;

    await appDataSource.query(
        `
        INSERT INTO users(
            name,
            email, 
            profile_image,
            password
            ) VALUES (?,?,?,?);`,
        [name, email, profile_image,password]
    );
    res.status(201).json({MEASSAGE : 'created_success!'});
})

app.post("/posts", async (req, res)=>{
    const { title, content, user_id } = req.body;

    await appDataSource.query(
        `
        INSERT INTO posts (
            title,
            content,
            user_id
            )VALUES (?,?,?) 
        `,[title,content,user_id]
    );
    res.status(201).json({MESSAGE : 'post_created!'})
})

app.get('/post', async (req,res)=>{
    const {id} = req.body

    await appDataSource.query(
        `
        SELECT * 
        FROM posts 
        WHERE ${id} = posts.user_id 
        `,(err,rows)=>res.status(200).json({MESSAGE : 'success!', data: rows})
    ); 
})

app.patch("/post", async (req, res)=>{
    const { title, content,id } = req.body

    await appDataSource.query(
        `
        UPDATE posts 
        SET 
        title="${title}", 
        content="${content}" 
        WHERE id=${id};
        ` //update 는 SET title="${title}", content="${content}" 처럼 따옴표를 꼭 넣어줘야 한다.
        );
        res.status(201).json({MESSAGE : 'success!'})
})
app.delete("/post", async (req, res)=>{
    const {id} = req.body

    await appDataSource.query(
        `
        DELETE 
        FROM posts 
        WHERE = ${id}
        `, res.status(200).json({MESSAGE : "postingDeleted"})
    )
})
app.post('/likes', async (req, res)=>{
    const { user_id, post_id } = req.body

    await appDataSource.query(
        `
        INSERT INTO likes (
            user_id, 
            post_id
            ) VALUE (?,?);
        `, [user_id, post_id]
    )
    res.status(201).json({MESSAGE : 'likeCreated'})
})

const server = http.createServer(app);

const start = async ()=>{
    server.listen(PORT, ()=>console.log(`server is listening on port ${PORT}`));
}

start();