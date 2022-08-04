const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");


const dotenv = require("dotenv");
dotenv.config()

const { DataSource } = require('typeorm');
const { title } = require("process");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})


myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized");
  })

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

//health check
app.get("/ping", (req,res) => {
  res.status(200).json({ message: "pong"});
});

//Assignment 2 : 유저 회원가입 하기

app.post('/users', async (req, res) => {
  const { id, password, name, age} = req.body

  await myDataSource.query(
    `INSERT INTO users(
      id,
      password,
      name,
      age
    ) VALUES(?, ?, ?, ?);
    `, [ id, password , name, age ]
  ) 
      res.status(200).json({ message: 'userCreated'})
});


//Assignment 3: 게시글 등록하기

app.post('/posts', async (req, res) => {
  const { users_no, title, post } = req.body

  await myDataSource.query(
    `INSERT INTO posts(
      users_no,
      title,
      post
    ) VALUES (?, ?, ?)
    `, [ users_no, title, post ]
  )
      res.status(200).json({ message: 'postCreated'})
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
}
start();