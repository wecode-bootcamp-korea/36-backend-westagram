
const dotenv = require("dotenv");
dotenv.config() 
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
app.get("/ping",  (req, res)=> {
    res.status(201).json({MESSAGE : "pong"});
})
app.post("/user", (req, res)=>{
    const { name, email, profile_image, password }= req.body;

    appDataSource.query(
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

app.post("/posts", (req, res)=>{
    const { title, content, user_id } = req.body;

    appDataSource.query(
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

app.get('/post',(req,res)=>{
    const {id} = req.body

    appDataSource.query(
        `
        SELECT * 
        FROM posts 
        WHERE ${id} = posts.user_id 
        `,(err,rows)=>res.status(200).json({MESSAGE : 'success!', data: rows})
    ); 
})

app.patch("/post", (req, res)=>{
    const { title, content,id } = req.body

    appDataSource.query(
        `
        UPDATE posts 
        SET title="${title}", 
            content="${content}" 
        WHERE id=${id};
        ` 
        );
        res.status(201).json({MESSAGE : 'success!'})
})
app.delete("/post", (req, res)=>{
    const {id} = req.body

    appDataSource.query(
        `
        DELETE 
        FROM posts 
        WHERE = ${id}
        `, res.status(200).json({MESSAGE : "postingDeleted"})
    )
})
app.post('/likes', (req, res)=>{
    const { user_id, post_id } = req.body

    appDataSource.query(
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

const start = ()=>{
    server.listen(PORT, ()=>console.log(`server is listening on port ${PORT}`));
}

start();
