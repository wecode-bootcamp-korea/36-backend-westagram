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

const server = http.createServer(app);

const start = async ()=>{
    server.listen(PORT, ()=>console.log(`server is listening on port ${PORT}`));
}

start();