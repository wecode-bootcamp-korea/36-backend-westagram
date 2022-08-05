const dotenv = require("dotenv");
dotenv.config() //환경변수의 조정. 아래에 있었다면 에러가 났을 것이다. 위치에 신경써야.

const http = require("http");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const {DataSource} = require('typeorm');

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

const server = http.createServer(app);

const start = async ()=>{
    server.listen(PORT, ()=>console.log(`server is listening on port ${PORT}`));
}

start();